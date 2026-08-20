import fs from "fs";
import path from "path";
import { StorageError } from "@/lib/storage-error";
import { firebaseConfigured, getBucket } from "@/lib/firebase-admin";

/**
 * Uploaded media (admin-picked images/videos) needs somewhere durable to
 * live — Vercel's filesystem is read-only in production. Two backends:
 *
 * 1. Firebase Cloud Storage, used automatically when the FIREBASE_* env
 *    vars are set (see lib/firebase-admin.ts).
 * 2. public/uploads/ as the local/dev fallback, served statically by Next.
 *    Note: `next dev` serves newly-written files immediately; a production
 *    build (`next start`) snapshots /public at boot, so this fallback only
 *    works under `next dev` — which is the only place it's meant to run,
 *    since a real deploy always has Firebase Storage configured.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function safeExt(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,5}$/.test(ext) ? ext : "";
}

function makeKey(filename: string): string {
  const ext = safeExt(filename) || ".jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
}

function publicUrlFor(key: string): string {
  return `https://storage.googleapis.com/${getBucket().name}/${key}`;
}

function writeLocalFile(key: string, buffer: Buffer): void {
  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOAD_DIR, key), buffer);
  } catch {
    throw new StorageError(
      "Could not save the upload — the storage is read-only in this environment and no Firebase Storage is configured."
    );
  }
}

/** Uploads a file buffer server-side, returning its public URL. Used for
    images (small enough, after client-side compression, to pass through a
    normal request body). `filename` is only used for its extension. */
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  const key = makeKey(filename);

  if (firebaseConfigured) {
    const contentType = extToContentType(key);
    await getBucket().file(key).save(buffer, { metadata: { contentType }, public: true });
    return publicUrlFor(key);
  }

  writeLocalFile(key, buffer);
  return `/uploads/${key}`;
}

function extToContentType(key: string): string {
  const ext = path.extname(key).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };
  return map[ext] ?? "application/octet-stream";
}

/**
 * Video files are far larger than a serverless function's request-body
 * limit, so unlike uploadImage() above, this hands the browser a short-lived
 * signed URL and lets it PUT the bytes straight to Cloud Storage. The
 * client must confirm afterward (confirmUpload below) since Cloud Storage
 * has no equivalent of Vercel Blob's onUploadCompleted server callback.
 */
export async function createSignedUploadUrl(
  filename: string,
  contentType: string,
  expiresInMs = 15 * 60 * 1000
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const key = makeKey(filename);
  const [uploadUrl] = await getBucket().file(key).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + expiresInMs,
    contentType,
  });
  return { uploadUrl, key, publicUrl: publicUrlFor(key) };
}

/** Marks a directly-uploaded object public and returns its URL, once the
    client confirms the signed-URL PUT succeeded. */
export async function finalizeUpload(key: string): Promise<string> {
  await getBucket().file(key).makePublic();
  return publicUrlFor(key);
}

/** Local-dev fallback for video uploads when Firebase isn't configured —
    same constraints as writeLocalFile above (next dev only). */
export function uploadVideoLocal(buffer: Buffer, filename: string): string {
  const key = makeKey(filename);
  writeLocalFile(key, buffer);
  return `/uploads/${key}`;
}

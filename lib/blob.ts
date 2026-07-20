import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { StorageError } from "@/lib/storage-error";

// Uploaded media (admin-picked images) needs somewhere durable to live —
// Vercel's filesystem is read-only in production, same reason articles moved
// to KV. Two backends, same shape as the rest of the data layer:
//
// 1. Vercel Blob, used automatically when BLOB_READ_WRITE_TOKEN exists
//    (Vercel injects it once a Blob store is linked to the project).
// 2. public/uploads/ as the local/dev fallback, served statically by Next.
//    Note: `next dev` serves newly-written files immediately; a production
//    build (`next start`) snapshots /public at boot, so this fallback only
//    works under `next dev` — which is the only place it's meant to run,
//    since a real deploy always has Blob configured.

export const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function safeExt(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,5}$/.test(ext) ? ext : "";
}

/** Uploads a file, returning its public URL. `filename` is only used for its extension. */
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  const ext = safeExt(filename) || ".jpg";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;

  if (blobConfigured) {
    const { url } = await put(key, buffer, { access: "public" });
    return url;
  }

  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOAD_DIR, key), buffer);
  } catch {
    throw new StorageError(
      "Could not save the upload — the storage is read-only in this environment and no Blob store is configured."
    );
  }
  return `/uploads/${key}`;
}

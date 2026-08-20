import { isAuthed } from "@/lib/auth";
import { createSignedUploadUrl } from "@/lib/storage";
import { firebaseConfigured } from "@/lib/firebase-admin";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Video files are far larger than a serverless function's request-body
// limit, so unlike /api/admin/upload (images, server-side), this route only
// issues a short-lived signed URL — the browser PUTs the bytes straight to
// Cloud Storage. The client then calls /api/admin/upload/video/confirm to
// register the finished upload (Cloud Storage has no server-callback
// equivalent of Vercel Blob's onUploadCompleted).
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!rateLimit(`upload-video:${clientIp(request)}`, 10, 60_000)) {
    return Response.json({ error: "too many uploads, try again later" }, { status: 429 });
  }

  let body: { filename?: unknown; contentType?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const filename = typeof body.filename === "string" ? body.filename : "";
  const contentType = typeof body.contentType === "string" ? body.contentType : "";
  if (!ALLOWED_VIDEO_TYPES.has(contentType)) {
    return Response.json({ error: "only MP4 or WebM videos are allowed" }, { status: 400 });
  }

  // Local dev without Firebase configured: no cloud bucket to sign a URL
  // against, so tell the client to fall back to a direct server upload
  // (only viable under `next dev`, same constraint as the image path).
  if (!firebaseConfigured) {
    return Response.json({ direct: false });
  }

  try {
    const { uploadUrl, key, publicUrl } = await createSignedUploadUrl(filename, contentType);
    return Response.json({ direct: true, uploadUrl, key, publicUrl, contentType });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "could not start upload" }, { status: 503 });
  }
}

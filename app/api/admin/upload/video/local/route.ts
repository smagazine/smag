import { isAuthed } from "@/lib/auth";
import { uploadVideoLocal } from "@/lib/storage";
import { addMedia } from "@/lib/media";
import { StorageError } from "@/lib/storage-error";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Only reached when /api/admin/upload/video reports { direct: false } —
// i.e. Firebase Storage isn't configured, so there's no bucket to sign a
// direct-upload URL against. Writes straight to public/uploads/, which only
// works under `next dev` (see lib/storage.ts).
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200MB

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!rateLimit(`upload-video-local:${clientIp(request)}`, 10, 60_000)) {
    return Response.json({ error: "too many uploads, try again later" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "no file provided" }, { status: 400 });
  }
  if (!ALLOWED_VIDEO_TYPES.has(file.type)) {
    return Response.json({ error: "only MP4 or WebM videos are allowed" }, { status: 400 });
  }
  if (file.size > MAX_VIDEO_BYTES) {
    return Response.json({ error: "video must be under 200MB" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = uploadVideoLocal(buffer, file.name);
    const media = await addMedia({ url, filename: file.name });
    return Response.json({ ok: true, media }, { status: 201 });
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not upload video";
    return Response.json({ error: message }, { status: 503 });
  }
}

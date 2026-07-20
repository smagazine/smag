import { isAuthed } from "@/lib/auth";
import { uploadImage } from "@/lib/blob";
import { addMedia } from "@/lib/media";
import { StorageError } from "@/lib/storage-error";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!rateLimit(`upload:${clientIp(request)}`, 30, 60_000)) {
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
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json({ error: "only JPEG, PNG, WebP, GIF, or AVIF images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "image must be under 8MB" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(buffer, file.name);
    const media = await addMedia({ url, filename: file.name });
    return Response.json({ ok: true, media }, { status: 201 });
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not upload image";
    return Response.json({ error: message }, { status: 503 });
  }
}

import { isAuthed } from "@/lib/auth";
import { getMedia, deleteMedia } from "@/lib/media";
import { StorageError } from "@/lib/storage-error";

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json({ media: await getMedia() });
}

export async function DELETE(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });
  try {
    await deleteMedia(id);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not delete media";
    return Response.json({ error: message }, { status: 503 });
  }
  return Response.json({ ok: true });
}

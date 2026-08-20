import { isAuthed } from "@/lib/auth";
import { finalizeUpload } from "@/lib/storage";
import { firebaseConfigured } from "@/lib/firebase-admin";
import { addMedia } from "@/lib/media";

// Called by the client right after it finishes PUTting bytes to the signed
// URL from /api/admin/upload/video — marks the object public and registers
// it in the media library.
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!firebaseConfigured) {
    return Response.json({ error: "Firebase Storage is not configured" }, { status: 503 });
  }

  let body: { key?: unknown; filename?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key : "";
  const filename = typeof body.filename === "string" ? body.filename : key;
  if (!key) return Response.json({ error: "key is required" }, { status: 400 });

  try {
    const url = await finalizeUpload(key);
    const media = await addMedia({ url, filename });
    return Response.json({ ok: true, media }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "could not finalize upload" }, { status: 503 });
  }
}

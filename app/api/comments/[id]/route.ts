import { isAuthed } from "@/lib/auth";
import { setCommentStatus, deleteComment, type CommentStatus } from "@/lib/comments";

// Moderation endpoints — approve/reject/delete a single comment. Admin-only.

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const status = body.status;
  if (status !== "approved" && status !== "rejected" && status !== "pending") {
    return Response.json({ error: "status must be approved, rejected, or pending" }, { status: 400 });
  }

  const comment = await setCommentStatus(id, status as CommentStatus);
  if (!comment) return Response.json({ error: "comment not found" }, { status: 404 });
  return Response.json({ comment });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteComment(id);
  if (!ok) return Response.json({ error: "comment not found" }, { status: 404 });
  return Response.json({ ok: true });
}

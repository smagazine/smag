import { getSession } from "@/lib/auth";
import { deleteUser } from "@/lib/users";
import { StorageError } from "@/lib/storage-error";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (session.role !== "admin") return Response.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  if (id === session.id) {
    return Response.json({ error: "you can't delete your own account while logged in" }, { status: 400 });
  }

  try {
    await deleteUser(id);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not delete user";
    return Response.json({ error: message }, { status: 503 });
  }
  return Response.json({ ok: true });
}

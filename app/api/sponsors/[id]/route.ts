import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { StorageError } from "@/lib/articles";
import { deleteSponsor } from "@/lib/sponsors";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await deleteSponsor(id);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not delete sponsor";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}

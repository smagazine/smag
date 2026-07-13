import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { deleteSponsor } from "@/lib/sponsors";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  deleteSponsor(id);
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}

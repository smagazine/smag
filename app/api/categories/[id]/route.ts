import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { getArticles, StorageError } from "@/lib/articles";
import { updateCategory, deleteCategory, ValidationError, CategoryInUseError } from "@/lib/categories";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let category;
  try {
    category = await updateCategory(id, await request.json());
  } catch (err) {
    if (err instanceof ValidationError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    const message = err instanceof StorageError ? err.message : "could not save category";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidateAll();
  return Response.json({ ok: true, category });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const articles = await getArticles();
  const inUse = articles.filter((a) => a.relatedCategory === id).length;
  try {
    await deleteCategory(id, inUse);
  } catch (err) {
    if (err instanceof CategoryInUseError) {
      return Response.json({ error: err.message, count: err.count }, { status: 409 });
    }
    const message = err instanceof StorageError ? err.message : "could not delete category";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidateAll();
  return Response.json({ ok: true });
}

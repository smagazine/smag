import { getArticle, upsertArticle, deleteArticle, normalizeArticle, ValidationError, StorageError } from "@/lib/articles";
import { isAuthed } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return Response.json({ error: "not found" }, { status: 404 });
  if (article.status === "draft" && !(await isAuthed())) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  return Response.json(article);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const existing = getArticle(slug);
  let article;
  try {
    article = normalizeArticle({ ...(await request.json()), slug });
  } catch (err) {
    const message = err instanceof ValidationError ? err.message : "invalid request body";
    return Response.json({ error: message }, { status: 400 });
  }
  try {
    await upsertArticle(article);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not save article";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidatePath("/article/" + slug);
  revalidatePath("/" + article.relatedCategory);
  if (existing && existing.relatedCategory !== article.relatedCategory) {
    revalidatePath("/" + existing.relatedCategory);
  }
  revalidatePath("/");
  revalidatePath("/admin");
  return Response.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const existing = getArticle(slug);
  try {
    await deleteArticle(slug);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not delete article";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidatePath("/admin");
  revalidatePath("/");
  if (existing) revalidatePath("/" + existing.relatedCategory);
  return Response.json({ ok: true });
}

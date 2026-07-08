import { getArticle, upsertArticle, deleteArticle, normalizeArticle, ValidationError } from "@/lib/articles";
import { isAuthed } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return Response.json({ error: "not found" }, { status: 404 });
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
  let article;
  try {
    article = normalizeArticle({ ...(await request.json()), slug });
  } catch (err) {
    const message = err instanceof ValidationError ? err.message : "invalid request body";
    return Response.json({ error: message }, { status: 400 });
  }
  upsertArticle(article);
  revalidatePath("/article/" + slug);
  revalidatePath("/" + article.relatedCategory);
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
  deleteArticle(slug);
  revalidatePath("/admin");
  if (existing) revalidatePath("/" + existing.relatedCategory);
  return Response.json({ ok: true });
}

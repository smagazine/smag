import { getArticles, getPublishedArticles, upsertArticle, normalizeArticle, ValidationError, StorageError } from "@/lib/articles";
import { isAuthed } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const articles = (await isAuthed()) ? getArticles() : getPublishedArticles();
  return Response.json(articles);
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let article;
  try {
    article = normalizeArticle(await request.json());
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
  revalidatePath("/article/" + article.slug);
  revalidatePath("/" + article.relatedCategory);
  revalidatePath("/");
  revalidatePath("/admin");
  return Response.json({ ok: true }, { status: 201 });
}

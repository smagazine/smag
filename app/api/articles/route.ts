import { getArticles, upsertArticle, normalizeArticle, ValidationError } from "@/lib/articles";
import { isAuthed } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  return Response.json(getArticles());
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
  upsertArticle(article);
  revalidatePath("/article/" + article.slug);
  revalidatePath("/" + article.relatedCategory);
  revalidatePath("/admin");
  return Response.json({ ok: true }, { status: 201 });
}

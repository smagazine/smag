import { getArticles, upsertArticle } from "@/lib/articles";
import { revalidatePath } from "next/cache";

export async function GET() {
  return Response.json(getArticles());
}

export async function POST(request: Request) {
  const article = await request.json();
  if (!article?.slug || !article?.title) {
    return Response.json({ error: "slug and title are required" }, { status: 400 });
  }
  upsertArticle(article);
  revalidatePath("/article/" + article.slug);
  revalidatePath("/admin");
  return Response.json({ ok: true }, { status: 201 });
}

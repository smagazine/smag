import { getArticle, upsertArticle, deleteArticle } from "@/lib/articles";
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
  const { slug } = await params;
  const body = await request.json();
  const article = { ...body, slug };
  upsertArticle(article);
  revalidatePath("/article/" + slug);
  revalidatePath("/admin");
  return Response.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  deleteArticle(slug);
  revalidatePath("/admin");
  return Response.json({ ok: true });
}

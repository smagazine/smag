import { addComment, normalizeComment, ValidationError, StorageError, getApprovedComments } from "@/lib/comments";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Public endpoint: readers fetch approved comments for an article and post
// new ones. New comments land as "pending" (lib/comments.ts) so they only
// appear here once an admin approves them from the dashboard.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "slug is required" }, { status: 400 });
  const comments = await getApprovedComments(slug);
  return Response.json({ comments });
}

export async function POST(request: Request) {
  if (!rateLimit(`comment:${clientIp(request)}`, 5, 60_000)) {
    return Response.json({ error: "too many requests, try again later" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!slug) return Response.json({ error: "slug is required" }, { status: 400 });

  let comment;
  try {
    comment = normalizeComment(body, slug);
  } catch (err) {
    const message = err instanceof ValidationError ? err.message : "invalid request body";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    await addComment(comment);
  } catch (err) {
    const status = err instanceof StorageError ? 503 : 500;
    return Response.json({ error: "could not save comment" }, { status });
  }
  return Response.json({ ok: true }, { status: 201 });
}

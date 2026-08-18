import { recordView } from "@/lib/analytics";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const SLUG_RE = /^[a-z0-9-]{1,200}$/;

// Fired by components/PageViewTracker.tsx on every public page load.
// Always returns 204 — a dropped or malformed beacon should never surface
// as an error to the visitor.
export async function POST(request: Request) {
  if (!rateLimit(`view:${clientIp(request)}`, 60, 60_000)) {
    return new Response(null, { status: 204 });
  }

  let slug: string | undefined;
  try {
    const body = await request.json();
    if (typeof body?.slug === "string" && SLUG_RE.test(body.slug)) slug = body.slug;
  } catch {
    // no/invalid body — count as a generic page view
  }

  await recordView(slug);
  return new Response(null, { status: 204 });
}

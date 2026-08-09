import crypto from "crypto";
import { publishDueArticles, StorageError } from "@/lib/articles";
import { isAuthed } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Flips scheduled articles whose publish time has arrived to `published` and
 * revalidates the pages they appear on.
 *
 * This is only about *timeliness*: getPublishedArticles() already hides a
 * scheduled post until its time comes and serves it after, so a missed cron run
 * delays a post by at most the ISR window (1h) rather than losing it.
 *
 * Triggered by Vercel Cron (see vercel.json), which sends
 * `Authorization: Bearer $CRON_SECRET`. An admin session also works, so the
 * dashboard can force a run.
 */

// Never prerender or cache this — it must read live data on every hit.
export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  // Constant-time compare, and length-guard first since timingSafeEqual throws
  // on mismatched buffer lengths.
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function run(request: Request) {
  if (!authorized(request) && !(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let published;
  try {
    published = await publishDueArticles();
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not publish scheduled articles";
    return Response.json({ error: message }, { status: 503 });
  }

  if (published.length > 0) {
    for (const article of published) {
      revalidatePath("/article/" + article.slug);
      revalidatePath("/" + article.relatedCategory);
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  return Response.json({
    ok: true,
    published: published.map((a) => a.slug),
    ranAt: new Date().toISOString(),
  });
}

export const GET = run;
export const POST = run;

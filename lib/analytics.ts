import fs from "fs";
import path from "path";
import { withLock } from "@/lib/file-lock";
import { kvConfigured, kvCommand } from "@/lib/firestore";

/**
 * Pageview counters for the admin dashboard: total site views, a per-day
 * series, and per-article view counts. No cookies, no per-visitor identity —
 * just aggregate counts, recorded by a client-side beacon (components/
 * PageViewTracker.tsx) on every public page load.
 *
 * KV mode uses atomic INCR/HINCRBY so concurrent requests across serverless
 * instances can't lose an increment to a lost read-modify-write race (unlike
 * the whole-document GET/SET pattern lib/articles.ts etc. use, which is fine
 * for admin-paced writes but not for high-frequency counters). File mode
 * (local dev) falls back to a locked read-modify-write of a single JSON doc.
 */

const ANALYTICS_PATH = path.join(process.cwd(), "data", "analytics.json");

const KV_TOTAL_KEY = "analytics:total";
const KV_DAILY_KEY = "analytics:daily";
const KV_ARTICLES_KEY = "analytics:articles";

export interface AnalyticsData {
  totalViews: number;
  /** "YYYY-MM-DD" -> view count, site-wide. */
  dailyViews: Record<string, number>;
  /** article slug -> view count. */
  articleViews: Record<string, number>;
}

const EMPTY: AnalyticsData = { totalViews: 0, dailyViews: {}, articleViews: {} };

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readFile(): AnalyticsData {
  try {
    const parsed = JSON.parse(fs.readFileSync(ANALYTICS_PATH, "utf-8"));
    return {
      totalViews: typeof parsed.totalViews === "number" ? parsed.totalViews : 0,
      dailyViews: parsed.dailyViews && typeof parsed.dailyViews === "object" ? parsed.dailyViews : {},
      articleViews: parsed.articleViews && typeof parsed.articleViews === "object" ? parsed.articleViews : {},
    };
  } catch {
    return { totalViews: 0, dailyViews: {}, articleViews: {} };
  }
}

function writeFile(data: AnalyticsData): void {
  const tmp = `${ANALYTICS_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmp, ANALYTICS_PATH);
  } catch {
    // Best-effort: a failed view-count write shouldn't break the page that
    // triggered it. Silently drop rather than throwing StorageError.
  }
}

/** Record one page view. `slug` is set for article pages only. */
export async function recordView(slug?: string): Promise<void> {
  const day = todayKey();
  if (kvConfigured) {
    try {
      await Promise.all([
        kvCommand([ "INCR", KV_TOTAL_KEY ]),
        kvCommand([ "HINCRBY", KV_DAILY_KEY, day, 1 ]),
        ...(slug ? [kvCommand([ "HINCRBY", KV_ARTICLES_KEY, slug, 1 ])] : []),
      ]);
    } catch {
      // best-effort
    }
    return;
  }
  await withLock(ANALYTICS_PATH, () => {
    const data = readFile();
    data.totalViews += 1;
    data.dailyViews[day] = (data.dailyViews[day] ?? 0) + 1;
    if (slug) data.articleViews[slug] = (data.articleViews[slug] ?? 0) + 1;
    writeFile(data);
  });
}

function hashToRecord(flat: string[] | null): Record<string, number> {
  const out: Record<string, number> = {};
  if (!flat) return out;
  for (let i = 0; i < flat.length - 1; i += 2) {
    const value = Number(flat[i + 1]);
    if (!Number.isNaN(value)) out[flat[i]] = value;
  }
  return out;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  if (kvConfigured) {
    try {
      const [total, daily, articles] = await Promise.all([
        kvCommand<string | null>(["GET", KV_TOTAL_KEY]),
        kvCommand<string[] | null>(["HGETALL", KV_DAILY_KEY]),
        kvCommand<string[] | null>(["HGETALL", KV_ARTICLES_KEY]),
      ]);
      return {
        totalViews: total ? Number(total) : 0,
        dailyViews: hashToRecord(daily),
        articleViews: hashToRecord(articles),
      };
    } catch {
      return { ...EMPTY };
    }
  }
  return readFile();
}

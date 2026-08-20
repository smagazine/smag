import fs from "fs";
import path from "path";
import { safeEmbedUrl } from "@/lib/video";
import { withLock } from "@/lib/file-lock";
import { StorageError } from "@/lib/storage-error";
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/kv";

export { StorageError };

// Two backends, same as lib/submissions.ts: Upstash/Vercel KV when configured
// (required in production — Vercel's filesystem is read-only), else a local
// JSON file for dev. The whole article list is stored as one JSON document.
const KV_KEY = "articles:data";

export interface BodyBlock {
  id: string;
  type: "p" | "h2" | "blockquote" | "video" | "image";
  text: string;
  /** Optional Arabic text for this block; falls back to `text` when absent. */
  textAr?: string;
  videoUrl?: string;
  /** Present + "file" when `videoUrl` is a direct uploaded video file (rendered
      via <video>); absent/undefined for the default YouTube/Vimeo embed path
      (rendered via <iframe> + safeEmbedUrl()). */
  videoKind?: "file";
  /** Only used when type === "image"; caption/alt text reuses `text`/`textAr`. */
  imageUrl?: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  /** Optional Arabic title; falls back to `title` when absent. */
  titleAr?: string;
  subtitle: string;
  /** Optional Arabic subtitle; falls back to `subtitle` when absent. */
  subtitleAr?: string;
  author: string;
  authorRole: string;
  meta: string;
  heroPhoto: string;
  authorPhoto: string;
  body: BodyBlock[];
  tags: string[];
  relatedCategory: string;
  status?: "draft" | "published" | "scheduled";
  /**
   * ISO timestamp (UTC) a `scheduled` article goes live at. Until it passes the
   * article is treated as a draft everywhere public; after it passes the article
   * serves immediately, and the cron route flips `status` to `published`.
   */
  publishAt?: string;
  featured?: boolean;
  /** Native-ad marker: present when this post is client content. */
  sponsored?: {
    sponsorId: string;
    /** ISO dates (YYYY-MM-DD); the post only serves inside this window. */
    startDate?: string;
    endDate?: string;
  };
}

const DATA_PATH = path.join(process.cwd(), "data", "articles.json");

// Cache the parsed file and invalidate on mtime change so we don't re-read and
// re-parse the entire JSON on every getArticles() call within a request burst.
// Only used for the local-file fallback; KV reads are cheap enough to always
// go live (matches lib/submissions.ts, which doesn't cache KV reads either).
let cache: { mtimeMs: number; articles: Article[] } | null = null;

function getArticlesFromFile(): Article[] {
  try {
    const mtimeMs = fs.statSync(DATA_PATH).mtimeMs;
    if (cache && cache.mtimeMs === mtimeMs) return cache.articles;
    const articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Article[];
    cache = { mtimeMs, articles };
    return articles;
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!kvConfigured) return getArticlesFromFile();
  try {
    const articles = await kvGetJson<Article[]>(KV_KEY, []);
    if (articles.length > 0) return articles;
    // KV has never been written to (e.g. right after switching this
    // deployment onto KV) — seed it from the JSON file bundled in the
    // deployment so existing content isn't lost, then persist it.
    const seeded = getArticlesFromFile();
    if (seeded.length > 0) kvSetJson(KV_KEY, seeded).catch(() => {});
    return seeded;
  } catch {
    // KV unreachable: degrade to the bundled file rather than taking the
    // whole site down.
    return getArticlesFromFile();
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}

/** True when a sponsored post's run window covers today (or it has none). */
function inSponsoredWindow(a: Article, today: string): boolean {
  if (!a.sponsored) return true;
  if (a.sponsored.startDate && today < a.sponsored.startDate) return false;
  if (a.sponsored.endDate && today > a.sponsored.endDate) return false;
  return true;
}

/**
 * True when an article's own status/schedule allows it to serve publicly,
 * ignoring any sponsorship window. `scheduled` posts stay hidden until their
 * `publishAt` passes — this is the authoritative check, so a scheduled post
 * never leaks early even if the cron route below never runs.
 */
export function isLive(a: Article, now: Date = new Date()): boolean {
  const status = a.status ?? "published";
  if (status === "draft") return false;
  if (status === "scheduled") {
    if (!a.publishAt) return false;
    const at = Date.parse(a.publishAt);
    return !Number.isNaN(at) && at <= now.getTime();
  }
  return true;
}

export async function getPublishedArticles(): Promise<Article[]> {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const articles = await getArticles();
  return articles.filter((a) => isLive(a, now) && inSponsoredWindow(a, today));
}

/**
 * Scheduled articles whose publish time has arrived, flipped to `published`.
 * Returns the slugs that changed so the caller can revalidate their pages.
 */
export function publishDueArticles(): Promise<Article[]> {
  return withLock(DATA_PATH, async () => {
    const now = new Date();
    const articles = await getArticles();
    const due = articles.filter(
      (a) => a.status === "scheduled" && a.publishAt && isLive(a, now)
    );
    if (due.length === 0) return [];
    const dueSlugs = new Set(due.map((d) => d.slug));
    // If one of the posts going live is flagged featured, it takes the hero now
    // (deferred from upsertArticle, which left the existing hero alone). Latest
    // publish time wins if several land in the same run.
    const newHero = due
      .filter((a) => a.featured)
      .sort((a, b) => Date.parse(a.publishAt!) - Date.parse(b.publishAt!))
      .pop();
    const updated = articles.map((a) => {
      const next = dueSlugs.has(a.slug) ? { ...a, status: "published" as const } : { ...a };
      if (newHero && a.slug !== newHero.slug) next.featured = false;
      return next;
    });
    await saveArticles(updated);
    return due;
  });
}

/** Published articles in a given category route (e.g. "culture", "sports"). */
export async function getPublishedByCategory(relatedCategory: string): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.relatedCategory === relatedCategory);
}

export async function saveArticles(articles: Article[]): Promise<void> {
  if (kvConfigured) {
    await kvSetJson(KV_KEY, articles);
    return;
  }
  // Atomic write: write to a temp file then rename, so a crash mid-write can't
  // leave data/articles.json truncated or corrupt.
  const tmp = `${DATA_PATH}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(articles, null, 2), "utf-8");
    fs.renameSync(tmp, DATA_PATH);
  } catch {
    throw new StorageError(
      "Could not save articles — the storage is read-only in this environment and no KV store is configured."
    );
  }
  cache = null;
}

export class ValidationError extends Error {}

/**
 * Validates and normalizes an untrusted article payload from the write API.
 * Throws ValidationError on bad input; strips unknown fields and sanitizes
 * embedded video URLs. Returns a clean Article safe to persist.
 */
export function normalizeArticle(input: unknown): Article {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("article must be an object");
  }
  const raw = input as Record<string, unknown>;

  const str = (key: string, required = false): string => {
    const v = raw[key];
    if (v === undefined || v === null || v === "") {
      if (required) throw new ValidationError(`${key} is required`);
      return "";
    }
    if (typeof v !== "string") throw new ValidationError(`${key} must be a string`);
    return v;
  };

  const slug = str("slug", true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new ValidationError("slug must be lowercase kebab-case");
  }

  const tags = Array.isArray(raw.tags)
    ? raw.tags.filter((t): t is string => typeof t === "string")
    : [];

  const bodyRaw = Array.isArray(raw.body) ? raw.body : [];
  const body: BodyBlock[] = bodyRaw.map((b, i) => {
    if (typeof b !== "object" || b === null) {
      throw new ValidationError(`body[${i}] must be an object`);
    }
    const blk = b as Record<string, unknown>;
    const type = blk.type;
    if (type !== "p" && type !== "h2" && type !== "blockquote" && type !== "video" && type !== "image") {
      throw new ValidationError(`body[${i}].type is invalid`);
    }
    const block: BodyBlock = {
      id: typeof blk.id === "string" && blk.id ? blk.id : `b${i}`,
      type,
      text: typeof blk.text === "string" ? blk.text : "",
    };
    if (typeof blk.textAr === "string" && blk.textAr) block.textAr = blk.textAr;
    if (type === "video") {
      if (blk.videoKind === "file") {
        const url = typeof blk.videoUrl === "string" ? blk.videoUrl : "";
        let parsed: URL;
        try {
          parsed = new URL(url);
        } catch {
          throw new ValidationError(`body[${i}].videoUrl is not a valid URL`);
        }
        if (parsed.protocol !== "https:" || parsed.hostname !== "storage.googleapis.com") {
          throw new ValidationError(`body[${i}].videoUrl must be an uploaded video file URL`);
        }
        block.videoUrl = url;
        block.videoKind = "file";
      } else {
        const safe = safeEmbedUrl(typeof blk.videoUrl === "string" ? blk.videoUrl : "");
        if (!safe) throw new ValidationError(`body[${i}].videoUrl is not an allowed embed URL`);
        block.videoUrl = safe;
      }
    }
    if (type === "image") {
      const imageUrl = typeof blk.imageUrl === "string" ? blk.imageUrl : "";
      if (!imageUrl) throw new ValidationError(`body[${i}].imageUrl is required`);
      block.imageUrl = imageUrl;
    }
    return block;
  });

  const status: Article["status"] =
    raw.status === "draft" || raw.status === "scheduled" ? raw.status : "published";

  // Accept any parseable datetime and store it normalized to UTC ISO, so the
  // admin can send a plain `datetime-local` value or a full ISO string.
  let publishAt: string | undefined;
  if (raw.publishAt !== undefined && raw.publishAt !== null && raw.publishAt !== "") {
    if (typeof raw.publishAt !== "string") {
      throw new ValidationError("publishAt must be a string");
    }
    const ts = Date.parse(raw.publishAt);
    if (Number.isNaN(ts)) throw new ValidationError("publishAt is not a valid date/time");
    publishAt = new Date(ts).toISOString();
  }
  if (status === "scheduled" && !publishAt) {
    throw new ValidationError("publishAt is required when status is scheduled");
  }
  // A publish time only means anything for a scheduled post — drop it otherwise
  // so a post published by hand doesn't keep a stale schedule attached.
  if (status !== "scheduled") publishAt = undefined;

  let sponsored: Article["sponsored"];
  if (raw.sponsored !== undefined && raw.sponsored !== null) {
    if (typeof raw.sponsored !== "object") {
      throw new ValidationError("sponsored must be an object");
    }
    const sp = raw.sponsored as Record<string, unknown>;
    const sponsorId = typeof sp.sponsorId === "string" ? sp.sponsorId : "";
    if (!sponsorId) throw new ValidationError("sponsored.sponsorId is required");
    const dateRe = /^\d{4}-\d{2}-\d{2}$/;
    const date = (k: string): string | undefined => {
      const v = sp[k];
      if (v === undefined || v === null || v === "") return undefined;
      if (typeof v !== "string" || !dateRe.test(v)) {
        throw new ValidationError(`sponsored.${k} must be YYYY-MM-DD`);
      }
      return v;
    };
    sponsored = { sponsorId, startDate: date("startDate"), endDate: date("endDate") };
  }

  return {
    slug,
    category: str("category"),
    title: str("title", true),
    titleAr: str("titleAr") || undefined,
    subtitle: str("subtitle"),
    subtitleAr: str("subtitleAr") || undefined,
    author: str("author"),
    authorRole: str("authorRole"),
    meta: str("meta"),
    heroPhoto: str("heroPhoto"),
    authorPhoto: str("authorPhoto"),
    body,
    tags,
    relatedCategory: str("relatedCategory"),
    status,
    publishAt,
    featured: raw.featured === true,
    sponsored,
  };
}

export function upsertArticle(article: Article): Promise<void> {
  // Locked so the read and the write happen as one uninterrupted step —
  // otherwise two concurrent admin writes could both read the same snapshot
  // and the second save would silently clobber the first.
  return withLock(DATA_PATH, async () => {
    let articles = await getArticles();
    // Only one article can be featured at a time. A not-yet-live scheduled post
    // keeps its `featured` flag but must not unfeature the current hero yet —
    // publishDueArticles() applies the exclusivity when it actually goes live.
    if (article.featured && isLive(article)) {
      articles = articles.map((a) => a.slug !== article.slug ? { ...a, featured: false } : a);
    }
    const idx = articles.findIndex((a) => a.slug === article.slug);
    if (idx >= 0) {
      articles[idx] = article;
    } else {
      articles.unshift(article);
    }
    await saveArticles(articles);
  });
}

export function deleteArticle(slug: string): Promise<void> {
  return withLock(DATA_PATH, async () => {
    const articles = await getArticles();
    await saveArticles(articles.filter((a) => a.slug !== slug));
  });
}

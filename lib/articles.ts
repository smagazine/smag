import fs from "fs";
import path from "path";
import { safeEmbedUrl } from "@/lib/video";

export interface BodyBlock {
  id: string;
  type: "p" | "h2" | "blockquote" | "video";
  text: string;
  /** Optional Arabic text for this block; falls back to `text` when absent. */
  textAr?: string;
  videoUrl?: string;
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
  relatedPhotos: [string, string, string];
  body: BodyBlock[];
  tags: string[];
  relatedCategory: string;
  status?: "draft" | "published";
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
let cache: { mtimeMs: number; articles: Article[] } | null = null;

export function getArticles(): Article[] {
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

export function getArticle(slug: string): Article | null {
  return getArticles().find((a) => a.slug === slug) ?? null;
}

/** True when a sponsored post's run window covers today (or it has none). */
function inSponsoredWindow(a: Article, today: string): boolean {
  if (!a.sponsored) return true;
  if (a.sponsored.startDate && today < a.sponsored.startDate) return false;
  if (a.sponsored.endDate && today > a.sponsored.endDate) return false;
  return true;
}

export function getPublishedArticles(): Article[] {
  const today = new Date().toISOString().slice(0, 10);
  return getArticles().filter(
    (a) => (a.status ?? "published") !== "draft" && inSponsoredWindow(a, today)
  );
}

/** Published articles in a given category route (e.g. "culture", "sports"). */
export function getPublishedByCategory(relatedCategory: string): Article[] {
  return getPublishedArticles().filter((a) => a.relatedCategory === relatedCategory);
}

export function saveArticles(articles: Article[]): void {
  // Atomic write: write to a temp file then rename, so a crash mid-write can't
  // leave data/articles.json truncated or corrupt.
  const tmp = `${DATA_PATH}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(articles, null, 2), "utf-8");
  fs.renameSync(tmp, DATA_PATH);
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

  const relatedPhotosRaw = Array.isArray(raw.relatedPhotos) ? raw.relatedPhotos : [];
  const relatedPhotos = [0, 1, 2].map((i) =>
    typeof relatedPhotosRaw[i] === "string" ? (relatedPhotosRaw[i] as string) : ""
  ) as [string, string, string];

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
    if (type !== "p" && type !== "h2" && type !== "blockquote" && type !== "video") {
      throw new ValidationError(`body[${i}].type is invalid`);
    }
    const block: BodyBlock = {
      id: typeof blk.id === "string" && blk.id ? blk.id : `b${i}`,
      type,
      text: typeof blk.text === "string" ? blk.text : "",
    };
    if (typeof blk.textAr === "string" && blk.textAr) block.textAr = blk.textAr;
    if (type === "video") {
      const safe = safeEmbedUrl(typeof blk.videoUrl === "string" ? blk.videoUrl : "");
      if (!safe) throw new ValidationError(`body[${i}].videoUrl is not an allowed embed URL`);
      block.videoUrl = safe;
    }
    return block;
  });

  const status = raw.status === "draft" ? "draft" : "published";

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
    relatedPhotos,
    body,
    tags,
    relatedCategory: str("relatedCategory"),
    status,
    featured: raw.featured === true,
    sponsored,
  };
}

export function upsertArticle(article: Article): void {
  let articles = getArticles();
  // Only one article can be featured at a time
  if (article.featured) {
    articles = articles.map((a) => a.slug !== article.slug ? { ...a, featured: false } : a);
  }
  const idx = articles.findIndex((a) => a.slug === article.slug);
  if (idx >= 0) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  saveArticles(articles);
}

export function deleteArticle(slug: string): void {
  saveArticles(getArticles().filter((a) => a.slug !== slug));
}

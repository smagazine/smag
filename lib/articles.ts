import fs from "fs";
import path from "path";
import { safeEmbedUrl } from "@/lib/video";

export interface BodyBlock {
  id: string;
  type: "p" | "h2" | "blockquote" | "video";
  text: string;
  videoUrl?: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
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

export function getPublishedArticles(): Article[] {
  return getArticles().filter((a) => (a.status ?? "published") !== "draft");
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
    if (type === "video") {
      const safe = safeEmbedUrl(typeof blk.videoUrl === "string" ? blk.videoUrl : "");
      if (!safe) throw new ValidationError(`body[${i}].videoUrl is not an allowed embed URL`);
      block.videoUrl = safe;
    }
    return block;
  });

  const status = raw.status === "draft" ? "draft" : "published";

  return {
    slug,
    category: str("category"),
    title: str("title", true),
    subtitle: str("subtitle"),
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

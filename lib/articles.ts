import fs from "fs";
import path from "path";

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
}

const DATA_PATH = path.join(process.cwd(), "data", "articles.json");

export function getArticles(): Article[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Article[];
  } catch {
    return [];
  }
}

export function getArticle(slug: string): Article | null {
  return getArticles().find((a) => a.slug === slug) ?? null;
}

export function saveArticles(articles: Article[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
}

export function upsertArticle(article: Article): void {
  const articles = getArticles();
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

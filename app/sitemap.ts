import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getPublishedArticles } from "@/lib/articles";

const BASE_URL = "https://saudimag.com";

// Use the content file's actual modification time so lastModified only changes
// when content changes — sending `new Date()` on every generation tells crawlers
// everything changed constantly and devalues the signal.
function contentLastModified(): Date {
  try {
    return fs.statSync(path.join(process.cwd(), "data", "articles.json")).mtime;
  } catch {
    return new Date(0);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedArticles();
  const lastModified = contentLastModified();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/headlines`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/f-and-b`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/culture`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/interviews`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sports`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages];
}

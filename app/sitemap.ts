import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getPublishedArticles } from "@/lib/articles";
import { getCategories } from "@/lib/categories";
import { SITE_URL as BASE_URL } from "@/lib/site";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([getPublishedArticles(), getCategories()]);
  const lastModified = contentLastModified();

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/${c.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    ...categoryPages,
    { url: `${BASE_URL}/search`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/subscribe`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages];
}

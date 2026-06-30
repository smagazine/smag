import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";

const BASE_URL = "https://saudimag.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedArticles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/headlines`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/f-and-b`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/culture`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/interviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sports`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages];
}

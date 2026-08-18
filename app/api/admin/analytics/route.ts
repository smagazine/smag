import { isAuthed } from "@/lib/auth";
import { getAnalytics } from "@/lib/analytics";
import { getArticles } from "@/lib/articles";

const DAYS_IN_SERIES = 14;

function dateKey(daysAgo: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const [{ totalViews, dailyViews, articleViews }, articles] = await Promise.all([
    getAnalytics(),
    getArticles(),
  ]);

  const daily = Array.from({ length: DAYS_IN_SERIES }, (_, i) => {
    const date = dateKey(DAYS_IN_SERIES - 1 - i);
    return { date, views: dailyViews[date] ?? 0 };
  });

  const viewsToday = dailyViews[dateKey(0)] ?? 0;
  const viewsLast7Days = daily.slice(-7).reduce((sum, d) => sum + d.views, 0);

  const topArticles = Object.entries(articleViews)
    .map(([slug, views]) => {
      const article = articles.find((a) => a.slug === slug);
      return { slug, views, title: article?.title ?? slug, category: article?.category ?? "" };
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  return Response.json({ totalViews, viewsToday, viewsLast7Days, daily, topArticles });
}

import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Headlines | SAUDI MAG",
  description: "Breaking news and current affairs from across the Arabian Peninsula.",
};

export default async function HeadlinesPage() {
  return (
    <CategoryView
      config={{
        title: "Headlines",
        titleAr: "الأخبار",
        deck: "Breaking news and current affairs from across the Arabian Peninsula.",
        deckAr: "أخبار عاجلة وشؤون راهنة من شبه الجزيرة العربية.",
        headerClass: "page-header--dark",
      }}
      articles={await getPublishedByCategory("headlines")}
      route="headlines"
    />
  );
}

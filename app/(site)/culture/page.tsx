import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Culture | SAUDI MAG",
  description: "Explore Gulf culture through heritage, contemporary art, design, and performance.",
};

export default function CulturePage() {
  return (
    <CategoryView
      config={{
        title: "Culture",
        titleAr: "الثقافة",
        deck: "Exploring heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East.",
        deckAr: "استكشاف التراث والفن المعاصر والتصميم والأداء والسرد المتطور للشرق الأوسط الحديث.",
        headerClass: "page-header--warm",
      }}
      articles={getPublishedByCategory("culture")}
    />
  );
}

import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sports | SAUDI MAG",
  description: "Athletic culture, wellness, and the sporting events drawing global attention to the Gulf.",
};

export default function SportsPage() {
  return (
    <CategoryView
      config={{
        title: "Sports",
        titleAr: "الرياضة",
        deck: "Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf.",
        deckAr: "الثقافة الرياضية والرياضة النخبوية وحركات العافية والفعاليات العالمية في الخليج.",
        headerClass: "page-header--dark",
      }}
      articles={getPublishedByCategory("sports")}
      route="sports"
    />
  );
}

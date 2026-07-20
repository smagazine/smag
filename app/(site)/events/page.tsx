import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events | SAUDI MAG",
  description: "Cultural gatherings, festivals, and the moments shaping the Gulf's social calendar.",
};

export default async function EventsPage() {
  return (
    <CategoryView
      config={{
        title: "Events",
        titleAr: "الفعاليات",
        deck: "Cultural gatherings, festivals, and the moments defining the Gulf's social calendar.",
        deckAr: "التجمعات الثقافية والمهرجانات التي تشكّل التقويم الاجتماعي في الخليج.",
        headerClass: "page-header--dark",
      }}
      articles={await getPublishedByCategory("events")}
      route="events"
    />
  );
}

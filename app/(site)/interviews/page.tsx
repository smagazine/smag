import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Interviews | SAUDI MAG",
  description: "In conversation with the artists, chefs, architects, and voices defining the Gulf.",
};

export default async function InterviewsPage() {
  return (
    <CategoryView
      config={{
        title: "Interviews",
        titleAr: "مقابلات",
        deck: "In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf's future.",
        deckAr: "حوارات مع الفنانين والطهاة والمعماريين وأصحاب المشاريع وأصوات الثقافة التي تصنع مستقبل الخليج.",
        headerClass: "page-header--warm",
        italicTitle: true,
      }}
      articles={await getPublishedByCategory("interviews")}
      route="interviews"
    />
  );
}

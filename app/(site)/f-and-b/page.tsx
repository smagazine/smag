import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "F&B | SAUDI MAG",
  description: "Restaurant openings, chef profiles, and the Gulf's rapidly evolving dining culture.",
};

export default async function FAndBPage() {
  return (
    <CategoryView
      config={{
        title: "F&B",
        titleAr: "طعام وشراب",
        deck: "Restaurant openings, chef profiles, culinary travel, and the Gulf's rapidly evolving dining culture.",
        deckAr: "افتتاحات المطاعم وملامح الطهاة والسياحة الغذائية وثقافة الطعام في الخليج.",
        headerClass: "page-header--cream",
      }}
      articles={await getPublishedByCategory("f-and-b")}
      route="f-and-b"
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryView from "@/components/CategoryView";
import { getPublishedByCategory } from "@/lib/articles";
import { getCategories, getCategory } from "@/lib/categories";
import { stripInline } from "@/lib/inline";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.label} | SAUDI MAG`,
    description: stripInline(cat.deck),
  };
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const cat = await getCategory(category);
  if (!cat) notFound();

  return (
    <CategoryView
      config={{
        title: cat.label,
        titleAr: cat.labelAr,
        deck: cat.deck,
        deckAr: cat.deckAr,
        headerClass: cat.headerClass,
        italicTitle: cat.italicTitle,
      }}
      articles={await getPublishedByCategory(cat.id)}
      route={cat.id}
    />
  );
}

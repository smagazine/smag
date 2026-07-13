import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

// Shared pieces of the AnOther-style editorial system (ao-* classes in
// globals.css). Pure presentational components — safe in server and client
// components alike.

export const U = (id: string, w: number, h: number) =>
  id ? `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format` : "";

export const CAT_AR: Record<string, string> = {
  "Culture": "الثقافة",
  "Sports": "الرياضة",
  "F&B": "طعام وشراب",
  "Events": "الفعاليات",
  "Interviews": "مقابلات",
  "Headlines": "الأخبار",
  "Architecture & Design": "العمارة والتصميم",
};

function stripInline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\([^)]*\)/g, "$1");
}

/** First paragraph of the body with inline markdown stripped, for excerpts. */
export function excerpt(a: Article): string {
  return stripInline(a.body?.find((b) => b.type === "p")?.text ?? a.subtitle);
}

/** Arabic excerpt: first paragraph's textAr, else Arabic subtitle, else English. */
export function excerptAr(a: Article): string {
  const p = a.body?.find((b) => b.type === "p");
  return stripInline(p?.textAr ?? a.subtitleAr ?? p?.text ?? a.subtitle);
}

export function CatPill({ category, dark = false }: { category: string; dark?: boolean }) {
  return (
    <span className={`ao-pill${dark ? " on-dark" : ""}`} data-en={category} data-ar={CAT_AR[category] ?? category}>
      {category}
    </span>
  );
}

export function Byline({ a }: { a: Article }) {
  return <span className="ao-byline">{a.author || a.meta.split("·")[0]?.trim()}</span>;
}

export function TitleLink({ a }: { a: Article }) {
  return (
    <Link href={`/article/${a.slug}`} data-en={a.title} data-ar={a.titleAr ?? a.title}>
      {a.title}
    </Link>
  );
}

export function SeeAll({ href }: { href: string }) {
  return (
    <Link className="ao-seeall" href={href}>
      <span data-en="See all" data-ar="عرض الكل">See all</span>
      <span className="ao-seeall-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

/** Standard grid card: image, category pill, uppercase title, byline. */
export function AoCard({ a, sizes = "(min-width: 900px) 30vw, 100vw" }: { a: Article; sizes?: string }) {
  return (
    <article className="ao-card">
      <Link className="ao-media" href={`/article/${a.slug}`}>
        <Image fill src={U(a.heroPhoto, 640, 460)} alt={a.title} sizes={sizes} />
      </Link>
      <CatPill category={a.category} />
      <h3 className="ao-card-title"><TitleLink a={a} /></h3>
      <Byline a={a} />
    </article>
  );
}

/** Lead story row: large image beside pill, title, excerpt, byline.
    `flip` mirrors the image to the other side on desktop. */
export function AoLead({ a, flip = false, priority = false }: { a: Article; flip?: boolean; priority?: boolean }) {
  return (
    <article className={`ao-desk-lead${flip ? " flip" : ""} reveal`}>
      <Link className="ao-media" href={`/article/${a.slug}`}>
        <Image fill priority={priority} src={U(a.heroPhoto, 900, 640)} alt={a.title} sizes="(min-width: 900px) 42vw, 100vw" />
      </Link>
      <div className="ao-desk-lead-copy">
        <CatPill category={a.category} />
        <h3 className="ao-card-title lg"><TitleLink a={a} /></h3>
        <p className="ao-excerpt" data-en={excerpt(a)} data-ar={excerptAr(a)}>{excerpt(a)}</p>
        <Byline a={a} />
      </div>
    </article>
  );
}

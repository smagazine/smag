import Link from "next/link";
import Image from "next/image";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";
import type { Article } from "@/lib/articles";

const U = (id: string, w: number, h: number) =>
  id ? `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format` : "";

export interface CategoryConfig {
  /** English page title, also used as the breadcrumb label. */
  title: string;
  titleAr: string;
  deck: string;
  deckAr: string;
  /** Page-header modifier, e.g. "page-header--warm". */
  headerClass?: string;
  /** Italic title (interviews page). */
  italicTitle?: boolean;
}

// Vary card widths for editorial rhythm while keeping rows balanced: a wide
// span-8 (landscape) pairs with a span-4 (portrait) at equal height, and
// span-6 landscape cards pair evenly. The media aspect must match the width or
// the grid goes lopsided.
const LAYOUT = [
  { span: "span-8", media: "landscape" },
  { span: "span-4", media: "" },
  { span: "span-6", media: "landscape" },
  { span: "span-6", media: "landscape" },
];

function meta(a: Article): string {
  return a.author ? `By ${a.author}${a.meta ? ` · ${a.meta}` : ""}` : a.meta;
}

export default function CategoryView({
  config,
  articles,
}: {
  config: CategoryConfig;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;

  return (
    <main className="page" id="main-content">
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/", labelAr: "الرئيسية" },
          { label: config.title, labelAr: config.titleAr },
        ]}
      />
      <div className={`page-header ${config.headerClass ?? ""}`.trim()}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1
                data-en={config.title}
                data-ar={config.titleAr}
                style={config.italicTitle ? { fontStyle: "italic" } : undefined}
              >
                {config.title}
              </h1>
              <p className="deck" data-en={config.deck} data-ar={config.deckAr}>
                {config.deck}
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {!lead ? (
        <section className="section container">
          <p className="deck" data-en="No stories published in this section yet." data-ar="لم يتم نشر أي قصص في هذا القسم بعد.">
            No stories published in this section yet.
          </p>
        </section>
      ) : (
        <>
          <div className="container" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
            <article className="main-lead reveal" style={{ minHeight: 540, marginBottom: "var(--stack-md)" }}>
              <Link className="main-lead-media" href={`/article/${lead.slug}`}>
                <Image fill priority src={U(lead.heroPhoto, 1400, 900)} alt={lead.title} sizes="(min-width: 1280px) 900px, 100vw" />
              </Link>
              <div className="main-lead-copy">
                <span className="label eyebrow">{lead.category}</span>
                <h1><Link href={`/article/${lead.slug}`}>{lead.title}</Link></h1>
                <p>{lead.subtitle}</p>
                <span className="meta">{meta(lead)}</span>
              </div>
            </article>
          </div>

          {rest.length > 0 && (
            <section className="section container">
              <div className="editorial-grid reveal">
                {rest.map((a, i) => {
                  const layout = LAYOUT[i % LAYOUT.length];
                  return (
                  <article key={a.slug} className={`article-card ${layout.span}`}>
                    <Link className={`card-media${layout.media ? ` ${layout.media}` : ""}`} href={`/article/${a.slug}`}>
                      <Image fill src={U(a.heroPhoto, 800, 500)} alt={a.title} sizes="(min-width: 1280px) 800px, 100vw" />
                    </Link>
                    <span className="label eyebrow">{a.category}</span>
                    <h3><Link href={`/article/${a.slug}`}>{a.title}</Link></h3>
                    <p>{a.subtitle}</p>
                    <span className="meta">{meta(a)}</span>
                  </article>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

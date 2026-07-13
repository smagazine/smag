import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getPublishedArticles } from "@/lib/articles";
import { safeEmbedUrl } from "@/lib/video";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import { CatPill, SponsoredPill, SeeAll, AoCard } from "@/components/Editorial";
import { getSponsor } from "@/lib/sponsors";
import type { Metadata } from "next";

// Statically prerender every published article; revalidate hourly and on write
// (the API calls revalidatePath after each save).
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let i = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) parts.push(<strong key={i++}>{match[1]}</strong>);
    else if (match[2] !== undefined) parts.push(<em key={i++}>{match[2]}</em>);
    else parts.push(<a key={i++} href={match[4]} target="_blank" rel="noopener noreferrer">{match[3]}</a>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts.length === 1 ? parts[0] : <>{parts}</>;
}

/**
 * Bilingual block text: both languages render as sibling spans and CSS
 * toggles them on <html dir>. (The data-en/data-ar DOM swap only handles
 * leaf nodes, so it can't carry the inline markup paragraphs may contain.)
 */
function BlockText({ text, textAr }: { text: string; textAr?: string }) {
  if (!textAr) return <>{parseInline(text)}</>;
  return (
    <>
      <span className="lang-en">{parseInline(text)}</span>
      <span className="lang-ar">{parseInline(textAr)}</span>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  const heroUrl = `https://images.unsplash.com/${article.heroPhoto}?w=1200&h=630&fit=crop&auto=format`;
  return {
    title: article.title,
    description: article.subtitle,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      images: [{ url: heroUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [heroUrl],
    },
  };
}

export default async function ArticleSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || (article.status ?? "published") === "draft") notFound();

  const sponsor = article.sponsored ? getSponsor(article.sponsored.sponsorId) : null;
  const allArticles = getPublishedArticles();
  const related = [
    ...allArticles.filter(a => a.slug !== slug && a.relatedCategory === article.relatedCategory),
    ...allArticles.filter(a => a.slug !== slug && a.relatedCategory !== article.relatedCategory),
  ].slice(0, 3);

  const heroUrl = `https://images.unsplash.com/${article.heroPhoto}?w=1200&h=630&fit=crop&auto=format`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    image: heroUrl,
    author: { "@type": "Person", name: article.author, jobTitle: article.authorRole },
    publisher: { "@type": "Organization", name: "SAUDI MAG" },
    datePublished: article.meta,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://saudimag.com/article/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <main className="page" id="main-content">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/${article.relatedCategory}`}>{article.category}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <article>
          <figure className="article-hero reveal">
            <Image fill priority src={U(article.heroPhoto, 1920, 1080)} alt={article.title} data-article-hero="" sizes="100vw" />
          </figure>

          <header className="article-header container reveal">
            <div className="article-kicker">
              <CatPill category={article.category} />
              {article.sponsored && <SponsoredPill />}
            </div>
            <h1 data-en={article.title} data-ar={article.titleAr ?? article.title}>{article.title}</h1>
            <p className="article-subtitle" data-en={article.subtitle} data-ar={article.subtitleAr ?? article.subtitle}>{article.subtitle}</p>
            <div className="byline">
              <div className="author">
                <Image src={U(article.authorPhoto, 200, 200)} alt={article.author} width={54} height={54} />
                <div>
                  <span className="meta">By {article.author}</span>
                  <p>{article.meta}</p>
                </div>
              </div>
              <ShareButtons title={article.title} />
            </div>
            {sponsor && (
              <p className="ao-disclosure">
                <span data-en="Partner content — in partnership with" data-ar="محتوى برعاية — بالشراكة مع">Partner content — in partnership with</span>{" "}
                {sponsor.url ? (
                  <a href={sponsor.url} target="_blank" rel="noopener noreferrer sponsored" data-en={sponsor.name} data-ar={sponsor.nameAr ?? sponsor.name}>{sponsor.name}</a>
                ) : (
                  <span data-en={sponsor.name} data-ar={sponsor.nameAr ?? sponsor.name}>{sponsor.name}</span>
                )}
              </p>
            )}
          </header>

          <div className="container article-layout">
            <aside className="article-sidebar reveal">
              <span className="label eyebrow" data-en="In This Article" data-ar="في هذا المقال">
                In This Article
              </span>
              <ul>
                {article.body
                  .filter((b) => b.type === "h2")
                  .map((b) => (
                    <li key={b.id}>
                      <a href={`#${b.id}`}><BlockText text={b.text} textAr={b.textAr} /></a>
                    </li>
                  ))}
              </ul>
            </aside>

            <div className="article-body reveal">
              {article.body.map((block, idx) => {
                if (block.type === "h2")
                  return <h2 key={block.id} id={block.id}><BlockText text={block.text} textAr={block.textAr} /></h2>;
                if (block.type === "blockquote")
                  return <blockquote key={block.id} className="pullquote"><BlockText text={block.text} textAr={block.textAr} /></blockquote>;
                if (block.type === "video") {
                  const embed = safeEmbedUrl(block.videoUrl);
                  if (!embed) return null;
                  return (
                    <div key={block.id} className="article-video">
                      <iframe
                        src={embed}
                        title={block.text}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                const isFirst = article.body.findIndex((b) => b.type === "p") === idx;
                return (
                  <p key={block.id} id={block.id} className={isFirst ? "drop-cap" : undefined}>
                    <BlockText text={block.text} textAr={block.textAr} />
                  </p>
                );
              })}

              <div className="article-tags">
                <span className="article-tags-label">Topics</span>
                {article.tags.map((tag) => (
                  <Link key={tag} className="article-tag" href={`/search?q=${encodeURIComponent(tag)}`}>
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="author-bio">
                <div className="author-bio-avatar">
                  <Image fill src={U(article.authorPhoto, 200, 200)} alt={article.author} sizes="72px" />
                </div>
                <div>
                  <span className="author-bio-role">{article.authorRole}</span>
                  <h3 className="author-bio-name">{article.author}</h3>
                  <p data-en="Contributing to SAUDI MAG's long-form coverage of Gulf culture, cities, and contemporary life." data-ar="يساهم في تغطية SAUDI MAG المطوّلة لثقافة الخليج ومدنه والحياة المعاصرة.">Contributing to SAUDI MAG&apos;s long-form coverage of Gulf culture, cities, and contemporary life.</p>
                </div>
              </div>

              <ShareButtons title={article.title} />
            </div>
          </div>
        </article>

        <section className="section soft">
          <div className="container">
            <div className="ao-sec-head reveal">
              <h2 data-en="Read Next" data-ar="اقرأ أيضاً">Read Next</h2>
              <SeeAll href={`/${article.relatedCategory}`} />
            </div>
            <div className="ao-card-row reveal" data-count={Math.min(related.length, 3)}>
              {related.map((rel) => <AoCard key={rel.slug} a={rel} />)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/articles";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import type { Metadata } from "next";

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: `${article.title} | SAUDI MAG`, description: article.subtitle };
}

export default async function ArticleSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
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
            <img src={U(article.heroPhoto, 1920, 1080)} alt={article.title} data-article-hero="" />
          </figure>

          <header className="article-header container reveal">
            <span className="label eyebrow article-kicker">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-subtitle">{article.subtitle}</p>
            <div className="byline">
              <div className="author">
                <img src={U(article.authorPhoto, 200, 200)} alt={article.author} loading="lazy" />
                <div>
                  <span className="meta">By {article.author}</span>
                  <p>{article.meta}</p>
                </div>
              </div>
              <ShareButtons title={article.title} />
            </div>
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
                      <a href={`#${b.id}`}>{b.text}</a>
                    </li>
                  ))}
              </ul>
            </aside>

            <div className="article-body reveal">
              {article.body.map((block, idx) => {
                if (block.type === "h2")
                  return <h2 key={block.id} id={block.id}>{block.text}</h2>;
                if (block.type === "blockquote")
                  return <blockquote key={block.id} className="pullquote">{block.text}</blockquote>;
                if (block.type === "video")
                  return (
                    <div key={block.id} className="article-video">
                      <iframe
                        src={block.videoUrl}
                        title={block.text}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                const isFirst = article.body.findIndex((b) => b.type === "p") === idx;
                return (
                  <p key={block.id} id={block.id} className={isFirst ? "drop-cap" : undefined}>
                    {block.text}
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
                  <img src={U(article.authorPhoto, 200, 200)} alt={article.author} loading="lazy" />
                </div>
                <div>
                  <span className="author-bio-role">{article.authorRole}</span>
                  <h3 className="author-bio-name">{article.author}</h3>
                  <p>Contributing to SAUDI MAG&apos;s long-form coverage of Gulf culture, cities, and contemporary life.</p>
                </div>
              </div>

              <ShareButtons title={article.title} />
            </div>
          </div>
        </article>

        <section className="section soft">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <span className="label eyebrow" data-en="Read Next" data-ar="اقرأ أيضاً">Read Next</span>
                <h2 data-en="More stories" data-ar="المزيد من القصص">More stories</h2>
              </div>
              <Link
                className="button secondary"
                href={`/${article.relatedCategory}`}
                data-en="View all"
                data-ar="عرض الكل"
              >
                View all
              </Link>
            </div>
            <div className="editorial-grid">
              {article.relatedPhotos.map((photoId, i) => (
                <article key={photoId} className="article-card span-4 reveal">
                  <Link className="card-media" href="/article">
                    <img src={U(photoId, 600, 400)} alt="Related article" loading="lazy" />
                  </Link>
                  <span className="label eyebrow">{article.category}</span>
                  <h3><Link href="/article">Related story {i + 1}</Link></h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

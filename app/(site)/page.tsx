import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles, type Article } from "@/lib/articles";
import { getCategories } from "@/lib/categories";
import { U, CatPill, SponsoredPill, Byline, TitleLink, SeeAll, AoLead } from "@/components/Editorial";

export const revalidate = 3600;

const date = (a: Article) => a.meta.split("·")[0]?.trim();

/** Compact slot card: rounded image, pill + date meta row, uppercase title. */
function SlotCard({ a, sizes = "(min-width: 900px) 22vw, 100vw" }: { a: Article; sizes?: string }) {
  return (
    <article className="ao-slot-card">
      <Link className="ao-media" href={`/article/${a.slug}`}>
        <Image fill src={U(a.heroPhoto, 520, 380)} alt={a.title} sizes={sizes} />
      </Link>
      <div className="ao-slot-meta">
        <CatPill category={a.category} />
        {a.sponsored && <SponsoredPill />}
        <span className="ao-slot-date">{date(a)}</span>
      </div>
      <h3 className="ao-card-title"><TitleLink a={a} /></h3>
    </article>
  );
}

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getPublishedArticles(), getCategories()]);
  if (articles.length === 0) {
    return (
      <main className="page ao-home" id="main-content">
        <section className="section container">
          <p className="deck" data-en="No stories published yet." data-ar="لم يتم نشر أي قصص بعد.">
            No stories published yet.
          </p>
        </section>
      </main>
    );
  }
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured.slug);

  // Front-page allocation — every article appears exactly once:
  // 5-slot opener grid, then the briefs strip, then the feed. Sections
  // shrink or hide gracefully while the archive is small.
  const gridSide = rest.slice(0, 4);
  const strip = rest.slice(4, 8);
  const feed = rest.slice(8);

  // Ranked re-surfacing is the one deliberate exception (like any
  // "most read" module).
  const popular = articles.slice(0, 4);
  const spotlight = featured;
  const tickerArticles = articles.slice(0, 4);

  const sidebar = (
    <>
      {/* Editor spotlight */}
      <div className="ao-side-card reveal">
        <p className="ao-side-label" data-en="Editor&rsquo;s Spotlight" data-ar="تحت الضوء">Editor&rsquo;s Spotlight</p>
        <div className="ao-spot-head">
          <span className="ao-spot-avatar">
            <Image fill src={U(spotlight.authorPhoto, 160, 160)} alt={spotlight.author} sizes="72px" />
          </span>
          <div>
            <p className="ao-spot-name">{spotlight.author}</p>
            <p className="ao-spot-role">{spotlight.authorRole}</p>
          </div>
        </div>
        <p className="ao-spot-bio" data-en="Contributing to SAUDI MAG's long-form coverage of Gulf culture, cities, and contemporary life." data-ar="يساهم في تغطية SAUDI MAG المطوّلة لثقافة الخليج ومدنه والحياة المعاصرة.">
          Contributing to SAUDI MAG&apos;s long-form coverage of Gulf culture, cities, and contemporary life.
        </p>
        <Link className="ao-spot-link" href={`/article/${spotlight.slug}`} data-en="Read their latest" data-ar="اقرأ أحدث مقالاتهم">Read their latest</Link>
      </div>

      {/* Most popular — dark card */}
      <div className="ao-side-card dark reveal">
        <p className="ao-side-label" data-en="Most Popular" data-ar="الأكثر قراءة">Most Popular</p>
        {popular.map((a, i) => (
          <div key={a.slug} className="ao-pop-row">
            <span className="ao-pop-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="ao-media ao-pop-thumb">
              <Image fill src={U(a.heroPhoto, 160, 160)} alt="" sizes="52px" />
            </span>
            <div>
              <h3 className="ao-pop-title"><TitleLink a={a} /></h3>
              <Byline a={a} />
            </div>
          </div>
        ))}
      </div>

    </>
  );

  return (
    <main className="page ao-home" id="main-content">

      {/* ── Issue strip + top-stories ticker ── */}
      <div className="issue-strip">
        <span className="issue-num" data-en="Issue 12" data-ar="العدد 12">Issue 12</span>
        <span className="issue-dot" aria-hidden="true" />
        <span data-en="June 2026" data-ar="يونيو 2026">June 2026</span>
        <span className="issue-dot" aria-hidden="true" />
        <span data-en="Cities &amp; Culture" data-ar="المدن والثقافة">Cities &amp; Culture</span>
      </div>

      <div className="ticker-band ao-ticker reveal">
        <div className="ticker">
          <span className="label" data-en="Top Stories" data-ar="أبرز القصص">Top Stories</span>
          <div className="ticker-wrap">
            {[false, true].map((clone) => (
              <div key={String(clone)} className="ticker-track" aria-hidden={clone || undefined}>
                {tickerArticles.map((a) => (
                  <span key={a.slug} style={{ display: "contents" }}>
                    <TitleLink a={a} />
                    <span className="ticker-sep" aria-hidden="true">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Split masthead ── */}
      <div className="container ao-masthead reveal" aria-hidden="true">
        <span>SAUDI<span className="brand-dot">.</span></span>
        <span className="ao-masthead-mag">MAG</span>
      </div>

      {/* ── Five-slot opener grid ── */}
      <section className="container ao-slots reveal">
        <div className="ao-slot-col">
          {gridSide.slice(0, 2).map((a) => <SlotCard key={a.slug} a={a} />)}
        </div>
        <article className="ao-slot-feature">
          <Link className="ao-media" href={`/article/${featured.slug}`}>
            <Image fill priority src={U(featured.heroPhoto, 1000, 720)} alt={featured.title} sizes="(min-width: 900px) 46vw, 100vw" />
          </Link>
          <div className="ao-slot-meta center">
            <CatPill category={featured.category} />
            {featured.sponsored && <SponsoredPill />}
            <span className="ao-slot-date">{date(featured)}</span>
          </div>
          <h2 className="ao-slot-feature-title"><TitleLink a={featured} /></h2>
          <Byline a={featured} />
        </article>
        <div className="ao-slot-col">
          {gridSide.slice(2, 4).map((a) => <SlotCard key={a.slug} a={a} />)}
        </div>
      </section>

      {/* ── Briefs strip ── */}
      {strip.length > 0 && (
        <section className="container ao-strip-wrap reveal">
          <div className="ao-strip" data-count={strip.length}>
            {strip.map((a) => (
              <article key={a.slug} className="ao-brief">
                <Link className="ao-media ao-brief-thumb" href={`/article/${a.slug}`}>
                  <Image fill src={U(a.heroPhoto, 180, 180)} alt="" sizes="72px" />
                </Link>
                <div>
                  <h3 className="ao-brief-title"><TitleLink a={a} /></h3>
                  <div className="ao-slot-meta">
                    <CatPill category={a.category} />
                    {a.sponsored && <SponsoredPill />}
                    <span className="ao-slot-date">{date(a)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Photo-pill category nav ── */}
      <nav className="container ao-catnav reveal" aria-label="Browse categories">
        {categories.map((c, i) => {
          const photo = c.photo || articles.find((a) => a.relatedCategory === c.id)?.heroPhoto;
          return (
            <Link key={c.id} className={`ao-cat-pill${i % 2 ? " filled" : ""}`} href={`/${c.id}`}>
              {photo && (
                <span className="ao-cat-pill-img">
                  <Image fill src={U(photo, 120, 120)} alt="" sizes="60px" />
                </span>
              )}
              <span data-en={c.label} data-ar={c.labelAr}>{c.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Feed + sidebar (or sidebar band while the feed is empty) ── */}
      {feed.length > 0 ? (
        <section className="section container ao-front-cols">
          <div className="ao-feed">
            <div className="ao-sec-head reveal">
              <h2 data-en="Latest Stories" data-ar="أحدث القصص">Latest Stories</h2>
              <SeeAll href="/search" />
            </div>
            {feed.map((a, i) => <AoLead key={a.slug} a={a} flip={i % 2 === 1} />)}
          </div>
          <aside className="ao-front-side">{sidebar}</aside>
        </section>
      ) : (
        <section className="section container">
          <div className="ao-side-band">{sidebar}</div>
        </section>
      )}
    </main>
  );
}

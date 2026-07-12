import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import { getPublishedArticles, type Article } from "@/lib/articles";

export const revalidate = 3600;

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

// Route + Arabic label for each CMS category (keyed by relatedCategory route).
const DESKS: Record<string, { en: string; ar: string }> = {
  "culture": { en: "Culture", ar: "الثقافة" },
  "sports": { en: "Sports", ar: "الرياضة" },
  "f-and-b": { en: "F&B", ar: "طعام وشراب" },
  "events": { en: "Events", ar: "الفعاليات" },
  "interviews": { en: "Interviews", ar: "مقابلات" },
  "headlines": { en: "Headlines", ar: "الأخبار" },
};

const CAT_AR: Record<string, string> = {
  "Culture": "الثقافة",
  "Sports": "الرياضة",
  "F&B": "طعام وشراب",
  "Events": "الفعاليات",
  "Interviews": "مقابلات",
  "Headlines": "الأخبار",
  "Architecture & Design": "العمارة والتصميم",
};

/** First paragraph of the body with inline markdown stripped, for excerpts. */
function excerpt(a: Article): string {
  const p = a.body.find((b) => b.type === "p")?.text ?? a.subtitle;
  return p
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\([^)]*\)/g, "$1");
}

function CatPill({ category, dark = false }: { category: string; dark?: boolean }) {
  return (
    <span className={`ao-pill${dark ? " on-dark" : ""}`} data-en={category} data-ar={CAT_AR[category] ?? category}>
      {category}
    </span>
  );
}

function Byline({ a }: { a: Article }) {
  return <span className="ao-byline">{a.author || a.meta.split("·")[0]?.trim()}</span>;
}

function TitleLink({ a }: { a: Article }) {
  return (
    <Link href={`/article/${a.slug}`} data-en={a.title} data-ar={a.titleAr ?? a.title}>
      {a.title}
    </Link>
  );
}

function SeeAll({ href }: { href: string }) {
  return (
    <Link className="ao-seeall" href={href}>
      <span data-en="See all" data-ar="عرض الكل">See all</span>
      <span className="ao-seeall-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export default function HomePage() {
  const articles = getPublishedArticles();
  const hero = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== hero.slug);

  // Desk sections claim categories with at least 2 stories (lead + cards);
  // the remainder feeds Trending and the closing mixed grid, so every
  // published article appears on the portal exactly once.
  const byDesk = Object.keys(DESKS)
    .map((route) => ({ route, items: rest.filter((a) => a.relatedCategory === route).slice(0, 4) }))
    .filter((d) => d.items.length >= 2)
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, 3);
  const inDesks = new Set(byDesk.flatMap((d) => d.items.map((a) => a.slug)));
  const remaining = rest.filter((a) => !inDesks.has(a.slug));

  const trendLead = remaining[0];
  const trendList = remaining.slice(1, 4);
  const mixed = remaining.slice(4, 10);

  // Category nav pills, each carrying the newest image from that desk.
  const catNav = Object.entries(DESKS).map(([route, label]) => ({
    route,
    label,
    photo: articles.find((a) => a.relatedCategory === route)?.heroPhoto,
  }));

  return (
    <main className="page ao-home" id="main-content">

      {/* ── Full-bleed hero ── */}
      <section className="ao-hero reveal">
        <Image
          fill
          priority
          src={U(hero.heroPhoto, 1600, 1000)}
          alt={hero.title}
          sizes="100vw"
        />
        <div className="ao-hero-scrim" aria-hidden="true" />
        <div className="ao-hero-copy">
          <div className="ao-hero-pills">
            <span className="ao-pill on-dark" data-en="Featured" data-ar="مميز">Featured</span>
            <CatPill category={hero.category} dark />
          </div>
          <h1 className="ao-hero-title">
            <TitleLink a={hero} />
          </h1>
          <p className="ao-hero-deck" data-en={hero.subtitle} data-ar={hero.subtitleAr ?? hero.subtitle}>{hero.subtitle}</p>
          <Link className="ao-readmore" href={`/article/${hero.slug}`} data-en="Read more" data-ar="اقرأ المزيد">
            Read more
          </Link>
        </div>
      </section>

      {/* ── Today's Trending ── */}
      {trendLead && (
        <section className="section container">
          <div className="ao-sec-head reveal">
            <h2 data-en="Today&rsquo;s Trending" data-ar="الأكثر رواجاً اليوم">Today&rsquo;s Trending</h2>
            <SeeAll href="/headlines" />
          </div>
          <div className="ao-trend reveal">
            <article className="ao-trend-lead">
              <Link className="ao-media" href={`/article/${trendLead.slug}`}>
                <Image fill src={U(trendLead.heroPhoto, 1000, 700)} alt={trendLead.title} sizes="(min-width: 900px) 55vw, 100vw" />
              </Link>
              <CatPill category={trendLead.category} />
              <h3 className="ao-card-title"><TitleLink a={trendLead} /></h3>
              <Byline a={trendLead} />
            </article>
            <div className="ao-trend-list">
              {trendList.map((a) => (
                <article key={a.slug} className="ao-trend-row">
                  <Link className="ao-media ao-trend-thumb" href={`/article/${a.slug}`}>
                    <Image fill src={U(a.heroPhoto, 280, 280)} alt={a.title} sizes="130px" />
                  </Link>
                  <div>
                    <CatPill category={a.category} />
                    <h3 className="ao-card-title"><TitleLink a={a} /></h3>
                    <Byline a={a} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Photo-pill category nav ── */}
      <nav className="container ao-catnav reveal" aria-label="Browse categories">
        {catNav.map(({ route, label, photo }, i) => (
          <Link key={route} className={`ao-cat-pill${i % 2 ? " filled" : ""}`} href={`/${route}`}>
            {photo && (
              <span className="ao-cat-pill-img">
                <Image fill src={U(photo, 120, 120)} alt="" sizes="60px" />
              </span>
            )}
            <span data-en={label.en} data-ar={label.ar}>{label.en}</span>
          </Link>
        ))}
      </nav>

      {/* ── Desk sections ── */}
      {byDesk.map(({ route, items }) => {
        const label = DESKS[route];
        const [lead, ...row] = items;
        return (
          <section key={route} className="section container">
            <div className="ao-sec-head reveal">
              <h2 data-en={label.en} data-ar={label.ar}>{label.en}</h2>
              <SeeAll href={`/${route}`} />
            </div>
            <article className="ao-desk-lead reveal">
              <Link className="ao-media" href={`/article/${lead.slug}`}>
                <Image fill src={U(lead.heroPhoto, 900, 640)} alt={lead.title} sizes="(min-width: 900px) 42vw, 100vw" />
              </Link>
              <div className="ao-desk-lead-copy">
                <CatPill category={lead.category} />
                <h3 className="ao-card-title lg"><TitleLink a={lead} /></h3>
                <p className="ao-excerpt" data-en={excerpt(lead)} data-ar={lead.subtitleAr ?? excerpt(lead)}>{excerpt(lead)}</p>
                <Byline a={lead} />
              </div>
            </article>
            {row.length === 1 ? (
              /* A single leftover story mirrors the lead instead of sitting as
                 a lonely card in an empty row. */
              <article className="ao-desk-lead flip reveal">
                <Link className="ao-media" href={`/article/${row[0].slug}`}>
                  <Image fill src={U(row[0].heroPhoto, 900, 640)} alt={row[0].title} sizes="(min-width: 900px) 42vw, 100vw" />
                </Link>
                <div className="ao-desk-lead-copy">
                  <CatPill category={row[0].category} />
                  <h3 className="ao-card-title lg"><TitleLink a={row[0]} /></h3>
                  <p className="ao-excerpt" data-en={excerpt(row[0])} data-ar={row[0].subtitleAr ?? excerpt(row[0])}>{excerpt(row[0])}</p>
                  <Byline a={row[0]} />
                </div>
              </article>
            ) : row.length > 1 && (
              <div className="ao-card-row reveal" data-count={Math.min(row.length, 3)}>
                {row.slice(0, 3).map((a) => (
                  <article key={a.slug} className="ao-card">
                    <Link className="ao-media" href={`/article/${a.slug}`}>
                      <Image fill src={U(a.heroPhoto, 640, 460)} alt={a.title} sizes="(min-width: 900px) 30vw, 100vw" />
                    </Link>
                    <CatPill category={a.category} />
                    <h3 className="ao-card-title"><TitleLink a={a} /></h3>
                    <Byline a={a} />
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* ── Everything else from the magazine ── */}
      {mixed.length > 0 && (
        <section className="section container">
          <div className="ao-sec-head reveal">
            <h2 data-en="More From the Magazine" data-ar="المزيد من المجلة">More From the Magazine</h2>
            <SeeAll href="/search" />
          </div>
          <div className="ao-card-row reveal" data-count={Math.min(mixed.length, 3)}>
            {mixed.slice(0, 6).map((a) => (
              <article key={a.slug} className="ao-card">
                <Link className="ao-media" href={`/article/${a.slug}`}>
                  <Image fill src={U(a.heroPhoto, 640, 460)} alt={a.title} sizes="(min-width: 900px) 30vw, 100vw" />
                </Link>
                <CatPill category={a.category} />
                <h3 className="ao-card-title"><TitleLink a={a} /></h3>
                <Byline a={a} />
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section className="section soft">
        <div className="container newsletter-strip reveal">
          <div>
            <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
            <h2 data-en="Get the Gulf in your inbox." data-ar="احصل على أخبار الخليج في صندوقك.">Get the Gulf in your inbox.</h2>
            <p className="deck" data-en="The morning read for people following the region's culture, cities, and ideas. Free, every weekday." data-ar="القراءة الصباحية لمتابعي ثقافة المنطقة ومدنها وأفكارها. مجاني، كل يوم عمل.">The morning read for people following the region&apos;s culture, cities, and ideas. Free, every weekday.</p>
          </div>
          <NewsletterForm />
          <p className="newsletter-success" data-en="You&rsquo;re in. See you tomorrow." data-ar="أنت معنا. إلى اللقاء غداً.">You&rsquo;re in. See you tomorrow.</p>
        </div>
      </section>
    </main>
  );
}

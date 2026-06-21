import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Culture | SAUDI MAG",
  description: "Explore Gulf culture through heritage, contemporary art, design, and performance.",
};

export default function CulturePage() {
  return (
    <main className="page" id="main-content">
      {/* Warm editorial banner */}
      <div className="page-header page-header--warm">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Culture" data-ar="الثقافة">Culture</h1>
              <p className="deck" data-en="Exploring heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East." data-ar="استكشاف التراث والفن المعاصر والتصميم والأداء والسرد المتطور للشرق الأوسط الحديث.">
                Exploring heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {/* Full-width cinematic feature */}
      <div className="container" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
        <article className="main-lead reveal" style={{ minHeight: 540, marginBottom: "var(--stack-md)" }}>
          <Link className="main-lead-media" href="/article">
            <img src="https://picsum.photos/seed/saudimag-cat-hero/1400/900" alt="Gulf cultural district" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow">Heritage &amp; Style</span>
            <h1><Link href="/article">Public Space, Heritage, and the New Gulf City</Link></h1>
            <p>Architects, makers, and cultural organizers are drawing from the region&apos;s landscapes to build places that feel contemporary without losing memory.</p>
            <span className="meta">By Laila Al-Fayed · 12 min read</span>
          </div>
        </article>
      </div>

      {/* Asymmetric editorial grid */}
      <section className="section container">
        <div className="editorial-grid reveal">
          <article className="article-card span-4">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-cat1/600/450" alt="Artist in studio" loading="lazy" />
            </Link>
            <span className="label eyebrow">Contemporary Art</span>
            <h3><Link href="/article">The New Wave of Abstract Calligraphy</Link></h3>
            <p>Young artists deconstruct classical scripts to create internationally recognized work.</p>
            <span className="meta">By Sarah Al-Mutairi · 5 min read</span>
          </article>

          <article className="article-card span-8">
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-cat2/900/500" alt="Museum facade" loading="lazy" />
            </Link>
            <span className="label eyebrow">Architecture</span>
            <h3><Link href="/article">Designing the Future: The Architecture of Tomorrow&apos;s Museums</Link></h3>
            <p>Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language.</p>
            <span className="meta">By Tariq Fayed · 12 min read</span>
          </article>

          <article className="article-card span-6 divider-top">
            <Link className="card-media square" href="/search?q=Craftsmanship">
              <img src="https://picsum.photos/seed/saudimag-cat3/600/600" alt="Woven textiles" loading="lazy" />
            </Link>
            <span className="label eyebrow">Craftsmanship</span>
            <h3><Link href="/search?q=Craftsmanship">Reviving the Loom</Link></h3>
            <p>The artisans bringing ancient textile techniques into the 21st century.</p>
            <span className="meta">By Laila Hassan · 7 min read</span>
          </article>

          <article className="article-card span-6 divider-top">
            <Link className="card-media square" href="/search?q=Performing+Arts">
              <img src="https://picsum.photos/seed/saudimag-cat4/600/600" alt="Theater stage" loading="lazy" />
            </Link>
            <span className="label eyebrow">Performing Arts</span>
            <h3><Link href="/search?q=Performing+Arts">The Spotlight Shifts</Link></h3>
            <p>Independent theater troupes are finding new stages and eager audiences across the capital.</p>
            <span className="meta">By Omar Zayed · 8 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

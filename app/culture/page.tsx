import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Culture | SAUDI MAG",
  description:
    "Explore Gulf culture through heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East.",
};

export default function CulturePage() {
  return (
    <main className="page" id="main-content">
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1>Culture</h1>
            <p className="deck">
              Exploring heritage, contemporary art, design, performance, and the evolving narrative
              of the modern Middle East.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article
          className="article-card feature-row reveal mb-stack-lg"
          data-category-card=""
          data-category-rank="1"
          data-category-editors-choice=""
        >
          <Link className="card-media landscape" href="/article">
            <img
              src="https://picsum.photos/seed/saudimag-cat-hero/1200/700"
              alt="Fashion editorial portrait in desert light"
            />
          </Link>
          <div>
            <span className="label eyebrow">Heritage &amp; Style</span>
            <h2><Link href="/article">Public Space, Heritage, and the New Gulf City</Link></h2>
            <p className="deck">
              Architects, makers, and cultural organizers are drawing from the region&apos;s
              landscapes to build places that feel contemporary without losing memory.
            </p>
            <p className="mt-lg">
              <Link className="button secondary" href="/article">Read story</Link>
            </p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-cat1/600/450" alt="Artist in minimalist studio" loading="lazy" />
            </Link>
            <span className="label eyebrow">Contemporary Art</span>
            <h3><Link href="/article">The New Wave of Abstract Calligraphy</Link></h3>
            <p>Young artists deconstruct classical scripts to create internationally recognized masterpieces.</p>
            <span className="meta">By Sarah Al-Mutairi · 5 min read</span>
          </article>

          <article className="article-card span-8 reveal" data-category-card="" data-category-rank="2" data-category-editors-choice="">
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-cat2/900/500" alt="Modern museum facade" loading="lazy" />
            </Link>
            <span className="label eyebrow">Architecture</span>
            <h3><Link href="/article">Designing the Future: The Architecture of Tomorrow&apos;s Museums</Link></h3>
            <p>Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language.</p>
            <span className="meta">By Tariq Fayed · 12 min read</span>
          </article>

          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5">
            <Link className="card-media square" href="/search?q=Craftsmanship">
              <img src="https://picsum.photos/seed/saudimag-cat3/600/600" alt="Woven textiles with indigo and metallic threads" loading="lazy" />
            </Link>
            <span className="label eyebrow">Craftsmanship</span>
            <h3><Link href="/search?q=Craftsmanship">Reviving the Loom</Link></h3>
            <p>The artisans bringing ancient textile techniques into the 21st century.</p>
            <span className="meta">By Laila Hassan · 7 min read</span>
          </article>

          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media square" href="/search?q=Performing+Arts">
              <img src="https://picsum.photos/seed/saudimag-cat4/600/600" alt="Minimal theater stage with spotlight" loading="lazy" />
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

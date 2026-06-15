import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Events | SAUDI MAG",
  description: "Cultural gatherings, festivals, and the moments shaping the Gulf's social calendar.",
};

export default function EventsPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1 data-en="Events" data-ar="الفعاليات">Events</h1>
            <p className="deck" data-en="Cultural gatherings, festivals, premiere openings, and the moments defining the Gulf's social calendar." data-ar="التجمعات الثقافية والمهرجانات والفعاليات التي تشكّل التقويم الاجتماعي في الخليج.">
              Cultural gatherings, festivals, premiere openings, and the moments defining the Gulf&apos;s social calendar.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article className="article-card feature-row reveal mb-stack-lg" data-category-card="" data-category-rank="1" data-category-editors-choice="">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-ev-feat/1200/700" alt="Riyadh Season" />
          </Link>
          <div>
            <span className="label eyebrow">Cover Story</span>
            <h2><Link href="/article">Riyadh Season: Inside the World&apos;s Largest Entertainment Programme</Link></h2>
            <p className="deck">From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world&apos;s most ambitious urban entertainment experiment — and cities everywhere are taking notes.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="2">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-ev1/600/440" alt="Concert crowd" loading="lazy" /></Link>
            <span className="label eyebrow">Music</span>
            <h3><Link href="/article">MDL Beast Becomes a Global Benchmark for Festival Design</Link></h3>
            <p>The annual electronic music festival raises the bar on stage design, artist curation, and crowd experience.</p>
            <span className="meta">6 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-ev2/600/440" alt="Art installation" loading="lazy" /></Link>
            <span className="label eyebrow">Art</span>
            <h3><Link href="/article">Noor Riyadh Illuminates the City for Its Biggest Edition Yet</Link></h3>
            <p>The international festival of light and art returns across 70 locations with artists from 30 countries.</p>
            <span className="meta">5 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-ev3/600/440" alt="Film screening" loading="lazy" /></Link>
            <span className="label eyebrow">Film</span>
            <h3><Link href="/article">Red Sea International Film Festival Cements Its Global Reputation</Link></h3>
            <p>Jeddah&apos;s annual cinema showcase attracts premieres and jury names that rival Cannes and Toronto.</p>
            <span className="meta">7 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5" data-category-editors-choice="">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-ev4/600/440" alt="Fashion show" loading="lazy" /></Link>
            <span className="label eyebrow">Fashion</span>
            <h3><Link href="/article">Arab Fashion Week Moves Its Centrepiece Show to AlUla</Link></h3>
            <p>The landmark desert setting becomes the backdrop for a cultural fashion moment that defines a new geography of style.</p>
            <span className="meta">4 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="6">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-ev5/600/440" alt="Cultural salon" loading="lazy" /></Link>
            <span className="label eyebrow">Culture</span>
            <h3><Link href="/article">The Salon Circuit: Private Cultural Gatherings Shaping Gulf Ideas</Link></h3>
            <p>Invitation-only evenings where intellectuals, artists, and policymakers meet are quietly influencing the region&apos;s agenda.</p>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

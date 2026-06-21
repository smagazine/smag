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
      {/* Clean banner with current month */}
      <div className="page-header">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <span className="label eyebrow" style={{ marginBottom: 12, display: "block" }}>June 2026</span>
              <h1 data-en="Events" data-ar="الفعاليات">Events</h1>
              <p className="deck" data-en="Cultural gatherings, festivals, and the moments defining the Gulf's social calendar." data-ar="التجمعات الثقافية والمهرجانات التي تشكّل التقويم الاجتماعي في الخليج.">
                Cultural gatherings, festivals, premiere openings, and the moments defining the Gulf&apos;s social calendar.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {/* Feature event */}
      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-ev-feat/1200/700" alt="Riyadh Season" />
          </Link>
          <div>
            <div className="event-badge">
              <span className="day">14</span>
              <span className="month">Jun</span>
            </div>
            <span className="label eyebrow">Cover Story</span>
            <h2><Link href="/article">Riyadh Season: Inside the World&apos;s Largest Entertainment Programme</Link></h2>
            <p className="deck">From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world&apos;s most ambitious urban entertainment experiment.</p>
            <span className="event-venue">King Fahd International Stadium · Riyadh</span>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        {/* Event cards with date badges */}
        <div className="events-grid reveal">
          <article className="event-card article-card">
            <div className="event-badge"><span className="day">18</span><span className="month">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-ev1/600/380" alt="MDL Beast" loading="lazy" />
            </Link>
            <span className="label eyebrow">Music</span>
            <h3><Link href="/article">MDL Beast Becomes a Global Benchmark for Festival Design</Link></h3>
            <span className="event-venue">Banban, Riyadh</span>
            <span className="meta">6 min read</span>
          </article>

          <article className="event-card article-card">
            <div className="event-badge"><span className="day">22</span><span className="month">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-ev2/600/380" alt="Noor Riyadh" loading="lazy" />
            </Link>
            <span className="label eyebrow">Art</span>
            <h3><Link href="/article">Noor Riyadh Illuminates the City for Its Biggest Edition Yet</Link></h3>
            <span className="event-venue">70 Locations · Riyadh</span>
            <span className="meta">5 min read</span>
          </article>

          <article className="event-card article-card">
            <div className="event-badge"><span className="day">28</span><span className="month">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-ev3/600/380" alt="Red Sea Film Festival" loading="lazy" />
            </Link>
            <span className="label eyebrow">Film</span>
            <h3><Link href="/article">Red Sea International Film Festival Cements Its Global Reputation</Link></h3>
            <span className="event-venue">Corniche · Jeddah</span>
            <span className="meta">7 min read</span>
          </article>

          <article className="event-card article-card">
            <div className="event-badge"><span className="day">3</span><span className="month">Jul</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-ev4/600/380" alt="Arab Fashion Week" loading="lazy" />
            </Link>
            <span className="label eyebrow">Fashion</span>
            <h3><Link href="/article">Arab Fashion Week Moves Its Centrepiece Show to AlUla</Link></h3>
            <span className="event-venue">Hegra · AlUla</span>
            <span className="meta">4 min read</span>
          </article>

          <article className="event-card article-card">
            <div className="event-badge"><span className="day">9</span><span className="month">Jul</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-ev5/600/380" alt="Cultural salon" loading="lazy" />
            </Link>
            <span className="label eyebrow">Culture</span>
            <h3><Link href="/article">The Salon Circuit: Private Cultural Gatherings Shaping Gulf Ideas</Link></h3>
            <span className="event-venue">Private Venue · Riyadh</span>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

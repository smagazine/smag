import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Sports | SAUDI MAG",
  description: "Athletic culture, wellness, and the sporting events drawing global attention to the Gulf.",
};

export default function SportsPage() {
  return (
    <main className="page" id="main-content">
      {/* Dark charcoal banner with stats */}
      <div className="page-header page-header--dark">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Sports" data-ar="الرياضة">Sports</h1>
              <p className="deck" data-en="Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf." data-ar="الثقافة الرياضية والفعاليات العالمية وحركات العافية في الخليج.">
                Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf.
              </p>
            </div>
            <CategoryFilters />
          </div>
          <div className="sports-stats-strip reveal">
            <div className="sports-stat">
              <span className="sports-stat-num">12</span>
              <span className="sports-stat-label">Major Events This Season</span>
            </div>
            <div className="sports-stat">
              <span className="sports-stat-num">4M+</span>
              <span className="sports-stat-label">Tickets Sold</span>
            </div>
            <div className="sports-stat">
              <span className="sports-stat-num">82</span>
              <span className="sports-stat-label">Countries Represented</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic full-width feature */}
      <div className="container" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
        <article className="sports-feature reveal">
          <div className="sports-feature-media">
            <img src="https://picsum.photos/seed/saudimag-sp-feat/1400/800" alt="Gulf sports" />
          </div>
          <div className="sports-feature-copy">
            <span className="sport-badge">Deep Dive</span>
            <h2><Link href="/article">How the Gulf Became Global Sport&apos;s New Centre of Gravity</Link></h2>
            <p className="deck">From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League&apos;s global signings, a systematic strategy is turning the kingdom into the world&apos;s most ambitious sporting destination.</p>
            <p style={{ marginTop: 20 }}><Link className="button" href="/article">Read story</Link></p>
          </div>
        </article>
      </div>

      {/* Sports grid with category badges */}
      <section className="section container">
        <div className="sports-grid reveal">
          <article className="article-card">
            <span className="sport-badge">Football</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-sp1/600/380" alt="Football match" loading="lazy" />
            </Link>
            <h3><Link href="/article">The Saudi Pro League&apos;s Global Moment Is Just Beginning</Link></h3>
            <p>Attendances are up, broadcast deals are growing, and the talent pipeline is delivering results.</p>
            <span className="meta">7 min read</span>
          </article>

          <article className="article-card">
            <span className="sport-badge">Motorsport</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-sp2/600/380" alt="Formula 1" loading="lazy" />
            </Link>
            <h3><Link href="/article">Jeddah Corniche Circuit: More Than a Race, a City Statement</Link></h3>
            <p>The street circuit beside the Red Sea has become one of the most dramatic venues on the F1 calendar.</p>
            <span className="meta">5 min read</span>
          </article>

          <article className="article-card">
            <span className="sport-badge">Golf</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-sp3/600/380" alt="Golf course" loading="lazy" />
            </Link>
            <h3><Link href="/article">LIV Golf One Year On: What It Changed and What It Didn&apos;t</Link></h3>
            <p>An honest accounting of the tour&apos;s first full season — the wins, the controversies, what&apos;s next.</p>
            <span className="meta">8 min read</span>
          </article>

          <article className="article-card">
            <span className="sport-badge">Combat Sports</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-sp4/600/380" alt="Boxing event" loading="lazy" />
            </Link>
            <h3><Link href="/article">Riyadh Season&apos;s Fight Nights Are Rewriting Boxing&apos;s World Order</Link></h3>
            <p>Unprecedented purses and neutral ground have made Saudi Arabia the new home of boxing&apos;s biggest bouts.</p>
            <span className="meta">6 min read</span>
          </article>

          <article className="article-card">
            <span className="sport-badge">Wellness</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://picsum.photos/seed/saudimag-sp5/600/380" alt="Wellness" loading="lazy" />
            </Link>
            <h3><Link href="/article">The Wellness Economy Is Reshaping Gulf Urban Life</Link></h3>
            <p>From rooftop yoga to al-fresco running clubs, a generation is redefining healthy living in the Gulf.</p>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

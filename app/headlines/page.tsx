import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Headlines | SAUDI MAG",
  description: "Breaking news and current affairs from across the Arabian Peninsula.",
};

export default function HeadlinesPage() {
  return (
    <main className="page" id="main-content">
      {/* Dark masthead banner */}
      <div className="page-header page-header--dark">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Headlines" data-ar="الأخبار">Headlines</h1>
              <p className="deck" data-en="Breaking news and current affairs from across the Arabian Peninsula." data-ar="أخبار عاجلة وشؤون راهنة من شبه الجزيرة العربية.">
                Breaking news and current affairs from across the Arabian Peninsula and the wider Gulf region.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {/* Cinematic feature */}
      <div className="container">
        <article className="main-lead reveal" style={{ minHeight: 480, marginBottom: "var(--stack-md)", marginTop: "clamp(24px,4vw,48px)" }}>
          <Link className="main-lead-media" href="/article">
            <img src="https://picsum.photos/seed/saudimag-hl-feat/1400/800" alt="Vision 2030 milestones" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow">Top Story</span>
            <h1><Link href="/article">Vision 2030 Milestones: What Has Been Built, What Comes Next</Link></h1>
            <p>A comprehensive look at the projects that have reshaped the kingdom&apos;s infrastructure, culture, and economy — and the ambitious initiatives still on the horizon.</p>
            <span className="meta">By Nasser Al-Turki · 8 min read</span>
          </div>
        </article>
      </div>

      {/* Newspaper list */}
      <section className="section container">
        <div className="newsrow-list reveal">
          <a className="newsrow" href="/article">
            <div className="newsrow-thumb">
              <img src="https://picsum.photos/seed/saudimag-hl1/400/300" alt="Gulf trade" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow">Politics</span>
              <h3>Gulf States Align on New Regional Trade Framework</h3>
              <p>Negotiations conclude with a landmark agreement covering energy, logistics, and digital infrastructure.</p>
              <span className="meta">4 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article">
            <div className="newsrow-thumb">
              <img src="https://picsum.photos/seed/saudimag-hl2/400/300" alt="Tourism numbers" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow">Economy</span>
              <h3>Saudi Arabia Posts Record Tourism Numbers Ahead of Season</h3>
              <p>The General Authority for Tourism reports a historic quarter driven by cultural events and improved connectivity.</p>
              <span className="meta">5 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article">
            <div className="newsrow-thumb">
              <img src="https://picsum.photos/seed/saudimag-hl3/400/300" alt="NEOM" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow">Tech</span>
              <h3>NEOM Reveals Next Phase of Connectivity Infrastructure</h3>
              <p>The Line&apos;s backbone network promises latency and capacity figures that challenge conventional urban models.</p>
              <span className="meta">6 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article">
            <div className="newsrow-thumb">
              <img src="https://picsum.photos/seed/saudimag-hl4/400/300" alt="Heritage law" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow">Society</span>
              <h3>New Cultural Heritage Law Expands Protections Across the Kingdom</h3>
              <p>Historic sites from Diriyah to AlUla receive strengthened conservation frameworks under the updated statute.</p>
              <span className="meta">7 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article">
            <div className="newsrow-thumb">
              <img src="https://picsum.photos/seed/saudimag-hl5/400/300" alt="Green initiative" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow">Energy</span>
              <h3>Saudi Green Initiative Reaches Midpoint Ahead of Schedule</h3>
              <p>Renewable capacity additions outpace original projections as NEOM&apos;s energy grid delivers first export-grade power.</p>
              <span className="meta">5 min read</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

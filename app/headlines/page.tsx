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
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1 data-en="Headlines" data-ar="الأخبار">Headlines</h1>
            <p className="deck" data-en="Breaking news and current affairs from across the Arabian Peninsula and the wider Gulf region." data-ar="أخبار عاجلة وشؤون راهنة من أرجاء شبه الجزيرة العربية.">
              Breaking news and current affairs from across the Arabian Peninsula and the wider Gulf region.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article className="article-card feature-row reveal mb-stack-lg" data-category-card="" data-category-rank="1" data-category-editors-choice="">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-hl-feat/1200/700" alt="Vision 2030 milestones" />
          </Link>
          <div>
            <span className="label eyebrow">Top Story</span>
            <h2><Link href="/article">Vision 2030 Milestones: What Has Been Built, What Comes Next</Link></h2>
            <p className="deck">A comprehensive look at the projects that have reshaped the kingdom&apos;s infrastructure, culture, and economy — and the ambitious initiatives still on the horizon.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="2">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-hl1/600/440" alt="Government building" loading="lazy" /></Link>
            <span className="label eyebrow">Politics</span>
            <h3><Link href="/article">Gulf States Align on New Regional Trade Framework</Link></h3>
            <p>Negotiations conclude with a landmark agreement covering energy, logistics, and digital infrastructure.</p>
            <span className="meta">4 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-hl2/600/440" alt="City skyline" loading="lazy" /></Link>
            <span className="label eyebrow">Economy</span>
            <h3><Link href="/article">Saudi Arabia Posts Record Tourism Numbers Ahead of Season</Link></h3>
            <p>The General Authority for Tourism reports a historic quarter driven by cultural events and improved connectivity.</p>
            <span className="meta">5 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-hl3/600/440" alt="Technology conference" loading="lazy" /></Link>
            <span className="label eyebrow">Tech</span>
            <h3><Link href="/article">NEOM Reveals Next Phase of Connectivity Infrastructure</Link></h3>
            <p>The Line&apos;s backbone network promises latency and capacity figures that challenge conventional urban models.</p>
            <span className="meta">6 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5" data-category-editors-choice="">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-hl4/600/440" alt="Cultural ceremony" loading="lazy" /></Link>
            <span className="label eyebrow">Society</span>
            <h3><Link href="/article">New Cultural Heritage Law Expands Protections Across the Kingdom</Link></h3>
            <p>Historic sites from Diriyah to AlUla receive strengthened conservation frameworks under the updated statute.</p>
            <span className="meta">7 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="6">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-hl5/600/440" alt="Energy facility" loading="lazy" /></Link>
            <span className="label eyebrow">Energy</span>
            <h3><Link href="/article">Saudi Green Initiative Reaches Midpoint Ahead of Schedule</Link></h3>
            <p>Renewable capacity additions outpace original projections as NEOM&apos;s energy grid delivers first export-grade power.</p>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

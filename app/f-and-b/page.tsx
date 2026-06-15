import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "F&B | SAUDI MAG",
  description: "Restaurant openings, chef profiles, and the Gulf's rapidly evolving dining culture.",
};

export default function FAndBPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1 data-en="F&B" data-ar="طعام وشراب">F&amp;B</h1>
            <p className="deck" data-en="Restaurant openings, chef profiles, culinary travel, and the Gulf's rapidly evolving dining culture." data-ar="افتتاحات المطاعم وملامح الطهاة وثقافة تناول الطعام المتطورة في الخليج.">
              Restaurant openings, chef profiles, culinary travel, and the Gulf&apos;s rapidly evolving dining culture.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article className="article-card feature-row reveal mb-stack-lg" data-category-card="" data-category-rank="1" data-category-editors-choice="">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-fb-feat/1200/700" alt="Chef profile" />
          </Link>
          <div>
            <span className="label eyebrow">Chef Profile</span>
            <h2><Link href="/article">The Chefs Redefining Saudi Cuisine One Plate at a Time</Link></h2>
            <p className="deck">A generation of Saudi-trained chefs is returning home with international technique and a fierce desire to cook from memory — drawing on grandmother&apos;s recipes, desert herbs, and forgotten fermentation traditions.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="2">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-fb1/600/440" alt="Restaurant interior" loading="lazy" /></Link>
            <span className="label eyebrow">Opening</span>
            <h3><Link href="/article">Bait Al-Kaif: Riyadh&apos;s Most Anticipated Opening of the Year</Link></h3>
            <p>The multi-concept dining destination from the team behind Afternoon blends Levantine and Najdi traditions across four rooms.</p>
            <span className="meta">5 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-fb2/600/440" alt="Artisan coffee" loading="lazy" /></Link>
            <span className="label eyebrow">Café Culture</span>
            <h3><Link href="/article">Third Wave Coffee Takes Root Across the Kingdom</Link></h3>
            <p>Independent roasters and neighbourhood cafés are reshaping how Saudis start their mornings and afternoons.</p>
            <span className="meta">4 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-fb3/600/440" alt="Fine dining plate" loading="lazy" /></Link>
            <span className="label eyebrow">Fine Dining</span>
            <h3><Link href="/article">Jeddah&apos;s Corniche Dining Scene Is Growing Up Fast</Link></h3>
            <p>White-tablecloth restaurants are finding an audience willing to stay for three hours and talk about what they ate.</p>
            <span className="meta">6 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5" data-category-editors-choice="">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-fb4/600/440" alt="Food festival" loading="lazy" /></Link>
            <span className="label eyebrow">Events</span>
            <h3><Link href="/article">Taste of Diriyah Returns With 40 Saudi Concepts</Link></h3>
            <p>The annual festival expands to three weekends and doubles its footprint with a dedicated artisan food market.</p>
            <span className="meta">3 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="6">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-fb5/600/440" alt="Pastry workshop" loading="lazy" /></Link>
            <span className="label eyebrow">Craft</span>
            <h3><Link href="/article">The Bakers Reviving Gulf Pastry Traditions</Link></h3>
            <p>From saffron kanafeh to date-studded breads, a new wave of pastry chefs is making sweet history.</p>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

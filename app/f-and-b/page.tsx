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
      {/* Cream editorial banner */}
      <div className="page-header page-header--cream">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="F&B" data-ar="طعام وشراب">F&amp;B</h1>
              <p className="deck" data-en="Restaurant openings, chef profiles, culinary travel, and the Gulf's rapidly evolving dining culture." data-ar="افتتاحات المطاعم وملامح الطهاة وثقافة تناول الطعام في الخليج.">
                Restaurant openings, chef profiles, culinary travel, and the Gulf&apos;s rapidly evolving dining culture.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {/* Chef portrait feature */}
      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <div>
            <span className="label eyebrow">Chef Profile</span>
            <h2><Link href="/article">The Chefs Redefining Saudi Cuisine One Plate at a Time</Link></h2>
            <p className="deck">A generation of Saudi-trained chefs is returning home with international technique and a fierce desire to cook from memory — drawing on grandmother&apos;s recipes, desert herbs, and forgotten fermentation traditions.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
          <Link className="card-media" href="/article">
            <img src="https://picsum.photos/seed/saudimag-fb-feat/800/1000" alt="Chef portrait" />
          </Link>
        </article>

        {/* Square food grid */}
        <div className="fnb-grid reveal">
          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb1/500/500" alt="Restaurant interior" loading="lazy" />
            </Link>
            <span className="label eyebrow">Opening</span>
            <h3><Link href="/article">Bait Al-Kaif: Riyadh&apos;s Most Anticipated Opening of the Year</Link></h3>
            <span className="meta">5 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb2/500/500" alt="Artisan coffee" loading="lazy" />
            </Link>
            <span className="label eyebrow">Café Culture</span>
            <h3><Link href="/article">Third Wave Coffee Takes Root Across the Kingdom</Link></h3>
            <span className="meta">4 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb3/500/500" alt="Fine dining" loading="lazy" />
            </Link>
            <span className="label eyebrow">Fine Dining</span>
            <h3><Link href="/article">Jeddah&apos;s Corniche Dining Scene Is Growing Up Fast</Link></h3>
            <span className="meta">6 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb4/500/500" alt="Food festival" loading="lazy" />
            </Link>
            <span className="label eyebrow">Events</span>
            <h3><Link href="/article">Taste of Diriyah Returns With 40 Saudi Concepts</Link></h3>
            <span className="meta">3 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb5/500/500" alt="Pastry" loading="lazy" />
            </Link>
            <span className="label eyebrow">Craft</span>
            <h3><Link href="/article">The Bakers Reviving Gulf Pastry Traditions</Link></h3>
            <span className="meta">5 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media square" href="/article">
              <img src="https://picsum.photos/seed/saudimag-fb6/500/500" alt="Spice market" loading="lazy" />
            </Link>
            <span className="label eyebrow">Ingredients</span>
            <h3><Link href="/article">The Spice Route Revival: Old Ingredients, New Kitchens</Link></h3>
            <span className="meta">6 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

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
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1 data-en="Sports" data-ar="الرياضة">Sports</h1>
            <p className="deck" data-en="Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf." data-ar="الثقافة الرياضية والفعاليات العالمية وحركات العافية التي تجذب الأنظار إلى الخليج.">
              Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article className="article-card feature-row reveal mb-stack-lg" data-category-card="" data-category-rank="1" data-category-editors-choice="">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-sp-feat/1200/700" alt="Gulf sports" />
          </Link>
          <div>
            <span className="label eyebrow">Deep Dive</span>
            <h2><Link href="/article">How the Gulf Became Global Sport&apos;s New Centre of Gravity</Link></h2>
            <p className="deck">From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League&apos;s global signings, a systematic strategy is turning the kingdom into the world&apos;s most ambitious sporting destination.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="2">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-sp1/600/440" alt="Football match" loading="lazy" /></Link>
            <span className="label eyebrow">Football</span>
            <h3><Link href="/article">The Saudi Pro League&apos;s Global Moment Is Just Beginning</Link></h3>
            <p>Attendances are up, broadcast deals are growing, and the talent pipeline from the academies is finally producing results.</p>
            <span className="meta">7 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-sp2/600/440" alt="Formula 1 race" loading="lazy" /></Link>
            <span className="label eyebrow">Motorsport</span>
            <h3><Link href="/article">Jeddah Corniche Circuit: More Than a Race, a City Statement</Link></h3>
            <p>The street circuit that runs beside the Red Sea has become one of the most dramatic and debated venues on the F1 calendar.</p>
            <span className="meta">5 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-sp3/600/440" alt="Golf course" loading="lazy" /></Link>
            <span className="label eyebrow">Golf</span>
            <h3><Link href="/article">LIV Golf One Year On: What It Changed and What It Didn&apos;t</Link></h3>
            <p>An honest accounting of the tour&apos;s first full season — the wins, the controversies, and what it means for the sport&apos;s future.</p>
            <span className="meta">8 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5" data-category-editors-choice="">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-sp4/600/440" alt="Boxing event" loading="lazy" /></Link>
            <span className="label eyebrow">Combat Sports</span>
            <h3><Link href="/article">Riyadh Season&apos;s Fight Nights Are Rewriting Boxing&apos;s World Order</Link></h3>
            <p>Unprecedented purses and neutral-ground settings have made Saudi Arabia the new home of the sport&apos;s biggest bouts.</p>
            <span className="meta">6 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="6">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-sp5/600/440" alt="Wellness studio" loading="lazy" /></Link>
            <span className="label eyebrow">Wellness</span>
            <h3><Link href="/article">The Wellness Economy Is Reshaping Gulf Urban Life</Link></h3>
            <p>From rooftop yoga studios to al-fresco running clubs, a generation of Gulf residents is redefining healthy living.</p>
            <span className="meta">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";

export const metadata: Metadata = {
  title: "Interviews | SAUDI MAG",
  description: "In conversation with the artists, chefs, architects, and voices defining the Gulf.",
};

export default function InterviewsPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container pt-section-top">
        <div className="section-header reveal">
          <div>
            <h1 data-en="Interviews" data-ar="مقابلات">Interviews</h1>
            <p className="deck" data-en="In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf's future." data-ar="حوارات مع الفنانين والطهاة والمعماريين وأصوات الثقافة التي تصنع مستقبل الخليج.">
              In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf&apos;s future.
            </p>
          </div>
          <CategoryFilters />
        </div>

        <article className="article-card feature-row reveal mb-stack-lg" data-category-card="" data-category-rank="1" data-category-editors-choice="">
          <Link className="card-media landscape" href="/article">
            <img src="https://picsum.photos/seed/saudimag-int-feat/1200/700" alt="Architect interview" />
          </Link>
          <div>
            <span className="label eyebrow">Long Read</span>
            <h2><Link href="/article">An Hour with the Architect Behind Riyadh&apos;s Most Talked-About Building</Link></h2>
            <p className="deck">Khalid Al-Mansouri spent five years designing a cultural centre that looks nothing like anything else in the city. He talks about silence, shadow, and why the most important material in the Gulf is still light.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read story</Link></p>
          </div>
        </article>

        <div className="editorial-grid">
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="2">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-int1/600/440" alt="Portrait of chef" loading="lazy" /></Link>
            <span className="label eyebrow">Food &amp; Culture</span>
            <h3><Link href="/article">Bader Al-Rashed: &lsquo;Saudi Cuisine Doesn&apos;t Need to Explain Itself Anymore&rsquo;</Link></h3>
            <p>The chef behind three of Riyadh&apos;s most acclaimed restaurants on identity, memory, and the freedom of cooking at home.</p>
            <span className="meta">8 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="3">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-int2/600/440" alt="Portrait of artist" loading="lazy" /></Link>
            <span className="label eyebrow">Contemporary Art</span>
            <h3><Link href="/article">Maha Al-Dosari on Abstraction, Arabic Script, and Going Global</Link></h3>
            <p>The calligrapher-turned-painter discusses her residency in Berlin, her first New York show, and what she misses about Dammam.</p>
            <span className="meta">9 min read</span>
          </article>
          <article className="article-card span-4 reveal" data-category-card="" data-category-rank="4">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-int3/600/440" alt="Portrait of entrepreneur" loading="lazy" /></Link>
            <span className="label eyebrow">Business</span>
            <h3><Link href="/article">Nora Al-Qassim on Building a Quiet Gulf Brand with Global Reach</Link></h3>
            <p>The founder of a sustainable accessories label on patience, craft, and why she turned down three acquisition offers.</p>
            <span className="meta">7 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="5" data-category-editors-choice="">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-int4/600/440" alt="Film director portrait" loading="lazy" /></Link>
            <span className="label eyebrow">Film</span>
            <h3><Link href="/article">Omar Abdulaziz Al-Farsi: &lsquo;Arab Cinema Has Found Its Moment&rsquo;</Link></h3>
            <p>The director of two Sundance selections on storytelling, censorship, and why the Gulf&apos;s film scene is finally ready.</p>
            <span className="meta">10 min read</span>
          </article>
          <article className="article-card span-6 divider-top reveal" data-category-card="" data-category-rank="6">
            <Link className="card-media" href="/article"><img src="https://picsum.photos/seed/saudimag-int5/600/440" alt="Fashion designer" loading="lazy" /></Link>
            <span className="label eyebrow">Style</span>
            <h3><Link href="/article">Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience</Link></h3>
            <p>The Riyadh-based designer on what it means to dress culturally and globally at the same time.</p>
            <span className="meta">6 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

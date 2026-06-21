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
      {/* Minimal serif banner — person first */}
      <div className="page-header">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Interviews" data-ar="مقابلات" style={{ fontStyle: "italic" }}>Interviews</h1>
              <p className="deck" data-en="In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf's future." data-ar="حوارات مع الفنانين والطهاة والمعماريين وأصوات الثقافة في الخليج.">
                In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf&apos;s future.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {/* Portrait feature with pull quote */}
      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <Link className="card-media" href="/article">
            <img src="https://picsum.photos/seed/saudimag-int-feat/800/1000" alt="Architect interview portrait" />
          </Link>
          <div>
            <span className="label eyebrow">Long Read</span>
            <h2><Link href="/article">An Hour with the Architect Behind Riyadh&apos;s Most Talked-About Building</Link></h2>
            <blockquote className="interview-pullquote">
              &ldquo;The most important material in the Gulf is still light. Everything else is a response to it.&rdquo;
            </blockquote>
            <p className="deck" style={{ marginTop: 16 }}>Khalid Al-Mansouri spent five years designing a cultural centre that looks nothing like anything else in the city. He talks about silence, shadow, and why the most important material in the Gulf is still light.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article">Read interview</Link></p>
          </div>
        </article>

        {/* Portrait grid with pull quotes */}
        <div className="interview-grid reveal">
          <article className="article-card">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-int1/400/533" alt="Chef portrait" loading="lazy" />
            </Link>
            <span className="label eyebrow">Food &amp; Culture</span>
            <h3><Link href="/article">Bader Al-Rashed: &lsquo;Saudi Cuisine Doesn&apos;t Need to Explain Itself Anymore&rsquo;</Link></h3>
            <p className="interview-pullquote">&ldquo;Cooking at home taught me more than any kitchen I trained in.&rdquo;</p>
            <span className="meta">8 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-int2/400/533" alt="Artist portrait" loading="lazy" />
            </Link>
            <span className="label eyebrow">Contemporary Art</span>
            <h3><Link href="/article">Maha Al-Dosari on Abstraction, Arabic Script, and Going Global</Link></h3>
            <p className="interview-pullquote">&ldquo;Arabic has a visual logic that no other script touches.&rdquo;</p>
            <span className="meta">9 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-int3/400/533" alt="Entrepreneur portrait" loading="lazy" />
            </Link>
            <span className="label eyebrow">Business</span>
            <h3><Link href="/article">Nora Al-Qassim on Building a Quiet Gulf Brand with Global Reach</Link></h3>
            <p className="interview-pullquote">&ldquo;I turned down three acquisitions. Patience is not timidity.&rdquo;</p>
            <span className="meta">7 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-int4/400/533" alt="Director portrait" loading="lazy" />
            </Link>
            <span className="label eyebrow">Film</span>
            <h3><Link href="/article">Omar Al-Farsi: &lsquo;Arab Cinema Has Found Its Moment&rsquo;</Link></h3>
            <p className="interview-pullquote">&ldquo;The Gulf has stories the world hasn&apos;t seen yet.&rdquo;</p>
            <span className="meta">10 min read</span>
          </article>

          <article className="article-card">
            <Link className="card-media" href="/article">
              <img src="https://picsum.photos/seed/saudimag-int5/400/533" alt="Designer portrait" loading="lazy" />
            </Link>
            <span className="label eyebrow">Style</span>
            <h3><Link href="/article">Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience</Link></h3>
            <p className="interview-pullquote">&ldquo;Modesty is not a constraint. It&apos;s a creative frame.&rdquo;</p>
            <span className="meta">6 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

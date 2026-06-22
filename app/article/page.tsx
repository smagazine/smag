"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import { showDemoToast } from "@/components/DemoToast";
import type { Metadata } from "next";

export default function ArticlePage() {
  const handleShareEmail = () => {
    const title = "The New Era of Saudi Architecture: A Silent Revolution in Stone";
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showDemoToast("Article link copied.");
    } catch {
      showDemoToast("Copy this page URL from your browser address bar.");
    }
  };

  return (
    <>
      <ReadingProgress />
      <main className="page" id="main-content">
        <article>
          <figure className="article-hero reveal">
            <img
              src="https://loremflickr.com/1920/1080/architecture,city?lock=6"
              alt="Modern Saudi architectural landmark at dusk with cinematic lighting"
              data-article-hero=""
            />
          </figure>

          <header className="article-header container reveal">
            <span className="label eyebrow article-kicker" data-article-category="">
              Architecture &amp; Design
            </span>
            <h1 data-article-title="">
              The New Era of Saudi Architecture: A Silent Revolution in Stone
            </h1>
            <p className="article-subtitle" data-article-summary="">
              A deep dive into the minimal and elegant landmarks redefining the skyline of Riyadh,
              where traditional forms meet modern austerity.
            </p>
            <div className="byline">
              <div className="author">
                <img
                  src="https://loremflickr.com/200/200/architecture,city?lock=7"
                  alt="Author portrait"
                  loading="lazy"
                />
                <div>
                  <span className="meta" data-article-author="">
                    By Laila Al-Fayed
                  </span>
                  <p data-article-meta="">October 24, 2024 · 8 min read</p>
                </div>
              </div>
              <div>
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Share by email"
                  onClick={handleShareEmail}
                >
                  <span className="material-symbols-outlined">mail</span>
                </button>
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Copy article link"
                  onClick={handleCopyLink}
                >
                  <span className="material-symbols-outlined">link</span>
                </button>
              </div>
            </div>
          </header>

          <div className="container article-layout">
            <aside className="article-sidebar reveal">
              <span className="label eyebrow" data-en="In This Article" data-ar="في هذا المقال">
                In This Article
              </span>
              <ul>
                <li><a href="#minimalist-shift">The Minimalist Shift</a></li>
                <li><a href="#riyadh-skyline">Riyadh&apos;s New Skyline</a></li>
                <li><a href="#material-innovation">Material Innovation</a></li>
                <li><a href="#future-form">The Future Form</a></li>
              </ul>
            </aside>

            <div className="article-body reveal" data-article-body="">
              <p className="drop-cap" id="minimalist-shift">
                The desert wind carries more than sand across the sweeping plains of the Najd
                region; today, it carries the quiet echoes of a profound architectural
                transformation. For decades, the skyline of Riyadh was characterized by
                utilitarian structures and ambitious, albeit sometimes disjointed, modern towers.
                Yet a new aesthetic paradigm is taking root, one that eschews ostentation in favor
                of restrained, almost meditative elegance.
              </p>
              <p id="riyadh-skyline">
                At the heart of this movement is a deliberate return to the essence of materiality.
                The new breed of Saudi architects is looking inward, drawing inspiration from the
                harsh, beautiful landscape that surrounds them. Rather than importing
                glass-and-steel concepts ill-suited to the climate, they are innovating with local
                limestone, rammed earth, and specially engineered concrete that reflects heat while
                absorbing the rich, golden light of the setting sun.
              </p>
              <blockquote className="pullquote">
                &ldquo;We are no longer building to conquer the desert; we are designing to
                converse with it. The most generous spaces are the ones that leave room for
                people.&rdquo;
              </blockquote>
              <h2 id="material-innovation">The Geometry of Silence</h2>
              <p>
                Walking through the newly inaugurated cultural district feels less like navigating
                a city and more like exploring a monumental sculpture garden. The buildings here do
                not scream for attention; they anchor the space with immense, unadorned volumes.
                Narrow apertures replace expansive windows, creating dramatic plays of light and
                shadow within interiors that recall the historic courtyards of Al-Turaif.
              </p>
              <p id="future-form">
                The result is a design language that feels both future-facing and rooted. It is
                minimal without being cold, luxurious without being loud, and unmistakably
                connected to the Gulf&apos;s wider editorial conversation around craft, permanence,
                and cultural confidence.
              </p>

              <div className="article-tags">
                <span className="article-tags-label">Topics</span>
                <Link className="article-tag" href="/search?q=Architecture">Architecture</Link>
                <Link className="article-tag" href="/search?q=Design">Design</Link>
                <Link className="article-tag" href="/search?q=Riyadh">Riyadh</Link>
                <Link className="article-tag" href="/search?q=Culture">Culture</Link>
                <Link className="article-tag" href="/search?q=Public+Space">Public Space</Link>
              </div>

              <div className="author-bio">
                <div className="author-bio-avatar">
                  <img
                    src="https://loremflickr.com/200/200/architecture,city?lock=8"
                    alt="Laila Al-Fayed"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="author-bio-role">Contributing Editor</span>
                  <h3 className="author-bio-name">Laila Al-Fayed</h3>
                  <p>
                    Laila covers architecture, urbanism, and the built environment across the
                    Arabian Peninsula. Based between Riyadh and London, she contributes to SAUDI
                    MAG&apos;s long-form coverage of how the Gulf is redesigning its cities and
                    cultural infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="section soft">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <span className="label eyebrow" data-en="Read Next" data-ar="اقرأ أيضاً">
                  Read Next
                </span>
                <h2 data-en="More from Culture" data-ar="المزيد من الثقافة">
                  More from Culture
                </h2>
              </div>
              <Link className="button secondary" href="/culture" data-en="View all" data-ar="عرض الكل">
                View all
              </Link>
            </div>
            <div className="editorial-grid">
              <article className="article-card span-4 reveal">
                <Link className="card-media" href="/culture">
                  <img src="https://loremflickr.com/600/400/architecture,city?lock=9" alt="Artist studio" loading="lazy" />
                </Link>
                <span className="label eyebrow">Art</span>
                <h3><Link href="/culture">The New Wave of Abstract Calligraphy</Link></h3>
              </article>
              <article className="article-card span-4 reveal">
                <Link className="card-media" href="/search?q=Makers">
                  <img src="https://loremflickr.com/600/400/architecture,city?lock=10" alt="Contemporary Gulf portrait" loading="lazy" />
                </Link>
                <span className="label eyebrow">Makers</span>
                <h3><Link href="/search?q=Makers">Regional Makers Finding a Wider Audience</Link></h3>
              </article>
              <article className="article-card span-4 reveal">
                <Link className="card-media" href="/search?q=Culinary">
                  <img src="https://loremflickr.com/600/400/architecture,city?lock=11" alt="Fine dining plate" loading="lazy" />
                </Link>
                <span className="label eyebrow">Taste</span>
                <h3><Link href="/search?q=Culinary">Culinary Arts Across the Gulf</Link></h3>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

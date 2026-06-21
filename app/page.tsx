"use client";
import Link from "next/link";
import { showDemoToast } from "@/components/DemoToast";

export default function HomePage() {
  return (
    <main className="page home-portal" id="main-content">
      <div className="issue-strip">
        <span className="issue-num">Issue 12</span>
        <span className="issue-dot" aria-hidden="true" />
        <span>June 2026</span>
        <span className="issue-dot" aria-hidden="true" />
        <span>Cities &amp; Culture</span>
      </div>

      <div className="ticker-band">
        <div className="container">
          <div className="ticker reveal">
            <span className="label" data-en="Top Stories" data-ar="أبرز القصص">Top Stories</span>
            <div className="ticker-wrap">
              <div className="ticker-track">
                <Link href="/article">New museum districts turn heritage into a public city experience</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Riyadh">Riyadh&apos;s creative season brings design, food, and civic life together</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Architecture">The minimalist shift reshaping Gulf architectural identity</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
              </div>
              <div className="ticker-track" aria-hidden="true">
                <Link href="/article">New museum districts turn heritage into a public city experience</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Riyadh">Riyadh&apos;s creative season brings design, food, and civic life together</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Architecture">The minimalist shift reshaping Gulf architectural identity</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container lead-layout">
        <article className="main-lead reveal">
          <Link className="main-lead-media" href="/article">
            <img src="https://picsum.photos/seed/saudimag-hero/1400/900" alt="Modern Saudi architectural landmark at dusk" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow">Architecture · Culture · Public Life</span>
            <h1><Link href="/article">The Gulf Is Designing a New Language for Public Space</Link></h1>
            <p>From shaded plazas to quiet museums, the region&apos;s cultural districts are shaping how people gather, learn, and belong.</p>
            <span className="meta">By Laila Al-Fayed · 8 min read</span>
          </div>
        </article>

        <div className="lead-sidebar">
          <aside className="most-read landscape reveal">
            <div className="block-heading">
              <h2 data-en="Most Read" data-ar="الأكثر قراءة">Most Read</h2>
              <span className="meta" data-en="For this month" data-ar="هذا الشهر">For this month</span>
            </div>
            <ol>
              <li><Link href="/search?q=Mecca">How Pilgrimage Infrastructure Became a Design Challenge of Global Scale</Link></li>
              <li><Link href="/search?q=Doha">Doha&apos;s Neighborhood Tables Are Defining a New Dining Culture</Link></li>
              <li><Link href="/search?q=Real+Estate">The Gulf&apos;s Real Estate Market Is Learning the Value of Walkability</Link></li>
              <li><Link href="/search?q=Jeddah">Jeddah&apos;s Startup Scene Finds Its Rhythm Between Sea and City</Link></li>
            </ol>
          </aside>
          <div className="lead-stack reveal">
            <article className="mini-lead">
              <Link className="mini-media" href="/article">
                <img src="https://picsum.photos/seed/saudimag-museum/600/400" alt="Modern museum facade" loading="lazy" />
              </Link>
              <span className="label eyebrow">Cities</span>
              <h3><Link href="/article">Museum Districts Are Becoming the Gulf&apos;s New Public Squares</Link></h3>
            </article>
            <article className="mini-lead">
              <Link className="mini-media" href="/search?q=Book+Fair">
                <img src="https://picsum.photos/seed/saudimag-theater/600/400" alt="Minimal theater stage" loading="lazy" />
              </Link>
              <span className="label eyebrow">Reading Culture</span>
              <h3><Link href="/search?q=Book+Fair">Book Fairs Are Rewriting the Region&apos;s Cultural Calendar</Link></h3>
            </article>
          </div>
        </div>
      </section>

      <section className="section news-dark">
        <div className="container">
          <div className="portal-heading reveal">
            <div>
              <h2 data-en="Latest News" data-ar="آخر الأخبار">Latest News</h2>
              <span className="meta" data-en="Fresh from the Gulf desk" data-ar="من مكتب الخليج">Fresh from the Gulf desk</span>
            </div>
            <Link className="button secondary" href="/search" data-en="View more" data-ar="عرض المزيد">View more</Link>
          </div>
          <div className="news-grid news-list reveal">
            <article className="news-card">
              <Link className="news-card-media" href="/article">
                <img src="https://picsum.photos/seed/saudimag-news1/800/500" alt="Modern architectural development" loading="lazy" />
              </Link>
              <span className="label eyebrow">Business</span>
              <h3><Link href="/article">Real Estate Advisors Reframe Growth Around Culture and Community</Link></h3>
              <p>Global property voices are shifting from spectacle toward livable districts, credible data, and long-term value.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/culture">
                <img src="https://picsum.photos/seed/saudimag-news2/800/500" alt="Artist in studio" loading="lazy" />
              </Link>
              <span className="label eyebrow">Urban Life</span>
              <h3><Link href="/culture">Expo City Dubai Opens a Walk Through the City&apos;s Future Story</Link></h3>
              <p>A public moment of design, memory, and urban imagination settles over Expo City.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/search?q=Aviation">
                <img src="https://picsum.photos/seed/saudimag-news3/800/500" alt="Fine dining detail" loading="lazy" />
              </Link>
              <span className="label eyebrow">Travel</span>
              <h3><Link href="/search?q=Aviation">Connected Flight Is Changing the Region&apos;s Travel Expectations</Link></h3>
              <p>Aviation, connectivity, and high-touch hospitality converge in the region&apos;s travel conversation.</p>
            </article>
          </div>
          <div className="category-strip reveal">
            <Link href="/culture"><span>Culture</span><strong>Cycling in Doha Shows How Small Habits Can Change a City</strong></Link>
            <Link href="/search?q=Influencer"><span>Profiles</span><strong>Creators Are Building More Thoughtful Public Platforms</strong></Link>
            <Link href="/search?q=Education"><span>Education</span><strong>Purpose Driven Nutrition Moves From Wellness Trend to Daily Practice</strong></Link>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="portal-heading reveal">
            <div>
              <h2 data-en="Featured Videos" data-ar="مقاطع مميزة">Featured Videos</h2>
              <span className="meta" data-en="What's to view" data-ar="ما يستحق المشاهدة">What&apos;s to view</span>
            </div>
          </div>
          <div className="video-layout">
            <article className="video-feature reveal">
              <a
                className="video-media"
                href="/article"
                onClick={(e) => {
                  e.preventDefault();
                  showDemoToast("Video playback is available in the full production edition.");
                }}
              >
                <img src="https://picsum.photos/seed/saudimag-video/900/560" alt="Fashion editorial portrait" loading="lazy" />
                <span className="play-dot"><span className="material-symbols-outlined">play_arrow</span></span>
              </a>
              <span className="label eyebrow">Field Notes</span>
              <h2><Link href="/article">Inside the Studios Turning Gulf Design Into Everyday Culture</Link></h2>
              <p>Short films, interviews, and visits with the people shaping objects, interiors, and public moments.</p>
            </article>
            <div className="video-list reveal">
              <article>
                <span className="label eyebrow">Entrepreneurs</span>
                <h3><Link href="/culture">Independent Founders Are Building Patient Gulf Brands</Link></h3>
              </article>
              <article>
                <span className="label eyebrow">Technology</span>
                <h3><Link href="/search?q=AI">AI Systems Meet the Practical Needs of Public Services</Link></h3>
              </article>
              <article>
                <span className="label eyebrow">Design</span>
                <h3><Link href="/culture">Object Makers Bring Memory, Craft, and Function Together</Link></h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="issue-tags reveal">
          <div>
            <span className="label eyebrow" data-en="In This Issue" data-ar="في هذا العدد">In This Issue</span>
            <h2 data-en="Browse by Topic" data-ar="تصفح حسب الموضوع">Browse by Topic</h2>
          </div>
          <div className="chips">
            <Link className="chip" href="/headlines">Headlines</Link>
            <Link className="chip" href="/f-and-b">F&amp;B</Link>
            <Link className="chip" href="/events">Events</Link>
            <Link className="chip" href="/interviews">Interviews</Link>
            <Link className="chip" href="/sports">Sports</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

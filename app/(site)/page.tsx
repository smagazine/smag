import Link from "next/link";
import Image from "next/image";
import VideoMediaLink from "@/components/VideoMediaLink";
import NewsletterForm from "@/components/NewsletterForm";
import { getPublishedArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getPublishedArticles();
  const hero = articles.find((a) => a.featured) ?? articles[0];
  const tickerArticles = articles.slice(0, 3);
  const mostRead = articles.slice(0, 4);

  return (
    <main className="page home-portal" id="main-content">
      <div className="issue-strip">
        <span className="issue-num" data-en="Issue 12" data-ar="العدد 12">Issue 12</span>
        <span className="issue-dot" aria-hidden="true" />
        <span data-en="June 2026" data-ar="يونيو 2026">June 2026</span>
        <span className="issue-dot" aria-hidden="true" />
        <span data-en="Cities &amp; Culture" data-ar="المدن والثقافة">Cities &amp; Culture</span>
      </div>

      <div className="ticker-band">
        <div className="container">
          <div className="ticker reveal">
            <span className="label" data-en="Top Stories" data-ar="أبرز القصص">Top Stories</span>
            <div className="ticker-wrap">
              <div className="ticker-track">
                {tickerArticles.map((a) => (
                  <>
                    <Link key={a.slug} href={`/article/${a.slug}`}>{a.title}</Link>
                    <span className="ticker-sep" aria-hidden="true">·</span>
                  </>
                ))}
              </div>
              <div className="ticker-track" aria-hidden="true">
                {tickerArticles.map((a) => (
                  <>
                    <Link key={a.slug} href={`/article/${a.slug}`}>{a.title}</Link>
                    <span className="ticker-sep" aria-hidden="true">·</span>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container lead-layout">
        <article className="main-lead reveal">
          <Link className="main-lead-media" href={`/article/${hero.slug}`}>
            <Image fill priority src={`https://images.unsplash.com/${hero.heroPhoto}?w=1400&h=900&fit=crop&auto=format`} alt={hero.title} sizes="(min-width: 1280px) 900px, 100vw" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow">{hero.category}</span>
            <h1><Link href={`/article/${hero.slug}`}>{hero.title}</Link></h1>
            <p>{hero.subtitle}</p>
            <span className="meta">By {hero.author} · {hero.meta}</span>
          </div>
        </article>

        <div className="lead-sidebar">
          <aside className="most-read landscape reveal">
            <div className="block-heading">
              <h2 data-en="Most Read" data-ar="الأكثر قراءة">Most Read</h2>
              <span className="meta" data-en="For this month" data-ar="هذا الشهر">For this month</span>
            </div>
            <ol>
              {mostRead.map((a) => (
                <li key={a.slug}><Link href={`/article/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ol>
          </aside>
          <div className="lead-stack reveal">
            <article className="mini-lead">
              <Link className="mini-media" href="/article/vision-2030-cities">
                <Image fill src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop&auto=format" alt="Modern museum facade" sizes="(min-width: 768px) 300px, 100vw" />
              </Link>
              <span className="label eyebrow" data-en="Cities" data-ar="المدن">Cities</span>
              <h3><Link href="/article/vision-2030-cities" data-en="Museum Districts Are Becoming the Gulf's New Public Squares" data-ar="أحياء المتاحف تصبح الساحات العامة الجديدة في الخليج">Museum Districts Are Becoming the Gulf&apos;s New Public Squares</Link></h3>
            </article>
            <article className="mini-lead">
              <Link className="mini-media" href="/search?q=Book+Fair">
                <Image fill src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format" alt="Minimal theater stage" sizes="(min-width: 768px) 300px, 100vw" />
              </Link>
              <span className="label eyebrow" data-en="Reading Culture" data-ar="ثقافة القراءة">Reading Culture</span>
              <h3><Link href="/search?q=Book+Fair" data-en="Book Fairs Are Rewriting the Region's Cultural Calendar" data-ar="معارض الكتاب تُعيد كتابة التقويم الثقافي للمنطقة">Book Fairs Are Rewriting the Region&apos;s Cultural Calendar</Link></h3>
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
              <Link className="news-card-media" href="/headlines">
                <Image fill src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=500&fit=crop&auto=format" alt="Modern architectural development" sizes="(min-width: 1280px) 400px, 50vw" />
              </Link>
              <span className="label eyebrow" data-en="Business" data-ar="أعمال">Business</span>
              <h3><Link href="/headlines" data-en="Real Estate Advisors Reframe Growth Around Culture and Community" data-ar="مستشارو العقارات يُعيدون صياغة مفهوم النمو حول الثقافة والمجتمع">Real Estate Advisors Reframe Growth Around Culture and Community</Link></h3>
              <p data-en="Global property voices are shifting from spectacle toward livable districts." data-ar="أصوات العقارات العالمية تتحول من الضجة إلى الأحياء الصالحة للعيش.">Global property voices are shifting from spectacle toward livable districts, credible data, and long-term value.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/culture">
                <Image fill src="https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&h=500&fit=crop&auto=format" alt="Artist in studio" sizes="(min-width: 1280px) 400px, 50vw" />
              </Link>
              <span className="label eyebrow" data-en="Urban Life" data-ar="الحياة الحضرية">Urban Life</span>
              <h3><Link href="/culture" data-en="Expo City Dubai Opens a Walk Through the City's Future Story" data-ar="إكسبو سيتي دبي تفتح مساراً عبر قصة مستقبل المدينة">Expo City Dubai Opens a Walk Through the City&apos;s Future Story</Link></h3>
              <p data-en="A public moment of design, memory, and urban imagination settles over Expo City." data-ar="لحظة عامة من التصميم والذاكرة والخيال الحضري تحلّ على إكسبو سيتي.">A public moment of design, memory, and urban imagination settles over Expo City.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/search?q=Aviation">
                <Image fill src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop&auto=format" alt="Fine dining detail" sizes="(min-width: 1280px) 400px, 50vw" />
              </Link>
              <span className="label eyebrow" data-en="Travel" data-ar="السفر">Travel</span>
              <h3><Link href="/search?q=Aviation" data-en="Connected Flight Is Changing the Region's Travel Expectations" data-ar="الرحلات المتصلة تغير توقعات السفر في المنطقة">Connected Flight Is Changing the Region&apos;s Travel Expectations</Link></h3>
              <p data-en="Aviation, connectivity, and high-touch hospitality converge in the region's travel conversation." data-ar="الطيران والاتصال والضيافة الراقية تتقاطع في حوار السفر الإقليمي.">Aviation, connectivity, and high-touch hospitality converge in the region&apos;s travel conversation.</p>
            </article>
          </div>
          <div className="category-strip reveal">
            <Link href="/culture"><span data-en="Culture" data-ar="الثقافة">Culture</span><strong data-en="Cycling in Doha Shows How Small Habits Can Change a City" data-ar="ركوب الدراجات في الدوحة يثبت أن العادات الصغيرة تغير المدن">Cycling in Doha Shows How Small Habits Can Change a City</strong></Link>
            <Link href="/search?q=Influencer"><span data-en="Profiles" data-ar="شخصيات">Profiles</span><strong data-en="Creators Are Building More Thoughtful Public Platforms" data-ar="المبدعون يبنون منصات عامة أكثر تأملاً">Creators Are Building More Thoughtful Public Platforms</strong></Link>
            <Link href="/search?q=Education"><span data-en="Education" data-ar="التعليم">Education</span><strong data-en="Purpose Driven Nutrition Moves From Wellness Trend to Daily Practice" data-ar="التغذية الهادفة تنتقل من اتجاه صحي إلى ممارسة يومية">Purpose Driven Nutrition Moves From Wellness Trend to Daily Practice</strong></Link>
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
              <VideoMediaLink href="/article/gulf-fashion-identity">
                <Image fill src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=560&fit=crop&auto=format" alt="Gulf design studio interior" sizes="(min-width: 1280px) 900px, 100vw" />
                <span className="play-dot"><span className="material-symbols-outlined">play_arrow</span></span>
              </VideoMediaLink>
              <span className="label eyebrow" data-en="Field Notes" data-ar="ملاحظات ميدانية">Field Notes</span>
              <h2><Link href="/article/gulf-fashion-identity" data-en="Inside the Studios Turning Gulf Design Into Everyday Culture" data-ar="داخل الاستوديوهات التي تحوّل تصميم الخليج إلى ثقافة يومية">Inside the Studios Turning Gulf Design Into Everyday Culture</Link></h2>
              <p data-en="Short films, interviews, and visits with the people shaping objects, interiors, and public moments." data-ar="أفلام قصيرة ومقابلات وزيارات مع الأشخاص الذين يصنعون الأشياء والمساحات واللحظات العامة.">Short films, interviews, and visits with the people shaping objects, interiors, and public moments.</p>
            </article>
            <div className="video-list reveal">
              <article>
                <span className="label eyebrow" data-en="Entrepreneurs" data-ar="رواد أعمال">Entrepreneurs</span>
                <h3><Link href="/culture" data-en="Independent Founders Are Building Patient Gulf Brands" data-ar="المؤسسون المستقلون يبنون علامات خليجية صابرة">Independent Founders Are Building Patient Gulf Brands</Link></h3>
              </article>
              <article>
                <span className="label eyebrow" data-en="Technology" data-ar="تقنية">Technology</span>
                <h3><Link href="/search?q=AI" data-en="AI Systems Meet the Practical Needs of Public Services" data-ar="أنظمة الذكاء الاصطناعي تلبي الاحتياجات العملية للخدمات العامة">AI Systems Meet the Practical Needs of Public Services</Link></h3>
              </article>
              <article>
                <span className="label eyebrow" data-en="Design" data-ar="تصميم">Design</span>
                <h3><Link href="/culture" data-en="Object Makers Bring Memory, Craft, and Function Together" data-ar="صانعو الأشياء يجمعون الذاكرة والحرفة والوظيفة معاً">Object Makers Bring Memory, Craft, and Function Together</Link></h3>
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
            <Link className="chip" href="/headlines" data-en="Headlines" data-ar="الأخبار">Headlines</Link>
            <Link className="chip" href="/f-and-b" data-en="F&amp;B" data-ar="طعام وشراب">F&amp;B</Link>
            <Link className="chip" href="/events" data-en="Events" data-ar="الفعاليات">Events</Link>
            <Link className="chip" href="/interviews" data-en="Interviews" data-ar="مقابلات">Interviews</Link>
            <Link className="chip" href="/sports" data-en="Sports" data-ar="الرياضة">Sports</Link>
            <Link className="chip" href="/culture" data-en="Culture" data-ar="الثقافة">Culture</Link>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container newsletter-strip reveal">
          <div>
            <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
            <h2 data-en="Get the Gulf in your inbox." data-ar="احصل على أخبار الخليج في صندوقك.">Get the Gulf in your inbox.</h2>
            <p className="deck" data-en="The morning read for people following the region's culture, cities, and ideas. Free, every weekday." data-ar="القراءة الصباحية لمتابعي ثقافة المنطقة ومدنها وأفكارها. مجاني، كل يوم عمل.">The morning read for people following the region&apos;s culture, cities, and ideas. Free, every weekday.</p>
          </div>
          <NewsletterForm />
          <p className="newsletter-success" data-en="You&rsquo;re in. See you tomorrow." data-ar="أنت معنا. إلى اللقاء غداً.">You&rsquo;re in. See you tomorrow.</p>
        </div>
      </section>
    </main>
  );
}

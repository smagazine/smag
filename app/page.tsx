"use client";
import Link from "next/link";
import { showDemoToast } from "@/components/DemoToast";

export default function HomePage() {
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
                <Link href="/article" data-en="New museum districts turn heritage into a public city experience" data-ar="أحياء المتاحف الجديدة تحوّل التراث إلى تجربة مدنية">New museum districts turn heritage into a public city experience</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Riyadh" data-en="Riyadh's creative season brings design, food, and civic life together" data-ar="موسم الرياض الإبداعي يجمع التصميم والطعام والحياة المدنية">Riyadh&apos;s creative season brings design, food, and civic life together</Link>
                <span className="ticker-sep" aria-hidden="true">·</span>
                <Link href="/search?q=Architecture" data-en="The minimalist shift reshaping Gulf architectural identity" data-ar="التحول نحو البساطة يُعيد تشكيل الهوية المعمارية الخليجية">The minimalist shift reshaping Gulf architectural identity</Link>
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
            <span className="label eyebrow" data-en="Architecture · Culture · Public Life" data-ar="العمارة · الثقافة · الحياة العامة">Architecture · Culture · Public Life</span>
            <h1><Link href="/article" data-en="The Gulf Is Designing a New Language for Public Space" data-ar="الخليج يبتكر لغة جديدة للفضاء العام">The Gulf Is Designing a New Language for Public Space</Link></h1>
            <p data-en="From shaded plazas to quiet museums, the region's cultural districts are shaping how people gather, learn, and belong." data-ar="من الساحات المظللة إلى المتاحف الهادئة، تُشكّل الأحياء الثقافية في المنطقة طريقة تجمّع الناس وتعلّمهم وانتمائهم.">From shaded plazas to quiet museums, the region&apos;s cultural districts are shaping how people gather, learn, and belong.</p>
            <span className="meta" data-en="By Laila Al-Fayed · 8 min read" data-ar="بقلم ليلى الفايد · 8 دقائق قراءة">By Laila Al-Fayed · 8 min read</span>
          </div>
        </article>

        <div className="lead-sidebar">
          <aside className="most-read landscape reveal">
            <div className="block-heading">
              <h2 data-en="Most Read" data-ar="الأكثر قراءة">Most Read</h2>
              <span className="meta" data-en="For this month" data-ar="هذا الشهر">For this month</span>
            </div>
            <ol>
              <li><Link href="/search?q=Mecca" data-en="How Pilgrimage Infrastructure Became a Design Challenge of Global Scale" data-ar="كيف أصبحت بنية الحج تحدياً تصميمياً عالمياً">How Pilgrimage Infrastructure Became a Design Challenge of Global Scale</Link></li>
              <li><Link href="/search?q=Doha" data-en="Doha's Neighborhood Tables Are Defining a New Dining Culture" data-ar="موائد أحياء الدوحة تُعيد تعريف ثقافة الطعام">Doha&apos;s Neighborhood Tables Are Defining a New Dining Culture</Link></li>
              <li><Link href="/search?q=Real+Estate" data-en="The Gulf's Real Estate Market Is Learning the Value of Walkability" data-ar="سوق العقارات الخليجي يكتشف قيمة قابلية المشي">The Gulf&apos;s Real Estate Market Is Learning the Value of Walkability</Link></li>
              <li><Link href="/search?q=Jeddah" data-en="Jeddah's Startup Scene Finds Its Rhythm Between Sea and City" data-ar="مشهد الشركات الناشئة في جدة يجد إيقاعه بين البحر والمدينة">Jeddah&apos;s Startup Scene Finds Its Rhythm Between Sea and City</Link></li>
            </ol>
          </aside>
          <div className="lead-stack reveal">
            <article className="mini-lead">
              <Link className="mini-media" href="/article">
                <img src="https://picsum.photos/seed/saudimag-museum/600/400" alt="Modern museum facade" loading="lazy" />
              </Link>
              <span className="label eyebrow" data-en="Cities" data-ar="المدن">Cities</span>
              <h3><Link href="/article" data-en="Museum Districts Are Becoming the Gulf's New Public Squares" data-ar="أحياء المتاحف تصبح الساحات العامة الجديدة في الخليج">Museum Districts Are Becoming the Gulf&apos;s New Public Squares</Link></h3>
            </article>
            <article className="mini-lead">
              <Link className="mini-media" href="/search?q=Book+Fair">
                <img src="https://picsum.photos/seed/saudimag-theater/600/400" alt="Minimal theater stage" loading="lazy" />
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
              <Link className="news-card-media" href="/article">
                <img src="https://picsum.photos/seed/saudimag-news1/800/500" alt="Modern architectural development" loading="lazy" />
              </Link>
              <span className="label eyebrow" data-en="Business" data-ar="أعمال">Business</span>
              <h3><Link href="/article" data-en="Real Estate Advisors Reframe Growth Around Culture and Community" data-ar="مستشارو العقارات يُعيدون صياغة مفهوم النمو حول الثقافة والمجتمع">Real Estate Advisors Reframe Growth Around Culture and Community</Link></h3>
              <p data-en="Global property voices are shifting from spectacle toward livable districts." data-ar="أصوات العقارات العالمية تتحول من الضجة إلى الأحياء الصالحة للعيش.">Global property voices are shifting from spectacle toward livable districts, credible data, and long-term value.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/culture">
                <img src="https://picsum.photos/seed/saudimag-news2/800/500" alt="Artist in studio" loading="lazy" />
              </Link>
              <span className="label eyebrow" data-en="Urban Life" data-ar="الحياة الحضرية">Urban Life</span>
              <h3><Link href="/culture" data-en="Expo City Dubai Opens a Walk Through the City's Future Story" data-ar="إكسبو سيتي دبي تفتح مساراً عبر قصة مستقبل المدينة">Expo City Dubai Opens a Walk Through the City&apos;s Future Story</Link></h3>
              <p data-en="A public moment of design, memory, and urban imagination settles over Expo City." data-ar="لحظة عامة من التصميم والذاكرة والخيال الحضري تحلّ على إكسبو سيتي.">A public moment of design, memory, and urban imagination settles over Expo City.</p>
            </article>
            <article className="news-card">
              <Link className="news-card-media" href="/search?q=Aviation">
                <img src="https://picsum.photos/seed/saudimag-news3/800/500" alt="Fine dining detail" loading="lazy" />
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
              <a className="video-media" href="/article" onClick={(e) => { e.preventDefault(); showDemoToast("Video playback is available in the full production edition."); }}>
                <img src="https://picsum.photos/seed/saudimag-video/900/560" alt="Fashion editorial portrait" loading="lazy" />
                <span className="play-dot"><span className="material-symbols-outlined">play_arrow</span></span>
              </a>
              <span className="label eyebrow" data-en="Field Notes" data-ar="ملاحظات ميدانية">Field Notes</span>
              <h2><Link href="/article" data-en="Inside the Studios Turning Gulf Design Into Everyday Culture" data-ar="داخل الاستوديوهات التي تحوّل تصميم الخليج إلى ثقافة يومية">Inside the Studios Turning Gulf Design Into Everyday Culture</Link></h2>
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
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; (e.currentTarget.closest(".newsletter-strip") as HTMLElement)?.setAttribute("data-sent", "true"); }}>
            <input
              type="email"
              required
              placeholder="Your email address"
              data-placeholder-en="Your email address"
              data-placeholder-ar="عنوان بريدك الإلكتروني"
              aria-label="Email address for newsletter"
              data-label-en="Email address for newsletter"
              data-label-ar="البريد الإلكتروني للنشرة"
            />
            <button className="button" type="submit" data-en="Subscribe free" data-ar="اشترك مجاناً">Subscribe free</button>
          </form>
          <p className="newsletter-success" data-en="You&rsquo;re in. See you tomorrow." data-ar="أنت معنا. إلى اللقاء غداً.">You&rsquo;re in. See you tomorrow.</p>
        </div>
      </section>
    </main>
  );
}

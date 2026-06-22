import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Sports | SAUDI MAG",
  description: "Athletic culture, wellness, and the sporting events drawing global attention to the Gulf.",
};

export default function SportsPage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "Sports", labelAr: "الرياضة" }]} />
      <div className="page-header page-header--dark">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Sports" data-ar="الرياضة">Sports</h1>
              <p className="deck" data-en="Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf." data-ar="الثقافة الرياضية والرياضة النخبوية وحركات العافية والفعاليات العالمية في الخليج.">
                Athletic culture, elite sport, wellness movements, and the global events landing in the Gulf.
              </p>
            </div>
            <CategoryFilters />
          </div>
          <div className="sports-stats-strip reveal">
            <div className="sports-stat">
              <span className="sports-stat-num">12</span>
              <span className="sports-stat-label" data-en="Major Events This Season" data-ar="فعاليات كبرى هذا الموسم">Major Events This Season</span>
            </div>
            <div className="sports-stat">
              <span className="sports-stat-num">4M+</span>
              <span className="sports-stat-label" data-en="Tickets Sold" data-ar="تذكرة مُباعة">Tickets Sold</span>
            </div>
            <div className="sports-stat">
              <span className="sports-stat-num">82</span>
              <span className="sports-stat-label" data-en="Countries Represented" data-ar="دولة مشاركة">Countries Represented</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
        <article className="sports-feature reveal">
          <div className="sports-feature-media">
            <img src="https://loremflickr.com/1400/800/sports,stadium?lock=50" alt="Gulf sports" />
          </div>
          <div className="sports-feature-copy">
            <span className="sport-badge" data-en="Deep Dive" data-ar="تغطية معمّقة">Deep Dive</span>
            <h2><Link href="/article" data-en="How the Gulf Became Global Sport's New Centre of Gravity" data-ar="كيف أصبح الخليج مركز الثقل الرياضي العالمي الجديد">How the Gulf Became Global Sport&apos;s New Centre of Gravity</Link></h2>
            <p className="deck" data-en="From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League's global signings, a systematic strategy is turning the kingdom into the world's most ambitious sporting destination." data-ar="من فورمولا 1 تحت أضواء جدة إلى LIV غولف ودوري روشن باتفاقياته العالمية، تحوّل المملكة إلى أكثر وجهة رياضية طموحاً في العالم.">From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League&apos;s global signings, a systematic strategy is turning the kingdom into the world&apos;s most ambitious sporting destination.</p>
            <p style={{ marginTop: 20 }}><Link className="button" href="/article" data-en="Read story" data-ar="اقرأ القصة">Read story</Link></p>
          </div>
        </article>
      </div>

      <section className="section container">
        <div className="sports-grid reveal">
          <article className="article-card" data-category-card data-category-order="1" data-category-rank="1" data-category-editors-choice>
            <span className="sport-badge" data-en="Football" data-ar="كرة القدم">Football</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://loremflickr.com/600/380/sports,stadium?lock=51" alt="Football match" loading="lazy" />
            </Link>
            <h3><Link href="/article" data-en="The Saudi Pro League's Global Moment Is Just Beginning" data-ar="اللحظة العالمية لدوري روشن للمحترفين بدأت للتو">The Saudi Pro League&apos;s Global Moment Is Just Beginning</Link></h3>
            <p data-en="Attendances are up, broadcast deals are growing, and the talent pipeline is delivering results." data-ar="الحضور في ارتفاع، وعقود البث تتوسع، والمواهب تُثمر نتائج.">Attendances are up, broadcast deals are growing, and the talent pipeline is delivering results.</p>
            <span className="meta" data-en="7 min read" data-ar="7 دقائق قراءة">7 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="2" data-category-rank="3">
            <span className="sport-badge" data-en="Motorsport" data-ar="رياضات المحركات">Motorsport</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://loremflickr.com/600/380/sports,stadium?lock=52" alt="Formula 1" loading="lazy" />
            </Link>
            <h3><Link href="/article" data-en="Jeddah Corniche Circuit: More Than a Race, a City Statement" data-ar="حلبة كورنيش جدة: أكثر من سباق، إنها بيان مدينة">Jeddah Corniche Circuit: More Than a Race, a City Statement</Link></h3>
            <p data-en="The street circuit beside the Red Sea has become one of the most dramatic venues on the F1 calendar." data-ar="حلبة الشوارع بجانب البحر الأحمر أصبحت من أكثر مضامير الفورمولا 1 إثارة.">The street circuit beside the Red Sea has become one of the most dramatic venues on the F1 calendar.</p>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="3" data-category-rank="2" data-category-editors-choice>
            <span className="sport-badge" data-en="Golf" data-ar="غولف">Golf</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://loremflickr.com/600/380/sports,stadium?lock=53" alt="Golf course" loading="lazy" />
            </Link>
            <h3><Link href="/article" data-en="LIV Golf One Year On: What It Changed and What It Didn't" data-ar="LIV غولف بعد عام: ما الذي تغيّر وما الذي لم يتغيّر">LIV Golf One Year On: What It Changed and What It Didn&apos;t</Link></h3>
            <p data-en="An honest accounting of the tour's first full season — the wins, the controversies, what's next." data-ar="تقييم صريح للموسم الأول الكامل للجولة — الانتصارات والجدل وما هو قادم.">An honest accounting of the tour&apos;s first full season — the wins, the controversies, what&apos;s next.</p>
            <span className="meta" data-en="8 min read" data-ar="8 دقائق قراءة">8 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="4" data-category-rank="4">
            <span className="sport-badge" data-en="Combat Sports" data-ar="الفنون القتالية">Combat Sports</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://loremflickr.com/600/380/sports,stadium?lock=54" alt="Boxing event" loading="lazy" />
            </Link>
            <h3><Link href="/article" data-en="Riyadh Season's Fight Nights Are Rewriting Boxing's World Order" data-ar="ليالي الملاكمة في موسم الرياض تُعيد كتابة النظام الملاكمي العالمي">Riyadh Season&apos;s Fight Nights Are Rewriting Boxing&apos;s World Order</Link></h3>
            <p data-en="Unprecedented purses and neutral ground have made Saudi Arabia the new home of boxing's biggest bouts." data-ar="جوائز غير مسبوقة وأرضية محايدة جعلت المملكة العربية السعودية الوطن الجديد لأكبر نزالات الملاكمة.">Unprecedented purses and neutral ground have made Saudi Arabia the new home of boxing&apos;s biggest bouts.</p>
            <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="5" data-category-rank="5">
            <span className="sport-badge" data-en="Wellness" data-ar="عافية">Wellness</span>
            <Link className="card-media landscape" href="/article">
              <img src="https://loremflickr.com/600/380/sports,stadium?lock=55" alt="Wellness" loading="lazy" />
            </Link>
            <h3><Link href="/article" data-en="The Wellness Economy Is Reshaping Gulf Urban Life" data-ar="اقتصاد العافية يُعيد تشكيل الحياة الحضرية في الخليج">The Wellness Economy Is Reshaping Gulf Urban Life</Link></h3>
            <p data-en="From rooftop yoga to al-fresco running clubs, a generation is redefining healthy living in the Gulf." data-ar="من يوغا الأسطح إلى أندية الجري في الهواء الطلق، يُعيد جيل تعريف الحياة الصحية في الخليج.">From rooftop yoga to al-fresco running clubs, a generation is redefining healthy living in the Gulf.</p>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

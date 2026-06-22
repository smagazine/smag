import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Events | SAUDI MAG",
  description: "Cultural gatherings, festivals, and the moments shaping the Gulf's social calendar.",
};

export default function EventsPage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "Events", labelAr: "الفعاليات" }]} />
      <div className="page-header">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <span className="label eyebrow" style={{ marginBottom: 12, display: "block" }} data-en="June 2026" data-ar="يونيو 2026">June 2026</span>
              <h1 data-en="Events" data-ar="الفعاليات">Events</h1>
              <p className="deck" data-en="Cultural gatherings, festivals, and the moments defining the Gulf's social calendar." data-ar="التجمعات الثقافية والمهرجانات التي تشكّل التقويم الاجتماعي في الخليج.">
                Cultural gatherings, festivals, premiere openings, and the moments defining the Gulf&apos;s social calendar.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <Link className="card-media landscape" href="/article">
            <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=700&fit=crop&auto=format" alt="Riyadh Season" />
          </Link>
          <div>
            <div className="event-badge">
              <span className="day">14</span>
              <span className="month" data-en="Jun" data-ar="يون">Jun</span>
            </div>
            <span className="label eyebrow" data-en="Cover Story" data-ar="قصة الغلاف">Cover Story</span>
            <h2><Link href="/article" data-en="Riyadh Season: Inside the World's Largest Entertainment Programme" data-ar="موسم الرياض: داخل أضخم برنامج ترفيهي في العالم">Riyadh Season: Inside the World&apos;s Largest Entertainment Programme</Link></h2>
            <p className="deck" data-en="From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world's most ambitious urban entertainment experiment." data-ar="من الحفلات الحية التي تستقطب مئات الآلاف إلى صالونات التصميم الحميمة، أصبح موسم الرياض أكثر تجارب الترفيه الحضري طموحاً في العالم.">From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world&apos;s most ambitious urban entertainment experiment.</p>
            <span className="event-venue" data-en="King Fahd International Stadium · Riyadh" data-ar="استاد الملك فهد الدولي · الرياض">King Fahd International Stadium · Riyadh</span>
            <p className="mt-lg"><Link className="button secondary" href="/article" data-en="Read story" data-ar="اقرأ القصة">Read story</Link></p>
          </div>
        </article>

        <div className="events-grid reveal">
          <article className="event-card article-card" data-category-card data-category-order="1" data-category-rank="2" data-category-editors-choice>
            <div className="event-badge"><span className="day">18</span><span className="month" data-en="Jun" data-ar="يون">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=380&fit=crop&auto=format" alt="MDL Beast" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Music" data-ar="موسيقى">Music</span>
            <h3><Link href="/article" data-en="MDL Beast Becomes a Global Benchmark for Festival Design" data-ar="MDL Beast يصبح معياراً عالمياً لتصميم المهرجانات">MDL Beast Becomes a Global Benchmark for Festival Design</Link></h3>
            <span className="event-venue" data-en="Banban, Riyadh" data-ar="بنبان، الرياض">Banban, Riyadh</span>
            <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
          </article>

          <article className="event-card article-card" data-category-card data-category-order="2" data-category-rank="1">
            <div className="event-badge"><span className="day">22</span><span className="month" data-en="Jun" data-ar="يون">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=380&fit=crop&auto=format" alt="Noor Riyadh" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Art" data-ar="فن">Art</span>
            <h3><Link href="/article" data-en="Noor Riyadh Illuminates the City for Its Biggest Edition Yet" data-ar="نور الرياض يُضيء المدينة في أكبر نسخة حتى الآن">Noor Riyadh Illuminates the City for Its Biggest Edition Yet</Link></h3>
            <span className="event-venue" data-en="70 Locations · Riyadh" data-ar="70 موقعاً · الرياض">70 Locations · Riyadh</span>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>

          <article className="event-card article-card" data-category-card data-category-order="3" data-category-rank="3" data-category-editors-choice>
            <div className="event-badge"><span className="day">28</span><span className="month" data-en="Jun" data-ar="يون">Jun</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=380&fit=crop&auto=format" alt="Red Sea Film Festival" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Film" data-ar="سينما">Film</span>
            <h3><Link href="/article" data-en="Red Sea International Film Festival Cements Its Global Reputation" data-ar="مهرجان البحر الأحمر السينمائي يرسّخ سمعته العالمية">Red Sea International Film Festival Cements Its Global Reputation</Link></h3>
            <span className="event-venue" data-en="Corniche · Jeddah" data-ar="الكورنيش · جدة">Corniche · Jeddah</span>
            <span className="meta" data-en="7 min read" data-ar="7 دقائق قراءة">7 min read</span>
          </article>

          <article className="event-card article-card" data-category-card data-category-order="4" data-category-rank="5">
            <div className="event-badge"><span className="day">3</span><span className="month" data-en="Jul" data-ar="يول">Jul</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=380&fit=crop&auto=format" alt="Arab Fashion Week" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Fashion" data-ar="أزياء">Fashion</span>
            <h3><Link href="/article" data-en="Arab Fashion Week Moves Its Centrepiece Show to AlUla" data-ar="أسبوع الموضة العربي ينقل عرضه الرئيسي إلى العُلا">Arab Fashion Week Moves Its Centrepiece Show to AlUla</Link></h3>
            <span className="event-venue" data-en="Hegra · AlUla" data-ar="الحِجر · العُلا">Hegra · AlUla</span>
            <span className="meta" data-en="4 min read" data-ar="4 دقائق قراءة">4 min read</span>
          </article>

          <article className="event-card article-card" data-category-card data-category-order="5" data-category-rank="4">
            <div className="event-badge"><span className="day">9</span><span className="month" data-en="Jul" data-ar="يول">Jul</span></div>
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=380&fit=crop&auto=format" alt="Cultural salon" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Culture" data-ar="ثقافة">Culture</span>
            <h3><Link href="/article" data-en="The Salon Circuit: Private Cultural Gatherings Shaping Gulf Ideas" data-ar="دائرة الصالونات: التجمعات الثقافية الخاصة التي تصوغ أفكار الخليج">The Salon Circuit: Private Cultural Gatherings Shaping Gulf Ideas</Link></h3>
            <span className="event-venue" data-en="Private Venue · Riyadh" data-ar="مكان خاص · الرياض">Private Venue · Riyadh</span>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

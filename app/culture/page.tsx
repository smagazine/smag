import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Culture | SAUDI MAG",
  description: "Explore Gulf culture through heritage, contemporary art, design, and performance.",
};

export default function CulturePage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "Culture", labelAr: "الثقافة" }]} />
      <div className="page-header page-header--warm">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Culture" data-ar="الثقافة">Culture</h1>
              <p className="deck" data-en="Exploring heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East." data-ar="استكشاف التراث والفن المعاصر والتصميم والأداء والسرد المتطور للشرق الأوسط الحديث.">
                Exploring heritage, contemporary art, design, performance, and the evolving narrative of the modern Middle East.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
        <article className="main-lead reveal" style={{ minHeight: 540, marginBottom: "var(--stack-md)" }}>
          <Link className="main-lead-media" href="/article">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=900&fit=crop&auto=format" alt="Gulf cultural district" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow" data-en="Heritage & Style" data-ar="التراث والأسلوب">Heritage &amp; Style</span>
            <h1><Link href="/article" data-en="Public Space, Heritage, and the New Gulf City" data-ar="الفضاء العام والتراث والمدينة الخليجية الجديدة">Public Space, Heritage, and the New Gulf City</Link></h1>
            <p data-en="Architects, makers, and cultural organizers are drawing from the region's landscapes to build places that feel contemporary without losing memory." data-ar="المعماريون والصانعون والمنظمون الثقافيون يستوحون من مشاهد المنطقة لبناء أماكن تبدو معاصرة دون أن تفقد ذاكرتها.">Architects, makers, and cultural organizers are drawing from the region&apos;s landscapes to build places that feel contemporary without losing memory.</p>
            <span className="meta" data-en="By Laila Al-Fayed · 12 min read" data-ar="بقلم ليلى الفايد · 12 دقائق قراءة">By Laila Al-Fayed · 12 min read</span>
          </div>
        </article>
      </div>

      <section className="section container">
        <div className="editorial-grid reveal">
          <article className="article-card span-4" data-category-card data-category-order="1" data-category-rank="3" data-category-editors-choice>
            <Link className="card-media" href="/article">
              <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=450&fit=crop&auto=format" alt="Artist in studio" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Contemporary Art" data-ar="الفن المعاصر">Contemporary Art</span>
            <h3><Link href="/article" data-en="The New Wave of Abstract Calligraphy" data-ar="موجة الخط التجريدي الجديدة">The New Wave of Abstract Calligraphy</Link></h3>
            <p data-en="Young artists deconstruct classical scripts to create internationally recognized work." data-ar="فنانون شباب يفككون الخطوط الكلاسيكية لإنتاج أعمال تلقى اعترافاً دولياً.">Young artists deconstruct classical scripts to create internationally recognized work.</p>
            <span className="meta" data-en="By Sarah Al-Mutairi · 5 min read" data-ar="بقلم سارة المطيري · 5 دقائق قراءة">By Sarah Al-Mutairi · 5 min read</span>
          </article>

          <article className="article-card span-8" data-category-card data-category-order="2" data-category-rank="1">
            <Link className="card-media landscape" href="/article">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=500&fit=crop&auto=format" alt="Museum facade" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Architecture" data-ar="العمارة">Architecture</span>
            <h3><Link href="/article" data-en="Designing the Future: The Architecture of Tomorrow's Museums" data-ar="تصميم المستقبل: عمارة متاحف الغد">Designing the Future: The Architecture of Tomorrow&apos;s Museums</Link></h3>
            <p data-en="Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language." data-ar="شركات رائدة تُشكّل البنية الثقافية باستدامة وهندسة ولغة تصميم محلية.">Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language.</p>
            <span className="meta" data-en="By Tariq Fayed · 12 min read" data-ar="بقلم طارق فايد · 12 دقائق قراءة">By Tariq Fayed · 12 min read</span>
          </article>

          <article className="article-card span-6 divider-top" data-category-card data-category-order="3" data-category-rank="4" data-category-editors-choice>
            <Link className="card-media square" href="/search?q=Craftsmanship">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop&auto=format" alt="Woven textiles" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Craftsmanship" data-ar="الحرفية">Craftsmanship</span>
            <h3><Link href="/search?q=Craftsmanship" data-en="Reviving the Loom" data-ar="إحياء النول">Reviving the Loom</Link></h3>
            <p data-en="The artisans bringing ancient textile techniques into the 21st century." data-ar="الحرفيون يُعيدون تقنيات النسيج القديمة إلى القرن الحادي والعشرين.">The artisans bringing ancient textile techniques into the 21st century.</p>
            <span className="meta" data-en="By Laila Hassan · 7 min read" data-ar="بقلم ليلى حسن · 7 دقائق قراءة">By Laila Hassan · 7 min read</span>
          </article>

          <article className="article-card span-6 divider-top" data-category-card data-category-order="4" data-category-rank="2">
            <Link className="card-media square" href="/search?q=Performing+Arts">
              <img src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&h=600&fit=crop&auto=format" alt="Theater stage" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Performing Arts" data-ar="الفنون الأدائية">Performing Arts</span>
            <h3><Link href="/search?q=Performing+Arts" data-en="The Spotlight Shifts" data-ar="تحول الأضواء">The Spotlight Shifts</Link></h3>
            <p data-en="Independent theater troupes are finding new stages and eager audiences across the capital." data-ar="فرق المسرح المستقلة تجد خشبات عرض جديدة وجماهير متحمسة في العاصمة.">Independent theater troupes are finding new stages and eager audiences across the capital.</p>
            <span className="meta" data-en="By Omar Zayed · 8 min read" data-ar="بقلم عمر زايد · 8 دقائق قراءة">By Omar Zayed · 8 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

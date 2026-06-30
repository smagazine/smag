import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
          <Link className="main-lead-media" href="/article/alula-heritage-future">
            <Image fill priority src="https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=1400&h=900&fit=crop&auto=format" alt="AlUla desert heritage site" sizes="(min-width: 1280px) 900px, 100vw" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow" data-en="Heritage & Style" data-ar="التراث والأسلوب">Heritage &amp; Style</span>
            <h1><Link href="/article/alula-heritage-future" data-en="AlUla: Where the Desert Remembers Everything" data-ar="العُلا: حيث يتذكر الصحراء كل شيء">AlUla: Where the Desert Remembers Everything</Link></h1>
            <p data-en="The ancient rock city is becoming one of the world's most ambitious heritage tourism projects — and a living argument for what preservation can mean." data-ar="المدينة الصخرية القديمة تتحول إلى واحد من أطموح مشاريع السياحة التراثية في العالم — وحجة حية لما يمكن أن تعنيه الحفاظ على التراث.">The ancient rock city is becoming one of the world&apos;s most ambitious heritage tourism projects — and a living argument for what preservation can mean.</p>
            <span className="meta" data-en="By Laila Al-Fayed · 12 min read" data-ar="بقلم ليلى الفايد · 12 دقائق قراءة">By Laila Al-Fayed · 12 min read</span>
          </div>
        </article>
      </div>

      <section className="section container">
        <div className="editorial-grid reveal">
          <article className="article-card span-4" data-category-card data-category-order="1" data-category-rank="3" data-category-editors-choice>
            <Link className="card-media" href="/culture">
              <Image fill src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=450&fit=crop&auto=format" alt="Artist in studio" sizes="(min-width: 1280px) 400px, 33vw" />
            </Link>
            <span className="label eyebrow" data-en="Contemporary Art" data-ar="الفن المعاصر">Contemporary Art</span>
            <h3><Link href="/culture" data-en="The New Wave of Abstract Calligraphy" data-ar="موجة الخط التجريدي الجديدة">The New Wave of Abstract Calligraphy</Link></h3>
            <p data-en="Young artists deconstruct classical scripts to create internationally recognized work." data-ar="فنانون شباب يفككون الخطوط الكلاسيكية لإنتاج أعمال تلقى اعترافاً دولياً.">Young artists deconstruct classical scripts to create internationally recognized work.</p>
            <span className="meta" data-en="By Sarah Al-Mutairi · 5 min read" data-ar="بقلم سارة المطيري · 5 دقائق قراءة">By Sarah Al-Mutairi · 5 min read</span>
          </article>

          <article className="article-card span-8" data-category-card data-category-order="2" data-category-rank="1">
            <Link className="card-media landscape" href="/culture">
              <Image fill src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=500&fit=crop&auto=format" alt="Museum facade" sizes="(min-width: 1280px) 800px, 67vw" />
            </Link>
            <span className="label eyebrow" data-en="Architecture" data-ar="العمارة">Architecture</span>
            <h3><Link href="/culture" data-en="Designing the Future: The Architecture of Tomorrow's Museums" data-ar="تصميم المستقبل: عمارة متاحف الغد">Designing the Future: The Architecture of Tomorrow&apos;s Museums</Link></h3>
            <p data-en="Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language." data-ar="شركات رائدة تُشكّل البنية الثقافية باستدامة وهندسة ولغة تصميم محلية.">Visionary firms shape cultural infrastructure with sustainability, geometry, and localized design language.</p>
            <span className="meta" data-en="By Tariq Fayed · 12 min read" data-ar="بقلم طارق فايد · 12 دقائق قراءة">By Tariq Fayed · 12 min read</span>
          </article>

          <article className="article-card span-6 divider-top" data-category-card data-category-order="3" data-category-rank="4" data-category-editors-choice>
            <Link className="card-media square" href="/search?q=Craftsmanship">
              <Image fill src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop&auto=format" alt="Woven textiles" sizes="(min-width: 1280px) 600px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Craftsmanship" data-ar="الحرفية">Craftsmanship</span>
            <h3><Link href="/search?q=Craftsmanship" data-en="Reviving the Loom" data-ar="إحياء النول">Reviving the Loom</Link></h3>
            <p data-en="The artisans bringing ancient textile techniques into the 21st century." data-ar="الحرفيون يُعيدون تقنيات النسيج القديمة إلى القرن الحادي والعشرين.">The artisans bringing ancient textile techniques into the 21st century.</p>
            <span className="meta" data-en="By Laila Hassan · 7 min read" data-ar="بقلم ليلى حسن · 7 دقائق قراءة">By Laila Hassan · 7 min read</span>
          </article>

          <article className="article-card span-6 divider-top" data-category-card data-category-order="4" data-category-rank="2">
            <Link className="card-media square" href="/search?q=Performing+Arts">
              <Image fill src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&h=600&fit=crop&auto=format" alt="Theater stage" sizes="(min-width: 1280px) 600px, 50vw" />
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

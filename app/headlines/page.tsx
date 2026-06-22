import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Headlines | SAUDI MAG",
  description: "Breaking news and current affairs from across the Arabian Peninsula.",
};

export default function HeadlinesPage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "Headlines", labelAr: "الأخبار" }]} />
      <div className="page-header page-header--dark">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Headlines" data-ar="الأخبار">Headlines</h1>
              <p className="deck" data-en="Breaking news and current affairs from across the Arabian Peninsula." data-ar="أخبار عاجلة وشؤون راهنة من شبه الجزيرة العربية.">
                Breaking news and current affairs from across the Arabian Peninsula and the wider Gulf region.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      <div className="container">
        <article className="main-lead reveal" style={{ minHeight: 480, marginBottom: "var(--stack-md)", marginTop: "clamp(24px,4vw,48px)" }}>
          <Link className="main-lead-media" href="/article">
            <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&h=800&fit=crop&auto=format" alt="Vision 2030 milestones" />
          </Link>
          <div className="main-lead-copy">
            <span className="label eyebrow" data-en="Top Story" data-ar="القصة الرئيسية">Top Story</span>
            <h1><Link href="/article" data-en="Vision 2030 Milestones: What Has Been Built, What Comes Next" data-ar="إنجازات رؤية 2030: ما تم بناؤه وما هو قادم">Vision 2030 Milestones: What Has Been Built, What Comes Next</Link></h1>
            <p data-en="A comprehensive look at the projects that have reshaped the kingdom's infrastructure, culture, and economy — and the ambitious initiatives still on the horizon." data-ar="نظرة شاملة على المشاريع التي أعادت تشكيل البنية التحتية والثقافة والاقتصاد — والمبادرات الطموحة التي لا تزال في الأفق.">A comprehensive look at the projects that have reshaped the kingdom&apos;s infrastructure, culture, and economy — and the ambitious initiatives still on the horizon.</p>
            <span className="meta" data-en="By Nasser Al-Turki · 8 min read" data-ar="بقلم ناصر التركي · 8 دقائق قراءة">By Nasser Al-Turki · 8 min read</span>
          </div>
        </article>
      </div>

      <section className="section container">
        <div className="newsrow-list reveal">
          <a className="newsrow" href="/article" data-category-card data-category-order="1" data-category-rank="2">
            <div className="newsrow-thumb">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&auto=format" alt="Gulf trade" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow" data-en="Politics" data-ar="سياسة">Politics</span>
              <h3><a href="/article" data-en="Gulf States Align on New Regional Trade Framework" data-ar="دول الخليج تتوافق على إطار تجاري إقليمي جديد">Gulf States Align on New Regional Trade Framework</a></h3>
              <p data-en="Negotiations conclude with a landmark agreement covering energy, logistics, and digital infrastructure." data-ar="المفاوضات تُسفر عن اتفاقية تاريخية تشمل الطاقة والخدمات اللوجستية والبنية التحتية الرقمية.">Negotiations conclude with a landmark agreement covering energy, logistics, and digital infrastructure.</p>
              <span className="meta" data-en="4 min read" data-ar="4 دقائق قراءة">4 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article" data-category-card data-category-order="2" data-category-rank="1" data-category-editors-choice>
            <div className="newsrow-thumb">
              <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop&auto=format" alt="Tourism numbers" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow" data-en="Economy" data-ar="اقتصاد">Economy</span>
              <h3><a href="/article" data-en="Saudi Arabia Posts Record Tourism Numbers Ahead of Season" data-ar="المملكة العربية السعودية تسجل أرقاماً قياسية في السياحة قبيل الموسم">Saudi Arabia Posts Record Tourism Numbers Ahead of Season</a></h3>
              <p data-en="The General Authority for Tourism reports a historic quarter driven by cultural events and improved connectivity." data-ar="هيئة السياحة تُسجّل ربعاً تاريخياً تقوده الفعاليات الثقافية وتحسين الاتصال.">The General Authority for Tourism reports a historic quarter driven by cultural events and improved connectivity.</p>
              <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article" data-category-card data-category-order="3" data-category-rank="3">
            <div className="newsrow-thumb">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format" alt="NEOM" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow" data-en="Tech" data-ar="تقنية">Tech</span>
              <h3><a href="/article" data-en="NEOM Reveals Next Phase of Connectivity Infrastructure" data-ar="نيوم تكشف عن المرحلة التالية من بنية الاتصال">NEOM Reveals Next Phase of Connectivity Infrastructure</a></h3>
              <p data-en="The Line's backbone network promises latency and capacity figures that challenge conventional urban models." data-ar="شبكة العمود الفقري للخط تعد بأرقام كمون وطاقة تتحدى النماذج الحضرية التقليدية.">The Line&apos;s backbone network promises latency and capacity figures that challenge conventional urban models.</p>
              <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article" data-category-card data-category-order="4" data-category-rank="4" data-category-editors-choice>
            <div className="newsrow-thumb">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop&auto=format" alt="Heritage law" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow" data-en="Society" data-ar="مجتمع">Society</span>
              <h3><a href="/article" data-en="New Cultural Heritage Law Expands Protections Across the Kingdom" data-ar="قانون التراث الثقافي الجديد يوسع الحماية في جميع أنحاء المملكة">New Cultural Heritage Law Expands Protections Across the Kingdom</a></h3>
              <p data-en="Historic sites from Diriyah to AlUla receive strengthened conservation frameworks under the updated statute." data-ar="المواقع التاريخية من الدرعية إلى العُلا تحصل على أطر حماية معززة بموجب النظام المحدّث.">Historic sites from Diriyah to AlUla receive strengthened conservation frameworks under the updated statute.</p>
              <span className="meta" data-en="7 min read" data-ar="7 دقائق قراءة">7 min read</span>
            </div>
          </a>
          <a className="newsrow" href="/article" data-category-card data-category-order="5" data-category-rank="5">
            <div className="newsrow-thumb">
              <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop&auto=format" alt="Green initiative" loading="lazy" />
            </div>
            <div className="newsrow-body">
              <span className="label eyebrow" data-en="Energy" data-ar="طاقة">Energy</span>
              <h3><a href="/article" data-en="Saudi Green Initiative Reaches Midpoint Ahead of Schedule" data-ar="المبادرة الخضراء السعودية تبلغ منتصف الطريق قبل الموعد المحدد">Saudi Green Initiative Reaches Midpoint Ahead of Schedule</a></h3>
              <p data-en="Renewable capacity additions outpace original projections as NEOM's energy grid delivers first export-grade power." data-ar="إضافات الطاقة المتجددة تتجاوز التوقعات الأصلية بينما تُسلّم شبكة نيوم أول طاقة للتصدير.">Renewable capacity additions outpace original projections as NEOM&apos;s energy grid delivers first export-grade power.</p>
              <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

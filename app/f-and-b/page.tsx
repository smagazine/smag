import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "F&B | SAUDI MAG",
  description: "Restaurant openings, chef profiles, and the Gulf's rapidly evolving dining culture.",
};

export default function FAndBPage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "F&B", labelAr: "طعام وشراب" }]} />
      <div className="page-header page-header--cream">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="F&B" data-ar="طعام وشراب">F&amp;B</h1>
              <p className="deck" data-en="Restaurant openings, chef profiles, culinary travel, and the Gulf's rapidly evolving dining culture." data-ar="افتتاحات المطاعم وملامح الطهاة والسياحة الغذائية وثقافة الطعام في الخليج.">
                Restaurant openings, chef profiles, culinary travel, and the Gulf&apos;s rapidly evolving dining culture.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <div>
            <span className="label eyebrow" data-en="Chef Profile" data-ar="ملف الطاهي">Chef Profile</span>
            <h2><Link href="/article" data-en="The Chefs Redefining Saudi Cuisine One Plate at a Time" data-ar="الطهاة الذين يُعيدون تعريف المطبخ السعودي طبقاً بطبق">The Chefs Redefining Saudi Cuisine One Plate at a Time</Link></h2>
            <p className="deck" data-en="A generation of Saudi-trained chefs is returning home with international technique and a fierce desire to cook from memory — drawing on grandmother's recipes, desert herbs, and forgotten fermentation traditions." data-ar="جيل من الطهاة السعوديين يعودون إلى وطنهم بتقنيات دولية ورغبة جامحة في الطهي من الذاكرة — مستوحين من وصفات الجدات وأعشاب الصحراء وتقاليد التخمير المنسية.">A generation of Saudi-trained chefs is returning home with international technique and a fierce desire to cook from memory — drawing on grandmother&apos;s recipes, desert herbs, and forgotten fermentation traditions.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article" data-en="Read story" data-ar="اقرأ القصة">Read story</Link></p>
          </div>
          <Link className="card-media" href="/article">
            <img src="https://loremflickr.com/800/1000/food,restaurant?lock=23" alt="Chef portrait" />
          </Link>
        </article>

        <div className="fnb-grid reveal">
          <article className="article-card" data-category-card data-category-order="1" data-category-rank="1" data-category-editors-choice>
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=24" alt="Restaurant interior" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Opening" data-ar="افتتاح">Opening</span>
            <h3><Link href="/article" data-en="Bait Al-Kaif: Riyadh's Most Anticipated Opening of the Year" data-ar="بيت الكيف: أكثر افتتاح منتظر في الرياض هذا العام">Bait Al-Kaif: Riyadh&apos;s Most Anticipated Opening of the Year</Link></h3>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="2" data-category-rank="3">
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=25" alt="Artisan coffee" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Café Culture" data-ar="ثقافة المقاهي">Café Culture</span>
            <h3><Link href="/article" data-en="Third Wave Coffee Takes Root Across the Kingdom" data-ar="موجة القهوة الثالثة تترسخ في أرجاء المملكة">Third Wave Coffee Takes Root Across the Kingdom</Link></h3>
            <span className="meta" data-en="4 min read" data-ar="4 دقائق قراءة">4 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="3" data-category-rank="2">
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=26" alt="Fine dining" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Fine Dining" data-ar="مطاعم راقية">Fine Dining</span>
            <h3><Link href="/article" data-en="Jeddah's Corniche Dining Scene Is Growing Up Fast" data-ar="مشهد المطاعم على كورنيش جدة ينضج بسرعة">Jeddah&apos;s Corniche Dining Scene Is Growing Up Fast</Link></h3>
            <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="4" data-category-rank="5">
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=27" alt="Food festival" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Events" data-ar="فعاليات">Events</span>
            <h3><Link href="/article" data-en="Taste of Diriyah Returns With 40 Saudi Concepts" data-ar="طعم الدرعية يعود بـ40 مفهوماً سعودياً">Taste of Diriyah Returns With 40 Saudi Concepts</Link></h3>
            <span className="meta" data-en="3 min read" data-ar="3 دقائق قراءة">3 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="5" data-category-rank="4" data-category-editors-choice>
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=28" alt="Pastry" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Craft" data-ar="حرفة">Craft</span>
            <h3><Link href="/article" data-en="The Bakers Reviving Gulf Pastry Traditions" data-ar="الخبازون يُحيون تقاليد المعجنات الخليجية">The Bakers Reviving Gulf Pastry Traditions</Link></h3>
            <span className="meta" data-en="5 min read" data-ar="5 دقائق قراءة">5 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="6" data-category-rank="6">
            <Link className="card-media square" href="/article">
              <img src="https://loremflickr.com/500/500/food,restaurant?lock=29" alt="Spice market" loading="lazy" />
            </Link>
            <span className="label eyebrow" data-en="Ingredients" data-ar="مكونات">Ingredients</span>
            <h3><Link href="/article" data-en="The Spice Route Revival: Old Ingredients, New Kitchens" data-ar="إحياء طريق التوابل: مكونات قديمة ومطابخ جديدة">The Spice Route Revival: Old Ingredients, New Kitchens</Link></h3>
            <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

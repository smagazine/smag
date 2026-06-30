import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Interviews | SAUDI MAG",
  description: "In conversation with the artists, chefs, architects, and voices defining the Gulf.",
};

export default function InterviewsPage() {
  return (
    <main className="page" id="main-content">
      <Breadcrumb crumbs={[{ label: "Home", href: "/", labelAr: "الرئيسية" }, { label: "Interviews", labelAr: "مقابلات" }]} />
      <div className="page-header page-header--warm">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1 data-en="Interviews" data-ar="مقابلات" style={{ fontStyle: "italic" }}>Interviews</h1>
              <p className="deck" data-en="In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf's future." data-ar="حوارات مع الفنانين والطهاة والمعماريين وأصحاب المشاريع وأصوات الثقافة التي تصنع مستقبل الخليج.">
                In conversation with the artists, chefs, architects, entrepreneurs, and cultural voices defining the Gulf&apos;s future.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      <section className="section container">
        <article className="article-card feature-row reveal mb-stack-lg">
          <Link className="card-media" href="/article/gulf-fashion-identity">
            <Image fill priority src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format" alt="Architect interview portrait" sizes="(min-width: 1280px) 500px, 100vw" />
          </Link>
          <div>
            <span className="label eyebrow" data-en="Long Read" data-ar="قراءة مطوّلة">Long Read</span>
            <h2><Link href="/article/gulf-fashion-identity" data-en="An Hour with the Architect Behind Riyadh's Most Talked-About Building" data-ar="ساعة مع المعماري خلف أكثر مبنى يُتحدث عنه في الرياض">An Hour with the Architect Behind Riyadh&apos;s Most Talked-About Building</Link></h2>
            <blockquote className="interview-pullquote" data-en="&ldquo;The most important material in the Gulf is still light. Everything else is a response to it.&rdquo;" data-ar="&ldquo;أهم مادة في الخليج لا تزال الضوء. كل شيء آخر استجابة له.&rdquo;">
              &ldquo;The most important material in the Gulf is still light. Everything else is a response to it.&rdquo;
            </blockquote>
            <p className="deck" style={{ marginTop: 16 }} data-en="Khalid Al-Mansouri spent five years designing a cultural centre that looks nothing like anything else in the city." data-ar="خالد المنصوري أمضى خمس سنوات في تصميم مركز ثقافي لا يشبه أي شيء آخر في المدينة.">Khalid Al-Mansouri spent five years designing a cultural centre that looks nothing like anything else in the city. He talks about silence, shadow, and why the most important material in the Gulf is still light.</p>
            <p className="mt-lg"><Link className="button secondary" href="/article/gulf-fashion-identity" data-en="Read interview" data-ar="اقرأ المقابلة">Read interview</Link></p>
          </div>
        </article>

        <div className="interview-grid reveal">
          <article className="article-card" data-category-card data-category-order="1" data-category-rank="2" data-category-editors-choice>
            <Link className="card-media" href="/interviews">
              <Image fill src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop&auto=format" alt="Chef portrait" sizes="(min-width: 1280px) 300px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Food & Culture" data-ar="طعام وثقافة">Food &amp; Culture</span>
            <h3><Link href="/interviews" data-en="Bader Al-Rashed: 'Saudi Cuisine Doesn't Need to Explain Itself Anymore'" data-ar="بدر الراشد: 'المطبخ السعودي لم يعد بحاجة إلى تفسير نفسه'">Bader Al-Rashed: &lsquo;Saudi Cuisine Doesn&apos;t Need to Explain Itself Anymore&rsquo;</Link></h3>
            <p className="interview-pullquote" data-en="&ldquo;Cooking at home taught me more than any kitchen I trained in.&rdquo;" data-ar="&ldquo;الطهي في البيت علّمني أكثر من أي مطبخ تدربت فيه.&rdquo;">&ldquo;Cooking at home taught me more than any kitchen I trained in.&rdquo;</p>
            <span className="meta" data-en="8 min read" data-ar="8 دقائق قراءة">8 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="2" data-category-rank="1" data-category-editors-choice>
            <Link className="card-media" href="/interviews">
              <Image fill src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=533&fit=crop&auto=format" alt="Artist portrait" sizes="(min-width: 1280px) 300px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Contemporary Art" data-ar="الفن المعاصر">Contemporary Art</span>
            <h3><Link href="/interviews" data-en="Maha Al-Dosari on Abstraction, Arabic Script, and Going Global" data-ar="مها الدوسري عن التجريد والخط العربي والانتشار العالمي">Maha Al-Dosari on Abstraction, Arabic Script, and Going Global</Link></h3>
            <p className="interview-pullquote" data-en="&ldquo;Arabic has a visual logic that no other script touches.&rdquo;" data-ar="&ldquo;للعربية منطق بصري لا يلمسه أي خط آخر.&rdquo;">&ldquo;Arabic has a visual logic that no other script touches.&rdquo;</p>
            <span className="meta" data-en="9 min read" data-ar="9 دقائق قراءة">9 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="3" data-category-rank="4">
            <Link className="card-media" href="/interviews">
              <Image fill src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=533&fit=crop&auto=format" alt="Entrepreneur portrait" sizes="(min-width: 1280px) 300px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Business" data-ar="أعمال">Business</span>
            <h3><Link href="/interviews" data-en="Nora Al-Qassim on Building a Quiet Gulf Brand with Global Reach" data-ar="نورة القاسم عن بناء علامة خليجية هادئة ذات وصول عالمي">Nora Al-Qassim on Building a Quiet Gulf Brand with Global Reach</Link></h3>
            <p className="interview-pullquote" data-en="&ldquo;I turned down three acquisitions. Patience is not timidity.&rdquo;" data-ar="&ldquo;رفضت ثلاثة عروض استحواذ. الصبر ليس جبناً.&rdquo;">&ldquo;I turned down three acquisitions. Patience is not timidity.&rdquo;</p>
            <span className="meta" data-en="7 min read" data-ar="7 دقائق قراءة">7 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="4" data-category-rank="3">
            <Link className="card-media" href="/interviews">
              <Image fill src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=533&fit=crop&auto=format" alt="Director portrait" sizes="(min-width: 1280px) 300px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Film" data-ar="سينما">Film</span>
            <h3><Link href="/interviews" data-en="Omar Al-Farsi: 'Arab Cinema Has Found Its Moment'" data-ar="عمر الفارسي: 'السينما العربية وجدت لحظتها'">Omar Al-Farsi: &lsquo;Arab Cinema Has Found Its Moment&rsquo;</Link></h3>
            <p className="interview-pullquote" data-en="&ldquo;The Gulf has stories the world hasn't seen yet.&rdquo;" data-ar="&ldquo;الخليج لديه قصص لم يرها العالم بعد.&rdquo;">&ldquo;The Gulf has stories the world hasn&apos;t seen yet.&rdquo;</p>
            <span className="meta" data-en="10 min read" data-ar="10 دقائق قراءة">10 min read</span>
          </article>

          <article className="article-card" data-category-card data-category-order="5" data-category-rank="5">
            <Link className="card-media" href="/article/gulf-fashion-identity">
              <Image fill src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop&auto=format" alt="Designer portrait" sizes="(min-width: 1280px) 300px, 50vw" />
            </Link>
            <span className="label eyebrow" data-en="Style" data-ar="أسلوب">Style</span>
            <h3><Link href="/article/gulf-fashion-identity" data-en="Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience" data-ar="حصة السويدي: تصميم الأزياء المحتشمة لجمهور عالمي">Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience</Link></h3>
            <p className="interview-pullquote" data-en="&ldquo;Modesty is not a constraint. It's a creative frame.&rdquo;" data-ar="&ldquo;الحشمة ليست قيداً. إنها إطار إبداعي.&rdquo;">&ldquo;Modesty is not a constraint. It&apos;s a creative frame.&rdquo;</p>
            <span className="meta" data-en="6 min read" data-ar="6 دقائق قراءة">6 min read</span>
          </article>
        </div>
      </section>
    </main>
  );
}

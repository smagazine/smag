import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Daily Briefing",
  description:
    "The free morning read for people following Saudi Arabia's culture, cities, and ideas — in English and Arabic, every weekday.",
  alternates: { canonical: "/subscribe" },
};

export const revalidate = 3600;

/**
 * Newsletter landing page. This used to sell a paid membership with Digital
 * and Print & Digital tiers; there is no print edition and no payment flow, so
 * the tiers, the pricing and the signup dialog are gone. The briefing itself is
 * real and free, so the route stays and explains it.
 *
 * No signup form here on purpose — app/(site)/layout.tsx already closes every
 * public page with the newsletter panel, so the CTA below just anchors to it
 * rather than putting a second, competing form on the same page.
 */
export default function SubscribePage() {
  return (
    <main className="page" id="main-content">
      <section className="subscription-hero">
        <div className="image-frame reveal">
          <Image
            fill
            priority
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop&auto=format"
            alt=""
            sizes="100vw"
          />
        </div>
        <div className="container d-grid">
          <div className="briefing-card reveal">
            <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
            <h1 data-en="Saudi Arabia, every weekday morning." data-ar="السعودية، كل صباح يوم عمل.">
              Saudi Arabia, every weekday morning.
            </h1>
            <p className="deck" data-en="One email with what we published and what we are watching — culture, cities, food, sport, and the people behind them. Free, and written in both languages." data-ar="رسالة واحدة بما نشرناه وما نتابعه — الثقافة والمدن والطعام والرياضة والأشخاص خلفها. مجانية، ومكتوبة باللغتين.">
              One email with what we published and what we are watching — culture, cities, food,
              sport, and the people behind them. Free, and written in both languages.
            </p>
            <p className="mt-lg">
              <a className="button" href="#newsletter" data-en="Sign up free" data-ar="اشترك مجاناً">
                Sign up free
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="benefits">
          <div className="benefit reveal">
            <span className="material-symbols-outlined">auto_stories</span>
            <h3 data-en="The Day's Reading" data-ar="قراءة اليوم">The Day&apos;s Reading</h3>
            <p data-en="Every story we publish, gathered into one morning email so you do not have to check back." data-ar="كل قصة ننشرها، مجموعة في رسالة صباحية واحدة حتى لا تضطر للعودة والبحث.">Every story we publish, gathered into one morning email so you do not have to check back.</p>
          </div>
          <div className="benefit reveal">
            <span className="material-symbols-outlined">translate</span>
            <h3 data-en="English and Arabic" data-ar="بالإنجليزية والعربية">English and Arabic</h3>
            <p data-en="Read it in either language. Every story is written in both, not machine-translated from one into the other." data-ar="اقرأها بأي من اللغتين. كل قصة تُكتب بهما معاً، لا تُترجم آلياً من إحداهما إلى الأخرى.">Read it in either language. Every story is written in both, not machine-translated from one into the other.</p>
          </div>
          <div className="benefit reveal">
            <span className="material-symbols-outlined">mark_email_read</span>
            <h3 data-en="Free, and Only This" data-ar="مجانية، ولهذا فقط">Free, and Only This</h3>
            <p data-en="No charge, no paywall, and no other mail. Your address is used for the briefing and nothing else, and we never pass it on." data-ar="بلا رسوم ولا جدار دفع ولا أي بريد آخر. يُستخدم عنوانك للنشرة فقط، ولا نمرره لأحد أبداً.">No charge, no paywall, and no other mail. Your address is used for the briefing and nothing else, and we never pass it on.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="stats-row reveal">
            <div className="stat-item">
              <span className="stat-number" data-en="Daily" data-ar="يومياً">Daily</span>
              <span className="stat-label" data-en="Every Weekday Morning" data-ar="كل صباح يوم عمل">Every Weekday Morning</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-en="EN / AR" data-ar="إنجليزي / عربي">EN / AR</span>
              <span className="stat-label" data-en="Every Story, Both Languages" data-ar="كل قصة، باللغتين">Every Story, Both Languages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-en="Free" data-ar="مجانية">Free</span>
              <span className="stat-label" data-en="No Paywall, Ever" data-ar="بلا جدار دفع، أبداً">No Paywall, Ever</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container text-center">
        <blockquote className="pullquote reveal" data-en="Independent journalism about Saudi Arabia, written in both of its reading languages." data-ar="صحافة مستقلة عن السعودية، تُكتب بلغتي القراءة فيها.">
          Independent journalism about Saudi Arabia, written in both of its reading languages.
        </blockquote>
      </section>
    </main>
  );
}

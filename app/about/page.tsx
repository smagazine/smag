import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SAUDI MAG",
  description:
    "SAUDI MAG is an editorial platform covering Gulf culture, architecture, business, hospitality, and design from the region's perspective.",
};

export default function AboutPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="about-contact">
          <div className="reveal">
            <span className="label eyebrow" data-en="About the Magazine" data-ar="عن المجلة">About the Magazine</span>
            <h1 data-en="An original editorial lens on the Gulf's cultural moment." data-ar="عدسة تحريرية أصيلة على اللحظة الثقافية للخليج.">An original editorial lens on the Gulf&apos;s cultural moment.</h1>
            <p className="deck" data-en="SAUDI MAG is a polished digital magazine demo inspired by contemporary Gulf-region publishing: image-led, useful, warm, and focused on architecture, culture, business, hospitality, and design." data-ar="SAUDI MAG نموذج مجلة رقمية مصقول مستوحى من النشر المعاصر في منطقة الخليج: يقوده الصورة، نافع، دافئ، ومركّز على العمارة والثقافة والأعمال والضيافة والتصميم.">
              SAUDI MAG is a polished digital magazine demo inspired by contemporary Gulf-region
              publishing: image-led, useful, warm, and focused on architecture, culture, business,
              hospitality, and design.
            </p>
            <p className="deck" data-en="The demo brings the existing screens into one coherent experience with shared navigation, consistent typography, elegant spacing, responsive behavior, and subtle editorial interactions." data-ar="يجمع النموذج الشاشات الموجودة في تجربة متسقة مع تنقل مشترك وطباعة متناسقة وتباعد أنيق وسلوك متجاوب وتفاعلات تحريرية خفية.">
              The demo brings the existing screens into one coherent experience with shared
              navigation, consistent typography, elegant spacing, responsive behavior, and subtle
              editorial interactions.
            </p>
          </div>
          <aside className="reveal border-top-sm">
            <span className="label eyebrow" data-en="Editorial Pillars" data-ar="الركائز التحريرية">Editorial Pillars</span>
            <div className="issue-list gap-sm mt-sm-top">
              <p>
                <strong data-en="Culture" data-ar="الثقافة">Culture</strong>
                <br />
                <span data-en="Art, performance, heritage, and creative voices." data-ar="الفن والأداء والتراث والأصوات الإبداعية.">Art, performance, heritage, and creative voices.</span>
              </p>
              <p>
                <strong data-en="Design" data-ar="التصميم">Design</strong>
                <br />
                <span data-en="Architecture, interiors, and future civic space." data-ar="العمارة والتصميم الداخلي والفضاء المدني المستقبلي.">Architecture, interiors, and future civic space.</span>
              </p>
              <p>
                <strong data-en="Living" data-ar="الحياة">Living</strong>
                <br />
                <span data-en="Hospitality, dining, travel, and considered daily culture." data-ar="الضيافة وتناول الطعام والسفر وثقافة الحياة اليومية.">Hospitality, dining, travel, and considered daily culture.</span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="feature-band reveal">
        <div className="image-frame">
          <img
            src="https://loremflickr.com/1400/800/architecture,city?lock=1"
            alt="SAUDI MAG editorial studio"
            loading="lazy"
          />
        </div>
        <div className="feature-band-copy">
          <span className="label eyebrow" data-en="Design System" data-ar="نظام التصميم">Design System</span>
          <h2 data-en="Bold Editorial, Built for Screens" data-ar="تحرير جريء، مصنوع للشاشات">Bold Editorial, Built for Screens</h2>
          <p className="deck" data-en="Characterful headlines, compact news modules, thin dividers, clean white surfaces, black headers, and lime green accents create a distinct magazine identity." data-ar="عناوين مميزة ووحدات إخبارية مضغوطة وفواصل رفيعة وأسطح بيضاء نظيفة وترويسات سوداء وهجات خضراء ليموني تُشكّل هوية مجلة متميزة.">
            Characterful headlines, compact news modules, thin dividers, clean white surfaces, black
            headers, and lime green accents create a distinct magazine identity.
          </p>
        </div>
      </section>
    </main>
  );
}

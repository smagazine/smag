import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SAUDI MAG",
  description:
    "SAUDI MAG is an editorial platform covering Saudi culture, architecture, business, hospitality, and design from the Kingdom's perspective.",
};

export default function AboutPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="about-contact">
          <div className="reveal">
            <span className="label eyebrow" data-en="About the Magazine" data-ar="عن المجلة">About the Magazine</span>
            <h1 data-en="An original editorial lens on Saudi Arabia's cultural moment." data-ar="عدسة تحريرية أصيلة على اللحظة الثقافية السعودية.">An original editorial lens on Saudi Arabia&apos;s cultural moment.</h1>
            <p className="deck" data-en="SAUDI MAG is an independent digital magazine covering Saudi Arabia: image-led, useful, and warm. We report on culture and the arts, cities and design, food and hospitality, sport, music, fashion, travel, and the people shaping all of it." data-ar="SAUDI MAG مجلة رقمية مستقلة تغطي السعودية: يقودها الصورة، نافعة، ودافئة. نغطي الثقافة والفنون، المدن والتصميم، الطعام والضيافة، الرياضة والموسيقى والموضة والسفر، والأشخاص الذين يصنعون كل ذلك.">
              SAUDI MAG is an independent digital magazine covering Saudi Arabia: image-led,
              useful, and warm. We report on culture and the arts, cities and design, food and
              hospitality, sport, music, fashion, travel, and the people shaping all of it.
            </p>
            <p className="deck" data-en="We publish in English and Arabic, every day, from the Kingdom's perspective rather than about it from a distance." data-ar="ننشر بالإنجليزية والعربية، كل يوم، من منظور المملكة لا عنها من بعيد.">
              We publish in English and Arabic, every day, from the Kingdom&apos;s perspective
              rather than about it from a distance.
            </p>
          </div>
          <aside className="reveal border-top-sm">
            <span className="label eyebrow" data-en="What We Cover" data-ar="ما نغطيه">What We Cover</span>
            <div className="issue-list gap-sm mt-sm-top">
              <p>
                <strong data-en="News" data-ar="الأخبار">News</strong>
                <br />
                <span data-en="Headlines and Saudi news, reported daily." data-ar="العناوين وأخبار السعودية، تُنشر يومياً.">Headlines and Saudi news, reported daily.</span>
              </p>
              <p>
                <strong data-en="Culture" data-ar="الثقافة">Culture</strong>
                <br />
                <span data-en="Art, music, heritage, events, and creative voices." data-ar="الفن والموسيقى والتراث والفعاليات والأصوات الإبداعية.">Art, music, heritage, events, and creative voices.</span>
              </p>
              <p>
                <strong data-en="Living" data-ar="الحياة">Living</strong>
                <br />
                <span data-en="Food, hospitality, travel, fashion, and daily culture." data-ar="الطعام والضيافة والسفر والموضة والحياة اليومية.">Food, hospitality, travel, fashion, and daily culture.</span>
              </p>
              <p>
                <strong data-en="People" data-ar="شخصيات">People</strong>
                <br />
                <span data-en="Interviews, profiles, and the sport shaping the Kingdom." data-ar="مقابلات وملفات شخصية والرياضة التي تصنع المملكة.">Interviews, profiles, and the sport shaping the Kingdom.</span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="feature-band reveal">
        <div className="image-frame">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&h=800&fit=crop&auto=format"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="feature-band-copy">
          <span className="label eyebrow" data-en="How We Work" data-ar="كيف نعمل">How We Work</span>
          <h2 data-en="Written Twice, Read Either Way" data-ar="نكتب مرتين، تُقرأ بأي لغة">Written Twice, Read Either Way</h2>
          <p className="deck" data-en="Every story is published in English and Arabic, not machine-translated from one into the other. Anything paid for or produced with a partner is labelled as such, in both languages. When we get something wrong, we correct it on the page rather than quietly removing it." data-ar="تُنشر كل قصة بالإنجليزية والعربية، لا تُترجم آلياً من إحداهما إلى الأخرى. وكل محتوى مدفوع أو منتج مع شريك يُوسم بوضوح، باللغتين. وحين نخطئ، نصحّح على الصفحة بدل أن نحذف بصمت.">
            Every story is published in English and Arabic, not machine-translated from one into
            the other. Anything paid for or produced with a partner is labelled as such, in both
            languages. When we get something wrong, we correct it on the page rather than quietly
            removing it.
          </p>
        </div>
      </section>
    </main>
  );
}

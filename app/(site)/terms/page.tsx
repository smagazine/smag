import type { Metadata } from "next";
import { EMAIL_EDITORIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms you accept by reading SAUDI MAG, commenting, pitching, or subscribing to the briefing.",
  alternates: { canonical: "/terms" },
};

export const revalidate = 3600;

/**
 * OWNER REVIEW REQUIRED before this is relied on as legal text.
 *
 * Written against what the site actually offers. One clause needs a human
 * decision and is marked REVIEW inline: the governing-law and venue wording,
 * which normally names a registered entity — and there isn't one yet.
 *
 * Markup note: contexts/LangContext.tsx swaps textContent only on childless
 * elements, so every translated string is a text-only leaf and links live in
 * their own siblings.
 */
export default function TermsPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="reveal">
          <span className="label eyebrow" data-en="Legal" data-ar="قانوني">Legal</span>
          <h1 data-en="Terms of Use" data-ar="شروط الاستخدام">Terms of Use</h1>
          <p className="deck" data-en="These terms cover reading SAUDI MAG, commenting on it, pitching to it, and subscribing to the briefing." data-ar="تغطي هذه الشروط قراءة SAUDI MAG والتعليق عليها وإرسال المقترحات إليها والاشتراك في النشرة.">
            These terms cover reading SAUDI MAG, commenting on it, pitching to it, and subscribing
            to the briefing.
          </p>
          <p className="meta" data-en="Last updated: 11 September 2026" data-ar="آخر تحديث: ١١ سبتمبر ٢٠٢٦">
            Last updated: 11 September 2026
          </p>
        </div>

        <div className="legal-prose reveal">
          <h2 data-en="Accepting these terms" data-ar="قبول هذه الشروط">Accepting these terms</h2>
          <p data-en="By using this site you accept what follows. If you do not, please stop using it. We may update these terms; the date above tells you when we last did." data-ar="باستخدامك هذا الموقع فإنك تقبل ما يلي. وإن لم تقبل، فالرجاء التوقف عن استخدامه. قد نحدّث هذه الشروط؛ والتاريخ أعلاه يخبرك متى فعلنا ذلك آخر مرة.">
            By using this site you accept what follows. If you do not, please stop using it. We
            may update these terms; the date above tells you when we last did.
          </p>

          <h2 data-en="What we publish" data-ar="ما ننشره">What we publish</h2>
          <p data-en="Our articles are journalism and general interest writing. They are not professional, legal, financial, or medical advice, and should not be relied on as such. We may correct, update, or withdraw a piece at any time." data-ar="مقالاتنا صحافة وكتابة ذات اهتمام عام. وهي ليست استشارة مهنية أو قانونية أو مالية أو طبية، ولا ينبغي الاعتماد عليها بهذه الصفة. وقد نصحّح أي مادة أو نحدّثها أو نسحبها في أي وقت.">
            Our articles are journalism and general interest writing. They are not professional,
            legal, financial, or medical advice, and should not be relied on as such. We may
            correct, update, or withdraw a piece at any time.
          </p>
          <p data-en="Content produced with or paid for by a partner is labelled as sponsored where it appears. If it is not labelled, no one paid for it." data-ar="المحتوى المنتج مع شريك أو المدفوع منه يُوسم بأنه برعاية حيث يظهر. وإن لم يكن موسوماً، فلم يدفع أحد مقابله.">
            Content produced with or paid for by a partner is labelled as sponsored where it
            appears. If it is not labelled, no one paid for it.
          </p>

          <h2 data-en="Our work belongs to us" data-ar="أعمالنا ملك لنا">Our work belongs to us</h2>
          <p data-en="The writing, photography, and design on this site are ours or used with permission. Read them, quote them briefly with credit, and share links freely. Do not republish whole articles, translate them, or use them to train models without asking us first." data-ar="النصوص والصور والتصميم في هذا الموقع ملك لنا أو مستخدمة بإذن. اقرأها، واقتبس منها باختصار مع الإسناد، وشارك الروابط بحرية. ولا تُعد نشر مقالات كاملة أو تترجمها أو تستخدمها لتدريب النماذج دون الرجوع إلينا أولاً.">
            The writing, photography, and design on this site are ours or used with permission.
            Read them, quote them briefly with credit, and share links freely. Do not republish
            whole articles, translate them, or use them to train models without asking us first.
          </p>
          <p data-en="Some photography is licensed from stock libraries and carries its own separate licence, which does not pass to you." data-ar="بعض الصور مرخّصة من مكتبات صور وتحمل ترخيصها المنفصل الذي لا ينتقل إليك.">
            Some photography is licensed from stock libraries and carries its own separate licence,
            which does not pass to you.
          </p>

          <h2 data-en="What you send us" data-ar="ما ترسله إلينا">What you send us</h2>
          <p data-en="This covers comments, pitches, and anything you write in the contact form. By sending it, you confirm it is yours to send and that it does not break the law or anyone else's rights." data-ar="يشمل ذلك التعليقات والمقترحات وكل ما تكتبه في نموذج التواصل. بإرسالك إياه، تؤكد أنه ملكك وأنه لا يخالف القانون ولا حقوق الآخرين.">
            This covers comments, pitches, and anything you write in the contact form. By sending
            it, you confirm it is yours to send and that it does not break the law or anyone
            else&apos;s rights.
          </p>
          <p data-en="You keep ownership of what you write. You give us permission to publish it on this site and to edit it for length and clarity. We moderate comments and may decline or remove any of them without explanation." data-ar="تحتفظ بملكية ما تكتبه. وتمنحنا إذناً بنشره على هذا الموقع وتحريره من حيث الطول والوضوح. نحن نراجع التعليقات وقد نرفض أياً منها أو نزيله دون تفسير.">
            You keep ownership of what you write. You give us permission to publish it on this
            site and to edit it for length and clarity. We moderate comments and may decline or
            remove any of them without explanation.
          </p>

          <h2 data-en="Using the site fairly" data-ar="الاستخدام العادل للموقع">Using the site fairly</h2>
          <p data-en="Please do not scrape the site in bulk, hammer it with automated requests, try to reach our editorial tools or private endpoints, or post anything unlawful, abusive, or defamatory." data-ar="الرجاء عدم استخراج محتوى الموقع بالجملة، أو إغراقه بطلبات آلية، أو محاولة الوصول إلى أدوات التحرير أو النقاط الخاصة لدينا، أو نشر أي محتوى غير قانوني أو مسيء أو تشهيري.">
            Please do not scrape the site in bulk, hammer it with automated requests, try to reach
            our editorial tools or private endpoints, or post anything unlawful, abusive, or
            defamatory.
          </p>

          <h2 data-en="The newsletter" data-ar="النشرة البريدية">The newsletter</h2>
          <p data-en="The daily briefing is free and entirely optional. You can ask us to unsubscribe you at any time and we will, by hand, as explained in our privacy policy." data-ar="النشرة اليومية مجانية واختيارية تماماً. يمكنك أن تطلب إلغاء اشتراكك في أي وقت وسنفعل ذلك يدوياً، كما هو موضح في سياسة الخصوصية لدينا.">
            The daily briefing is free and entirely optional. You can ask us to unsubscribe you at
            any time and we will, by hand, as explained in our privacy policy.
          </p>

          <h2 data-en="Links and embeds" data-ar="الروابط والتضمينات">Links and embeds</h2>
          <p data-en="We link to other sites and embed video players we do not run. Those links are not endorsements, and what happens on the other end is governed by that site's own terms, not ours." data-ar="نضع روابط لمواقع أخرى ونضمّن مشغّلات فيديو لا ندير عملها. هذه الروابط ليست تزكية، وما يحدث في الطرف الآخر تحكمه شروط ذلك الموقع لا شروطنا.">
            We link to other sites and embed video players we do not run. Those links are not
            endorsements, and what happens on the other end is governed by that site&apos;s own
            terms, not ours.
          </p>

          <h2 data-en="Availability" data-ar="التوافر">Availability</h2>
          <p data-en="The site is provided as it is. We do not promise it will always be reachable, error-free, or complete, and we are not liable for loss arising from using it or being unable to. Nothing here limits liability that cannot lawfully be limited." data-ar="يُقدَّم الموقع كما هو. لا نعد بأنه سيكون متاحاً دائماً أو خالياً من الأخطاء أو مكتملاً، ولسنا مسؤولين عن خسارة ناتجة عن استخدامه أو تعذّر استخدامه. ولا شيء هنا يحدّ من مسؤولية لا يجوز قانوناً الحد منها.">
            The site is provided as it is. We do not promise it will always be reachable,
            error-free, or complete, and we are not liable for loss arising from using it or being
            unable to. Nothing here limits liability that cannot lawfully be limited.
          </p>

          <h2 data-en="Governing law" data-ar="القانون الحاكم">Governing law</h2>
          <p data-en="These terms are governed by the laws of the Kingdom of Saudi Arabia, and disputes fall to the competent Saudi courts." data-ar="تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص المحاكم السعودية المختصة بالنظر في المنازعات.">
            These terms are governed by the laws of the Kingdom of Saudi Arabia, and disputes fall
            to the competent Saudi courts.
          </p>

          <h2 data-en="Contact" data-ar="تواصل">Contact</h2>
          <p data-en="Questions about these terms go to:" data-ar="أسئلتك حول هذه الشروط تُرسل إلى:">
            Questions about these terms go to:
          </p>
          <p>
            <a href={`mailto:${EMAIL_EDITORIAL}`} data-en={EMAIL_EDITORIAL} data-ar={EMAIL_EDITORIAL}>
              {EMAIL_EDITORIAL}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

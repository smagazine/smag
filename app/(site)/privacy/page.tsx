import type { Metadata } from "next";
import { EMAIL_EDITORIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What SAUDI MAG collects, why, where it is stored, and the rights you have over it under Saudi Arabia's Personal Data Protection Law.",
  alternates: { canonical: "/privacy" },
};

export const revalidate = 3600;

/**
 * OWNER REVIEW REQUIRED before this is relied on as legal text.
 *
 * Every statement below was written against what the code actually does —
 * lib/submissions.ts (newsletter + contact), lib/comments.ts, lib/analytics.ts,
 * lib/rate-limit.ts, lib/auth.ts, and the image/embed hosts allowed in
 * next.config.ts. It is accurate to the implementation, but four things still
 * need a human decision, and are marked REVIEW inline:
 *   1. the Firebase region (determines the cross-border-transfer sentence)
 *   2. retention periods — nothing in the code deletes anything today
 *   3. unsubscribe is email-only; there is no one-click link yet
 *   4. whether to name a data controller at all, given no registered entity
 *
 * Note on markup: contexts/LangContext.tsx only swaps textContent on childless
 * elements, so every translated string here is a text-only leaf. Links and
 * addresses sit in their own sibling elements, never inside a translated
 * paragraph — a <p> wrapping an <a> would stay frozen in English forever.
 */
export default function PrivacyPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="reveal">
          <span className="label eyebrow" data-en="Legal" data-ar="قانوني">Legal</span>
          <h1 data-en="Privacy Policy" data-ar="سياسة الخصوصية">Privacy Policy</h1>
          <p className="deck" data-en="This explains what we collect when you read SAUDI MAG, why we collect it, where it is kept, and what you can ask us to do with it." data-ar="توضح هذه الصفحة ما نجمعه عند قراءتك لـ SAUDI MAG، ولماذا نجمعه، وأين يُحفظ، وما يمكنك أن تطلب منا فعله به.">
            This explains what we collect when you read SAUDI MAG, why we collect it, where it is
            kept, and what you can ask us to do with it.
          </p>
          <p className="meta" data-en="Last updated: 11 September 2026" data-ar="آخر تحديث: ١١ سبتمبر ٢٠٢٦">
            Last updated: 11 September 2026
          </p>
        </div>

        <div className="legal-prose reveal">
          <h2 data-en="Who we are" data-ar="من نحن">Who we are</h2>
          <p data-en="SAUDI MAG is an independent digital magazine covering Saudi Arabia, published in English and Arabic. We are not currently a registered company, and we do not claim to be one. Questions about this policy, or about data we hold, go to our editorial address:" data-ar="SAUDI MAG مجلة رقمية مستقلة تغطي السعودية، تُنشر بالإنجليزية والعربية. لسنا حالياً شركة مسجلة، ولا ندّعي ذلك. أسئلتك حول هذه السياسة أو حول البيانات التي نحتفظ بها تُرسل إلى بريد التحرير:">
            SAUDI MAG is an independent digital magazine covering Saudi Arabia, published in
            English and Arabic. We are not currently a registered company, and we do not claim to
            be one. Questions about this policy, or about data we hold, go to our editorial
            address:
          </p>
          <p>
            <a href={`mailto:${EMAIL_EDITORIAL}`} data-en={EMAIL_EDITORIAL} data-ar={EMAIL_EDITORIAL}>
              {EMAIL_EDITORIAL}
            </a>
          </p>

          <h2 data-en="What we collect" data-ar="ما الذي نجمعه">What we collect</h2>
          <p data-en="Newsletter: if you subscribe to the daily briefing, we store the email address you give us. Nothing else." data-ar="النشرة البريدية: إذا اشتركت في النشرة اليومية، نحفظ عنوان بريدك الإلكتروني الذي تعطينا إياه. لا شيء غير ذلك.">
            Newsletter: if you subscribe to the daily briefing, we store the email address you
            give us. Nothing else.
          </p>
          <p data-en="Contact form: your name, your email address, the topic you select, and the message you write." data-ar="نموذج التواصل: اسمك وعنوان بريدك الإلكتروني والموضوع الذي تختاره والرسالة التي تكتبها.">
            Contact form: your name, your email address, the topic you select, and the message you
            write.
          </p>
          <p data-en="Comments: if you comment on an article, we store the name you enter, your email address, and the comment itself. Your name and comment are published; your email address is not shown to other readers." data-ar="التعليقات: إذا علّقت على مقال، نحفظ الاسم الذي تُدخله وعنوان بريدك الإلكتروني ونص التعليق. يُنشر اسمك وتعليقك؛ أما بريدك الإلكتروني فلا يظهر لبقية القراء.">
            Comments: if you comment on an article, we store the name you enter, your email
            address, and the comment itself. Your name and comment are published; your email
            address is not shown to other readers.
          </p>
          <p data-en="Page views: we count how many times each article is opened. This is a plain counter with no visitor identifier attached — we cannot tell which pages any one person read, and we do not try to." data-ar="مشاهدات الصفحات: نحصي عدد مرات فتح كل مقال. هذا عدّاد بسيط لا يرتبط بأي معرّف للزائر — لا يمكننا معرفة الصفحات التي قرأها شخص بعينه، ولا نحاول ذلك.">
            Page views: we count how many times each article is opened. This is a plain counter
            with no visitor identifier attached — we cannot tell which pages any one person read,
            and we do not try to.
          </p>
          <p data-en="Rate limiting: to stop the forms being flooded, we briefly hold your IP address in memory. It is never written to storage and disappears when the server recycles." data-ar="الحد من المعدل: لمنع إغراق النماذج، نحتفظ بعنوان IP الخاص بك في الذاكرة لفترة وجيزة. لا يُكتب إلى التخزين أبداً ويختفي عند إعادة تشغيل الخادم.">
            Rate limiting: to stop the forms being flooded, we briefly hold your IP address in
            memory. It is never written to storage and disappears when the server recycles.
          </p>

          <h2 data-en="Why we collect it" data-ar="لماذا نجمعه">Why we collect it</h2>
          <p data-en="To send you the briefing you asked for, to reply to messages you send us, to publish and moderate comments, and to understand which stories readers open. That is the whole list." data-ar="لنرسل إليك النشرة التي طلبتها، ولنرد على رسائلك، ولننشر التعليقات ونراجعها، ولنعرف أي القصص يفتحها القراء. هذه هي القائمة كاملة.">
            To send you the briefing you asked for, to reply to messages you send us, to publish
            and moderate comments, and to understand which stories readers open. That is the whole
            list.
          </p>
          <p data-en="Under Saudi Arabia's Personal Data Protection Law, our basis is your consent for the newsletter, and your own act of contacting us for everything in a message you chose to send." data-ar="بموجب نظام حماية البيانات الشخصية في السعودية، أساسنا هو موافقتك بالنسبة للنشرة البريدية، وتواصلك معنا بنفسك بالنسبة لكل ما يرد في رسالة اخترت إرسالها.">
            Under Saudi Arabia&apos;s Personal Data Protection Law, our basis is your consent for
            the newsletter, and your own act of contacting us for everything in a message you
            chose to send.
          </p>

          <h2 data-en="Where it is stored" data-ar="أين يُحفظ">Where it is stored</h2>
          <p data-en="In Google Firebase — Firestore for text, Cloud Storage for images and video. Google operates these services from data centres that may sit outside Saudi Arabia, which means your data may be transferred abroad and held under another country's laws." data-ar="في Google Firebase — قاعدة Firestore للنصوص وCloud Storage للصور والفيديو. تُشغّل Google هذه الخدمات من مراكز بيانات قد تقع خارج السعودية، ما يعني أن بياناتك قد تُنقل إلى الخارج وتُحفظ وفق قوانين دولة أخرى.">
            In Google Firebase — Firestore for text, Cloud Storage for images and video. Google
            operates these services from data centres that may sit outside Saudi Arabia, which
            means your data may be transferred abroad and held under another country&apos;s laws.
          </p>

          <h2 data-en="Who we share it with" data-ar="مع من نشاركه">Who we share it with</h2>
          <p data-en="No one. We do not sell or rent your data. There is no advertising network, no data broker, no marketing or CRM platform, and no third-party analytics service anywhere on this site." data-ar="لا أحد. لا نبيع بياناتك ولا نؤجّرها. لا توجد شبكة إعلانات ولا وسيط بيانات ولا منصة تسويق أو إدارة علاقات عملاء ولا خدمة تحليلات خارجية في أي مكان على هذا الموقع.">
            No one. We do not sell or rent your data. There is no advertising network, no data
            broker, no marketing or CRM platform, and no third-party analytics service anywhere on
            this site.
          </p>

          <h2 data-en="Other companies your browser contacts" data-ar="شركات أخرى يتصل بها متصفحك">Other companies your browser contacts</h2>
          <p data-en="Some images on this site are served by Unsplash and by Google Cloud Storage. Loading a page means your browser requests those files directly, so those companies can see your IP address and which browser you use." data-ar="تُقدَّم بعض صور هذا الموقع من Unsplash ومن Google Cloud Storage. فتح الصفحة يعني أن متصفحك يطلب تلك الملفات مباشرة، لذا يمكن لتلك الشركات رؤية عنوان IP والمتصفح الذي تستخدمه.">
            Some images on this site are served by Unsplash and by Google Cloud Storage. Loading a
            page means your browser requests those files directly, so those companies can see your
            IP address and which browser you use.
          </p>
          <p data-en="Articles containing video embed a player from YouTube or Vimeo. Those players may set their own cookies under their own privacy policies, which we do not control. Articles without video load neither." data-ar="المقالات التي تحتوي على فيديو تضمّن مشغّلاً من YouTube أو Vimeo. قد تضع تلك المشغّلات ملفات تعريف ارتباط خاصة بها وفق سياسات خصوصيتها التي لا نتحكم بها. أما المقالات بلا فيديو فلا تُحمّل أياً منها.">
            Articles containing video embed a player from YouTube or Vimeo. Those players may set
            their own cookies under their own privacy policies, which we do not control. Articles
            without video load neither.
          </p>

          <h2 data-en="Cookies and browser storage" data-ar="ملفات الارتباط وتخزين المتصفح">Cookies and browser storage</h2>
          <p data-en="We set no tracking cookies. Your browser remembers three preferences locally — your chosen language, light or dark mode, and whether you have already dismissed the newsletter prompt. These stay on your device, are never sent to us, and are not used to profile you." data-ar="لا نضع أي ملفات ارتباط للتتبع. يتذكر متصفحك ثلاثة تفضيلات محلياً — لغتك المختارة، والوضع الفاتح أو الداكن، وما إذا كنت قد أغلقت دعوة النشرة البريدية. تبقى هذه على جهازك، ولا تُرسل إلينا أبداً، ولا تُستخدم لتحليل سلوكك.">
            We set no tracking cookies. Your browser remembers three preferences locally — your
            chosen language, light or dark mode, and whether you have already dismissed the
            newsletter prompt. These stay on your device, are never sent to us, and are not used
            to profile you.
          </p>
          <p data-en="One cookie does exist: a sign-in session for our own editorial staff. It is never set for readers." data-ar="يوجد ملف ارتباط واحد فعلاً: جلسة تسجيل دخول لفريق التحرير لدينا. لا يُضبط للقراء أبداً.">
            One cookie does exist: a sign-in session for our own editorial staff. It is never set
            for readers.
          </p>

          <h2 data-en="How long we keep it" data-ar="كم نحتفظ به">How long we keep it</h2>
          <p data-en="We keep newsletter subscriptions until you ask us to remove you. Contact messages and comments are kept while they are still useful to us editorially. If you want something deleted sooner, write to us and we will remove it." data-ar="نحتفظ باشتراكات النشرة حتى تطلب منا إزالتك. تُحفظ رسائل التواصل والتعليقات ما دامت مفيدة لنا تحريرياً. وإذا أردت حذف شيء قبل ذلك، راسلنا وسنزيله.">
            We keep newsletter subscriptions until you ask us to remove you. Contact messages and
            comments are kept while they are still useful to us editorially. If you want something
            deleted sooner, write to us and we will remove it.
          </p>

          <h2 data-en="Your rights" data-ar="حقوقك">Your rights</h2>
          <p data-en="Saudi Arabia's Personal Data Protection Law gives you the right to know what we hold about you, to get a copy of it, to have it corrected if it is wrong, to have it deleted, and to withdraw consent you previously gave." data-ar="يمنحك نظام حماية البيانات الشخصية في السعودية الحق في معرفة ما نحتفظ به عنك، والحصول على نسخة منه، وتصحيحه إن كان خاطئاً، وحذفه، وسحب موافقة سبق أن منحتها.">
            Saudi Arabia&apos;s Personal Data Protection Law gives you the right to know what we
            hold about you, to get a copy of it, to have it corrected if it is wrong, to have it
            deleted, and to withdraw consent you previously gave.
          </p>
          <p data-en="To use any of these, email us. We do not yet have a one-click unsubscribe link in the briefing, so for now unsubscribing means sending us a message — we will action it by hand." data-ar="لاستخدام أي من هذه الحقوق، راسلنا. لا يوجد لدينا بعد رابط إلغاء اشتراك بنقرة واحدة في النشرة، لذا يعني إلغاء الاشتراك حالياً إرسال رسالة إلينا — وسننفّذها يدوياً.">
            To use any of these, email us. We do not yet have a one-click unsubscribe link in the
            briefing, so for now unsubscribing means sending us a message — we will action it by
            hand.
          </p>

          <h2 data-en="Children" data-ar="الأطفال">Children</h2>
          <p data-en="This publication is written for adults and is not directed at children. We do not knowingly collect data from anyone under 18." data-ar="هذه المجلة مكتوبة للبالغين وليست موجهة للأطفال. لا نجمع عن قصد بيانات من هم دون الثامنة عشرة.">
            This publication is written for adults and is not directed at children. We do not
            knowingly collect data from anyone under 18.
          </p>

          <h2 data-en="Changes" data-ar="التغييرات">Changes</h2>
          <p data-en="If we change how we handle your data, we will change this page and move the date at the top. Material changes to the newsletter will be told to subscribers directly." data-ar="إذا غيّرنا طريقة تعاملنا مع بياناتك، سنغيّر هذه الصفحة ونحدّث التاريخ في أعلاها. أما التغييرات الجوهرية المتعلقة بالنشرة فسنبلغ المشتركين بها مباشرة.">
            If we change how we handle your data, we will change this page and move the date at
            the top. Material changes to the newsletter will be told to subscribers directly.
          </p>
        </div>
      </section>
    </main>
  );
}

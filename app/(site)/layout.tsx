import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollToTop from "@/components/ScrollToTop";
import PageViewTracker from "@/components/PageViewTracker";
import NewsletterForm from "@/components/NewsletterForm";
import NewsletterPopup from "@/components/NewsletterPopup";
import { getCategories } from "@/lib/categories";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_GRAPH } from "@/lib/site-schema";

// Chrome shared by all public pages. Kept out of the root layout so the root
// doesn't need to read the request pathname (which would force every route into
// dynamic rendering). The admin section has its own layout with no chrome.
// getCategories() is a file/KV read only (no headers()/cookies()), so this
// stays static/ISR like every other public page.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <>
      {/* Publisher identity for every public page. Mounted here rather than in
          the root layout because the root also wraps /admin, which has no
          business advertising structured data. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(SITE_GRAPH) }} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header categories={categories} />
      {children}

      {/* Grand newsletter panel closing every public page. The id is the anchor
          target for the "Sign up free" CTA on /subscribe, which deliberately
          carries no form of its own rather than competing with this one. */}
      <section className="section container" id="newsletter">
        <div className="newsletter-strip nl-grand reveal">
          <div>
            <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
            <h2 data-en="Get Saudi Arabia in your inbox." data-ar="احصل على أخبار السعودية في صندوقك.">Get Saudi Arabia in your inbox.</h2>
            <p className="deck" data-en="The morning read for people following Saudi Arabia's culture, cities, and ideas. Free, every weekday." data-ar="القراءة الصباحية لمتابعي ثقافة السعودية ومدنها وأفكارها. مجاني، كل يوم عمل.">
              The morning read for people following Saudi Arabia&apos;s culture, cities, and ideas. Free, every weekday.
            </p>
          </div>
          <NewsletterForm />
          <p className="newsletter-success" data-en="You&rsquo;re in. See you tomorrow." data-ar="أنت معنا. إلى اللقاء غداً.">
            You&rsquo;re in. See you tomorrow.
          </p>
          <p className="newsletter-error" data-en="Something went wrong — please try again." data-ar="حدث خطأ ما — يرجى المحاولة مرة أخرى.">
            Something went wrong — please try again.
          </p>
        </div>
      </section>

      <Footer />
      <RevealObserver />
      <ScrollToTop />
      <NewsletterPopup />
      <PageViewTracker />
    </>
  );
}

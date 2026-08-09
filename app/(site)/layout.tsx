import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterForm from "@/components/NewsletterForm";
import NewsletterPopup from "@/components/NewsletterPopup";
import { getCategories } from "@/lib/categories";

// Chrome shared by all public pages. Kept out of the root layout so the root
// doesn't need to read the request pathname (which would force every route into
// dynamic rendering). The admin section has its own layout with no chrome.
// getCategories() is a file/KV read only (no headers()/cookies()), so this
// stays static/ISR like every other public page.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header categories={categories} />
      {children}

      {/* Grand newsletter panel closing every public page */}
      <section className="section container">
        <div className="newsletter-strip nl-grand reveal">
          <div>
            <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
            <h2 data-en="Get the Gulf in your inbox." data-ar="احصل على أخبار الخليج في صندوقك.">Get the Gulf in your inbox.</h2>
            <p className="deck" data-en="The morning read for people following the region's culture, cities, and ideas. Free, every weekday." data-ar="القراءة الصباحية لمتابعي ثقافة المنطقة ومدنها وأفكارها. مجاني، كل يوم عمل.">
              The morning read for people following the region&apos;s culture, cities, and ideas. Free, every weekday.
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
    </>
  );
}

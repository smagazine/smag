import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollToTop from "@/components/ScrollToTop";

// Chrome shared by all public pages. Kept out of the root layout so the root
// doesn't need to read the request pathname (which would force every route into
// dynamic rendering). The admin section has its own layout with no chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
      <RevealObserver />
      <ScrollToTop />
    </>
  );
}

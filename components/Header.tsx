"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { href: "/headlines", en: "Headlines", ar: "الأخبار" },
  { href: "/f-and-b", en: "F&B", ar: "طعام وشراب" },
  { href: "/events", en: "Events", ar: "الفعاليات" },
  { href: "/interviews", en: "Interviews", ar: "مقابلات" },
  { href: "/sports", en: "Sports", ar: "الرياضة" },
  { href: "/search", en: "Archive", ar: "الأرشيف" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuFirstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
      setTimeout(() => menuFirstRef.current?.focus(), 80);
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      document.body.classList.add("search-open");
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      document.body.classList.remove("search-open");
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchInputRef.current?.value.trim() ?? "";
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setSearchOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="topbar">
            <div className="nav-left">
              <button
                className="menu-trigger"
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <button
                className="search-trigger"
                type="button"
                aria-label="Open search"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen(true)}
              >
                <span className="material-symbols-outlined">search</span>
                <span data-en="Search" data-ar="بحث">Search</span>
              </button>
            </div>
            <Link className="brand" href="/">
              SAUDI <em className="brand-mag">MAG</em>
            </Link>
            <div className="nav-actions">
              <button
                className="dark-toggle"
                type="button"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
              >
                <span className="material-symbols-outlined">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button className="language-toggle" type="button" onClick={toggleLang} aria-label={`Switch to ${lang === "en" ? "Arabic" : "English"}`}>
                <span style={{ color: lang === "en" ? "var(--color-gold)" : "rgba(255,255,255,0.4)" }}>EN</span>
                <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 3px" }}>/</span>
                <span style={{ color: lang === "ar" ? "var(--color-gold)" : "rgba(255,255,255,0.4)" }}>AR</span>
              </button>
              <Link className="button" href="/subscribe" data-en="Subscribe" data-ar="اشترك">
                Subscribe
              </Link>
            </div>
          </div>

          <nav className="site-nav" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "active" : undefined}
                data-en={link.en}
                data-ar={link.ar}
              >
                {link.en}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mobile-panel" aria-hidden={!menuOpen}>
        <div className="mobile-sheet">
          <button
            className="icon-button"
            type="button"
            aria-label="Close menu"
            ref={menuFirstRef}
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : undefined} data-en={link.en} data-ar={link.ar}>
                {link.en}
              </Link>
            ))}
            <Link href="/search" className={pathname === "/search" ? "active" : undefined} data-en="Archive" data-ar="الأرشيف">Archive</Link>
            <Link href="/subscribe" className={pathname === "/subscribe" ? "active" : undefined} data-en="Subscribe" data-ar="اشترك">Subscribe</Link>
            <Link href="/about" className={pathname === "/about" ? "active" : undefined} data-en="About" data-ar="عن المجلة">About</Link>
            <Link href="/contact" className={pathname === "/contact" ? "active" : undefined} data-en="Contact" data-ar="تواصل">Contact</Link>
          </nav>
          <Link className="button" href="/subscribe" style={{ marginTop: 28, width: "100%", justifyContent: "center" }} data-en="Subscribe" data-ar="اشترك">
            Subscribe
          </Link>
        </div>
      </div>

      <div className="search-overlay" role="dialog" aria-modal={true} aria-label="Search">
        <button
          className="icon-button overlay-close"
          type="button"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <form className="search-dialog search-field" onSubmit={handleSearchSubmit}>
          <span className="material-symbols-outlined">search</span>
          <input ref={searchInputRef} type="search" placeholder="Search the archive..." data-placeholder-en="Search the archive..." data-placeholder-ar="ابحث في الأرشيف..." />
        </form>
      </div>
    </>
  );
}

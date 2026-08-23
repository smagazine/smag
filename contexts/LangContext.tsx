"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LANG_KEY = "saudi-mag-lang";
type Lang = "en" | "ar";
type LangCtx = { lang: Lang; toggle: () => void; t: (en: string, ar: string) => string };

const LangContext = createContext<LangCtx>({ lang: "ar", toggle: () => {}, t: (_en, ar) => ar });

function applyLang(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // Swap text content on leaf nodes
  document.querySelectorAll<HTMLElement>("[data-en][data-ar]").forEach((el) => {
    if (!el.querySelector("*")) {
      el.textContent = lang === "ar" ? (el.dataset.ar ?? "") : (el.dataset.en ?? "");
    }
  });

  // Swap input placeholders
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "[data-placeholder-ar]"
  ).forEach((el) => {
    el.placeholder =
      lang === "ar"
        ? (el.dataset.placeholderAr ?? el.placeholder)
        : (el.dataset.placeholderEn ?? el.placeholder);
  });

  // Swap aria-labels
  document.querySelectorAll<HTMLElement>("[data-label-ar]").forEach((el) => {
    el.setAttribute(
      "aria-label",
      lang === "ar" ? (el.dataset.labelAr ?? "") : (el.dataset.labelEn ?? "")
    );
  });
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Arabic is the default (matches the lang/dir SSR'd on <html> in
  // app/layout.tsx) — only a visitor who's explicitly switched to English
  // before should start there instead.
  const [lang, setLang] = useState<Lang>("ar");
  const pathname = usePathname();

  // Restore persisted language on mount. Reads localStorage/DOM, both
  // unavailable at render time (SSR) — this can't be computed without an effect.
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang("en");
      applyLang("en");
    }
  }, []);

  // Re-apply on lang change
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  // Re-apply on route change, and keep watching for dynamically-added nodes
  // (client-rendered content that mounts after navigation) so they get
  // translated too. We disconnect the observer while applyLang runs — its own
  // textContent writes would otherwise be re-observed (observer callbacks are
  // async microtasks, so a synchronous flag can't guard them) and loop forever.
  useEffect(() => {
    const observer = new MutationObserver((records) => {
      // Only react when elements are actually added to the tree, not to the
      // characterData/childList churn applyLang itself produces.
      const addedNodes = records.some((r) => r.addedNodes.length > 0);
      if (!addedNodes) return;
      observer.disconnect();
      applyLang(lang);
      observer.observe(document.body, { childList: true, subtree: true });
    });

    applyLang(lang);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang, pathname]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const t = (en: string, ar: string) => (lang === "en" ? en : ar);

  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

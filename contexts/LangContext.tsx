"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ar";
type LangCtx = { lang: Lang; toggle: () => void; t: (en: string, ar: string) => string };
const LangContext = createContext<LangCtx>({ lang: "en", toggle: () => {}, t: (en) => en });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      if (!el.querySelector("*")) {
        const htmlEl = el as HTMLElement;
        htmlEl.textContent = lang === "ar" ? (htmlEl.dataset.ar ?? "") : (htmlEl.dataset.en ?? "");
      }
    });
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const t = (en: string, ar: string) => (lang === "en" ? en : ar);

  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

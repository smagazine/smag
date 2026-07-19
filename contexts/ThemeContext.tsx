"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DARK_KEY = "saudi-mag-dark-mode";

type ThemeCtx = { isDark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Restoring persisted state from localStorage/DOM, both unavailable at
    // render time (SSR) — this can't be computed without an effect.
    const saved = localStorage.getItem(DARK_KEY) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(saved);
    document.documentElement.dataset.theme = saved ? "dark" : "";
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.dataset.theme = next ? "dark" : "";
      localStorage.setItem(DARK_KEY, next ? "1" : "0");
      return next;
    });
  };

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

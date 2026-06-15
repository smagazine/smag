"use client";
import { useEffect } from "react";

export default function ReadingProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".reading-progress");
    if (!bar) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0;
      bar.style.setProperty("--progress", `${pct}%`);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}

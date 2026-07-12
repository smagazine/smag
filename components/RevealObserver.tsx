"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }
    html.classList.add("reveal-enabled");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Content rendered after mount (client-side fetches, Suspense) would
    // otherwise never be observed and stay hidden at opacity 0. Watching for
    // added .reveal nodes is safe here: observe() does not mutate the DOM, so
    // this cannot loop the way a self-triggering MutationObserver would.
    const mutations = new MutationObserver((records) => {
      records.forEach((r) => {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".reveal:not(.in-view)")) observer.observe(node);
          node.querySelectorAll(".reveal:not(.in-view)").forEach((el) => observer.observe(el));
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}

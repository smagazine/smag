"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ARTICLE_RE = /^\/article\/([^/]+)\/?$/;

/** Fires a best-effort pageview beacon on mount and on every client-side
    route change, feeding the admin dashboard's analytics. No cookies, no
    visitor identity — just an aggregate counter (lib/analytics.ts). */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(ARTICLE_RE);
    const slug = match ? match[1] : undefined;
    const body = JSON.stringify(slug ? { slug } : {});

    const sent = navigator.sendBeacon?.(
      "/api/analytics/view",
      new Blob([body], { type: "application/json" })
    );
    if (!sent) {
      fetch("/api/analytics/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}

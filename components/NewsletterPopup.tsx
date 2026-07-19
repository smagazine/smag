"use client";
import { useEffect, useRef, useState } from "react";
import NewsletterForm from "@/components/NewsletterForm";

const KEY = "saudi-mag-nl-popup";
const DELAY_MS = 5000;
const SNOOZE_DAYS = 7;

/**
 * Daily Briefing subscribe popup, shown once shortly after arriving.
 * Dismissing snoozes it for a week; subscribing silences it for good
 * (NewsletterForm sets data-sent on the .newsletter-strip wrapper, which we
 * watch to persist the "subscribed" state).
 */
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "subscribed") return;
      if (raw && Date.now() - Number(raw) < SNOOZE_DAYS * 86400_000) return;
    } catch {
      /* storage unavailable — show anyway */
    }
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("nl-popup-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);

    // Persist "subscribed" when NewsletterForm flips data-sent on the card.
    const card = cardRef.current;
    const observer = new MutationObserver(() => {
      if (card?.getAttribute("data-sent")) {
        try { localStorage.setItem(KEY, "subscribed"); } catch { /* ignore */ }
        setTimeout(() => setOpen(false), 1800);
      }
    });
    if (card) observer.observe(card, { attributes: true, attributeFilter: ["data-sent"] });

    return () => {
      document.body.classList.remove("nl-popup-open");
      document.removeEventListener("keydown", onKey);
      observer.disconnect();
    };
  }, [open]);

  function dismiss() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="nl-popup-overlay" onClick={dismiss}>
      <div
        ref={cardRef}
        className="newsletter-strip nl-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe to the Daily Briefing"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="nl-popup-close"
          aria-label="Close"
          data-label-en="Close"
          data-label-ar="إغلاق"
          onClick={dismiss}
        >
          ✕
        </button>
        <span className="label eyebrow" data-en="Daily Briefing" data-ar="النشرة اليومية">Daily Briefing</span>
        <h2 data-en="Get the Gulf in your inbox." data-ar="احصل على أخبار الخليج في صندوقك.">Get the Gulf in your inbox.</h2>
        <p className="nl-popup-deck" data-en="The morning read for people following the region's culture, cities, and ideas. Free, every weekday." data-ar="القراءة الصباحية لمتابعي ثقافة المنطقة ومدنها وأفكارها. مجاني، كل يوم عمل.">
          The morning read for people following the region&apos;s culture, cities, and ideas. Free, every weekday.
        </p>
        <NewsletterForm />
        <p className="newsletter-success" data-en="You&rsquo;re in. See you tomorrow." data-ar="أنت معنا. إلى اللقاء غداً.">You&rsquo;re in. See you tomorrow.</p>
        <p className="newsletter-error" data-en="Something went wrong — please try again." data-ar="حدث خطأ ما — يرجى المحاولة مرة أخرى.">Something went wrong — please try again.</p>
      </div>
    </div>
  );
}

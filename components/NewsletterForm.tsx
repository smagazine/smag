"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector("input") as HTMLInputElement;
    const email = input.value.trim();
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      input.value = "";
      (form.closest(".newsletter-strip") as HTMLElement)?.setAttribute("data-sent", "true");
    } catch {
      (form.closest(".newsletter-strip") as HTMLElement)?.setAttribute("data-error", "true");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="Your email address"
        data-placeholder-en="Your email address"
        data-placeholder-ar="عنوان بريدك الإلكتروني"
        aria-label="Email address for newsletter"
        data-label-en="Email address for newsletter"
        data-label-ar="البريد الإلكتروني للنشرة"
      />
      <button className="button" type="submit" disabled={busy} data-en="Subscribe free" data-ar="اشترك مجاناً">
        Subscribe free
      </button>
    </form>
  );
}

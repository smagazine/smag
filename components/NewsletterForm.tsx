"use client";

export default function NewsletterForm() {
  return (
    <form
      className="newsletter-form"
      onSubmit={(e) => {
        e.preventDefault();
        (e.currentTarget.querySelector("input") as HTMLInputElement).value = "";
        (e.currentTarget.closest(".newsletter-strip") as HTMLElement)?.setAttribute("data-sent", "true");
      }}
    >
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
      <button className="button" type="submit" data-en="Subscribe free" data-ar="اشترك مجاناً">
        Subscribe free
      </button>
    </form>
  );
}

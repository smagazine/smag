"use client";
import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      type: (form.elements.namedItem("type") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      requestedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(
        localStorage.getItem("saudi-magazine-contact-requests") || "[]"
      );
      existing.push(data);
      localStorage.setItem("saudi-magazine-contact-requests", JSON.stringify(existing));
    } catch {}
    form.reset();
    setSubmitted(true);
  };

  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="about-contact">
          <div className="reveal">
            <span className="label eyebrow">Contact</span>
            <h1>Editorial, partnerships, and membership inquiries.</h1>
            <p className="deck">
              Use this demo form for editorial pitches, partnership requests, membership support,
              and advertising conversations.
            </p>
            <div className="contact-detail">
              <p>
                <span className="meta">Editorial</span>
                <br />
                editorial@saudimagazine.example
              </p>
              <p className="mt-md">
                <span className="meta">Partnerships</span>
                <br />
                partnerships@saudimagazine.example
              </p>
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <label>
              <span className="form-label">Name</span>
              <input required type="text" name="name" autoComplete="name" />
            </label>
            <label>
              <span className="form-label">Email</span>
              <input required type="email" name="email" autoComplete="email" />
            </label>
            <label>
              <span className="form-label">Inquiry Type</span>
              <input type="text" name="type" placeholder="Editorial, membership, advertising" />
            </label>
            <label>
              <span className="form-label">Message</span>
              <textarea name="message" rows={6} />
            </label>
            <button className="button" type="submit">
              Send inquiry
            </button>
            {submitted && (
              <p className="form-success">
                Thank you. Your inquiry has been received by the editorial desk.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

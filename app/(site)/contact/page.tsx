"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      type: (form.elements.namedItem("type") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="about-contact">
          <div className="reveal">
            <span className="label eyebrow" data-en="Contact" data-ar="تواصل معنا">Contact</span>
            <h1 data-en="Editorial, partnerships, and membership inquiries." data-ar="استفسارات التحرير والشراكات والعضوية.">Editorial, partnerships, and membership inquiries.</h1>
            <p className="deck" data-en="Use this demo form for editorial pitches, partnership requests, membership support, and advertising conversations." data-ar="استخدم هذا النموذج التجريبي لمقترحات التحرير وطلبات الشراكة ودعم العضوية والمحادثات الإعلانية.">
              Use this demo form for editorial pitches, partnership requests, membership support,
              and advertising conversations.
            </p>
            <div className="contact-detail">
              <p>
                <span className="meta" data-en="Editorial" data-ar="التحرير">Editorial</span>
                <br />
                editorial@saudimagazine.example
              </p>
              <p className="mt-md">
                <span className="meta" data-en="Partnerships" data-ar="الشراكات">Partnerships</span>
                <br />
                partnerships@saudimagazine.example
              </p>
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <label>
              <span className="form-label" data-en="Name" data-ar="الاسم">Name</span>
              <input required type="text" name="name" autoComplete="name"
                placeholder="Your name"
                data-placeholder-en="Your name"
                data-placeholder-ar="اسمك"
              />
            </label>
            <label>
              <span className="form-label" data-en="Email" data-ar="البريد الإلكتروني">Email</span>
              <input required type="email" name="email" autoComplete="email"
                placeholder="your@email.com"
                data-placeholder-en="your@email.com"
                data-placeholder-ar="بريدك@الإلكتروني.com"
              />
            </label>
            <label>
              <span className="form-label" data-en="Inquiry Type" data-ar="نوع الاستفسار">Inquiry Type</span>
              <input type="text" name="type"
                placeholder="Editorial, membership, advertising"
                data-placeholder-en="Editorial, membership, advertising"
                data-placeholder-ar="تحرير، عضوية، إعلان"
              />
            </label>
            <label>
              <span className="form-label" data-en="Message" data-ar="الرسالة">Message</span>
              <textarea name="message" rows={6}
                placeholder="Your message..."
                data-placeholder-en="Your message..."
                data-placeholder-ar="رسالتك..."
              />
            </label>
            <button className="button" type="submit" data-en="Send inquiry" data-ar="إرسال الاستفسار">
              Send inquiry
            </button>
            {submitted && (
              <p className="form-success" data-en="Thank you. Your inquiry has been received by the editorial desk." data-ar="شكراً لك. تم استلام استفسارك من قِبل مكتب التحرير.">
                Thank you. Your inquiry has been received by the editorial desk.
              </p>
            )}
            {error && (
              <p className="form-success" style={{ color: "#c0392b" }} data-en="Something went wrong. Please check your details and try again." data-ar="حدث خطأ ما. يرجى التحقق من بياناتك والمحاولة مرة أخرى.">
                Something went wrong. Please check your details and try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

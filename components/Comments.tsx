"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LangContext";

interface Comment {
  id: string;
  name: string;
  body: string;
  createdAt: string;
}

export default function Comments({ slug }: { slug: string }) {
  const { t } = useLang();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((d) => {
        if (!cancelled) setComments(Array.isArray(d.comments) ? d.comments : []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, email, body }),
      });
      if (!res.ok) throw new Error();
      setName("");
      setEmail("");
      setBody("");
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="comments-section reveal" id="comments">
      <h2 data-en="Comments" data-ar="التعليقات">Comments</h2>

      {!loading && comments.length > 0 && (
        <ul className="comments-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-avatar" aria-hidden="true">
                {c.name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="comment-body">
                <div className="comment-meta">
                  <span className="comment-name">{c.name}</span>
                  <span className="comment-date">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="contact-form comment-form" onSubmit={handleSubmit}>
        <label>
          <span className="form-label" data-en="Comment" data-ar="التعليق">Comment</span>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={2000}
            placeholder={t("Add to the conversation…", "أضف إلى النقاش…")}
          />
        </label>
        <label>
          <span className="form-label" data-en="Name" data-ar="الاسم">Name</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
          />
        </label>
        <label>
          <span className="form-label" data-en="Email" data-ar="البريد الإلكتروني">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <button className="button" type="submit" disabled={submitting}>
          {t(submitting ? "Posting…" : "Post Comment", submitting ? "جارٍ النشر…" : "نشر التعليق")}
        </button>
        {status === "sent" && (
          <p className="form-success" data-en="Thanks — your comment has been submitted and will appear once reviewed." data-ar="شكراً — تم إرسال تعليقك وسيظهر بعد المراجعة.">
            Thanks — your comment has been submitted and will appear once reviewed.
          </p>
        )}
        {status === "error" && (
          <p className="form-success" style={{ color: "#c0392b" }} data-en="Something went wrong. Please try again." data-ar="حدث خطأ ما. يرجى المحاولة مرة أخرى.">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | SAUDI MAG",
  description: "The page you are looking for could not be found. Return to SAUDI MAG.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="page" id="main-content">
      <section
        className="section container"
        style={{ minHeight: "60svh", display: "grid", alignContent: "center", textAlign: "center" }}
      >
        <div>
          <span className="label eyebrow" style={{ color: "var(--color-gold)" }}>
            404
          </span>
          <h1 style={{ marginTop: "20px", fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            Page not found.
          </h1>
          <p
            className="deck"
            style={{ maxWidth: "560px", margin: "24px auto 0" }}
          >
            The page you were looking for has moved, been removed, or may never have existed. Try
            browsing the archive or returning home.
          </p>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "38px",
            }}
          >
            <Link className="button" href="/">
              Return home
            </Link>
            <Link className="button secondary" href="/search">
              Browse archive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

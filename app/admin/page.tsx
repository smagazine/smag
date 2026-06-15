import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | SAUDI MAG",
  description: "Editorial admin workspace.",
};

export default function AdminPage() {
  return (
    <main className="page" id="main-content">
      <section
        className="section container"
        style={{ minHeight: "60svh", display: "grid", alignContent: "center", textAlign: "center" }}
      >
        <div>
          <span className="label eyebrow" style={{ color: "var(--color-gold)" }}>Admin</span>
          <h1 style={{ marginTop: "20px" }}>Editorial Workspace</h1>
          <p className="deck" style={{ maxWidth: "520px", margin: "20px auto 0" }}>
            The admin panel is available in the original HTML demo. This Next.js build focuses on
            the reader-facing editorial experience.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "36px" }}>
            <Link className="button" href="/">Return home</Link>
            <Link className="button secondary" href="/search">Browse archive</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

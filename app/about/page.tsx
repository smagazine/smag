import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SAUDI MAG",
  description:
    "SAUDI MAG is an editorial platform covering Gulf culture, architecture, business, hospitality, and design from the region's perspective.",
};

export default function AboutPage() {
  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="about-contact">
          <div className="reveal">
            <span className="label eyebrow">About the Magazine</span>
            <h1>An original editorial lens on the Gulf&apos;s cultural moment.</h1>
            <p className="deck">
              SAUDI MAG is a polished digital magazine demo inspired by contemporary Gulf-region
              publishing: image-led, useful, warm, and focused on architecture, culture, business,
              hospitality, and design.
            </p>
            <p className="deck">
              The demo brings the existing screens into one coherent experience with shared
              navigation, consistent typography, elegant spacing, responsive behavior, and subtle
              editorial interactions.
            </p>
          </div>
          <aside className="reveal border-top-sm">
            <span className="label eyebrow">Editorial Pillars</span>
            <div className="issue-list gap-sm mt-sm-top">
              <p>
                <strong>Culture</strong>
                <br />
                Art, performance, heritage, and creative voices.
              </p>
              <p>
                <strong>Design</strong>
                <br />
                Architecture, interiors, and future civic space.
              </p>
              <p>
                <strong>Living</strong>
                <br />
                Hospitality, dining, travel, and considered daily culture.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="feature-band reveal">
        <div className="image-frame">
          <img
            src="https://picsum.photos/seed/saudimag-about/1400/800"
            alt="SAUDI MAG editorial studio"
            loading="lazy"
          />
        </div>
        <div className="feature-band-copy">
          <span className="label eyebrow">Design System</span>
          <h2>Bold Editorial, Built for Screens</h2>
          <p className="deck">
            Characterful headlines, compact news modules, thin dividers, clean white surfaces, black
            headers, and lime green accents create a distinct magazine identity.
          </p>
        </div>
      </section>
    </main>
  );
}

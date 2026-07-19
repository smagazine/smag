import type { Metadata } from "next";
import { Newsreader, Jost, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

// Brand sheet specifies Korto (commercial); Jost is the free geometric
// stand-in until licensed font files are added.
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-brand",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-cairo",
});

// Self-hosted (was a classic <link> to Google Fonts) so it's covered by
// next/font's optimization and doesn't need a font-src CSP exception.
const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  display: "swap",
  weight: "300 500",
  variable: "--font-material-symbols",
});
// S. monogram from the brand sheet: bold white S on black, lime dot.
const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='%23000'/><text x='29' y='46' font-size='40' font-weight='bold' text-anchor='middle' fill='%23fff' font-family='Arial,sans-serif'>S</text><circle cx='48' cy='44' r='6' fill='%23a5ce39'/></svg>";

const SITE_URL = "https://saudimag.com";
const SITE_OG_IMAGE = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  title: {
    default: "SAUDI MAG | Gulf Culture & Ideas",
    template: "%s | SAUDI MAG",
  },
  description:
    "An independent editorial platform covering Gulf culture, cities, architecture, business, design, and contemporary life.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "SAUDI MAG",
    title: "SAUDI MAG | Gulf Culture & Ideas",
    description:
      "An independent editorial platform covering Gulf culture, cities, architecture, business, design, and contemporary life.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "SAUDI MAG — Gulf Culture & Ideas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAUDI MAG | Gulf Culture & Ideas",
    description:
      "An independent editorial platform covering Gulf culture, cities, architecture, business, design, and contemporary life.",
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${newsreader.variable} ${jost.variable} ${cairo.variable} ${materialSymbols.variable}`}
    >
      <head>
        {/* Apply saved theme + language before first paint to avoid a
            light/LTR flash for dark-mode / Arabic users. Keep the storage keys
            in sync with ThemeContext (saudi-mag-dark-mode) and LangContext
            (saudi-mag-lang). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;if(localStorage.getItem('saudi-mag-dark-mode')==='1')d.dataset.theme='dark';if(localStorage.getItem('saudi-mag-lang')==='ar'){d.lang='ar';d.dir='rtl';}}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href={FAVICON} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

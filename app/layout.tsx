import type { Metadata } from "next";
import { Newsreader, Jost, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { SITE_URL } from "@/lib/site";

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
const SITE_OG_IMAGE = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  title: {
    default: "SAUDI MAG | Saudi Culture & Ideas",
    template: "%s | SAUDI MAG",
  },
  description:
    "An independent editorial platform covering Saudi culture, cities, architecture, business, design, and contemporary life.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "SAUDI MAG",
    title: "SAUDI MAG | Saudi Culture & Ideas",
    description:
      "An independent editorial platform covering Saudi culture, cities, architecture, business, design, and contemporary life.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "SAUDI MAG — Saudi Culture & Ideas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAUDI MAG | Saudi Culture & Ideas",
    description:
      "An independent editorial platform covering Saudi culture, cities, architecture, business, design, and contemporary life.",
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${newsreader.variable} ${jost.variable} ${cairo.variable} ${materialSymbols.variable}`}
    >
      <head>
        {/* Apply saved theme + language before first paint to avoid a
            flash of the wrong mode. Arabic/RTL is the default (matches the
            lang/dir set on <html> above); this only needs to override back
            to English for a visitor who's explicitly switched to it. Keep
            the storage keys in sync with ThemeContext (saudi-mag-dark-mode)
            and LangContext (saudi-mag-lang). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;if(localStorage.getItem('saudi-mag-dark-mode')==='1')d.dataset.theme='dark';if(localStorage.getItem('saudi-mag-lang')==='en'){d.lang='en';d.dir='ltr';}}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

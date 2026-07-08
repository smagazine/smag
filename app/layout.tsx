import type { Metadata } from "next";
import { Newsreader, Sora, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-cairo",
});
const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23000'/><rect x='2' y='2' width='60' height='60' fill='none' stroke='%23a6d61f' stroke-width='3'/><text x='32' y='44' font-size='34' font-weight='bold' text-anchor='middle' fill='%23a6d61f' font-family='Arial,sans-serif'>S</text></svg>";

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
    <html lang="en" dir="ltr" className={`${newsreader.variable} ${sora.variable} ${cairo.variable}`}>
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300..500,0&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23000'/><rect x='2' y='2' width='60' height='60' fill='none' stroke='%23a6d61f' stroke-width='3'/><text x='32' y='44' font-size='34' font-weight='bold' text-anchor='middle' fill='%23a6d61f' font-family='Arial,sans-serif'>S</text></svg>";

export const metadata: Metadata = {
  title: "SAUDI MAG | Gulf Culture & Ideas",
  description:
    "An independent editorial platform covering Gulf culture, cities, architecture, business, design, and contemporary life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href={FAVICON} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300..800;1,300..800&family=Sora:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300..500,0&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            <Header />
            {children}
            <Footer />
            <RevealObserver />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

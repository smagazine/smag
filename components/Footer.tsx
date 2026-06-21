import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Link className="footer-brand" href="/">
          SAUDI <em className="brand-mag">MAG</em>
        </Link>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/about" data-en="About" data-ar="عن المجلة">About</Link>
          <Link href="/search" data-en="Archives" data-ar="الأرشيف">Archives</Link>
          <Link href="/contact" data-en="Contact" data-ar="تواصل">Contact</Link>
          <Link href="/subscribe" data-en="Membership" data-ar="العضوية">Membership</Link>
          <Link href="/culture" data-en="Culture" data-ar="الثقافة">Culture</Link>
        </nav>
        <div className="footer-social">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://x.com" aria-label="X / Twitter" target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <nav className="footer-legal" aria-label="Legal">
          <Link href="/about" data-en="Privacy Policy" data-ar="سياسة الخصوصية">Privacy Policy</Link>
          <Link href="/about" data-en="Terms of Use" data-ar="شروط الاستخدام">Terms of Use</Link>
        </nav>
        <p
          className="copyright meta"
          data-en="© 2026 SAUDI MAG. All rights reserved."
          data-ar="© 2026 المجلة السعودية. جميع الحقوق محفوظة."
        >
          © 2026 SAUDI MAG. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

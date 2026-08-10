import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Link className="footer-brand" href="/" aria-label="SAUDI MAG home">
          <span className="brand-word">SAUDI<span className="brand-dot">.</span></span>
          <span className="brand-mag">MAG</span>
        </Link>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/about" data-en="About" data-ar="عن المجلة">About</Link>
          <Link href="/search" data-en="Archives" data-ar="الأرشيف">Archives</Link>
          <Link href="/contact" data-en="Contact" data-ar="تواصل">Contact</Link>
          <Link href="/subscribe" data-en="Membership" data-ar="العضوية">Membership</Link>
          <Link href="/culture" data-en="Culture" data-ar="الثقافة">Culture</Link>
        </nav>
        <SocialLinks className="footer-social" />
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

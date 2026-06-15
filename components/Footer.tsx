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
          <Link href="/contact" aria-label="Instagram">
            <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
          </Link>
          <Link href="/contact" aria-label="X / Twitter">
            <span className="material-symbols-outlined" aria-hidden="true">alternate_email</span>
          </Link>
          <Link href="/contact" aria-label="LinkedIn">
            <span className="material-symbols-outlined" aria-hidden="true">work</span>
          </Link>
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

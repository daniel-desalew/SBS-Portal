import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '../../lib/utils';

export function Footer({ locale }: { locale: 'en' | 'am' | 'om' }) {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <section className="footer-about">
            <Link className="footer-brand" href={localePath(locale)} aria-label="Special Boarding Schools Portal home">
              <Image className="footer-emblem" src="/ministry-logo.png" alt="" width={86} height={80} />
              <span><span className="footer-brand-kicker">FDRE</span>Special Boarding Schools<br />Portal</span>
            </Link>
            <p>
              FDRE Ministry of Education is a Governmental Organization Headquartered in
              Arada sub-city, Addis Ababa, Ethiopia
            </p>
            <div className="footer-socials" aria-label="Social media">
              <span className="social-icon facebook" aria-hidden="true">f</span>
              <span className="social-icon telegram" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="m21.7 4.3-3.2 15.1c-.2 1.1-.9 1.3-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.9 12.9 1 11.4c-1.1-.3-1.1-1.1.2-1.6l19-7.3c.9-.3 1.7.2 1.5 1.8Z" /></svg>
              </span>
              <span className="social-icon youtube" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.8 15.4V8.6l5.9 3.4-5.9 3.4Z" /></svg>
              </span>
              <span className="social-icon x-social" aria-hidden="true">𝕏</span>
              <span className="social-icon linkedin" aria-hidden="true">in</span>
            </div>
          </section>
          <nav className="footer-links" aria-label="Menu">
            <h2>Menu</h2>
            <Link href={localePath(locale)}>Home</Link>
            <Link href={localePath(locale, '/admissions/apply')}>Apply Now</Link>
            <Link href={localePath(locale, '/about')}>About Us</Link>
            <Link href={localePath(locale, '/admissions/guide')}>Admission Guide</Link>
            <Link href={localePath(locale, '/resources')}>Resources</Link>
          </nav>
          <nav className="footer-links" aria-label="Useful links">
            <h2>Useful Links</h2>
            <Link href={localePath(locale, '/programs')}>Academic Programs</Link>
            <Link href={localePath(locale, '/meals-nutrition')}>Meals and Nutrition</Link>
            <Link href={localePath(locale, '/gallery')}>Gallery</Link>
            <Link href={localePath(locale, '/faq')}>FAQ</Link>
            <Link href={localePath(locale, '/news')}>News &amp; Updates</Link>
          </nav>
          <section className="footer-contact">
            <h2>Contact Us</h2>
            <p>
              We value your input and want to hear from you. If you have any questions or
              feedback about our services, please contact us.
            </p>
            <h3>Working Hours</h3>
            <p className="footer-detail">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              <span>Monday to Friday<br />8 AM - 5:30 PM</span>
            </p>
            <p className="footer-detail">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Addis Ababa, Ethiopia</span>
            </p>
          </section>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} FDRE Ministry of Education</div>
      </footer>
    </>
  );
}
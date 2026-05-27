import Link from 'next/link';

const OFFICES = [
  { label: 'Berlin (LEA)', href: '/office/berlin-auslaenderbehoerde' },
  { label: 'Munich (KVR)', href: '/office/munich-kvu' },
  { label: 'Hamburg', href: '/office/hamburg-einwanderungsbehoerde' },
  { label: 'Frankfurt', href: '/waiting-times/frankfurt' },
  { label: 'Cologne', href: '/waiting-times/cologne' },
];

const STATES = [
  { label: 'Berlin', href: '/hardest-offices/berlin' },
  { label: 'Bavaria', href: '/hardest-offices/bavaria' },
  { label: 'Hamburg', href: '/hardest-offices/hamburg' },
  { label: 'NRW', href: '/hardest-offices/nrw' },
  { label: 'Hessen', href: '/hardest-offices/hessen' },
];

const SITE_LINKS = [
  { label: 'About GermanySolved', href: '/about' },
  { label: 'Affiliate Partners', href: '/affiliate' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Sitemap', href: '/sitemap.xml' },
  { label: 'Submit a Report', href: '/report' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              Germany<span>Solved</span>
            </Link>
            <p className="footer-brand-text">
              A crowdsourced database helping foreigners navigate German immigration
              bureaucracy. Real experiences from real people — submitted anonymously,
              verified by the community.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Offices</div>
            <ul className="footer-links">
              {OFFICES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">By State</div>
            <ul className="footer-links">
              {STATES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Site</div>
            <ul className="footer-links">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclosure">
            <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Affiliate Disclosure:</strong>{' '}
            GermanySolved may earn a commission from links to partner services. This does not
            affect the editorial independence of community-submitted reports. We only recommend
            services that are relevant to navigating German immigration.
          </p>
          <p className="footer-copyright">© 2026 GermanySolved</p>
        </div>
      </div>
    </footer>
  );
}

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
              Guides to navigating German immigration bureaucracy. All statistics and
              case reports on this site are sample data for demonstration purposes.
              This site is no longer updated.
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
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 GermanySolved</p>
        </div>
      </div>
    </footer>
  );
}

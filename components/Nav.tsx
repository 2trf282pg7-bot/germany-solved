'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Articles', href: '/articles' },
  { label: 'Offices', href: '/office/berlin-auslaenderbehoerde' },
  { label: 'Waiting Times', href: '/waiting-times/berlin' },
  { label: 'Rejection Reasons', href: '/rejection-reasons/work-visa' },
  { label: 'Cases', href: '/case/DE-101' },
  { label: 'Report', href: '/report' },
];

const LANGUAGES = [
  { code: 'EN', label: 'EN' },
  { code: 'DE', label: 'DE' },
  { code: 'ZH', label: '中文' },
  { code: 'KO', label: '한국어' },
  { code: 'TR', label: 'TR' },
  { code: 'AR', label: 'AR' },
  { code: 'UK', label: 'UK' },
  { code: 'RU', label: 'RU' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const pathname = usePathname();

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Germany<span>Solved</span>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`nav-lang-btn${activeLang === lang.code ? ' active' : ''}`}
                onClick={() => setActiveLang(lang.code)}
                aria-label={`Switch to ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
            <Link href="/report" className="nav-report-btn">
              + Report
            </Link>
            <button
              className={`nav-hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="nav-mobile-langs">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`nav-lang-btn${activeLang === lang.code ? ' active' : ''}`}
              onClick={() => {
                setActiveLang(lang.code);
                setMenuOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

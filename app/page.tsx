import Link from 'next/link';
import UpdateBanner from '@/components/UpdateBanner';
import ReportCounter from '@/components/ReportCounter';
import LatestReports from '@/components/LatestReports';
import ReportForm from '@/components/ReportForm';
import reportsData from '@/data/reports.json';
import affiliatesData from '@/data/affiliates.json';
import type { Report } from '@/components/LatestReports';

const ARTICLES = [
  {
    slug: 'how-to-book-berlin-auslaenderbehoerde',
    category: 'Office Guide',
    title: 'How to Book an Appointment at Berlin Ausländerbehörde',
    description:
      'Step-by-step guide to navigating the LEA Berlin online booking system, including tips for snagging cancellation slots.',
    readTime: '6 min',
  },
  {
    slug: 'blue-card-vs-work-visa',
    category: 'Blue Card',
    title: 'Blue Card vs Work Visa: Which Is Right for You?',
    description:
      'Compare salary thresholds, flexibility, and path to permanent residency for both visa types.',
    readTime: '8 min',
  },
  {
    slug: 'common-mistakes-german-visa',
    category: 'Guide',
    title: 'Common Mistakes on German Visa Applications',
    description:
      'The top reasons applications get rejected — and exactly how to avoid them based on 500+ community reports.',
    readTime: '7 min',
  },
  {
    slug: 'munich-kvr-appointment-guide',
    category: 'Office Guide',
    title: 'Munich KVR: What to Expect at Your Appointment',
    description:
      'Community insights on wait times, required documents, and what officers typically ask at Munich KVR.',
    readTime: '5 min',
  },
  {
    slug: 'freelance-visa-document-checklist',
    category: 'Freelance',
    title: 'Freelance Visa Germany: Complete Document Checklist',
    description:
      'Every document you need for a §21 AufenthG application, including the ones offices rarely mention.',
    readTime: '9 min',
  },
  {
    slug: 'settlement-permit-guide',
    category: 'Settlement',
    title: 'Settlement Permit Germany: Who Qualifies and How to Apply',
    description:
      'Eligibility requirements, language test details, and the full process for obtaining an Niederlassungserlaubnis.',
    readTime: '10 min',
  },
];

const PROBLEM_CARDS = [
  {
    number: '01',
    title: 'Language Barrier',
    body: 'Most Ausländerbehörde offices operate entirely in German. Forms, officer interactions, and decision letters arrive in a language many applicants are still learning.',
  },
  {
    number: '02',
    title: 'Opaque Appointment System',
    body: 'Online booking portals are fragmented across 400+ cities, frequently unavailable, and provide no guidance on which appointment type to choose.',
  },
  {
    number: '03',
    title: 'Rejection Without Explanation',
    body: 'Applications get rejected for undocumented reasons — missing a specific salary format, the wrong insurance certificate, or document translations that weren\'t required.',
  },
];

export default function HomePage() {
  const reports = reportsData as Report[];
  const recentReports = [...reports].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const currentMonthReports = reports.filter((r) => r.month === '2026-05').length;

  return (
    <>
      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <span className="trust-item">Anonymous reports</span>
          <span className="trust-item">Real experiences only</span>
          <span className="trust-item">Updated weekly</span>
          <span className="trust-item">All 16 German states</span>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            🇩🇪 Crowdsourced Immigration Intelligence
          </div>
          <h1 className="hero-title">
            Navigate German Immigration —{' '}
            <em>Without the Maze</em>
          </h1>
          <p className="hero-subtitle">
            Real experiences from foreigners who've been through every Ausländerbehörde in
            Germany. Find wait times, understand rejection reasons, and prepare for your
            appointment with confidence.
          </p>
          <div className="hero-actions">
            <Link href="/report" className="btn-primary">
              Submit Your Experience
            </Link>
            <Link href="/waiting-times/berlin" className="btn-secondary">
              Check Wait Times
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">2M+</span>
              <span className="hero-stat-label">Foreigners in Germany</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">16</span>
              <span className="hero-stat-label">Federal states covered</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">400+</span>
              <span className="hero-stat-label">Immigration offices</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">
                {reports.length}
              </span>
              <span className="hero-stat-label">Community reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">The Problem</span>
            <h2 className="section-title">
              German bureaucracy is notoriously difficult — even for Germans
            </h2>
            <p className="section-subtitle">
              For foreigners, three barriers make the process feel impossible without help.
            </p>
          </div>
          <div className="card-grid-3">
            {PROBLEM_CARDS.map((card) => (
              <div key={card.number} className="problem-card">
                <div className="problem-card-number">{card.number}</div>
                <h3 className="problem-card-title">{card.title}</h3>
                <p className="problem-card-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-eyebrow">The Solution</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Collective knowledge beats bureaucratic opacity
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--ink-mid)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                GermanySolved aggregates real experiences from people who've navigated
                the same system you're about to face. Every report makes it easier for
                the next person.
              </p>
              <div className="solution-checklist">
                {[
                  'See which documents each office actually requires',
                  'Know the real wait times, not the official estimates',
                  'Understand why applications get rejected — before yours does',
                  'Learn from 3-page rejection letters (so you don\'t have to write one)',
                  'Find English-speaking resources and legal help',
                ].map((item) => (
                  <div key={item} className="solution-item">
                    <div className="solution-item-check">✓</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <UpdateBanner lastUpdated="May 27, 2026" newReports={3} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  Latest Reports
                </h3>
                <ReportCounter count={currentMonthReports} />
              </div>
              <LatestReports reports={recentReports} />
              <Link
                href="/case/DE-101"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  marginTop: '16px',
                }}
              >
                View all cases →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Guides</span>
            <h2 className="section-title">Everything you need to know</h2>
            <p className="section-subtitle">
              Practical guides written from real community experiences — not generic legal
              advice.
            </p>
          </div>
          <div className="card-grid">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-card"
              >
                <div className="article-card-category">{article.category}</div>
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-description">{article.description}</p>
                <div className="article-card-footer">
                  <span>{article.readTime} read</span>
                  <span className="article-read-more">Read guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Section */}
      <section className="section">
        <div className="section-inner">
          <div className="affiliate-section">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <span className="section-eyebrow">Trusted Partners</span>
              <h2 className="section-title">Get professional help</h2>
              <p className="section-subtitle">
                Navigating German immigration alone is hard. These services have helped
                thousands of foreigners succeed.
              </p>
            </div>
            <div className="affiliate-grid">
              {affiliatesData.map((affiliate) => (
                <div key={affiliate.slug} className="affiliate-card">
                  <div className="affiliate-type-badge">{affiliate.type}</div>
                  <div className="affiliate-name">{affiliate.name}</div>
                  <p className="affiliate-description">{affiliate.description}</p>
                  <a href={affiliate.url} className="affiliate-link" rel="noopener noreferrer">
                    Learn more
                  </a>
                </div>
              ))}
            </div>
            <p className="affiliate-disclosure">
              * GermanySolved earns a small commission from some partner links. This doesn&apos;t
              affect which services we recommend — we only list resources that genuinely help
              with German immigration.
            </p>
          </div>
        </div>
      </section>

      {/* Report Form */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Community</span>
            <h2 className="section-title">Add your experience</h2>
            <p className="section-subtitle">
              Every report helps someone else prepare better. Takes 2 minutes.
              Completely anonymous.
            </p>
          </div>
          <ReportForm />
        </div>
      </section>
    </>
  );
}

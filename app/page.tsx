import Link from 'next/link';

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
      'The top reasons applications get rejected — and exactly how to avoid them.',
    readTime: '7 min',
  },
  {
    slug: 'munich-kvr-appointment-guide',
    category: 'Office Guide',
    title: 'Munich KVR: What to Expect at Your Appointment',
    description:
      'Wait times, required documents, and what officers typically ask at Munich KVR.',
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
  return (
    <>
      {/* Notice Bar */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <span className="trust-item">Sample data for demonstration purposes</span>
          <span className="trust-item">This site is no longer updated</span>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            🇩🇪 German Immigration Guide
          </div>
          <h1 className="hero-title">
            Navigate German Immigration —{' '}
            <em>Without the Maze</em>
          </h1>
          <p className="hero-subtitle">
            Guides to German immigration offices. Find wait time information, understand
            rejection reasons, and prepare for your appointment with confidence. All
            statistics shown on this site are sample data for demonstration purposes.
          </p>
          <div className="hero-actions">
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
              <span className="hero-stat-label">Federal states</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">400+</span>
              <span className="hero-stat-label">Immigration offices</span>
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

      {/* Articles Grid */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Guides</span>
            <h2 className="section-title">Everything you need to know</h2>
            <p className="section-subtitle">
              Practical guides to German immigration processes — not generic legal advice.
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
    </>
  );
}

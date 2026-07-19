import type { Metadata } from 'next';
import Link from 'next/link';
import reportsData from '@/data/reports.json';
import type { Report } from '@/lib/reports';

interface OfficeData {
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  website: string;
  avgWaitDays: number;
  approvalRate: number;
  appointmentWaitWeeks: number;
  reportCount: number;
  languages: string[];
  description: string;
  tips: string[];
  commonIssues: string[];
}

const OFFICES: Record<string, OfficeData> = {
  'berlin-auslaenderbehoerde': {
    slug: 'berlin-auslaenderbehoerde',
    name: 'Berlin Ausländerbehörde (LEA Berlin)',
    city: 'Berlin',
    state: 'Berlin',
    address: 'Friedrich-Krause-Ufer 24, 13353 Berlin',
    website: 'https://www.berlin.de/labo/willkommen-in-berlin/dienstleistungen/auslaenderangelegenheiten/',
    avgWaitDays: 127,
    approvalRate: 78,
    appointmentWaitWeeks: 8,
    reportCount: 4,
    languages: ['German', 'English (some officers)'],
    description:
      'The LEA Berlin (Landesamt für Einwanderung) is one of the largest immigration offices in Germany, processing applications for the entire Berlin metropolitan area. Known for long appointment wait times but generally professional handling of cases.',
    tips: [
      'Book appointments through the official Berlin portal — slots open weeks in advance',
      'Arrive 10–15 minutes early; they have strict time slots',
      'Bring originals and at least 2 copies of every document',
      'English is understood at most counters but bring German translations of documents',
      'Check cancellation slots daily — they appear with short notice',
    ],
    commonIssues: [
      'Appointment slots unavailable for weeks',
      'Missing Meldebescheinigung (residence registration)',
      'Salary documents not in required format',
      'Incomplete health insurance certificates',
    ],
  },
  'munich-kvu': {
    slug: 'munich-kvu',
    name: 'Munich KVR (Kreisverwaltungsreferat)',
    city: 'Munich',
    state: 'Bavaria',
    address: 'Ruppertstraße 19, 80337 München',
    website: 'https://www.muenchen.de/rathaus/Stadtverwaltung/Kreisverwaltungsreferat',
    avgWaitDays: 64,
    approvalRate: 71,
    appointmentWaitWeeks: 12,
    reportCount: 3,
    languages: ['German'],
    description:
      'Munich\'s KVR handles immigration for Bavaria\'s capital. Processing times are generally faster than Berlin, but appointment availability is extremely limited — often 10–14 weeks out. Officers primarily work in German only.',
    tips: [
      'Appointment wait is 10–14 weeks — book as early as possible',
      'All documents must be in German or have certified translations',
      'Bring gross annual salary stated explicitly in your offer letter',
      'The KVR is strict about document formats — check their official checklist',
      'Consider hiring an immigration lawyer to review your documents beforehand',
    ],
    commonIssues: [
      'Offer letters with net salary (gross annual required)',
      'Appointment scarcity — 12+ week waits common',
      'Officers speak German only',
      'Strict on certified translation requirements',
    ],
  },
  'hamburg-einwanderungsbehoerde': {
    slug: 'hamburg-einwanderungsbehoerde',
    name: 'Hamburg Einwanderungsbehörde',
    city: 'Hamburg',
    state: 'Hamburg',
    address: 'Adolph-Schönfelder-Straße 5, 22083 Hamburg',
    website: 'https://www.hamburg.de/einwanderungsbehoerde/',
    avgWaitDays: 82,
    approvalRate: 65,
    appointmentWaitWeeks: 6,
    reportCount: 3,
    languages: ['German', 'Some English'],
    description:
      'Hamburg\'s Einwanderungsbehörde serves Germany\'s second-largest city and major port. Freelance visa applications are common here due to Hamburg\'s creative and media industries. Appointment wait times are shorter than Berlin or Munich but rejection rates for freelance visas are higher.',
    tips: [
      'Freelance applicants: bring 3+ signed client contracts and a detailed business plan',
      'Professional liability insurance is required — get quotes before the appointment',
      'Tax registration (Steuernummer) may be required — get a preliminary registration',
      'Bring a translator if your German is not B1 level or above',
      'Processing decisions can take 4–8 weeks after your appointment',
    ],
    commonIssues: [
      'Insufficient client contracts for freelance visas',
      'No Steuernummer at time of application',
      'Missing professional liability insurance',
      'Language barrier — officers primarily speak German',
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'berlin-auslaenderbehoerde' },
    { slug: 'munich-kvu' },
    { slug: 'hamburg-einwanderungsbehoerde' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const office = OFFICES[params.slug];
  if (!office) return { title: 'Office Not Found' };
  return {
    title: `${office.name} – Wait Times & Reports`,
    description: `Community reports for ${office.name}. Average wait: ${office.avgWaitDays} days. Approval rate: ${office.approvalRate}%. ${office.reportCount} reports.`,
  };
}

export default function OfficePage({ params }: { params: { slug: string } }) {
  const office = OFFICES[params.slug];

  if (!office) {
    return (
      <div className="section">
        <div className="section-inner" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 className="page-title">Office Not Found</h1>
          <Link href="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const reports = (reportsData as Report[]).filter(
    (r) => r.city === office.city.toLowerCase()
  );

  const recentCases = reports.slice(0, 5);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Offices</span>
            <span className="breadcrumb-sep">/</span>
            <span>{office.name}</span>
          </nav>
          <div className="page-eyebrow">{office.state} · Immigration Office</div>
          <h1 className="page-title">{office.name}</h1>
          <p className="page-subtitle">{office.description}</p>
          <div className="page-meta">
            <span className="page-meta-item">📍 {office.address}</span>
            <span className="page-meta-item">Sample data for demonstration purposes</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section section-alt">
        <div className="section-inner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {[
              { label: 'Avg. Wait Time', value: `${office.avgWaitDays} days`, note: 'sample data' },
              { label: 'Approval Rate', value: `${office.approvalRate}%`, note: 'sample data' },
              { label: 'Appt. Wait', value: `${office.appointmentWaitWeeks} weeks`, note: 'sample data' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', marginTop: '2px' }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">
            <div>
              {/* Tips */}
              <div
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  marginBottom: '24px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '16px',
                  }}
                >
                  Tips
                </h2>
                <div className="checklist">
                  {office.tips.map((tip) => (
                    <div key={tip} className="checklist-item">
                      <span className="checklist-item-icon">✓</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Issues */}
              <div
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  marginBottom: '24px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '16px',
                  }}
                >
                  Common Issues
                </h2>
                <div className="checklist">
                  {office.commonIssues.map((issue) => (
                    <div key={issue} className="checklist-item">
                      <span className="checklist-item-icon" style={{ color: 'var(--red)' }}>!</span>
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Cases */}
              {recentCases.length > 0 && (
                <div
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px',
                    marginBottom: '24px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: '16px',
                    }}
                  >
                    Recent Cases
                  </h2>
                  <div className="latest-reports">
                    {recentCases.map((r) => (
                      <Link
                        key={r.id}
                        href={`/case/${r.caseId}`}
                        className="report-card"
                        style={{ textDecoration: 'none' }}
                      >
                        <div className={`report-card-outcome ${r.outcome}`}>
                          {r.outcome === 'approved' ? '✓' : r.outcome === 'rejected' ? '✕' : '⋯'}
                        </div>
                        <div className="report-card-info">
                          <div className="report-card-office">{r.visaType}</div>
                          <div className="report-card-meta">{r.date}</div>
                        </div>
                        <div className="report-card-right">
                          <span className={`outcome-badge ${r.outcome}`}>{r.outcome}</span>
                          <span className="wait-time">{r.waitDays}d wait</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="sidebar-box">
                <div className="sidebar-box-title">Office Details</div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">City</span>
                  <span className="sidebar-stat-value">{office.city}</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">State</span>
                  <span className="sidebar-stat-value">{office.state}</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Languages</span>
                  <span className="sidebar-stat-value" style={{ fontSize: '0.8125rem', textAlign: 'right' }}>
                    {office.languages.join(', ')}
                  </span>
                </div>
              </div>

              <div className="sidebar-box">
                <div className="sidebar-box-title">Compare Offices</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link
                    href="/compare/berlin-vs-munich"
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Berlin vs Munich
                  </Link>
                  <Link
                    href="/compare/berlin-vs-hamburg"
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Berlin vs Hamburg
                  </Link>
                  <Link
                    href="/compare/munich-vs-frankfurt"
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Munich vs Frankfurt
                  </Link>
                </div>
              </div>

              <div className="sidebar-box">
                <div className="sidebar-box-title">Quick Links</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a
                    href={office.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Official website ↗
                  </a>
                  <Link
                    href={`/waiting-times/${office.city.toLowerCase()}`}
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Wait times in {office.city}
                  </Link>
                  <Link
                    href={`/hardest-offices/${office.state.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Hardest offices in {office.state}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

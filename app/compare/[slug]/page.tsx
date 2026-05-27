import type { Metadata } from 'next';
import Link from 'next/link';
import UpdateBanner from '@/components/UpdateBanner';
import ReportForm from '@/components/ReportForm';

interface OfficeProfile {
  name: string;
  city: string;
  state: string;
  avgWaitDays: number;
  appointmentWaitWeeks: number;
  approvalRate: number;
  languagesSpoken: string;
  englishFriendly: boolean;
  reportCount: number;
  onlineBooking: boolean;
  avgProcessingAfterAppt: string;
  difficultyScore: number;
  officeSlug: string;
  strengths: string[];
  weaknesses: string[];
}

interface ComparisonData {
  slug: string;
  title: string;
  left: OfficeProfile;
  right: OfficeProfile;
  verdict: string;
}

const OFFICE_PROFILES: Record<string, OfficeProfile> = {
  berlin: {
    name: 'Berlin Ausländerbehörde (LEA)',
    city: 'Berlin',
    state: 'Berlin',
    avgWaitDays: 127,
    appointmentWaitWeeks: 8,
    approvalRate: 75,
    languagesSpoken: 'German, some English',
    englishFriendly: true,
    reportCount: 4,
    onlineBooking: true,
    avgProcessingAfterAppt: 'Same day (sticker)',
    difficultyScore: 65,
    officeSlug: 'berlin-auslaenderbehoerde',
    strengths: [
      'Some English-speaking officers',
      'Same-day sticker for work visas',
      'Well-documented process',
    ],
    weaknesses: [
      'Longest appointment waits',
      'Very high volume — impersonal',
      'Complex online booking system',
    ],
  },
  munich: {
    name: 'Munich KVR',
    city: 'Munich',
    state: 'Bavaria',
    avgWaitDays: 64,
    appointmentWaitWeeks: 12,
    approvalRate: 71,
    languagesSpoken: 'German only',
    englishFriendly: false,
    reportCount: 3,
    onlineBooking: true,
    avgProcessingAfterAppt: '2–4 weeks (letter)',
    difficultyScore: 72,
    officeSlug: 'munich-kvu',
    strengths: [
      'Faster processing after appointment',
      'Smaller, more organized office',
      'Student visa approvals are quick',
    ],
    weaknesses: [
      '12+ week appointment waits',
      'German only — no English help',
      'Strict document format requirements',
    ],
  },
  hamburg: {
    name: 'Hamburg Einwanderungsbehörde',
    city: 'Hamburg',
    state: 'Hamburg',
    avgWaitDays: 82,
    appointmentWaitWeeks: 6,
    approvalRate: 65,
    languagesSpoken: 'German, limited English',
    englishFriendly: false,
    reportCount: 3,
    onlineBooking: true,
    avgProcessingAfterAppt: '4–8 weeks (letter)',
    difficultyScore: 78,
    officeSlug: 'hamburg-einwanderungsbehoerde',
    strengths: [
      'Shorter appointment waits',
      'Familiar with freelance applications',
      'Good online information',
    ],
    weaknesses: [
      'High freelance rejection rate',
      'Long processing after appointment',
      'Officers primarily German-speaking',
    ],
  },
  frankfurt: {
    name: 'Frankfurt Ausländerbehörde',
    city: 'Frankfurt',
    state: 'Hessen',
    avgWaitDays: 88,
    appointmentWaitWeeks: 7,
    approvalRate: 55,
    languagesSpoken: 'German, some English',
    englishFriendly: true,
    reportCount: 1,
    onlineBooking: true,
    avgProcessingAfterAppt: '3–6 weeks (letter)',
    difficultyScore: 80,
    officeSlug: 'berlin-auslaenderbehoerde',
    strengths: [
      'Finance sector expertise',
      'Some English spoken',
      'Familiar with international applicants',
    ],
    weaknesses: [
      'Lower approval rate overall',
      'High application volume',
      'Longer post-appointment processing',
    ],
  },
};

const COMPARISONS: Record<string, ComparisonData> = {
  'berlin-vs-munich': {
    slug: 'berlin-vs-munich',
    title: 'Berlin vs Munich: Immigration Office Comparison',
    left: OFFICE_PROFILES.berlin,
    right: OFFICE_PROFILES.munich,
    verdict:
      'Berlin is more English-friendly and gives same-day decisions for work visas, but you\'ll wait 8 weeks for an appointment. Munich is faster overall but appointment slots are even scarcer (12 weeks) and officers only speak German. If you have a choice of where to register, Berlin is generally easier for non-German speakers.',
  },
  'berlin-vs-hamburg': {
    slug: 'berlin-vs-hamburg',
    title: 'Berlin vs Hamburg: Immigration Office Comparison',
    left: OFFICE_PROFILES.berlin,
    right: OFFICE_PROFILES.hamburg,
    verdict:
      'Hamburg offers shorter appointment waits (6 vs 8 weeks) and is the better choice for freelancers, despite the higher rejection rate. Berlin wins on English support and approval rates. Work visa applicants are generally better served in Berlin; freelancers with strong contracts should try Hamburg.',
  },
  'munich-vs-frankfurt': {
    slug: 'munich-vs-frankfurt',
    title: 'Munich vs Frankfurt: Immigration Office Comparison',
    left: OFFICE_PROFILES.munich,
    right: OFFICE_PROFILES.frankfurt,
    verdict:
      'Munich has a higher approval rate and faster total processing, but appointment availability is terrible. Frankfurt handles finance-sector applications regularly and has some English support, but approval rates are notably lower. For Blue Card applicants in tech/finance, Munich is preferred despite the longer wait for an appointment.',
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'berlin-vs-munich' },
    { slug: 'berlin-vs-hamburg' },
    { slug: 'munich-vs-frankfurt' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const comp = COMPARISONS[params.slug];
  if (!comp) return { title: 'Comparison Not Found' };
  return {
    title: comp.title,
    description: `Side-by-side comparison of ${comp.left.name} vs ${comp.right.name}. Wait times, approval rates, and community tips.`,
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const comp = COMPARISONS[params.slug];

  if (!comp) {
    return (
      <div className="section">
        <div className="section-inner" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 className="page-title">Comparison Not Found</h1>
          <Link href="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { left, right } = comp;

  const rows: { label: string; leftVal: string; rightVal: string; winner?: 'left' | 'right' | 'tie' }[] = [
    {
      label: 'Avg. Wait Time',
      leftVal: `${left.avgWaitDays} days`,
      rightVal: `${right.avgWaitDays} days`,
      winner: left.avgWaitDays < right.avgWaitDays ? 'left' : right.avgWaitDays < left.avgWaitDays ? 'right' : 'tie',
    },
    {
      label: 'Appointment Wait',
      leftVal: `${left.appointmentWaitWeeks} weeks`,
      rightVal: `${right.appointmentWaitWeeks} weeks`,
      winner: left.appointmentWaitWeeks < right.appointmentWaitWeeks ? 'left' : right.appointmentWaitWeeks < left.appointmentWaitWeeks ? 'right' : 'tie',
    },
    {
      label: 'Approval Rate',
      leftVal: `${left.approvalRate}%`,
      rightVal: `${right.approvalRate}%`,
      winner: left.approvalRate > right.approvalRate ? 'left' : right.approvalRate > left.approvalRate ? 'right' : 'tie',
    },
    {
      label: 'English-Friendly',
      leftVal: left.englishFriendly ? 'Yes' : 'Limited',
      rightVal: right.englishFriendly ? 'Yes' : 'Limited',
      winner: left.englishFriendly && !right.englishFriendly ? 'left' : right.englishFriendly && !left.englishFriendly ? 'right' : 'tie',
    },
    {
      label: 'Online Booking',
      leftVal: left.onlineBooking ? 'Yes' : 'No',
      rightVal: right.onlineBooking ? 'Yes' : 'No',
    },
    {
      label: 'Post-Appt Processing',
      leftVal: left.avgProcessingAfterAppt,
      rightVal: right.avgProcessingAfterAppt,
    },
    {
      label: 'Difficulty Score',
      leftVal: `${left.difficultyScore}/100`,
      rightVal: `${right.difficultyScore}/100`,
      winner: left.difficultyScore < right.difficultyScore ? 'left' : right.difficultyScore < left.difficultyScore ? 'right' : 'tie',
    },
    {
      label: 'Community Reports',
      leftVal: String(left.reportCount),
      rightVal: String(right.reportCount),
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Compare</span>
            <span className="breadcrumb-sep">/</span>
            <span>{left.city} vs {right.city}</span>
          </nav>
          <div className="page-eyebrow">Office Comparison</div>
          <h1 className="page-title">{comp.title}</h1>
          <p className="page-subtitle">
            Side-by-side comparison based on community reports and official data.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <UpdateBanner lastUpdated="May 27, 2026" newReports={1} />

          {/* Comparison Table */}
          <div className="stats-table-wrapper" style={{ marginTop: '24px', marginBottom: '24px' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>{left.name}</th>
                  <th>{right.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td
                      className={
                        row.winner === 'left'
                          ? 'compare-better'
                          : row.winner === 'right'
                          ? 'compare-worse'
                          : ''
                      }
                    >
                      {row.leftVal}
                      {row.winner === 'left' && ' ✓'}
                    </td>
                    <td
                      className={
                        row.winner === 'right'
                          ? 'compare-better'
                          : row.winner === 'left'
                          ? 'compare-worse'
                          : ''
                      }
                    >
                      {row.rightVal}
                      {row.winner === 'right' && ' ✓'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Strengths & Weaknesses */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {[left, right].map((office) => (
              <div
                key={office.city}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '16px',
                  }}
                >
                  {office.city}
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                    }}
                  >
                    Strengths
                  </div>
                  {office.strengths.map((s) => (
                    <div key={s} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '0.875rem', color: 'var(--ink-mid)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> {s}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--red)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                    }}
                  >
                    Weaknesses
                  </div>
                  {office.weaknesses.map((w) => (
                    <div key={w} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '0.875rem', color: 'var(--ink-mid)' }}>
                      <span style={{ color: 'var(--red)', fontWeight: 700 }}>✕</span> {w}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/office/${office.officeSlug}`}
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
                  View full guide →
                </Link>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div
            style={{
              background: 'var(--accent-light)',
              border: '1px solid #C5DDD8',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--accent)',
                marginBottom: '12px',
              }}
            >
              Community Verdict
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--accent)', lineHeight: 1.7 }}>
              {comp.verdict}
            </p>
          </div>

          <ReportForm />
        </div>
      </section>
    </>
  );
}

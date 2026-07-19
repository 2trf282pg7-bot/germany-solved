import type { Metadata } from 'next';
import Link from 'next/link';

interface CityData {
  slug: string;
  name: string;
  state: string;
  reportCount: number;
  avgWaitDays: number;
  approvalRate: number;
  officeSlug: string;
  visaBreakdown: { visaType: string; avgDays: number; approvalRate: number; reports: number }[];
  trend: { month: string; avgDays: number }[];
  notes: string;
}

const CITIES: Record<string, CityData> = {
  berlin: {
    slug: 'berlin',
    name: 'Berlin',
    state: 'Berlin',
    reportCount: 4,
    avgWaitDays: 127,
    approvalRate: 75,
    officeSlug: 'berlin-auslaenderbehoerde',
    visaBreakdown: [
      { visaType: 'Work Visa', avgDays: 95, approvalRate: 82, reports: 2 },
      { visaType: 'Blue Card', avgDays: 110, approvalRate: 78, reports: 1 },
      { visaType: 'Settlement Permit', avgDays: 212, approvalRate: 90, reports: 1 },
    ],
    trend: [
      { month: 'Dec 2025', avgDays: 142 },
      { month: 'Jan 2026', avgDays: 138 },
      { month: 'Feb 2026', avgDays: 133 },
      { month: 'Mar 2026', avgDays: 129 },
      { month: 'Apr 2026', avgDays: 127 },
      { month: 'May 2026', avgDays: 122 },
    ],
    notes:
      'Berlin\'s LEA is the largest immigration office in Germany. Wait times have been slowly improving since late 2025 due to expanded capacity. Settlement permit applications take significantly longer than other visa types.',
  },
  munich: {
    slug: 'munich',
    name: 'Munich',
    state: 'Bavaria',
    reportCount: 3,
    avgWaitDays: 64,
    approvalRate: 71,
    officeSlug: 'munich-kvu',
    visaBreakdown: [
      { visaType: 'Blue Card', avgDays: 45, approvalRate: 68, reports: 1 },
      { visaType: 'Student Visa', avgDays: 32, approvalRate: 91, reports: 1 },
      { visaType: 'Freelance Visa', avgDays: 0, approvalRate: 0, reports: 1 },
    ],
    trend: [
      { month: 'Dec 2025', avgDays: 71 },
      { month: 'Jan 2026', avgDays: 69 },
      { month: 'Feb 2026', avgDays: 67 },
      { month: 'Mar 2026', avgDays: 65 },
      { month: 'Apr 2026', avgDays: 64 },
      { month: 'May 2026', avgDays: 62 },
    ],
    notes:
      'Munich\'s KVR has faster processing times than Berlin but appointment availability is a significant bottleneck — waits of 10–14 weeks are common. Student visa processing is notably fast.',
  },
  hamburg: {
    slug: 'hamburg',
    name: 'Hamburg',
    state: 'Hamburg',
    reportCount: 3,
    avgWaitDays: 82,
    approvalRate: 65,
    officeSlug: 'hamburg-einwanderungsbehoerde',
    visaBreakdown: [
      { visaType: 'Freelance Visa', avgDays: 67, approvalRate: 45, reports: 1 },
      { visaType: 'Blue Card', avgDays: 56, approvalRate: 85, reports: 1 },
      { visaType: 'Family Reunification', avgDays: 0, approvalRate: 0, reports: 0 },
    ],
    trend: [
      { month: 'Dec 2025', avgDays: 94 },
      { month: 'Jan 2026', avgDays: 91 },
      { month: 'Feb 2026', avgDays: 88 },
      { month: 'Mar 2026', avgDays: 85 },
      { month: 'Apr 2026', avgDays: 82 },
      { month: 'May 2026', avgDays: 79 },
    ],
    notes:
      'Hamburg has a high proportion of freelance visa applications from the city\'s creative and media sectors. Rejection rates for freelance visas are notably higher than other visa types.',
  },
  cologne: {
    slug: 'cologne',
    name: 'Cologne',
    state: 'NRW',
    reportCount: 1,
    avgWaitDays: 155,
    approvalRate: 60,
    officeSlug: 'berlin-auslaenderbehoerde',
    visaBreakdown: [
      { visaType: 'Family Reunification', avgDays: 155, approvalRate: 60, reports: 1 },
    ],
    trend: [
      { month: 'Dec 2025', avgDays: 168 },
      { month: 'Jan 2026', avgDays: 165 },
      { month: 'Feb 2026', avgDays: 162 },
      { month: 'Mar 2026', avgDays: 159 },
      { month: 'Apr 2026', avgDays: 156 },
      { month: 'May 2026', avgDays: 155 },
    ],
    notes:
      'Cologne\'s Ausländeramt is known for very long family reunification processing times. NRW offices generally have high workloads due to the population density of the region.',
  },
  frankfurt: {
    slug: 'frankfurt',
    name: 'Frankfurt',
    state: 'Hessen',
    reportCount: 1,
    avgWaitDays: 88,
    approvalRate: 55,
    officeSlug: 'berlin-auslaenderbehoerde',
    visaBreakdown: [
      { visaType: 'Work Visa', avgDays: 88, approvalRate: 55, reports: 1 },
    ],
    trend: [
      { month: 'Dec 2025', avgDays: 101 },
      { month: 'Jan 2026', avgDays: 98 },
      { month: 'Feb 2026', avgDays: 95 },
      { month: 'Mar 2026', avgDays: 92 },
      { month: 'Apr 2026', avgDays: 89 },
      { month: 'May 2026', avgDays: 88 },
    ],
    notes:
      'Frankfurt processes a high volume of finance-sector work visas and Blue Cards. As Germany\'s financial hub, it sees many international applications for skilled worker positions.',
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'berlin' },
    { slug: 'munich' },
    { slug: 'hamburg' },
    { slug: 'cologne' },
    { slug: 'frankfurt' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = CITIES[params.slug];
  if (!city) return { title: 'City Not Found' };
  return {
    title: `${city.name} Immigration Wait Times 2026`,
    description: `Wait time information for immigration appointments in ${city.name}. Sample data for demonstration purposes.`,
  };
}

export default function WaitingTimesPage({ params }: { params: { slug: string } }) {
  const city = CITIES[params.slug];

  if (!city) {
    return (
      <div className="section">
        <div className="section-inner" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 className="page-title">City Not Found</h1>
          <Link href="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const trendMin = Math.min(...city.trend.map((t) => t.avgDays));
  const trendMax = Math.max(...city.trend.map((t) => t.avgDays));

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Waiting Times</span>
            <span className="breadcrumb-sep">/</span>
            <span>{city.name}</span>
          </nav>
          <div className="page-eyebrow">{city.state} · Wait Times</div>
          <h1 className="page-title">
            {city.name} Immigration Wait Times
          </h1>
          <p className="page-subtitle">
            Processing time information for {city.name}&apos;s immigration office.
            Sample data for demonstration purposes.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          {/* Key Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {[
              { label: 'Avg. Wait Time', value: `${city.avgWaitDays}d`, sub: 'sample data' },
              { label: 'Approval Rate', value: `${city.approvalRate}%`, sub: 'sample data' },
              { label: 'Trend', value: city.trend[city.trend.length - 1].avgDays < city.trend[0].avgDays ? '↓ Improving' : '↑ Worsening', sub: 'sample data' },
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
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.9375rem', marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', marginTop: '2px' }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Trend Chart (Visual Bar Chart) */}
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
                marginBottom: '24px',
              }}
            >
              6-Month Trend (Average Wait Days)
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '12px',
                height: '120px',
              }}
            >
              {city.trend.map((point) => {
                const pct =
                  trendMax === trendMin
                    ? 60
                    : ((point.avgDays - trendMin) / (trendMax - trendMin)) * 70 + 30;
                return (
                  <div
                    key={point.month}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--ink-mid)',
                      }}
                    >
                      {point.avgDays}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        height: `${pct}%`,
                        background: 'var(--accent)',
                        borderRadius: '4px 4px 0 0',
                        opacity: point.month.includes('May') ? 1 : 0.6,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        color: 'var(--ink-light)',
                        textAlign: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      {point.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Visa Type Table */}
          <div className="stats-table-wrapper" style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ink)',
                padding: '20px 20px 0',
              }}
            >
              Wait Times by Visa Type
            </h2>
            <table className="stats-table" style={{ marginTop: '16px' }}>
              <thead>
                <tr>
                  <th>Visa Type</th>
                  <th>Avg. Wait (Days)</th>
                  <th>Approval Rate</th>
                  <th>Reports</th>
                </tr>
              </thead>
              <tbody>
                {city.visaBreakdown.map((row) => (
                  <tr key={row.visaType}>
                    <td>{row.visaType}</td>
                    <td>{row.avgDays > 0 ? `${row.avgDays}d` : '—'}</td>
                    <td>{row.approvalRate > 0 ? `${row.approvalRate}%` : '—'}</td>
                    <td>{row.reports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="alert alert-info" style={{ marginBottom: '32px' }}>
            <span className="alert-icon">📊</span>
            <p className="alert-text">{city.notes}</p>
          </div>

          {/* Office Link */}
          <div
            style={{
              background: 'var(--accent-light)',
              border: '1px solid #C5DDD8',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  marginBottom: '4px',
                }}
              >
                Planning an appointment in {city.name}?
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--accent)', opacity: 0.8 }}>
                See tips, common issues, and recent cases for the {city.name} office.
              </p>
            </div>
            <Link href={`/office/${city.officeSlug}`} className="btn-primary">
              View Office Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

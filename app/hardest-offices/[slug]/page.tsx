import type { Metadata } from 'next';
import Link from 'next/link';

interface OfficeRanking {
  rank: number;
  office: string;
  city: string;
  avgWaitDays: number;
  approvalRate: number;
  rejectionRate: number;
  reportCount: number;
  difficultyScore: number;
  notes: string;
}

const STATE_DATA: Record<string, { name: string; offices: OfficeRanking[] }> = {
  berlin: {
    name: 'Berlin',
    offices: [
      { rank: 1, office: 'LEA Berlin – Lichtenberg', city: 'Berlin', avgWaitDays: 142, approvalRate: 71, rejectionRate: 18, reportCount: 38, difficultyScore: 8.2, notes: 'Longest wait times in Berlin. High document scrutiny.' },
      { rank: 2, office: 'LEA Berlin – Mitte', city: 'Berlin', avgWaitDays: 118, approvalRate: 74, rejectionRate: 15, reportCount: 29, difficultyScore: 7.4, notes: 'Strict on translation quality. English limited.' },
      { rank: 3, office: 'LEA Berlin – Reinickendorf', city: 'Berlin', avgWaitDays: 95, approvalRate: 79, rejectionRate: 12, reportCount: 21, difficultyScore: 6.1, notes: 'More lenient but still requires all originals.' },
    ],
  },
  bavaria: {
    name: 'Bavaria',
    offices: [
      { rank: 1, office: 'Munich KVR – Bürgerbüro', city: 'Munich', avgWaitDays: 134, approvalRate: 69, rejectionRate: 22, reportCount: 44, difficultyScore: 8.7, notes: 'Strictest in Bavaria. Very document-intensive.' },
      { rank: 2, office: 'Nuremberg Ausländerbehörde', city: 'Nuremberg', avgWaitDays: 97, approvalRate: 75, rejectionRate: 16, reportCount: 18, difficultyScore: 6.8, notes: 'Moderate difficulty. Some English-speaking staff.' },
      { rank: 3, office: 'Augsburg Ausländerbehörde', city: 'Augsburg', avgWaitDays: 78, approvalRate: 82, rejectionRate: 10, reportCount: 11, difficultyScore: 5.2, notes: 'Smaller office, quicker processing.' },
    ],
  },
  hamburg: {
    name: 'Hamburg',
    offices: [
      { rank: 1, office: 'Hamburg Einwanderungsbehörde – Hauptstelle', city: 'Hamburg', avgWaitDays: 121, approvalRate: 66, rejectionRate: 24, reportCount: 32, difficultyScore: 8.5, notes: 'Known for strict freelance visa rejections.' },
      { rank: 2, office: 'Hamburg – Bezirk Altona', city: 'Hamburg', avgWaitDays: 89, approvalRate: 76, rejectionRate: 14, reportCount: 14, difficultyScore: 6.3, notes: 'Better for work visa extensions.' },
    ],
  },
  nrw: {
    name: 'North Rhine-Westphalia',
    offices: [
      { rank: 1, office: 'Cologne Ausländerbehörde', city: 'Cologne', avgWaitDays: 108, approvalRate: 72, rejectionRate: 19, reportCount: 27, difficultyScore: 7.6, notes: 'High volume, inconsistent decisions.' },
      { rank: 2, office: 'Düsseldorf Ausländerbehörde', city: 'Düsseldorf', avgWaitDays: 95, approvalRate: 76, rejectionRate: 15, reportCount: 22, difficultyScore: 6.9, notes: 'Better for Blue Card applications.' },
      { rank: 3, office: 'Dortmund Ausländerbehörde', city: 'Dortmund', avgWaitDays: 72, approvalRate: 81, rejectionRate: 11, reportCount: 16, difficultyScore: 5.5, notes: 'Smaller caseload, faster decisions.' },
    ],
  },
  hessen: {
    name: 'Hessen',
    offices: [
      { rank: 1, office: 'Frankfurt Ausländerbehörde', city: 'Frankfurt', avgWaitDays: 113, approvalRate: 70, rejectionRate: 20, reportCount: 31, difficultyScore: 7.9, notes: 'Very busy due to financial sector applicants.' },
      { rank: 2, office: 'Wiesbaden Ausländerbehörde', city: 'Wiesbaden', avgWaitDays: 84, approvalRate: 78, rejectionRate: 13, reportCount: 12, difficultyScore: 6.0, notes: 'State capital office, moderate difficulty.' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(STATE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const state = STATE_DATA[params.slug];
  if (!state) return { title: 'Not Found' };
  return {
    title: `Hardest Immigration Offices in ${state.name} – GermanySolved`,
    description: `Ranked by difficulty: the toughest Ausländerbehörde offices in ${state.name}. Wait times, approval rates, and applicant tips.`,
  };
}

export default function HardestOfficesPage({ params }: { params: { slug: string } }) {
  const state = STATE_DATA[params.slug];

  if (!state) {
    return (
      <main style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h1>State not found</h1>
        <Link href="/">← Back to home</Link>
      </main>
    );
  }

  const topDifficulty = state.offices[0]?.difficultyScore ?? 0;

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="#">Hardest Offices</Link> / {state.name}
          </div>
          <div className="case-badge" style={{ marginBottom: 12 }}>Difficulty Ranking</div>
          <h1 className="page-title">
            Hardest Immigration Offices in <em>{state.name}</em>
          </h1>
          <p className="page-subtitle">
            Ranked by difficulty score. Higher score = longer waits + stricter requirements.
            Sample data for demonstration purposes.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
            <div className="stat-pill">Top difficulty: {topDifficulty}/10</div>
          </div>
        </div>
      </div>

      <div className="content-wrap">
        <div className="content-main">
          <section className="section-block">
            <h2 className="section-heading">Ranked Offices</h2>
            <div className="ranking-list">
              {state.offices.map((office) => (
                <div key={office.rank} className="ranking-card">
                  <div className="ranking-number">#{office.rank}</div>
                  <div className="ranking-body">
                    <div className="ranking-header">
                      <h3 className="ranking-office">{office.office}</h3>
                      <div
                        className="difficulty-badge"
                        style={{
                          background: office.difficultyScore >= 8 ? '#FEE2E2' : office.difficultyScore >= 6 ? '#FEF3C7' : '#EBF3F0',
                          color: office.difficultyScore >= 8 ? '#991B1B' : office.difficultyScore >= 6 ? '#92400E' : '#1B4D3E',
                        }}
                      >
                        {office.difficultyScore}/10
                      </div>
                    </div>
                    <div className="ranking-stats">
                      <span>⏱ Avg wait: <strong>{office.avgWaitDays} days</strong></span>
                      <span>✅ Approval: <strong>{office.approvalRate}%</strong></span>
                      <span>❌ Rejection: <strong>{office.rejectionRate}%</strong></span>
                    </div>
                    <p className="ranking-notes">{office.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-block">
            <h2 className="section-heading">How the Difficulty Score Works</h2>
            <p>The difficulty score (1–10) is calculated from:</p>
            <ul className="tips-list">
              <li><strong>Average wait time</strong> — longer waits increase the score</li>
              <li><strong>Rejection rate</strong> — higher rejections = higher difficulty</li>
              <li><strong>Document strictness</strong> — offices requesting extra documents score higher</li>
              <li><strong>Language barrier</strong> — offices with less English support score higher</li>
            </ul>
            <p style={{ marginTop: 12, color: 'var(--ink-mid)', fontSize: 13 }}>
              Scores are sample data for demonstration purposes.
            </p>
          </section>
        </div>

        <aside className="content-sidebar">
          <div className="sidebar-card">
            <h3>Other States</h3>
            <ul className="sidebar-links">
              {Object.entries(STATE_DATA).map(([slug, s]) => (
                <li key={slug}>
                  <Link href={`/hardest-offices/${slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-card">
            <h3>Related</h3>
            <ul className="sidebar-links">
              <li><Link href="/waiting-times/berlin">Berlin Wait Times</Link></li>
              <li><Link href="/waiting-times/munich">Munich Wait Times</Link></li>
              <li><Link href="/rejection-reasons/work-visa">Why Applications Get Rejected</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

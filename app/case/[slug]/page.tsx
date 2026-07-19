import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { Metadata } from 'next';

interface CaseFrontmatter {
  id: string;
  office: string;
  city: string;
  date: string;
  visaType: string;
  outcome: 'approved' | 'rejected' | 'pending' | 'rescheduled';
  waitDays: number;
  appointmentWaitWeeks: number;
}

const CASES_DIR = path.join(process.cwd(), 'content', 'cases');

function getCaseData(slug: string): { frontmatter: CaseFrontmatter; content: string } | null {
  const filePath = path.join(CASES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data as CaseFrontmatter, content };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderMarkdown(content: string): string {
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<p><strong>${line.slice(2, -2)}</strong></p>`;
      }
      if (line.startsWith('**')) {
        return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      }
      if (line.startsWith('- ')) {
        return `<li>${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
      }
      if (/^\d+\.\s/.test(line)) {
        return `<li>${line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
      }
      if (line.trim() === '') return '';
      return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('\n');
}

export async function generateStaticParams() {
  return [
    { slug: 'DE-101' },
    { slug: 'DE-102' },
    { slug: 'DE-103' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseData = getCaseData(params.slug);
  if (!caseData) return { title: 'Case Not Found' };
  const { frontmatter: fm } = caseData;
  return {
    title: `${fm.id} – ${fm.office} ${fm.visaType}`,
    description: `Immigration case report: ${fm.visaType} at ${fm.office}. Outcome: ${fm.outcome}. Wait time: ${fm.waitDays} days.`,
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const caseData = getCaseData(params.slug);

  if (!caseData) {
    return (
      <div className="section">
        <div className="section-inner" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 className="page-title">Case Not Found</h1>
          <p style={{ color: 'var(--ink-mid)', marginTop: '12px' }}>
            We couldn&apos;t find case{' '}
            <strong>{params.slug}</strong>.
          </p>
          <Link href="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter: fm, content } = caseData;
  const renderedContent = renderMarkdown(content.trim());

  const outcomeColors: Record<string, { bg: string; text: string }> = {
    approved: { bg: 'var(--accent-light)', text: 'var(--accent)' },
    rejected: { bg: 'var(--red-light)', text: 'var(--red)' },
    pending: { bg: 'var(--yellow-light)', text: 'var(--yellow)' },
    rescheduled: { bg: '#EEF2FF', text: '#4F46E5' },
  };
  const outcomeStyle = outcomeColors[fm.outcome] ?? outcomeColors.pending;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Cases</span>
            <span className="breadcrumb-sep">/</span>
            <span>{fm.id}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="case-id-badge">{fm.id}</span>
            <span
              className="outcome-badge"
              style={{ background: outcomeStyle.bg, color: outcomeStyle.text }}
            >
              {fm.outcome}
            </span>
          </div>
          <h1 className="page-title">{fm.office}</h1>
          <p className="page-subtitle">
            {fm.visaType} · {fm.city}
          </p>
          <div className="page-meta">
            <span className="page-meta-item">
              📅 {formatDate(fm.date)}
            </span>
            <span className="page-meta-item">
              ⏱ {fm.waitDays} days total wait
            </span>
            <span className="page-meta-item">
              📆 {fm.appointmentWaitWeeks} weeks to get appointment
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">
            {/* Main Content */}
            <div>
              <div
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  marginBottom: '32px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '20px',
                  }}
                >
                  Case Report
                </h2>
                <div
                  className="content-body"
                  dangerouslySetInnerHTML={{ __html: renderedContent }}
                />
              </div>

            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="sidebar-box">
                <div className="sidebar-box-title">Case Summary</div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Case ID</span>
                  <span className="sidebar-stat-value">{fm.id}</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Outcome</span>
                  <span
                    className="outcome-badge"
                    style={{ background: outcomeStyle.bg, color: outcomeStyle.text }}
                  >
                    {fm.outcome}
                  </span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Visa Type</span>
                  <span className="sidebar-stat-value" style={{ fontSize: '0.8125rem', textAlign: 'right', maxWidth: '160px' }}>{fm.visaType}</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Total wait</span>
                  <span className="sidebar-stat-value">{fm.waitDays} days</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Appt. wait</span>
                  <span className="sidebar-stat-value">{fm.appointmentWaitWeeks} weeks</span>
                </div>
                <div className="sidebar-stat-row">
                  <span className="sidebar-stat-label">Date</span>
                  <span className="sidebar-stat-value">{formatDate(fm.date)}</span>
                </div>
              </div>

              <div className="sidebar-box">
                <div className="sidebar-box-title">Related Pages</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link
                    href={`/office/${fm.city.toLowerCase() === 'berlin' ? 'berlin-auslaenderbehoerde' : fm.city.toLowerCase() === 'munich' ? 'munich-kvu' : 'hamburg-einwanderungsbehoerde'}`}
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → {fm.office} overview
                  </Link>
                  <Link
                    href={`/waiting-times/${fm.city.toLowerCase()}`}
                    style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 500 }}
                  >
                    → Wait times in {fm.city}
                  </Link>
                </div>
              </div>

              <div className="alert alert-info">
                <span className="alert-icon">ℹ️</span>
                <p className="alert-text">
                  This is a sample case report for demonstration purposes.
                  Always verify requirements with the official office.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

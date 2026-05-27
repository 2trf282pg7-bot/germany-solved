import type { Metadata } from 'next';
import Link from 'next/link';
import ReportForm from '@/components/ReportForm';

export const metadata: Metadata = {
  title: 'Submit a Report – GermanySolved',
  description:
    'Share your German immigration office experience. Help others prepare by reporting wait times, outcomes, and document requirements.',
};

export default function ReportPage() {
  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Report
          </div>
          <div className="case-badge" style={{ marginBottom: 12 }}>Community</div>
          <h1 className="page-title">
            Share Your <em>Immigration Experience</em>
          </h1>
          <p className="page-subtitle">
            Every report helps the next applicant prepare better. Your data is anonymous and goes directly
            into the community database.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>
          <div>
            <ReportForm />
          </div>

          <aside>
            <div className="sidebar-card">
              <h3>Why Your Report Matters</h3>
              <ul className="tips-list" style={{ marginTop: 12 }}>
                <li>Helps applicants know what documents to bring</li>
                <li>Tracks wait time trends across offices</li>
                <li>Surfaces patterns in rejections so others can avoid them</li>
                <li>Gives a realistic picture of processing timelines</li>
              </ul>
            </div>

            <div className="sidebar-card" style={{ marginTop: 16 }}>
              <h3>What Happens to Your Report</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.6, marginTop: 8 }}>
                Reports are submitted anonymously and reviewed before appearing in the database.
                They feed into wait time averages, office difficulty scores, and the community case archive.
              </p>
            </div>

            <div className="sidebar-card" style={{ marginTop: 16 }}>
              <h3>Recent Reports</h3>
              <ul className="sidebar-links">
                <li><Link href="/case/DE-101">DE-101 – Berlin, Work Visa (Approved)</Link></li>
                <li><Link href="/case/DE-102">DE-102 – Munich, Blue Card (Rejected)</Link></li>
                <li><Link href="/case/DE-103">DE-103 – Hamburg, Freelance (Pending)</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

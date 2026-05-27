import Link from 'next/link';

export interface Report {
  id: string;
  caseId: string;
  office: string;
  city: string;
  date: string;
  visaType: string;
  outcome: 'approved' | 'rejected' | 'pending' | 'rescheduled';
  waitDays: number;
  month: string;
}

const OUTCOME_ICONS: Record<string, string> = {
  approved: '✓',
  rejected: '✕',
  pending: '⋯',
  rescheduled: '↻',
};

const OUTCOME_LABELS: Record<string, string> = {
  approved: 'Approved',
  rejected: 'Rejected',
  pending: 'Pending',
  rescheduled: 'Rescheduled',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface LatestReportsProps {
  reports: Report[];
}

export default function LatestReports({ reports }: LatestReportsProps) {
  const displayed = reports.slice(0, 3);

  return (
    <div className="latest-reports">
      {displayed.map((report) => (
        <Link
          key={report.id}
          href={`/case/${report.caseId}`}
          className="report-card"
          style={{ textDecoration: 'none' }}
        >
          <div className={`report-card-outcome ${report.outcome}`}>
            {OUTCOME_ICONS[report.outcome] ?? '?'}
          </div>
          <div className="report-card-info">
            <div className="report-card-office">{report.office}</div>
            <div className="report-card-meta">
              {report.visaType} · {formatDate(report.date)}
            </div>
          </div>
          <div className="report-card-right">
            <span className={`outcome-badge ${report.outcome}`}>
              {OUTCOME_LABELS[report.outcome]}
            </span>
            <span className="wait-time">{report.waitDays}d wait</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

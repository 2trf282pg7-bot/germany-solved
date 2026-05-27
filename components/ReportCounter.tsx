interface ReportCounterProps {
  count: number;
  city?: string;
}

export default function ReportCounter({ count, city }: ReportCounterProps) {
  return (
    <span className="report-counter">
      <span className="report-counter-number">{count.toLocaleString()}</span>
      {' '}
      report{count !== 1 ? 's' : ''} this month
      {city ? ` in ${city}` : ''}
    </span>
  );
}

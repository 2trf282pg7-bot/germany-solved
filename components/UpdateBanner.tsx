interface UpdateBannerProps {
  lastUpdated: string;
  newReports: number;
}

export default function UpdateBanner({ lastUpdated, newReports }: UpdateBannerProps) {
  return (
    <div className="update-banner">
      <span className="update-banner-icon" aria-hidden="true">🔄</span>
      <p className="update-banner-text">
        <strong>Last updated:</strong> {lastUpdated}
        {' · '}
        {newReports} new report{newReports !== 1 ? 's' : ''} added this week
      </p>
      <span className="update-banner-badge">Live data</span>
    </div>
  );
}

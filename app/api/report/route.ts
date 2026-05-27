import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? '';
const GITHUB_REPO = process.env.GITHUB_REPO ?? '2trf282pg7-bot/germany-solved';

interface ReportPayload {
  office: string;
  date: string;
  visaType: string;
  outcome: string;
  waitDays?: string | number;
  notes?: string;
}

function formatIssueBody(data: ReportPayload): string {
  return `## Immigration Report

| Field | Value |
|-------|-------|
| **Office** | ${data.office} |
| **Date** | ${data.date} |
| **Visa Type** | ${data.visaType} |
| **Outcome** | ${data.outcome} |
| **Wait Time** | ${data.waitDays ? `${data.waitDays} days` : 'Not specified'} |

## Notes

${data.notes?.trim() || '_No additional notes provided._'}

---
*Submitted via GermanySolved report form*
`;
}

export async function POST(req: NextRequest) {
  let data: ReportPayload;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { office, date, visaType, outcome } = data;

  if (!office?.trim() || !date?.trim() || !visaType?.trim() || !outcome?.trim()) {
    return NextResponse.json(
      { error: 'Missing required fields: office, date, visaType, outcome' },
      { status: 400 }
    );
  }

  const issueTitle = `[Report] ${office.trim()} - ${outcome.trim()}`;
  const issueBody = formatIssueBody(data);

  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set — skipping GitHub issue creation');
    return NextResponse.json({ ok: true, note: 'Report received (GitHub token not configured)' });
  }

  try {
    const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ['report', outcome.toLowerCase()],
      }),
    });

    if (!ghRes.ok) {
      const errBody = await ghRes.text();
      console.error('GitHub API error:', ghRes.status, errBody);
      return NextResponse.json(
        { error: 'Failed to create GitHub issue' },
        { status: 500 }
      );
    }

    const issue = await ghRes.json();

    return NextResponse.json({
      ok: true,
      issueNumber: issue.number,
      issueUrl: issue.html_url,
    });
  } catch (err) {
    console.error('Error creating GitHub issue:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

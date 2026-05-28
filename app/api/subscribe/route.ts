import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, formId } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
    }

    if (!formId) {
      return NextResponse.json({ error: 'Form ID missing' }, { status: 400 });
    }

    const apiSecret = process.env.CONVERTKIT_API_SECRET;
    if (!apiSecret) {
      return NextResponse.json({ error: 'Subscription service not configured' }, { status: 503 });
    }

    const ckRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_secret: apiSecret, email }),
      }
    );

    if (!ckRes.ok) {
      const errData = await ckRes.json().catch(() => ({}));
      console.error('ConvertKit error:', errData);
      return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

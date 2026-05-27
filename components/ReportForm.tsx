'use client';

import { useState } from 'react';

interface FormData {
  office: string;
  date: string;
  visaType: string;
  outcome: string;
  waitDays: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  office: '',
  date: '',
  visaType: '',
  outcome: '',
  waitDays: '',
  notes: '',
};

const VISA_TYPES = [
  'Work Visa (§18 AufenthG)',
  'Blue Card (§18b AufenthG)',
  'Student Visa (§16b AufenthG)',
  'Family Reunification (§28/§30 AufenthG)',
  'Freelance Visa (§21 AufenthG)',
  'Settlement Permit (§9 AufenthG)',
  'Job Seeker Visa (§20 AufenthG)',
  'Other',
];

const OUTCOMES = ['Approved', 'Rejected', 'Pending', 'Rescheduled'];

export default function ReportForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Submission failed. Please try again.');
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="report-form-wrapper">
        <div className="form-success">
          <div className="form-success-icon">✓</div>
          <div className="form-success-title">Report Submitted!</div>
          <p className="form-success-text">
            Thank you for helping the community. Your report has been received and will be
            reviewed shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            style={{
              marginTop: '16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Submit another report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-form-wrapper">
      <h2 className="report-form-title">Share Your Experience</h2>
      <p className="report-form-subtitle">
        Help others prepare for their appointments. Your report is anonymous and takes
        about 2 minutes to fill out.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label className="form-label" htmlFor="office">
              Office Name<span>*</span>
            </label>
            <input
              id="office"
              name="office"
              type="text"
              className="form-input"
              placeholder="e.g. Berlin Ausländerbehörde (LEA Berlin)"
              value={form.office}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Appointment Date<span>*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="waitDays">
              Wait Time (days)
            </label>
            <input
              id="waitDays"
              name="waitDays"
              type="number"
              min="0"
              max="9999"
              className="form-input"
              placeholder="e.g. 127"
              value={form.waitDays}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="visaType">
              Visa Type<span>*</span>
            </label>
            <select
              id="visaType"
              name="visaType"
              className="form-select"
              value={form.visaType}
              onChange={handleChange}
              required
            >
              <option value="">Select visa type…</option>
              {VISA_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="outcome">
              Outcome<span>*</span>
            </label>
            <select
              id="outcome"
              name="outcome"
              className="form-select"
              value={form.outcome}
              onChange={handleChange}
              required
            >
              <option value="">Select outcome…</option>
              {OUTCOMES.map((o) => (
                <option key={o} value={o.toLowerCase()}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              placeholder="What happened at your appointment? What documents did you bring? Any tips for others? (Optional but very helpful)"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="form-error">{errorMsg}</div>
        )}

        <button
          type="submit"
          className="form-submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Report →'}
        </button>

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--ink-light)',
            marginTop: '12px',
            textAlign: 'center',
          }}
        >
          Reports are anonymous. We never collect names or personal identifiers.
        </p>
      </form>
    </div>
  );
}

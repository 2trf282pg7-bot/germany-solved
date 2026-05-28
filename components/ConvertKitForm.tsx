'use client';

import { useState } from 'react';

interface ConvertKitFormProps {
  formId: string;
  title: string;
  description: string;
  buttonText?: string;
  variant?: 'mid' | 'end';
}

export default function ConvertKitForm({
  formId,
  title,
  description,
  buttonText = 'Subscribe',
  variant = 'mid',
}: ConvertKitFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!formId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), formId }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('You\'re subscribed! Check your inbox for confirmation.');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const bgColor = variant === 'end' ? 'var(--accent-light)' : '#F0F7FF';
  const borderColor = variant === 'end' ? 'var(--accent)' : '#BFDBFE';

  if (status === 'success') {
    return (
      <div
        style={{
          background: 'var(--accent-light)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          textAlign: 'center',
          margin: '24px 0',
        }}
      >
        <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9375rem' }}>
          ✅ {message}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        margin: '24px 0',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.0625rem',
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: '6px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--ink-mid)',
          fontSize: '0.875rem',
          marginBottom: '16px',
        }}
      >
        {description}
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          style={{
            flex: '1 1 200px',
            padding: '10px 14px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: '0.9375rem',
            background: 'var(--white)',
            color: 'var(--ink)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 20px',
            background: 'var(--accent)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </button>
      </form>
      {status === 'error' && (
        <p
          style={{
            color: 'var(--red)',
            fontSize: '0.8125rem',
            marginTop: '8px',
          }}
        >
          {message}
        </p>
      )}
      <p
        style={{
          color: 'var(--ink-mid)',
          fontSize: '0.75rem',
          marginTop: '10px',
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

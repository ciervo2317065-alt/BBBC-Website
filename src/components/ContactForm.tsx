'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send');
      }
      setStatus('sent');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="hp">
        <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input className="input" id="name" name="name" required minLength={2} maxLength={100} />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" required maxLength={120} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="phone">Phone (optional)</label>
          <input className="input" id="phone" name="phone" maxLength={40} />
        </div>
        <div>
          <label className="label" htmlFor="subject">Subject</label>
          <input className="input" id="subject" name="subject" required maxLength={150} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="message">Message</label>
        <textarea className="textarea" id="message" name="message" required minLength={5} maxLength={2000} />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'sent' && <span className="text-sm text-green-700">Thank you — we will be in touch.</span>}
        {status === 'error' && <span className="text-sm text-crimson">{error}</span>}
      </div>
    </form>
  );
}

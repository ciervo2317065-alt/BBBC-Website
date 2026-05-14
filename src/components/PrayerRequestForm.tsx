'use client';

import { useState } from 'react';

const CATEGORIES = [
  'Healing',
  'Family',
  'Salvation',
  'Provision',
  'Guidance',
  'Thanksgiving',
  'Ministry',
  'Other',
];

export default function PrayerRequestForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      contact: fd.get('contact'),
      category: fd.get('category'),
      message: fd.get('message'),
      isPrivate: fd.get('isPrivate') === 'on',
      hp_field: fd.get('hp_field') ?? '',
    };
    try {
      const res = await fetch('/api/prayer-requests', {
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
          <label className="label" htmlFor="pr-name">Full name</label>
          <input className="input" id="pr-name" name="name" required minLength={2} maxLength={100} />
        </div>
        <div>
          <label className="label" htmlFor="pr-contact">Contact (optional)</label>
          <input className="input" id="pr-contact" name="contact" placeholder="Email or phone" maxLength={120} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="pr-category">Category</label>
        <select className="select" id="pr-category" name="category" required defaultValue="">
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="pr-message">Prayer Request</label>
        <textarea className="textarea" id="pr-message" name="message" required minLength={5} maxLength={2000} />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink/80">
        <input type="checkbox" name="isPrivate" /> Keep this request private (admin only)
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-gold" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting…' : 'Submit Prayer Request'}
        </button>
        {status === 'sent' && <span className="text-sm text-green-700">Thank you — we are praying with you.</span>}
        {status === 'error' && <span className="text-sm text-crimson">{error}</span>}
      </div>
    </form>
  );
}

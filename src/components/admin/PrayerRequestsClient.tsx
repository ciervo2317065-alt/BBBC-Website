'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Eye, Lock } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

type Status = 'NEW' | 'PRAYING' | 'ANSWERED' | 'ARCHIVED';

type PR = {
  id: string;
  name: string;
  contact: string | null;
  category: string;
  message: string;
  isPrivate: boolean;
  status: Status;
  createdAt: string;
};

const STATUS_COLOR: Record<Status, string> = {
  NEW: 'bg-gold-100 text-gold-700',
  PRAYING: 'bg-navy-50 text-navy-900',
  ANSWERED: 'bg-green-50 text-green-700',
  ARCHIVED: 'bg-gray-100 text-gray-600',
};

export default function PrayerRequestsClient({ initial }: { initial: PR[] }) {
  const router = useRouter();
  const [items, setItems] = useState<PR[]>(initial);
  const [selected, setSelected] = useState<PR | null>(null);
  const [confirming, setConfirming] = useState<PR | null>(null);
  const [busy, setBusy] = useState(false);

  async function setStatus(pr: PR, status: Status) {
    setBusy(true);
    const res = await fetch(`/api/prayer-requests/${pr.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((p) => (p.id === pr.id ? { ...p, status } : p)));
      if (selected?.id === pr.id) setSelected({ ...pr, status });
      router.refresh();
    }
    setBusy(false);
  }

  async function remove() {
    if (!confirming) return;
    setBusy(true);
    const res = await fetch(`/api/prayer-requests/${confirming.id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((p) => p.id !== confirming.id));
      if (selected?.id === confirming.id) setSelected(null);
      setConfirming(null);
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-navy-900 mb-5">Prayer Requests</h1>
      <p className="text-sm text-ink/60 mb-4">
        Prayer requests are received privately. Items marked “private” must not be shared outside
        the admin team.
      </p>
      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-navy-50 text-navy-900">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">When</th>
              <th className="text-left px-4 py-2.5 font-medium">From</th>
              <th className="text-left px-4 py-2.5 font-medium">Category</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-ink/60">No prayer requests yet.</td></tr>
            )}
            {items.map((p) => (
              <tr key={p.id} className="border-t border-navy-100">
                <td className="px-4 py-2.5">{new Date(p.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    {p.name}
                    {p.isPrivate && <Lock size={12} className="text-crimson" aria-label="Private" />}
                  </div>
                  {p.contact && <div className="text-xs text-ink/60">{p.contact}</div>}
                </td>
                <td className="px-4 py-2.5">{p.category}</td>
                <td className="px-4 py-2.5">
                  <span className={`badge ${STATUS_COLOR[p.status]}`}>{p.status}</span>
                </td>
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => setSelected(p)} className="p-1.5 rounded hover:bg-navy-50" aria-label="View"><Eye size={15}/></button>
                  <button onClick={() => setConfirming(p)} className="p-1.5 rounded hover:bg-red-50 text-crimson ml-1" aria-label="Delete"><Trash2 size={15}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="text-xs text-ink/60">{new Date(selected.createdAt).toLocaleString()}</div>
              <span className={`badge ${STATUS_COLOR[selected.status]}`}>{selected.status}</span>
            </div>
            <h3 className="font-serif text-xl text-navy-900 mt-1 flex items-center gap-2">
              {selected.category}
              {selected.isPrivate && <span className="badge bg-red-50 text-crimson"><Lock size={12}/> Private</span>}
            </h3>
            <div className="text-sm text-ink/70">From {selected.name}{selected.contact && ` • ${selected.contact}`}</div>
            <div className="mt-4 text-sm whitespace-pre-line text-ink/90">{selected.message}</div>

            <div className="mt-6">
              <div className="text-xs font-medium text-ink/60 uppercase tracking-wide mb-2">Update status</div>
              <div className="flex gap-2 flex-wrap">
                {(['NEW','PRAYING','ANSWERED','ARCHIVED'] as Status[]).map((s) => (
                  <button key={s} onClick={() => setStatus(selected, s)} disabled={busy || selected.status === s}
                    className={`btn ${selected.status === s ? 'bg-navy-900 text-white' : 'border border-navy-200 text-navy-900 hover:bg-navy-50'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelected(null)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirming}
        title="Delete this prayer request?"
        message="This request will be permanently removed. Consider archiving instead."
        onCancel={() => setConfirming(null)}
        onConfirm={remove}
        busy={busy}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Eye, MailOpen } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesClient({ initial }: { initial: Message[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Message[]>(initial);
  const [selected, setSelected] = useState<Message | null>(null);
  const [confirming, setConfirming] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);

  async function toggleRead(m: Message) {
    setBusy(true);
    const res = await fetch(`/api/messages/${m.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !m.read }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((p) => (p.id === m.id ? { ...p, read: updated.read } : p)));
      if (selected?.id === m.id) setSelected({ ...m, read: updated.read });
      router.refresh();
    }
    setBusy(false);
  }

  async function remove() {
    if (!confirming) return;
    setBusy(true);
    const res = await fetch(`/api/messages/${confirming.id}`, { method: 'DELETE' });
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
      <h1 className="font-serif text-2xl text-navy-900 mb-5">Contact Messages</h1>
      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-navy-50 text-navy-900">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">When</th>
              <th className="text-left px-4 py-2.5 font-medium">From</th>
              <th className="text-left px-4 py-2.5 font-medium">Subject</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-ink/60">No messages yet.</td></tr>
            )}
            {items.map((m) => (
              <tr key={m.id} className={`border-t border-navy-100 ${m.read ? 'text-ink/70' : 'font-medium'}`}>
                <td className="px-4 py-2.5">{new Date(m.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2.5">
                  <div>{m.name}</div>
                  <div className="text-xs text-ink/60">{m.email}</div>
                </td>
                <td className="px-4 py-2.5">{m.subject}</td>
                <td className="px-4 py-2.5">
                  {m.read ? <span className="badge bg-navy-50 text-navy-900">Read</span> : <span className="badge bg-gold-100 text-gold-700">New</span>}
                </td>
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => setSelected(m)} className="p-1.5 rounded hover:bg-navy-50" aria-label="View"><Eye size={15}/></button>
                  <button onClick={() => toggleRead(m)} disabled={busy} className="p-1.5 rounded hover:bg-navy-50 ml-1" aria-label="Toggle read"><MailOpen size={15}/></button>
                  <button onClick={() => setConfirming(m)} className="p-1.5 rounded hover:bg-red-50 text-crimson ml-1" aria-label="Delete"><Trash2 size={15}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-ink/60">{new Date(selected.createdAt).toLocaleString()}</div>
            <h3 className="font-serif text-xl text-navy-900 mt-1">{selected.subject}</h3>
            <div className="text-sm text-ink/70">From {selected.name} &lt;{selected.email}&gt;{selected.phone && ` • ${selected.phone}`}</div>
            <div className="mt-4 text-sm whitespace-pre-line text-ink/90">{selected.message}</div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => toggleRead(selected)} className="btn-ghost" disabled={busy}>
                Mark as {selected.read ? 'unread' : 'read'}
              </button>
              <button onClick={() => setSelected(null)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirming}
        title="Delete this message?"
        message="This contact message will be permanently removed."
        onCancel={() => setConfirming(null)}
        onConfirm={remove}
        busy={busy}
      />
    </div>
  );
}

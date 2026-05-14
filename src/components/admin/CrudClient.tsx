'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

export type FieldDef =
  | { name: string; label: string; type: 'text' | 'email' | 'url' | 'number'; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'textarea'; rows?: number; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'select'; options: { value: string; label: string }[]; required?: boolean }
  | { name: string; label: string; type: 'datetime' | 'date'; required?: boolean }
  | { name: string; label: string; type: 'checkbox' };

export type Column = {
  key: string;
  label: string;
  format?: 'text' | 'date' | 'datetime' | 'truncate' | 'yesno';
  truncate?: number;
};

type Props<T extends { id: string }> = {
  title: string;
  endpoint: string;
  initialItems: T[];
  columns: Column[];
  fields: FieldDef[];
};

function fmtDtLocal(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fmtDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function renderCell(val: unknown, col: Column): string {
  if (val == null || val === '') return '—';
  switch (col.format) {
    case 'date':
      return new Date(String(val)).toLocaleDateString();
    case 'datetime':
      return new Date(String(val)).toLocaleString();
    case 'truncate': {
      const s = String(val);
      const max = col.truncate ?? 80;
      return s.length > max ? s.slice(0, max) + '…' : s;
    }
    case 'yesno':
      return val ? 'Yes' : 'No';
    case 'text':
    default:
      return String(val);
  }
}

export default function CrudClient<T extends { id: string }>({
  title,
  endpoint,
  initialItems,
  columns,
  fields,
}: Props<T>) {
  const router = useRouter();
  const [items, setItems] = useState<T[]>(initialItems);
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirming, setConfirming] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCreate() { setEditing(null); setCreating(true); setError(null); }
  function openEdit(row: T) { setEditing(row); setCreating(false); setError(null); }
  function close() { setCreating(false); setEditing(null); setError(null); }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    for (const f of fields) {
      const raw = fd.get(f.name);
      if (f.type === 'checkbox') body[f.name] = raw === 'on';
      else if (f.type === 'number') body[f.name] = raw ? Number(raw) : 0;
      else if ((f.type === 'datetime' || f.type === 'date') && typeof raw === 'string' && raw) {
        // Browser interprets the bare local-time string in the user's timezone;
        // .toISOString() converts to UTC so the server stores the right moment.
        body[f.name] = new Date(raw).toISOString();
      }
      else body[f.name] = raw ?? '';
    }
    try {
      const url = editing ? `${endpoint}/${editing.id}` : endpoint;
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.error === 'string' ? data.error : 'Save failed');
      }
      const saved = (await res.json()) as T;
      setItems((prev) => (editing ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev]));
      close();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirming) return;
    setBusy(true);
    try {
      const res = await fetch(`${endpoint}/${confirming.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((prev) => prev.filter((p) => p.id !== confirming.id));
      setConfirming(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  }

  const dialogOpen = creating || !!editing;
  const initialValues: Record<string, unknown> = (editing as unknown as Record<string, unknown>) ?? {};

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-serif text-2xl text-navy-900">{title}</h1>
        <button onClick={openCreate} className="btn-primary"><Plus size={16}/> New</button>
      </div>

      {error && !dialogOpen && (
        <div className="mb-3 p-3 rounded-lg bg-red-50 text-crimson text-sm">{error}</div>
      )}

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-navy-50 text-navy-900">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-2.5 font-medium">{c.label}</th>
              ))}
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-ink/60">No items yet.</td></tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-navy-100">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2.5 align-top">
                    {renderCell((row as Record<string, unknown>)[c.key], c)}
                  </td>
                ))}
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(row)} className="p-1.5 rounded hover:bg-navy-50" aria-label="Edit">
                    <Pencil size={15}/>
                  </button>
                  <button onClick={() => setConfirming(row)} className="p-1.5 rounded hover:bg-red-50 text-crimson ml-1" aria-label="Delete">
                    <Trash2 size={15}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 flex items-center justify-center p-4" onClick={close}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={close} className="absolute top-3 right-3 p-1 rounded hover:bg-navy-50" aria-label="Close"><X size={18}/></button>
            <h3 className="font-serif text-xl text-navy-900 mb-4">{editing ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}</h3>
            {error && <div className="mb-3 p-3 rounded-lg bg-red-50 text-crimson text-sm">{error}</div>}
            <form onSubmit={save} className="space-y-3">
              {fields.map((f) => {
                const v = initialValues[f.name];
                return (
                  <div key={f.name}>
                    <label className="label" htmlFor={`f-${f.name}`}>{f.label}</label>
                    {f.type === 'textarea' && (
                      <textarea id={`f-${f.name}`} name={f.name} rows={f.rows ?? 4}
                        defaultValue={typeof v === 'string' ? v : ''} required={f.required}
                        placeholder={f.placeholder} className="textarea" />
                    )}
                    {f.type === 'select' && (
                      <select id={`f-${f.name}`} name={f.name} defaultValue={typeof v === 'string' ? v : ''}
                        required={f.required} className="select">
                        <option value="">— Select —</option>
                        {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    )}
                    {(f.type === 'text' || f.type === 'email' || f.type === 'url' || f.type === 'number') && (
                      <input id={`f-${f.name}`} name={f.name} type={f.type}
                        defaultValue={v == null ? '' : (typeof v === 'number' ? v : String(v))}
                        required={f.required} placeholder={f.placeholder} className="input" />
                    )}
                    {f.type === 'datetime' && (
                      <input id={`f-${f.name}`} name={f.name} type="datetime-local"
                        defaultValue={v instanceof Date ? fmtDtLocal(v) : (typeof v === 'string' && v ? fmtDtLocal(new Date(v)) : '')}
                        required={f.required} className="input" />
                    )}
                    {f.type === 'date' && (
                      <input id={`f-${f.name}`} name={f.name} type="date"
                        defaultValue={v instanceof Date ? fmtDate(v) : (typeof v === 'string' && v ? fmtDate(new Date(v)) : '')}
                        required={f.required} className="input" />
                    )}
                    {f.type === 'checkbox' && (
                      <label className="inline-flex items-center gap-2 text-sm text-ink/80">
                        <input id={`f-${f.name}`} name={f.name} type="checkbox" defaultChecked={!!v} /> {f.label}
                      </label>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={close} className="btn-ghost">Cancel</button>
                <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirming}
        title="Delete this item?"
        message="This will permanently remove the record. This action cannot be undone."
        onCancel={() => setConfirming(null)}
        onConfirm={remove}
        busy={busy}
      />
    </div>
  );
}

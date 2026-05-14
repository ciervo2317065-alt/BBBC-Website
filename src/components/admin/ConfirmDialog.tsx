'use client';

import { X } from 'lucide-react';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  onCancel,
  onConfirm,
  busy = false,
}: {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  busy?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-navy-900/60 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onCancel} className="absolute top-3 right-3 p-1 rounded hover:bg-navy-50" aria-label="Close">
          <X size={18} />
        </button>
        <h3 className="font-serif text-xl text-navy-900">{title}</h3>
        <p className="text-sm text-ink/70 mt-2">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-ghost">Cancel</button>
          <button onClick={onConfirm} className="btn-danger" disabled={busy}>
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

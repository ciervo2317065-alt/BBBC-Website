'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Megaphone, X, Pin } from 'lucide-react';

type Item = { id: string; title: string; body: string; pinned: boolean };

export default function AnnouncementBannerClient({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Hide on admin routes — banner is for public visitors only.
  if (pathname?.startsWith('/admin')) return null;

  const visible = items.filter((i) => !dismissed.has(i.id));
  if (visible.length === 0) return null;

  return (
    <div className="bg-navy-900 text-white border-b border-gold-400/30">
      {visible.map((a) => (
        <div
          key={a.id}
          className="container-page py-2.5 flex items-start gap-3 text-sm"
        >
          <div className="shrink-0 mt-0.5">
            {a.pinned ? (
              <Pin className="text-gold-400" size={16} />
            ) : (
              <Megaphone className="text-gold-400" size={16} />
            )}
          </div>
          <div className="flex-1 leading-snug">
            <span className="font-semibold">{a.title}</span>
            <span className="text-white/80"> — {a.body}</span>
          </div>
          {!a.pinned && (
            <button
              onClick={() =>
                setDismissed((prev) => {
                  const next = new Set(prev);
                  next.add(a.id);
                  return next;
                })
              }
              className="p-1 rounded hover:bg-white/10 shrink-0"
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

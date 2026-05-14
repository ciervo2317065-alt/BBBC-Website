'use client';

import { useMemo, useState } from 'react';
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  addDays,
} from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CATEGORY_COLOR } from '@/lib/eventColors';
import { WEEKLY_SERVICES, DAY_INDEX } from '@/lib/services';

type DbEvent = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  category: 'SERVICE' | 'SPECIAL' | 'ANNOUNCEMENT' | 'MEETING';
  ministry: { name: string } | null;
};

type CalEvent = {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  endDate: Date | null;
  location: string | null;
  category: keyof typeof CATEGORY_COLOR;
  ministry: string | null;
  recurring: boolean;
};

function recurringForRange(start: Date, end: Date): CalEvent[] {
  const out: CalEvent[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    for (const s of WEEKLY_SERVICES) {
      if (d.getDay() === DAY_INDEX[s.day]) {
        const date = new Date(d);
        date.setHours(s.hour, s.minute, 0, 0);
        out.push({
          id: `recurring-${date.toISOString()}-${s.name}`,
          title: s.name,
          description: 'Weekly recurring service',
          date,
          endDate: null,
          location: null,
          category: 'SERVICE',
          ministry: null,
          recurring: true,
        });
      }
    }
  }
  return out;
}

export default function EventCalendar({ events }: { events: DbEvent[] }) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [view, setView] = useState<'month' | 'list'>('month');
  const [selected, setSelected] = useState<CalEvent | null>(null);

  const dbEvents: CalEvent[] = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        date: new Date(e.startsAt),
        endDate: e.endsAt ? new Date(e.endsAt) : null,
        location: e.location,
        category: e.category,
        ministry: e.ministry?.name ?? null,
        recurring: false,
      })),
    [events],
  );

  const gridStart = startOfWeek(startOfMonth(cursor));
  const gridEnd = endOfWeek(endOfMonth(cursor));

  const allEvents = useMemo(
    () => [...recurringForRange(gridStart, gridEnd), ...dbEvents].sort((a, b) => +a.date - +b.date),
    [gridStart, gridEnd, dbEvents],
  );

  const days: Date[] = [];
  for (let d = new Date(gridStart); d <= gridEnd; d = addDays(d, 1)) days.push(new Date(d));

  const upcoming = useMemo(() => {
    const now = new Date();
    const horizon = addMonths(now, 3);
    return [...recurringForRange(now, horizon), ...dbEvents.filter((e) => e.date >= now)]
      .sort((a, b) => +a.date - +b.date)
      .slice(0, 30);
  }, [dbEvents]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setCursor(addMonths(cursor, -1))} className="p-2 rounded hover:bg-navy-50" aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <div className="font-serif text-xl text-navy-900 min-w-[180px] text-center">
            {format(cursor, 'MMMM yyyy')}
          </div>
          <button onClick={() => setCursor(addMonths(cursor, 1))} className="p-2 rounded hover:bg-navy-50" aria-label="Next month">
            <ChevronRight size={18} />
          </button>
          <button onClick={() => setCursor(startOfMonth(new Date()))} className="btn-ghost text-xs ml-2">
            Today
          </button>
        </div>
        <div className="inline-flex rounded-full border border-navy-200 bg-white overflow-hidden text-sm">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-1.5 ${view === 'month' ? 'bg-navy-900 text-white' : 'text-navy-900'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-1.5 ${view === 'list' ? 'bg-navy-900 text-white' : 'text-navy-900'}`}
          >
            List
          </button>
        </div>
      </div>

      <Legend />

      {view === 'month' ? (
        <div className="mt-4 rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-soft">
          <div className="grid grid-cols-7 bg-navy-50 text-xs font-medium text-navy-900">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="px-2 py-2 text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((d) => {
              const dayEvents = allEvents.filter((e) => isSameDay(e.date, d));
              const inMonth = isSameMonth(d, cursor);
              const isToday = isSameDay(d, new Date());
              return (
                <div
                  key={d.toISOString()}
                  className={`min-h-[110px] border-t border-l border-navy-100 p-2 ${!inMonth ? 'bg-navy-50/30 text-ink/40' : 'bg-white'}`}
                >
                  <div className={`text-xs font-medium mb-1 ${isToday ? 'text-crimson' : 'text-ink/70'}`}>
                    {format(d, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((e) => {
                      const c = CATEGORY_COLOR[e.category];
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={`w-full text-left text-[11px] truncate rounded px-1.5 py-0.5 ${c.bg} ${c.text} hover:opacity-90`}
                          title={e.title}
                        >
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot} mr-1 align-middle`} />
                          {format(e.date, 'h:mma')} {e.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-[11px] text-ink/60">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {upcoming.length === 0 && (
            <div className="card text-center text-ink/70">No upcoming events.</div>
          )}
          {upcoming.map((e) => {
            const c = CATEGORY_COLOR[e.category];
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className="card card-hover text-left flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="sm:w-32 shrink-0">
                  <div className="text-xs uppercase tracking-wide text-ink/60">{format(e.date, 'EEE')}</div>
                  <div className="text-2xl font-serif text-navy-900">{format(e.date, 'd MMM')}</div>
                  <div className="text-sm text-gold-600">{format(e.date, 'h:mm a')}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge ${c.bg} ${c.text}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot} mr-1`} />
                      {c.label}
                    </span>
                    {e.recurring && <span className="badge bg-navy-50 text-navy-900">Weekly</span>}
                    {e.ministry && <span className="badge bg-gold-50 text-gold-700">{e.ministry}</span>}
                  </div>
                  <div className="mt-1 font-serif text-lg text-navy-900">{e.title}</div>
                  {e.location && <div className="text-sm text-ink/70">{e.location}</div>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected && <EventDetail event={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {(Object.keys(CATEGORY_COLOR) as Array<keyof typeof CATEGORY_COLOR>).map((k) => {
        const c = CATEGORY_COLOR[k];
        return (
          <span key={k} className="inline-flex items-center gap-1.5 text-ink/70">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.dot}`} /> {c.label}
          </span>
        );
      })}
    </div>
  );
}

function EventDetail({ event, onClose }: { event: CalEvent; onClose: () => void }) {
  const c = CATEGORY_COLOR[event.category];
  return (
    <div className="fixed inset-0 z-50 bg-navy-900/60 flex items-end sm:items-center justify-center p-3" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded hover:bg-navy-50" aria-label="Close">
          <X size={18} />
        </button>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`badge ${c.bg} ${c.text}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot} mr-1`} />
            {c.label}
          </span>
          {event.recurring && <span className="badge bg-navy-50 text-navy-900">Weekly</span>}
          {event.ministry && <span className="badge bg-gold-50 text-gold-700">{event.ministry}</span>}
        </div>
        <h3 className="font-serif text-2xl text-navy-900">{event.title}</h3>
        <div className="mt-2 text-sm text-ink/70">
          {format(event.date, 'EEEE, MMMM d, yyyy • h:mm a')}
          {event.endDate && <> – {format(event.endDate, 'h:mm a')}</>}
        </div>
        {event.location && <div className="text-sm text-ink/70">{event.location}</div>}
        {event.description && (
          <p className="mt-4 text-sm text-ink/90 leading-relaxed whitespace-pre-line">{event.description}</p>
        )}
      </div>
    </div>
  );
}

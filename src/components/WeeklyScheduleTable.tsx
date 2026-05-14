import { WEEKLY_SERVICES } from '@/lib/services';

export default function WeeklyScheduleTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-soft">
      <table className="w-full text-left">
        <thead className="bg-navy-900 text-white text-sm">
          <tr>
            <th className="px-4 py-3 font-medium">Day</th>
            <th className="px-4 py-3 font-medium">Activity</th>
            <th className="px-4 py-3 font-medium">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {WEEKLY_SERVICES.map((s, i) => (
            <tr key={`${s.day}-${s.name}`} className={i % 2 ? 'bg-navy-50/40' : ''}>
              <td className="px-4 py-3 font-medium text-navy-900">{s.day}</td>
              <td className="px-4 py-3 text-ink/90">{s.name}</td>
              <td className="px-4 py-3 text-gold-600 font-medium">{s.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

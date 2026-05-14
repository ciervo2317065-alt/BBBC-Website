import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { CalendarDays, Mail, HandHelping, Music, Video, Users, UserCog, Megaphone } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [events, messages, unreadMessages, prayers, newPrayers, ministries, leaders, songs, videos, announcements] = await Promise.all([
    prisma.event.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.prayerRequest.count(),
    prisma.prayerRequest.count({ where: { status: 'NEW' } }),
    prisma.ministry.count(),
    prisma.leader.count(),
    prisma.song.count(),
    prisma.video.count(),
    prisma.announcement.count(),
  ]);

  const stats = [
    { label: 'Events', value: events, href: '/admin/events', icon: CalendarDays, accent: 'text-navy-700' },
    { label: 'Messages', value: messages, badge: unreadMessages ? `${unreadMessages} unread` : null, href: '/admin/messages', icon: Mail, accent: 'text-gold-600' },
    { label: 'Prayer Requests', value: prayers, badge: newPrayers ? `${newPrayers} new` : null, href: '/admin/prayer-requests', icon: HandHelping, accent: 'text-crimson' },
    { label: 'Ministries', value: ministries, href: '/admin/ministries', icon: Users, accent: 'text-navy-700' },
    { label: 'Leadership', value: leaders, href: '/admin/leaders', icon: UserCog, accent: 'text-navy-700' },
    { label: 'Songs', value: songs, href: '/admin/songs', icon: Music, accent: 'text-gold-600' },
    { label: 'Videos', value: videos, href: '/admin/videos', icon: Video, accent: 'text-crimson' },
    { label: 'Announcements', value: announcements, href: '/admin/announcements', icon: Megaphone, accent: 'text-gold-600' },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-navy-900 mb-5">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card card-hover">
            <div className="flex items-center justify-between">
              <s.icon className={s.accent} />
              {s.badge && <span className="badge bg-crimson text-white">{s.badge}</span>}
            </div>
            <div className="mt-4 text-3xl font-serif text-navy-900">{s.value}</div>
            <div className="text-sm text-ink/60">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCog,
  Music,
  Video,
  Megaphone,
  Mail,
  HandHelping,
  LogOut,
  Church,
} from 'lucide-react';

const ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/events', label: 'Events', icon: CalendarDays },
  { href: '/admin/ministries', label: 'Ministries', icon: Users },
  { href: '/admin/leaders', label: 'Leadership', icon: UserCog },
  { href: '/admin/songs', label: 'Songs', icon: Music },
  { href: '/admin/videos', label: 'Videos', icon: Video },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/prayer-requests', label: 'Prayer Requests', icon: HandHelping },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 bg-navy-900 text-white min-h-screen flex flex-col">
      <div className="px-5 py-5 flex items-center gap-2 border-b border-white/10">
        <Church className="text-gold-400" size={20} />
        <div>
          <div className="font-serif text-sm leading-tight">BBBC Admin</div>
          <div className="text-[10px] text-white/60">Content management</div>
        </div>
      </div>
      <nav className="flex-1 py-3 px-2 space-y-1">
        {ITEMS.map((i) => {
          const active = i.exact ? pathname === i.href : pathname?.startsWith(i.href);
          return (
            <Link
              key={i.href}
              href={i.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active ? 'bg-gold-400 text-navy-900' : 'text-white/85 hover:bg-white/5'
              }`}
            >
              <i.icon size={16} /> {i.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/85 hover:bg-white/5"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </aside>
  );
}

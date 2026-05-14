'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/worship', label: 'Worship & Services' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/events', label: 'Events Calendar' },
  { href: '/songs', label: 'Songs & Videos' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="bg-white/90 backdrop-blur border-b border-navy-100">
      <div className="container-page flex items-center justify-between py-3 gap-4">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Logo />
          <div className="leading-tight hidden sm:block">
            <div className="text-navy-900 font-serif font-semibold text-sm md:text-base">
              Believers Bible Baptist Church
            </div>
            <div className="text-[11px] text-navy-700/70">
              From the Cross, through the Church, to the World
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== '/' && pathname?.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  active ? 'bg-navy-900 text-white' : 'text-navy-900 hover:bg-navy-50'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-navy-900"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-navy-100 bg-white">
          <div className="container-page py-2 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-sm font-medium text-navy-900 hover:bg-navy-50"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

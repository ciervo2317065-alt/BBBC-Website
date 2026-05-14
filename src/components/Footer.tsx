'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { CHURCH } from '@/lib/services';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-navy-900 text-white mt-16">
      <div className="container-page py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Logo />
            <div className="font-serif text-lg">{CHURCH.name}</div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            A Bible-centered church family proclaiming Christ — from the Cross, through the
            Church, to the world.
          </p>
        </div>
        <div>
          <h4 className="text-gold-400 font-serif text-lg mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex gap-2 items-start">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {CHURCH.address}
            </li>
            <li className="flex gap-2 items-start">
              <Phone size={16} className="mt-0.5 shrink-0" /> {CHURCH.phone}
            </li>
            <li className="flex gap-2 items-start">
              <Mail size={16} className="mt-0.5 shrink-0" /> {CHURCH.email}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold-400 font-serif text-lg mb-3">Connect</h4>
          <div className="flex gap-3">
            <a
              href={CHURCH.socials.facebook}
              aria-label="Facebook"
              className="p-2 rounded-full border border-white/20 hover:bg-white/10"
            >
              <Facebook size={18} />
            </a>
            <a
              href={CHURCH.socials.youtube}
              aria-label="YouTube"
              className="p-2 rounded-full border border-white/20 hover:bg-white/10"
            >
              <Youtube size={18} />
            </a>
          </div>
          <div className="mt-6 text-sm">
            <Link href="/admin/login" className="text-white/60 hover:text-gold-400">
              Admin login
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-4 text-xs text-white/60 flex justify-between flex-wrap gap-2">
          <div>© {new Date().getFullYear()} {CHURCH.name}. All rights reserved.</div>
          <div className="italic">“{CHURCH.tagline}”</div>
        </div>
      </div>
    </footer>
  );
}

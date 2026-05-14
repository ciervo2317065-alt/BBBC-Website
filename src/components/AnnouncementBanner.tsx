import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';
import AnnouncementBannerClient from './AnnouncementBannerClient';

export default async function AnnouncementBanner() {
  noStore();
  const now = new Date();
  const announcements = await prisma.announcement.findMany({
    where: {
      startsAt: { lte: now },
      OR: [{ endsAt: null }, { endsAt: { gte: now } }],
    },
    orderBy: [{ pinned: 'desc' }, { startsAt: 'desc' }],
  });

  if (announcements.length === 0) return null;

  return (
    <AnnouncementBannerClient
      items={announcements.map((a) => ({
        id: a.id,
        title: a.title,
        body: a.body,
        pinned: a.pinned,
      }))}
    />
  );
}

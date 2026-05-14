import { prisma } from '@/lib/prisma';
import PrayerRequestsClient from '@/components/admin/PrayerRequestsClient';

export const dynamic = 'force-dynamic';

export default async function AdminPrayerRequestsPage() {
  const rows = await prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <PrayerRequestsClient
      initial={rows.map((r) => ({
        id: r.id, name: r.name, contact: r.contact, category: r.category,
        message: r.message, isPrivate: r.isPrivate, status: r.status,
        createdAt: r.createdAt.toISOString(),
      }))}
    />
  );
}

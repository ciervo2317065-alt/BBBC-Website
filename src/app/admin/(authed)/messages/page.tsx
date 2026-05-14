import { prisma } from '@/lib/prisma';
import MessagesClient from '@/components/admin/MessagesClient';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <MessagesClient
      initial={rows.map((r) => ({
        id: r.id, name: r.name, email: r.email, phone: r.phone,
        subject: r.subject, message: r.message, read: r.read,
        createdAt: r.createdAt.toISOString(),
      }))}
    />
  );
}

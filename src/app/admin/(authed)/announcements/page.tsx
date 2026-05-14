import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = { id: string; title: string; body: string; startsAt: string; endsAt: string | null; pinned: boolean };

export default async function AdminAnnouncementsPage() {
  const rows = await prisma.announcement.findMany({ orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }] });

  const fields: FieldDef[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'body', label: 'Message', type: 'textarea', rows: 5, required: true },
    { name: 'startsAt', label: 'Show from', type: 'datetime' },
    { name: 'endsAt', label: 'Hide after (optional)', type: 'datetime' },
    { name: 'pinned', label: 'Pinned', type: 'checkbox' },
  ];

  return (
    <CrudClient<Row>
      title="Announcements"
      endpoint="/api/announcements"
      initialItems={rows.map((r) => ({
        id: r.id, title: r.title, body: r.body,
        startsAt: r.startsAt.toISOString(),
        endsAt: r.endsAt ? r.endsAt.toISOString() : null,
        pinned: r.pinned,
      }))}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'pinned', label: 'Pinned', format: 'yesno' },
        { key: 'startsAt', label: 'From', format: 'datetime' },
      ]}
    />
  );
}

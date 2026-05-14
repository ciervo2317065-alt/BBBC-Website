import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  category: string;
  imageUrl: string | null;
  ministryId: string | null;
};

export default async function AdminEventsPage() {
  const [events, ministries] = await Promise.all([
    prisma.event.findMany({ orderBy: { startsAt: 'asc' } }),
    prisma.ministry.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);
  const initial: Row[] = events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    startsAt: e.startsAt.toISOString(),
    endsAt: e.endsAt ? e.endsAt.toISOString() : null,
    location: e.location,
    category: e.category,
    imageUrl: e.imageUrl,
    ministryId: e.ministryId,
  }));

  const fields: FieldDef[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'startsAt', label: 'Starts at', type: 'datetime', required: true },
    { name: 'endsAt', label: 'Ends at (optional)', type: 'datetime' },
    { name: 'location', label: 'Location', type: 'text' },
    {
      name: 'category', label: 'Category', type: 'select', required: true,
      options: [
        { value: 'SERVICE', label: 'Worship Service (blue)' },
        { value: 'SPECIAL', label: 'Special Event (gold)' },
        { value: 'ANNOUNCEMENT', label: 'Announcement (red)' },
        { value: 'MEETING', label: 'Meeting (gray)' },
      ],
    },
    {
      name: 'ministryId', label: 'Ministry (optional)', type: 'select',
      options: ministries.map((m) => ({ value: m.id, label: m.name })),
    },
    { name: 'imageUrl', label: 'Image (optional)', type: 'image' },
  ];

  return (
    <CrudClient<Row>
      title="Events"
      endpoint="/api/events"
      initialItems={initial}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'startsAt', label: 'When', format: 'datetime' },
        { key: 'category', label: 'Category' },
        { key: 'location', label: 'Location' },
      ]}
    />
  );
}

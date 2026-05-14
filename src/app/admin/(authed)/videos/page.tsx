import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = { id: string; title: string; description: string | null; videoUrl: string; thumbnail: string | null; date: string | null; ministry: string | null };

export default async function AdminVideosPage() {
  const rows = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } });

  const fields: FieldDef[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description (optional)', type: 'textarea', rows: 3 },
    { name: 'videoUrl', label: 'Video URL (YouTube / Facebook)', type: 'url', required: true },
    { name: 'thumbnail', label: 'Thumbnail URL (optional)', type: 'url' },
    { name: 'date', label: 'Date (optional)', type: 'date' },
    { name: 'ministry', label: 'Ministry (optional)', type: 'text' },
  ];

  return (
    <CrudClient<Row>
      title="Videos"
      endpoint="/api/videos"
      initialItems={rows.map((r) => ({
        id: r.id, title: r.title, description: r.description, videoUrl: r.videoUrl,
        thumbnail: r.thumbnail, date: r.date ? r.date.toISOString() : null, ministry: r.ministry,
      }))}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'ministry', label: 'Ministry', render: (r) => r.ministry ?? '—' },
        { key: 'date', label: 'Date', render: (r) => (r.date ? new Date(r.date).toLocaleDateString() : '—') },
      ]}
      toFormValues={(r) => ({
        title: r.title, description: r.description ?? '', videoUrl: r.videoUrl,
        thumbnail: r.thumbnail ?? '', date: r.date ?? '', ministry: r.ministry ?? '',
      })}
    />
  );
}

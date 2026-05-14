import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = { id: string; title: string; lyrics: string; author: string | null; category: string };

export default async function AdminSongsPage() {
  const rows = await prisma.song.findMany({ orderBy: { createdAt: 'desc' } });

  const fields: FieldDef[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author / Source (optional)', type: 'text' },
    {
      name: 'category', label: 'Category', type: 'select', required: true,
      options: [
        { value: 'Hymn', label: 'Hymn' },
        { value: 'Choir', label: 'Choir' },
        { value: 'Special Number', label: 'Special Number' },
        { value: 'Congregational', label: 'Congregational' },
      ],
    },
    { name: 'lyrics', label: 'Lyrics', type: 'textarea', rows: 10, required: true },
  ];

  return (
    <CrudClient<Row>
      title="Songs"
      endpoint="/api/songs"
      initialItems={rows.map((r) => ({ id: r.id, title: r.title, lyrics: r.lyrics, author: r.author, category: r.category }))}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'category', label: 'Category' },
      ]}
    />
  );
}

import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = { id: string; name: string; description: string; leader: string | null; imageUrl: string | null };

export default async function AdminMinistriesPage() {
  const rows = await prisma.ministry.findMany({ orderBy: { name: 'asc' } });

  const fields: FieldDef[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, required: true },
    { name: 'leader', label: 'Leader (optional)', type: 'text' },
    { name: 'imageUrl', label: 'Image URL (optional)', type: 'url' },
  ];

  return (
    <CrudClient<Row>
      title="Ministries"
      endpoint="/api/ministries"
      initialItems={rows.map((r) => ({ id: r.id, name: r.name, description: r.description, leader: r.leader, imageUrl: r.imageUrl }))}
      fields={fields}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'leader', label: 'Leader' },
        { key: 'description', label: 'Description', format: 'truncate', truncate: 80 },
      ]}
    />
  );
}

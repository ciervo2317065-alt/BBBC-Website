import { prisma } from '@/lib/prisma';
import CrudClient, { type FieldDef } from '@/components/admin/CrudClient';

export const dynamic = 'force-dynamic';

type Row = { id: string; name: string; position: string; bio: string | null; imageUrl: string | null; order: number };

export default async function AdminLeadersPage() {
  const rows = await prisma.leader.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });

  const fields: FieldDef[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'position', label: 'Position / Role', type: 'text', required: true },
    { name: 'bio', label: 'Short bio', type: 'textarea', rows: 3 },
    { name: 'imageUrl', label: 'Photo URL (optional)', type: 'url' },
    { name: 'order', label: 'Order (lower shows first)', type: 'number' },
  ];

  return (
    <CrudClient<Row>
      title="Leadership"
      endpoint="/api/leaders"
      initialItems={rows.map((r) => ({ id: r.id, name: r.name, position: r.position, bio: r.bio, imageUrl: r.imageUrl, order: r.order }))}
      fields={fields}
      columns={[
        { key: 'order', label: '#' },
        { key: 'name', label: 'Name' },
        { key: 'position', label: 'Position' },
      ]}
      toFormValues={(r) => ({ name: r.name, position: r.position, bio: r.bio ?? '', imageUrl: r.imageUrl ?? '', order: r.order })}
    />
  );
}

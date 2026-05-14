import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { announcementSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = announcementSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const updated = await prisma.announcement.update({
    where: { id },
    data: {
      ...(d.title !== undefined && { title: d.title }),
      ...(d.body !== undefined && { body: d.body }),
      ...(d.startsAt !== undefined && { startsAt: d.startsAt }),
      ...(d.endsAt !== undefined && { endsAt: d.endsAt ?? null }),
      ...(d.pinned !== undefined && { pinned: !!d.pinned }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.announcement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

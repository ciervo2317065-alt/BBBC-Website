import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = eventSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const updated = await prisma.event.update({
    where: { id },
    data: {
      ...(d.title !== undefined && { title: d.title }),
      ...(d.description !== undefined && { description: d.description || null }),
      ...(d.startsAt !== undefined && { startsAt: d.startsAt }),
      ...(d.endsAt !== undefined && { endsAt: d.endsAt ?? null }),
      ...(d.location !== undefined && { location: d.location || null }),
      ...(d.category !== undefined && { category: d.category }),
      ...(d.imageUrl !== undefined && { imageUrl: d.imageUrl || null }),
      ...(d.ministryId !== undefined && { ministryId: d.ministryId || null }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

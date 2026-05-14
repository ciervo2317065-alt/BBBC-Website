import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status = body.status as 'NEW' | 'PRAYING' | 'ANSWERED' | 'ARCHIVED' | undefined;
  if (!status || !['NEW', 'PRAYING', 'ANSWERED', 'ARCHIVED'].includes(status))
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  const updated = await prisma.prayerRequest.update({ where: { id }, data: { status } });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.prayerRequest.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

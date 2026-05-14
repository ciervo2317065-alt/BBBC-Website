import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { leaderSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = leaderSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const updated = await prisma.leader.update({
    where: { id },
    data: {
      ...(d.name !== undefined && { name: d.name }),
      ...(d.position !== undefined && { position: d.position }),
      ...(d.bio !== undefined && { bio: d.bio || null }),
      ...(d.imageUrl !== undefined && { imageUrl: d.imageUrl || null }),
      ...(d.order !== undefined && { order: d.order }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.leader.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { videoSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = videoSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const updated = await prisma.video.update({
    where: { id },
    data: {
      ...(d.title !== undefined && { title: d.title }),
      ...(d.description !== undefined && { description: d.description || null }),
      ...(d.videoUrl !== undefined && { videoUrl: d.videoUrl }),
      ...(d.thumbnail !== undefined && { thumbnail: d.thumbnail || null }),
      ...(d.date !== undefined && { date: d.date ?? null }),
      ...(d.ministry !== undefined && { ministry: d.ministry || null }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.video.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

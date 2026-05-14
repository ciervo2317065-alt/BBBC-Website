import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { songSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = songSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const updated = await prisma.song.update({
    where: { id },
    data: {
      ...(d.title !== undefined && { title: d.title }),
      ...(d.lyrics !== undefined && { lyrics: d.lyrics }),
      ...(d.author !== undefined && { author: d.author || null }),
      ...(d.category !== undefined && { category: d.category }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.song.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

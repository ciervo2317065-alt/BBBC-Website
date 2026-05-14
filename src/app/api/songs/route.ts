import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { songSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  return NextResponse.json(await prisma.song.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = songSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.song.create({
    data: { title: d.title, lyrics: d.lyrics, author: d.author || null, category: d.category },
  });
  return NextResponse.json(created, { status: 201 });
}

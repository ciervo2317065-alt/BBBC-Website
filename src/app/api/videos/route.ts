import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { videoSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  return NextResponse.json(await prisma.video.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = videoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.video.create({
    data: {
      title: d.title,
      description: d.description || null,
      videoUrl: d.videoUrl,
      thumbnail: d.thumbnail || null,
      date: d.date ?? null,
      ministry: d.ministry || null,
    },
  });
  return NextResponse.json(created, { status: 201 });
}

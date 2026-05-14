import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { announcementSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  return NextResponse.json(
    await prisma.announcement.findMany({ orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }] }),
  );
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.announcement.create({
    data: {
      title: d.title,
      body: d.body,
      startsAt: d.startsAt ?? new Date(),
      endsAt: d.endsAt ?? null,
      pinned: !!d.pinned,
    },
  });
  return NextResponse.json(created, { status: 201 });
}

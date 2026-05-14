import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  const items = await prisma.event.findMany({
    orderBy: { startsAt: 'asc' },
    include: { ministry: { select: { id: true, name: true } } },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;
  const created = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description || null,
      startsAt: data.startsAt,
      endsAt: data.endsAt ?? null,
      location: data.location || null,
      category: data.category,
      ministryId: data.ministryId || null,
    },
  });
  return NextResponse.json(created, { status: 201 });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { leaderSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  return NextResponse.json(await prisma.leader.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }));
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = leaderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.leader.create({
    data: { name: d.name, position: d.position, bio: d.bio || null, imageUrl: d.imageUrl || null, order: d.order },
  });
  return NextResponse.json(created, { status: 201 });
}

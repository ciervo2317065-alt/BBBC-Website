import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ministrySchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET() {
  return NextResponse.json(await prisma.ministry.findMany({ orderBy: { name: 'asc' } }));
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = ministrySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.ministry.create({
    data: { name: d.name, description: d.description, leader: d.leader || null, imageUrl: d.imageUrl || null },
  });
  return NextResponse.json(created, { status: 201 });
}

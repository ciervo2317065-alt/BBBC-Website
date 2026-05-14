import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { prayerSchema } from '@/lib/validators';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { requireAdmin } from '@/lib/adminGuard';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`prayer:${ip}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = prayerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  if (parsed.data.hp_field) return NextResponse.json({ ok: true });

  const { name, contact, category, message, isPrivate } = parsed.data;
  await prisma.prayerRequest.create({
    data: { name, contact: contact || null, category, message, isPrivate: !!isPrivate },
  });

  return NextResponse.json({ ok: true });
}

// Admin-only listing
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

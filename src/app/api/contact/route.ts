import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validators';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  if (parsed.data.hp_field) return NextResponse.json({ ok: true }); // honeypot, silently accept

  const { name, email, phone, subject, message } = parsed.data;
  await prisma.contactMessage.create({
    data: { name, email, phone: phone || null, subject, message },
  });

  return NextResponse.json({ ok: true });
}

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { ok: false as const, status: 401 };
  return { ok: true as const, session };
}

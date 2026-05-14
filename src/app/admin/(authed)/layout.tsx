import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminAuthedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/admin/login');

  return (
    <div className="min-h-screen flex bg-navy-50/40">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

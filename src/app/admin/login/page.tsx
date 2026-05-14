import { Suspense } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <Logo />
          <h1 className="font-serif text-2xl text-navy-900 mt-3">Admin Sign In</h1>
          <p className="text-sm text-ink/70 mt-1">Believers Bible Baptist Church</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

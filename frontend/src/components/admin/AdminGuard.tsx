'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../shared/Loader';

export function AdminGuard({ locale, children }: { locale: string; children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated || user?.role === 'applicant') router.replace(`/${locale}/admin/login`);
  }, [isAuthenticated, locale, router, user?.role]);
  if (!isAuthenticated || user?.role === 'applicant') return <Loader label="Checking your session…" />;
  return children;
}

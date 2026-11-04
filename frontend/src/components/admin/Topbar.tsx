'use client';

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export function Topbar({ locale }: { locale: string }) {
  const { user, logout } = useAuth();
  return (
    <header className="admin-topbar">
      <Link href={`/${locale}`}>View website ↗</Link>
      <div className="button-row">
        <span>{user?.firstName ?? 'Administrator'}</span>
        <button className="button button-ghost button-small" onClick={() => void logout()}>Sign out</button>
      </div>
    </header>
  );
}
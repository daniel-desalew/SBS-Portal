'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { login as loginRequest, logout as logoutRequest } from '../lib/auth';
import { setAccessToken } from '../lib/api';

export const useAuth = () => {
  const router = useRouter();
  const { user, accessToken, refreshToken, setSession, clearSession } = useAuthStore();

  const login = async (email: string, password: string) => {
    const session = await loginRequest(email, password);
    setSession(session);
    router.replace(`/${window.location.pathname.split('/')[1]}/admin`);
  };

  const logout = async () => {
    const token = refreshToken;
    clearSession();
    setAccessToken(null);
    const locale = window.location.pathname.split('/')[1] || 'en';
    try {
      if (token) await logoutRequest(token);
    } finally {
      router.replace(`/${locale}/admin/login`);
    }
  };

  return { user, accessToken, isAuthenticated: Boolean(accessToken && user), login, logout };
};
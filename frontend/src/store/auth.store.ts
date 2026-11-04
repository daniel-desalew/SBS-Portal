'use client';

import { create } from 'zustand';
import type { AuthUser } from '../lib/auth';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (session: { user: AuthUser; accessToken: string; refreshToken: string }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setSession: (session) => set(session),
  clearSession: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
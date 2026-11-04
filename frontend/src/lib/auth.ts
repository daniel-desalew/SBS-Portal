import { apiPost, setAccessToken } from './api';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'applicant';
}

interface Session {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const login = async (email: string, password: string) => {
  const response = await apiPost<Session>('/auth/login', { email, password });
  setAccessToken(response.data.accessToken);
  return response.data;
};

export const logout = async (refreshToken: string) => {
  try {
    await apiPost<null>('/auth/logout', { refreshToken });
  } finally {
    setAccessToken(null);
  }
};

export const register = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await apiPost<Session>('/auth/register', input);
  setAccessToken(response.data.accessToken);
  return response.data;
};
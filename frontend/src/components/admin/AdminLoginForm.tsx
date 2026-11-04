'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../lib/utils';
import { loginSchema } from '../../lib/validations/login.schema';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function AdminLoginForm({ locale }: { locale: string }) {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(data: FormData) {
    setError('');
    const parsed = loginSchema.safeParse({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(parsed.data.email, parsed.data.password);
    } catch (loginError) {
      setError(getErrorMessage(loginError));
      setLoading(false);
    }
  }

  return (
    <form className="panel form-stack login-card" onSubmit={(event) => {
      event.preventDefault();
      void submit(new FormData(event.currentTarget));
    }}>
      <a className="brand" href={`/${locale}`}><Image className="brand-mark" src="/ministry-logo.png" alt="" width={86} height={80} /> SBS Portal</a>
      <div><p className="eyebrow">ADMINISTRATION</p><h1>Welcome back</h1><p className="muted">Sign in to manage the portal.</p></div>
      <label>Email<Input name="email" type="email" required autoComplete="username" /></label>
      <label>Password<Input name="password" type="password" required autoComplete="current-password" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <Button disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
    </form>
  );
}

'use client';

import { useAuth } from '../../../../../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <section className="admin-section">
      <div><p className="eyebrow">ACCOUNT</p><h1>Profile</h1></div>
      <div className="panel">
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p className="muted small">Contact an administrator if your account details need to be updated.</p>
      </div>
    </section>
  );
}
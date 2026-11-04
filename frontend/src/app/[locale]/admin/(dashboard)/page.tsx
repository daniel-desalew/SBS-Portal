'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '../../../../lib/api';
import { getErrorMessage } from '../../../../lib/utils';
import { Charts } from '../../../../components/admin/Charts';
import { StatCard } from '../../../../components/admin/StatCard';
import { Loader } from '../../../../components/shared/Loader';

interface DashboardSummary {
  applications: number;
  openApplications: number;
  complaints: number;
  activeUsers: number;
  unreadMessages: number;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    void apiGet<DashboardSummary>('/dashboard')
      .then((result) => { if (active) setSummary(result.data); })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); });
    return () => { active = false; };
  }, []);

  if (error) return <p className="form-error" role="alert">{error}</p>;
  if (!summary) return <Loader />;
  return (
    <section className="admin-section">
      <div><p className="eyebrow">SBS PORTAL</p><h1>Overview</h1><p className="muted">A snapshot of activity across the portal.</p></div>
      <div className="admin-stats">
        <StatCard label="Applications" value={summary.applications} />
        <StatCard label="Open applications" value={summary.openApplications} />
        <StatCard label="Open complaints" value={summary.complaints} />
        <StatCard label="Active users" value={summary.activeUsers} />
      </div>
      <Charts values={[
        { label: 'Applications', value: summary.applications },
        { label: 'Open reviews', value: summary.openApplications },
        { label: 'Complaints', value: summary.complaints },
        { label: 'New messages', value: summary.unreadMessages },
      ]} />
    </section>
  );
}
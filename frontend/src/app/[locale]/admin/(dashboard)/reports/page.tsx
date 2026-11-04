'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '../../../../../lib/api';
import { getErrorMessage } from '../../../../../lib/utils';
import { Loader } from '../../../../../components/shared/Loader';
import { StatCard } from '../../../../../components/admin/StatCard';
import { Charts } from '../../../../../components/admin/Charts';

interface Summary {
  applications: number;
  openApplications: number;
  complaints: number;
  activeUsers: number;
  unreadMessages: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    void apiGet<Summary>('/dashboard')
      .then((response) => { if (active) setData(response.data); })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); });
    return () => { active = false; };
  }, []);
  if (error) return <p className="form-error" role="alert">{error}</p>;
  if (!data) return <Loader />;
  return (
    <section className="admin-section">
      <div><p className="eyebrow">ANALYTICS</p><h1>Reports</h1></div>
      <div className="admin-stats">
        <StatCard label="Applications" value={data.applications} />
        <StatCard label="Open applications" value={data.openApplications} />
        <StatCard label="Complaints" value={data.complaints} />
        <StatCard label="Active users" value={data.activeUsers} />
      </div>
      <Charts values={[
        { label: 'Applications', value: data.applications },
        { label: 'Open reviews', value: data.openApplications },
        { label: 'Complaints', value: data.complaints },
        { label: 'Messages', value: data.unreadMessages },
      ]} />
    </section>
  );
}
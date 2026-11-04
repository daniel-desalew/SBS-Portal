'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import type { Paginated } from '../../types';
import { DataTable } from './DataTable';
import { Loader } from '../shared/Loader';

export function AdminResourcePage({
  title,
  endpoint,
  locale,
  columns = ['title', 'createdAt'],
  allowCreate = false,
}: {
  title: string;
  endpoint: string;
  locale: string;
  columns?: string[];
  allowCreate?: boolean;
}) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void apiGet<Paginated<Record<string, unknown>>>(`/${endpoint}?limit=50`)
      .then((response) => { if (active) setRows(response.data.items); })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint]);

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">ADMINISTRATION</p><h1>{title}</h1></div>
        {allowCreate && <Link className="button button-primary" href={`/${locale}/admin/news/new`}>Create new</Link>}
      </div>
      {loading ? <Loader /> : error ? <p className="form-error" role="alert">{error}</p> : (
        rows.length ? (
          <DataTable
            columns={columns}
            rows={rows}
            rowHref={(row) => row._id ? `/${locale}/admin/${endpoint === 'audit' ? 'audit-logs' : endpoint}/${String(row._id)}` : undefined}
          />
        ) : <p className="muted">No records found.</p>
      )}
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import type { ContentRecord, Paginated } from '../../types';
import { EmptyState } from './EmptyState';
import { Loader } from './Loader';

export function ContentIndex({
  endpoint,
  locale,
  noun,
  pathPrefix = endpoint,
  limit = 50,
}: {
  endpoint: string;
  locale: string;
  noun: string;
  pathPrefix?: string;
  limit?: number;
}) {
  const [items, setItems] = useState<ContentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void apiGet<Paginated<ContentRecord>>(`/${endpoint}?limit=${limit}`)
      .then((response) => { if (active) setItems(response.data.items); })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint, limit]);

  if (loading) return <Loader />;
  if (error) return <p className="form-error" role="alert">{error}</p>;
  if (!items.length) return <EmptyState title={`No ${noun} yet`} description={`Published ${noun} will appear here.`} />;

  return (
    <div className="card-grid three">
      {items.map((item) => (
        <article className="panel content-card" key={item._id}>
          <p className="eyebrow">{noun.toUpperCase()}</p>
          <h2><Link href={`/${locale}/${pathPrefix}/${item.slug ?? item._id}`}>{item.title}</Link></h2>
          <p>{item.summary ?? item.description ?? item.body?.slice(0, 180)}</p>
          <Link className="text-link" href={`/${locale}/${pathPrefix}/${item.slug ?? item._id}`}>Read more →</Link>
        </article>
      ))}
    </div>
  );
}

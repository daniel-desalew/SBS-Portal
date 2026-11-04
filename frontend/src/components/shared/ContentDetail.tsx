'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import type { ContentRecord } from '../../types';
import { EmptyState } from './EmptyState';
import { Loader } from './Loader';

export function ContentDetail({ endpoint }: { endpoint: string }) {
  const params = useParams<{ id?: string; slug?: string }>();
  const id = params.slug ?? params.id;
  const [item, setItem] = useState<ContentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    void apiGet<ContentRecord>(`/${endpoint}/${encodeURIComponent(id)}`)
      .then((response) => { if (active) setItem(response.data); })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint, id]);

  if (loading) return <Loader />;
  if (error || !item) return <EmptyState title="Content not found" description={error || 'This content may have been removed.'} />;
  return (
    <article className="panel article-body">
      <p className="eyebrow">{endpoint.toUpperCase()}</p>
      <h1>{item.title}</h1>
      {item.summary && <p className="lead">{item.summary}</p>}
      <div className="article-content">{item.body ?? item.description ?? 'More information will be added soon.'}</div>
    </article>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiGet, apiPatch } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import type { Application, ContentRecord } from '../../types';
import { ApplicationReview } from './ApplicationReview';
import { Loader } from '../shared/Loader';
import { StatusDialog } from './StatusDialog';
import { Button } from '../ui/button';

export function AdminRecordPage({ endpoint, title }: { endpoint: string; title: string }) {
  const params = useParams<{ id: string }>();
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState('submitted');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    void apiGet<ContentRecord & { status?: string }>(`/${endpoint}/${encodeURIComponent(params.id)}`)
      .then((response) => {
        if (active) {
          setRecord(response.data as unknown as Record<string, unknown>);
          if (endpoint === 'applications') setStatus(String(response.data.status));
        }
      })
      .catch((requestError: unknown) => { if (active) setError(getErrorMessage(requestError)); });
    return () => { active = false; };
  }, [endpoint, params.id]);

  if (error) return <p className="form-error" role="alert">{error}</p>;
  if (!record) return <Loader />;
  if (endpoint === 'applications') {
    const application = record as unknown as Application;
    const updateStatus = async () => {
      setSaving(true);
      setError('');
      try {
        const result = await apiPatch<Application>(
          `/applications/${encodeURIComponent(params.id)}/status`,
          { status },
        );
        setRecord(result.data as unknown as Record<string, unknown>);
        setDialogOpen(false);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setSaving(false);
      }
    };
    return (
      <section className="admin-section">
        <div className="section-heading">
          <div><p className="eyebrow">APPLICATION REVIEW</p><h1>{application.referenceNumber}</h1></div>
          <Button onClick={() => setDialogOpen(true)}>Update status</Button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <ApplicationReview application={application} />
        <StatusDialog
          open={dialogOpen}
          status={status}
          onStatusChange={setStatus}
          onClose={() => setDialogOpen(false)}
          onSave={() => { if (!saving) void updateStatus(); }}
        />
      </section>
    );
  }
  return (
    <article className="panel">
      <p className="eyebrow">{title}</p>
      <h1>{String(record.title ?? record.referenceNumber ?? record._id)}</h1>
      <pre className="record-json">{JSON.stringify(record, null, 2)}</pre>
    </article>
  );
}

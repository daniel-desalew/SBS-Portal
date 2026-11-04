'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiPost } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function AdminNewsForm() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(data: FormData) {
    setSaving(true);
    setError('');
    try {
      await apiPost('/news', {
        title: data.get('title'),
        slug: data.get('slug'),
        summary: data.get('summary'),
        body: data.get('body'),
        published: data.get('published') === 'on',
      });
      router.push(`/${params.locale}/admin/news`);
      router.refresh();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setSaving(false);
    }
  }

  return (
    <form className="admin-section" onSubmit={(event) => {
      event.preventDefault();
      void submit(new FormData(event.currentTarget));
    }}>
      <div><p className="eyebrow">CONTENT</p><h1>Create news article</h1></div>
      <div className="panel form-stack">
        <label>Title<Input name="title" required maxLength={200} /></label>
        <label>URL slug<Input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={220} /></label>
        <label>Summary<Textarea name="summary" rows={3} required maxLength={500} /></label>
        <label>Article body<Textarea name="body" rows={12} required maxLength={50000} /></label>
        <label className="inline-label"><input name="published" type="checkbox" /> Publish immediately</label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button disabled={saving}>{saving ? 'Saving…' : 'Save article'}</Button>
      </div>
    </form>
  );
}

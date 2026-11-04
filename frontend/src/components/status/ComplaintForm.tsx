'use client';

import { useState } from 'react';
import { useCreateComplaint } from '../../hooks/useComplaints';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function ComplaintForm({ referenceNumber, email }: { referenceNumber: string; email: string }) {
  const mutation = useCreateComplaint();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(data: FormData) {
    setError('');
    try {
      await mutation.mutateAsync({
        referenceNumber,
        email,
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
      });
      setMessage('Your complaint was submitted.');
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  }

  return (
    <form className="panel form-stack" onSubmit={(event) => {
      event.preventDefault();
      void submit(new FormData(event.currentTarget));
    }}>
      <h2>Need help?</h2>
      <p>Send a message about this application.</p>
      <label>Subject<Input name="subject" required maxLength={160} /></label>
      <label>Message<Textarea name="message" rows={4} required maxLength={5000} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <Button disabled={mutation.isPending}>{mutation.isPending ? 'Sending…' : 'Send complaint'}</Button>
    </form>
  );
}
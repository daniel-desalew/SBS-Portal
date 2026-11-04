'use client';

import { useState } from 'react';
import { apiPost } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(data: FormData) {
    setError('');
    setMessage('');
    setSending(true);
    try {
      await apiPost('/contact', {
        name: data.get('name'),
        email: data.get('email'),
        subject: data.get('subject'),
        message: data.get('message'),
      });
      setMessage('Your message was sent. Thank you for contacting us.');
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="panel form-stack application-form" onSubmit={(event) => {
      event.preventDefault();
      void submit(new FormData(event.currentTarget));
    }}>
      <label>Your name<Input name="name" required maxLength={160} autoComplete="name" /></label>
      <label>Email<Input name="email" type="email" required autoComplete="email" /></label>
      <label>Subject<Input name="subject" required maxLength={200} /></label>
      <label>Message<Textarea name="message" rows={6} required maxLength={5000} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <Button disabled={sending}>{sending ? 'Sending…' : 'Send message'}</Button>
    </form>
  );
}

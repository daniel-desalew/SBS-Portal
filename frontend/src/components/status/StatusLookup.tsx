'use client';

import { useState } from 'react';
import { useStatus } from '../../hooks/useStatus';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StatusTimeline } from './StatusTimeline';
import { ComplaintForm } from './ComplaintForm';

export function StatusLookup() {
  const lookup = useStatus();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  async function submit(data: FormData) {
    const ref = String(data.get('referenceNumber') ?? '');
    const address = String(data.get('email') ?? '');
    setEmail(address);
    setReferenceNumber(ref);
    setError('');
    try {
      await lookup.mutateAsync({ referenceNumber: ref, email: address });
    } catch (lookupError) {
      setError(getErrorMessage(lookupError));
    }
  }

  return (
    <div className="status-grid">
      <form className="panel form-stack status-lookup-form" onSubmit={(event) => {
        event.preventDefault();
        void submit(new FormData(event.currentTarget));
      }}>
        <header className="status-lookup-heading">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7.5" r="3.5" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
          </svg>
          <h2>Student Application Status Lookup</h2>
        </header>
        <p className="status-lookup-description">
          For students and parents: Enter your reference number and the email
          address used when submitting your application to check your boarding
          school application status. If your application was rejected, you can
          submit a complaint for review on this page.
        </p>
        <div className="status-lookup-fields">
          <label>
            Reference Number *
            <Input
              name="referenceNumber"
              placeholder="e.g., BRD-2019-0NR4OA"
              required
              minLength={4}
              maxLength={40}
              autoComplete="off"
              aria-describedby="status-reference-help"
            />
            <span className="status-field-help" id="status-reference-help">
              This was provided when you submitted your application.
            </span>
          </label>
          <label>
            Email *
            <Input
              name="email"
              type="email"
              placeholder="Enter the email used to apply"
              required
              autoComplete="email"
              aria-describedby="status-email-help"
            />
            <span className="status-field-help" id="status-email-help">
              Enter the email address used in your application.
            </span>
          </label>
        </div>
        <p className="status-security-notice" role="note">
          <span aria-hidden="true">⚠</span>
          Do not share your reference number with anyone and keep it confidential.
        </p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button disabled={lookup.isPending}>
          {lookup.isPending ? 'Checking…' : 'Check status'}
        </Button>
      </form>
      {lookup.data && (
        <div className="form-stack">
          <StatusTimeline status={lookup.data.status} />
          <div className="panel">
            <p>Reference: <strong>{lookup.data.referenceNumber}</strong></p>
            <p>Grade: {lookup.data.grade}</p>
          </div>
          <ComplaintForm referenceNumber={referenceNumber} email={email} />
        </div>
      )}
    </div>
  );
}
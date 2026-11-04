'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function CareerStatusLookup() {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <form
      className="panel form-stack status-lookup-form career-status-lookup"
      onSubmit={(event) => {
        event.preventDefault();
        setUnavailable(true);
      }}
    >
      <header className="status-lookup-heading">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M3 10 12 4l9 6v10H3z" />
          <path d="M8 20v-7h8v7M8 9h.01M12 9h.01M16 9h.01" />
        </svg>
        <h2>Teacher Application Status Lookup</h2>
      </header>
      <p className="status-lookup-description">
        For teachers: Enter your reference number and first name to check your
        career application status.
      </p>
      <div className="status-lookup-fields">
        <label>
          Reference Number *
          <Input
            name="referenceNumber"
            placeholder="e.g., BRD-2019-******"
            minLength={4}
            maxLength={40}
            autoComplete="off"
            required
            aria-describedby="career-status-reference-help"
          />
          <span className="status-field-help" id="career-status-reference-help">
            This was provided when you submitted your application.
          </span>
        </label>
        <label>
          First Name *
          <Input
            name="firstName"
            placeholder="Enter your first name"
            maxLength={80}
            autoComplete="given-name"
            required
            aria-describedby="career-status-name-help"
          />
          <span className="status-field-help" id="career-status-name-help">
            As entered in your application.
          </span>
        </label>
      </div>
      {unavailable && (
        <p className="form-error" role="alert">
          Career application status lookup is not available yet. Please contact us for assistance.
        </p>
      )}
      <Button type="submit">Check Status</Button>
    </form>
  );
}

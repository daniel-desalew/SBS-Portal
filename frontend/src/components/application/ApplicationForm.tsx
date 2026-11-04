'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';

export function ApplicationForm({ grade, locale }: { grade: 9 | 10; locale: string }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(formData: FormData) {
    setError('');
    setSubmitting(true);
    const applicant = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      dateOfBirth: String(formData.get('dateOfBirth') ?? ''),
      gender: String(formData.get('gender') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
    };
    const body = {
      grade,
      applicant,
      academic: {
        previousSchool: String(formData.get('previousSchool') ?? ''),
        region: String(formData.get('region') ?? ''),
      },
      guardian: {
        name: String(formData.get('guardianName') ?? ''),
        phone: String(formData.get('guardianPhone') ?? ''),
      },
      documents: [],
    };
    try {
      const response = await apiPost<{ referenceNumber: string }>('/applications', body);
      router.push(
        `/${locale}/admissions/apply/success?reference=${encodeURIComponent(response.data.referenceNumber)}`,
      );
    } catch (submitError) {
      setError(getErrorMessage(submitError));
      setSubmitting(false);
    }
  }

  return (
    <form
      className="form-stack panel application-form"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(new FormData(event.currentTarget));
      }}
    >
      <div>
        <p className="eyebrow">GRADE {grade} APPLICATION</p>
        <h2>Applicant details</h2>
      </div>
      <div className="form-grid">
        <label>First name<Input name="firstName" required maxLength={80} autoComplete="given-name" /></label>
        <label>Last name<Input name="lastName" required maxLength={80} autoComplete="family-name" /></label>
        <label>Date of birth<Input name="dateOfBirth" type="date" required /></label>
        <label>Gender<Select name="gender" required defaultValue=""><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></Select></label>
        <label>Email<Input name="email" type="email" required autoComplete="email" /></label>
        <label>Phone<Input name="phone" type="tel" required autoComplete="tel" /></label>
        <label>Previous school<Input name="previousSchool" required maxLength={160} /></label>
        <label>Region<Input name="region" required maxLength={120} /></label>
        <label>Parent / guardian name<Input name="guardianName" required maxLength={160} /></label>
        <label>Parent / guardian phone<Input name="guardianPhone" required type="tel" maxLength={30} /></label>
      </div>
      <label>Additional academic information<Textarea name="academicNotes" rows={4} maxLength={2000} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <p className="muted small">By submitting, you confirm that the information is accurate. Required documents can be provided when requested.</p>
      <Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'}</Button>
    </form>
  );
}

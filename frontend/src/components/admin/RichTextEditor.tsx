'use client';

import { Textarea } from '../ui/textarea';

export function RichTextEditor({ value, onChange, label = 'Content' }: {
  value: string; onChange: (value: string) => void; label?: string;
}) {
  return <label>{label}<Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={12} maxLength={50000} /></label>;
}
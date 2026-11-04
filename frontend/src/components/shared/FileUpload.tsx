'use client';

import { useRef, useState } from 'react';
import { Button } from '../ui/button';

export function FileUpload({
  onSelect,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxBytes = 5 * 1024 * 1024,
}: {
  onSelect: (file: File) => void;
  accept?: string;
  maxBytes?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} className="sr-only" onChange={(event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const allowed = new Set(['application/pdf', 'image/jpeg', 'image/png']);
        if (!allowed.has(file.type)) {
          setError('Choose a PDF, JPEG, or PNG file.');
          event.target.value = '';
          return;
        }
        if (file.size > maxBytes) {
          setError(`File must be smaller than ${Math.floor(maxBytes / 1024 / 1024)} MB.`);
          return;
        }
        setError('');
        onSelect(file);
      }} />
      <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>Choose a file</Button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}
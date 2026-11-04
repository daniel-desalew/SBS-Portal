'use client';

export function Toast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div role="status" className="toast">
      {message}
      <button onClick={onDismiss} aria-label="Dismiss notification">×</button>
    </div>
  );
}
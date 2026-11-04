'use client';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container section">
      <div className="panel">
        <p className="eyebrow">ERROR</p>
        <h1>We could not load this page</h1>
        <p className="muted">{error.message || 'An unexpected error occurred.'}</p>
        <button className="button button-primary" onClick={reset}>Try again</button>
      </div>
    </main>
  );
}
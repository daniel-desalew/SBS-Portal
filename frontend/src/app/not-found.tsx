import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container section">
      <div className="panel empty-state">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="muted">The page may have moved or the address may be incorrect.</p>
        <Link className="button button-primary" href="/en">Back to home</Link>
      </div>
    </main>
  );
}
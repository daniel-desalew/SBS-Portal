export function ReviewStep({ entries }: { entries: Array<[string, string]> }) {
  return (
    <dl className="review-list">
      {entries.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || '—'}</dd></div>)}
    </dl>
  );
}
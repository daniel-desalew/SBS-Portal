export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <section className="panel stat-card">
      <p className="muted">{label}</p>
      <strong>{value}</strong>
      {hint && <span className="small muted">{hint}</span>}
    </section>
  );
}
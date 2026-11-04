export function Charts({ values }: { values: Array<{ label: string; value: number }> }) {
  const maximum = Math.max(...values.map((entry) => entry.value), 1);
  return (
    <section className="panel chart" aria-label="Summary chart">
      {values.map((entry) => (
        <div className="chart-row" key={entry.label}>
          <span>{entry.label}</span>
          <div className="chart-track"><div className="chart-value" style={{ width: `${(entry.value / maximum) * 100}%` }} /></div>
          <strong>{entry.value}</strong>
        </div>
      ))}
    </section>
  );
}
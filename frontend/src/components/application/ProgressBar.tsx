export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-label"><span>Step {current} of {total}</span><span>{percentage}%</span></div>
      <div className="progress-track"><div className="progress-value" style={{ width: `${percentage}%` }} /></div>
    </div>
  );
}
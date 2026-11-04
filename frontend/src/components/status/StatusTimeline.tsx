import { Badge } from '../ui/badge';

const labels: Record<string, string> = {
  submitted: 'Submitted',
  under_review: 'Under review',
  accepted: 'Accepted',
  rejected: 'Not accepted',
  waitlisted: 'Waitlisted',
};

export function StatusTimeline({ status }: { status: string }) {
  const tone = status === 'accepted' ? 'success' : status === 'rejected' ? 'danger' : 'warning';
  return (
    <div className="status-timeline panel">
      <p className="eyebrow">CURRENT STATUS</p>
      <Badge tone={tone}>{labels[status] ?? status}</Badge>
      <ol>
        {['submitted', 'under_review', 'accepted'].map((step) => (
          <li className={status === step ? 'active' : ''} key={step}>{labels[step]}</li>
        ))}
      </ol>
      <p className="muted small">The admissions team will update this timeline as your application progresses.</p>
    </div>
  );
}
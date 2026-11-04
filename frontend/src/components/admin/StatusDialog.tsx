'use client';

import { Dialog } from '../ui/dialog';
import { Select } from '../ui/select';
import { Button } from '../ui/button';

export function StatusDialog({ open, status, onStatusChange, onClose, onSave }: {
  open: boolean; status: string; onStatusChange: (status: string) => void; onClose: () => void; onSave: () => void;
}) {
  return (
    <Dialog open={open} title="Update application status" onClose={onClose}>
      <label>Status<Select value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="submitted">Submitted</option><option value="under_review">Under review</option>
        <option value="accepted">Accepted</option><option value="rejected">Rejected</option><option value="waitlisted">Waitlisted</option>
      </Select></label>
      <Button onClick={onSave}>Save status</Button>
    </Dialog>
  );
}
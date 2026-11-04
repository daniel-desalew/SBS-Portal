'use client';

import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';

export function ConfirmDialog({
  open,
  title,
  children,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} title={title} onClose={onCancel}>
      <div>{children}</div>
      <div className="button-row">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
      </div>
    </Dialog>
  );
}
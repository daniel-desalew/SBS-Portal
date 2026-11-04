'use client';

import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from '../ui/button';

export function StepWizard({
  steps,
}: {
  steps: Array<{ title: string; content: React.ReactNode; onNext?: () => boolean }>;
}) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  return (
    <section className="panel wizard">
      <ProgressBar current={current + 1} total={steps.length} />
      <h2>{step.title}</h2>
      <div className="wizard-content">{step.content}</div>
      <div className="button-row">
        <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>Back</Button>
        {current < steps.length - 1 && <Button onClick={() => { if (!step.onNext || step.onNext()) setCurrent((value) => value + 1); }}>Continue</Button>}
      </div>
    </section>
  );
}
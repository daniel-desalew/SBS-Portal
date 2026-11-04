import type { InputHTMLAttributes } from 'react';

export function RadioGroup({ children }: { children: React.ReactNode }) {
  return <fieldset className="radio-group">{children}</fieldset>;
}

export function Radio(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="radio" {...props} />;
}
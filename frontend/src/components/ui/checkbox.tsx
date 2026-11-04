import type { InputHTMLAttributes } from 'react';

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className={`checkbox ${props.className ?? ''}`} {...props} />;
}
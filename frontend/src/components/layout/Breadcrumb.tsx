import { Fragment } from 'react';
import Link from 'next/link';

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && <span aria-hidden="true" className="breadcrumb-separator">›</span>}
          <span className="breadcrumb-item">
            {index === 0 && (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />
              </svg>
            )}
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </span>
        </Fragment>
      ))}
    </nav>
  );
}
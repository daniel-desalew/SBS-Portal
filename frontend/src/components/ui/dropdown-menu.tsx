'use client';

export function DropdownMenu({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <details className="dropdown">
      <summary>{label}</summary>
      <div className="dropdown-content panel">{children}</div>
    </details>
  );
}
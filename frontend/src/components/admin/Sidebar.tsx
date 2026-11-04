'use client';

import Link from 'next/link';
import Image from 'next/image';

const sections = [
  ['Overview', ''], ['Applications', '/applications'], ['Complaints', '/complaints'],
  ['Schools', '/schools'], ['Programs', '/programs'], ['News', '/news'], ['Gallery', '/gallery'],
  ['Careers', '/careers'], ['Resources', '/resources'], ['FAQ', '/faq'], ['Users', '/users'],
  ['Reports', '/reports'], ['Audit logs', '/audit-logs'], ['Settings', '/settings'], ['Profile', '/profile'],
];

export function Sidebar({ locale }: { locale: string }) {
  return (
    <aside className="admin-sidebar">
      <Link href={`/${locale}/admin`} className="brand"><Image className="brand-mark" src="/ministry-logo.png" alt="" width={86} height={80} /> Admin</Link>
      <nav aria-label="Admin navigation">
        {sections.map(([label, path]) => <Link key={path} href={`/${locale}/admin${path}`}>{label}</Link>)}
      </nav>
    </aside>
  );
}
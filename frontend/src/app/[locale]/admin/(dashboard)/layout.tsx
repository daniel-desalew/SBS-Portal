import { AdminGuard } from '../../../../components/admin/AdminGuard';
import { Sidebar } from '../../../../components/admin/Sidebar';
import { Topbar } from '../../../../components/admin/Topbar';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return (
    <AdminGuard locale={locale}>
      <div className="admin-shell">
        <Sidebar locale={locale} />
        <div className="admin-main">
          <Topbar locale={locale} />
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
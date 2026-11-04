import { AdminLoginForm } from '../../../../components/admin/AdminLoginForm';

export default async function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <main className="login-wrap"><AdminLoginForm locale={locale} /></main>;
}
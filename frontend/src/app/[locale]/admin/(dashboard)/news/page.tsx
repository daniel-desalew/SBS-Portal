import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default async function NewsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AdminResourcePage title="News" endpoint="news" locale={locale} columns={['title', 'slug', 'published', 'createdAt']} allowCreate />;
}
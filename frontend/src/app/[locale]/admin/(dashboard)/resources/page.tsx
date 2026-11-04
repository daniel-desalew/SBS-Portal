import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function ResourcesAdminPage() {
  return <AdminResourcePage title="Resources" endpoint="resources" locale="en" columns={['title', 'category', 'published']} />;
}
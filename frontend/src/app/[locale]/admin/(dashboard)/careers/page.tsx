import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function CareersAdminPage() {
  return <AdminResourcePage title="Careers" endpoint="careers" locale="en" columns={['title', 'location', 'deadline', 'published']} />;
}
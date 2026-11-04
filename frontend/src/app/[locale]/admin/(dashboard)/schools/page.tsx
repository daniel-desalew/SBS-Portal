import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function SchoolsAdminPage() {
  return <AdminResourcePage title="Schools" endpoint="schools" locale="en" columns={['name', 'region', 'isActive']} />;
}
import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function ProgramsAdminPage() {
  return <AdminResourcePage title="Programs" endpoint="programs" locale="en" columns={['title', 'grade', 'isActive']} />;
}
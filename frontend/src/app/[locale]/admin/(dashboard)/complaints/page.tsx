import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function ComplaintsPage() {
  return <AdminResourcePage title="Complaints" endpoint="complaints" locale="en" columns={['referenceNumber', 'subject', 'email', 'status', 'createdAt']} />;
}
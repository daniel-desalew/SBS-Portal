import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function ApplicationsPage() {
  return <AdminResourcePage title="Applications" endpoint="applications" locale="en" columns={['referenceNumber', 'grade', 'status', 'createdAt']} />;
}
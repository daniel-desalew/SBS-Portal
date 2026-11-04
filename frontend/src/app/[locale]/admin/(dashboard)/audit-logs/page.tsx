import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function AuditLogsPage() {
  return <AdminResourcePage title="Audit logs" endpoint="audit" locale="en" columns={['action', 'resource', 'resourceId', 'ip', 'createdAt']} />;
}
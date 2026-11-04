import { AdminResourcePage } from '../../../../../components/admin/AdminResourcePage';

export default function UsersPage() {
  return <AdminResourcePage title="Users" endpoint="users" locale="en" columns={['email', 'firstName', 'lastName', 'role', 'isActive']} />;
}
import { Application } from '../../models/Application.model';
import { Complaint } from '../../models/Complaint.model';
import { Contact } from '../../models/Contact.model';
import { User } from '../../models/User.model';

export const getDashboardSummary = async () => {
  const [applications, openApplications, complaints, users, messages] = await Promise.all([
    Application.countDocuments(),
    Application.countDocuments({ status: { $in: ['submitted', 'under_review'] } }),
    Complaint.countDocuments({ status: { $in: ['open', 'in_progress'] } }),
    User.countDocuments({ isActive: true }),
    Contact.countDocuments({ status: 'new' }),
  ]);
  return { applications, openApplications, complaints, activeUsers: users, unreadMessages: messages };
};
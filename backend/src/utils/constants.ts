export const API_PREFIX = '/api/v1';

export const USER_ROLES = ['admin', 'staff', 'applicant'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const APPLICATION_STATUSES = [
  'submitted',
  'under_review',
  'accepted',
  'rejected',
  'waitlisted',
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const COMPLAINT_STATUSES = ['open', 'in_progress', 'resolved', 'closed'] as const;
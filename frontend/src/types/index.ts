export interface Application {
  _id: string;
  referenceNumber: string;
  grade: 9 | 10;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  };
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
  createdAt: string;
}

export interface Complaint {
  _id: string;
  referenceNumber: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface ContentRecord {
  _id: string;
  title: string;
  description?: string;
  summary?: string;
  body?: string;
  slug?: string;
  published?: boolean;
  isActive?: boolean;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
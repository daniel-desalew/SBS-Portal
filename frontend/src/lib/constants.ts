export const SUPPORTED_LOCALES = ['en', 'am', 'om'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export const APPLICATION_STATUSES = [
  'submitted',
  'under_review',
  'accepted',
  'rejected',
  'waitlisted',
] as const;

export const PUBLIC_NAVIGATION = [
  { href: '', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/admissions/guide', label: 'Admissions' },
  { href: '/resources', label: 'Resources' },
  { href: '/career', label: 'Career' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
] as const;

export const PROGRAM_NAVIGATION = [
  { key: 'academicPrograms', label: 'Academic Programs' },
  { key: 'extracurricularActivities', label: 'Extracurricular Activities' },
  { key: 'specialPrograms', label: 'Special Programs' },
] as const;

export const ADMISSION_NAVIGATION = [
  { key: 'admissionProcess', label: 'Admission Process', href: '/admissions/guide' },
  { key: 'applyNow', label: 'Apply Now', href: '/admissions/apply' },
  { key: 'checkStatus', label: 'Check Status', href: '/admissions/apply/status' },
] as const;

export const CAREER_NAVIGATION = [
  { label: 'Teachers', href: '/career/teachers' },
  { label: 'Employees', href: '/career' },
  { label: 'Administration and Finance', href: '/career/administration-finance' },
  { label: 'Directors', href: '/career/directors' },
  { label: 'Check Status', href: '/career/check-status' },
] as const;

export const NEWS_NAVIGATION = [
  { label: 'Upcoming Events Calendar', href: '/events-calendar' },
  { label: 'Recent News Articles', href: '/news' },
] as const;

export const GALLERY_NAVIGATION = [
  { label: 'Photos', href: '/gallery' },
  { label: 'Videos', href: '/gallery' },
  { label: 'Events', href: '/events-calendar' },
] as const;

export const ABOUT_NAVIGATION = [
  { label: 'History', href: '/about/history' },
  { label: 'Mission & Vision', href: '/about/mission-vision' },
  { label: 'Accreditation and Affiliations', href: '/about' },
  { label: 'Faculty Information', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const RESOURCE_NAVIGATION = [
  { key: 'dailyRoutine', label: 'Daily Routine', href: '/resources' },
  { key: 'dormitoryInformation', label: 'Dormitory Information', href: '/resources' },
  { key: 'mealsAndNutrition', label: 'Meals and Nutrition', href: '/meals-nutrition' },
  { key: 'healthAndWellness', label: 'Health and Wellness Services', href: '/contact' },
  { key: 'parentHandbook', label: 'Parent Handbook', href: '/resources' },
  { key: 'communicationChannels', label: 'Communication Channels', href: '/contact' },
  { key: 'parentAssociation', label: 'Parent Association Information', href: '/resources' },
] as const;
export const validApplicationFixture = {
  grade: 9 as const,
  applicant: {
    firstName: 'Sam',
    lastName: 'Example',
    dateOfBirth: '2009-05-01',
    gender: 'female',
    email: 'sam@example.test',
    phone: '+251900000000',
  },
  academic: { previousSchool: 'Example School' },
  guardian: { name: 'Guardian Example', phone: '+251911111111' },
  documents: [],
};
import { Application } from '../../models/Application.model';

export const hasDuplicateApplication = async (
  email: string,
  grade: number,
): Promise<boolean> =>
  Boolean(
    await Application.exists({
      'applicant.email': email.trim().toLowerCase(),
      grade,
      status: { $nin: ['rejected'] },
    }),
  );
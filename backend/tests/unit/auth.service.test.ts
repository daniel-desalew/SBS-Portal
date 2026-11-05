import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    refreshToken: { create: vi.fn() },
  },
}));

import { prisma } from '../../src/lib/prisma';
import { login } from '../../src/modules/auth/auth.service';

describe('auth service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('rejects unknown users without disclosing whether the email exists', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    await expect(login('missing@example.test', 'some-password')).rejects.toMatchObject({
      statusCode: 401,
      message: 'Invalid email or password',
    });
  });
});
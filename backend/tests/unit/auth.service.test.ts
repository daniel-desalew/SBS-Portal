import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/models/User.model', () => ({ User: { findOne: vi.fn() } }));
vi.mock('../../src/models/RefreshToken.model', () => ({ RefreshToken: { create: vi.fn() } }));

import { User } from '../../src/models/User.model';
import { login } from '../../src/modules/auth/auth.service';

describe('auth service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('rejects unknown users without disclosing whether the email exists', async () => {
    vi.mocked(User.findOne).mockImplementation(
      () => ({ select: async () => null }) as never,
    );
    await expect(login('missing@example.test', 'some-password')).rejects.toMatchObject({
      statusCode: 401,
      message: 'Invalid email or password',
    });
  });
});
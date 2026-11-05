import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { createId } from '../../utils/id';
import {
  createRefreshToken,
  hashToken,
  refreshTokenExpiry,
  signAccessToken,
} from '../../services/token.service';

const publicUser = (user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});

const issueSession = async (user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'applicant';
}) => {
  const refreshToken = createRefreshToken();
  await prisma.refreshToken.create({
    data: {
    id: createId(),
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: refreshTokenExpiry(),
    },
  });
  return {
    user: publicUser(user),
    accessToken: signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    }),
    refreshToken,
  };
};

export const register = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const email = input.email.trim().toLowerCase();
  if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
    throw new ApiError(409, 'An account with this email already exists');
  }
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { id: createId(), ...input, email, passwordHash, role: 'applicant' },
  });
  return issueSession(user);
};

export const login = async (emailInput: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: emailInput.trim().toLowerCase() },
  });
  if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  return issueSession(user);
};

export const rotateRefreshToken = async (token: string) => {
  const tokenHash = hashToken(token);
  const stored = await prisma.refreshToken.findFirst({
    where: { tokenHash, revokedAt: null, expiresAt: { gt: new Date() } },
  });
  if (!stored) throw new ApiError(401, 'Invalid or expired refresh token');

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user || !user.isActive) {
    const revoked = await prisma.refreshToken.deleteMany({ where: { id: stored.id } });
    if (revoked.count !== 1) {
      throw new ApiError(401, 'Refresh token has already been used');
    }
    throw new ApiError(401, 'Account is unavailable');
  }

  await prisma.refreshToken.delete({ where: { id: stored.id } });
  return issueSession(user);
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  await prisma.refreshToken.deleteMany({ where: { tokenHash: hashToken(token) } });
};
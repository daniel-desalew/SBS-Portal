import bcrypt from 'bcryptjs';
import { User } from '../../models/User.model';
import { RefreshToken } from '../../models/RefreshToken.model';
import { ApiError } from '../../utils/ApiError';
import {
  createRefreshToken,
  hashToken,
  refreshTokenExpiry,
  signAccessToken,
} from '../../services/token.service';

const publicUser = (user: {
  _id: unknown;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}) => ({
  id: String(user._id),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});

const issueSession = async (user: {
  _id: unknown;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'applicant';
}) => {
  const refreshToken = createRefreshToken();
  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: refreshTokenExpiry(),
  });
  return {
    user: publicUser(user),
    accessToken: signAccessToken({
      sub: String(user._id),
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
  if (await User.exists({ email })) throw new ApiError(409, 'An account with this email already exists');
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await User.create({ ...input, email, passwordHash, role: 'applicant' });
  return issueSession(user);
};

export const login = async (emailInput: string, password: string) => {
  const user = await User.findOne({ email: emailInput.trim().toLowerCase() }).select('+passwordHash');
  if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  return issueSession(user);
};

export const rotateRefreshToken = async (token: string) => {
  const tokenHash = hashToken(token);
  const stored = await RefreshToken.findOne({
    tokenHash,
    revokedAt: { $exists: false },
    expiresAt: { $gt: new Date() },
  }).select('+tokenHash');
  if (!stored) throw new ApiError(401, 'Invalid or expired refresh token');

  const user = await User.findById(stored.userId);
  if (!user || !user.isActive) {
    const revoked = await RefreshToken.deleteOne({ _id: stored._id });
    if (revoked.deletedCount !== 1) {
      throw new ApiError(401, 'Refresh token has already been used');
    }
    throw new ApiError(401, 'Account is unavailable');
  }

  await RefreshToken.deleteOne({ _id: stored._id });
  return issueSession(user);
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  await RefreshToken.deleteOne({ tokenHash: hashToken(token) });
};
import { Schema, Types } from 'mongoose';
import { getModel } from './model.util';

interface RefreshTokenDocument {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, select: false },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: { type: Date },
  },
  { timestamps: true },
);

export const RefreshToken = getModel<RefreshTokenDocument>('RefreshToken', refreshTokenSchema);
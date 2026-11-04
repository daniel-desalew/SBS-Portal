import { Schema, Types } from 'mongoose';
import { getModel } from './model.util';

interface AuditLogDocument {
  actor?: Types.ObjectId;
  action: string;
  resource: string;
  resourceId?: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}

const auditLogSchema = new Schema<AuditLogDocument>(
  {
    actor: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true, maxlength: 100 },
    resource: { type: String, required: true, maxlength: 100 },
    resourceId: { type: String, maxlength: 100 },
    ip: { type: String, maxlength: 64 },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const AuditLog = getModel<AuditLogDocument>('AuditLog', auditLogSchema);
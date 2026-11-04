import { Schema, Types } from 'mongoose';
import { getModel } from './model.util';

interface NotificationDocument {
  user: Types.ObjectId;
  title: string;
  message: string;
  readAt?: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, maxlength: 160 },
    message: { type: String, required: true, maxlength: 2000 },
    readAt: { type: Date },
  },
  { timestamps: true },
);

export const Notification = getModel<NotificationDocument>('Notification', notificationSchema);
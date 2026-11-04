import { Schema } from 'mongoose';
import { getModel } from './model.util';

interface SettingDocument {
  key: string;
  value: unknown;
}

const settingSchema = new Schema<SettingDocument>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const Setting = getModel<SettingDocument>('Setting', settingSchema);
import { Setting } from '../../models/Setting.model';
import { ApiError } from '../../utils/ApiError';

export const getSetting = async (key: string) => {
  const setting = await Setting.findOne({ key }).lean();
  if (!setting) throw new ApiError(404, 'Setting not found');
  return setting;
};

export const listSettings = () => Setting.find().sort({ key: 1 }).lean();

export const setSetting = (key: string, value: unknown) =>
  Setting.findOneAndUpdate(
    { key },
    { $set: { value } },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();
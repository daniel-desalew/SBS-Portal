import { cloudinary } from '../config/cloudinary';
import { env } from '../config/env';

export const uploadBuffer = async (
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<string> => {
  if (!env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary storage is not configured');
  }

  const dataUri = `data:${contentType};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: 'auto',
    public_id: filename.replace(/\.[^.]+$/, ''),
    unique_filename: true,
  });
  return result.secure_url;
};
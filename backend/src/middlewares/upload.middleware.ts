import multer from 'multer';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.UPLOAD_MAX_BYTES, files: 5 },
  fileFilter(_request, file, callback) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new ApiError(415, 'Unsupported upload type'));
      return;
    }
    callback(null, true);
  },
});
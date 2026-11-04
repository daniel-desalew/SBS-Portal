'use client';

import { useState } from 'react';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body });
      if (!response.ok) throw new Error('File upload is not configured on this server');
      const result = (await response.json()) as { url?: string };
      if (!result.url) throw new Error('Upload response did not contain a file URL');
      return result.url;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};
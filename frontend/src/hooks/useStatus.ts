'use client';

import { useMutation } from '@tanstack/react-query';
import { apiGet } from '../lib/api';
import type { Application } from '../types';

export const useStatus = () =>
  useMutation({
    mutationFn: async (input: { referenceNumber: string; email: string }) => {
      const query = new URLSearchParams(input);
      return (await apiGet<Pick<Application, 'referenceNumber' | 'grade' | 'status' | 'createdAt'>>(
        `/status?${query}`,
      )).data;
    },
  });
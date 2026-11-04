'use client';

import { useMutation } from '@tanstack/react-query';
import { apiPost } from '../lib/api';
import type { Complaint } from '../types';

export const useCreateComplaint = () =>
  useMutation({
    mutationFn: async (input: {
      referenceNumber: string;
      email: string;
      subject: string;
      message: string;
    }) => (await apiPost<Complaint>('/complaints', input)).data,
  });
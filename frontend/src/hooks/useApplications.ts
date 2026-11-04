'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGet, apiPost } from '../lib/api';
import type { Application, Paginated } from '../types';

export const useApplications = (page = 1) =>
  useQuery({
    queryKey: ['applications', page],
    queryFn: async () => (await apiGet<Paginated<Application>>(`/applications?page=${page}`)).data,
  });

export const useSubmitApplication = () =>
  useMutation({
    mutationFn: async (application: unknown) =>
      (await apiPost<Application>('/applications', application)).data,
  });
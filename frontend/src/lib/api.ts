import { API_URL } from './constants';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
};

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiEnvelope<T>> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });
  const payload = (await response.json().catch(() => null)) as
    | (Partial<ApiEnvelope<T>> & { message?: string })
    | null;
  if (!response.ok) {
    throw new ApiClientError(payload?.message ?? `Request failed (${response.status})`, response.status);
  }
  return payload as ApiEnvelope<T>;
}

export const apiGet = <T>(path: string) => apiRequest<T>(path);
export const apiPost = <T>(path: string, data: unknown) =>
  apiRequest<T>(path, { method: 'POST', body: JSON.stringify(data) });
export const apiPatch = <T>(path: string, data: unknown) =>
  apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(data) });
export const apiPut = <T>(path: string, data: unknown) =>
  apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' });
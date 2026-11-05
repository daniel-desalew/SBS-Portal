export interface ApiResponseBody<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

const addLegacyIds = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(addLegacyIds);
  if (!value || typeof value !== 'object' || value instanceof Date) return value;
  const record = value as Record<string, unknown>;
  const serialized = Object.fromEntries(
    Object.entries(record).map(([key, entry]) => [key, addLegacyIds(entry)]),
  );
  if (typeof record.id === 'string' && !('_id' in serialized)) serialized._id = record.id;
  return serialized;
};

export class ApiResponse<T> {
  constructor(
    public readonly data: T,
    public readonly message = 'OK',
    public readonly meta?: Record<string, unknown>,
  ) {}

  toJSON(): ApiResponseBody<T> {
    return {
      success: true,
      message: this.message,
      data: addLegacyIds(this.data) as T,
      ...(this.meta ? { meta: this.meta } : {}),
    };
  }
}
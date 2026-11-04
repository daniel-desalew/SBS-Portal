export interface ApiResponseBody<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

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
      data: this.data,
      ...(this.meta ? { meta: this.meta } : {}),
    };
  }
}
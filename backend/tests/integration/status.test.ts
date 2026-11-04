import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';

describe('application status API', () => {
  it('requires a valid reference and email before querying', async () => {
    const response = await request(app).get('/api/v1/status');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
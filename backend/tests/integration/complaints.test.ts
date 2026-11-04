import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';

describe('complaints API', () => {
  it('validates complaint details before persistence', async () => {
    const response = await request(app).post('/api/v1/complaints').send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
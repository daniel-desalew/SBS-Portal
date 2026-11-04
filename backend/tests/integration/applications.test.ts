import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';
import { createApplicationSchema } from '../../src/modules/applications/applications.validation';
import { validApplicationFixture } from '../fixtures/application.fixture';

describe('applications API', () => {
  it('rejects invalid submissions before they reach persistence', async () => {
    const response = await request(app).post('/api/v1/applications').send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('accepts a valid application payload', () => {
    expect(createApplicationSchema.safeParse({ body: validApplicationFixture }).success).toBe(true);
  });
});
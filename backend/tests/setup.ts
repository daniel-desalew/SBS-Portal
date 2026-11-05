process.env.NODE_ENV = 'test';
process.env.API_PORT = '4000';
process.env.CLIENT_URL = 'http://localhost:3000';
process.env.DATABASE_URL = 'postgresql://test:test@127.0.0.1:5432/sbs_portal_test';
process.env.REDIS_URL = 'redis://127.0.0.1:6379';
process.env.JWT_ACCESS_SECRET = 'test-access-secret-value-with-more-than-32-characters';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-value-with-more-than-32-characters';
process.env.CAPTCHA_ENABLED = 'false';

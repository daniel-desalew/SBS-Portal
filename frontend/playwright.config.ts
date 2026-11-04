import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node .next/standalone/server.js',
    env: {
      HOSTNAME: '127.0.0.1',
      PORT: '3100',
    },
    url: 'http://127.0.0.1:3100/en',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

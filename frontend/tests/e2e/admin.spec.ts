import { expect, test } from '@playwright/test';

test('admin login page is available', async ({ page }) => {
  await page.goto('/en/admin/login');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});
import { expect, test } from '@playwright/test';

test('application status lookup requests the reference and email', async ({ page }) => {
  await page.goto('/en/admissions/apply/status');
  await expect(page.getByRole('heading', { name: 'Check application status' })).toBeVisible();
  await expect(page.getByLabel('Reference number')).toBeVisible();
  await expect(page.getByLabel('Email used to apply')).toBeVisible();
});
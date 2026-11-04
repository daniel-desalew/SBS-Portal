import { expect, test } from '@playwright/test';

test('grade 9 application form is available', async ({ page }) => {
  await page.goto('/en/admissions/apply/grade-9');
  await expect(page.getByRole('heading', { name: 'Grade 9 application' })).toBeVisible();
  await expect(page.getByLabel('First name')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit application' })).toBeVisible();
});
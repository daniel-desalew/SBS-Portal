import { expect, test } from '@playwright/test';

test('grade 10 application form is available', async ({ page }) => {
  await page.goto('/en/admissions/apply/grade-10');
  await expect(page.getByRole('heading', { name: 'Grade 10 application' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit application' })).toBeVisible();
});
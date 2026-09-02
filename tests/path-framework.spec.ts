import { expect, test } from '@playwright/test';

test('loads the Path Framework with its backend and GUI model', async ({ page }) => {
  const pingResponse = page.waitForResponse('**/services/ping');
  const modelResponse = page.waitForResponse('**/path/assets/model.json');

  await page.goto('/');

  expect((await pingResponse).ok()).toBeTruthy();
  expect((await modelResponse).ok()).toBeTruthy();
  await expect(page.locator('path-framework')).toBeAttached();
  await expect(page.getByText('Contacts', { exact: true }).first()).toBeVisible();
});

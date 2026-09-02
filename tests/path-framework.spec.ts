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

test('creates a person and shows it in the contacts list', async ({ page }) => {
  const suffix = Date.now().toString();
  const firstName = `Playwright${suffix}`;
  const familyName = `Test${suffix}`;

  await page.goto('/');
  await page.getByText('Contacts', { exact: true }).first().click();
  await page.getByText('New Person', { exact: true }).click();

  const personForm = page.locator('path-form').last();
  await expect(personForm).toBeVisible();
  const textInputs = personForm.locator('input[type="text"]');
  await textInputs.nth(0).fill(familyName);
  await textInputs.nth(1).fill(firstName);

  const createResponse = page.waitForResponse((response) =>
    response.request().method() === 'POST' && response.url().endsWith('/services/person')
  );
  await personForm.getByRole('button', { name: 'Ok', exact: true }).click();

  expect((await createResponse).ok()).toBeTruthy();
  await expect(page.getByText(`${firstName} ${familyName}`, { exact: true })).toBeVisible();
});

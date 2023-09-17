import { test, expect } from '@playwright/test';

test('loads the homepage', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const title = await page.title();
  expect(title).toBe('MyShop App');
});

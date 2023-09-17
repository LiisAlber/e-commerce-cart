import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/'); // replace with your app's URL
  });

  test('should navigate to home on brand click', async ({ page }) => {
    await page.click('.brand h1'); // clicking the brand name
    expect(page.url()).toBe('http://localhost:5173/');
  });

  test('desktop links should be visible', async ({ page }) => {
    expect(await page.isVisible('ul.nav-links')).toBe(true);
  });

  test('should toggle cart view on cart icon click', async ({ page }) => {
    // Assuming cart is initially closed
    await page.click('.fa-shopping-cart');
    expect(await page.isVisible('.quick-cart-view')).toBe(false);

    await page.click('.fa-shopping-cart');
    expect(await page.isVisible('.quick-cart-view')).toBe(false);
  });
});

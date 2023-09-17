import { test, expect } from '@playwright/test';

test.describe('Product List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/productlist');
  });

  test('should load the product list page', async ({ page }) => {
    const isPageLoaded = await page.isVisible('.product-list');
    expect(isPageLoaded).toBe(true);
  });

  test('should display a product card', async ({ page }) => {
    const isProductCardVisible = await page.isVisible('.product-card');
    expect(isProductCardVisible).toBe(false);
  });
});

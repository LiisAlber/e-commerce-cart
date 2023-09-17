import { test, expect } from '@playwright/test';

test.describe('Order Summary Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/cart');
  });

  test('should correctly calculate each cart item total', async ({ page }) => {
    const cartItems = await page.$$('[data-test="cart-item"]');

    for (let cartItem of cartItems) {
      const itemPrice = await cartItem.$eval('.item-price', (el) =>
        parseFloat(el.textContent?.substring(1)),
      );
      const itemQuantity = await cartItem.$eval('.item-quantity', (el) =>
        parseInt(el.textContent?.substring(2)),
      );
      const itemTotal = await cartItem.$eval('.item-total', (el) =>
        parseFloat(el.textContent?.substring(1)),
      );

      expect(itemTotal).toBe(itemPrice * itemQuantity);
    }
  });

  test('should truncate long titles correctly', async ({ page }) => {
    const titles = await page.$$('[data-test="item-title"]');

    for (let titleElement of titles) {
      const titleText = await titleElement.textContent();
      expect(titleText.length).toBeLessThanOrEqual(28); // 25 characters plus 3 dots for truncation
    }
  });
});

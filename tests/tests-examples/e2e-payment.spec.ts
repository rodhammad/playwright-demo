import { test, expect } from '@playwright/test'
import { checkoutForm, loadHomepage, loginForm } from '../utils/helper'

test.describe('New Payment', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page)
  })

  // Positive Scenario
  test('Positive Scenario for login + product order', async ({ page }) => {
    await loginForm(page, 'standard_user', 'secret_sauce', '#login-button');

    const productTitle = page.locator('.header_secondary_container span.title')
    await expect(productTitle).toContainText('Products');

    // Click first product to add to cart
    await page.click('.inventory_list .inventory_item:first-child');

    // Click cart icon to proceed to cart page
    await page.click('#shopping_cart_container')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/cart-page.jpg`, fullPage: true })

    // Click checkout button to proceed to checkout page
    await page.click('#checkout')
    // Fill in the checkout form
    await checkoutForm(page, 'John', 'Doe', '54737', '#continue')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/checkout-page.jpg`, fullPage: true })

    // Click to proceed with payment
    await page.click('#finish');
    
    const message = await page.locator('h2.complete-header')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'THANK YOU FOR YOUR ORDER'
    )

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/order-made.jpg`, fullPage: true })

    // Go back to products
    await page.click('#back-to-products');
  })
})

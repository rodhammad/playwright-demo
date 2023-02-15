import { test, expect } from '@playwright/test'
import { formInputs, loadHomepage } from '../utils/helper'

test.describe('Product Order Process', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page)
  })

  // Negative Scenario should fail at checkout form
  test('Negative Scenario', async ({ page }) => {
    test.fail()

    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'problem_user',
      'password': 'incorrect',
    }, '#login-button');

    const productTitle = page.locator('.header_secondary_container span.title')
    await expect(productTitle).toContainText('Products');

    // Click first product to add to cart
    await page.click('.inventory_list .inventory_item:first-child #add-to-cart-sauce-labs-backpack');

    // Click cart icon to proceed to cart page
    await page.click('#shopping_cart_container')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/cart-page.jpg`, fullPage: true })

    // Click checkout button to proceed to checkout page
    await page.click('#checkout')
    // Fill in the checkout form
    await formInputs(page, { 'firstName': 'John', 'lastName': 'Doe', 'postalCode': '12458', 'user-name': undefined, 'password': undefined }, '#continue')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/checkout-page.jpg`, fullPage: true })

    // Should NOT to proceed to payment
  })

  // Positive Scenario should login + complete product order + logout
  test('Positive Scenario', async ({ page }) => {
    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'standard_user',
      'password': 'secret_sauce',
    }, '#login-button');

    const productTitle = page.locator('.header_secondary_container span.title')
    await expect(productTitle).toContainText('Products');

    // Click first product to add to cart
    await page.click('.inventory_list .inventory_item:first-child #add-to-cart-sauce-labs-backpack');

    // Click cart icon to proceed to cart page
    await page.click('#shopping_cart_container')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/cart-page.jpg`, fullPage: true })

    // Click checkout button to proceed to checkout page
    await page.click('#checkout')
    // Fill in the checkout form
    await formInputs(page, { 'firstName': 'John', 'lastName': 'Doe', 'postalCode': '12458', 'user-name': undefined, 'password': undefined }, '#continue')

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/checkout-page.jpg`, fullPage: true })

    // Click to proceed to payment
    await page.click('.cart_footer button#finish');
    
    const message = page.locator('h2.complete-header')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'THANK YOU FOR YOUR ORDER'
    )

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/product-order/order-made.jpg`, fullPage: true })

    // Go back to products
    await page.click('#back-to-products');

    // Then logout
    await page.click('.bm-burger-button')
    await page.click('#logout_sidebar_link')
  })
})

import { test, expect } from '@playwright/test'
import { formInputs, loadHomepage } from '../utils/helper'

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page)
  })

  // Negative Scenario
  test('Negative Scenario for correct number of products', async ({ page }) => {
    test.fail()

    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'standard_user',
      'password': 'secret_sauce',
    }, '#login-button');

    const inventoryContainer = await page.$('.inventory_list')
    if (!inventoryContainer) {
      throw new Error('The class .inventory_list element was not found')
    }

    const inventoryItems = await inventoryContainer.$$('.inventory_item')
    expect(inventoryItems).toHaveLength(10)
  })

  // Positive Scenario
  test('Positive Scenario for product page', async ({ page }) => {
    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'standard_user',
      'password': 'secret_sauce',
    }, '#login-button');

    // Click goto product page
    await page.click('.inventory_list .inventory_item:first-child #item_4_title_link');

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/single-product-page.jpg`, fullPage: true })
  })
})


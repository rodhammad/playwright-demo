import { test, expect } from '@playwright/test'
import { loadHomepage, formInputs } from '../utils/helper'

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page)
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    test.fail()

    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'locked_out_user',
      'password': 'incorrect',
    }, '#login-button');

    const errorMessage = page.locator('.error-message-container h3[data-test="error"]');
    if (errorMessage) {
      await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    }

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/login/login-fail.jpg`, fullPage: true })
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await formInputs(page, {
      'firstName': undefined, 
      'lastName': undefined,
      'postalCode': undefined,
      'user-name': 'standard_user',
      'password': 'secret_sauce',
    }, '#login-button');

    const productTitle = page.locator('.header_secondary_container span.title')
    await expect(productTitle).toContainText('Products');

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/login/login-pass.jpg`, fullPage: true })

    // Then logout
    await page.click('.bm-burger-button')
    //await page.click('.logout_sidebar_link')
    const pageLogout = page.locator('#logout_sidebar_link')
    await expect(pageLogout).toContainText('Logout');
  })
})


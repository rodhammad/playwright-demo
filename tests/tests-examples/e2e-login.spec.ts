import { test, expect } from '@playwright/test'
import { loadHomepage, loginForm} from '../utils/helper'

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page)
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    await loginForm(page, 'invalid username', 'invalid password', '#login-button');

    const errorMessage = page.locator('.error-message-container h3[data-test="error"]');
    if (errorMessage) {
      await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    }
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await loginForm(page, 'standard_user', 'secret_sauce', '#login-button');

    const productTitle = page.locator('.header_secondary_container span.title')
    await expect(productTitle).toContainText('Products');

    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/home-page.jpg`, fullPage: true })

    // Then logout
    await page.click('.bm-burger-button')
    //await page.click('.logout_sidebar_link')
    const pageLogout = page.locator('#logout_sidebar_link')
    await expect(pageLogout).toContainText('Logout');
  })
})


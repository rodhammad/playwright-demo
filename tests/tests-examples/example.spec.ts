import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../utils/helper'

test.skip('Simple basic test', async ({ page }) => {
  await page.goto('/')
  const pageTitle = page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test.skip('Clicking on Elements', async ({ page }) => {
  await page.goto('/')
  await page.click('#login-button')
  await page.click('text=Login')

  const errorMessage = page.locator('.error-message-container')
  await expect(errorMessage).toContainText('Epic sadface: Username is required')
})

test.skip('Selectors', async ({ page }) => {
  // text
  await page.click('text=some text')

  // Css Selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // Only visible Css Selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#username .first')

  // XPath
  await page.click('//button')
})

test.describe.skip('My first test suite', () => {
  test('Working with Inputs @myTag', async ({ page }) => {
    await page.goto('/')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')
    await page.click('text=Sign in')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  // Should fail
  test('Assertions @myTag', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('https://www.saucedemo.com')
    await expect(page).toHaveTitle('Swaglabs')

    const element = page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Swaglabs')
    await expect(element).toHaveCount(1)

    const nonExistingElement = page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Screenshots', async ({ page }) => {
    // Take screenshot of full page
    await page.screenshot({ path: `tests/screenshots/home-page.jpg`, fullPage: true })
  })

  test('Single element Screenshot', async ({ page }) => {
    const elementHeader = await page.$('.login_logo')
    await elementHeader.screenshot({ path: `tests/screenshots/logo.jpg` })
  })
})

test.skip('Custom Helpers', async ({ page }) => {
  await loadHomepage(page)
  // await page.pause()
  await assertTitle(page)
})

import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../utils/helper'

test.describe('My first test suite', () => {
  // Should fail
  test('Negative Scenario', async ({ page }) => {
    test.fail()
    await page.goto('/')
    await expect(page).toHaveURL('https://www.saucedemo.com')
    await expect(page).toHaveTitle('Swaglabs')

    const element = page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Swaglabs')
    await expect(element).toHaveCount(1)

    //const nonExistingElement = page.locator('h5')
    //await expect(nonExistingElement).not.toBeVisible()
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
    if (!elementHeader) {
      throw new Error('The class .login_logo element was not found')
    }

    await elementHeader.screenshot({ path: `tests/screenshots/logo.jpg` })
  })
})

test.skip('Custom Helpers', async ({ page }) => {
  await loadHomepage(page)
  // await page.pause()
  await assertTitle(page)
})

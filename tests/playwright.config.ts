// @ts-check
import { PlaywrightTestConfig } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  testDir: './tests-examples/',
  testMatch: '*.spec.ts',
  fullyParallel: true,
  timeout: 30 * 2000, /* Maximum time one test can run for. */
  retries: 0,
  reporter: "html",
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1000
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0, /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com',
  },
  projects: [
   {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
}

export default config
import { chromium, Browser, Page, test } from '@playwright/test';

// Define login credentials
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// Define test scenarios
const scenarios: { name: string, steps: ((page: Page) => Promise<void>)[] }[] = [
  {
    name: 'Positive',
    steps: [
      // Login
      async (page: Page) => {
        await page.goto('/');
        await page.type('input[name="user-name"]', USERNAME);
        await page.type('input[name="password"]', PASSWORD);
        await Promise.all([
          page.waitForLoadState,
          page.click('input[type="submit"]')
        ]);
      },
      // Add first product to cart
      async (page: Page) => {
        await page.click('.inventory_item:first-child button.btn_inventory');
      },
      // Go to checkout page
      async (page: Page) => {
        await page.click('a.shopping_cart_link');
      },
      // Go to checkout form page
      async (page: Page) => {
        await page.click('button[id="checkout"]');
      },
      // Fill checkout form
      async (page: Page) => {
        await page.type('input[name="firstName"]', 'John');
        await page.type('input[name="lastName"]', 'Doe');
        await page.type('input[name="postalCode"]', '12345');
        await page.click('input[id="continue"]');
      },
      // Finish checkout
      async (page: Page) => {
        await page.click('button[id="finish"]');
      }
    ]
  },
  {
    name: 'Negative',
    steps: [
      // Login with performance_glitch_user Or incorrect credentials
      async (page: Page) => {
        await page.goto('/');
        await page.fill('input[name="user-name"]', 'performance_glitch_user');
        await page.fill('input[name="password"]', 'secret_sauce');
        await Promise.all([
          //page.waitForSelector('h3[data-test="error"]'),
          page.waitForLoadState,
          page.click('input[type="submit"]')
        ]);
      },
      // Add first product to cart
      async (page: Page) => {
        await page.click('.inventory_item:first-child button.btn_inventory');
      },
      // Go to checkout page
      async (page: Page) => {
        await page.click('a.shopping_cart_link');
      },
      // Go to checkout form page
      async (page: Page) => {
        await page.click('button[id="checkout"]');
      },
      // Fill checkout form
      async (page: Page) => {
        await page.type('input[name="firstName"]', 'John');
        await page.type('input[name="lastName"]', 'Doe');
        await page.type('input[name="postalCode"]', '12345');
        await page.click('input[id="continue"]');
      },
      // Finish checkout
      async (page: Page) => {
        await page.click('button[id="finish"]');
      }
    ]
  }
];

// Define test function
async function runTest(browser: Browser, scenario: { name: string, steps: ((page: Page) => Promise<void>)[] }) {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Run scenario steps and measure performance
  console.log(`Running ${scenario.name} scenario...`);
  for (const step of scenario.steps) {
    const start = Date.now();
    await step(page);
    const end = Date.now();
    console.log(`Step: ${step.name} - ${end - start}ms`);
  }

  // Generate report
  console.log(`Generating report for ${scenario.name} scenario...`);
  await page.waitForTimeout(5000); // wait for page load to complete
  await page.screenshot({ path: `./tests/screenshots/performance/${scenario.name}.png` });

  // Close context
  await context.close();
}

// Define test cases
test.describe('Site Speed Performance Test', () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  for (const scenario of scenarios) {
    test(scenario.name, async () => {
      await runTest(browser, scenario);
    });
  }
});

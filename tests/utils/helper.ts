export async function loadHomepage(page: { goto: (arg0: string) => any }) {
  await page.goto('/')
}

export async function assertTitle(page: { waitForSelector: (arg0: string) => any }) {
  await page.waitForSelector('h5')
}

// Login Form Assertion
export const loginForm = async (page, username: string, password: string, buttonID: string) => {
  await page.type("input[name='user-name']", username);
  await page.type("input[name='password']", password);
  await page.click(buttonID);
};

// Checkout Form Assertion
export async function checkoutForm(page, firstName: string, lastName: string, postalCode: number, buttonID: string) {
  await page.type("input[name='firstName']", firstName);
  await page.type("input[name='lastName']", lastName);
  await page.type("input[name='postalCode']", postalCode);
  await page.click(buttonID);
}
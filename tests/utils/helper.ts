export async function loadHomepage(page: { goto: (arg0: string) => any }) {
  await page.goto('/')
}

export async function assertTitle(page: { waitForSelector: (arg0: string) => any }) {
  await page.waitForSelector('h5')
}

/* ToDo create a more dynamic form input func */
// Login Form Assertion
export const loginForm = async (page: any, username: string, password: string, buttonSelector: string) => {
  await page.type("input[name='user-name']", username);
  await page.type("input[name='password']", password);
  await page.click(buttonSelector);
};

// Checkout Form Assertion
export async function checkoutForm(page: any, firstName: string, lastName: string, postalCode: string, buttonSelector: string) {
  //const zipCodeNumber = parseInt(postalCode, 10)

  await page.type("input[name='firstName']", firstName);
  await page.type("input[name='lastName']", lastName);
  await page.fill("input[name='postalCode']", postalCode);
  await page.click(buttonSelector);
}

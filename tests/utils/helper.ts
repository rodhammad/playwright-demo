export async function loadHomepage(page: { goto: (arg0: string) => any }) {
  await page.goto('/')
}

export async function assertTitle(page: { waitForSelector: (arg0: string) => any }) {
  await page.waitForSelector('h5')
}

// Form Assertion
export async function formInputs(page: any, options: { 'firstName'?: string, 'lastName'?: string, 'postalCode'?: string, 'user-name'?: string, 'password'?: string }, buttonSelector: string) {
  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      let inputName = key;
      inputName = inputName.replace(/\s+/g, '-');
      await page.type(`input[name='${key}']`, value);
    }
  }
  await page.click(buttonSelector);
}

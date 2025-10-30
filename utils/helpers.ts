import { faker } from '@faker-js/faker';
import { APIRequestContext, Page, test } from '@playwright/test';
import { API_ENDPOINTS, USER } from '../test-data/constants';

export function generateUniqueEmail() {
  return faker.string.alphanumeric(5).toLowerCase() + Date.now() + '@testmail.com' ;
}

/**
 * Login via API and return the response
 * Reference: https://www.automationexercise.com/api_list
 */
export async function loginViaAPI(request: APIRequestContext, email: string, password: string) {
  return await test.step(`Login via API with email: ${email}`, async () => {
    const response = await request.post(API_ENDPOINTS.verifyLogin, {
      form: {
        email: email,
        password: password,
      },
    });
    return response;
  });
}


/**
 * Get all products list via API
 * Reference: https://www.automationexercise.com/api_list
 */
export async function getAllProductsViaAPI(request: APIRequestContext) {
  return await test.step('Get all products via API', async () => {
    const response = await request.get(API_ENDPOINTS.productsList);
    return response;
  });
}

/**
 * Logout via API approach (navigating to logout endpoint)
 * This uses the page's context to perform logout while maintaining the hybrid API approach
 */
export async function logoutApi(page: Page) {
  return await test.step('Logout via API approach', async () => {
    await page.goto('/logout');
  });
}

/**
 * Sign up via API and return the response
 * Reference: https://www.automationexercise.com/api_list
 */
export async function signUpViaAPI(request: APIRequestContext) {
  return await test.step(`Sign up via API with email: ${USER.emailValid}`, async () => {
    const response = await request.post(API_ENDPOINTS.createAccount, {
      form: {
        name: USER.name,
        email: USER.emailValid,
        password: USER.passwordValid,
        title: USER.gender,
        birth_date: USER.dateOfBirth.day,
        birth_month: USER.dateOfBirth.month,
        birth_year: USER.dateOfBirth.year,
        firstname: USER.name,
        lastname: USER.lastName,
        company: USER.company,
        address1: USER.address,
        address2: USER.address2,
        country: USER.country,
        zipcode: USER.zipcode,
        state: USER.state,
        city: USER.city,
        mobile_number: USER.mobileNumber,
      },
    });
    return response;
  });
}

/**
 * Delete account via API and return the response
 * Reference: https://www.automationexercise.com/api_list
 */
export async function deleteAccountViaAPI(request: APIRequestContext, email: string, password: string) {
  return await test.step(`Delete account via API with email: ${email}`, async () => {
    const response = await request.delete(API_ENDPOINTS.deleteAccount, {
      form: {
        email: email,
        password: password,
      },
    });
    return response;
  });
}

/**
 * Calculate the expected total price based on unit price and quantity
 * @param priceString - The price string (e.g., "Rs. 1000")
 * @param quantity - The quantity of items
 * @returns The formatted total price string (e.g., "Rs. 2000")
 */
export function calculateExpectedTotal(priceString: string, quantity: number): string {
  const unitPriceNumber = parseInt(priceString.replace(/[^\d]/g, ''));
  return `Rs. ${unitPriceNumber * quantity}`;
}

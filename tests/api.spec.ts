import { test, expect } from '@playwright/test';
import { loginViaAPI, getAllProductsViaAPI } from '../utils/helpers';
import { USER } from '../test-data/constants';

test.describe('API Tests', { tag: '@api' }, () => {

  test.describe('Authentication API Tests', () => {

    test('Verify login with valid credentials via API', async ({ request }) => {
      const response = await loginViaAPI(request, USER.emailExisting, USER.passwordValid);
      
      // Verify response status
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe('User exists!');
    });

    test('Verify login with invalid credentials via API', async ({ request }) => {
      const response = await loginViaAPI(request, USER.emailInvalid, USER.passwordInvalid);
      
      // Note: API returns 200 status but with 404 responseCode in body
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(404);
      expect(responseBody.message).toBe('User not found!');
    });

    test('Verify login without email parameter via API', async ({ request }) => {
      const response = await request.post('/api/verifyLogin', {
        form: {
          password: USER.passwordValid,
        },
      });
      
      // Note: API returns 200 status but with 400 responseCode in body
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(400);
      expect(responseBody.message).toContain('Bad request');
    });
  });

  test.describe('Products API Tests', () => {

    test('Get All Products List via API', async ({ request }) => {
      const response = await getAllProductsViaAPI(request);
      
      // Verify response status
      expect(response.status()).toBe(200);
      
      // Verify response headers
      expect(response.headers()['content-type']).toContain('text/html');
      
      // Get and parse response body
      const responseBody = await response.json();
      
      // Verify response structure
      expect(responseBody).toHaveProperty('responseCode');
      expect(responseBody.responseCode).toBe(200);
      
      // Verify products array exists and has items
      expect(responseBody).toHaveProperty('products');
      expect(Array.isArray(responseBody.products)).toBeTruthy();
      expect(responseBody.products.length).toBeGreaterThan(0);
      
      // Verify first product structure
      const firstProduct = responseBody.products[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('brand');
      expect(firstProduct).toHaveProperty('category');
      

    });

    test('Verify POST method is not supported for Products List API', async ({ request }) => {
      const response = await request.post('/api/productsList');
      
      // Note: API returns 200 status but with 405 responseCode in body
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(405);
      expect(responseBody.message).toBe('This request method is not supported.');
    });

    test('Search product via API', async ({ request }) => {
      const response = await request.post('/api/searchProduct', {
        form: {
          search_product: 'top',
        },
      });
      
      // Verify response status
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody).toHaveProperty('products');
      expect(Array.isArray(responseBody.products)).toBeTruthy();
      expect(responseBody.products.length).toBeGreaterThan(0);
    });
  });

  test.describe('Brands API Tests', () => {

    test('Get All Brands List via API', async ({ request }) => {
      const response = await request.get('/api/brandsList');
      
      // Verify response status
      expect(response.status()).toBe(200);
      
      // Verify response body
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody).toHaveProperty('brands');
      expect(Array.isArray(responseBody.brands)).toBeTruthy();
      expect(responseBody.brands.length).toBeGreaterThan(0);
      
      // Verify first brand structure
      const firstBrand = responseBody.brands[0];
      expect(firstBrand).toHaveProperty('id');
      expect(firstBrand).toHaveProperty('brand');
    });
  });
});


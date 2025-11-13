import { test, expect } from '../fixtures/page-fixtures';
import { USER, MESSAGE } from '../test-data/constants';
import { getAllProductsViaAPI, calculateExpectedTotal, signUpViaAPI, deleteAccountViaAPI } from '../utils/helpers';

/**
 * Hybrid API + UI Tests
 * These tests demonstrate a hybrid approach where:
 * 1. API is used to fetch product data (fast and efficient)
 * 2. Product details are stored in variables
 * 3. UI is used to add products to cart and verify the workflow
 * 4. Products are deleted from cart and user account is deleted
 * 
 * This approach combines the speed of API testing with the reliability of UI validation
 */

test.describe('Hybrid API + UI Cart Tests', { tag: '@hybrid-cart' }, () => {

  // Variables to store product details fetched from API
  let firstProduct: any;
  let secondProduct: any;


  test.beforeEach(async ({ request, homePage, loginSignUpPage }) => {
    // Get all products via API and store first two products
    let response = await getAllProductsViaAPI(request);
    expect(response.status()).toBe(200);

    let responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBeGreaterThan(1);

    // Store first and second product details
    firstProduct = responseBody.products[0];
    secondProduct = responseBody.products[1];

    // SignUp via API
    response = await signUpViaAPI(request);
    expect(response.status()).toBe(200);
    responseBody = await response.json();
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe(MESSAGE.accountCreatedAPI);

    // Navigate and login to home page
    await homePage.navigateToHomePage();
    await homePage.clickSignupLoginLink();
    await loginSignUpPage.login(USER.emailValid, USER.passwordValid); 
    await homePage.waitForLoggedInUserName(USER.name);
  });

  test('Hybrid: Verify adding single product to cart', async ({ homePage, productsPage, productDetailPage, cartPage }) => {

    // Add first product to cart via UI
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart and verify product
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();
    console.log(await cartPage.getProductInCart(firstProduct.name));

    // Verify product price matches what we got from API
    const priceInCart = await cartPage.getProductPrice(firstProduct.name);
    expect(priceInCart?.trim()).toBe(firstProduct.price);

  });

  test('Hybrid: Verify adding multiple products to cart', async ({ homePage, productsPage, productDetailPage, cartPage }) => {

    // Add first product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Add second product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(secondProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart and verify both products
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(secondProduct.name)).toBeVisible();

    // Verify first product price
    const firstPriceInCart = await cartPage.getProductPrice(firstProduct.name);
    expect(firstPriceInCart?.trim()).toBe(firstProduct.price);

    // Verify second product price
    const secondPriceInCart = await cartPage.getProductPrice(secondProduct.name);
    expect(secondPriceInCart?.trim()).toBe(secondProduct.price);

  });

  test('Hybrid: Verify deleting products from cart', async ({ homePage, productsPage, productDetailPage, cartPage }) => {

    // Add first product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Add second product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(secondProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart and verify both products exist
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(secondProduct.name)).toBeVisible();

    // Delete first product and verify
    await cartPage.deleteProduct(firstProduct.name);

    // Wait for page to stabilize after deletion
    await expect(await cartPage.getProductInCart(firstProduct.name)).not.toBeVisible();

    // Delete second product and verify empty cart
    await cartPage.deleteProduct(secondProduct.name);
    await expect(await cartPage.getProductInCart(secondProduct.name)).not.toBeVisible();
    await cartPage.waitForVisible(await cartPage.emptyCart);
    await expect(await cartPage.emptyCart).toBeVisible();
  });

  test('Hybrid: Verify cart item details (price, name, quantity)', async ({ homePage, productsPage, productDetailPage, cartPage }) => {

    // Add first product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Add second product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(secondProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart
    await homePage.clickCartLink();

    // Verify first product details
    const firstProductName = await cartPage.getProductName(firstProduct.name);
    const firstProductPrice = await cartPage.getProductPrice(firstProduct.name);
    const firstProductQuantity = await cartPage.getProductQuantity(firstProduct.name);
    const firstProductTotal = await cartPage.getProductTotalPrice(firstProduct.name);

    expect(firstProductName?.trim()).toBe(firstProduct.name);
    expect(firstProductPrice?.trim()).toBe(firstProduct.price);
    expect(firstProductQuantity?.trim()).toBe('1');
    expect(firstProductTotal?.trim()).toBe(firstProduct.price);

    // Verify second product details
    const secondProductName = await cartPage.getProductName(secondProduct.name);
    const secondProductPrice = await cartPage.getProductPrice(secondProduct.name);
    const secondProductQuantity = await cartPage.getProductQuantity(secondProduct.name);
    const secondProductTotal = await cartPage.getProductTotalPrice(secondProduct.name);

    expect(secondProductName?.trim()).toBe(secondProduct.name);
    expect(secondProductPrice?.trim()).toBe(secondProduct.price);
    expect(secondProductQuantity?.trim()).toBe('1');
    expect(secondProductTotal?.trim()).toBe(secondProduct.price);

  });

  test('Hybrid: Verify adding same product twice with quantity and total', async ({ homePage, productsPage, productDetailPage, cartPage }) => {

    // Add first product to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Add the same product again
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart
    await homePage.clickCartLink();

    // Verify product is visible
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();

    // Get product details
    const productName = await cartPage.getProductName(firstProduct.name);
    const productPrice = await cartPage.getProductPrice(firstProduct.name);
    const productQuantity = await cartPage.getProductQuantity(firstProduct.name);
    const productTotal = await cartPage.getProductTotalPrice(firstProduct.name);

    // Verify product name matches API data
    expect(productName?.trim()).toBe(firstProduct.name);

    // Verify product price matches API data
    expect(productPrice?.trim()).toBe(firstProduct.price);

    // Verify quantity is 2 (added twice)
    expect(productQuantity?.trim()).toBe('2');

    // Verify total price is quantity * unit price
    const quantityNumber = parseInt(productQuantity?.trim() || '0');
    const expectedTotal = calculateExpectedTotal(firstProduct.price, quantityNumber);
    expect(productTotal?.trim()).toBe(expectedTotal);

  });

  test.afterEach(async ({ request }) => {
    const response = await deleteAccountViaAPI(request, USER.emailValid, USER.passwordValid);
    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe(MESSAGE.accountDeletedAPI);

  });
});


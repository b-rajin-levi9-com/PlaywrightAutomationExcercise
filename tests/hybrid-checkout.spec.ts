import { test, expect } from '../fixtures/page-fixtures';
import { USER,CHECKOUT, MESSAGE } from '../test-data/constants';
import { getAllProductsViaAPI, generateUniqueEmail, deleteAccountViaAPI } from '../utils/helpers';

/**
 * Hybrid Checkout Tests (Test Cases 14 & 15)
 * These tests demonstrate the complete checkout flow with different registration approaches:
 * - Test Case 14: Register during checkout process
 * - Test Case 15: Register before checkout process
 * 
 * Hybrid approach: API fetches product data, UI performs checkout workflow
 */

test.describe('Hybrid Checkout Tests', { tag: '@hybrid-checkout' }, () => {
  // Configure tests to run serially to avoid account conflicts
  // test.describe.configure({ mode: 'serial' });

  // Variables to store product details fetched from API
  let firstProduct: any;
  let secondProduct: any;


  test.beforeEach(async ({ request }) => {
    // Get all products via API and store first two products
    const response = await getAllProductsViaAPI(request);
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBeGreaterThan(1);
    
    // Store first and second product details
    firstProduct = responseBody.products[0];
    secondProduct = responseBody.products[1];

  });

  test('Place Order - Register while Checkout', async ({ 
    homePage, 
    productsPage, 
    productDetailPage, 
    cartPage, 
    loginSignUpPage,
    checkoutPage,
    paymentPage
  }) => {
    
    // Navigate to home page 
    await homePage.navigateToHomePage();

    // Add products to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(secondProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart and verify cart page is displayed
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(secondProduct.name)).toBeVisible();

    // Click Proceed To Checkout
    await cartPage.clickProceedToCheckoutBtn();

    // Click Register/Login button from checkout modal
    await checkoutPage.clickRegisterLogin();

    // Fill all details in Signup and create account
    await loginSignUpPage.fullSignUpWithUser();

    // Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await loginSignUpPage.waitForAccountCreatedMessage();
    await loginSignUpPage.clickContinueButton();

    // Verify 'Logged in as username' at top
   await homePage.waitForLoggedInUserName(USER.name);

    // Click 'Cart' button
    await homePage.clickCartLink();

    // Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckoutBtn();

    // Verify delivery address contains the user details
    const deliveryAddress = await checkoutPage.getDeliveryAddress();
    expect(deliveryAddress).toContain(USER.address);

    // Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment(CHECKOUT.comment);
    await checkoutPage.clickPlaceOrder();

    // Enter payment details and click 'Pay and Confirm Order'
    await paymentPage.enterPaymentDetails();
    await paymentPage.clickPayAndConfirm();

    // Verify success message 'Your order has been placed successfully!'
    expect(await paymentPage.getSuccessMessageText()).toBe(MESSAGE.orderSuccess);

  });

  test('Place Order - Register before Checkout', async ({ 
    homePage, 
    productsPage, 
    productDetailPage, 
    cartPage, 
    loginSignUpPage,
    checkoutPage,
    paymentPage,
  }) => {
    
    // Navigate to home page 
    await homePage.navigateToHomePage();

    // Click 'Signup / Login' button
    await homePage.clickSignupLoginLink();

    // Fill all details in Signup and create account
    await loginSignUpPage.fullSignUpWithUser();

    // Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await loginSignUpPage.waitForAccountCreatedMessage();
    await loginSignUpPage.clickContinueButton();  

    // Verify 'Logged in as username' at top
    await homePage.waitForLoggedInUserName(USER.name);

    // Add products to cart
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(firstProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(secondProduct.name);
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();

    // Navigate to cart and verify cart page is displayed
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(firstProduct.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(secondProduct.name)).toBeVisible();

    // Click Proceed To Checkout
    await cartPage.clickProceedToCheckoutBtn();

    // Verify delivery address contains the user details
    const deliveryAddress = await checkoutPage.getDeliveryAddress();
    expect(deliveryAddress).toContain(USER.address);

    // Verify billing address contains the user details
    const billingAddress = await checkoutPage.getBillingAddress();
    expect(billingAddress).toContain(USER.address);

    // Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment(CHECKOUT.comment);
    await checkoutPage.clickPlaceOrder();

    // Enter payment details and click 'Pay and Confirm Order'
    await paymentPage.enterPaymentDetails();
    await paymentPage.clickPayAndConfirm();

    // Verify success message 'Your order has been placed successfully!'
    expect(await paymentPage.getSuccessMessageText()).toBe(MESSAGE.orderSuccess);

  });

  test.afterEach(async ({ request }) => {
    const response = await deleteAccountViaAPI(request, USER.emailValid, USER.passwordValid);
    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe(MESSAGE.accountDeletedAPI);

  });
});


import { test, expect } from '../fixtures/page-fixtures';

import { PRODUCTS, USER, GENDER } from '../test-data/constants';

test.describe('Verify cart functionality',{ tag: '@cart'}, () => {


  test.beforeEach(async ({ homePage, loginSignUpPage }) => {

    await homePage.navigateToHomePage();
    await homePage.clickSignupLoginLink();
    await loginSignUpPage.fullSignUpWithUser();
    await loginSignUpPage.clickContinueButton();
    await homePage.waitForLogoutLink();
  });

  test('Verify adding single product to cart', async ({ page, productsPage, productDetailPage, homePage, cartPage}) => {

    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(PRODUCTS.sleevelessDress.name); 
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(PRODUCTS.sleevelessDress.name)).toBeVisible();
  });

  test('Verify adding multiple products to cart', async ({ productsPage, productDetailPage, homePage, cartPage}) => {

    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(PRODUCTS.fancyGreenTop.name);     
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(PRODUCTS.sleevelessDress.name);    
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(PRODUCTS.fancyGreenTop.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(PRODUCTS.sleevelessDress.name)).toBeVisible();
  });

  test('Verify deleting product from cart', async ({ productsPage, productDetailPage, homePage, cartPage, page}) => {

    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(PRODUCTS.fancyGreenTop.name);    
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();
    await homePage.clickProductsLink();
    await productsPage.clickViewProduct(PRODUCTS.sleevelessDress.name);   
    await productDetailPage.addToCart();
    await productDetailPage.clickContinueShopping();
    await homePage.clickCartLink();
    await expect(await cartPage.getProductInCart(PRODUCTS.fancyGreenTop.name)).toBeVisible();
    await expect(await cartPage.getProductInCart(PRODUCTS.sleevelessDress.name)).toBeVisible();
    await cartPage.deleteProduct(PRODUCTS.sleevelessDress.name);
    await expect(await cartPage.getProductInCart(PRODUCTS.sleevelessDress.name)).not.toBeVisible();
    await cartPage.deleteProduct(PRODUCTS.fancyGreenTop.name);
    await expect(await cartPage.getProductInCart(PRODUCTS.fancyGreenTop.name)).not.toBeVisible();
    await expect(await cartPage.emptyCart).toBeVisible();

  });

  test.afterEach(async ({ homePage, accountDeletedPage }) => { 
    await homePage.deleteAccount();
    expect(await accountDeletedPage.getAccountDeletedHeading()).toBeVisible();
  });
  
});


import { test as base } from '@playwright/test';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import LoginSignUpPage from '../pages/LoginSignUpPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import AccountDeletedPage from '../pages/AccountDeletedPage';

type PageFixtures = {
    homePage: HomePage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
    loginSignUpPage: LoginSignUpPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
    accountDeletedPage: AccountDeletedPage;
}

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    loginSignUpPage: async ({ page }, use) => {
        await use(new LoginSignUpPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },
    accountDeletedPage: async ({ page }, use) => {
        await use(new AccountDeletedPage(page));
    },
    
});
export { expect } from '@playwright/test';
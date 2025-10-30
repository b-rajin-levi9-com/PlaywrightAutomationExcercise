import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';

export default class ProductDetailPage extends BasePage {
    readonly priceText: Locator;
    readonly addToCartButton: Locator;
    readonly addedModalTitle: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.priceText = page.getByText(/^Rs\.\s*\d+$/);
        this.addToCartButton = page.getByRole('button', { name: /Add to cart/i });
        this.addedModalTitle = page.getByRole('heading', { name: /Added!/i });
        this.continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/i });
    }


    async getProductDetailPageTitle() {
        return await this.page.title();
    }


    async addToCart() {
        await this.addToCartButton.click();
    }



    async clickContinueShopping() {
        await test.step('Click Continue Shopping', async () => {
            await this.waitForVisible(this.addedModalTitle);
            await this.continueShoppingButton.click();
        });
    }

}
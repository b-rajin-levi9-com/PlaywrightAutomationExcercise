import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';

export default class CheckoutPage extends BasePage {

    readonly addressDeliverySection: Locator;
    readonly addressBillingSection: Locator;
    readonly reviewOrderSection: Locator;
    readonly commentTextArea: Locator;
    readonly placeOrderButton: Locator;
    readonly registerLoginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.addressDeliverySection = page.locator('#address_delivery');
        this.addressBillingSection = page.locator('#address_invoice');
        this.reviewOrderSection = page.locator('#cart_info');
        this.commentTextArea = page.locator('textarea.form-control');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        this.registerLoginLink = page.getByRole('link', { name: /Register.*Login/i });
    }

    async clickRegisterLogin() {
        await test.step('Click Register/Login link', async () => {
            await this.waitForVisible(this.registerLoginLink);
            await this.registerLoginLink.click();
        });
    }

    async getAddressDetails() {
        await test.step('Verify Address Details', async () => {
            await expect(this.addressDeliverySection).toBeVisible();
            await expect(this.addressBillingSection).toBeVisible();
        });
    }

    async getReviewOrder() {
        await this.waitForVisible(this.reviewOrderSection);
        return await this.reviewOrderSection;
    }

    async getDeliveryAddress(): Promise<string | null> {
        await this.waitForVisible(this.addressDeliverySection);
        return await this.addressDeliverySection.textContent();
    }

    async getBillingAddress(): Promise<string | null> {
        await this.waitForVisible(this.addressBillingSection);
        return await this.addressBillingSection.textContent();
    }

    async enterComment(comment: string) {
        await test.step(`Enter comment: ${comment}`, async () => {
            await this.waitForVisible(this.commentTextArea);
            await this.commentTextArea.fill(comment);
        });
    }

    async clickPlaceOrder() {
        await test.step('Click Place Order button', async () => {
            await this.waitForVisible(this.placeOrderButton);
            await this.placeOrderButton.click();
        });
    }
}


import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';
import { MESSAGE, PAYMENT } from '../test-data/constants';

export default class PaymentPage extends BasePage {

    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly payAndConfirmButton: Locator;
    readonly successMessage: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.getByTestId('name-on-card');
        this.cardNumberInput = page.getByTestId('card-number');
        this.cvcInput = page.getByTestId('cvc');
        this.expirationMonthInput = page.getByTestId('expiry-month');
        this.expirationYearInput = page.getByTestId('expiry-year');
        this.payAndConfirmButton = page.getByTestId('pay-button');
        this.successMessage = page.getByText(MESSAGE.orderSuccess);
        this.downloadInvoiceButton = page.getByRole('link', { name: /Download Invoice/i });
        this.continueButton = page.getByTestId('continue-button');
    }

    async enterPaymentDetails() {
        await test.step('Enter payment details', async () => {
            await this.nameOnCardInput.fill(PAYMENT.nameOnCard);
            await this.cardNumberInput.fill(PAYMENT.cardNumber);
            await this.cvcInput.fill(PAYMENT.cvc);
            await this.expirationMonthInput.fill(PAYMENT.expirationMonth);
            await this.expirationYearInput.fill(PAYMENT.expirationYear);
        });
    }

    async clickPayAndConfirm() {
        await test.step('Click Pay and Confirm Order button', async () => {
            await this.waitForVisible(this.payAndConfirmButton);
            await this.payAndConfirmButton.click();
        });
    }

    async getSuccessMessageText(): Promise<string | null> {
        await this.waitForVisible(this.successMessage);
        return await this.successMessage.textContent();
    }

    async clickDownloadInvoice() {
        await test.step('Click Download Invoice button', async () => {
            await this.waitForVisible(this.downloadInvoiceButton);
            await this.downloadInvoiceButton.click();
        });
    }

    async clickContinue() {
        await test.step('Click Continue button', async () => {
            await this.waitForVisible(this.continueButton);
            await this.continueButton.click();
        });
    }
}


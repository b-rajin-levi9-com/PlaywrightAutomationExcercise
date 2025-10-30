import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';

export default class AccountDeletedPage extends BasePage {

    readonly accountDeletedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountDeletedHeading = page.getByTestId('account-deleted');
        this.continueButton = page.getByTestId('continue-button');
    }

    async getAccountDeletedHeading() {
        await this.waitForVisible(this.accountDeletedHeading);
        return await this.accountDeletedHeading;
    }

    async clickContinue() {
        await test.step('Click Continue button', async () => {
            await this.waitForVisible(this.continueButton);
            await this.continueButton.click();
        });
    }

}


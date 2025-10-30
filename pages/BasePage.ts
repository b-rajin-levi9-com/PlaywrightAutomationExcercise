import { Locator, Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

async navigateTo(url: string) {
    await this.page.goto(url);
  }

async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
}
async waitForHidden(locator: Locator) {
    await locator.waitFor({ state: 'hidden' });
}

async scrollIntoView(locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
}
async selectRadio(locator: Locator) {
    await locator.check();
}

}
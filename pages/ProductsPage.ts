import BasePage from './BasePage';
import { Locator, Page, test } from '@playwright/test';

export default class ProductsPage extends BasePage {
  readonly headingAllProducts: Locator;
  readonly productCard: Locator;
  readonly viewProductLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headingAllProducts = page.getByRole('heading', { name: /All Products/i });
    this.productCard = page.locator('.features_items .col-sm-4');

  }

  async waitForHeadingAllProducts() {
    await this.waitForVisible(this.headingAllProducts);
  }
  async getProductsPageTitle() {
    return await this.page.title();
  }

  async productCardByName(productName: string) {
    return await this.productCard.filter({ has: this.page.getByText(productName, { exact: true }) });
  }

  async clickViewProduct(productName: string){
    await test.step(`Click on View Product for "${productName}"`, async () => {
      await this.waitForHeadingAllProducts();
      const card = await this.productCardByName(productName);
      await this.scrollIntoView(card);
      const viewProductLink = card.getByRole('link', { name: /View Product/i });
      await viewProductLink.click();
    });
  }
}
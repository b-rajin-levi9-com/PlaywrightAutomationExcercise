import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';

export default class CartPage extends BasePage {

    readonly cartTable: Locator;
    readonly proceedToCheckoutBtn: Locator
    readonly emptyCart: Locator
    
    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.proceedToCheckoutBtn = page.locator('a.btn.check_out').filter({ hasText: 'Proceed To Checkout' });
        this.emptyCart = page.locator('#empty_cart').getByText(/Cart is empty!/i);


    }
    async getProductInCart(productName: string)  {
        const product = this.cartTable.getByText(productName, { exact: true });
        return product;
      }

      async clickProceedToCheckoutBtn() {
        await this.waitForVisible(this.proceedToCheckoutBtn);
        await this.proceedToCheckoutBtn.click();
      }

      /**
       * Delete product from cart
       * @param productName - The name of the product
       */
      async deleteProduct(productName: string) {
        await test.step(`Delete product "${productName}" from cart`, async () => {
            const row = this.page.locator('tr', {
              has: this.page.getByRole('link', { name: productName })
            }); 
            await row.locator('td.cart_delete a.cart_quantity_delete').click();
        });
      }

      /**
       * Get product price for a specific product in cart
       * @param productName - The name of the product
       * @returns The price text content
       */
      async getProductPrice(productName: string): Promise<string | null> {
        const row = this.page.locator('tr', {
          has: this.page.getByRole('link', { name: productName })
        });
        return await row.locator('td.cart_price p').textContent();
      }

      /**
       * Get product quantity for a specific product in cart
       * @param productName - The name of the product
       * @returns The quantity text content
       */
      async getProductQuantity(productName: string): Promise<string | null> {
        const row = this.page.locator('tr', {
          has: this.page.getByRole('link', { name: productName })
        });
        return await row.getByRole('button').textContent();
      }

      /**
       * Get product total price for a specific product in cart
       * @param productName - The name of the product
       * @returns The total price text content
       */
      async getProductTotalPrice(productName: string): Promise<string | null> {
        const row = this.page.locator('tr', {
          has: this.page.getByRole('link', { name: productName })
        });
        return await row.locator('p.cart_total_price').textContent();
      }

      /**
       * Get product name for a specific product in cart
       * @param productName - The name of the product
       * @returns The product name text content
       */
      async getProductName(productName: string): Promise<string | null> {
        const row = this.page.locator('tr', {
          has: this.page.getByRole('link', { name: productName })
        });
        return await row.getByRole('link', { name: productName }).textContent();
      }


}
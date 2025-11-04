import { Locator, expect, Page, test } from '@playwright/test';
import BasePage from './BasePage';
import { TITTLE } from '../test-data/constants';

export default class HomePage extends BasePage {

  readonly tittle: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator; 
  readonly deleteAccountLink: Locator;


  constructor(page: Page) {
    super(page);
    this.tittle = page.getByTitle(TITTLE.home);
    this.homeLink = page.getByRole('link', { name: 'Home'});
    this.productsLink = page.locator('a[href="/products"]').first();
    this.cartLink = page.getByRole('link', { name: 'Cart'}).first();
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login'});
    this.logoutLink = page.getByRole('link', { name: 'Logout'});
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account'});


  }

  async navigateToHomePage() {
    await this.navigateTo('/');
  }

  async getHomePageTitle() {
    return await this.page.title();
  }
  
  async getLoggedInUserName(name: string) {
    return this.page.getByText(`Logged in as ${name}`);
  }

  async clickProductsLink() {
    await test.step('Click on Products link', async () => {
      await this.waitForProductsLink();
      await this.productsLink.click();
    });
  }

  async waitForCartLink() {
    await this.waitForVisible(this.cartLink);
  }

  async clickCartLink() {
    await test.step('Click on Cart link', async () => {
      await this.waitForCartLink();
      await this.cartLink.click();
    });
    await this.cartLink.click();
  }
  
  async clickSignupLoginLink() {
    await test.step('Click on Signup/Login link', async () => {
      await this.waitForSignupLoginLink();
      await this.signupLoginLink.click();
    });
    await this.signupLoginLink.click();
  }

  async waitForLoggedInUserName(name: string) {
    await this.waitForVisible(this.page.getByText(`Logged in as ${name}`));
  }

  async waitForProductsLink() {
    await this.waitForVisible(this.productsLink);
  }

  async waitForLogoutLink() {
    await this.waitForVisible(this.logoutLink);
  }

  async waitForDeleteAccountLink() {
    await this.waitForVisible(this.deleteAccountLink);
  }

  async waitForSignupLoginLink() {
    await this.waitForVisible(this.signupLoginLink);
  }

  async logout() {
    await test.step('Logout', async () => {
      await this.waitForVisible(this.logoutLink);
      await this.logoutLink.click();
    });
  }

  async deleteAccount() {
    await test.step('Delete Account', async () => {
      await this.waitForDeleteAccountLink();
      await this.deleteAccountLink.click();
    });
  }
  
}
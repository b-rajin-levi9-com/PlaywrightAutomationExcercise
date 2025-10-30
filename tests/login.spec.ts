import { test, expect } from '../fixtures/page-fixtures';
import { USER } from '../test-data/constants';
test.describe('Verify login functionality',{ tag: '@login'}, () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePage();
    await homePage.clickSignupLoginLink();
  });

  test('Verify login with invalid email', async ({ loginSignUpPage,  }) => {
    await loginSignUpPage.login(USER.emailInvalid, USER.passwordValid);
    await loginSignUpPage.waitForLoginErrorMessage();
    await expect(loginSignUpPage.loginErrorMessage).toBeVisible();
  });


  test('Verify login with invalid password', async ({loginSignUpPage}) => {
    await loginSignUpPage.login(USER.emailValid, USER.passwordInvalid);
    await loginSignUpPage.waitForLoginErrorMessage();
    await expect(loginSignUpPage.loginErrorMessage).toBeVisible();
  });

  test('Verify login with valid credentials', async ({loginSignUpPage, homePage }) => {
    await loginSignUpPage.login(USER.emailExisting, USER.passwordValid);
    await homePage.waitForLogoutLink();
    await expect(homePage.logoutLink).toBeVisible();
    await homePage.waitForDeleteAccountLink();
    await expect(homePage.deleteAccountLink).toBeVisible();
  });
  test('Verify logout', async ({ homePage, loginSignUpPage }) => {
    await loginSignUpPage.login(USER.emailExisting, USER.passwordValid);
    await homePage.logout();
    await homePage.waitForSignupLoginLink();
    await expect(homePage.signupLoginLink).toBeVisible();
  });
});
import { test, expect } from '../fixtures/page-fixtures';
import { USER} from '../test-data/constants';
test.describe('Verify sign up functionality',{ tag: '@signup'}, () => {
let name = USER.name;
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePage();
    await homePage.clickSignupLoginLink();
  });

  test('Verify sign up with existing email', async ({  loginSignUpPage, homePage }) => {

    await loginSignUpPage.signUp(USER.name, USER.emailExisting);
    await loginSignUpPage.waitForSignUpErrorMessage();
    await expect(loginSignUpPage.signUpErrorMessage).toBeVisible();
    
  });

  test('Verify sign up with valid credentials @smoke', async ({ loginSignUpPage, homePage }) => {

    await loginSignUpPage.fullSignUpWithUser();
    await loginSignUpPage.waitForAccountCreatedMessage();
    await loginSignUpPage.clickContinueButton();
    await homePage.waitForLoggedInUserName(USER.name);
    await homePage.deleteAccount();
    await homePage.waitForSignupLoginLink();
    await expect(homePage.signupLoginLink).toBeVisible();
    
  });
});
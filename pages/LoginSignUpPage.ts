import BasePage from './BasePage';
import { Locator, Page, expect, test } from '@playwright/test';
import { MESSAGE, HEADING, USER } from '../test-data/constants';
import { generateUniqueEmail } from '../utils/helpers';

export default class LoginSignUpPage extends BasePage {

    readonly nameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly signUpErrorMessage: Locator;
    readonly signUpHeading: Locator;
    readonly signUpPasswordInput: Locator;
    readonly FirstNameInput: Locator;
    readonly LastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedMessage: Locator;
    readonly continueButton: Locator;
    readonly dateOfBirthDayInput: Locator;
    readonly dateOfBirthMonthInput: Locator;
    readonly dateOfBirthYearInput: Locator;
    readonly countryInput: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.getByTestId('signup-name');
        this.signUpEmailInput = page.getByTestId('signup-email');
        this.signUpButton = page.getByTestId('signup-button');
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');
        this.loginErrorMessage = page.getByText(MESSAGE.loginError);
        this.signUpErrorMessage = page.getByText(MESSAGE.signUpError);
        this.signUpHeading = page.getByRole('heading', { name: HEADING.signup });
        this.signUpPasswordInput = page.getByTestId('password');
        this.FirstNameInput = page.getByTestId('first_name');
        this.LastNameInput = page.getByTestId('last_name');
        this.companyInput = page.getByTestId('company');
        this.addressInput = page.getByTestId('address');
        this.address2Input = page.getByTestId('address2');
        this.stateInput = page.getByTestId('state');
        this.cityInput = page.getByTestId('city');
        this.zipcodeInput = page.getByTestId('zipcode');
        this.mobileNumberInput = page.getByTestId('mobile_number');
        this.createAccountButton = page.getByTestId('create-account');
        this.accountCreatedMessage = page.getByTestId('account-created');
        this.continueButton = page.getByTestId('continue-button');
        this.dateOfBirthDayInput = page.getByTestId('days');
        this.dateOfBirthMonthInput = page.getByTestId('months');
        this.dateOfBirthYearInput = page.getByTestId('years');
        this.countryInput = page.getByTestId('country');
    }


    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillSignUpEmail(email: string) {
        await this.signUpEmailInput.fill(email);
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async fillLoginEmail(email: string) {
        await this.loginEmailInput.fill(email);
    }

    async fillLoginPassword(password: string) {
        await this.loginPasswordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

    async fillSignUpPassword(password: string) {
        await this.signUpPasswordInput.fill(password);
    }

    async fillFirstName(firstName: string) {
        await this.FirstNameInput.fill(firstName);
    }
    async fillLastName(lastName: string) {
        await this.LastNameInput.fill(lastName);
    }
    async fillCompany(company: string) {
        await this.companyInput.fill(company);
    }
    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }
    async fillAddress2(address2: string) {
        await this.address2Input.fill(address2);
    }
    async fillState(state: string) {
        await this.stateInput.fill(state);
    }
    async fillCity(city: string) {
        await this.cityInput.fill(city);
    }
    async fillZipcode(zipcode: string) {
        await this.zipcodeInput.fill(zipcode);
    }
    async fillMobileNumber(mobileNumber: string) {
        await this.mobileNumberInput.fill(mobileNumber);
    }
    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async waitForLoginErrorMessage() {
        await this.waitForVisible(this.loginErrorMessage);
    }

    async waitForSignUpErrorMessage() {
        await this.waitForVisible(this.signUpErrorMessage);
    }

    async waitForSignUpHeading() {
        await this.waitForVisible(this.signUpHeading);
    }

    async waitForAccountCreatedMessage() {
        await this.waitForVisible(this.accountCreatedMessage);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async selectGender(gender: string) {
       const genderRadio = this.page.getByLabel(gender);
        await this.selectRadio(genderRadio);
    }

    async getGender(gender: string) {
        const genderRadio = this.page.getByLabel(gender);
        return genderRadio;
    }

    async fillDateOfBirth(day: string, month: string, year: string) {
        await test.step(`Fill date of birth with "${day}" and "${month}" and "${year}"`, async () => {
        await this.dateOfBirthDayInput.selectOption(day);
        await this.dateOfBirthMonthInput.selectOption({ label: month });
        await this.dateOfBirthYearInput.selectOption(year);
        });
    }

    async fillCountry(country: string) {
        await this.countryInput.selectOption(country);
    }
   
    async login(email: string, password: string) {    
        await test.step(`Login with "${email}" and "${password}" credentials`, async () => {
            await this.fillLoginEmail(email);
            await this.fillLoginPassword(password);
            await this.clickLoginButton();
        });
    }

    async signUp(name: string, email?: string) {
        await test.step('Sign up with name and email', async () => {
            await this.fillName(name);
            const signUpEmail = email ?? USER.emailValid;
            await this.fillSignUpEmail(signUpEmail);
            await this.clickSignUpButton();
        });
    }



    async fullSignUpWithUser() {
        await test.step('Complete full sign up form', async () => {
            await this.fillName(USER.name);
            await this.fillSignUpEmail(USER.emailValid);
            await this.clickSignUpButton();
            await this.waitForSignUpHeading();
            await this.selectGender(USER.gender);
            await this.fillSignUpPassword(USER.passwordValid);
            await this.fillDateOfBirth(USER.dateOfBirth.day, USER.dateOfBirth.month, USER.dateOfBirth.year);
            await this.fillFirstName(USER.name);
            await this.fillLastName(USER.lastName);
            await this.fillCompany(USER.company);
            await this.fillAddress(USER.address);
            await this.fillAddress2(USER.address2);
            await this.fillCountry(USER.country);
            await this.fillState(USER.state);
            await this.fillCity(USER.city);
            await this.fillZipcode(USER.zipcode);
            await this.fillMobileNumber(USER.mobileNumber);
            await this.clickCreateAccountButton();
        });
    }
    


}
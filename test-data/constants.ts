import { faker } from '@faker-js/faker';

export const TITTLE = {
    home: 'Automation Exercise',
    products: 'Automation Exercise - All Products',
    productDetails: 'Automation Exercise - Product Details',
    cart: 'Automation Exercise - Checkout',
    signupLogin: 'Automation Exercise - Signup / Login',

  };
  export const HEADING = {
    signup: 'Enter Account Information',
  }
  
  export const PRODUCTS = {
    sleevelessDress: {
      name: 'Sleeveless Dress',
      price: 'Rs. 1000',
    },
    fancyGreenTop: {
      name: 'Fancy Green Top',
      price: 'Rs. 700',
    },
    halfSleevesTop: {
      name: 'Half Sleeves Top',
      price: 'Rs. 359',
    },
    sleevesPrintedTop: {
      name: 'Sleeves Printed Top',
      price: 'Rs. 499',
    },
    sleevelessUnicornPrintFitAndFlareNetDress: {
      name: 'Sleeveless Unicorn Print Fit & Flare Net Dress',
      price: 'Rs. 1100',
    },
    
  };

  export const USER = {
    name: faker.person.firstName(),
    emailValid: faker.string.alphanumeric(5).toLowerCase() + Date.now() + '@testmail.com',
    emailInvalid: 'brr@test.com',
    emailExisting: 'brtest@test.com',
    passwordValid: '123456',
    passwordInvalid: '1234567',
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
    dateOfBirth: {
      day: (faker.number.int({ min: 1, max: 31 })).toString(),
      month: faker.string.fromCharacters(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
      year: (faker.number.int({ min: 1900, max: 2021 })).toString(),
    },
    country: faker.string.fromCharacters(['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']),
    gender: faker.string.fromCharacters(['Mr.', 'Mrs.']),
    
  };
  export const GENDER = {
    male: 'Mr.',
    female: 'Mrs.',
  };

  export const MESSAGE = {
    loginError: 'Your email or password is incorrect!',
    signUpError: 'Email Address already exist!',
    orderSuccess: 'Congratulations! Your order has been confirmed!',
    accountCreatedAPI: 'User created!',
    accountDeletedAPI: 'Account deleted!',

  };

  export const PAYMENT = {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.string.alphanumeric(16),
    cvc: faker.string.alphanumeric(3),
    expirationMonth: (faker.number.int({ min: 1, max: 12 })).toString(),
    expirationYear: (faker.number.int({ min: 2025, max: 2030 })).toString(),
  };

  export const CHECKOUT = {
    comment: 'Please deliver between 9 AM - 5 PM',
  };

  export const API_ENDPOINTS = {
    verifyLogin: '/api/verifyLogin',
    productsList: '/api/productsList',
    brandsList: '/api/brandsList',
    searchProduct: '/api/searchProduct',
    createAccount: '/api/createAccount',
    deleteAccount: '/api/deleteAccount',
    updateAccount: '/api/updateAccount',
    getUserDetailByEmail: '/api/getUserDetailByEmail',
  };


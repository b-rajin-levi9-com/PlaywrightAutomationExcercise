# Playwright Practice Project

A comprehensive end-to-end testing project using Playwright with TypeScript, implementing the Page Object Model pattern and Allure reporting.

## 🧪 Testing Strategy

This project uses a **tiered testing strategy** with **intelligent caching** to optimize CI/CD performance and provide fast feedback:

### Test Execution Matrix

| Stage | Trigger | Tests | Browser(s) | Duration (no cache) | Duration (cached) | Report |
|-------|---------|-------|-----------|---------------------|-------------------|--------|
| **Smoke Tests** | Push to `feature/*`, `bugfix/*`, `fix/*` | @smoke tagged tests only | Chromium | ~3 mins | ~2 mins | Artifact (7 days) |
| **PR Tests** | Pull Request to `main` | All tests | Chromium only | ~12 mins | ~8 mins | Artifact (14 days) + PR comment |
| **Main Tests** | Push/Merge to `main` | All tests | Chromium, Firefox, WebKit | ~35 mins | ~25 mins | GitHub Pages with trends (30 days) |
| **Manual Tests** | Workflow dispatch | Custom (via grep) | All browsers | Variable | Variable | Artifact (14 days) |

### Performance Optimizations

- 🚀 **npm Caching**: Dependencies cached automatically, saves ~20-30 seconds per run
- 🎭 **Browser Caching**: Playwright browsers cached by version and type, saves ~60-90 seconds per run
- ⚡ **Smart Cache Keys**: Separate caches for Chromium-only vs all-browsers scenarios
- 📦 **Conditional Installation**: Only installs what's not cached

### Benefits

- ⚡ **Fast Feedback**: Smoke tests provide results in ~2 minutes (cached)
- 💰 **Cost Efficient**: Save ~40% CI minutes + ~60 seconds per run with caching
- 🎯 **Quality Gate**: PRs must pass all tests before merge
- 📊 **Trend Analysis**: Main branch maintains 10 runs of historical data on GitHub Pages
- 🔄 **Optimized Workflow**: Single job with conditional steps reduces duplication

## 🏗️ Project Structure

```
├── .github/workflows/
│   └── playwright.yml          # CI/CD pipeline with optimized single job
├── fixtures/
│   └── page-fixtures.ts        # Test fixtures for page objects
├── pages/                      # Page Object Model classes
│   ├── BasePage.ts            # Base page with common methods
│   ├── HomePage.ts
│   ├── LoginSignUpPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   └── AccountDeletedPage.ts
├── test-data/
│   └── constants.ts           # Test data and constants
├── tests/                     # Test specifications
│   ├── login.spec.ts
│   ├── signUp.spec.ts
│   ├── cart.spec.ts
│   ├── hybrid-cart.spec.ts
│   ├── hybrid-checkout.spec.ts
│   └── api.spec.ts
├── utils/
│   └── helpers.ts             # Utility functions
└── playwright.config.ts       # Playwright configuration

```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

### Running Tests Locally

```bash
# Run all tests
npx playwright test

# Run smoke tests only
npx playwright test --grep @smoke

# Run specific test file
npx playwright test tests/login.spec.ts

# Run tests by tag
npx playwright test --grep @login
npx playwright test --grep @cart

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run in UI mode (debugging)
npx playwright test --ui

# Run in headed mode
npx playwright test --headed
```

### Generate Allure Reports Locally

```bash
# Run tests
npx playwright test

# Generate and open Allure report
npm run test:allure

# Or run specific test suites
npm run test:allure:login
npm run test:allure:cart
npm run test:allure:checkout
```

## 🌳 Git Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes and Push

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

**Result**: Smoke tests run automatically (~5 mins)

### 3. Create Pull Request

```bash
gh pr create --base main --title "Your PR title" --body "Description"
```

**Result**: 
- Full test suite runs on Chromium
- PR receives auto-comment with test results
- Must pass before merge

### 4. Merge to Main

After PR approval, merge via GitHub UI or:

```bash
gh pr merge --merge
```

**Result**:
- Full test suite runs on all browsers
- Allure report updated on GitHub Pages with trends

## 📊 Test Reports

### GitHub Pages (Production)

View the latest test results with historical trends:
- **URL**: `https://<your-username>.github.io/<repository-name>/`
- **Updated**: After each merge to `main`
- **History**: Last 10 test runs

### GitHub Actions Artifacts

Download reports from Actions tab:
- Playwright HTML reports
- Allure reports
- Raw test results

## ⚡ Caching & Performance

The workflow uses intelligent caching to speed up test execution:

### npm Dependencies Cache
- **Cached by**: `package-lock.json` hash
- **Cache location**: GitHub Actions cache
- **Invalidated when**: Dependencies change
- **Savings**: ~20-30 seconds per run

### Playwright Browsers Cache
- **Cached by**: Playwright version + browser type
- **Cache types**:
  - `playwright-Linux-1.45.0-chromium-only` (Feature/PR runs)
  - `playwright-Linux-1.45.0-all-browsers` (Main branch runs)
- **Cache location**: `~/.cache/ms-playwright`
- **Invalidated when**: Playwright version changes
- **Savings**: ~60-90 seconds per run

### Cache Behavior
- **First run**: No cache, full installation (~150s setup time)
- **Subsequent runs**: Cache restored (~60s setup time)
- **Cache expiration**: 7 days for unused caches
- **Cache limit**: 10GB per repository

## 🏷️ Test Tags

Tests are organized with tags for selective execution:

- `@smoke` - Critical path tests (login, signup, basic cart)
- `@login` - Login functionality tests
- `@signup` - Sign up functionality tests
- `@cart` - Shopping cart tests
- `@hybrid-cart` - Combined UI/API cart tests
- `@hybrid-checkout` - Combined UI/API checkout tests

## 📝 Best Practices

### Page Object Model

- Page objects contain locators and page-specific methods
- No assertions in page objects (only in tests)
- Use `test.step()` for methods with multiple actions
- Inherit from `BasePage` for common functionality

### Test Writing

- One test = one scenario
- Tests should be independent (parallelizable)
- Use descriptive test names
- Leverage fixtures for page object instantiation
- Use constants from `test-data/constants.ts`

### Locator Strategy (Priority Order)

1. `getByTestId()` - if applicable
2. `getByRole()` - Most reliable and accessible
3. `getByText()` - For unique text content
4. Semantic selectors with `:has-text()`
5. Data attributes when available

Avoid: `nth-child()`, complex CSS paths, brittle selectors

## 🛠️ Configuration

### Playwright Config (`playwright.config.ts`)

- **Base URL**: https://www.automationexercise.com/
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled
- **Retries**: 1 retry on CI
- **Reporter**: HTML + Allure
- **Traces**: On failure (CI), always (local)
- **Videos**: Disabled on CI, enabled locally

### CI/CD Config (`.github/workflows/playwright.yml`)

- **Architecture**: Single optimized job with conditional step execution
- **Caching**: 
  - npm dependencies cached via `setup-node` action
  - Playwright browsers cached by version and browser type
  - Cache keys differentiate between Chromium-only and all-browsers scenarios
- **Concurrency**: Per-branch concurrency with auto-cancellation of outdated runs
- **Permissions**: Read/write for contents, pages, and PR comments
- **Artifacts**: 
  - Feature branches: 7 days retention
  - Pull Requests: 14 days retention
  - Main branch: 30 days retention
- **History Limit**: 10 runs for Allure trends
- **Performance**: ~60 seconds faster with caching (60% improvement)

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Allure Report](https://allurereport.org/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Automation Best Practices](https://playwright.dev/docs/best-practices)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass locally
4. Push and create a Pull Request
5. Wait for CI checks to pass
6. Request review
7. Merge after approval

---

**Happy Testing!** 🎭


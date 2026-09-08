# QA Technical Assessment

Playwright and TypeScript based automation framework created for the QA technical assessment.

This project demonstrates UI automation, API response validation, reusable test design, cross-browser execution, failure diagnostics, and functional test strategy for an e-commerce application.

---

## 1. Overview

This project covers the following assessment areas:

- Playwright UI automation
- Page Object Model (POM)
- Externalized test data
- Positive, negative and edge-case scenarios
- Form validation
- File upload validation
- API response validation
- Cross-browser testing
- Automatic test retries
- Failure screenshots, traces and video
- HTML test reporting
- E-commerce functional test scenarios
- Test automation prioritization
- Automation strategy and automation pyramid

The framework is intentionally kept generic and reusable and does not contain personal information.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Test implementation language |
| Playwright | UI automation and test execution |
| Node.js | JavaScript/TypeScript runtime |
| npm | Dependency and script management |
| Playwright HTML Reporter | Test reporting |

---

## 3. Project Structure

```text
qa-technical-assessment/
├── .github/
│
├── ecommerce/
│   ├── functional-test-scenarios.md
│   └── automation-prioritization.md
│
├── fixtures/
│   └── sample.jpg
│
├── pages/
│   └── PracticeFormPage.ts
│
├── test-data/
│   └── practiceFormData.ts
│
├── tests/
│   ├── api/
│   │   └── response-validator.spec.ts
│   │
│   └── practice-form/
│       └── practice-form.spec.ts
│
├── utils/
│   └── response-validator.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

# 6. Running the Tests

## Run the Complete Test Suite

Run all tests using the browser projects enabled in `playwright.config.ts`:

```bash
npm test

Chromium
npm run test:chromium

Firefox
npm run test:firefox

WebKit
npm run test:webkit

To explicitly exclude WebKit:
npx playwright test --project=chromium --project=firefox

Run a Specific Test File on a Specific Browser
npx playwright test tests/practice-form/practice-form.spec.ts --project=chromium
npx playwright test tests/practice-form/practice-form.spec.ts --project=firefox
npx playwright test tests/api/response-validator.spec.ts --project=chromium

Run a Specific Test by Name
npx playwright test -g "should allow selecting a gender" --project=chromium
npx playwright test -g "should allow selecting a gender" --project=firefox

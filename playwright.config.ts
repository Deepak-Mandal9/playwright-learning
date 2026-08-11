import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, never locally
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers on CI
  workers: process.env.CI ? 2 : undefined,

  // Reporter: HTML report always + CI gets line reporter
  reporter: [
    // Built-in HTML report
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    
    // Shows test names in terminal while running
    ['list'],

    // Generates JUnit XML — used by CI/CD tools like Jenkins
    ['junit', { outputFile: 'test-results/results.xml' }],

    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    // Base URL for all tests
    baseURL: 'https://demo.playwright.dev',

    // Take screenshot only on failure
    screenshot: 'only-on-failure',

    // Record video only on failure
    video: 'retain-on-failure',

    // Collect trace on first retry (great for debugging)
    trace: 'on-first-retry',

    // Automatically headless on CI, headed locally!
    headless: !!process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // Only run tests in tests/e2e folder
      testMatch: '**/e2e/**/*.spec.ts',
    },

    {
      name: 'api',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
      // Only run tests in tests/api folder
      testMatch: '**/api/**/*.spec.ts',
    },
  ],
});
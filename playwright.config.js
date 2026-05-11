// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Ye backend and fronend server run karta hai to run the test 
  // isko skip karna prega in workflow docker jab run hota hai to 
  // -- ci me skip karo 
  // --- docker ko test nahi kar reha hai ye 
  // locally test kar reha hai abhi 
  // -- loally run karne ke liye db connect run hote rehna chiye 
  // Ci is true in github action 

  /*
    GitHub Actions internally ek environment create karta hai:
    CI=true
    GITHUB_ACTIONS=true
  */

  webServer: process.env.CI ? undefined : [
    {
      command: 'npm run dev --prefix Front-end',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run staging --prefix Backend',
      port: 4000,
      reuseExistingServer: !process.env.CI,
    }
  ]
});
---
title: HTML reporter
description: Learn how to set up and configure the cypress-mochawesome-reporter to generate HTML reports of your Cypress test results.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Configuration and environment variables
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/configuration-and-environment-variables.html
  - title: Debugging Cypress tests
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/debugging-cypress-tests.html
---

`cypress-mochawesome-reporter` is a reporter plugin for Cypress that generates detailed and visually appealing HTML reports.

## What the reporter is used for

- Generating detailed HTML reports of Cypress test runs.
- Providing a visual representation of test results.
- Including screenshots and stack traces for failed tests.
- Making test result analysis and debugging easier.

## Configuring the reporter

### Step 1: Install the reporter

```bash
npm install cypress-mochawesome-reporter --save-dev
```

### Step 2: Update the Cypress configuration

Update `cypress.config.ts`:

```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportTitle: 'mochawesome-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/data/reports',
    showSkipped: true,
  },
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents: async (on, config) => {
      const plugin = await import('cypress-mochawesome-reporter/plugin')
      plugin.default(on)
      on('task', {})
      return config
    },
  },
})
```

Available `reporterOptions` settings include the following:

- `reportDir`: the directory where report files are saved.
- `overwrite`: whether to overwrite existing reports. Default: `false`.
- `html`: whether to generate an HTML report. Default: `true`.
- `json`: whether to generate a JSON report. Default: `true`.
- `charts`: whether to include charts in the report. Default: `true`.
- `reportPageTitle`: the HTML report page title.
- `embeddedScreenshots`: whether to embed screenshots. Default: `true`.
- `inlineAssets`: whether to inline CSS and JS assets. Default: `true`.
- `saveAllAttempts`: whether to save all test attempts, or only the last one. Default: `true`.

### Step 3: Add the reporter to the support file

Add the following to `cypress/support/e2e.ts`:

```typescript
import 'cypress-mochawesome-reporter/register'
```

### Step 4: Run the tests with the reporter

```bash
npx cypress run
```

Reports are generated in the directory specified by `reportDir` when the run completes.

## Viewing the reports

The generated HTML reports contain the following:

- The test name and status (pass or fail).
- The duration of each test.
- Screenshots for failed tests.
- Stack traces for errors.

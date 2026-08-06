---
title: Configuration and environment variables
description: Learn how to configure the Cypress boilerplate environment and manage its environment variables.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Getting started
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/getting-started.html
  - title: Plugins and libraries
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/plugins-and-libraries.html
---

This document describes the `cypress.config.ts` file used in the cypress-boilerplate, which defines the settings and behavior for running Cypress tests.

## General configuration

- `watchForFileChanges`: disables watching for file changes.
- `screenshotOnRunFailure`: takes a screenshot when a test fails.
- `trashAssetsBeforeRuns`: deletes screenshots and videos from previous runs.
- `projectId`: the project ID for the Cypress Dashboard.
- `chromeWebSecurity`: disables web security, to allow cross-origin iframe testing.
- `video`: disables video recording.
- `downloadsFolder`: `cypress/data/downloads`.
- `fixturesFolder`: `cypress/fixtures`.
- `screenshotsFolder`: `cypress/data/screenshots`.
- `videosFolder`: `cypress/data/videos`.
- `supportFolder`: `cypress/support`.
- `experimentalModifyObstructiveThirdPartyCode`: enables modification of third-party code that would otherwise obstruct testing.
- `experimentalMemoryManagement`: enables experimental memory management.
- `pageLoadTimeout`: `60000` ms.
- `viewportWidth`: `1280`.
- `viewportHeight`: `800`.

## Reporter configuration

- `reporter`: uses `cypress-mochawesome-reporter`.
- `reporterOptions`:
  - `charts`: `true`.
  - `reportTitle`: `mochawesome-report`.
  - `embeddedScreenshots`: `true`.
  - `inlineAssets`: `true`.
  - `saveAllAttempts`: `false`.
  - `reportDir`: `cypress/data/reports`.
  - `showSkipped`: `true`.

For more information, see [HTML reporter](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/html-reporter.html).

## End-to-end testing configuration

- `supportFile`: `cypress/support/e2e.ts`.
- `setupNodeEvents`: configures the `cypress-mochawesome-reporter` plugin and tasks.

## Environment setup

The boilerplate supports the following environments: `local`, `testing`, `staging`, and `production`. The default environment is `local`, and you can override it from the command line:

```bash
npx cypress open --env environment=staging
```

## Loading environment variables

Cypress loads environment variables from two files, in the following order:

1. **The global `.env` file**: takes precedence and overrides environment-specific variables.
2. **The environment-specific file**: loaded from `.envs/.env.${environment}`, if it exists.

Variables from the global `.env` file always override variables from the environment-specific file.

## Base URL configuration

`baseUrl` is set to the value of the `GLUE_URL` environment variable. Set this variable if you are testing APIs.

## Retries configuration

- `runMode`: 2 retry attempts, used for `cypress run`.
- `openMode`: 0 retry attempts, used for `cypress open`.

## Environment variables configuration

- `DEFAULT_ENVIRONMENT`: `local`.

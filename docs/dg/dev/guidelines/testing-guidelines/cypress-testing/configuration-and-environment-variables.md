---
title: Configuration and environment variables
description: Learn how to configure the Cypress boilerplate environment and manage its environment variables.
last_updated: Aug 6, 2026
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
- `setupNodeEvents`: registers the `cypress-mochawesome-reporter` plugin, registers the `isFileExists` task used to detect whether a spec ships its own fixture files, loads the environment variables, and resolves the store context.

## Environment setup

The boilerplate supports the following environments: `ci`, `local`, `testing`, `staging`, and `production`. The default environment is `local`, and you can override it from the command line:

```bash
npx cypress open --env environment=staging
```

If you pass a name that is not in that list, Cypress fails at startup with an explicit error rather than falling back to a default.

Each environment has its own file in `.envs/`, named `.envs/.env.[environment]`. Create the file only for the environments you actually run against. The boilerplate ships `.envs/.env.local` and `.envs/.env.ci`; the `ci` environment is the one the pipeline uses:

```bash
npx cypress run --env environment=ci --headless --browser chrome
```

## Loading environment variables

Cypress builds its environment in three steps, in this order:

1. **The global `.env` file**: optional, in the project root. Loaded first, so it takes precedence over the environment-specific file. Use it for values that must not be committed.
2. **The environment-specific file**: `.envs/.env.[environment]`, if it exists. A variable is only applied if it was not already set in step 1.
3. **The store context**: resolved from the shop, and applied last.

Variables from the global `.env` file always override variables from the environment-specific file. The store context overrides both—see the next section.

### Variables you configure

These live in `.envs/.env.[environment]`:

| Variable | Purpose |
| --- | --- |
| `STOREFRONT_URL` | Yves base URL |
| `BACK_OFFICE_URL` | Back Office base URL |
| `MP_URL` | Merchant Portal base URL |
| `GLUE_URL` | Storefront API base URL; also used as `baseUrl` |
| `GLUE_BACKEND_URL` | Backend API base URL; required for fixtures and the store context |
| `DOCKER_CLI_URL` | CLI container endpoint, used when running inside `docker/sdk` |
| `PROJECT_LOCATION` | Relative path from the Cypress working directory to the repository root, used by CLI-executing commands such as OMS transitions |
| `DEFAULT_PASSWORD` | Password assigned to customers and users created as fixtures |

Projects can add their own variables here. Any value referenced from a fixture file as `{{PLACEHOLDER}}` must exist in the environment, or the spec fails with an explicit error.

### Variables resolved from the shop

{% info_block infoBox "Do not configure these" %}

Before any spec runs, `cypress.config.ts` calls the DynamicFixtures API—`POST [GLUE_BACKEND_URL]/dynamic-fixtures` with the `getAllowedStore` helper—and derives the store context from the shop itself. These values are applied after the environment files are loaded and overwrite any entry of the same name, so setting them in `.envs/` has no effect.

{% endinfo_block %}

| Variable | Derived from |
| --- | --- |
| `STORE_NAME` | `store.name` |
| `LOCALE_NAME` | `store.default_locale_iso_code`, for example, `en_US` |
| `LOCALE_PREFIX` | Language part of the locale, lowercased, for example, `en` |
| `CURRENCY_CODE` | `store.default_currency_iso_code` |
| `COUNTRY_ISO2` | `store.countries[0]` |

Because these follow the shop, changing the project's store set requires no edits to the test suite. If the shop has no store, or `GLUE_BACKEND_URL` is unreachable, Cypress fails at startup with an explicit message instead of running against the wrong data.

## Base URL configuration

`baseUrl` is set to the value of the `GLUE_URL` environment variable. Set this variable if you are testing APIs.

## Retries configuration

- `runMode`: 2 retry attempts, used for `cypress run`.
- `openMode`: 0 retry attempts, used for `cypress open`.

## Environment variables configuration

- `DEFAULT_ENVIRONMENT`: `local`.

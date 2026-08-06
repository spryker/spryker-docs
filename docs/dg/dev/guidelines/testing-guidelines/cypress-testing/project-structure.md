---
title: Cypress boilerplate project structure
description: Learn about the directory layout of the Cypress boilerplate project and the purpose of each file and folder.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Getting started
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/getting-started.html
  - title: Naming conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/naming-conventions.html
---

This document describes the directory structure of the cypress-boilerplate part and the purpose of each file and folder.

## Directory tree

```text
cypress-boilerplate/
├── .envs
│   ├── .env.ci
│   ├── .env.local
│   ├── .env.production
│   ├── .env.staging
│   └── .env.testing
├── .github
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows
│       ├── ci.yml
│       └── regression.yml
├── cypress
│   ├── data
│   │   ├── reports
│   │   │   └── index.html
│   │   └── screenshots
│   ├── e2e
│   │   ├── backoffice
│   │   │   └── orders
│   │   │       ├── backoffice-process-order-scenario.cy.ts
│   │   │       └── backoffice-process-order.cy.ts
│   │   ├── glue
│   │   │   ├── access-tokens
│   │   │   │   └── glue-access-token.cy.ts
│   │   │   └── checkout
│   │   │       └── glue-checkout.cy.ts
│   │   ├── merchant-portal
│   │   │   └── orders
│   │   │       └── merchant-portal-process-merchant-order.cy.ts
│   │   └── storefront
│   │       ├── checkout
│   │       │   └── storefront-checkout.cy.ts
│   │       └── quick-order
│   │           └── storefront-quick-order.cy.ts
│   ├── fixtures
│   │   ├── checkout-data.json
│   │   ├── customer-data.json
│   │   ├── product-data.json
│   │   ├── quick-order-data.json
│   │   └── user-data.json
│   └── support
│       ├── api-helper
│       │   ├── api-helper.ts
│       │   └── general-responses
│       │       └── error-response.ts
│       ├── cy-commands
│       │   ├── backoffice
│       │   │   └── oms-transition-commands.ts
│       │   ├── glue
│       │   │   ├── addresses-commands.ts
│       │   │   ├── carts-commands.ts
│       │   │   └── checkout-commands.ts
│       │   └── storefront
│       │       ├── cart-commands.ts
│       │       └── utility-commands.ts
│       ├── e2e.ts
│       ├── glue-endpoints
│       │   ├── authentication
│       │   │   ├── access-tokens-response.ts
│       │   │   └── access-tokens.ts
│       │   ├── cart
│       │   │   ├── carts-items.ts
│       │   │   └── carts.ts
│       │   ├── checkout
│       │   │   └── checkout.ts
│       │   └── glue-request.ts
│       ├── index.d.ts
│       ├── page-objects
│       │   ├── abstract-page.ts
│       │   ├── backoffice
│       │   │   ├── login
│       │   │   │   └── backoffice-login-page.ts
│       │   │   └── order-management
│       │   │       ├── backoffice-order-details-page.ts
│       │   │       └── backoffice-order-list-page.ts
│       │   ├── merchant-portal
│       │   │   ├── login
│       │   │   │   └── merchant-portal-login-page.ts
│       │   │   └── order-management
│       │   │       ├── merchant-portal-order-details-page.ts
│       │   │       └── merchant-portal-order-list-page.ts
│       │   └── storefront
│       │       ├── cart
│       │       │   ├── storefront-cart-flyout.ts
│       │       │   ├── storefront-cart-page.ts
│       │       │   └── storefront-create-cart-page.ts
│       │       ├── checkout
│       │       │   ├── storefront-checkout-address-page.ts
│       │       │   ├── storefront-checkout-payment-page.ts
│       │       │   ├── storefront-checkout-shipping-page.ts
│       │       │   ├── storefront-checkout-success-page.ts
│       │       │   └── storefront-checkout-summary-page.ts
│       │       ├── login
│       │       │   └── storefront-login-page.ts
│       │       ├── product
│       │       │   └── storefront-product-details-page.ts
│       │       ├── quick-order
│       │       │   └── storefront-quick-order-page.ts
│       │       └── search
│       │           ├── storefront-search-page.ts
│       │           ├── storefront-search-results-page.ts
│       │           └── storefront-search-suggestions-flyout.ts
│       └── scenarios
│           ├── backoffice
│           │   └── oms-transition-scenarios.ts
│           ├── glue
│           │   ├── glue-addresses-scenarios.ts
│           │   ├── glue-carts-scenarios.ts
│           │   └── glue-checkout-scenarios.ts
│           └── storefront
│               ├── storefront-cart-scenarios.ts
│               └── storefront-quick-order-scenarios.ts
├── .env.dist
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── composer.json
├── cypress.config.ts
├── Dockerfile
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Terminology

| Term | Representation in code | Responsibility |
|---|---|---|
| Page or page object | TS files in `cypress/support/page-objects` | Stores element locators that exist on a specific web page, and the interactions and actions that you can perform against that page. |
| Glue endpoint | TS files in `cypress/support/glue-endpoints` | The equivalent of page objects for API endpoints. Each file stores pre-defined calls to a single API endpoint with the required request body, headers, and test data references. |
| Fixture | JSON files in `cypress/fixtures` | Static, pre-defined test data, such as SKUs or customer addresses. Fixtures ensure consistent test behavior by providing predefined data sets, and make maintenance easier, because test data that is used in multiple tests needs to change in only one place. |
| Command | TS files in `cypress/support/cy-commands` | Encapsulates repetitive functional tasks across test suites as pre-defined Cypress commands that cannot be limited to a page object, or that do not reference page objects at all, for example, updating a database record or running a command line command. |
| Scenario | TS files in `cypress/support/scenarios` | Aggregates page objects to prevent test duplication by organizing common actions in one place. Scenarios simplify complex test flows and improve test maintainability. |
| Test suite | `.cy.ts` files in `cypress/e2e` | The primary files where one or more test cases are written. They serve as the entry point for defining test cases. |
| Test case | `it` blocks inside `.cy.ts` files in `cypress/e2e` | The instructions inside a test suite that test a specific piece of business logic. A test suite usually has multiple test cases. |

## Directory and file descriptions

### Root directory

Contains the main configuration files and project information.

- `.env.dist`: example environment variables file.
- `.eslintignore`: ESLint ignore file.
- `.eslintrc`: ESLint configuration file.
- `.gitignore`: Git ignore file.
- `.prettierignore`: Prettier ignore file.
- `.prettierrc.json`: Prettier configuration file.
- `composer.json`: dependencies for PHP components.
- `cypress.config.ts`: Cypress configuration file.
- `Dockerfile`: configuration file for building Docker images.
- `LICENSE`: license information.
- `README.md`: project overview and instructions.
- `package.json`: project dependencies and scripts.
- `package-lock.json`: lock file for npm dependencies.
- `tsconfig.json`: TypeScript configuration file.

### `.envs` directory

Contains environment variables for different environments:

- `.env.ci`: CI environment variables.
- `.env.local`: local environment variables.
- `.env.production`: production environment variables.
- `.env.staging`: staging environment variables.
- `.env.testing`: testing environment variables.

### `.github` directory

Contains GitHub-specific files and workflows:

- `PULL_REQUEST_TEMPLATE.md`: pull request template.
- `workflows/ci.yml`: continuous integration workflow that checks code quality.
- `workflows/regression.yml`: regression testing workflow that runs E2E tests against the Spryker B2B demo shop.

### `cypress` directory

Contains Cypress-specific files and directories:

- `e2e`: end-to-end test files, organized by application area (`backoffice`, `glue`, `merchant-portal`, `storefront`).
- `fixtures`: test data files, such as `checkout-data.json`, `customer-data.json`, and `product-data.json`.
- `support`: support files for Cypress tests, described in the following sections.

### `support` directory

Contains support files for Cypress tests:

- `api-helper`: helper files for API interactions, including `api-helper.ts`, the API response schema validator based on the Ajv validator.
- `cy-commands`: custom Cypress commands, organized by application area.
- `e2e.ts`: end-to-end test setup file.
- `glue-endpoints`: endpoint classes and response schemas for Glue components, including the abstract `glue-request.ts` page object model.
- `index.d.ts`: TypeScript declaration files.
- `page-objects`: page object models for application sections, including the abstract `abstract-page.ts` page object model.
- `scenarios`: scenario files that aggregate page objects and commands for common user flows.

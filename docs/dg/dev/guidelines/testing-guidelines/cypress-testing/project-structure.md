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
│   └── .env.local
├── cypress
│   ├── e2e
│   │   ├── backoffice
│   │   │   └── orders
│   │   │       ├── backoffice-process-order-using-scenario.cy.ts
│   │   │       └── backoffice-process-order.cy.ts
│   │   ├── glue
│   │   │   ├── access-tokens
│   │   │   │   └── glue-access-token.cy.ts
│   │   │   ├── checkout
│   │   │   │   └── glue-checkout.cy.ts
│   │   │   └── orders
│   │   │       └── glue-orders.cy.ts
│   │   ├── merchant-portal
│   │   │   └── orders
│   │   │       └── merchant-portal-process-merchant-order.cy.ts
│   │   └── storefront
│   │       ├── cart
│   │       │   └── storefront-cart-smoke.cy.ts
│   │       ├── checkout
│   │       │   └── storefront-checkout.cy.ts
│   │       ├── order
│   │       │   └── storefront-order.cy.ts
│   │       └── quick-order
│   │           └── storefront-quick-order.cy.ts
│   ├── fixtures
│   │   ├── backoffice/orders            (dynamic- + static- per spec)
│   │   ├── glue/{access-tokens,checkout,orders}
│   │   ├── merchant-portal/orders
│   │   ├── shared
│   │   │   └── checkout-data.json
│   │   └── storefront/{cart,checkout,order,quick-order}
│   └── support
│       ├── api-helper
│       ├── cy-commands/{backoffice,dynamic-fixtures,glue,storefront}
│       ├── fixture-helper
│       │   └── fixture-helper.ts
│       ├── glue-endpoints/{authentication,cart,checkout,order}
│       ├── page-objects/{backoffice,merchant-portal,storefront}
│       ├── scenarios/{backoffice,glue,storefront}
│       ├── types
│       │   ├── backoffice        index.ts, order-management.ts
│       │   ├── glue              index.ts, access-tokens.ts, checkout.ts, orders.ts
│       │   ├── merchant-portal   index.ts, order-management.ts
│       │   ├── shared            customer, product, localized-attributes,
│       │   │                     price-product, product-offer, user, index
│       │   └── storefront        cart, checkout, order, quick-order (features)
│       │                         budget, cost-center, merchant, shipment-method (types)
│       ├── e2e.ts
│       └── index.d.ts
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── LICENSE
├── README.md
├── cypress.config.ts
├── eslint.config.js
├── package.json
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

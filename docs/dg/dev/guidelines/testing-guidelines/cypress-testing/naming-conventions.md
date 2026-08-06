---
title: Cypress boilerplate naming conventions
description: Learn the naming conventions used in the Cypress boilerplate project for files, folders, and code.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Cypress boilerplate project structure
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/project-structure.html
  - title: Test writing conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/test-writing-conventions.html
---

## General rules

- **Use descriptive and meaningful names**: names should be self-explanatory and describe the purpose or function of the variable, function, or file.
- **Use camelCase for variables and functions**: start with a lowercase letter and capitalize each subsequent word, for example, `myVariable` or `getUserName`.
- **Use PascalCase for classes and constructors**: start with an uppercase letter and capitalize each subsequent word, for example, `UserService` or `OrderProcessor`.
- **Use kebab-case for file and folder names**: use lowercase letters separated by hyphens, for example, `user-service.ts` or `order-processor.ts`.
- **Avoid abbreviations**: use full words to avoid confusion, for example, `authentication` instead of `auth`.

## File and folder naming

### Configuration files

Root configuration files include the following:

- `.env`
- `.envs/.env.local`
- `.envs/.env.production`
- `.envs/.env.staging`
- `.envs/.env.testing`
- `.eslintignore`
- `.eslintrc`
- `.gitignore`
- `.prettierignore`
- `.prettierrc.json`
- `cypress.config.ts`
- `Dockerfile`
- `tsconfig.json`

### Cypress tests

- **End-to-end tests**: located in `cypress/e2e/`, following the pattern `[application]-[test].cy.ts`, for example, `backoffice-process-order.cy.ts` or `storefront-checkout.cy.ts`.
- **Fixtures**: located in `cypress/fixtures/`, following the pattern `[data-type]-data.json`, for example, `checkout-data.json` or `customer-data.json`.
- **Support files**: located in `cypress/support/`, organized into subfolders by functionality, such as `api-helper` or `cy-commands`, following the pattern `[feature]-[description].ts`, for example, `oms-transition-commands.ts`, `carts-commands.ts`, or `glue-carts-scenarios.ts`.

### Page objects

Page object files are located in `cypress/support/page-objects/`, following the pattern `[application]-[section]-[page].ts`, for example, `storefront-cart-page.ts`, `backoffice-order-list-page.ts`, or `storefront-cart-flyout.ts`.

### Utility files

Utility functions are located in `cypress/support/`, following the pattern `[description].ts`, for example, `api-helper.ts` or `index.d.ts`.

### Cypress commands

Cypress command files are located in `cypress/support/cy-commands/`, following the pattern `[feature]-commands.ts`, for example, `cart-commands.ts` or `utility-commands.ts`.

### Glue endpoints

- **Glue endpoint files**: located in `cypress/support/glue-endpoints/`, following the pattern `[endpoint-name].ts`, for example, `access-tokens.ts`, `carts-items.ts`, or `checkout.ts`.
- **Glue endpoint response schemas**: located in `cypress/support/glue-endpoints/`, following the pattern `[endpoint-name]-response.ts`, for example, `access-tokens-response.ts`.

## Code naming

- **Variables**: use camelCase, for example, `userName` or `orderId`.
- **Functions**: use camelCase, for example, `getUserName` or `processOrder`.
- **Classes**: use PascalCase, for example, `UserService` or `OrderProcessor`.

Adhering to these naming conventions keeps the codebase clean, readable, and maintainable, and makes collaboration easier.

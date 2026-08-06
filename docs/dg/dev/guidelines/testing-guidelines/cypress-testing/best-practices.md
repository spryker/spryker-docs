---
title: Cypress best practices
description: Learn recommended practices for writing effective and maintainable Cypress tests in Spryker projects.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Test writing conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/test-writing-conventions.html
  - title: Cypress commands vs scenarios
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/cypress-commands-vs-scenarios.html
---

Follow these best practices to write robust, maintainable, and efficient Cypress tests. For more information, see [official Cypress best practices guide](https://docs.cypress.io/guides/references/best-practices).

## General recommendations

1. Avoid chaining multiple commands in a single statement, because it makes debugging difficult.
2. Use Cypress commands, such as `cy.get()` and `cy.contains()`, effectively—they provide built-in retries.
3. Use custom scenarios for repeated user flows, such as registration or checkout.
4. Use custom commands for repeated sequences and abstract actions, such as `closeAllFlashMessages` or `runConsoleCommand`.
5. Store test data in \cypress/fixtures` and load it by using Cypress fixtures.`
6. Avoid assigning Cypress commands to `const`, `let`, or `var`. Use aliases or closures instead, because Cypress commands are asynchronous.
7. Test only the functionality you control. Do not test third-party services.
8. Use environment-specific configuration files to manage different environments.

## Organizing tests

1. Structure tests by feature or user story.
2. Create reusable utility functions for setup, teardown, and common actions.
3. Use the `before`, `beforeEach`, `afterEach`, and `after` hooks wisely for state management.

## Avoiding anti-patterns

1. Avoid testing implementation details—focus on application behavior.
2. Avoid using `cy.pause()` outside of debugging sessions.
3. Avoid `cy.wait()` with arbitrary time periods. Use `cy.intercept()` or `cy.get()` with assertions instead.

## Visiting external sites

Avoid visiting external sites directly. Mock network requests instead, to remove external dependencies and speed up your tests.

## Using the `after` and `afterEach` hooks

Use the `after` and `afterEach` hooks sparingly. These hooks run even if tests fail, which can mask issues.

## Setting a global `baseUrl`

Set `baseUrl` in the Cypress configuration to simplify your test code:

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8484',
  },
})
```

## Specs best practices

- **Independence**: each spec is independent of the others.
- **Autonomy**: each spec runs independently.
- **Order**: each spec runs in any order.
- **Environment**: each spec runs in any environment.
- **Tests**: each spec can contain multiple tests.
- **Assertions**: each test can have multiple assertions.

## Classes best practices

- **Single responsibility principle**: each class has one responsibility.
- **Encapsulation**: hide the internal state and require interaction through object methods.
- **Reusability**: design classes so they work in different contexts.

## Why Cypress boilerplate uses TypeScript

TypeScript is a superset of JavaScript that adds static typing, providing the following benefits:

- **Static typing**: catches type errors at compile time, which reduces runtime errors.
- **Enhanced IDE support**: improves autocompletion, navigation, and refactoring.
- **Improved code quality**: enforces type checks and produces more predictable code.

## Page object best practices

Page objects encapsulate page structure and UI interactions, to improve reusability and maintainability.

- **Abstract page usage**: create an abstract page class for common functionality.
- **Getter functions**: use getter functions to locate elements, for example:

  ```typescript
  const loginForm = 'form[name="loginForm"]'

  getEmailField = (): Cypress.Chainable => {
    return cy.get(loginForm).find('#loginForm_email')
  }
  ```

- **Action functions**: create atomic functions for actions, for example:

  ```typescript
  selectFirstBusinessAddressAvailableForShipping = (): void => {
    this.getShippingAddressDropdown().click()
    cy.get('[id*="company_business_unit_address"]').first().click()
  }
  ```

Follow these principles for page objects:

- **Atomic functions**: give each function a single purpose.
- **Reuse functions**: reuse common functions across page objects.
- **Encapsulation**: keep page structure details hidden from test scripts.

## Reusing the API for setup

Minimize testing steps and speed up your tests by reusing the API for setup. For example, create orders through the API to save time, and test order placement through the UI only once. This approach provides the following benefits:

- Speeds up tests by avoiding redundant UI operations.
- Ensures state consistency through the API before running UI tests.

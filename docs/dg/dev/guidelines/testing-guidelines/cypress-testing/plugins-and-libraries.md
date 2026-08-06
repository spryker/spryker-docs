---
title: Cypress boilerplate plugins and libraries
description: Learn about the plugins and libraries used in the Cypress boilerplate project.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Configuration and environment variables
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/configuration-and-environment-variables.html
  - title: ESLint and Prettier
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/eslint-and-prettier.html
---

This document describes the plugins and libraries used in the cypress-boilerplate, as listed in `tests/cypress-boilerplate/package.json`.

## devDependencies

| Package | Type | Purpose |
|---|---|---|
| `cypress` | End-to-end testing framework | Provides the framework for writing and running end-to-end tests. |
| `cypress-iframe` | Cypress plugin | Simplifies interaction with iframes within Cypress tests. |
| `cypress-plugin-api` | Cypress plugin | Facilitates API testing by providing methods to make API requests. |
| `@typescript-eslint/eslint-plugin` | ESLint plugin | Provides linting rules for TypeScript code. |
| `@typescript-eslint/parser` | ESLint parser | Integrates TypeScript with ESLint, so ESLint can understand TypeScript syntax. |
| `eslint-config-prettier` | ESLint configuration | Disables ESLint rules that conflict with Prettier. |
| `eslint-plugin-cypress` | ESLint plugin | Provides Cypress-specific linting rules. |
| `eslint-plugin-prettier` | ESLint plugin | Runs Prettier as an ESLint rule. |
| `prettier` | Code formatter | Ensures consistent code formatting across the project. |
| `typescript` | Programming language | Provides static type checking during development. |
| `ajv` | Library | Validates JSON responses in API tests against expected schemas. |
| `cypress-mochawesome-reporter` | Cypress reporter plugin | Generates detailed HTML reports of test results. |

## dependencies

| Package | Type | Purpose |
|---|---|---|
| `dotenv` | Library | Loads environment variables from a `.env` file into `process.env`. |
| `fs` | Node.js core module | Provides file system functionality, used to manage environment-specific variables. |

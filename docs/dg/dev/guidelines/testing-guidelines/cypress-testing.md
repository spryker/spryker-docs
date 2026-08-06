---
title: E2E Testing with Cypress
description: Learn how to use Cypress for end-to-end testing in Spryker projects.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: Running tests with Robot Framework
    link: docs/dg/dev/guidelines/testing-guidelines/running-tests-with-robot-framework.html
  - title: Setting up tests
    link: docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Testing best practices
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
---

Cypress is an end-to-end testing framework that provides a modern approach to testing web applications. Spryker provides a Cypress boilerplate project with a pre-configured setup, best practices, and examples for testing Spryker-based applications. The boilerplate is built to run against the [Spryker B2B Marketplace demo shop](https://github.com/spryker-shop/b2b-demo-marketplace), which you then adapt to your own project.

## Cypress boilerplate

For comprehensive information on setting up and using Cypress with Spryker, refer to the topics described below. The Cypress-boilerplate tests are built into the Spryker B2B Marketplace demo shop.

The boilerplate includes the following:

- A pre-configured Cypress setup optimized for Spryker projects.
- Example test cases and patterns.
- Documentation and best practices.
- Integration guides.

The boilerplate does not include the following:

- **Complete test coverage**: add and adjust the example tests to fit your project.
- **Correct locators**: the locators in the boilerplate are based on the Spryker B2B Marketplace demo shop. Adjust them to match your project.

## Topics

- [What is E2E testing?](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/what-is-e2e-testing.html): An introduction to end-to-end testing, covering how it works, its benefits, and common use cases.
- [Identifying what to test](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html): Guidance on identifying the most important aspects of your application to cover with E2E tests, and what to avoid.
- [Cypress boilerplate project structure](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/project-structure.html): The layout of the project and the purpose of each directory and file.
- [Getting started with the Cypress boilerplate](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/getting-started.html): Step-by-step instructions for setting up the Cypress boilerplate project on your local machine.
- [Cypress best practices](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/best-practices.html): Recommended practices for writing effective and maintainable Cypress tests.
- [Cypress boilerplate naming conventions](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/naming-conventions.html): Guidelines for naming files, folders, and other project elements to maintain consistency and clarity.
- [Cypress test writing conventions](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/test-writing-conventions.html): What you must, must not, and should do when writing a test.
- [Configuration and environment variables](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/configuration-and-environment-variables.html): How to configure the Cypress environment and manage environment variables.
- [Cypress boilerplate plugins and libraries](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/plugins-and-libraries.html): An overview of the plugins and libraries used in the project, and their purposes.
- [ESLint and Prettier in the Cypress boilerplate](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/eslint-and-prettier.html): How to set up and use ESLint and Prettier to ensure code quality and consistency.
- [HTML reporter](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/html-reporter.html): How to set up and configure `cypress-mochawesome-reporter` to generate HTML reports of your test results.
- [Cypress commands vs scenarios](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/cypress-commands-vs-scenarios.html): A comparison of Cypress commands and scenarios, with examples and best practices.
- [Validate API responses against a schema](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/how-to-validate-api-response-vs-schema.html): How to add schema validation to your tests.
- [Debugging Cypress tests](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/debugging-cypress-tests.html): How to debug, pause, and step through test execution, and inspect the inputs and outputs of test steps.
- [Integrating Cypress tests into CI](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/integrating-cypress-tests-into-ci.html):
How to integrate Cypress tests into a continuous integration pipeline.

## Internal Cypress tests

Cypress tests are used by Spryker for internal testing of the core Spryker features as well. You should remove the mentions of `cypress-tests` from `composer.json`. You can re-use and customize these tests for your project, however, Spryker does not guarantee these tests will work on your project, if you keep them. Spryker recommends using boilerplate tests instead of these and extending them to cover your functionality.

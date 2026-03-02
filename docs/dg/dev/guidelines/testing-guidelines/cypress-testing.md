---
title: E2E Testing with Cypress
description: Learn how to use Cypress for end-to-end testing in Spryker projects.
last_updated: March 02, 2026
template: concept-topic-template
related:
  - title: Running tests with Robot Framework
    link: /docs/dg/dev/guidelines/testing-guidelines/running-tests-with-robot-framework.html
  - title: Setting up tests
    link: /docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Testing best practices
    link: /docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
---

Cypress is an end-to-end testing framework that provides a modern approach to testing web applications. Spryker provides a Cypress boilerplate project with pre-configured setup, best practices, and examples for testing Spryker-based applications.

## Cypress boilerplate

For comprehensive information on setting up and using Cypress with Spryker, refer to the [cypress-boilerplate](https://github.com/spryker-projects/cypress-boilerplate) repository.

The boilerplate includes:
- Pre-configured Cypress setup optimized for Spryker projects
- Example test cases and patterns
- Documentation and best practices
- Integration guides

The boilerplate does NOT include:
- Complete test coverage - you should add and adjust example tests to fit your project
- Correct locators - the locators in the boilerplace are based on Spryker demo shops, adjust the locators in accordance with your project

## Internal Cypress tests

Please note, that Cypress tests are used by Spryker for internal testing of the core Spryker features as well. You should remove the mentions of `cypress-tests` from `composer.json`. You can re-use and customize these tests for your project, however, Spryker does not guarantee these tests would work on a customized project, if you decide to keep them. Spryker recommends you use the boilerplate instead.

## Resources

- **Repository**: [spryker-projects/cypress-boilerplate](https://github.com/spryker-projects/cypress-boilerplate)
- **Wiki**: [cypress-boilerplate Wiki](https://github.com/spryker-projects/cypress-boilerplate/wiki)

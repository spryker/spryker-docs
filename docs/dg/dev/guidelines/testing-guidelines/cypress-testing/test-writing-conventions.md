---
title: Cypress test writing conventions
description: Learn the Cypress boilerplate rules for what you must, must not, and should do when writing a test.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Best practices
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/best-practices.html
  - title: Naming conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/naming-conventions.html
---

This document describes the conventions for writing tests.

## Must

- Use one of the following attributes for element selection when available: `id`, `name`, or `data-qa`.
- Create all locators that belong to one application page, and the methods that use them, inside the relevant page object.
- Represent each application page as a separate page object in `cypress/support/page-objects`.
- Specify test data in `cypress/fixtures`.
- Keep test assertions short and concise, and verify a single specific business case per assertion.

## Must not

- Do not hardcode test data inside the test.
- Do not make element locators rely on the element's position inside the DOM.
- Do not place complex actions that use more than one application page inside a page object file.
- Do not use hardcoded wait times in tests, to improve reliability and reduce flakiness.

## Should

- Organize tests into logical suites based on feature areas or user workflows.
- Reset or clean up test data before each test suite, to maintain test independence.
- Create complex, reusable actions that use more than one application page as scenarios in `cypress/support/scenarios`.

---
title: Integrating Cypress tests into CI
description: Learn how to integrate Cypress tests into a continuous integration pipeline, and how to check the code quality of your Cypress tests.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: ESLint and Prettier
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/eslint-and-prettier.html
---

This document describes how Cypress tests integrated into a continuous integration (CI) pipeline.

1. Cypress tests maintained as part of the project code.
2. Verifying the code quality of your Cypress tests.


## Cypress tests as part of the project code

Cypress tests are part of the project repository. The CI pipeline runs the tests - you do not need to clone a separate Cypress tests repository. You install and run Cypress tests directly from the project repository. It is possible to find configuration in the file `.github/workflows/ci.yml`

```yaml
    cypress-e2e:
        needs: [js-validation, validation, cypress-quality-gate]
        name: "Cypress-boilerplate / E2E"
```

## Verifying Cypress test code quality

In addition to running Cypress tests, verify the code quality of your Cypress tests using ESLint and Prettier. This job is optional, and you can include it based on your project's needs. Find the example in the same `.github/workflows/ci.yml` file.

```yaml
    cypress-quality-gate:
        name: "Cypress-boilerplate / Lint & Format"
```

Following these CI configurations lets you use integrated Cypress tests in your CI pipeline, while maintaining a high standard of code quality for your test code.
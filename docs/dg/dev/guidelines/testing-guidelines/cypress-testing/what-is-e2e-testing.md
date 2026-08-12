---
title: What is E2E testing?
description: Learn what end-to-end (E2E) testing is, how it works, and when to use it in Spryker projects.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Identifying what to test
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html
---

End-to-end (E2E) testing is a technique that tests your entire application, from the web browser through to the back end, including integrations with third-party APIs and services.

## How E2E testing works

E2E testing simulates real user interactions in an actual browser environment. Tests navigate to URLs, interact with elements, click buttons, fill out forms, and move through the application the same way a user would. With Cypress, you write E2E tests using an API that mirrors the steps a user takes.

## Benefits of E2E testing

- **Ensures app functionality as a cohesive whole**: verifies that all application components work together.
- **Matches the user experience**: simulates real interactions to confirm expected behavior.
- **Enables cross-functional testing**: acts as an integration test for external services and APIs.
- **Involves both developers and QA**: is flexible enough to be created by different roles on the team.

## Considerations for E2E testing

- **Setup and maintenance complexity**: E2E tests are more complex to set up and maintain than unit or integration tests, particularly in CI environments.
- **Testing infrastructure requirements**: complex scenarios may require additional testing infrastructure.
- **Flakiness and speed**: because of their broad scope, E2E tests run slower and are more prone to inconsistencies than narrower test types.

## Common scenarios for E2E testing

Use E2E tests to do the following:

- Validate authentication, purchasing, and registration workflows.
- Ensure data persists correctly across pages.
- Run smoke tests to verify overall system health.

## Conclusion

E2E testing is a crucial tool for ensuring the overall functionality and reliability of your application. While it can be more complex to set up and maintain, the benefits of catching critical errors and ensuring smooth user experiences make it invaluable for any robust testing strategy. By covering critical workflows, verifying integration points, and using real browsers to simulate user behavior, E2E testing with Cypress helps ensure your application is working exactly as your users expect.

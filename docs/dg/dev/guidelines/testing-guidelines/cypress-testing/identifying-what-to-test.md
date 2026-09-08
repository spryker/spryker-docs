---
title: Identifying what to test
description: Learn which parts of your application to cover with E2E Cypress tests, and which to avoid.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: What is E2E testing?
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/what-is-e2e-testing.html
  - title: Best practices
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/best-practices.html
---

This document describes what to cover with E2E Cypress tests, and what to leave to other test types.

## What to cover with E2E Cypress tests

### User journeys

The first and most important areas to cover with E2E tests are the mission-critical paths in your application, for example:

- **Login and authentication**: ensure users can log in and access their accounts.
- **Purchasing and checkout**: test the entire purchasing process, from adding items to the cart to completing the payment.
- **Sign-up and registration**: verify that new users can register successfully.

A user journey is the sequence of steps a user takes to accomplish a goal in your application. Testing a user journey with a single E2E test ensures that all the components of your application—front end, back end, database, and APIs—work together seamlessly. A test that covers an entire user journey helps you do the following:

- Validate that all pieces of the application work in unison.
- Identify issues that arise from the integration of different layers in your tech stack.
- Gain confidence that critical user flows function as expected.

For example, an E2E test for an e-commerce checkout process can include the following steps:

1. Search for a product.
2. Add the product to the shopping cart.
3. Proceed to checkout.
4. Enter shipping and payment information.
5. Complete the purchase.

Cover used API endpoints with at least one positive and one negative user journey. When testing APIs, use response schema validation instead of direct assertions, to ensure the structure and data types are correct.

For example, an API user journey for an e-commerce shop can include the following steps:

1. **Get an access token**: authenticate the user and obtain an access token.
2. **Search for a product**: use the token to search for a specific product.
3. **Add the product to the cart**: add the searched product to the user's cart.
4. **Retrieve checkout data**: retrieve all the available shipping and payment methods.
5. **Place an order**: finalize the purchase and place the order.

### New features

When you implement a new feature, start by understanding its end goal: what problem does it solve, and what does it need to do? Break down the feature into smaller, testable steps. Translate each step into a test that verifies a specific part of the feature's functionality.

For example, for a new wishlist feature on an e-commerce site, your tests can include the following:

1. Add a product to the wishlist.
2. View the wishlist.
3. Remove a product from the wishlist.
4. Move a product from the wishlist to the cart.

### Bugs

Whenever you discover a bug, write a test that reproduces it before fixing it. This provides the following benefits:

- **Prevents regressions**: the test ensures the bug does not reappear in the future.
- **Documents the fix**: the test serves as documentation for the bug and its resolution.
- **Builds confidence in stability**: passing tests after a fix confirm that the application remains stable.

For example, to fix a login bug where users cannot log in under certain conditions, do the following:

1. Write a test that simulates those conditions and attempts to log in.
2. Confirm that the test fails, proving the bug exists.
3. Fix the bug in the code.
4. Run the test again to ensure it now passes.

## What not to cover with E2E Cypress tests

E2E tests are powerful, but they are not the best tool for every type of testing.

### Detailed UI testing

E2E tests should focus on user flows and critical paths, not fine UI details:

- **Visual styles**: do not use E2E tests to check specific colors, fonts, or layout details. Cover these with visual regression tests or unit tests instead.
- **Minor UI elements**: avoid testing the presence or styling of minor UI elements, such as icons or text alignment, that do not affect the core user journey.

### Extensive data validations

Do not use E2E tests for deep validation of data structures or database states:

- **Complex data relationships**: use integration or unit tests to validate complex data models or relationships.
- **Data consistency across multiple systems**: use integration tests, not E2E tests, to validate data consistency between multiple systems, such as microservices or third-party APIs.

### Backend logic

Avoid using E2E tests to validate backend logic in isolation:

- **Business rules**: use unit tests to validate business logic and rules.
- **Performance metrics**: use specialized performance testing tools, not E2E tests, to measure response times or run load tests.

### Non-critical flows

Avoid covering non-critical or edge-case flows with E2E tests, especially if they do not significantly affect the user experience:

- **Rarely used features**: focus on core user journeys and critical paths rather than rarely used features.
- **Internal tools or admin panels**: unless these tools are mission-critical, they may not need E2E test coverage.

### Highly dynamic content

Avoid testing content that changes frequently or is highly dynamic:

- **Randomized content**: testing elements with randomized or frequently changing content leads to brittle tests that fail often.
- **Third-party integrations**: third-party content or integrations beyond your control may not be stable enough for reliable E2E testing.

### External sites

Avoid visiting or interacting with sites or servers you do not control. Only test websites that you control—visiting or relying on a third-party server introduces variability and flakiness into your tests, making them less reliable.

## Summary

E2E tests are critical for ensuring that your application works as intended from the user's perspective. Focus on covering mission-critical user journeys, new features, and bugs, while avoiding detailed UI testing, extensive data validations, backend logic, non-critical flows, highly dynamic content, and external sites. Cover API endpoints with at least one positive and one negative user journey, and use response schema validation for robust and reliable testing. By targeting the right areas and avoiding common pitfalls, you can build a test suite that provides confidence in the stability and reliability of your application.

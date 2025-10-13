---
title: Test types best practices
description: Learn when and how it's best to use different test types in your Spryker project.
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/testing-best-practices/test-types-best-practices.html
---

Different test types as unit, uunctional, ucceptance, and other tests, serve a specific purpose and implications in different aspects. For example, unit tests are usually very fast whereas acceptance tests are very slow. The following image shows the differences from different aspects:

![testing-pyramid](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/testing-guidelines/testing-best-practices/test-types-best-practices/Testing-pyramid.jpg)

As evident from the image, the unit tests positioned at the bottom of the pyramid are cost-effective, robust, and fast. In contrast, the UI or end-to-end (E2E) tests at the top of the pyramid are expensive, brittle, and slow.
This implies that it's better to focus on the tests at the bottom first and have more of those than the ones at the top. We recommend to write tests that are higher in the pyramid only when the lower tests aren't enough. For example, it's a bad practice to always use acceptance or UI tests. These tests should only be used when they are really necessary.

## Unit tests

Unit tests typically reside in the Business layer. However, some of them may also reside in the Communication layer. To achieve a high coverage (around 80%) of unit tests, it's a good practice for developers to write unit tests for every change they make. Additionally, in many cases, code can be tested with integration tests, which test how several parts of a system work together. For more information on integration tests, see the [Integration tests](#integration-tests).

These tests are cost-effective, robust, and fast. You can mock any dependencies in these tests. You can also easily manipulate the system during the *Arrange* phase of your tests.

## Integration tests

There is a mixture of unit and integration tests in the Business and the Communication layer. Integration tests are typically performed using facade tests in the Business Layer and cover several parts of the system together. Spryker primarily uses integration tests and switches to unit tests when necessary.

Integration tests can be slow, but they can also provide good code coverage and reduce the number of tests required.

Like unit tests, you can mock any dependencies in the integration tests and easily manipulate the system during the *Arrange* phase of your tests.

## Acceptance tests (UI tests, E2E tests)

Acceptance tests are the slowest tests, and you should avoid using them as much as you can. Acceptance tests in Spryker reside in the Presentation layer. These tests render pages as you open them within your tests which makes it slow. Besides, there is no simple way to bring the system into a state you would like to test. For example, if you need a specific customer in the database, you have to create the customer by following the standard customer creation process:

1. Go to the registration page.
2. Fill out the form and submit it.
3. Confirm the registration, etc.

As you can imagine, having hundreds of tests that require a specific customer would eat up a lot runtime of your tests, which will make you test suite extremely slow. In most cases, unit or integration tests should be preferred over the acceptance tests.

With the acceptance tests, you can't do mocking easily, however, there is a way of reducing the runtime in the above described process. When you have no other choice than using an acceptance test, you can also achieve the state setup by using an API call in your test, ideally, from a helper with a clean-up API call.

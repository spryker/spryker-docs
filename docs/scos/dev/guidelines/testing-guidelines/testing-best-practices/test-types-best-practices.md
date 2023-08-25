---
title: Test types best practices
description: Learn when and how it is best to use different test types in your Spryker project.
last_updated: Jun 16, 2021
template: concept-topic-template
---

Different test types as unit, uunctional, ucceptance, and other tests, serve a specific purpose and implications in different aspects. For example, unit tests are usually very fast whereas acceptance tests are very slow. The following image shows the differences from different aspects:

![testing-pyramid](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/testing-guidelines/testing-best-practices/test-types-best-practices/Testing-pyramid.jpg)

As evident from the image, the unit tests positioned at the bottom of the pyramid are cost-effective, robust, and fast. In contrast, the UI or end-to-end (E2E) tests at the top of the pyramid are expensive, brittle, and slow.
This implies that it's better to focus on the tests at the bottom first and have more of those than the ones at the top. We recommend to write tests that are higher in the pyramid only when the lower tests aren't enough. For example, it's a bad practice to always use acceptance or UI tests. These tests should only be used when they are really necessary.

## Unit tests

Unit tests typically reside in the Business layer. However, some of them may also reside in the Communication layer. To achieve a high coverage (around 80%) of unit tests, it's a good practice for developers to write unit tests for every change they make. Additionally, in many cases, code can be tested with integration tests, which test how several parts of a system work together. For more information on integration tests, see the [Integration tests](#integration-tests).

These tests are cost-effective, robust, and fast. You can mock any dependencies in these tests. You can also easily manipulate the system during the _Arrange_ phase of your tests.

## Integration tests
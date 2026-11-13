---
title: Test types best practices
description: Learn how a Spryker test suite is weighted across its test tiers, from static analysis to end-to-end journeys, and in which tier a new test belongs.
last_updated: Sep 29, 2026
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/testing-best-practices/test-types-best-practices.html
related:
  - title: Best practices for effective testing
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Testify
    link: docs/dg/dev/guidelines/testing-guidelines/testify.html
  - title: Identifying what to test with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html
---

Spryker does not follow the testing pyramid. The pyramid puts most of its weight on unit tests that mock their collaborators. In a modular monolith like Spryker, most defects live in the interaction between a facade, its Persistence layer, and the plugins a project registers. Mocking those interactions away tests the mock instead of the code.

A Spryker test suite has the shape of the *testing trophy* instead. Each part of the trophy is a test tier, and each tier holds one or more test types:

- **Static analysis** is the broad base. [PHPStan](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html), [Code Sniffer](/docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html), and [Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html) check types, coding style, and application layer boundaries on every file, without anybody writing a test.
- **Unit tests** are a narrow stem. A class unit test covers one class, and you write one only where a facade test cannot reach a branch without a heavy arrange section.
- **Integration tests** carry the volume of the suite. Facade tests run the real code of several modules against the real database in one process, using the [Testify](/docs/dg/dev/guidelines/testing-guidelines/testify.html) helpers instead of mocks. Application programming interface (API) contract tests prove what an API request may send and what its response contains.
- **End-to-end tests** are a thin top. Each Cypress journey walks one critical customer or Back Office user flow through the browser. Journeys stay few, and they never enumerate cases or assert business rules.

## Choose the tier for a new test

Put a test in the cheapest tier that can still see the defect you want it to catch. Each step up the trophy boots more of the system, needs more running services, and names the broken module less precisely when it fails.

- If a change alters a business rule, a calculated value, or a state transition, write or extend a facade test.
- If a change alters what an API request may send or what its response contains, write or extend the API contract test for that operation.
- If a change touches a flow that a Cypress journey already walks, extend that journey. Add a new journey only when no cheaper test type can see the defect. For what a journey may assert, see [Identifying what to test](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html).

If a test in a higher tier catches a defect and no test in a lower tier fails, the lower tier is missing a test. Write it there.

## Earlier recommendations on this page

Earlier versions of this page recommended the testing pyramid. The tiers on this page replace that advice:

| Earlier recommendation | Current recommendation |
|---|---|
| Most tests are unit tests with mocked dependencies. | Most tests are facade tests on the real code and the real database. Class unit tests cover only the branches a facade test cannot reach. |
| Integration tests are written only where unit tests are not enough. | Integration tests are the default, and a facade test is where a business rule is proven. |
| Acceptance tests render pages in the Presentation layer and are avoided where possible. | Cypress journeys prove the flows that only a browser can reach, one journey per critical flow. |

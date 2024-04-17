---
title: Code coverage
description: Learn how to generate the code coverage report.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-coverage
originalArticleId: 630a5773-8205-4f00-a6ee-d1876e76d975
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/code-coverage.html
  - /docs/scos/dev/guidelines/testing/code-coverage.html
related:
  - title: Available test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html
  - title: Data builders
    link: docs/scos/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/scos/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Publish and Synchronization testing
    link: docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html
  - title: Setting up tests
    link: docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/scos/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/test-helpers.html
  - title: Testify
    link: docs/scos/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html
  - title: Testing concepts
    link: docs/scos/dev/guidelines/testing-guidelines/testing-concepts.html
  - title: Testing console commands
    link: docs/scos/dev/guidelines/testing-guidelines/testing-console-commands.html
---

To be aware of what you are testing, you should know the code coverage. To get the code coverage report generated, make sure Xdebug is enabled and run your tests with an additional flag:

`vendor/bin/codecept run --coverage-html`

This will generate a coverage report in HTML that can be opened in any browser.

Keep in mind, that if you execute the tests with the coverage report, it will take much more time to run the tests. Therefore, consider running only certain tests for the code you are currently working on.

{% info_block warningBox "Code coverage for Presentation tests" %}

Currently, we don't support code coverage for Presentation (Acceptance) tests out of the box.

{% endinfo_block %}

## Next steps

[Set up an organization of your tests](/docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html)

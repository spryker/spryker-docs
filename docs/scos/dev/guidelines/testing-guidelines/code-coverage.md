---
title: Code Coverage
description: Learn how to generate the code coverage report.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-coverage
originalArticleId: 630a5773-8205-4f00-a6ee-d1876e76d975
redirect_from:
  - /2021080/docs/code-coverage
  - /2021080/docs/en/code-coverage
  - /docs/code-coverage
  - /docs/en/code-coverage
  - /v6/docs/code-coverage
  - /v6/docs/en/code-coverage
  - /v5/docs/codecoverage
  - /v5/docs/en/codecoverage
  - /docs/scos/dev/guidelines/testing/code-coverage.html
---

To be aware of what you are testing, you should know the code coverage. To get the code coverage report generated, make sure Xdebug is enabled and run your tests with an additional flag:

`vendor/bin/codecept run --coverage-html`

This will generate a coverage report in HTML that can be opened in any browser.

Keep in mind, that if you execute the tests with the coverage report, it will take much more time to run the tests. Therefore, consider running only certain tests for the code you are currently working on.

{% info_block warningBox "Code coverage for Presentation tests" %}

Currently, we don't support code coverage for Presentation (Acceptance) tests out of the box.

{% endinfo_block %}

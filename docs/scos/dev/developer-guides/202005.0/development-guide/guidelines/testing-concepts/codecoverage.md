---
title: Codecoverage
originalLink: https://documentation.spryker.com/v5/docs/codecoverage
redirect_from:
  - /v5/docs/codecoverage
  - /v5/docs/en/codecoverage
---

## Code-coverage
You will only be sure what you are testing when you have a look into the codecoverage. To get the codeecoverage generated you need to have xdebug enabled and you need to run your tests with an additional flag:

`vendor/bin/codecept run --coverage-html`

This will generate a coverage report in HTML that can be opened in any browser. Be aware that executing the tests with coverage report it will take much more time to run the tests. Therefor you should consider to run only certain tests for code you are currently working on.

### Code-coverage for Presentation tests
Currently, we don't support code-coverage for Presentation (Acceptance) tests out of the box.

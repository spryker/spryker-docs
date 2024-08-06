---
title: Testing updates
description: Learn how to test your code after taking updates
last_updated: Apr 3, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/updating-spryker/testing-updates.html
---

To find out about the obvious update errors before executing the tests, run `php -d memory_limit=-1 ./vendor/bin/phpstan analyze --no-progress src/ -l 5`. It has to be set up and green before the updates happen.

Once you've completed the update, it's necessary to make sure that everything still works as expected, and nothing is broken. To do so, complete the following steps right after the update:

## Automated tests

Automated tests are must-have for every project and are very helpful in case of updates. We recommend running the following tests:
* Acceptance tests: cover the most critical e-commerce functionality of your shop.
* Functional tests: cover your Facade methods in Zed.
* Unit tests: cover classes with complex business logic and tricky algorithms.

See [Test framework](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html) for more information about testing your project's code.

{% info_block infoBox "Qualitative coverage" %}

In case of updates, the goal of automated tests is not a 100% code coverage, but a qualitative coverage of your critical functionality.

{% endinfo_block %}

## Code analysis tools

We find the following static code analysis tools the most helpful and strongly recommend using them:
* [PhpStan](https://github.com/phpstan/phpstan):  helps you find incompatible interface signatures, undefined method calls, missing classes, use of deprecated methods (phpstan-deprecation-rules), and many more. For information about installing and using the tool, see [PHPStan](/docs/scos/dev/sdk/development-tools/phpstan.html).
* [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer): keeps the code clean and consistent after updates. For information about installing and using the tool, see [Code Sniffer](/docs/scos/dev/sdk/development-tools/code-sniffer.html).
* [Architecture Sniffer](https://github.com/spryker/architecture-sniffer): helps you maintain the quality of the architecture. For information about installing and using the tool, see [Architecture Sniffer](/docs/scos/dev/sdk/development-tools/architecture-sniffer.html).

## Additional checks

In addition to the automated tests and code analysis tools, you can optionally do the following:
* *Re-install the project locally* to make sure the installation process is not broken, demo-data import along with [publish and synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) work as expected.
* *Run a manual smoke test* either locally or on stage to make sure everything works and looks fine. This is especially important if you don't have enough acceptance test coverage.

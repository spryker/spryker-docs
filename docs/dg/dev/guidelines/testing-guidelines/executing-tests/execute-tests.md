---
title: Execute tests
description: Learn what commands you can use to execute your tests. You can run all tests or specific ones within your Spryker Based Projects.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/executing-tests
originalArticleId: 640291c8-48bc-4684-8725-0c16b79c2589
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/execute-tests.html
  - /docs/scos/dev/guidelines/testing/executing-tests.html
related:
  - title: Available test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Publish and Synchronization testing
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Setting up tests
    link: docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/dg/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html
  - title: Testify
    link: docs/dg/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

There are many ways to execute the [tests](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html). You can do a full run of all tests, or you can narrow it down to only execute a specific test method.

## Executing all tests

To run all tests, use this command:

```bash
vendor/bin/codecept run
```

## Executing tests by group

At Spryker, all our test classes have a DocBlock containing `@group` annotations.

Example:

```php
/**
 * Auto-generated group annotations
 *
 * @group SprykerTest
 * @group Zed
 * @group Acl
 * @group Business
 * @group AclTest
 *
 * Add your own group annotations below this line
 */
```

Basically, each part of the namespace is added as `@group` annotation.
The groups are useful for tests, as you can run them for a specific group.

To execute a test for a group, run:

```bash
vendor/bin/codecept run -g {group}
```

where `{group}` is the name of your group.

For example, running

```bash
vendor/bin/codecept run -g Zed
```

will execute tests with the `@group Zed` annotation.

### Executing a test suite

To execute a specific test suite, run:

```bash
vendor/bin/codecept run -c {test_suite}
```

where `{test_suite}` is the path to the test suite you want to run.

For example, running

```bash
vendor/bin/codecept run -c tests/PyzTest/Zed/Acl
```

will execute only the tests for the Acl module of the Zed application.


### Executing a single test class

To execute a specific test class, run:

```bash
vendor/bin/codecept run -c {test_suite} -g {test_class}
```

where `{test_suite}` is the path to the test suite  and `{test_class}` is the test class you want to run.

For example, running

```bash
vendor/bin/codecept run -c tests/PyzTest/Zed/Acl -g RoleControllerCest
```

will only execute `RoleControllerCest` from the Acl module of the Zed application.

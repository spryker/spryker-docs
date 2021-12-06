---
title: Executing Tests
description: Lean what commands you can use to execute your tests.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/executing-tests
originalArticleId: 640291c8-48bc-4684-8725-0c16b79c2589
redirect_from:
  - /2021080/docs/executing-tests
  - /2021080/docs/en/executing-tests
  - /docs/executing-tests
  - /docs/en/executing-tests
  - /v6/docs/executing-tests
  - /v6/docs/en/executing-tests
  - /v5/docs/executing-tests
  - /v5/docs/en/executing-tests
  - /docs/scos/dev/guidelines/testing/executing-tests.html
---

There are many ways to execute the [tests](/docs/scos/dev/guidelines/testing-guidelines/test-framework.html). You can do a full run of all tests, or you can narrow it down to only execute a specific test method.

## Executing all Tests
To run all tests, use this command:
```bash
vendor/bin/codecept run
```

## Executing Tests by Group

At Spryker, all our test classes have a DocBlock containing `@group` annotations.

Example:
```
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

To execute a test for a group, run
```bash
vendor/bin/codecept run -g {group}
```
where `{group}` is the name of your group.

For example, running
```bash
vendor/bin/codecept run -g Zed
```
will execute tests with the `@group Zed` annotation.

### Executing a Test Suite
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


### Executing a Single Test Class
To execute a specific test class, run
```bash
vendor/bin/codecept run -c {test_suite} -g {test_class}
```
where `{test_suite}` is the path to the test suite  and `{test_class}` is the test class you want to run.

For example, running
```bash
vendor/bin/codecept run -c tests/PyzTest/Zed/Acl -g RoleControllerCest
```
 will only execute `RoleControllerCest` from the Acl module of the Zed application.

---
title: Executing Tests
originalLink: https://documentation.spryker.com/2021080/docs/executing-tests
redirect_from:
  - /2021080/docs/executing-tests
  - /2021080/docs/en/executing-tests
---

There are many ways to execute the [tests](https://documentation.spryker.com/docs/test-framework). You can do a full run of all tests, or you can narrow it down to only execute a specific test method.

## Executing all Tests
To run all tests, use this command:
```Bash
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
```Bash
vendor/bin/codecept run -g {group}
```
where `{group}` is the name of your group. 

For example, running
```Bash
vendor/bin/codecept run -g Zed
```
will execute tests with the `@group Zed` annotation.

### Executing a Test Suite
To execute a specific test suite, run:
```Bash
vendor/bin/codecept run -c {test_suite}
```
where `{test_suite}` is the path to the test suite you want to run.

For example, running
```Bash
vendor/bin/codecept run -c tests/PyzTest/Zed/Acl
``` 
will execute only the tests for the Acl module of the Zed application.


### Executing a Single Test Class
To execute a specific test class, run
```Bash
vendor/bin/codecept run -c {test_suite} -g {test_class}
```
where `{test_suite}` is the path to the test suite  and `{test_class}` is the test class you want to run.

For example, running
```Bash
vendor/bin/codecept run -c tests/PyzTest/Zed/Acl -g RoleControllerCest
```
 will only execute `RoleControllerCest` from the Acl module of the Zed application.





---
title: Executing tests
originalLink: https://documentation.spryker.com/v5/docs/executing-tests
redirect_from:
  - /v5/docs/executing-tests
  - /v5/docs/en/executing-tests
---

## Executing tests
There are many ways to execute the tests. You can do a full run of all tests or you can nail it down even to only execute a specific test method.

### Executing all tests
`vendor/bin/codecept run` will run all tests.

### Execute tests by group
`vendor/bin/codecept run -g Zed` will run only tests with the `@group Zed` annotation.

At Spryker all our test classes have a DocBlock containing usefull `@group` annotations. 

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
Basically, each part of the namespace is added as `@group` annotation. This enables executing e.g. all Zed tests.

### Execute a test suite
`vendor/bin/codecept run -c tests/PyzTest/Zed/Acl` will run only the tests from Zed Acl.


### Execute a single test class
`vendor/bin/codecept run -c tests/PyzTest/Zed/Acl -g RoleControllerCest` will only run the `RoleControllerCest` from Zed Acl.





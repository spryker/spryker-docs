---
title: Test framework
originalLink: https://documentation.spryker.com/2021080/docs/test-framework
redirect_from:
  - /2021080/docs/test-framework
  - /2021080/docs/en/test-framework
---

To easily test every aspect of Spryker and the code you write, Spryker uses the [Codeception testing framework](https://codeception.com/) and [PHPUnit ](https://phpunit.de/). 
{% info_block infoBox %}

We strongly recommend reading the documentation of both frameworks to get the best out of your tests.

{% endinfo_block %}

Codeception offers many handy things to write better and cleaner tests. Many solutions this framework has are built on top of PHPUnit. In the next articles, we will only reference Codeception even if these features are available in PHPUnit as well.

On top of Codeception, we have built the [Testify](https://github.com/spryker/testify/) module, which provides many handy helpers. See [Testify Helpers](https://documentation.spryker.com/docs/available-test-helpers#testify-helpers) for details on the existing helpers.

## Configuration
`codeception.yml` in the root of your project is the main entry point for your tests. In this file, the basic configuration for your test suite is defined.

From this file, you can include other `codeception.yml` for a better organization of your tests. 

Example:
```
namespace: PyzTest
actor: Tester

include:
    - tests/PyzTest/*/*
...
```
See [codeception.yml in Spryker Master Suite](https://github.com/spryker-shop/suite/blob/master/codeception.yml) for example.

For more information, see [Codeception configuration documentation](https://codeception.com/docs/reference/Configuration).

## Console Commands
There are many console commands provided from Codeception, but the most used ones are:

- `vendor/bin/codecept build` - generates classes
-  `vendor/bin/codecept run`  - executes all your tests

For information on other Codeception console commands, run `vendor/bin/codecept list`.

See [Executing Tests](https://documentation.spryker.com/docs/executing-tests) for details on some commands. 

## Testing with Spryker
On top of Codeception, we have added a basic infrastructure for tests. We have divided our tests by the applications, and for the layer we test. Thus, the organization of tests in most cases looks like this:

* `tests/OrganizationTest/Application/Module/Communication` - for example, controller or plugin tests.
* `tests/OrganizationTest/Application/Module/Presentation` - for example, testing pages with JavaScript.
* `tests/OrganizationTest/Application/Module/Business` - for example, testing facades or models.

The **Communication** suite can contain unit and functional tests. The controller tests can be used to test like a user that interacts with the browser but without the overhead of the GUI rendering. This suite should be used for all tests that do not need JavaScript.

The **Business** suite can contain unit and functional tests. The facade test is one kind of an API test approach. For more information, see [Test API](https://documentation.spryker.com/docs/en/testing-best-practices#test-api).

The **Presentation** suite contains functional tests that can be used to interact with a headless browser. These tests should be used when you have JavaScript on the page under test. 

All test classes follow the exact same path as the class under test, except that tests live in the `tests` directory, and the organization part of the namespace is suffixed with `Test`. For example, `tests/PyzTest/*`. For details on the `tests` directory structure, see [Directory Structure](https://documentation.spryker.com/docs/en/setting-up-tests#directory-structure).

Each test suite contains a `codeception.yml`configuration file. This file includes, for example, [helpers](https://documentation.spryker.com/docs/test-helpers) that are enabled for the current suite.

For example, check the organization in the [Application](https://github.com/spryker-shop/suite/tree/master/tests/PyzTest/Yves/Application) module of Spryker Master Suite.

## Next Steps

* [Set up an organization of your tests](https://documentation.spryker.com/docs/setting-up-tests).
* Learn about the [available test helpers](https://documentation.spryker.com/docs/available-test-helpers).
* [Create or enable a test helper](https://documentation.spryker.com/docs/test-helpers).
*  Learn about the [console commands you can use to execute your tests](https://documentation.spryker.com/docs/executing-tests).
* [Configure data builders to create transfers your tests](https://documentation.spryker.com/docs/data-builders).
* [Generate code coverage report for your tests](https://documentation.spryker.com/docs/code-coverage).
* Learn about the [testing best practices](https://documentation.spryker.com/docs/testing-best-practices).


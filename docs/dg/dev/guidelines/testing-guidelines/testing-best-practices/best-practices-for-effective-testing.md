---
title: Best practices for effective testing
description: The article describes how to write and organize your tests efficiently for your Spryker based projects.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/testing-best-practices
originalArticleId: 3bee0606-3660-4935-b990-33cc4adb6d0a
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - /docs/scos/dev/guidelines/testing/testing-best-practices.html
  - /docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html
related:
  - title: Available test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
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
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

As a rule of thumb, [tests](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html) should be as follows:

* Easy to read and maintain
* Treated as if they were the production code


This article provides recommendations on how you can achieve that.
<a name="{test-api}"></a>

## API tests

It's a common idea that that you should test the smallest possible unit of an application. While ensuring granular validation, it can lead to excessive tests that verify individual units but don't confirm if they work together. Integration tests help address this but often result in redundant coverage, increasing test execution time.

In Spryker, we prioritize module API tests because they serve as the primary entry point into the module business logic. To ensure correct functionality, module API tests should cover both the *facade* and *plugins*, except for plugins that only forward the call to a Facade method.

Each module API method should have at least two test cases: a happy- and an unhappy-path scenario. Ideally, tests should cover the entire API specification.

If the arrange section of a module API test becomes too complex, consider adding targeted unit tests to ensure clarity and maintainability.

## Method naming

A good test starts with a good method name, which may be subjective. At Spryker, we try to use descriptive names that describe a test does. Examples:
* testDoSomethingShouldReturnTrueWhen...()
* testDoSomethingShouldReturnFalseWhen...()

## Three-step testing approach

A test's method body should follow a three-step testing approach:

1. // Arrange
2. // Act
3. // Assert

These inline comments give the reader of your test method a clear understanding of what exactly is happening.

## Small test methods

There're several ways to make your test methods small, easy to read and understand. When the arrange part is too big, you can use the tester class and helper classes. Move the arrange code into the generated tester class.

If you need to use the same code in different modules, you can use helpers as described in [Using Another Helper in a Helper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html#using-another-helper-in-a-helper).

For an example of code that can be used in multiple modules, see CustomerTransfer in  [\SprykerTest\Shared\Customer\Helper\CustomerDataHelper](https://github.com/spryker/customer/blob/master/tests/SprykerTest/Shared/Customer/_support/Helper/CustomerDataHelper.php).

## Use message argument in assert* methods

PHPUnit's `assert*` methods have the ability to pass a message. For example:

```php
$this->assertTrue($result, 'Expected that the result of doSomething is "true" but "false" was returned.');
```

If the test failed, you will see the passed message on the console, which should make it easier to fix the broken test.

## Use as less mocks as possible

Testing single units of your application is a good approach, however, it has some drawbacks as described in the [Test API](#test-api) section. The more you mock, the less you really test. Besides, it's very common to forget to update mocks, which leads to even more issues in your code.

Of course, you can mock all the dependencies of a model under test, but, most likely, that just adds unneeded overhead to your test. In many cases, let's say at least in the happy case, your code should work with the given dependencies. Testing exceptional cases very often requires mocking to be able to test the un-happy cases. In this case, you should also try to use as little mocks as possible to get the most coverage out of a few lines of test code.

## Add your own testify module

It is advised to organize your tests as well. For a simpler test setup, you should at least add your own LocatorHelper, which is enabled in your project namespace by default.

```php
namespace PyzTest\Shared\Testify\Helper;

use SprykerTest\Shared\Testify\Helper\LocatorHelper;

class ProjectLocatorHelper extends LocatorHelper
{
    /**
     * @var array
     */
    protected $config = [
        'projectNamespaces' => [
            // add your project namespaces here
        ],
        'coreNamespaces' => [
            'SprykerShop',
            'Spryker',
        ],
    ];
}
```

## Code coverage

Running [code coverage generation](/docs/dg/dev/guidelines/testing-guidelines/code-coverage.html) with XDebug is very slow. For better performance, we recommend switching to [PCOV](https://github.com/krakjoe/pcov/blob/develop/INSTALL.md).

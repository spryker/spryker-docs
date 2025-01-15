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
    link: /docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
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
    link: ocs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html
  - title: Testify
    link: docs/dg/dev/guidelines/testing-guidelines/testify.html
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

The rule of thumb for your [tests](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html) should be:

* Tests are treated as if they were the production code.
* Tests are easy to read and easy to maintain.

This article provides some recommendations on how you can achieve that.
<a name="{test-api}"></a>

## Test API

It is often stated that you should test the smallest possible unit of your application. On the one hand, that's a good approach, but on the other hand, it often leads to too many tests and tests that show the small units are working, but it doesn't show if the units work together. A valid argument could be to have integration tests to test everything together. That's ok but leads to the issue that you cover most of your code lines more than once, which makes the test execution take longer.

Facades are a very good example. You can write tests for the model under test. Then you also need a test that covers the creational part of the model, and then you need to have tests for the Facade itself. You can do that, of course, but such an approach leads to many mocks, and probably you also cover code lines more often than required.

At Spryker, we focus first on the API tests. The API is always the entry point into the application code.

You should have a least two test cases per API method: the happy and the un-happy test case. Ideally, you cover each line of your API specification.

Only when the `Arrange` section of your API test becomes too complex for all cases, you should consider smaller unit tests.

## Method naming

A good test starts with a good method name. You can get many opinions about what is good and what not about the method naming. We at Spryker, follow the practice to use speaking names that not only contain the method name under test.

Examples:
testDoSomethingShouldReturnTrueWhen...()
testDoSomethingShouldReturnFalseWhen...()

## Three step test approach

On top of the method name, the test method body should follow a three-step testing approach:

1. // Arrange
2. // Act
3. // Assert

These inline comments give the reader of your test method a clear understanding of what exactly is happening.

## Small test methods

There are several ways to make your test methods small, easy to read and understand. When your `Arrange` part becomes huge, you can use the tester class and helper classes. If you see too many code lines in this section, you can move the `Arrange` code into the generated `Tester` class.

Additionally, when you want to use the same code in different modules, you can use helpers as described in [Using Another Helper in a Helper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html#using-another-helper-in-a-helper).

Take a look into [\SprykerTest\Shared\Customer\Helper\CustomerDataHelper](https://github.com/spryker/customer/blob/master/tests/SprykerTest/Shared/Customer/_support/Helper/CustomerDataHelper.php) - this one can be re-used in many modules to give you CustomerTransfer.

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

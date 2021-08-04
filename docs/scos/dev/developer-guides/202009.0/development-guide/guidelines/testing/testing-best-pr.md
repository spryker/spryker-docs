---
title: Testing Best Practices
originalLink: https://documentation.spryker.com/v6/docs/testing-best-practices
redirect_from:
  - /v6/docs/testing-best-practices
  - /v6/docs/en/testing-best-practices
---

The rule of thumb for your [tests](https://documentation.spryker.com/docs/test-framework) should be:

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

## Method Naming
A good test starts with a good method name. You can get many opinions about what is good and what not about the method naming. We at Spryker, follow the practice to use speaking names that not only contain the method name under test. 

Examples:
testDoSomethingShouldReturnTrueWhen...()
testDoSomethingShouldReturnFalseWhen...()

## Three Step Test Approach
On top of the method name, the test method body should follow a three-step testing approach:

1. // Arrange
2. // Act
3. // Assert

These inline comments give the reader of your test method a clear understanding of what exactly is happening.

## Small Test Methods
There are several ways to make your test methods small, easy to read and understand. When your `Arrange` part becomes huge, you can use the tester class and helper classes. If you see too many code lines in this section, you can move the `Arrange` code into the generated `Tester` class.

Additionally, when you want to use the same code in different modules, you can use helpers as described in [Using Another Helper in a Helper](https://documentation.spryker.com/docs/test-helpers#using-another-helper-in-a-helper).

Take a look into [\SprykerTest\Shared\Customer\Helper\CustomerDataHelper](https://github.com/spryker/customer/blob/master/tests/SprykerTest/Shared/Customer/_support/Helper/CustomerDataHelper.php) - this one can be re-used in many modules to give you CustomerTransfer.

## Use Message Argument in assert* Methods
PHPUnit's `assert*` methods have the ability to pass a message. For example:
```
$this->assertTrue($result, 'Expected that the result of doSomething is "true" but "false" was returned.');
```
If the test failed, you will see the passed message on the console, which should make it easier to fix the broken test.

## Use as Less Mocks as Possible
Testing single units of your application is a good approach, however, it has some drawbacks as described in the [Test API](#test-api) section. The more you mock, the less you really test. Besides, it is very common to forget to update mocks, which leads to even more issues in your code. 

Of course, you can mock all the dependencies of a model under test, but, most likely, that just adds unneeded overhead to your test. In many cases, let's say at least in the happy case, your code should work with the given dependencies. Testing exceptional cases very often requires mocking to be able to test the un-happy cases. In this case, you should also try to use as little mocks as possible to get the most coverage out of a few lines of test code.

## Add Your own Testify Module
It is advised to organize your tests as well. For a simpler test setup, you should at least add your own LocatorHelper, which is enabled in your project namespace by default.

```
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

## Code Coverage
Running [code coverage generation](https://documentation.spryker.com/docs/code-coverage) with XDebug is very slow. For better performance, we recommend switching to [PCOV](https://github.com/krakjoe/pcov/blob/develop/INSTALL.md).

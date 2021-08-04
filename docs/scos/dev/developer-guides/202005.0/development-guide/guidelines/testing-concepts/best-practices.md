---
title: Best practices
originalLink: https://documentation.spryker.com/v5/docs/best-practices
redirect_from:
  - /v5/docs/best-practices
  - /v5/docs/en/best-practices
---

## Bestpractices
Test should be treated as they were production code. Test should be easy to read and easy to maintain.

### Test API

Usually, it's stated that you should test the smalles possible unit of your application. Thats a good approach but also often leads to too many tests and tests that show the small units are working but not if the units work together. A valid argument now would be to say to test everything together you can have integration tests. That's ok but leads to the issue that you will cover most of your code lines more than once which makes the test execution takes longer.

At Spryker we focus first on API tests. The API is always the entry point into the application code. Facades are a very good example. You can write tests for the model under test, you than also need a test that covers the creational part of the model and the you need to have tests for the Facade itself. You can do that there is no issue but this leads to many mocks and probably also cover code lines more often as required.

You should have a least two test cases per API method. The happy and the un-happy test case. Ideally, you cover each line of your API specification.

Only when the `Arrange` section of your API test becomes to complex for all cases you should consider smaller unit tests.

### Method naming
A good test starts with a good method name. You can get many opionions about what is good and what not. We at Spryker follow the practice to use speaking names that not only contain the method name under test. 

Examples:
testDoSomethingShouldReturnTrueWhen...()
testDoSomethingShouldReturnFalseWhen...()

### Three step test approach
On top of the method name, the test method body should follow a three step testing approach:

1. // Arrange
2. // Act
3. // Assert

These inline comments will give the reader of your test method a clear understanding of what exactly is happening.

### Small test methods
You have several ways to make your test methods small and easy to read and understandable. When your `Arrange` part becomes very hughe you can use the tester class and helper classes. If you see lot lines of code in this section you can move the `Arrange` code into the generated `Tester` class.

Addiotionally, when you want to use the same code in different modules you can make use of helper as descibed in the `Test helper` article.

Take a look into `\SprykerTest\Shared\Customer\Helper\CustomerDataHelper` this one can be re-used in many modules to give you a CustomerTransfer.

### Use message argument in assert* methods
PHPUnit's `assert*`methods have the ability to pass a meesage into. Look at this example:
```
$this->assertTrue($result, 'Expected that the result of doSomething is "true" but "false" was returned.');
```
If the test don't pass, you will see the passed message on the console and it should make it easier to fix a broken test.

### Use as less Mocks as possible
Testing single units of your application is a good approach but has also some drawbacks as described earlier in the `Test API` section. The more you mock the less you really test, in addition it is very common to forget to update mocks which leads to even more issues in your code. 

Yes, you can mock all the dependencies of a model under test but most likelly that just adds unneeded overhead to your test. In many cases, let's say at least in the happy case, your code should work with the given dependencies. Testing exceptional cases very often requires to mocking to be able to test the un-happy cases. But here you should also try to use as less mocks as possible to get the most coverage out of a few lines of test code.

### Add your own Testify module
It is adviced to organize your tests as well. For s simpler test setup you should at least add your own LocatorHelper which enabled your project namespace by default.

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

### Code-coverage
Running code-coverage generation with XDebug is very slow. For better performance you should switch to [PCOV](https://github.com/krakjoe/pcov/blob/develop/INSTALL.md).

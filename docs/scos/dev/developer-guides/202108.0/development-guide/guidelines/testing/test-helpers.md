---
title: Test Helpers
originalLink: https://documentation.spryker.com/2021080/docs/test-helpers
redirect_from:
  - /2021080/docs/test-helpers
  - /2021080/docs/en/test-helpers
---

[Codeception](https://codeception.com) provides so-called modules, which are *helpers* used for building your tests. These helpers allow you to hook into the lifecycle of tests and get handy methods available wherever the helper is enabled. Codeception and Spryker provide a lot of ready to use helpers. Checkout [Available Test Helpers](https://documentation.spryker.com/docs/available-test-helpers) for information on some of them.

Basically, almost every Spryker module provides one or more helpers. The helpers can be found in the `tests/Organization/Application/Module/_support/Helper/*` directory. For example, check out the [helper of the Router module](https://github.com/spryker/router/tree/master/tests/SprykerTest/Zed/Router/_support/Helper).

<a name="enabling"></a>

## Enabling a Helper
To make a helper available for your tests, you need to enable it in the `codeception.yml` configuration file.

Example:
`tests/OrganizationTest/Application/Module/codeception.yml`
```PHP
suites:
    SuiteName:
        path: path/to/tests
        class_name: Module{Layer}Tester
        modules:
            enabled:
                - \SprykerTest\Shared\Testify\Helper\ConfigHelper
```
This will enable the `\SprykerTest\Shared\Testify\Helper\ConfigHelper` in your tests.

For a real example, check out the [codeception.yml file of the Router module](https://github.com/spryker/router/blob/master/tests/SprykerTest/Zed/Router/codeception.yml).

### Test Lifecycle
Helpers give easy access to every point of the test lifecycle. A test lifecycle looks as follows:

- Before test suite
    - Before test
        - test
    - After test
    - Before test
        - test
    - After test
- After test suite

With the helpers, you can hook into every point of this lifecycle and do things that are required for your test case. For example, create an application state before the test itself has been executed, or clean up after the test has been executed, etc.

Checkout the [Codeception helper](https://codeception.com/docs/06-ModulesAndHelpers), the *Hooks* section, for information about each method of the Codeception's module class.

## Helper Methods
When you have code blocks that are re-usable in other modules as well, consider creating a helper with a method that provides the re-usable code.

Every public method in your helper will be generated into the tester class, and can be executed from within your test after you run `vendor/bin/codecept build`. 

In your test, you can use the public methods with:
```PHP
$this->tester->myPublicHelperMethod();
```

## Creating Your own Helper
It is very easy to create your own re-usable helper - you just need to create one in your test suite. For example:
```PHP
namespace OrganizationTest\Module\Application\Helper;

use Codeception\Module;
use Codeception\TestInterface;

class MyHelper extends Module
{
    /**
      * @param \Codeception\TestInterface $test
      *
      * @return void
      */
    public function _before(TestInterface $test): void
    {
        ....
    }
    
    public function doSomethind()
    {
        ....
    }
}
```

This helper adds one method you can use in your test class and executes the `_before` method before each test is executed. You now only need to [enable](#enabling) this helper in your `codeception.yml`.

There are almost endless things you can put into these helper classes. For more information, see [Codeception modules and helpers documentation](https://codeception.com/docs/06-ModulesAndHelpers).

## Using Another Helper in a Helper
To get easy access to other helpers, for most of the helpers, Spryker provides a trait that can be used in your helper to get access to it.

If your helper needs access, for example, to ConfigHelper of the Testify module, just add the trait to your helper:

```

class YourHelper extends Module
{
    use ConfigHelperTrait;
    
    public function yourHelperMethod()
    {
        $this->getConfigHelper()->...();
    }
}
```
## Next Steps
* [Set up an organization of your tests](https://documentation.spryker.com/docs/setting-up-tests).
* Learn about the [available test helpers](https://documentation.spryker.com/docs/available-test-helpers).
*  Learn about the [console commands you can use to execute your tests](https://documentation.spryker.com/docs/executing-tests).
* [Configure data builders to create transfers your tests](https://documentation.spryker.com/docs/data-builders).
* [Generate code coverage report for your tests](https://documentation.spryker.com/docs/code-coverage).
* Learn about the [testing best practices](https://documentation.spryker.com/docs/testing-best-practices).


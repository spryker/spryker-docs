---
title: Test Helpers
description: Learn about the test helpers, how you can enable them, use, and create your own.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/test-helpers
originalArticleId: 2704ed21-1ff3-4646-8d0b-67b8a1094a04
redirect_from:
  - /2021080/docs/test-helpers
  - /2021080/docs/en/test-helpers
  - /docs/test-helpers
  - /docs/en/test-helpers
  - /v6/docs/test-helpers
  - /v6/docs/en/test-helpers
  - /v5/docs/test-helper
  - /v5/docs/en/test-helper
  - /docs/scos/dev/guidelines/testing/test-helpers.html
---

[Codeception](https://codeception.com) provides so-called modules, which are *helpers* used for building your tests. These helpers allow you to hook into the lifecycle of tests and get handy methods available wherever the helper is enabled. Codeception and Spryker provide a lot of ready to use helpers. Checkout [Available Test Helpers](/docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html) for information on some of them.

Basically, almost every Spryker module provides one or more helpers. The helpers can be found in the `tests/Organization/Application/Module/_support/Helper/*` directory. For example, check out the [helper of the Router module](https://github.com/spryker/router/tree/master/tests/SprykerTest/Zed/Router/_support/Helper).

<a name="enabling"></a>

## Enabling a Helper
To make a helper available for your tests, you need to enable it in the `codeception.yml` configuration file.

Example:
`tests/OrganizationTest/Application/Module/codeception.yml`
```php
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
```php
$this->tester->myPublicHelperMethod();
```

## Creating Your own Helper
It is very easy to create your own re-usable helper - you just need to create one in your test suite. For example:
```php
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
* [Set up an organization of your tests](/docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html).
* Learn about the [available test helpers](/docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html).
*  Learn about the [console commands you can use to execute your tests](/docs/scos/dev/guidelines/testing-guidelines/executing-tests.html).
* [Configure data builders to create transfers your tests](/docs/scos/dev/guidelines/testing-guidelines/data-builders.html).
* [Generate code coverage report for your tests](/docs/scos/dev/guidelines/testing-guidelines/code-coverage.html).
* Learn about the [testing best practices](/docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html).

---
title: Test helper
originalLink: https://documentation.spryker.com/v5/docs/test-helper
redirect_from:
  - /v5/docs/test-helper
  - /v5/docs/en/test-helper
---

## Test helper
Coceception provides so callled Modules which are helper to build your tests. These helpers add the abbility to hook into the lifecylce of tests and to get handy methods available wherever the helper is enabled. Codeception and Spryker provide a lot of ready to use helpers. 

Basically, almost each Spryker module provides one or more helper. Helper can be found in the `tests/Organization/Application/Module/_support/Helper/*` directory.

Checkout the `Testify` article to get info about some helper provided by Spryker.

### Enabling a helper
To make a helper available for your tests you need to enable it in the `codeception.yml` configuration file.

Example:
tests/OrganizationTest/Application/Module/codeception.yml
```
suites:
    SuiteName:
        path: path/to/tests
        class_name: Module{Layer}Tester
        modules:
            enabled:
                - \SprykerTest\Shared\Testify\Helper\ConfigHelper
```
This will enable the `\SprykerTest\Shared\Testify\Helper\ConfigHelper` in your tests.

### Test lifecycle
Helper give an easy acces to every point of the test lifecycle. A test lifecylce looks as follows:

- Before suite
    - Before test
        - test
    - After test
    - Before test
        - test
    - After test
- After suite

With the helper you can hook into every point of this lifecycle and do things that are reuired for your test case. E.g. create an application state before the test itself is executed or cleanup after the test was executed etc.

Checkout the [Codeception helper](https://codeception.com/docs/06-ModulesAndHelpers) section about `hooks` to get information about each method of Codeception's Module class.

## Helper methods
When you have code blocks that are re-usable in other Modules as well, consider creating a helper with a method that provides the re-usable code.

Every public method in your helper will be generated into the tester class and can be executed from within your test after you run `vendor/bin/codecept build`. 

In your test you can use the public methods with:
```
$this->tester->myPublicHelperMethod();
```

## Create your own helper
It is very easy to create your own re-usable helper, you just need to create one in your test suite.
```
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

This helper adds one method you can use in your test class and executes the `_before` method before each test is executed. You now only need to enable this in your `codeception.yml`.

There are almost endless things you can put into these helper classes. Read more about [Codeception helper](https://codeception.com/docs/06-ModulesAndHelpers).

### Use another helper in a helper
To get easy access to other helper, Spryker provides for most of the helper a trait that can be used in your helper to get access to it.

If your helper needs access e.g. to the ConfigHelper of the Testify module you just need to add the trait to your helper:

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



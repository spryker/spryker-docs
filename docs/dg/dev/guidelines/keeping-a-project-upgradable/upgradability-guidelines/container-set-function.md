---
title: Container set function
description: Learn about the container set function and how it checks the way plugins are registered in the dependency provider within your Spryker project.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/container-set-function.html
---

The *Container set function* check checks how plugins are registered in the dependency provider on the project level.

## Problem description

In the dependency provider, you can add plugins to `\Spryker\Client\Kernel\Container` by using the `set` method. To keep the plugins simple, do not return arrays of plugins inside the callback function. When you need to register a list of plugins, create a dedicated method, return an array of plugins, and call this method inside the callable function.

## Example of an evaluator error message

```bash
==============================
CONTAINER SET FUNCTION CHECKER
==============================

Message: The callback function inside `container->set()` should not return an array directly but instead call another method. Please review your code and make the necessary changes.
Target:  {PATH_TO_PROJECT}/Pyz/Zed/Checkout/CheckoutDependencyProvider.php:{LINE_NUMBER}
```

## Example of code that causes an evaluator error

The method `addProductSalePageWidgetPlugins` in `ExampleDependencyProvider` contains a callable function that returns an array of plugins.

```php
namespace Pyz\Zed\ContainerSetFunctionChecker;

use Spryker\Zed\WebProfiler\Communication\Plugin\Form\WebProfilerFormPlugin;

class ExampleDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addProductSalePageWidgetPlugins($container): Container
    {
        $container->set(static::PYZ_PLUGIN_PRODUCT_SALE_PAGE_WIDGETS, function () {
            return [
                new WebProfilerFormPlugin(),
            ];
        });

        return $container;
    }

}
```

## Resolve the error

1. Create a dedicated method for registering plugins.
2. Call the method in the callback function.


```php
namespace Pyz\Zed\ContainerSetFunctionChecker;

use Spryker\Zed\WebProfiler\Communication\Plugin\Form\WebProfilerFormPlugin;

class ExampleDependencyProvider
{
       /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addProductSalePageWidgetPlugins($container): Container
    {
        $container->set(static::PYZ_PLUGIN_PRODUCT_SALE_PAGE_WIDGETS, function () {
            return $this->getProductSalePageWidgetPlugins();
        });

        return $container;
    }

    /**
     * @return array<string>
     */
    protected function getProductSalePageWidgetPlugins(): array
    {
        return [
            new WebProfilerFormPlugin()
        ];
    }

}
```


## Run only this checker

To run only this checker, include `CONTAINER_SET_FUNCTION_CHECKER` into the checkers list. Example:

```bash
vendor/bin/evaluator evaluate --checkers=CONTAINER_SET_FUNCTION_CHECKER
```

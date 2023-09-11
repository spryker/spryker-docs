---
title: Container set function
description: Reference information for evaluator tools.
template: howto-guide-template
---

The *Container set function* check checks the way plugins are registered in the dependency provider on the project level.

## Problem description

Inside of the dependency provider, you can add the plugin to `\Spryker\Client\Kernel\Container`, by using the `set` method.
To keep the plugins simple, please do not return an array of plugins inside the callback function.
When you need to register a list of plugins, please create a dedicated method for this purpose, return an array of plugins, and call this method inside the callable function.

## Example of an evaluator error message

```bash
==============================
CONTAINER SET FUNCTION CHECKER
==============================

Message: The callback function inside `container->set()` should not return an array directly but instead call another method. Please review your code and make the necessary changes.
Target:  {PATH_TO_PROJECT}/Pyz/Zed/Checkout/CheckoutDependencyProvider.php:{LINE_NUMBER}
```

## Example of code that causes an evaluator error

The method `addProductSalePageWidgetPlugins` in `ExampleDependencyProvider` contains the callable function that returns an array of plugins, it is not supported for now.

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

### Resolving the error

To resolve the issue:

1. Create dedicated method for registering plugins.
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

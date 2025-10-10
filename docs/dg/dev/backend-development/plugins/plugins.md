---
title: Plugins
description: Plugins are small classes that are used to connect modules. In contrast to a direct call to a facade of another module, there can be an array of provided modules.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/plugin
originalArticleId: b9d7fedb-07ef-4e7c-9a0a-5afea02701e4
redirect_from:
  - /docs/scos/dev/back-end-development/plugins/plugins.html
  - /docs/scos/dev/back-end-development/implementing-and-using-plugins.html
  - /docs/scos/dev/back-end-development/plugins/implementing-and-using-plugins.html
related:
  - title: Get an overview of the used plugins
    link: docs/dg/dev/backend-development/plugins/get-an-overview-of-the-used-plugins.html
---

*Plugins* are small classes that are used to connect modules in a flexible and configurable way. In contrast to a direct call to a facade of another module, there can be an array of provided modules.

According to our conventions, plugins are the only classes that can be directly instantiated in other modules. For example, the `Calculation` module uses an array of modules to perform the calculation. A lot of core modules let you hook into the logic using plugins. This way, you can change core behavior without extending core classes and the risk of losing backward compatibility.

## Example: Calculator plugins

The `Calculation` module ships with a `CalculatorPluginInterface`, which is implemented in several other modules. For example, you can find the `ItemTaxCalculatorPlugin` inside the Tax module.

According to the interface, this plugin retrieves a quote transfer object, performs tax-related calculations, and adds them to the quote.

```php
<?php
namespace Spryker\Zed\Tax\Communication\Plugin;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Calculation\Dependency\Plugin\CalculatorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\Tax\Business\TaxFacade getFacade()
 * @method \Spryker\Zed\Tax\Communication\TaxCommunicationFactory getFactory()
 */
class ItemTaxCalculatorPlugin extends AbstractPlugin implements CalculatorPluginInterface
{

    /**
     * This plugin makes calculations based on the given quote. The result is added to the quote.
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function recalculate(QuoteTransfer $quoteTransfer)
    {
        $this->getFacade()->recalculateTaxItemAmount($quoteTransfer);
    }

}
```

## How to implement a plugin

A plugin always implements an interface that is stored in the consuming module. You can find them in the `[PROJECT]\[APPLICATION]\[module]\Dependency\Plugin` namespace—for example, `Spryker\Zed\Calculation\Dependency\Plugin`.

Your new plugin needs to be placed in a specific directory inside your module:

| APPLICATION | PLUGIN DIRECTORY | EXAMPLE |
| --- | --- | --- |
| Client | `[PROJECT]\Client\[module]\Plugin\` | `Pyz\Client\Catalog\Plugin\Config\CatalogSearchConfigBuilder` |
| Yves | `[PROJECT]\Yves\[module]\Plugin\` | `Pyz\Yves\Cart\Plugin\Provider\CartControllerProvider` |
| Zed | `[PROJECT]\Zed\[module]\Communication\Plugin\` | `Spryker\Zed\Tax\Communication\Plugin\ItemTaxCalculatorPlugin` |

Plugins delegate calls to the underlying code of the same module. Plugins usually need to extend `AbstractPlugin`. This way, they can access the internal classes of their module. We recommend using the `@method` doc block notation to enable autocompletion in the IDE.

### Plugins in Zed

You can copy and paste the following template. All you need to do is to replace the placeholders and implement the related interface. The `AbstractPlugin` plugin lets you access the facade of the module where the plugin is placed using the `getFacade()` method.

The most common use case for plugins in Zed is to delegate all calls directly to a method in the facade. You can also access the factory of the communication layer using `getFactory()`.

```php
<?php
namepace Pyz\Zed\[BUNDLE]\Communication\Plugin;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\[module]\Business\[module]Facade getFacade()
 */
class [PLUGIN]Plugin extends AbstractPlugin implements AnotherBundlePluginInterface
{
    // ...
}
```

### Plugins in Yves

You can copy and paste the following template. All you need to do is to replace the placeholders and implement the related interface. The `AbstractPlugin` plugin lets you access the factory using the `getFactory()` method.

```php
<?php
namespace Pyz\Yves\[BUNDLE]\Plugin;

use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Yves\[BUNDLE]\[BUNDLE]Factory getFactory()
 */
class [PLUGIN]Plugin extends AbstractPlugin implements AnotherBundlePluginInterface
{
    // ...
}
```

In Yves, you can find some special plugins. The application uses special classes like `ApplicationPluginInterface`, `RouteProviderPluginInterface`, routers, and twig functions. They are configured in the main `YvesBootstrap` class. These plugins and routers can be provided by several modules. That's why they are placed into the plugin directory to fit them into your conventions. However, they do not necessarily extend `AbstractPlugin`.

### Plugins in Client

You can copy and paste the following template. All you need to do is to replace the placeholders and implement the related interface. The `AbstractPlugin` plugin lets you access the factory using `getFactory()`.

```php
<?php
namespace Pyz\Client\[BUNDLE]\Plugin;

use Spryker\Client\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Client\[BUNDLE]\[BUNDLE]Factory getFactory()
 */
class [PLUGIN]Plugin extends AbstractPlugin implements AnotherBundlePluginInterface
{
    // ...
}
```

## How to Use a plugin from another module

To make your module flexible, you can add plugins to your module's dependency provider. To do so, you need to define an interface that contains a clear description of the expected implementation in the doc block.

The following is an example of the plugin interface from the `Calculation` module:

```php
<?php
namespace Pyz\Zed\Calculation\Dependency\Plugin;

use Generated\Shared\Transfer\QuoteTransfer;

interface CalculatorPluginInterface
{

    /**
     * This plugin makes calculations based on the given quote. The result is added to the quote.
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function recalculate(QuoteTransfer $quoteTransfer);

}
```

Then, you can provide the plugin or an array of plugins in the dependency provider, as in the following example.

An example of the dependency provider from the `Calculation` module:

```php
<?php
class CalculationDependencyProvider extends AbstractBundleDependencyProvider
{

    const CALCULATOR_STACK = 'calculator stack';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container[static::CALCULATOR_STACK] = function (Container $container) {
            return $this->getCalculatorStack($container);
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Calculation\Dependency\Plugin\CalculatorPluginInterface[]
     */
    protected function getCalculatorStack(Container $container)
    {
        return [
            //Remove calculated values, start with clean state.
            new RemoveTotalsCalculatorPlugin(),

            //Item calculators
            new ProductOptionGrossSumCalculatorPlugin(),
            new ItemGrossAmountsCalculatorPlugin(),

            //SubTotal
            new SubtotalTotalsCalculatorPlugin(),

            //Expenses—for example, shipping
            new ExpensesGrossSumAmountCalculatorPlugin(),
            new ExpenseTotalsCalculatorPlugin(),

            //GrandTotal
            new GrandTotalTotalsCalculatorPlugin(),
        ];
    }

}
```

---
title: Implementing and Using Plugins
originalLink: https://documentation.spryker.com/v3/docs/plugin
redirect_from:
  - /v3/docs/plugin
  - /v3/docs/en/plugin
---

Plugins are small classes that are used to connect bundles in a flexible and configurable way. In contrast to a direct call to a facade of another module, there can be an array of provided modules.

According to our conventions, plugins are the only classes that can be directly instantiated in other modules. For instance the `Calculation` module uses an array of modules to perform the calculation. A lot of core modules allow to hook into the logic via plugins. This way you can change core behavior without extending core classes and the risk to loose backwards compatibility.

## Example: Calculator Plugins
The Calculation module ships with a `CalculatorPluginInterface` which is implemented in several bundles. For instance you can find the `ItemTaxCalculatorPlugin` inside the Tax module.

According to the interface, this plugin retrieves a quote transfer object, performs tax related calculations and adds them to the quote.

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

## How to Implement a Plugin
A plugin always implements an interface which is stored in the consuming module. You can find them in the `[PROJECT]\[APPLICATION]\[module]\Dependency\Plugin` namespace (e.g. `Spryker\Zed\Calculation\Dependency\Plugin`). module

Your new plugin needs to be placed in a specific directory inside your module:

| Application | Plugin directory | Example |
| --- | --- | --- |
| Client | [PROJECT]\Client\[module]\Plugin\ | Pyz\Client\Catalog\Plugin\Config\CatalogSearchConfigBuilder |
| Yves | [PROJECT]\Yves\[module]\Plugin\ | Pyz\Yves\Cart\Plugin\Provider\CartControllerProvider |
| Zed | [PROJECT]\Zed\[module]\Communication\Plugin\ | Spryker\Zed\Tax\Communication\Plugin\ItemTaxCalculatorPlugin |

Plugins delegate calls to the underlying code of the same module. Plugins usually need to extend an `AbstractPlugin`. This way they can access the internal classes of their module. We recommend to use the `@method` doc block notation to enable auto completion in the IDE.

### Plugins in Zed
You can copy and paste the template below. All you need to do is to replace the placeholders and to implement the related interface. The `AbstractPlugin` allows you to access the facade of the module where the plugin is placed via the `getFacade()` method.

The most common use case for plugins in Zed is to delegate all calls directly to a method in the facade. You can also access the factory of the communication layer via `getFactory()`.

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
You can copy and paste the template below. All you need to do is to replace the placeholders and to implement the related interface. The `AbstractPlugin` allows you to access the factory via the `getFactory()` method.

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

In Yves you can find some special plugins. The underlying framework Silex uses special classes like service-providers, controller-providers, routers and twig functions. They are configured in the main `YvesBootstrap` class. These providers and routers can be provided by several modules, that’s why we place them into the plugin-directory to fit them into our conventions. But they do not necessarily extend the `AbstractBundle`.

### Plugins in Client
You can copy and paste the template below. All you need to do is to replace the placeholders and to implement the related interface. The `AbstractPlugin` allows you to access the factory via the `getFactory()` method.

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

## How to Use a Plugin from Another Module
In case you want to make your module flexible, you can add plugins to your module’s dependency provider. To do so you need to define an interface which contains a clear description of the expected implementation in the doc block.

**Example**: plugin interface from the Calculation module:

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

Now you can provide the plugin or an array of plugins in the dependency provider, as in the example below. Example of dependency provider from the `Calculation` module:

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

            //Expenses (e.g. shipping)
            new ExpensesGrossSumAmountCalculatorPlugin(),
            new ExpenseTotalsCalculatorPlugin(),

            //GrandTotal
            new GrandTotalTotalsCalculatorPlugin(),
        ];
    }

}
```

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

Plugins is the approach that we use for Inversion of Control ([IoC](https://martinfowler.com/bliki/InversionOfControl.html)) in Spryker. They allow us to give control from the module that executes the logic to the module that provides the plugins. This way, we can change the behavior of a module without changing its code. E.g. we can provide a stack of plugins that extends the calculation of a quote in the `Calculation` module. And in this way we allows to add any required calculations from any other module that might need it.

## How to implement a plugin

A plugin always implements an interface that is stored in the extension module. Extension module has only interfaces and no logic inside. Its one and only purpose is to provide modules with "contracts". For the core you can find them in the `[PROJECT]\[APPLICATION]\[module]\Dependency\Plugin` namespace—for example, `Spryker\Zed\CalculationExtension\Dependency\Plugin`. But for the project level, moving interfaces somewhere else is possible, but not required.

Your new plugin should be placed in a specific directory inside your module:

| APPLICATION | PLUGIN DIRECTORY                                         | EXAMPLE                                                                    |
| --- |----------------------------------------------------------|----------------------------------------------------------------------------|
| Client | `[PROJECT]\Client\[module]\Plugin\[destination_module]\` | `\Pyz\Client\Catalog\Plugin\Config\CatalogSearchConfigBuilder`             |
| Yves | `[PROJECT]\Yves\[module]\Plugin\[destination_module]\`                        | `\SprykerShop\Yves\AgentPage\Plugin\MultiFactorAuth\PostAgentLoginMultiFactorAuthenticationPlugin`       |
| Zed | `[PROJECT]\Zed\[module]\Communication\Plugin\[destination_module]\`           | `\Spryker\Zed\Tax\Communication\Plugin\Calculator\ItemTaxCalculatorPlugin` |

Plugins delegate calls to the underlying code of the same module. Plugins usually need to extend `AbstractPlugin`. This way, they can access the internal classes of their module. We recommend using the `@method` doc block notation to enable autocompletion in the IDE.

### Plugins in Zed

You can copy and paste the following template. All you need to do is to replace the placeholders and implement the related interface. The `AbstractPlugin` plugin lets you access the facade of the module where the plugin is placed using the `getFacade()` method.

The most common use case for plugins in Zed is to delegate all calls directly to a method in the facade. You can also access the factory of the communication layer using `getFactory()`.

```php
<?php
namepace Pyz\Zed\[MODULE]\Communication\Plugin\[DESTINATION_MODULE];

use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\[MODULE]\Business\[MODULE]Facade getFacade()
 * @method \Spryker\Zed\[MODULE]\Business\[MODULE]BusinessFactory getBusinessFactory()
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
namespace Pyz\Yves\[MODULE]\Plugin\[DESTINATION_MODULE];

use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Yves\[MODULE]\[MODULE]Factory getFactory()
 */
class [PLUGIN]Plugin extends AbstractPlugin implements AnotherBundlePluginInterface
{
    // ...
}
```

### Plugins in Client

You can copy and paste the following template. All you need to do is to replace the placeholders and implement the related interface. The `AbstractPlugin` plugin lets you access the factory using `getFactory()`.

```php
<?php
namespace Pyz\Client\[MODULE]\Plugin\[DESTINATON_MODULE];

use Spryker\Client\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Client\[MODULE]\[MODULE]Factory getFactory()
 */
class [PLUGIN]Plugin extends AbstractPlugin implements AnotherBundlePluginInterface
{
    // ...
}
```

## Example: Calculator plugins

The `CalculationExtension` module ships with a `\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface`, which is implemented in several other modules. For example, you can find the `ItemTaxCalculatorPlugin` inside the `Tax` module.
Pay attention that plugin interface is located in the `CalculationExtension` module and not in `Calculation` module. This is because the `Calculation` module depends on several other modules, and to avoid circular dependencies, we put the plugin interface into a separate module called `CalculationExtension`. The same applies to other extension modules, like `CmsExtension`, `ProductExtension`, etc.

According to the interface, this plugin retrieves a quote transfer object, performs tax-related calculations, and adds them to the quote.

First we need to define an interface.

```php
<?php
namespace Spryker\Zed\CalculationExtension\Dependency\Plugin;

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
    public function recalculate(QuoteTransfer $quoteTransfer): void;

}
```

This interface should be used in the business logic of the `Calculation` module.

Plugin or plugin stack should be provided in the dependency provider of the `Calculation` module.


```php
<?php
class CalculationDependencyProvider extends AbstractBundleDependencyProvider
{

    public const PLUGINS_CALCULATOR = 'PLUGINS_CALCULATOR';

    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = $this->addCalculatorPlugins($container);
        
        return $container
    }
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addCalculatorPlugins(Container $container): Container
    {
        $container = $container->set(static::PLUGINS_CALCULATOR, function (Container $container) {
            return $this->getCalculatorStack($container);
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Calculation\Dependency\Plugin\CalculatorPluginInterface>
     */
    protected function getCalculatorStack(Container $container): array
    {
        return [
         //This array usually contains no plugins on the core level as plugins are optional. Plugins must be wired on the project level.
            new \Spryker\Zed\Tax\Communication\Plugin\ItemTaxCalculatorPlugin(),
        ];
    }

}
```

Plugin itself is implemented in the `Tax` module. It extends `AbstractPlugin` to get access to helper methods like `getFacade()` of `getBusinessFactory()`.

```php
<?php
namespace Spryker\Zed\Tax\Communication\Plugin;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\Tax\Business\TaxFacade getFacade()
 * @method \Spryker\Zed\Tax\Communication\TaxCommunicationFactory getFactory()
 * @method \Spryker\Zed\Tax\Communication\TaxCommunicationFactory getBusinessFactory()
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
    public function recalculate(QuoteTransfer $quoteTransfer): void
    {
        //This is an optional approach. From the [spryker/kernel:3.76.0)](https://github.com/spryker/kernel/releases/tag/3.76.0) you can use something like `$this->getBusinessFactory()->createItemTaxCalculator()->recalculate($quoteTransfer)` instead of going through the facade.
        $this->getFacade()->recalculateTaxItemAmount($quoteTransfer);
    }

}
```

## Recommendations
- Make sure that your plugin is stateless. Do not store any state in the plugin instance.
- Do not use constructor arguments. Always use the `getFactory()` or `getFacade()` methods to access other parts of your module.
- Design your plugin interfaces carefully. Once a plugin interface is released, it should not be changed in a backward-incompatible way.
- Design your plugin interfaces with a bulk operation in mind. Instead of processing one item at a time, process a collection of items. This will improve performance by reducing the number of calls and allowing for optimizations like batch processing.

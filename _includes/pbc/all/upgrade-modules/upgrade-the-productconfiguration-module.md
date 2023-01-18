

## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

Version 1.0.0 of the `ProductConfiguration` module introduces the following backward incompatible changes:

* Adjusted `ProductConfigurationFacade::getProductConfigurationCollection()` so it is now getting product configurations by `ProductConfigurationCriteria` instead of `ProductConfigurationFilterTransfer`.
* Introduced the `spy_product_configuration.uuid` field to allow unique identifier.
* Introduced the `spy_product_configuration-unique-uuid` unique index.

To upgrade the `ProductConfiguration` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `ProductConfiguration` module to version 1.0.0:

```bash
composer require "spryker/product-configuration":"^1.0.0" --update-with-dependencies
```

1. Update the database schema and generated classes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

## Upgrading from version 0.1.* to version 0.2.*

*Estimated migration time: 30 minutes*

To upgrade the `ProductConfiguration` module from version 0.1.* to version 0.2.*, do the following:

1. Update the `ProductConfiguration` module to version 0.2.0:

```bash
composer require spryker/product-configuration:"^0.2.0" --update-with-dependencies
```

2. Generate transfer classes:

```bash
console transfer:generate
```

3. From `\Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider`, remove the plugin stacks:
   - `\Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider::getDefaultProductConfiguratorRequestPlugin()`
   - `\Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider::getDefaultProductConfiguratorResponsePlugin()`

4. In `\Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider`, on the project level, register the plugin that describes the strategy of extracting volume prices for configurable products:

```php
<?php

namespace Pyz\Client\ProductConfiguration;

use Spryker\Client\ProductConfiguration\Plugin\PriceProductVolumeProductConfigurationPriceExtractorPlugin;
use Spryker\Client\ProductConfiguration\ProductConfigurationDependencyProvider as SprykerProductConfigurationDependencyProvider;

/**
 * @method \Spryker\Client\ProductConfiguration\ProductConfigurationConfig getConfig()
 */
class ProductConfigurationDependencyProvider extends SprykerProductConfigurationDependencyProvider
{
    /**
     * @return \Spryker\Client\ProductConfigurationExtension\Dependency\Plugin\ProductConfigurationPriceExtractorPluginInterface[]
     */
    protected function getProductConfigurationPriceExtractorPlugins(): array
    {
        return [
            new PriceProductVolumeProductConfigurationPriceExtractorPlugin(),
        ];
    }
}
```

5. In `\Pyz\Service\PriceProduct\PriceProductDependencyProvider`, on the project level, register the filter plugins:

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationPriceProductFilterPlugin;
use Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationVolumePriceProductFilterPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
            new ProductConfigurationPriceProductFilterPlugin(),
            new ProductConfigurationVolumePriceProductFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

6. From `\Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider`, remove the plugin `ProductConfigurationQuoteRequestQuoteCheckPlugin` (must be replaced with `Spryker\Client\ProductConfigurationCart\Plugin\QuoteRequest\ProductConfigurationQuoteRequestQuoteCheckPlugin`).

7. From `\Pyz\Zed\Availability\AvailabilityDependencyProvider`, remove the plugin `ProductConfigurationCartItemQuantityCounterStrategyPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Availability\ProductConfigurationCartItemQuantityCounterStrategyPlugin`).

8. From `\Pyz\Zed\AvailabilityCartConnector\AvailabilityCartConnectorDependencyProvider`, remove the plugin `ProductConfigurationCartItemQuantityCounterStrategyPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\AvailabilityCartConnector\ProductConfigurationCartItemQuantityCounterStrategyPlugin`).

9. From `\Pyz\Zed\Cart\CartDependencyProvider`, remove the plugin: `ProductConfigurationGroupKeyItemExpanderPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Cart\ProductConfigurationGroupKeyItemExpanderPlugin`).

10. From `\Pyz\Zed\Checkout\CheckoutDependencyProvider`, remove the plugin: `ProductConfigurationCheckoutPreConditionPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Checkout\ProductConfigurationCheckoutPreConditionPlugin`).

11. From `\Pyz\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider`, remove the plugins:

    - `ProductConfigurationCartItemQuantityCounterStrategyPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector\ProductConfigurationCartItemQuantityCounterStrategyPlugin`)
    - `ProductConfigurationPriceProductExpanderPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector\ProductConfigurationPriceProductExpanderPlugin`)

12. From `\Pyz\Zed\QuoteRequest\QuoteRequestDependencyProvider`, remove the plugins:

    - `ProductConfigurationQuoteRequestUserValidatorPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest\ProductConfigurationQuoteRequestUserValidatorPlugin`)
    - `ProductConfigurationQuoteRequestValidatorPlugin` (must be replaced with `Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest\ProductConfigurationQuoteRequestValidatorPlugin`)

13. From `\Pyz\Zed\ProductConfiguration\ProductConfigurationConfig`, remove the method `getItemFieldsForIsSameItemComparison()` (must be replaced with `\Pyz\Zed\ProductConfigurationCart\ProductConfigurationCartConfig::getItemFieldsForIsSameItemComparison()`).

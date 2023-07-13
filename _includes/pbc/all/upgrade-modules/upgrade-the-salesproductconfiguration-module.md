## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

`SalesProductConfiguration` v1.0.0 introduces the following backward incompatible changes:

* Removed `ProductConfigurationOrderSaverPlugin`.
* Removed `ProductConfigurationOrderPostSavePlugin`.
* Removed dependency on the `CheckoutExtension` module.

To upgrade the `SalesProductConfiguration` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `SalesProductConfiguration` module to version 1.0.0:

```bash
composer require "spryker/sales-product-configuration":"^1.0.0" --update-with-dependencies
```

2. In `\Pyz\Zed\Checkout\CheckoutDependencyProvider::getCheckoutOrderSavers()`, remove `\Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Checkout\ProductConfigurationOrderSaverPlugin`.

3. In `\Pyz\Zed\Sales\SalesDependencyProvider::getOrderPostSavePlugins()`, remove `\Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderPostSavePlugin`.

4. Add `\Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderItemsPostSavePlugin` to `\Pyz\Zed\Sales\SalesDependencyProvider` on the project level:

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderItemsPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ProductConfigurationOrderItemsPostSavePlugin(),
        ];
    }
}
```
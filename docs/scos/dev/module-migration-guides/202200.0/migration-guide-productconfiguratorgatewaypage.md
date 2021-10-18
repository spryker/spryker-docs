---
title: Migration guide - ProductConfiguratorGatewayPage
description: Learn how to upgrade the ProductConfiguratorGatewayPage module to a newer version.
template: module-migration-guide-template
---

## Upgrading from version 0.3.* to version 0.4.* 

*Estimated migration time: 10 minutes*

To upgrade the ProductConfiguratorGatewayPage module from version 0.3.* to version 0.4.*, do the following:

1. Update the ProductConfiguratorGatewayPage module to version 0.4.0:

```bash
composer require spryker-shop/product-configurator-gateaway-page:"^0.4.0" --update-with-dependencies
```

2. Re-generate transfer classes:

```bash
console transfer:generate
```

3. From `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider`, remove the plugin stack: `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider::getProductConfiguratorGatewayBackUrlResolverStrategyPlugins()`.
4. In `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider`, on project level, register the new strategy plugins:

<details open>
<summary markdown='span'>\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider</summary>

```php
<?php

namespace Pyz\Yves\ProductConfiguratorGatewayPage;

use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorRequestStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorResponseStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider as SprykerProductConfiguratorGatewayPageDependencyProvider;

class ProductConfiguratorGatewayPageDependencyProvider extends SprykerProductConfiguratorGatewayPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorRequestStrategyPluginInterface[]
     */
    protected function getProductConfiguratorRequestPlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorRequestStrategyPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorResponseStrategyPluginInterface[]
     */
    protected function getProductConfiguratorResponsePlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorResponseStrategyPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorRequestDataFormExpanderStrategyPluginInterface[]
     */
    protected function getProductConfiguratorRequestDataFormExpanderStrategyPlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin(),
        ];
    }
}
```
</details>
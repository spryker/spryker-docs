---
title: Upgrade the ProductConfiguratorGatewayPage module
description: Learn how to upgrade the ProductConfiguratorGatewayPage module to a newer version.
template: module-migration-guide-template
last_updated: Aug 6, 2026
redirect_from:
  - /docs/scos/dev/module-migration-guides/202200.0/migration-guide-productconfiguratorgatewaypage.html
  - /docs/scos/dev/module-migration-guides/migration-guide-productconfiguratorgatewaypage.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productconfiguratorgatewaypage-module.html
---

## Upgrading from version 0.5.* to version 1.0.*

*Estimated migration time: 5 minutes*

`ProductConfiguratorGatewayPage` v1.0.0 introduces the following backward incompatible changes:

- Replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstanceBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.
- Replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstancesIndexedBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.

To upgrade the `ProductConfiguratorGatewayPage` module from version 0.5.* to version 1.0.*, do the following:

1. Update the `ProductConfiguratorGatewayPage` module to version 1.0.0:

```bash
composer require "spryker-shop/product-configurator-gateaway-page":"^1.0.0" update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```

## Upgrading from version 0.3.* to version 0.4.*

*Estimated migration time: 10 minutes*

To upgrade the `ProductConfiguratorGatewayPage` module from version 0.3.* to version 0.4.*, do the following:

1. Update the `ProductConfiguratorGatewayPage` module to version 0.4.0:

```bash
composer require spryker-shop/product-configurator-gateaway-page:"^0.4.0" --update-with-dependencies
```

2. Regenerate transfer classes:

```bash
console transfer:generate
```

3. From `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider`, remove the plugin stack: `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider::getProductConfiguratorGatewayBackUrlResolverStrategyPlugins()`.

4. In `\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider`, on the project level, register the new strategy plugins:

<details>
<summary>\Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider</summary>

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

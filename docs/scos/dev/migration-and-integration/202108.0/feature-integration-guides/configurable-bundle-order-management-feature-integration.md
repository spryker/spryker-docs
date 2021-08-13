---
title: Configurable bundle + order management feature integration
description: This integration guide provides step-by-step instructions on installing Configurable Bundle + Order Management feature.
originalLink: https://documentation.spryker.com/2021080/docs/configurable-bundle-order-management-feature-integration
originalArticleId: aedcdbc2-c678-4fa2-ba0d-8ddfc6264415
redirect_from:
  - /2021080/docs/configurable-bundle-order-management-feature-integration
  - /2021080/docs/en/configurable-bundle-order-management-feature-integration
  - /docs/configurable-bundle-order-management-feature-integration
  - /docs/en/configurable-bundle-order-management-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:

| Feature | Version |
| --- | --- |
| Configurable Bundle | 202009.0 |
| Order Management | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Behaviour

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfiguredBundleOrderItemExpanderPlugin` | Expands order items with sales order configured bundles. | None | `Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales` |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales\ConfiguredBundleOrderItemExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ConfiguredBundleOrderItemExpanderPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::getOrderItems()` results, contains sales order configured bundles data if the order contains configurable bundle.

{% endinfo_block %}



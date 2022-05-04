---
title: Configurable Bundle + Order Management feature integration
description: This integration guide provides step-by-step instructions on installing Configurable Bundle + Order Management feature.
last_updated: Sep 8, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/configurable-bundle-order-management-feature-integration
originalArticleId: 6304e2e6-2d60-47f8-9915-1d450fbe9ce0
redirect_from:
  - /v6/docs/configurable-bundle-order-management-feature-integration
  - /v6/docs/en/configurable-bundle-order-management-feature-integration
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



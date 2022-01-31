---
title: Product Bundles + Order Management feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Cart feature into your project.
last_updated: Sep 8, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/product-bundles-order-management-feature-integration
originalArticleId: da765d17-1def-4a03-8db7-53fede7a0bfc
redirect_from:
  - /v6/docs/product-bundles-order-management-feature-integration
  - /v6/docs/en/product-bundles-order-management-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product Bundles | 202009.0 |
| Order Management | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Behavior


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductBundleOrderItemExpanderPlugin` | Expands order items with product bundles. | None | `Spryker\Zed\ProductBundle\Communication\Plugin\Sales` |
| `ProductBundleOptionItemExpanderPlugin` | Expands order items with product options. Copies unique product options from related bundle items to bundle. | None | `Spryker\Zed\ProductBundle\Communication\Plugin\Sales` |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\ProductBundle\Communication\Plugin\Sales\ProductBundleOptionItemExpanderPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Sales\ProductBundleOrderItemExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ProductBundleOrderItemExpanderPlugin(),
            new ProductBundleOptionItemExpanderPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::getOrderItems()` results contains product concrete/abstract IDs data.

{% endinfo_block %}

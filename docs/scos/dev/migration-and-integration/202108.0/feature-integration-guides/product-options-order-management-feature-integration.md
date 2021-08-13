---
title: Product options + order management feature integration
description: This guide provides step-by-step instructions on integrating Product Options + Order Management feature into your project.
originalLink: https://documentation.spryker.com/2021080/docs/product-options-order-management-feature-integration
originalArticleId: 00796af8-4e38-4f21-bbab-29cc918413fb
redirect_from:
  - /2021080/docs/product-options-order-management-feature-integration
  - /2021080/docs/en/product-options-order-management-feature-integration
  - /docs/product-options-order-management-feature-integration
  - /docs/en/product-options-order-management-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product Options | 202009.0 |
| Order Management | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Behavior
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductOptionsOrderItemExpanderPlugin` | Expands order items with product options. | None | `Spryker\Zed\ProductOption\Communication\Plugin\Sales` |

** src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionsOrderItemExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ProductOptionsOrderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that results from `SalesFacade::getOrderItems()` method call contain product options data per each item which has product options.

{% endinfo_block %}

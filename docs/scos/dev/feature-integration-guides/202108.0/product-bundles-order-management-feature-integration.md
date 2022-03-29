---
title: Product Bundles + Order Management feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Cart feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-order-management-feature-integration
originalArticleId: 23a61e2c-92d9-45a5-89e3-2c05ea71e5ea
redirect_from:
  - /2021080/docs/product-bundles-order-management-feature-integration
  - /2021080/docs/en/product-bundles-order-management-feature-integration
  - /docs/product-bundles-order-management-feature-integration
  - /docs/en/product-bundles-order-management-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Product Bundles | {{page.version}} |
| Order Management | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Set up behavior


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductBundleOrderItemExpanderPlugin | Expands order items with product bundles. | None | Spryker\Zed\ProductBundle\Communication\Plugin\Sales |
| ProductBundleOptionItemExpanderPlugin | Expands order items with product options. Copies unique product options from related bundle items to bundle. | None | Spryker\Zed\ProductBundle\Communication\Plugin\Sales |

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

---
title: Install the Product Bundles + Order Management feature
description: This guide provides step-by-step instructions on integrating Product Bundles + order management into your Spryker  project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-order-management-feature-integration
originalArticleId: 23a61e2c-92d9-45a5-89e3-2c05ea71e5ea
redirect_from:
  - /2021080/docs/product-bundles-order-management-feature-integration
  - /2021080/docs/en/product-bundles-order-management-feature-integration
  - /docs/product-bundles-order-management-feature-integration
  - /docs/en/product-bundles-order-management-feature-integration
  - /docs/scos/dev/feature-integration-guides/202311.0/product-bundles-order-management-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-features/install-the-product-bundles-order-management-feature.html
---

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Bundles | {{page.release_tag}} |
| Order Management | {{page.release_tag}} |
| Spryker Core | {{page.release_tag}} |

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

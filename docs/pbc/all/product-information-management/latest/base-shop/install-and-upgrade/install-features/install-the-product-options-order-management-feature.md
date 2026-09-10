---
title: Install the Product Options + Order Management feature
description: This guide provides step-by-step instructions on integrating Product Options + Order Management feature into your project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-options-order-management-feature-integration
originalArticleId: 00796af8-4e38-4f21-bbab-29cc918413fb
redirect_from:
  - /2021080/docs/product-options-order-management-feature-integration
  - /2021080/docs/en/product-options-order-management-feature-integration
  - /docs/product-options-order-management-feature-integration
  - /docs/en/product-options-order-management-feature-integration
  - /docs/scos/dev/feature-integration-guides/201811.0/product-options-order-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201903.0/product-options-order-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201907.0/product-options-order-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202005.0/product-options-order-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202004.0/product-options-order-management-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-features/install-the-product-options-order-management-feature.html
related:
  - title: Install the Product Options Glue API
    link: docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html
---
## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Options | {{page.release_tag}} |
| Order Management | {{page.release_tag}} |
| Spryker Core | {{page.release_tag}} |

### 1) Set up behavior

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductOptionsOrderItemExpanderPlugin | Expands order items with product options. | None | Spryker\Zed\ProductOption\Communication\Plugin\Sales |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

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

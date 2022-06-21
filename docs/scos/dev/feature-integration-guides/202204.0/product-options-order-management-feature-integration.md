---
title: Product Options + Order Management feature integration
description: This guide provides step-by-step instructions on integrating Product Options + Order Management feature into your project.
last_updated: Jun 16, 2021
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
related:
  - title: Glue API - Product Options feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-product-options-feature-integration.html
  - title: Product Options feature walkthrough
    link: docs/scos/dev/feature-walkthroughs/page.version/product-options-feature-walkthrough.html
  - title: Order Management feature walkthrough
    link: docs/scos/dev/feature-walkthroughs/page.version/order-management-feature-walkthrough/order-management-feature-wakthrough.html
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Product Options | {{page.version}} |
| Order Management | {{page.version}} |
| Spryker Core | {{page.version}} |

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

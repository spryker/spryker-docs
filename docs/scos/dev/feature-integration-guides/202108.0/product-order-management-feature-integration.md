---
title: Product + Order Management feature integration
description: This guide provides step-by-step instructions on integrating Product + Order Management feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-order-management-feature-integration
originalArticleId: 56176d63-974e-44fb-89c5-f201b9994112
redirect_from:
  - /2021080/docs/product-order-management-feature-integration
  - /2021080/docs/en/product-order-management-feature-integration
  - /docs/product-order-management-feature-integration
  - /docs/en/product-order-management-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Product | {{page.version}} |
| Order Management | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/sales-product-connector:"^1.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| SalesProductConnector | vendor/spryker/sales-product-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| Order.idSalesOrder | property | Created |src/Generated/Shared/Transfer/OrderTransfer |
| Item.fkSalesOrder | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}

### 3) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ItemMetadataSearchOrderExpanderPlugin | Expands items of each order with metadata information. | None | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales |
| MetadataOrderItemExpanderPlugin | Expands order items with metadata information. | None | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales |
| ProductIdOrderItemExpanderPlugin | Expands order items with abstract and concrete product ids. | None | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales

**/src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ItemMetadataSearchOrderExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\MetadataOrderItemExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ProductIdOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface[]
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new ItemMetadataSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new MetadataOrderItemExpanderPlugin(),
            new ProductIdOrderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::searchOrders()` results contain metadata information.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::getOrderItems()` results contain product concrete/abstract IDs data.
Make sure that every order item from `SalesFacade::getOrderItems()` results contain metadata information.

{% endinfo_block %}

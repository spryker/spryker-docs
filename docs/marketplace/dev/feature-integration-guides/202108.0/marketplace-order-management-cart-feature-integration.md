---
title: Marketplace Order Management + Cart feature integration
last_updated:  Jan 05, 2021
description: This document describes the process how to integrate the Marketplace Order Management Feature + Cart integration feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Order Management + Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Order Management Feature + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| ----------- | ------- | ------------------|
| Order Threshold | {{page.version}}  | [Order Threshold feature integration](https://documentation.spryker.com/docs/order-threshold-feature-integration) |
| Cart            | {{page.version}}    | [Cart feature integration](https://documentation.spryker.com/docs/cart-feature-integration) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/cart-note-merchant-sales-order-gui:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                   |
| ----------------------------- | ------------------------------------------ |
| CartNoteMerchantSalesOrderGui | spryker/cart-note-merchant-sales-order-gui |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects.

| TRANSFER      | TYPE  | EVENT | PATH                                            |
| - | - | - | - |
| MerchantOrder.order | attribute | created   | src/Generated/Shared/Transfer/MerchantOrderTransfer |

{% endinfo_block %}

### 3) Set up behavior

Add the following configuration to the project:

```php
<?php

namespace Pyz\Zed\MerchantSalesOrderMerchantUserGui;

use Spryker\Zed\MerchantSalesOrderMerchantUserGui\MerchantSalesOrderMerchantUserGuiConfig as SprykerMerchantSalesOrderMerchantUserGuiConfig;

class MerchantSalesOrderMerchantUserGuiConfig extends SprykerMerchantSalesOrderMerchantUserGuiConfig
{
    /**
     * @return string[]
     */
    public function getMerchantSalesOrderDetailExternalBlocksUrls(): array
    {
        return [
            'cart_note' => '/cart-note-merchant-sales-order-gui/merchant-sales-order/list',
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Ensure that cart notes are shown on the order view page when looking at merchant orders in Zed GUI.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Order Management Feature + Cart feature front end.

### Prerequisites

To start feature integration, integrate the required features:

| NAME            | VERSION |
| -------------------- | ----------- |
| Order Threshold      | {{page.version}}  |
| Cart                 | {{page.version}}  |
| Merchant Portal Core | {{page.version}}  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/cart-note-merchant-portal-gui:"^0.1.2" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                |
| ------------------------- | ------------------------------------- |
| CartNoteMerchantPortalGui | spryker/cart-note-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up behavior

Add the following configuration to the project:

| PLUGIN  | SPECIFICATION | PREREQUISITES  | NAMESPACE |
| -------------------- | ------------------ | ----------- | ------------------ |
| CartNoteMerchantOrderItemTableExpanderPlugin | Adds CartNote column to Sales tables in MerchantPortal | Marketplace Sales Merchant Portal integrated | Spryker\Zed\CartNoteMerchantPortalGui\Communication\Plugin |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\CartNoteMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\CartNoteMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesMerchantPortalGuiExtension\Dependency\Plugin\MerchantOrderItemTableExpanderPluginInterface[]
     */
    protected function getMerchantOrderItemTableExpanderPlugins(): array
    {
        return [
            new CartNoteMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` plugin is set up by opening `http://zed.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any order and check that the *Cart Note* column  is present.

{% endinfo_block %}

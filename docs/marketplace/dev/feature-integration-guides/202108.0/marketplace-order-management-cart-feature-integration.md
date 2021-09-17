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
| Cart            | {{page.version}}  | [Cart feature integration](https://github.com/spryker-feature/cart) |
| Order Threshold | {{page.version}}  | [Order Threshold feature integration](https://documentation.spryker.com/docs/order-threshold-feature-integration) |
| Marketplace Order Management | {{page.version}}  | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-cart:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                   |
| ----------------------------- | ------------------------------------------ |
| CartNoteMerchantSalesOrderGui | vendor/spryker/cart-note-merchant-sales-order-gui |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------- | --------- |
| MerchantSalesOrderMerchantUserGuiConfig  | Introduces list of urls of order detail page configuration. | src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiConfig.php |

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

Ensure that cart notes are shown on the order view page when looking at merchant orders in Backoffice.

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

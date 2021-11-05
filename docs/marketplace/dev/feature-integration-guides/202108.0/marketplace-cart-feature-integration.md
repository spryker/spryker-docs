---
title: Marketplace Cart feature integration
last_updated:  Jan 05, 2021
description: This document describes the process how to integrate the Marketplace Cart integration feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| ----------- | ------- | ------------------|
| Cart            | {{page.version}}  | [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html) |
| Order Threshold | {{page.version}}  | [Order Threshold feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html) |
| Marketplace Order Management | {{page.version}}  | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-cart:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE    | EXPECTED DIRECTORY      |
| ------------------- | --------------------- |
| CartNoteMerchantSalesOrderGui | vendor/spryker/cart-note-merchant-sales-order-gui |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------- | --------- |
| MerchantSalesOrderMerchantUserGuiConfig::getMerchantSalesOrderDetailExternalBlocksUrls() | Introduces a list of urls for order details page configuration. | src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiConfig.php |

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

Ensure that the cart notes are displayed on the order view page when looking at merchant orders in the Back Office.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Cart feature front end.

### Prerequisites

To start feature integration, integrate the required features:

| NAME            | VERSION |
| -------------------- | ----------- |
| Order Threshold      | {{page.version}}  |
| Cart                 | {{page.version}}  |
| Merchant Portal Core | {{page.version}}  |
| Marketplace Order Management | {{page.version}}  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/cart-note-merchant-portal-gui:"^1.0.0" --update-with-dependencies
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

Make sure that the `CartNoteMerchantOrderItemTableExpanderPlugin` plugin is set up by opening `http://zed.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any order and check that the *Cart Note* column  is present.

{% endinfo_block %}

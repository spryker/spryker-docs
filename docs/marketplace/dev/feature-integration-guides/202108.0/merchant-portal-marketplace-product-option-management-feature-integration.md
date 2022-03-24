---
title: Merchant Portal - Marketplace Product Option Management feature integration
description: This document describes the process how to integrate the Merchant Portal—Marketplace Product Option Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal—Marketplace Product Option Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal—Marketplace Product Option Management feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product Option | {{page.version}} | [Marketplace Product Option feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-feature-integration.html) |
| Merchant Portal Marketplace Order Management | {{page.version}} | [Merchant Portal Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-order-management-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-option-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOptionMerchantPortalGui | vendor/spryker/product-option-merchant-portal-gui |

{% endinfo_block %}

### 2) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductOptionMerchantOrderItemTableExpanderPlugin | Expands `MerchantOrderItemTable` with Product options column settings and data. | None | \Spryker\Zed\ProductOptionMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\ProductOptionMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\ProductOptionMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductConcreteTableExpanderPluginInterface[]
     */
    protected function getProductConcreteTableExpanderPlugins(): array
    {
        return [
            new ProductOptionMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the order item table has product option column settings and displays the correct data in the `http://mp.mysprykershop.com/sales-merchant-portal-gui/item-list`

{% endinfo_block %}

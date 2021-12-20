---
title: Merchant Portal - Marketplace Product + Inventory Management feature integration
last_updated: Sep 13, 2021
description: This document describes the process how to integrate theMerchant Portal - Marketplace Product + Inventory Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product + Inventory Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product + Inventory Management feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Merchant Portal Marketplace Product | master | [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |
| Marketplace Inventory Management | master | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/availability-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| AvailabilityMerchantPortalGui | spryker/availability-merchant-portal-gui |

{% endinfo_block %}


### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| TotalProductAvailabilityProductConcreteTableExpanderPlugin | Expands `ProductConcreteTable` with `Available stock` column data. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\Product |

**src/Pyz/Zed/ProductMerchantPortalGui/ProductMerchantPortalGuiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\AvailabilityMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\TotalProductAvailabilityProductConcreteTableExpanderPlugin;
use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductConcreteTableExpanderPluginInterface[]
     */
    protected function getProductConcreteTableExpanderPlugins(): array
    {
        return [
            new TotalProductAvailabilityProductConcreteTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the available stock column is displayed in the ProductConcreteTable.

{% endinfo_block %}


### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

### 4) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

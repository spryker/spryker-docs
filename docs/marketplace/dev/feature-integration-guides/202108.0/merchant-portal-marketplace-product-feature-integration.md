---
title: Merchant Portal - Marketplace Product feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product | dev-master | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) |
| Marketplace Merchant Portal Core | dev-master | [Marketplace Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-merchant-portal-gui:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductMerchantPortalGui | spryker/product-merchant-portal-gui |
| ProductMerchantPortalGuiExtension | spryker/product-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductProductAbstractPostCreatePlugin | Creates a new merchant product abstract entity if `ProductAbstractTransfer.idMerchant` is set. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\Product |
| PriceProductAbstractPostCreatePlugin | Creates new product price entities by abstract product id and price type if they don't exist. | None | Spryker\Zed\PriceProduct\Communication\Plugin\Product |
| PriceProductProductAbstractExpanderPlugin | Expands product abstract transfer with prices. | None | Spryker\Zed\PriceProduct\Communication\Plugin\Product |
| ImageSetProductAbstractPostCreatePlugin | Persists all provided image sets to database for the given abstract product. | None | Spryker\Zed\ProductImage\Communication\Plugin\Product |
| ProductImageProductAbstractExpanderPlugin | Expands product abstract transfer with product images. | None | Spryker\Zed\ProductImage\Communication\Plugin\Product |
| TaxSetProductAbstractExpanderPlugin | Finds tax set in database by `ProductAbstractTransfer.idProductAbstract` and sets ProductAbstractTransfer.idTaxSet transfer property. | None | Spryker\Zed\TaxProductConnector\Communication\Plugin\Product |
| TaxSetProductAbstractPostCreatePlugin | Saves tax set id to product abstract table. | None | Spryker\Zed\TaxProductConnector\Communication\Plugin\Product |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\MerchantProduct\Communication\Plugin\Product\MerchantProductProductAbstractPostCreatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\Product\PriceProductAbstractPostCreatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\Product\PriceProductProductAbstractExpanderPlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\Product\ImageSetProductAbstractPostCreatePlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\Product\ProductImageProductAbstractExpanderPlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\Product\TaxSetProductAbstractExpanderPlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\Product\TaxSetProductAbstractPostCreatePlugin;
use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface[]
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            new ImageSetProductAbstractPostCreatePlugin(),
            new TaxSetProductAbstractPostCreatePlugin(),
            new PriceProductAbstractPostCreatePlugin(),
            new MerchantProductProductAbstractPostCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractExpanderPluginInterface[]
     */
    protected function getProductAbstractExpanderPlugins(Container $container): array
    {
        return [
            new ProductImageProductAbstractExpanderPlugin(),
            new TaxSetProductAbstractExpanderPlugin(),
            new PriceProductProductAbstractExpanderPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that you can create a new product in the merchant portal and see it after creation in the product data table.

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
|-|-|-|-|
| MerchantProductTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantProductTableCriteriaTransfer |
| ProductAbstract.idMerchant | attribute | Created | src/Generated/Shared/Transfer/ProductAbstractTransfer |
| ProductAbstractCollection | class | Created | src/Generated/Shared/Transfer/ProductAbstractCollectionTransfer |
| PriceProductTableCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableCriteriaTransfer |
| PriceProductTableViewCollection | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableViewCollectionTransfer |
| PriceProductTableView | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableViewTransfer |
| PriceProduct.stocks | property | Created | src/Generated/Shared/Transfer/PriceProductTransfer |
| ProductManagementAttributeCollection | class | Created | src/Generated/Shared/Transfer/ProductManagementAttributeCollectionTransfer |
| ProductManagementAttribute | class | Created | src/Generated/Shared/Transfer/ProductManagementAttributeTransfer |
| ProductManagementAttributeFilter | class | Created | src/Generated/Shared/Transfer/ProductManagementAttributeFilterTransfer |
| Merchant | class | Created | src/Generated/Shared/Transfer/MerchantTransfer |
| StockProduct | class | Created | src/Generated/Shared/Transfer/StockProductTransfer |
| ReservationRequest | class | Created | src/Generated/Shared/Transfer/ReservationRequestTransfer |
| ReservationResponse | class | Created | src/Generated/Shared/Transfer/ReservationResponseTransfer |

{% endinfo_block %}

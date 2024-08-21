---
title: Install the Marketplace Merchant Custom Prices feature
last_updated: Apr 29, 2022
description: This document describes the process how to integrate the Marketplace Merchant Custom Prices into the Spryker Merchant Portal.
template: feature-integration-guide-template
redirect_from:
  - /docs/marketplace/dev/feature-integration-guides/202311.0/marketplace-merchant-custom-prices-feature-integration.html
related:
  - title: Marketplace Merchant Custom Prices feature walkthrough
    link: docs/pbc/all/price-management/page.version/marketplace/marketplace-merchant-custom-prices-feature-overview.html
---

This document describes how to integrate the Marketplace Merchant Custom Prices feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Merchant Custom Prices feature core.

### Prerequisites

Install the required features:

| NAME    | VERSION    | INSTALLATION GUIDE    |
|----------------|------------------|-------------------|
| Merchant Custom Prices                         | {{page.version}} | [Install the Merchant Custom Prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-merchant-custom-prices-feature.html)                                    |
| Marketplace Merchant Portal Product Management | {{page.version}} | [Install the Merchant Portal - Marketplace Product feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-merchant-custom-prices:"{{page.version}}" --with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE     | EXPECTED DIRECTORY       |
|------------------|------------------|
| PriceProduct                                      | vendor/spryker/price-product                                           |
| PriceProductMerchantRelationship                  | vendor/spryker/price-product-merchant-relationship                     |
| PriceProductMerchantRelationshipMerchantPortalGui | vendor/spryker/price-product-merchant-relationship-merchant-portal-gui |
| ProductMerchantPortalGui                          | vendor/spryker/product-merchant-portal-gui                             |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER      | TYPE     | EVENT   | PATH       |
|---------------|----------|---------|------------------|
| PriceProductTableView.idMerchantRelationship   | property | Created | src/Generated/Shared/Transfer/PriceProductTableViewTransfer.php      |
| PriceProductTableView.merchantRelationshipName | property | Created | src/Generated/Shared/Transfer/PriceProductTableViewTransfer.php      |
| MerchantRelationshipFilter.merchantIds         | property | Created | src/Generated/Shared/Transfer/MerchantRelationshipFilterTransfer.php |

{% endinfo_block %}

### 3) Add Zed translations

Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN     | SPECIFICATION     | PREREQUISITES | NAMESPACE  |
|-----------------|-----------------|---------------|------------------|
| MerchantRelationshipPreBuildPriceProductGroupKeyPlugin                   | Extends the logic for the Price Product group key generation. |               | Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProduct                                           |
| MerchantRelationshipVolumePriceProductValidatorPlugin                    | Validates volume prices.                                   |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\PriceProduct                |
| MerchantRelationshipPriceProductCollectionDeletePlugin                   | Removes price product merchant relationships.              |               | Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct                                 |
| MerchantRelationshipPriceProductTableFilterPlugin                        | Filters price product transfers.                           |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui    |
| MerchantRelationshipPriceProductAbstractTableConfigurationExpanderPlugin | Expands price product abstract table configuration.        |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui    |
| MerchantRelationshipPriceProductConcreteTableConfigurationExpanderPlugin | Expands price product concrete table configuration.        |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui    |
| MerchantRelationshipPriceProductMapperPlugin                             | Maps merchant relationship data.                           |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui    |

<details>
<summary markdown='span'>src/Pyz/Zed/ProductMerchantPortalGui/ProductMerchantPortalGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\MerchantRelationshipPriceProductAbstractTableConfigurationExpanderPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\MerchantRelationshipPriceProductConcreteTableConfigurationExpanderPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\MerchantRelationshipPriceProductMapperPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\MerchantRelationshipPriceProductTableFilterPlugin;
use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\PriceProductTableFilterPluginInterface>
     */
    protected function getPriceProductTableFilterPlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductTableFilterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\PriceProductAbstractTableConfigurationExpanderPluginInterface>
     */
    protected function getPriceProductAbstractTableConfigurationExpanderPlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductAbstractTableConfigurationExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\PriceProductConcreteTableConfigurationExpanderPluginInterface>
     */
    protected function getPriceProductConcreteTableConfigurationExpanderPlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductConcreteTableConfigurationExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\PriceProductMapperPluginInterface>
     */
    protected function getPriceProductMapperPlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductMapperPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Log in to the Merchant Portal with a merchant that has at least one merchant relationship.

Open any merchant product and make sure that the Prices table contains the "Customer" column for both: abstract and concrete products.

Make sure that you can filter and sort the price table by Customer column.

{% endinfo_block %}

<details>
<summary markdown='span'>src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProduct\MerchantRelationshipPreBuildPriceProductGroupKeyPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * @return array<int, \Spryker\Service\PriceProductExtension\Dependency\Plugin\PreBuildPriceProductGroupKeyPluginInterface>
     */
    protected function getPreBuildPriceProductGroupKeyPlugins(): array
    {
        return [
            new MerchantRelationshipPreBuildPriceProductGroupKeyPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Open any merchant product with a regular price.

Create a customer-specific price with the same combination of currency and country as the existing price.

Make sure that there is no validation error.

{% endinfo_block %}

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceProductCollectionDeletePlugin;
use Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\PriceProduct\MerchantRelationshipVolumePriceProductValidatorPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceProductValidatorPluginInterface>
     */
    protected function getPriceProductValidatorPlugins(): array
    {
        return [
            new MerchantRelationshipVolumePriceProductValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceProductCollectionDeletePluginInterface>
     */
    protected function getPriceProductCollectionDeletePlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductCollectionDeletePlugin(),
        ];
    }     
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that you see the validation error while attempting to set or create the customer price for the volume price.

Make sure that you can delete the customer price.

{% endinfo_block %}


### 5) Filter out product offer prices

{% info_block warningBox %}

This option is only available if you have the [Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) installed.

{% endinfo_block %}

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                   | SPECIFICATION                     | PREREQUISITES | NAMESPACE                                                                      |
|--------------------------------------------------------------------------|-----------------------------------|---------------|--------------------------------------------------------------------------------|
| PriceProductOfferPriceProductTableFilterPlugin (Optional)                | Maps merchant relationship data.  |               | Spryker\Zed\PriceProductOfferGui\Communication\Plugin\ProductMerchantPortalGui |

```php
namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\PriceProductOfferGui\Communication\Plugin\ProductMerchantPortalGui\PriceProductOfferPriceProductTableFilterPlugin;
use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\PriceProductTableFilterPluginInterface>
     */
    protected function getPriceProductTableFilterPlugins(): array
    {
        return [
            new PriceProductOfferPriceProductTableFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in to the Merchant Portal with a merchant that has at least one merchant relationship and product offer.
2. Open any product that has a product offer.
3. Make sure that the Prices table does not contain product offer prices for both abstract and concrete products.

{% endinfo_block %}

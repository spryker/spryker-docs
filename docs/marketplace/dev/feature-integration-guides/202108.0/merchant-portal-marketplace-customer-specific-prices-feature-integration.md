---
title: Merchant Portal - Marketplace Customer Specific Prices feature integration
last_updated: Apr 20, 2022
description: This document describes the process how to integrate the Marketplace Customer Specific Prices into the Spryker Merchant Portal.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Customer Specific Prices feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Customer Specific Prices feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ |-----------------|
| Marketplace Merchant Custom Prices | {{page.version}} | |
| Marketplace Merchant Portal Product Management | {{page.version}} | |

spryker-feature/merchant-custom-prices
spryker-feature/marketplace-merchant-portal-product-management

### 1) Install the required modules using Composer

Install the required module:

```bash
composer require spryker-feature/marketplace-merchant-custom-prices --with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                                            | EXPECTED DIRECTORY        |
|---------------------------------------------------|---------------------------|
| PriceProduct                                      | vendor/spryker/price-product |
| PriceProductMerchantRelationship                  | vendor/spryker/price-product-merchant-relationship |
| PriceProductMerchantRelationshipMerchantPortalGui | vendor/spryker/price-product-merchant-relationship-merchant-portal-gui |
| ProductMerchantPortalGui                          | vendor/spryker/product-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION                                                                                                                                                                                                                                                               | PREREQUISITES | NAMESPACE                                                                                       |
| ------------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------|
| MerchantRelationshipPreBuildPriceProductGroupKeyPlugin | Sets PriceProduct.priceDimension.isMerchantActive to null.                                                                                                                                                                                                                  |               | Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProduct                            |
| MerchantRelationshipVolumePriceProductValidatorPlugin | Validates volume prices against having volume price for price with merchant relationship.                                                                                                                                                                                   |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\PriceProduct | 
| MerchantRelationshipPriceProductCollectionDeletePlugin | Removes price product merchant relationships by provided criteria transfer.                                                                                                                                                                                                 |               | Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct |
| MerchantRelationshipPriceProductTableFilterPlugin | Filters price product transfers by merchant relationship.                                                                                                                                                                                                                   |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |
| MerchantRelationshipPriceProductAbstractTableConfigurationExpanderPlugin | Expands price product abstract table configuration with Merchant Relationship column. Overrides `delete` and `save` url configuration for Merchant Relationship prices to include `idMerchantRelationship` parameter. Disables volume price column for the merchant prices. |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |
| MerchantRelationshipPriceProductConcreteTableConfigurationExpanderPlugin | Expands price product concrete table configuration with Merchant Relationship column. Overrides `delete` and `save` url configuration for Merchant Relationship prices to include `idMerchantRelationship` parameter. Disables volume price column for the merchant prices. |               | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |
| MerchantRelationshipPriceProductMapperPlugin | Maps merchant relationship data to `PriceProductTableViewTransfer` transfer object. |  | Spryker\Zed\PriceProductMerchantRelationshipMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |


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

Log in to the Merchant Portal with a merchant with merchant relationships.

Open any product for edit and make sure that the Customer column in the Price section is updatable.

{% endinfo_block %}

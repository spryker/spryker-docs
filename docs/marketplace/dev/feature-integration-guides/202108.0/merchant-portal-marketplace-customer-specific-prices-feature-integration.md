---
title: Merchant Portal - Marketplace Customer Specific Prices feature integration
last_updated: Apr 20, 2022
description: This document describes the process how to integrate the Marketplace Customer Specific Prices into the Spryker Merchant Portal.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Customer Specific Prices feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Customer Specific Prices feature core.

### 1) Install the required modules using Composer

Install the required module:

```bash
composer require spryker/price-product-merchant-relationship-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE    | EXPECTED DIRECTORY        |
|-----------|---------------------------|
| PriceProductMerchantRelationshipMerchantPortalGui | vendor/spryker/price-product-merchant-relationship-merchant-portal-gui |

{% endinfo_block %}


### 2) Set up database schema

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Verify that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE   | EVENT     |
|-----------------|--------|-----------|
| spy_acl_rule.bundle   | column | updated   |
| spy_acl_rule.controller   | column | updated   |


{% endinfo_block %}

### 3) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH |
| - | - | - | - |
| PriceProductCollectionDeleteCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductCollectionDeleteCriteriaTransfer |
| PriceProductCollectionResponse | class | Created | src/Generated/Shared/Transfer/PriceProductCollectionResponseTransfer |
| PriceProductMerchantRelationshipCollectionDeleteCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductMerchantRelationshipCollectionDeleteCriteriaTransfer |
| PriceProductMerchantRelationshipCollectionResponse | class | Created | src/Generated/Shared/Transfer/PriceProductMerchantRelationshipCollectionResponseTransfer |
| PriceProductTableView | class | Created | src/Generated/Shared/Transfer/PriceProductTableViewTransfer |
| PriceProductTableCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductTableCriteriaTransfer |
| PriceProductCriteria.withAllMerchantPrices | property | Created | src/Generated/Shared/Transfer/PriceProductCriteriaTransfer |
| PriceProductDimension.idPriceProductDefault | property | Created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer |
| PriceProduct.priceTypeName | property | Created | src/Generated/Shared/Transfer/PriceProductTransfer |
| PriceProductDimension.name | property | Created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer |

{% endinfo_block %}

### 4) Configure price product group key pre-build plugins

**src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php**

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

### 5) Configure price product validation plugins and price product collection delete plugins

**src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php**

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

### 6) Configure price product table filter plugins, price product abstract table configuration expander plugins, price product concrete table configuration expander plugins and price product mapper plugins

**src/Pyz/Zed/ProductMerchantPortalGui/ProductMerchantPortalGuiDependencyProvider.php**

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

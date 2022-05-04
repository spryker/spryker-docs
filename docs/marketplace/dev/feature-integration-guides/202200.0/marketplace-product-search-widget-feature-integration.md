---
title: Marketplace Product Search Widget feature integration
description: Learn how to integrate the Marketplace Product Search Widget feature into a Spryker project.
template: feature-integration-guide-template
last_updated: May 04, 2022
---

This document describes how to integrate the Marketplace Product Search Widget feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Search Widget feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME         | VERSION          | INTEGRATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Product      | {{page.version}} | [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html)           |
| Merchant     | {{page.version}} | [Merchant feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/merchant-feature-integration.html) |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-search-widget:"{{page.version}}" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY <!--for public Demo Shops-->     |
|-----------------------------|-----------------------------------------------------|
| ProductSearchWidget         | vendor/spryker-shop/product-search-widget           |
| ProductSearchWidgetExtension | vendor/spryker-shop/product-search-widget-extension |
| MerchantProductOfferWidgetExtension | vendor/spryker-shop/merchant-product-offer-widget-extension |
| ProductSearchWidgetExtension | vendor/spryker-shop/product-search-widget-extension  |
| MerchantSearchWidget  | vendor/spryker-shop/merchant-search-widget   |

---

### Set up database schema and transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                      | TYPE     | EVENT    | PATH                                                               |
|-------------------------------|----------|----------|--------------------------------------------------------------------|
| MerchantProductOfferCriteria  | class    | created  | src/Generated/Shared/Transfer/MerchantProductOfferCriteriaTransfer |
| Store                         | class    | created  | src/Generated/Shared/Transfer/StoreTransfer                        |
| ProductConcretePageSearch     | class    | created  | src/Generated/Shared/Transfer/ProductConcretePageSearchTransfer    |
| ProductOfferCollection        | class    | created  | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer       |
| ProductOffer                  | class    | created  | src/Generated/Shared/Transfer/ProductOfferTransfer                 |
| PageMap                       | class    | created  | src/Generated/Shared/Transfer/PageMapTransfer                      |
| ProductConcretePageSearch     | class    | created  | src/Generated/Shared/Transfer/ProductConcretePageSearchTransfer    |
| MerchantProductCriteria       | class    | created  | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer      |
| Merchant                      | class    | created  | src/Generated/Shared/Transfer/MerchantTransfer                     |
| MerchantStorage               | class    | created  | src/Generated/Shared/Transfer/MerchantStorageTransfer              |
| ShopContext                   | class    | created  | src/Generated/Shared/Transfer/ShopContextTransfer                  |
| ProductOfferStorage           | class    | created  | src/Generated/Shared/Transfer/ProductOfferStorageTransfer          |
| QuickOrderItem                | class    | created  | src/Generated/Shared/Transfer/QuickOrderItemTransfer               |
| ProductConcreteCriteriaFilter | class    | created  | src/Generated/Shared/Transfer/ProductConcreteCriteriaFilterTransfer|
| PriceProductFilter            | class    | created  | src/Generated/Shared/Transfer/PriceProductFilterTransfer           |
---

### Add translations

Add translations as follows:

1. Append glossary for the feature:

 ```yaml
quick-order.input-label.merchant,Merchant,en_US
quick-order.input-label.merchant,Händler,de_DE
merchant_product_offer_widget.merchant_name,Merchant,en_US
merchant_product_offer_widget.merchant_name,Händler,de_DE
merchant_search_widget.all_merchants,All Merchants,en_US
merchant_search_widget.all_merchants,Alle Händler,de_DE
merchant_search_widget.merchants,Merchants,en_US
merchant_search_widget.merchants,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

2. Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### Set up behavior

Enable the following behaviors by registering the plugins:

1. Setup ProductPageSearch plugins

| PLUGIN                                                   | SPECIFICATION                                                                  | PREREQUISITES | NAMESPACE                                                                     |
|----------------------------------------------------------|--------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| MerchantProductOfferProductConcretePageMapExpanderPlugin | Expands the provided PageMap transfer object and returns the modified version. | None          | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductProductConcretePageMapExpanderPlugin      | Expands `PageMap` transfer object with `merchant_reference`.                   | None          | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch      |


**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use ...

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
...
    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageMapExpanderPluginInterface>
     */
    protected function getConcreteProductMapExpanderPlugins(): array
    {
        return [
            new ProductConcreteProductListPageMapExpanderPlugin(),
            new ProductImageProductConcretePageMapExpanderPlugin(),
            new MerchantProductProductConcretePageMapExpanderPlugin(),
            new MerchantProductOfferProductConcretePageMapExpanderPlugin(),
        ];
    }
...
}
```

2. Setup QuickOrderPage plugins

| PLUGIN                                           | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                                         |
|--------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| MerchantProductOfferQuickOrderFormColumnPlugin   | Returns glossary key for column title to be displayed.                                  | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage |
| MerchantProductOfferQuickOrderItemExpanderPlugin | Expands provided ItemTransfer with additional data.                                     | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage |
| MerchantProductOfferQuickOrderFormExpanderPlugin | Expands QuickOrderItemEmbeddedForm with `product_offer_reference` form field.           | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage |
| MerchantProductQuickOrderItemExpanderPlugin      | Expands provided ItemTransfer with additional data.                                     | None          | SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage      |
| ProductOfferQuickOrderItemMapperPlugin           | Maps product offer reference to QuickOrderItem transfer.                                | None          | SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage         |
| MerchantQuickOrderItemMapperPlugin               | Maps merchant reference to QuickOrderItem transfer.                                     | None          | SprykerShop\Yves\MerchantWidget\Plugin\QuickOrderPage             |


**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use ...

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new QuickOrderItemDefaultPackagingUnitExpanderPlugin(),
            new MerchantProductQuickOrderItemExpanderPlugin(),
            new MerchantProductOfferQuickOrderItemExpanderPlugin(),
        ];
    }
...
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormExpanderPluginInterface>
     */
    protected function getQuickOrderFormExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferQuickOrderFormExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormColumnPluginInterface>
     */
    protected function getQuickOrderFormColumnPlugins(): array
    {
        return [
            new MerchantProductOfferQuickOrderFormColumnPlugin(),
            new QuickOrderFormMeasurementUnitColumnPlugin(),
        ];
    }
...    
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemMapperPluginInterface>
     */
    protected function getQuickOrderItemMapperPlugins(): array
    {
        return [
            new MerchantQuickOrderItemMapperPlugin(),
            new ProductOfferQuickOrderItemMapperPlugin(),
        ];
    }
}
```

3. Setup Router plugins

| PLUGIN                                        | SPECIFICATION                       | PREREQUISITES | NAMESPACE                                                 |
|-----------------------------------------------|-------------------------------------|---------------|-----------------------------------------------------------|
| MerchantProductOfferWidgetRouteProviderPlugin | Adds Routes to the RouteCollection. | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\Router;

use ...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
...
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
        ...
            new MerchantProductOfferWidgetRouteProviderPlugin(),
        ...
        ];

        if (class_exists(LoadTestingRouterProviderPlugin::class)) {
            $routeProviders[] = new LoadTestingRouterProviderPlugin();
        }

        return $routeProviders;
    }
...
}
```

4. Setup MerchantProductOfferWidget plugins

| PLUGIN                                                      | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                                                               |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------|
| MerchantProductMerchantProductOfferCollectionExpanderPlugin | Finds merchant product by sku and expands form choices with a merchant product's value. | None          | SprykerShop\Yves\MerchantProductWidget\Plugin\MerchantProductOfferWidget                |

**src/Pyz/Yves/MerchantProductOfferWidget/MerchantProductOfferWidgetDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\MerchantProductOfferWidget;

use ...

class MerchantProductOfferWidgetDependencyProvider extends SprykerMerchantProductOfferWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\MerchantProductOfferWidgetExtension\Dependency\Plugin\MerchantProductOfferCollectionExpanderPluginInterface>
     */
    protected function getMerchantProductOfferCollectionExpanderPlugins(): array
    {
        return [
            new MerchantProductMerchantProductOfferCollectionExpanderPlugin(),
        ];
    }
}
```

5. Setup ProductSearchWidget plugins

| PLUGIN                                                | SPECIFICATION                                                              | PREREQUISITES | NAMESPACE                                                              |
|-------------------------------------------------------|----------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| MerchantProductOfferProductQuickAddFormExpanderPlugin | Expands `ProductQuickAddForm` with `product_offer_reference` hidden field. | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\ProductSearchWidget |

**src/Pyz/Yves/ProductSearchWidget/ProductSearchWidgetDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\ProductSearchWidget;

use ...

class ProductSearchWidgetDependencyProvider extends SprykerProductSearchWidgetDependencyProvider
{
...
    /**
     * @return array<\SprykerShop\Yves\ProductSearchWidgetExtension\Dependency\Plugin\ProductQuickAddFormExpanderPluginInterface>
     */
    protected function getProductQuickAddFormExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferProductQuickAddFormExpanderPlugin(),
        ];
    }
...
}
```

6. Setup Search plugins

| PLUGIN                               | SPECIFICATION                                | PREREQUISITES | NAMESPACE                                               |
|--------------------------------------|----------------------------------------------|---------------|---------------------------------------------------------|
| MerchantReferenceQueryExpanderPlugin | Adds filter by merchant reference to query.  | None          | Spryker\Client\MerchantProductOfferSearch\Plugin\Search |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**
```php
<?php

namespace Pyz\Client\Catalog;

use ...

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
...
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new ProductPriceQueryExpanderPlugin(),
            new SortedQueryExpanderPlugin(),
            new SortedCategoryQueryExpanderPlugin(CategoryFacetConfigTransferBuilderPlugin::PARAMETER_NAME),
            new PaginatedQueryExpanderPlugin(),
            new SpellingSuggestionQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
            new CustomerCatalogProductListQueryExpanderPlugin(),
            new MerchantReferenceQueryExpanderPlugin(),

            /*
             * FacetQueryExpanderPlugin needs to be after other query expanders which filters down the results.
             */
            new FacetQueryExpanderPlugin(),
        ];
    }
...    
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createSuggestionQueryExpanderPlugins(): array
    {
        return [
            new FuzzyQueryExpanderPlugin(),
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new CompletionQueryExpanderPlugin(),
            new SuggestionByTypeQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
            new CustomerCatalogProductListQueryExpanderPlugin(),
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }
...    
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new LocalizedQueryExpanderPlugin(),
            new PaginatedProductConcreteCatalogSearchQueryExpanderPlugin(),
            new CustomerCatalogProductListQueryExpanderPlugin(),
            new ProductListSearchProductListQueryExpanderPlugin(),
            new MerchantReferenceQueryExpanderPlugin(),
            new MerchantProductReferenceQueryExpanderPlugin(),
        ];
    }
...
}
```
---

## Related features

| NAME                                             | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
|--------------------------------------------------|----------------------------------| ----------------- |
| Marketplace Product + Marketplace Product Offer  |                                  | [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |
| Merchant Switcher + Customer Account Management |                                  | [Merchant Switcher + Customer Account Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-customer-account-management-feature-integration.html) |
| Merchant Switcher + Wishlist                    |                                  | [Merchant Switcher + Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-wishlist-feature-integration.html)                                      |


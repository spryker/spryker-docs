---
title: Marketplace Product Offer + Quick Add to Cart feature integration
last_updated: May 16, 2022
description: This document describes the process how to integrate the Marketplace Product Offer + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer + Quick Add to Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Quick Add to Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:


| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Quick Add to Cart | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html) |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer: "^0.6.1" --update-with-dependencies
composer require spryker-feature/quick-add-to-cart:"^2018.11.0" --update-with-dependencies
```

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```yaml
quick-order.input-label.merchant,Merchant,en_US
quick-order.input-label.merchant,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                | DESCRIPTION                                                                               | PREREQUISITES | NAMESPACE                                                              |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| ProductOfferQuickOrderItemMapperPlugin                | Maps product offer reference to QuickOrderItem transfer.                                  |               | SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage              |
| MerchantProductOfferProductQuickAddFormExpanderPlugin | Expands `ProductQuickAddForm` with `product_offer_reference` hidden field.                |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\ProductSearchWidget |
| MerchantProductOfferQuickOrderItemExpanderPlugin      | Expands provided ItemTransfer with `ProductOfferStorage` merchant reference.              |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |
| MerchantProductOfferQuickOrderFormColumnPlugin        | Returns glossary key for column title `quick-order.input-label.merchant` to be displayed. |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |
| MerchantProductOfferQuickOrderFormExpanderPlugin      | Expands QuickOrderItemEmbeddedForm with `product_offer_reference` form field.             |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |


**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderFormColumnPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderItemExpanderPlugin;
use SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage\ProductOfferQuickOrderItemMapperPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemMapperPluginInterface>
     */
    protected function getQuickOrderItemMapperPlugins(): array
    {
        return [
            new ProductOfferQuickOrderItemMapperPlugin(),
        ];
    }
    
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormColumnPluginInterface>
     */
    protected function getQuickOrderFormColumnPlugins(): array
    {
        return [
            new MerchantProductOfferQuickOrderFormColumnPlugin(),
        ];
    }
    
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
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferQuickOrderItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ProductSearchWidget/ProductSearchWidgetDependencyProvider.php**

```php
namespace Pyz\Yves\ProductSearchWidget;

use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\ProductSearchWidget\MerchantProductOfferProductQuickAddFormExpanderPlugin;
use SprykerShop\Yves\ProductSearchWidget\ProductSearchWidgetDependencyProvider as SprykerProductSearchWidgetDependencyProvider;

class ProductSearchWidgetDependencyProvider extends SprykerProductSearchWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductSearchWidgetExtension\Dependency\Plugin\ProductQuickAddFormExpanderPluginInterface>
     */
    protected function getProductQuickAddFormExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferProductQuickAddFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that product offer reference is transferred to Cart and SoldBy section contains proper merchant.
Make sure that you can see Merchant additional column, which contains merchant products after product search by sku.

{% endinfo_block %}

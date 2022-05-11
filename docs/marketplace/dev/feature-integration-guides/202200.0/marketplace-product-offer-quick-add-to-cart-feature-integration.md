---
title: Marketplace Product Offer + quick add to Cart feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product Offer feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer + quick add to Cart feature integration feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                      | VERSION           | INTEGRATION GUIDE                                                                                                                                                     |
|---------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product Offer | {{page.version}}  | [Marketplace Product Offer Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Cart                      | {{page.version}}  | [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html)                                                  |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                      | DESCRIPTION                                                                             | PREREQUISITES | NAMESPACE                                                                     |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| MerchantProductOfferProductQuickAddFormExpanderPlugin       | Expands `ProductQuickAddForm` with `product_offer_reference` hidden field.              |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\ProductSearchWidget        |
| MerchantProductOfferProductConcretePageMapExpanderPlugin    | Expands the provided PageMap transfer object and returns the modified version.          |               | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductOfferQuickOrderFormColumnPlugin              | Returns glossary key for column title to be displayed.                                  |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage             |
| MerchantProductOfferQuickOrderItemExpanderPlugin            | Expands provided ItemTransfer with additional data.                                     |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage             |
| MerchantProductOfferQuickOrderFormExpanderPlugin            | Expands QuickOrderItemEmbeddedForm with `product_offer_reference` form field.           |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage             |
| MerchantProductQuickOrderItemExpanderPlugin                 | Expands provided ItemTransfer with additional data.                                     |               | SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage                  |
| MerchantQuickOrderItemMapperPlugin                          | Maps merchant reference to QuickOrderItem transfer.                                     |               | SprykerShop\Yves\MerchantWidget\Plugin\QuickOrderPage                         |
| MerchantProductMerchantProductOfferCollectionExpanderPlugin | Finds merchant product by sku and expands form choices with a merchant product's value. |               | SprykerShop\Yves\MerchantProductWidget\Plugin\MerchantProductOfferWidget      |


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

{% info_block warningBox "Verification" %}

Make sure that correct Product Offer is added to Cart with Quick Add To Cart option.

{% endinfo_block %}

**src/Pyz/Yves/ProductPageSearch/ProductPageSearchDependencyProvider.php**

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
}
```

{% info_block warningBox "Verification" %}

Make sure that the list of Merchants is displayed after products search by sku.

{% endinfo_block %}


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
{% info_block warningBox "Verification" %}

Make sure that merchant product can be found by sku and added to Cart with proper merchant

{% endinfo_block %}

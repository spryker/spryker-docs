

This document describes how to install the Marketplace Product Offer + Quick Add to Cart feature.

## Install feature frontend

Follow the steps below to install the Marketplace Product Offer + Quick Add to Cart feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Quick Add to Cart | {{page.version}} | [Install the Quick Add to Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-feature.html) |

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```yaml
quick-order.input-label.merchant,Merchant,en_US
quick-order.input-label.merchant,Händler,de_DE
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

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------------- | ------------------ | ------------- | --------------- |
| MerchantSearchWidget | Provides a widget for rendering a merchant filter.  |   | SprykerShop\Yves\MerchantSearchWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantSearchWidget\Widget\MerchantSearchWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantSearchWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that Quick Order Page contains "Merchant Selector" dropdown with all active merchants.

{% endinfo_block %}

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | DESCRIPTION | PREREQUISITES | NAMESPACE |
|------------|----------------|---------------|----------------|
| MerchantQuickOrderItemMapperPlugin                    | Maps merchant reference to `QuickOrderItem` transfer.                               |               | SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage              |
| ProductOfferQuickOrderItemMapperPlugin                | Maps product offer reference to `QuickOrderItem` transfer.                          |               | SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage              |
| MerchantProductOfferQuickOrderItemExpanderPlugin      | Expands the provided `ItemTransfer` with the `ProductOfferStorage` merchant reference.        |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |
| MerchantProductOfferQuickOrderFormColumnPlugin        | Adds a new `Merchants` column to the quick order.                                      |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |
| MerchantProductOfferQuickOrderFormExpanderPlugin      | Expands `QuickOrderItemEmbeddedForm` with the `product_offer_reference` form field.       |               | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage      |


**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderFormColumnPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\QuickOrderPage\MerchantProductOfferQuickOrderItemExpanderPlugin;
use SprykerShop\Yves\MerchantWidget\Plugin\QuickOrderPage\MerchantQuickOrderItemMapperPlugin;
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
            new MerchantQuickOrderItemMapperPlugin(),
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

{% info_block warningBox "Verification" %}

Make sure that you can see `Merchant` additional column, which contains the corresponding merchants product offers after product search by name or sku.

Make sure that selected product offer reference is transferred to Cart and SoldBy section contains a proper merchant.

Make sure that selected merchant reference affects search results while retrieving for product by name or sku.

{% endinfo_block %}

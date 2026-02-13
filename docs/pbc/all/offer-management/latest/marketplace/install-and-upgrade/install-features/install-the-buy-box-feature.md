---
title: Install the Buy Box feature
description: Learn how to install the Buy Box feature that displays multiple merchant offers with selection and sorting
last_updated: February 12, 2026
template: feature-integration-guide-template
related:
  - title: Buy Box feature overview
    link: docs/pbc/all/offer-management/latest/marketplace/buy-box-feature-overview.html
  - title: Install the Buy Box + Product Availability feature
    link: docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-buy-box-product-availability-feature.html
---

This document describes how to install the Buy Box feature for marketplace scenarios.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |
| Marketplace Product | {{page.version}} | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html) |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Merchant | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-the-merchant-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/buy-box:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|--------|-------------------|
| BuyBox | vendor/spryker-feature/buy-box |

{% endinfo_block %}

## 2) Set up configuration

Add the following configuration to your project:

**src/Pyz/Yves/BuyBox/BuyBoxConfig.php**

```php
<?php

namespace Pyz\Yves\BuyBox;

use SprykerFeature\Yves\BuyBox\BuyBoxConfig as SprykerFeatureBuyBoxConfig;

class BuyBoxConfig extends SprykerFeatureBuyBoxConfig
{
    /**
     * @return string
     */
    public function getSortingStrategy(): string
    {
        return static::SORT_BY_PRICE;
    }
}
```

{% info_block infoBox "Configuration options" %}

**getSortingStrategy()**: Returns the sorting strategy for buy box offers. Options:
- `static::SORT_BY_PRICE` - Sort by lowest to highest price (default)
- `static::SORT_BY_STOCK` - Sort by highest to lowest stock (requires Inventory Management feature)

{% endinfo_block %}

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|----------|------|-------|------|
| BuyBoxProduct | class | Created | src/Generated/Shared/Transfer/BuyBoxProductTransfer |
| ProductOfferStorageCriteria | class | Created | src/Generated/Shared/Transfer/ProductOfferStorageCriteriaTransfer |
| ProductView | class | Extended | src/Generated/Shared/Transfer/ProductViewTransfer |
| MerchantStorageCriteria | class | Created | src/Generated/Shared/Transfer/MerchantStorageCriteriaTransfer |
| PriceProductFilter | class | Extended | src/Generated/Shared/Transfer/PriceProductFilterTransfer |
| MerchantStorage | class | Extended | src/Generated/Shared/Transfer/MerchantStorageTransfer |

{% endinfo_block %}

## 4) Set up behavior

Register the following plugins:

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\BuyBox\Widget\BuyBoxWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            BuyBoxWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `BuyBoxWidget` is registered by checking that the buy box appears on product detail pages in marketplace mode with multiple merchant offers.

{% endinfo_block %}

## 5) Set up templates

Integrate the BuyBoxWidget into the product detail page template.

**src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig**

```twig
{% raw %}
{% extends molecule('product-configurator', '@SprykerShop:ProductDetailPage') %}

{% set isProductConcrete = data.product.idProductConcrete is not empty %}
{% set buyBoxWidget = findWidget('BuyBoxWidget', [data.product, app.request]) %}
{% set productOffersCount = buyBoxWidget.products | length %}
{% set showProductAvailability = isProductConcrete and productOffersCount == 0 %}
{% set isAvailable = isProductConcrete and (data.product.available or productOffersCount) %}

{% block body %}
    {# ... existing code ... #}

    {% widget 'AddToCartFormWidget' args [config, data.product, isDisabled, options] with {
        data: {
            isService: sspServiceDetectorWidget and sspServiceDetectorWidget.isService,
        },
        embed: {
            showProductAvailability: showProductAvailability,
            buyBoxWidget: buyBoxWidget,
        },
    } only %}
        {% block embeddedData %}
            {# ... existing code ... #}

            {% if not shipmentTypeServicePointSelectorWidget or not shipmentTypeServicePointSelectorWidget.hasShipmentTypeWithRequiredLocation %}
                <div class="spacing-bottom spacing-bottom--bigger">
                    {% widget embed.buyBoxWidget %}
                        {% block content %}
                            {{ parent() }}
                        {% endblock %}
                    {% endwidget %}
                </div>
            {% endif %}

            {# ... rest of the template ... #}
        {% endblock %}
    {% endwidget %}

    {# ... rest of the template ... #}
{% endblock %}
{% endraw %}
```

{% info_block infoBox "Info" %}

This template modification:
- Calculates `productOffersCount` from the BuyBoxWidget
- Sets `showProductAvailability` to show availability only when no product offers exist
- Passes the `buyBoxWidget` through the embed context to render it within the AddToCartFormWidget
- Replaces the default merchant product widgets with the unified BuyBoxWidget display

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the buy box displays correctly on product detail pages:
- When multiple merchant offers exist, the buy box shows all available offers
- Each offer displays merchant information and price
- The buy box allows selecting different merchant offers
- When no product offers exist, availability information is shown instead

{% endinfo_block %}

## 6) Import glossary data

Import glossary keys for buy box translations:

**data/import/common/common/glossary.csv**

```csv
buy_box.sold_by,"Sold by",en_US
buy_box.sold_by,"Verkauft von",de_DE
buy_box.view_merchant,"View seller",en_US
buy_box.view_merchant,"Händler ansehen",de_DE
```

Run the data import:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the glossary keys have been imported by checking the `spy_glossary_key` and `spy_glossary_translation` tables. Verify that the buy box displays the correct translations on the storefront.

{% endinfo_block %}

## 7) Set up frontend

Build the frontend to include the new styles and assets:

```bash
console frontend:yves:build
```

## 8) Optional: Add stock-based sorting and availability per offer

To enable stock-based sorting and show availability per merchant offer, install the Product Availability Display feature and configure the integration.

### Install Product Availability Display feature

Follow the [Install the Product Availability Display feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-product-availability-display-feature.html) guide to install the availability modules.

### Add availability to product offers

Register the plugin that adds availability data to product offers:

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\ProductOfferAvailabilityStorage\Plugin\ProductOfferStorage\ProductOfferAvailabilityProductOfferStorageBulkExpanderPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageBulkExpanderPluginInterface>
     */
    protected function getProductOfferStorageBulkExpanderPlugins(): array
    {
        return [
            new ProductOfferAvailabilityProductOfferStorageBulkExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `ProductOfferAvailabilityProductOfferStorageBulkExpanderPlugin` is registered by viewing a product with multiple merchant offers and verifying that each offer displays its own availability information.

{% endinfo_block %}

### Configure stock-based sorting

To sort offers by stock instead of price, update your Buy Box configuration (from step 2) to use `SORT_BY_STOCK`:

**src/Pyz/Yves/BuyBox/BuyBoxConfig.php**

```php
public function getSortingStrategy(): string
{
    return static::SORT_BY_STOCK; // Sort by highest to lowest stock
}
```

This enables stock-aware Buy Box functionality with per-offer availability display and stock-based sorting.

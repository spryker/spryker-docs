---
title: Install the Product Availability Display feature
description: Learn how to install the Product Availability Display feature that shows stock quantities on product pages and in shopping carts
last_updated: February 12, 2026
template: feature-integration-guide-template
related:
  - title: Product Availability Display feature overview
    link: /docs/pbc/all/warehouse-management-system/base-shop/product-availability-display-feature-overview.html
---

This document describes how to install the Product Availability Display feature.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/inventory-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|--------|-------------------|
| AvailabilityWidget | vendor/spryker-shop/availability-widget |
| AvailabilityWidgetExtension | vendor/spryker-shop/availability-widget-extension |
| AvailabilityCartConnector | vendor/spryker/availability-cart-connector |
| AvailabilityStorage | vendor/spryker/availability-storage |

{% endinfo_block %}

## 2) Set up configuration

Add the following configuration to your project:

**src/Pyz/Yves/AvailabilityWidget/AvailabilityWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\AvailabilityWidget;

use SprykerShop\Yves\AvailabilityWidget\AvailabilityWidgetConfig as SprykerShopAvailabilityWidgetConfig;

class AvailabilityWidgetConfig extends SprykerShopAvailabilityWidgetConfig
{
    /**
     * @var bool
     */
    protected const bool STOCK_DISPLAY_ENABLED = true;

    /**
     * @return string
     */
    public function getStockDisplayMode(): string
    {
        return static::STOCK_DISPLAY_MODE_INDICATOR_AND_QUANTITY;
    }
}
```

{% info_block infoBox "Configuration options" %}

**STOCK_DISPLAY_ENABLED**: Master switch to enable or disable stock display. Default is `false`.
**getStockDisplayMode()**: Returns the display mode. Options:
- `STOCK_DISPLAY_MODE_INDICATOR_ONLY` - Shows "Available" or "Out of stock" without quantities
- `STOCK_DISPLAY_MODE_INDICATOR_AND_QUANTITY` - Shows exact quantities like "12 in stock"

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
| ProductView | class | Extended | src/Generated/Shared/Transfer/ProductViewTransfer |
| Item | class | Extended | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}

## 4) Set up behavior

Register the following plugins:

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\Cart\AvailabilityItemExpanderPlugin;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new AvailabilityItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `AvailabilityItemExpanderPlugin` is registered by adding a product to the cart and verifying that `ItemTransfer.stockQuantity` and `ItemTransfer.isNeverOutOfStock` are populated.

{% endinfo_block %}

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\AvailabilityStorage\Plugin\ProductViewAvailabilityStorageExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductViewExpanderPluginInterface>
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductViewAvailabilityStorageExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `ProductViewAvailabilityStorageExpanderPlugin` is registered by viewing a product detail page and verifying that `ProductViewTransfer.stockQuantity` and `ProductViewTransfer.isNeverOutOfStock` are populated.

{% endinfo_block %}

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AvailabilityWidget\Widget\ProductAvailabilityWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductAvailabilityWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `ProductAvailabilityWidget` is registered by checking that the availability widget appears on product detail pages and in the shopping cart.

{% endinfo_block %}

## 5) Set up templates

Enable the ProductAvailabilityWidget in the frontend templates.

### Product detail page template

Add the availability widget to the product detail page:

**src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig**

```twig
{% raw %}
{% extends molecule('product-configurator', '@SprykerShop:ProductDetailPage') %}

{% set isProductConcrete = data.product.idProductConcrete is not empty %}
{% set showProductAvailability = isProductConcrete %}

{% block body %}
    {# ... existing code ... #}

    {% set productAvailabilityWidget = findWidget('ProductAvailabilityWidget', [
        data.product
    ]) %}
    {% if showProductAvailability %}
        {% if productAvailabilityWidget is defined %}
            {% widget productAvailabilityWidget only %} {% endwidget %}
        {% endif %}
    {% endif %}

    {# ... existing code ... #}

    {% widget 'AddToCartFormWidget' args [config, data.product, isDisabled, options] with {
        data: {
            isService: sspServiceDetectorWidget and sspServiceDetectorWidget.isService,
        }
    } only %}
        {% block embeddedData %}
            {# ... existing code ... #}

            {# Remove the following block if it exists: #}
            {# {% if not data.product.available %} #}
            {#     <p class="text-alert">{{ 'product.detail.out_of_stock' | trans }}</p> #}
            {# {% endif %} #}
        {% endblock %}
    {% endwidget %}

    {# ... rest of the template ... #}
{% endblock %}
{% endraw %}
```

### Product catalog template

Add the availability widget to product cards in the catalog:

**src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card-item/product-card-item.twig**

```twig
{% raw %}
{% extends model('component') %}

{% block body %}
    {# ... existing code ... #}

    {% block productInfo %}
        {# ... existing code ... #}
        {% block availability %}
            {% set productAvailabilityWidget = findWidget('ProductAvailabilityWidget', [
                listItem
            ]) %}
            {% if productAvailabilityWidget is defined %}
                {% widget productAvailabilityWidget %} {% endwidget %}
            {% endif %}
        {% endblock %}
        {# ... rest of the template ... #}
    {% endblock %}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Verification" %}

Make sure the availability widget displays correctly:
- On product detail pages, the widget appears below the product title and shows stock information
- In product catalogs and search results, each product card displays availability information
- The display format matches your configuration (indicator only or indicator with quantity)

{% endinfo_block %}

## 6) Optional: Add measurement unit support

To display stock quantities with measurement units like "250 kg in stock", install additional modules and register plugins.

### Install measurement unit modules

```bash
composer require spryker-feature/measurement-units:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|--------|-------------------|
| ProductMeasurementUnitWidget | vendor/spryker-shop/product-measurement-unit-widget |
| ProductMeasurementUnitStorage | vendor/spryker/product-measurement-unit-storage |

{% endinfo_block %}

### Register measurement unit plugins

**src/Pyz/Yves/AvailabilityWidget/AvailabilityWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\AvailabilityWidget;

use SprykerShop\Yves\AvailabilityWidget\AvailabilityWidgetDependencyProvider as SprykerShopAvailabilityWidgetDependencyProvider;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Plugin\AvailabilityWidget\ProductMeasurementUnitQuantityFormatterStrategyPlugin;

class AvailabilityWidgetDependencyProvider extends SprykerShopAvailabilityWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\AvailabilityWidgetExtension\Dependency\Plugin\AvailabilityQuantityFormatterStrategyPluginInterface>
     */
    protected function getAvailabilityQuantityFormatterStrategyPlugins(): array
    {
        return [
            new ProductMeasurementUnitQuantityFormatterStrategyPlugin(),
        ];
    }
}
```

Add `ProductViewMeasurementUnitExpanderPlugin` to the existing `ProductStorageDependencyProvider`:

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\AvailabilityStorage\Plugin\ProductViewAvailabilityStorageExpanderPlugin;
use Spryker\Client\ProductMeasurementUnitStorage\Plugin\ProductStorage\ProductViewMeasurementUnitExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductViewExpanderPluginInterface>
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductViewAvailabilityStorageExpanderPlugin(),
            new ProductViewMeasurementUnitExpanderPlugin(), // Add this line
        ];
    }
}
```

{% info_block infoBox "Info" %}

`ProductViewMeasurementUnitExpanderPlugin` requires the `spryker/product-measurement-unit-storage` module from step 6.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that measurement units appear in availability displays by viewing a product that has a base measurement unit configured. The availability should display as "[quantity] [unit] in stock", for example, "250 kg in stock".

{% endinfo_block %}

## 7) Import glossary data

Import glossary keys for availability translations:

**data/import/common/common/glossary.csv**

```csv
product.availability.available,Available,en_US
product.availability.available,Verfügbar,de_DE
product.availability.in_stock,"%number% in stock",en_US
product.availability.in_stock,"%number% auf Lager",de_DE
product.availability.out_of_stock,"Out of stock",en_US
product.availability.out_of_stock,"Nicht auf Lager",de_DE
```

Run the data import:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the glossary keys have been imported by checking the `spy_glossary_key` and `spy_glossary_translation` tables. Verify that the availability widget displays the correct translations on the storefront.

{% endinfo_block %}

## 8) Optional: Import measurement unit translations

If you enabled measurement unit support, import glossary keys for measurement unit names:

**data/import/common/common/glossary.csv**

```csv

measurement_units.item.name.short,pc,en_US
measurement_units.item.name.short,Stk,de_DE
measurement_units.standard.weight.kilo.name.short,kg,en_US
measurement_units.standard.weight.kilo.name.short,kg,de_DE
measurement_units.standard.weight.gram.name.short,g,en_US
measurement_units.standard.weight.gram.name.short,g,de_DE
measurement_units.standard.weight.tone.name.short,t,en_US
measurement_units.standard.weight.tone.name.short,t,de_DE
measurement_units.standard.weight.gbou.name.short,oz,en_US
measurement_units.standard.weight.gbou.name.short,oz,de_DE
measurement_units.standard.weight.usou.name.short,oz,en_US
measurement_units.standard.weight.usou.name.short,oz,de_DE
measurement_units.standard.weight.pund.name.short,lb,en_US
measurement_units.standard.weight.pund.name.short,lb,de_DE
measurement_units.standard.weight.huwg.name.short,GB cwt,en_US
measurement_units.standard.weight.huwg.name.short,GB cwt,de_DE
measurement_units.standard.weight.gbtn.name.short,GB ton,en_US
measurement_units.standard.weight.gbtn.name.short,GB ton,de_DE
measurement_units.standard.weight.ustn.name.short,US ton,en_US
measurement_units.standard.weight.ustn.name.short,US ton,de_DE
measurement_units.standard.weight.oztr.name.short,ozt,en_US
measurement_units.standard.weight.oztr.name.short,ozt,de_DE
measurement_units.standard.weight.ucwt.name.short,US cwt,en_US
measurement_units.standard.weight.ucwt.name.short,US cwt,de_DE
measurement_units.standard.length.metr.name.short,m,en_US
measurement_units.standard.length.metr.name.short,m,de_DE
measurement_units.standard.length.cmet.name.short,cm,en_US
measurement_units.standard.length.cmet.name.short,cm,de_DE
measurement_units.standard.length.mmet.name.short,mm,en_US
measurement_units.standard.length.mmet.name.short,mm,de_DE
measurement_units.standard.length.kmet.name.short,km,en_US
measurement_units.standard.length.kmet.name.short,km,de_DE
measurement_units.standard.length.inch.name.short,in,en_US
measurement_units.standard.length.inch.name.short,in,de_DE
measurement_units.standard.length.yard.name.short,yd,en_US
measurement_units.standard.length.yard.name.short,yd,de_DE
measurement_units.standard.length.foot.name.short,ft,en_US
measurement_units.standard.length.foot.name.short,ft,de_DE
measurement_units.standard.length.mile.name.short,mi,en_US
measurement_units.standard.length.mile.name.short,mi,de_DE
measurement_units.standard.area.smet.name.short,m²,en_US
measurement_units.standard.area.smet.name.short,m²,de_DE
measurement_units.standard.area.sqki.name.short,km²,en_US
measurement_units.standard.area.sqki.name.short,km²,de_DE
measurement_units.standard.area.smil.name.short,mm²,en_US
measurement_units.standard.area.smil.name.short,mm²,de_DE
measurement_units.standard.area.scmt.name.short,cm²,en_US
measurement_units.standard.area.scmt.name.short,cm²,de_DE
measurement_units.standard.area.sqin.name.short,in²,en_US
measurement_units.standard.area.sqin.name.short,in²,de_DE
measurement_units.standard.area.sqfo.name.short,ft²,en_US
measurement_units.standard.area.sqfo.name.short,ft²,de_DE
measurement_units.standard.area.sqmi.name.short,mi²,en_US
measurement_units.standard.area.sqmi.name.short,mi²,de_DE
measurement_units.standard.area.sqya.name.short,yd²,en_US
measurement_units.standard.area.sqya.name.short,yd²,de_DE
measurement_units.standard.area.acre.name.short,ac,en_US
measurement_units.standard.area.acre.name.short,ac,de_DE
measurement_units.standard.area.ares.name.short,a,en_US
measurement_units.standard.area.ares.name.short,a,de_DE
measurement_units.standard.area.hect.name.short,ha,en_US
measurement_units.standard.area.hect.name.short,ha,de_DE
measurement_units.standard.litr.name.short,L,en_US
measurement_units.standard.litr.name.short,L,de_DE
measurement_units.standard.celi.name.short,cL,en_US
measurement_units.standard.celi.name.short,cL,de_DE
measurement_units.standard.mili.name.short,mL,en_US
measurement_units.standard.mili.name.short,mL,de_DE
measurement_units.standard.gbga.name.short,GB gal,en_US
measurement_units.standard.gbga.name.short,GB gal,de_DE
measurement_units.standard.gbpi.name.short,GB pt,en_US
measurement_units.standard.gbpi.name.short,GB pt,de_DE
measurement_units.standard.uspi.name.short,US pt,en_US
measurement_units.standard.uspi.name.short,US pt,de_DE
measurement_units.standard.gbqa.name.short,GB qt,en_US
measurement_units.standard.gbqa.name.short,GB qt,de_DE
measurement_units.standard.usqa.name.short,US qt,en_US
measurement_units.standard.usqa.name.short,US qt,de_DE
measurement_units.standard.usga.name.short,US gal,en_US
measurement_units.standard.usga.name.short,US gal,de_DE
measurement_units.standard.barl.name.short,bbl,en_US
measurement_units.standard.barl.name.short,bbl,de_DE
measurement_units.standard.bcuf.name.short,BCF,en_US
measurement_units.standard.bcuf.name.short,BCF,de_DE
measurement_units.standard.bdft.name.short,BF,en_US
measurement_units.standard.bdft.name.short,BF,de_DE
measurement_units.standard.cbme.name.short,m³,en_US
measurement_units.standard.cbme.name.short,m³,de_DE
measurement_units.standard.miba.name.short,MMbbl,en_US
measurement_units.standard.miba.name.short,MMbbl,de_DE
measurement_units.standard.dgeu.name.short,DGE,en_US
measurement_units.standard.dgeu.name.short,DGE,de_DE
measurement_units.standard.ggeu.name.short,GGE,en_US
measurement_units.standard.ggeu.name.short,GGE,de_DE
measurement_units.standard.busl.name.short,bu,en_US
measurement_units.standard.busl.name.short,bu,de_DE
```

Run the data import:

```bash
console data:import glossary
```

## 9) Set up frontend

Build the frontend to include the new styles and assets:

```bash
console frontend:yves:build
```

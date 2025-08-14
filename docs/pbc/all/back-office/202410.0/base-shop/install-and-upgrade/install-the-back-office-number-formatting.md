---
title: Install the Back Office number formatting
description: Learn how to install and upgrade the Back Office number formatting in Spryker Cloud Commerce OS
template: howto-guide-template
last_updated: Aug 30, 2022
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-add-support-of-number-formatting-in-the-back-office.html
  - /docs/pbc/all/back-office/202311.0/howto-add-support-of-number-formatting-in-the-back-office.html
  - /docs/pbc/all/back-office/202311.0/install-and-upgrade/install-the-back-office-number-formatting.html
  - /docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/install-the-back-office-number-formatting.html

---

This document explains how to add support of number formatting in the Back Office UI.

## Prerequisites

To add support of number formatting in the Back Office, integrate the following features:

| NAME   | REQUIRED | VERSION   | INTEGRATION  GUIDE    |
|--|-----------|-------|--------------------------|
| Spryker Core          |         &#9989;        | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                           |
| Promotions & Discounts |    | {{site.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html)     |
| Product Options |    | {{site.version}} | [Product Options feature walkthrough](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-options-feature-overview.html)                           |
| Product + Order Management|   | {{site.version}} | [Install the Product + Order Management feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-order-management-feature.html) |
| Shipment   |   | {{site.version}} | [Shipment integration](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                           |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/util-number spryker/money-gui
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE     | EXPECTED DIRECTORY         |
|------------|----------------------------|
| UtilNumber | vendor/spryker/util-number |
| MoneyGui   | vendor/spryker/money-gui   |

{% endinfo_block %}

## 2) Set up configuration

Extend the `Discount` configuration settings:

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Promotions & Discounts](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/Discount/DiscountConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountConfig as SprykerDiscountConfig;

class DiscountConfig extends SprykerDiscountConfig
{
    /**
     * @var bool
     */
    protected const IS_MONEY_COLLECTION_FORM_TYPE_PLUGIN_ENABLED = true;
}
```

{% info_block warningBox "Verification" %}

Make sure that calling `Pyz\Zed\Discount\DiscountConfig::isMoneyCollectionFormTypePluginEnabled()` returns `true`.

{% endinfo_block %}

## 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                  | TYPE  | EVENT   | PATH                                                           |
|---------------------------|-------|---------|----------------------------------------------------------------|
| NumberFormatConfig        | class | created | src/Generated/Shared/Transfer/NumberFormatConfigTransfer       |
| NumberFormatFilter        | class | created | src/Generated/Shared/Transfer/NumberFormatFilterTransfer       |
| NumberFormatIntRequest    | class | created | src/Generated/Shared/Transfer/NumberFormatIntRequestTransfer   |
| NumberFormatFloatRequest  | class | created | src/Generated/Shared/Transfer/NumberFormatFloatRequestTransfer |
| MoneyValueCollection      | class | created | src/Generated/Shared/Transfer/MoneyValueCollectionTransfer     |
| MoneyValue                | class | created | src/Generated/Shared/Transfer/MoneyValueTransfer               |
| Currency                  | class | created | src/Generated/Shared/Transfer/CurrencyTransfer                 |
| Store                     | class | created | src/Generated/Shared/Transfer/StoreTransfer                    |
| StoreWithCurrency         | class | created | src/Generated/Shared/Transfer/StoreWithCurrencyTransfer        |

{% endinfo_block %}


## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                           | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                               |
|----------------------------------|-----------------------------------------------------------------------|---------------|---------------------------------------------------------|
| NumberFormatterApplicationPlugin | Provides number formatter service.                                    | None          | Spryker\Zed\UtilNumber\Communication\Plugin\Application |
| NumberFormatterTwigPlugin        | Extends Twig with `formatInt()` and `formatFloat()` filter functions. | None          | Spryker\Zed\Gui\Communication\Plugin\Twig               |
| MoneyFormTypePlugin              | Adds `MoneyFormTypePlugin` form type.                                 | None          | Spryker\Zed\MoneyGui\Communication\Plugin\Form          |
| MoneyCollectionFormTypePlugin    | Adds `MoneyCollectionType` form type.                                 | None          | Spryker\Zed\MoneyGui\Communication\Plugin\Form          |


**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\UtilNumber\Communication\Plugin\Application\NumberFormatterApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NumberFormatterApplicationPlugin(),
        ];

        ...
    }
}
```

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Gui\Communication\Plugin\Twig\NumberFormatterTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new NumberFormatterTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Discount Management](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getMoneyCollectionFormTypePlugin(): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }
}
```

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Product](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyFormTypePlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createMoneyFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyFormTypePlugin();
    }
}
```

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Product Options](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/product-options-feature-overview.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/ProductOption/ProductOptionDependencyProvider.php**

```php
<?php

use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ProductOption\ProductOptionDependencyProvider as SprykerProductOptionDependencyProvider;

class ProductOptionDependencyProvider extends SprykerProductOptionDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createMoneyCollectionFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }
}
```

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Carrier Management](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/shipment-feature-overview.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/ShipmentGui/ShipmentGuiDependencyProvider.php**

```php
<?php

use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;

class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getMoneyCollectionFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }
}
```

## 5) Build Zed UI frontend

Enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```

After applying all these changes, you can see formatted prices and numbers in Back Office forms and tables.

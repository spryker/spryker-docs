---
title: Merchant Switcher feature integration
last_updated: Jan 06, 2021
description: This integration guide provides steps on how to integrate the Merchant Switcher feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Switcher feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Switcher feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ---------- | --------|
| Spryker Core | {{page.version}}   | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |

###  1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/merchant-switcher --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE         | EXPECTED DIRECTORY        |
| --------------- | ------------------------ |
| MerchantSwitcher | spryker/merchant-switcher |

{% endinfo_block %}

### 2) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT   | PATH |
| ------------------ | --- | ---- | ------------------- |
| MerchantSwitchRequest | class | created | src/Generated/Shared/Transfer/MerchantSwitchRequestTransfer |

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Merchant Switcher feature front end.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| ------------ | -------- |
| Spryker Core | {{page.version}} |

###  1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-shop/merchant-switcher-widget --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| ----------- | -------------- |
| MerchantSwitcher | spryker/merchant-switcher |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ----------- | ---- | ------ | ----------------------- |
| MerchantSwitchRequest | class | created | src/Generated/Shared/Transfer/MerchantSwitchRequestTransfer |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_switcher.message,Switch from %currentMerchant% to %newMerchant%? Due to different availability, not all products may be added to your shopping cart.,en_US
merchant_switcher.message,Wechseln von %currentMerchant% zu %newMerchant%? Aufgrund unterschiedlicher Verfügbarkeit können ggf. nicht alle Produkte in Warenkorb übernommen werden.,de_DE
merchant_switcher.message.product_is_not_available,"Product %product_name% (SKU %sku%) is not available from the selected merchant. Please remove it in order to proceed or switch the merchant.",en_US
merchant_switcher.message.product_is_not_available,"Produkt %product_name% (SKU %sku%) ist beim ausgewählten Händler nicht erhältlich. Bitte diesen Artikel entfernen, um fortzufahren oder den Händler zu wechseln.",de_DE
merchant_switcher.label,My Merchant,en_US
merchant_switcher.label,Mein Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------------- | --------------- | ------------- | ------------ |
| MerchantSwitcherWidgetRouteProviderPlugin | Wires the merchant switch request route to the shop router. |  | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\Router        |
| MerchantShopContextExpanderPlugin         | Adds the merchant reference from cookie to `ShopContext`. |  | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\ShopApplication |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\Router\MerchantSwitcherWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new MerchantSwitcherWidgetRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopContext/ShopContextDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopContext;

use Spryker\Yves\ShopContext\ShopContextDependencyProvider as SprykerShopContextDependencyProvider;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\ShopApplication\MerchantShopContextExpanderPlugin;

class ShopContextDependencyProvider extends SprykerShopContextDependencyProvider
{
    /**
     * @return \Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface[]
     */
    protected function getShopContextExpanderPlugins(): array
    {
        return [
            new MerchantShopContextExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/SearchElasticsearch/SearchElasticsearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SearchElasticsearch;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MerchantProductOfferSearch\Plugin\MerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\SearchElasticsearch\SearchElasticsearchDependencyProvider as SprykerSearchElasticsearchDependencyProvider;

class SearchElasticsearchDependencyProvider extends SprykerSearchElasticsearchDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface[]
     */
    protected function getSearchConfigExpanderPlugins(Container $container): array
    {
        return [
            new MerchantNameSearchConfigExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopContext;

use Spryker\Yves\ShopContext\ShopContextDependencyProvider as SprykerShopContextDependencyProvider;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\ShopApplication\MerchantShopContextExpanderPlugin;

class ShopContextDependencyProvider extends SprykerShopContextDependencyProvider
{
    /**
     * @return \Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface[]
     */
    protected function getShopContextExpanderPlugins(): array
    {
        return [
            new MerchantShopContextExpanderPlugin(),
        ];
    }
}
```

### 4) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| -------------------- | -------------- | ------------- | --------------------- |
| MerchantSwitcherSelectorFormWidget | Shows a list of merchants that you can switch the shop context in between. |  | SprykerShop\Yves\MerchantSwitcherWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantSwitcherWidget\Widget\MerchantSwitcherSelectorFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantSwitcherSelectorFormWidget::class,
        ];
    }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE | TEST |
| ------------------- | ------------------------ |
| MerchantSwitcherSelectorFormWidget | Check the top navigation and change the merchant, wait for page reload and the shop context to be changed (default selected product offers). |

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE |INTEGRATION GUIDE |
| --- | --- | --- |
|  Merchant Switcher + Wishlist | | [ Merchant Switcher + Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-wishlist-feature-integration.html) |

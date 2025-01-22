

This document describes how to install the Merchant Switcher feature.

## Install feature core

Follow the steps below to install the Merchant Switcher feature.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ---------- | --------|
| Spryker Core | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |

###  1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant-switcher --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

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

## Install feature frontend

Follow the steps below to install the Merchant Switcher feature frontend.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| ------------ | -------- |
| Spryker Core | {{page.version}} |

###  1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-shop/merchant-switcher-widget --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

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

**data/import/common/common/glossary.csv**

```yaml
merchant_switcher.message,Switch from %currentMerchant% to %newMerchant%? Because of different availability, not all products may be added to your shopping cart.,en_US
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

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

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
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
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
     * @return array<\Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface>
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
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface>
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
     * @return array<\Spryker\Shared\ShopContextExtension\Dependency\Plugin\ShopContextExpanderPluginInterface>
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
     * @return array<string>
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

Make sure the following widgets were registered:

| MODULE | TEST |
| ------------------- | ------------------------ |
| MerchantSwitcherSelectorFormWidget | Check the top navigation and change the merchant, wait for page reload and the shop context to be changed (default selected product offers). |

{% endinfo_block %}

## Install related features

| FEATURE                                          | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                                |
|--------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Merchant Switcher + Customer Account Management  |                                  | [Install the Merchant Switcher + Customer Account Management feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-switcher-customer-account-management-feature.html)  |
| Merchant Switcher + Wishlist                     |                                  | [ Install the Merchant Switcher + Wishlist feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-switcher-wishlist-feature.html)                                       |

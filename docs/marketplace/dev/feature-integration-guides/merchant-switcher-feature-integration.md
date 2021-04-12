---
title: Merchant Switcher feature integration
last_updated: Jan 06, 2021
summary: This integration guide provides steps on how to integrate the Merchant Switcher feature into a Spryker project.
---

## Install Feature Core

Follow the steps below to install the Merchant Switcher feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| ------------------------- | ---------- |
| Spryker Core              | 202001.0   |
| Marketplace Product Offer | dev-master |

###  1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/merchant-switcher --update-with-dependencies
```

---

**Verification**

Make sure that the following modules were installed:

| MODULE         | EXPECTED DIRECTORY        |
| --------------- | ------------------------ |
| MerchantSwitcher | spryker/merchant-switcher |

---

## 2) Set up the transfer objects

Run the following commands to generate transfer changes.

```bash
console transfer:generate
```

---

**Verification**

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT   | PATH |
| ------------------ | --- | ---- | ------------------- |
| MerchantSwitchRequest | class | created | src/Generated/Shared/Transfer/MerchantSwitchRequestTransfer |

---

## Install feature front end

Follow the steps below to install the Merchant Switcher feature FRONT END.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| ------------ | -------- |
| Spryker Core | 202001.0 |

###  1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-shop/merchant-switcher-widget --update-with-dependencies
```

---

**Verification**

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| :--------------- | :------------------------ |
| MerchantSwitcher | spryker/merchant-switcher |

---

### 2) Set up transfer objects

Run the following commands to generate transfer changes.

```bash
console transfer:generate
```

---

**Verification**

Make sure that the following changes were applied in transfer objects:

| Transfer              | Type  | Event   | Path                                                        |
| :-------------------- | :---- | :------ | :---------------------------------------------------------- |
| MerchantSwitchRequest | class | created | src/Generated/Shared/Transfer/MerchantSwitchRequestTransfer |

---

### 2) Add translations

#### Yves translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```
merchant_switcher.message,Switch from %currentMerchant% to %newMerchant%? Due to different availability, not all products may be added to your shopping cart.,en_US
merchant_switcher.message,Wechseln von %currentMerchant% zu %newMerchant%? Aufgrund unterschiedlicher Verfügbarkeit können ggf. nicht alle Produkte in Warenkorb übernommen werden.,de_DE
merchant_switcher.label,My Merchant,en_US
merchant_switcher.label,Mein Händler,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

---

**Verification**

Make sure that the configured data is added to the `spy_glossary` table in the database.

---

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |

| ----------------------------------------- | -------------------------------------------------- | ------------- | ------------------------------------------------------------ |
| MerchantSwitcherWidgetRouteProviderPlugin | Wires Merchant switch request route to shop Router | None          | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\Router        |
| MerchantShopContextExpanderPlugin         | Adds Merchant reference from cookie to ShopContext | None          | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\ShopApplication |

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

```
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

```
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

```
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

### 4) Set up Widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |

| ---------------------------------- | ------------------------------------------------------------ | ------------- | ---------------------------------------------- |
| MerchantSwitcherSelectorFormWidget | Shows a list of Merchants that you can switch the shop context in between | None          | SprykerShop\Yves\MerchantSwitcherWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```
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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

---

**Verification**

Make sure that the following widgets were registered:

| MODULE | TEST |

| :--------------------------------- | :----------------------------------------------------------- |
| MerchantSwitcherSelectorFormWidget | Check the top navigation and change the merchant, wait for page reload and the shop context to be changed (default selected product offers) |

---

# Related features

| FEATURE | INTEGRATION GUIDE |

| - | - |
| Merchant Switcher Feature + Customer Account Management | [Marketplace Order Management Feature + Customer Account Management integration](/docs/marketplace/dev/feature-integration-guides/marketplace-order-management-customer-account-management-feature-integration.html) |

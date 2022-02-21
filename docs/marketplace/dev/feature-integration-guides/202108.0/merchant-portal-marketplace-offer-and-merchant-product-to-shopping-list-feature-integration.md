---
title: Merchant Portal - Add Offer And Merchant Product to Shopping List feature integration
last_updated: Sep 13, 2021
description: This document describes the process how to integrate the Merchant Portal - Add Offer And Merchant Product to Shopping List feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Add Offer And Merchant Product to Shopping List feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Add Offer And Merchant Product to Shopping List feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Merchant Portal Marketplace Product | master | [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |
| Marketplace Inventory Management | master | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-shopping-lists:"^1.0.0" --update-with-dependencies 
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferShoppingListWidget | spryker-shop/product-offer-shopping-list-widget |
| ProductOfferShoppingList | spryker/product-offer-shopping-list |
| ProductOfferShoppingListDataImport | spryker/product-offer-shopping-list-data-import |

{% endinfo_block %}

### Generate transfer data
```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantStock | class | Created | src/Generated/Shared/Transfer/MerchantStockTransfer |


{% endinfo_block %}
### 2) Set up mappers for data

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferShoppingListItemMapperPlugin | Maps Product Offer data to `ShoppingListItemTransfer` | None | Spryker\Client\ProductOfferShoppingList\Plugin\ShoppingList |
| ProductOfferShoppingListItemToItemMapperPlugin | Maps `ShoppingListItemTransfer` transfer properties to `ItemTransfer` transfer properties | None | Spryker\Client\ProductOfferShoppingList\Plugin\ShoppingList |
| MerchantShoppingListItemToItemMapperPlugin | Maps `ShoppingListItemTransfer` transfer properties to `ItemTransfer` transfer properties | None | Spryker\Client\Merchant\Plugin\ShoppingList |

**src/Pyz/Client/ShoppingList/ShoppingListDependencyProvider.php**

```php

<?php

namespace Pyz\Client\ShoppingList;
use Spryker\Client\Merchant\Plugin\ShoppingList\MerchantShoppingListItemToItemMapperPlugin;
use Spryker\Client\ProductOfferShoppingList\Plugin\ShoppingList\ProductOfferShoppingListItemMapperPlugin;
use Spryker\Client\ProductOfferShoppingList\Plugin\ShoppingList\ProductOfferShoppingListItemToItemMapperPlugin;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemMapperPluginInterface>
     */
    protected function getAddItemShoppingListItemMapperPlugins(): array
    {
        return [
            ...
            new ProductOfferShoppingListItemMapperPlugin(),
        ];
    }
    protected function getShoppingListItemToItemMapperPlugins(): array
    {
        return [
            ...
            new ProductOfferShoppingListItemToItemMapperPlugin(),
            new MerchantShoppingListItemToItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the available stock column is displayed in the ProductConcreteTable.

{% endinfo_block %}


### 2) Enable related widgets

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ShoppingListMerchantWidget | TODO | None | SprykerShop\Yves\MerchantWidget\Widget |
| ShoppingListProductOfferWidget | TODO | None | SprykerShop\Yves\ProductOfferWidget\Widget |
| ProductOfferShoppingListWidget | TODO | None | SprykerShop\Yves\ProductOfferShoppingListWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php

<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\ShoppingListMerchantWidget;
use SprykerShop\Yves\ProductOfferShoppingListWidget\Widget\ProductOfferShoppingListWidget;
use SprykerShop\Yves\ProductOfferWidget\Widget\ShoppingListProductOfferWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
/**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ...
            ShoppingListMerchantWidget::class,
            ShoppingListProductOfferWidget::class,
            ProductOfferShoppingListWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the available stock column is displayed in the ProductConcreteTable.

{% endinfo_block %}

### 2) Set up required behaviours

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ShoppingListMerchantWidget | TODO | None | SprykerShop\Yves\MerchantWidget\Widget |
| ShoppingListProductOfferWidget | TODO | None | SprykerShop\Yves\ProductOfferWidget\Widget |
| ProductOfferShoppingListWidget | TODO | None | SprykerShop\Yves\ProductOfferShoppingListWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php

<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\ShoppingListMerchantWidget;
use SprykerShop\Yves\ProductOfferShoppingListWidget\Widget\ProductOfferShoppingListWidget;
use SprykerShop\Yves\ProductOfferWidget\Widget\ShoppingListProductOfferWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
/**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ...
            ShoppingListMerchantWidget::class,
            ShoppingListProductOfferWidget::class,
            ProductOfferShoppingListWidget::class,
        ];
    }
}
```

### 2) Import data

To import data:
#### 1. Prepare import data according to your requirements using demo data

**data/import/common/common/marketplace/product_offer_shopping_list_item.csv**
```csv
shopping_list_item_key,product_offer_reference
shopping-list-item-key-38,offer2
shopping-list-item-key-39,offer402
shopping-list-item-key-40,offer91
shopping-list-item-key-41,offer404
shopping-list-item-key-42,offer9
shopping-list-item-key-43,offer51
```
**data/import/common/common/shopping_list_item.csv**
```csv
shopping_list_item_key,shopping_list_key,product_sku,quantity
shopping-list-item-key-1,Laptops,134_29759322,1
shopping-list-item-key-2,Laptops,136_24425591,1
shopping-list-item-key-3,Laptops,135_29836399,3
shopping-list-item-key-4,Laptops,138_30657838,1
shopping-list-item-key-5,Laptops,139_24699831,1
```

Add importer configuration
**data/import/common/combined_shopping_list_items_import_config_EU.yml**
```csv
# Example of demo shop 'combined shopping list items' data import.
version: 0

actions:
    - data_entity: product-offer-shopping-list-item
      source: data/import/common/common/marketplace/product_offer_shopping_list_item.csv
```
Adjust Data Import configuration
**src/Pyz/Zed/DataImport/DataImportConfig.php**
```php
<?php

namespace Pyz\Zed\DataImport;

class DataImportConfig extends SprykerDataImportConfig
{
/**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [
            ...
            ProductOfferShoppingListDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHOPPING_LIST_ITEM,
        ];
    }
}
```
Enable required data import command

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php

<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\ProductOfferShoppingListDataImport\ProductOfferShoppingListDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return array<\Symfony\Component\Console\Command\Command>
*/
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
                ...
                new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ProductOfferShoppingListDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHOPPING_LIST_ITEM),
            ];
    }
}
```

Register required Data Import plugin

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductOfferShoppingListDataImport\Communication\Plugin\DataImport\ProductOfferShoppingListItemDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
 protected function getDataImporterPlugins(): array
    {
        return [
            ...
            new ProductOfferShoppingListItemDataImportPlugin(),
        ];
    }
}
```

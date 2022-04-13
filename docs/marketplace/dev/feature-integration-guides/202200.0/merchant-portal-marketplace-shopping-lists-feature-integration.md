---
title: Merchant Portal - Marketplace Shopping Lists feature integration
last_updated: April 13, 2022
description: This document describes the process how to integrate the Merchant Portal - Marketplace Shopping Lists feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Shopping Lists feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Shopping Lists feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Merchant Portal Marketplace Product | {{page.version}} | [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-shopping-lists 
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferShoppingListWidget | spryker-shop/product-offer-shopping-list-widget |
| ProductOfferShoppingList | spryker/product-offer-shopping-list |
| ProductOfferShoppingListDataImport | spryker/product-offer-shopping-list-data-import |

{% endinfo_block %}

### 2) Add Yves translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
shopping_list.pre.check.product_offer,Product Offer is not found.,en_US
shopping_list.pre.check.product_offer,Produktangebot wurde nicht gefunden.,de_DE
shopping_list.pre.check.product_offer.approved,Product Offer is not approved.,en_US
shopping_list.pre.check.product_offer.approved,Product Offer ist nicht genehmigt.,de_DE
shopping_list.pre.check.product_offer.is_active,Product Offer is not active.,en_US
shopping_list.pre.check.product_offer.is_active,Produktangebot ist inaktiv.,de_DE
shopping_list.pre.check.product_offer.store_invalid,Product Offer is not equal to the current Store.,en_US
shopping_list.pre.check.product_offer.store_invalid,Das Angebot gleicht nicht dem aktuellen Shop.,de_DE
shopping_list.pre.check.product_merchant_inactive,Merchant is inactive.,en_US
shopping_list.pre.check.product_merchant_inactive,Der Händler ist nicht aktiv.,de_DE
shopping_list.pre.check.product_merchant_not_approved,Merchant is not approved.,en_US
shopping_list.pre.check.product_merchant_not_approved,Der Händler ist nicht bestätigt.,de_DE
shopping_list.pre.check.product.store_invalid,Product is not equal to the current Store.,en_US
shopping_list.pre.check.product.store_invalid,Das Produkt gleicht nicht dem aktuellen Shop.,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database, the configured data is added to the spy_glossary table.

{% endinfo_block %}

### 2) Generate transfers and migrations
```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantProductCriteria.productConcreteSkus | property | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| MerchantProductCriteria.productAbstractIds | property | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| MerchantProductCriteria.productOfferIds | property | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| ProductOffer.productOfferReference | property | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| ProductOfferCollection.productOffers | property | Created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer |
| ProductOfferCollection.items | property | Created | src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer |
| ProductOfferCriteria.productOfferReferences | property | Created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer |
| ProductConcrete.sku | property | Created | src/Generated/Shared/Transfer/ProductConcreteTransfer |
| ProductConcreteStorage.merchantReference | property | Created | src/Generated/Shared/Transfer/ProductConcreteStorageTransfer |
| ProductView.merchantReference | property | Created | src/Generated/Shared/Transfer/ProductViewTransfer |
| ShoppingListItem | class | Created | src/Generated/Shared/Transfer/ShoppingListItemTransfer |
| ShoppingListItem.merchantReference | property | Created | src/Generated/Shared/Transfer/ShoppingListItemTransfer |
| ShoppingListItem.productOfferReference | property | Created | src/Generated/Shared/Transfer/ShoppingListItemTransfer |
| ShoppingListItem.idProductAbstract | property | Created | src/Generated/Shared/Transfer/ShoppingListItemTransfer |
| ShoppingListItem.sku | property | Created | src/Generated/Shared/Transfer/ShoppingListItemTransfer |
| ShoppingListItemCollection | class | Created | src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer |
| ShoppingListItemCollection.items | property | Created | src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer |
| ShoppingListPreAddItemCheckResponse | class | Created | src/Generated/Shared/Transfer/ShoppingListPreAddItemCheckResponseTransfer |

{% endinfo_block %}

run the `propel:install` command :

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in the database:

| DATABASE ENTITY                                          | TYPE   | EVENT   |
|----------------------------------------------------------| ------ | ------- |
| spy_shopping_list_item.product_offer_reference           | column | created |
| spy_shopping_list_item.key                               | column | created |
| spy_shopping_list_item.spy_shopping_list_item-unique-key | index | created |

{% endinfo_block %}

### 3) Setup desired behaviour 

#### 1. Set up mappers for data

Enable the following behaviors in Client by registering the plugins:

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
            new ProductOfferShoppingListItemMapperPlugin(),
        ];
    }
    protected function getShoppingListItemToItemMapperPlugins(): array
    {
        return [            
            new ProductOfferShoppingListItemToItemMapperPlugin(),
            new MerchantShoppingListItemToItemMapperPlugin(),
        ];
    }
}
```

#### 2. Enable the following behaviors in Zed by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferShoppingListAddItemPreCheckPlugin | Checks if product offer exists and refers to required product. | None | Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList; |
| MerchantProductAddItemPreCheckPlugin | Validates that Merchant of Product is active and approved                |   | Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList |
| MerchantProductConcreteStorageCollectionExpanderPlugin | Expands `ProductConcreteStorage` transfers with merchant reference| None | Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage |
| MerchantProductOfferAddItemPreCheckPlugin | Validates that Merchant of Product Offer is active and approved          |   | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductOfferShoppingListItemBulkPostSavePlugin | Expands Shopping list item with Product Offer with Merchant reference    |   | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductOfferShoppingListItemCollectionExpanderPlugin | Expands a `ShoppingListItemCollectionTransfer` with Merchant data of Product Offer| None | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductShoppingListItemBulkPostSavePlugin | Expands Shopping list item with Product Concrete with Merchant reference |   | Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList |
| MerchantProductShoppingListItemCollectionExpanderPlugin | Expands a `ShoppingListItemCollectionTransfer` with Merchant data of Product. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingListExtension |
| ProductOfferItemToShoppingListItemMapperPlugin | Maps `ItemTransfer.productOfferReference` transfer property to `ShoppingListItemTransfer.productOfferReference` transfer property | None | Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList |

**src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShoppingList;

use Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingListExtension\MerchantProductShoppingListItemCollectionExpanderPlugin;
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList\MerchantProductOfferShoppingListItemCollectionExpanderPlugin;
use Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList\ProductOfferItemToShoppingListItemMapperPlugin;
use Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList\ProductOfferShoppingListAddItemPreCheckPlugin;
use Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList\MerchantProductAddItemPreCheckPlugin;
use Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList\MerchantProductShoppingListItemBulkPostSavePlugin;
use Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList\MerchantProductShoppingListItemCollectionExpanderPlugin;
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList\MerchantProductOfferAddItemPreCheckPlugin;
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList\MerchantProductOfferShoppingListItemBulkPostSavePlugin;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [            
            new ProductOfferShoppingListAddItemPreCheckPlugin(),
            new ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin(),
            new MerchantProductOfferAddItemPreCheckPlugin(),
            new MerchantProductAddItemPreCheckPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemCollectionExpanderPluginInterface>
     */
    protected function getItemCollectionExpanderPlugins(): array
    {
        return [            
            new MerchantProductOfferShoppingListItemCollectionExpanderPlugin(),
            new MerchantProductShoppingListItemCollectionExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ItemToShoppingListItemMapperPluginInterface>
     */
    protected function getItemToShoppingListItemMapperPlugins(): array
    {
        return [        
            new ProductOfferItemToShoppingListItemMapperPlugin(),
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemBulkPostSavePluginInterface>
     */
    protected function getShoppingListItemBulkPostSavePlugins(): array
    {
        return [    
            new MerchantProductShoppingListItemBulkPostSavePlugin(),
            new MerchantProductOfferShoppingListItemBulkPostSavePlugin(),
        ];
    }
}
```

#### 3. Enable related widgets

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ShoppingListMerchantWidget | Enables merchant shopping list widget | None | SprykerShop\Yves\MerchantWidget\Widget |
| ShoppingListProductOfferWidget | Enables product offer in shopping list widget | None | SprykerShop\Yves\ProductOfferWidget\Widget |
| ProductOfferShoppingListWidget | Enables shopping list for product offer widget | None | SprykerShop\Yves\ProductOfferShoppingListWidget\Widget |

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
            ShoppingListMerchantWidget::class,
            ShoppingListProductOfferWidget::class,
            ProductOfferShoppingListWidget::class,
        ];
    }
}
```

### 4) Import data

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

#### 2. Add importer configuration
**data/import/local/full_EU.yml **
```csv
version: 0

actions:
    - data_entity: product-offer-shopping-list-item
      source: data/import/common/common/marketplace/product_offer_shopping_list_item.csv
```
#### 3. Adjust Data Import configuration
**src/Pyz/Zed/DataImport/DataImportConfig.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductOfferShoppingListDataImport\ProductOfferShoppingListDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
/**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [            
            ProductOfferShoppingListDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHOPPING_LIST_ITEM,
        ];
    }
}
```
#### 4. Enable required data import command

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php

<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\ProductOfferShoppingListDataImport\ProductOfferShoppingListDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
/**
 * @var string
 */
protected const COMMAND_SEPARATOR = ':';
    
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return array<\Symfony\Component\Console\Command\Command>
*/
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [                
                new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ProductOfferShoppingListDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHOPPING_LIST_ITEM),
            ];
            
        return $commands;
    }
}
```

#### 4. Register required Data Import plugin

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
            new ProductOfferShoppingListItemDataImportPlugin(),
        ];
    }
}
```

#### 5. 
```bash
console data:import console data:import product-offer-shopping-list-item
```

{% info_block warningBox "Verification" %}
Make sure that the imported data is added to the spy_shopping_list_item table.
{% endinfo_block %}

### 5) Add required functionality to Product storage

#### 3. Make changes to PublisherDependencyProvider 

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Publisher\Merchant\MerchantProductOfferWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(        
            new MerchantProductOfferWritePublisherPlugin(),
        );
    }
}
```

#### 3. Make changes to ProductStorageDependencyProvider 

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\ProductStorage;

use Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage\MerchantProductConcreteStorageCollectionExpanderPlugin;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductConcreteStorageCollectionExpanderPluginInterface>
     */
    protected function getProductConcreteStorageCollectionExpanderPlugins(): array
    {
        return [
            new MerchantProductConcreteStorageCollectionExpanderPlugin(),
        ];
    }
}
```

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | -|
| Shop Guide - Shopping Lists | {{page.version}} |  [Shop Guide - Shopping Lists](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-shopping-lists.html)  |
| Glue API: Marketplace Shopping Lists feature integration | {{page.version}} |  [Glue API: Marketplace Shopping List feature integration](/docs/marketplace/dev/feature-integration-guides/glue/{{page.version}}/marketplace-shopping-lists-feature-integration.html)  |

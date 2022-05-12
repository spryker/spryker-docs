---
title: Marketplace Shopping Lists feature integration
last_updated: April 13, 2022
description: This document describes the process how to integrate the Marketplace Shopping Lists feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Shopping Lists feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shopping Lists feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)  |
| Shopping Lists | {{page.version}} | [Shopping Lists feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shopping-lists-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-shopping-lists:"202204.0" --update-with-dependencies 
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferShoppingListWidget | spryker-shop/product-offer-shopping-list-widget |
| ProductOfferShoppingList | spryker/product-offer-shopping-list |
| ProductOfferShoppingListDataImport | spryker/product-offer-shopping-list-data-import |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

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

Run the `console propel:install` command:

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in the database:

| DATABASE ENTITY                                          | TYPE   | EVENT   |
|----------------------------------------------------------| ------ | ------- |
| spy_shopping_list_item.product_offer_reference           | column | created |

{% endinfo_block %}

### 3) Add translations

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

### 4) Configure export to Redis

Make changes to PublisherDependencyProvider

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
        return [        
            new MerchantProductOfferWritePublisherPlugin(),
        ];
    }
}
```

Make changes to ProductStorageDependencyProvider

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

### 5) Import data

To import data:
Prepare import data according to your requirements using demo data

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

#### Set up configuration
Add importer configuration

**data/import/local/full_EU.yml **
```csv
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
#### Enable required data import command

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

#### Set up behavior

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

#### Run import
```bash
console data:import product-offer-shopping-list-item
```

{% info_block warningBox "Verification" %}
Make sure that the imported data is added to the spy_shopping_list_item table.
{% endinfo_block %}

### Set up widgets

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
{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE | TEST                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ShoppingListMerchantWidget       | Go to the product page. Add concrete product to the shopping list, then login to the admin page. Find a merchant that owns a concrete product and change its state. Refresh shopping list page - item will change its status to 'Currently not available.'                                                                                                                                                                           |
| ShoppingListProductOfferWidget       | Go to the product page containing product offers. Select a product offer, e.g., `offer96`. Then open another tab and login to the merchant portal with the merchant's credentials who owns the previously selected product offer, in our case `michele@sony-experts.com`. Find product offer by SKU `offer96`. Change offer availability. Refresh shopping list page - item will change its status to 'Currently not available.'                                                                                                                                                   |
| ProductOfferShoppingListWidget       | Go to the product page and verify that the merchants' product offers are displayed and items are added to the shopping list with correct merchant names.                                                                                                                                                                                                                                                                    |

{% endinfo_block %}

### Set up behavior

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
    
    /**
     * @return array<\Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemToItemMapperPluginInterface>
     */
    protected function getShoppingListItemToItemMapperPlugins(): array
    {
        return [            
            new ProductOfferShoppingListItemToItemMapperPlugin(),
            new MerchantShoppingListItemToItemMapperPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE | TEST                                                                                                                                                               |
| ----------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ProductOfferShoppingListItemMapperPlugin       | Go to the product detail page and select product offer. Add product offer to shopping list. Open the shopping list and verify that the correct merchant and price are stored    |
| ProductOfferShoppingListItemToItemMapperPlugin       | Go to a product detail page and add a product offer to the shopping list. Open the shopping list and add the item to the cart. Make sure that the correct offer and price are added to the cart. |
| MerchantShoppingListItemToItemMapperPlugin       | Go to the product detail page and add the product to the shopping list. Open the shopping list and add the item to the cart. Make sure that the correct merchant and price are added to the cart.   |

{% endinfo_block %}

Enable the following behaviors in Zed by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferShoppingListAddItemPreCheckPlugin | Checks if a product offer exists and refers to the required product. | None | Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList; |
| MerchantProductAddItemPreCheckPlugin | Validates that the merchant of the product offer is active and approved                |   | Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList |
| MerchantProductConcreteStorageCollectionExpanderPlugin | Expands `ProductConcreteStorage` transfers with the merchant reference| None | Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage |
| MerchantProductOfferAddItemPreCheckPlugin | Validates that the merchant of the product offer is active and approved          |   | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductOfferShoppingListItemBulkPostSavePlugin | Expands a shopping list item that has a Product Offer with the merchant reference    |   | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductOfferShoppingListItemCollectionExpanderPlugin | Expands a `ShoppingListItemCollectionTransfer` with merchant data of the Product Offer| None | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
| MerchantProductShoppingListItemBulkPostSavePlugin | Expands a Shopping list item with Product Concrete with Merchant reference |   | Spryker\Zed\MerchantProduct\Communication\Plugin\ShoppingList |
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
{% info_block warningBox "Verification" %}

Make sure that the following plugins were registered:

| MODULE | TEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ProductOfferShoppingListAddItemPreCheckPlugin       | Go to a product page, containing product offers. Select product offer, e.g. `offer96`. Then open another tab and login to the merchant portal with the merchant's credentials who owns the previously selected product offer, in our case `michele@sony-experts.com`. Find product offer by SKU `offer96`. By changing the product offer by further pressing "Add to shopping list" on the PDP tab, check that product offer validation is enabled. The following cases may be checked: 1. Offer is not found 2. Product Offer does not belong to current store 3. The product offer is not active 4. The product offer is not approved |
| ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin       | Go to the product page, and select a concrete product. Then open another tab and login into the back office. Find concrete product selected on PDP by concrete SKU. Uncheck the current store option on the product edit page. Press "Add to shopping list" on the PDP tab to check that product store validation is enabled. An error message will appear.                                                                                                                                                                                                                                                                              |
| MerchantProductOfferAddItemPreCheckPlugin       | Go to the product page, containing product offers. Select product offer, e.g. `offer96`. Then open another tab and login to the back office, and find the merchant who owns the previously selected product offer, in our case `michele@sony-experts.com`. By changing the product offer by further pressing "Add to shopping list" on the PDP tab, check that product offer merchant validation is enabled. The following cases may be checked: 1. The merchant of the product offer is not active 2. The merchant of the product offer is not approved.                                                                                            |
| MerchantProductAddItemPreCheckPlugin       | Go to the product page and select a concrete product. Then open another tab and login to the admin page. Find the merchant that owns the concrete product and change its state. Press "Add to shopping list" on the PDP tab to check that product merchant status validation is enabled. The following cases may be checked: 1. The merchant that owns the product is not active 2. The merchant that owns the product is not approved.                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| MerchantProductOfferShoppingListItemCollectionExpanderPlugin       | Go to the product page, select merchant product offer, and add it to the shopping list. Open the shopping list and ensure the "Sold By" field shows the merchant that owns the corresponding product offer.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| MerchantProductShoppingListItemCollectionExpanderPlugin       | Go to the product page, select merchant product, and add it to the shopping list. Open the shopping list, and ensure the "Sold By" field shows the merchant that owns the product.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ProductOfferItemToShoppingListItemMapperPlugin       | Go to the product page, select merchant product offer, and add it to the cart. Open the cart and press "Add to shopping list." Ensure that the Shopping list contains selected product offers from the correct merchant.                                                                                                                                                                                                                                                                                                                                                                                                       |
| MerchantProductShoppingListItemBulkPostSavePlugin       | Go to the product detail page and add concrete to the shopping list. Open the shopping list and add the item to the cart. Ensure that the correct product and merchant are transferred from the shopping list to the cart.                                                                                                                                                                                                                                                                                                                                                                                                              |
| MerchantProductOfferShoppingListItemBulkPostSavePlugin       | Go to the product detail page and add concrete to the shopping list. Open the shopping list and add the item to the cart. Ensure that the correct product and merchant are transferred from the shopping list to the cart.                                                                                                                                                                                                                                                                                                                                                                                                                |

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | -|
| Shopping Lists | {{page.version}} | [Shopping Lists feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shopping-lists-feature-integration.html)  |
| Glue API: Marketplace Shopping Lists feature integration | {{page.version}} |  [Glue API: Marketplace Shopping Lists feature integration](/docs/marketplace/dev/feature-integration-guides/glue/{{page.version}}/marketplace-shopping-lists-feature-integration.html)  |

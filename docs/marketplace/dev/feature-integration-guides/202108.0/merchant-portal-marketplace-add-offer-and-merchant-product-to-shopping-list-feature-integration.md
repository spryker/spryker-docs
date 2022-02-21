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
| Marketplace Merchant | master | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Merchant Portal Marketplace Product | master | [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |
| Marketplace Product Offer | master | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)  |

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

#### 2. Enable the following behaviors in Zed by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferShoppingListAddItemPreCheckPlugin | Checks if product offer exists and refers to required product. | None | Spryker\Zed\ProductOfferShoppingList\Communication\Plugin\ShoppingList; |
| MerchantProductOfferShoppingListItemCollectionExpanderPlugin | Expands a `ShoppingListItemCollectionTransfer` with Merchant data of Product Offer| None | Spryker\Zed\MerchantProductOffer\Communication\Plugin\ShoppingList |
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

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            ...
            new ProductOfferShoppingListAddItemPreCheckPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemCollectionExpanderPluginInterface>
     */
    protected function getItemCollectionExpanderPlugins(): array
    {
        return [
            ...
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
            ...
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
# Example of demo shop 'combined shopping list items' data import.
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
            ...
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
            ...
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

#### 1. Adjust ProductStorageBusinessFactory

**src/Pyz/Zed/ProductStorage/Business/ProductStorageBusinessFactory.php**

```php
<?php

namespace Pyz\Zed\ProductStorage\Business;
 /**
     * @return \Spryker\Zed\ProductStorage\Business\Storage\ProductConcreteStorageWriterInterface
     */
    public function createProductConcreteStorageWriter(): ProductConcreteStorageWriterInterface
    {
        if (!$this->getConfig()->isCteEnabled()) {
            return parent::createProductConcreteStorageWriter();
        }

        return new ProductConcreteStorageWriter(
            $this->getProductFacade(),
            $this->getQueryContainer(),
            $this->getConfig()->isSendingToQueue(),
        +   $this->getProductConcreteStorageCollectionExpanderPlugins(),
            $this->getSynchronizationService(),
            $this->getQueueClient(),
            $this->createProductConcreteStorageCteStrategyResolver()->resolve(),
        );
    }
}
```
#### 2. Adjust Product Concrete Storage Writer 
**src/Pyz/Zed/ProductStorage/Business/Storage/ProductConcreteStorageWriter.php**
```php
<?php

namespace Pyz\Zed\ProductStorage\Business\Storage;

public function __construct(
        ProductStorageToProductInterface $productFacade,
        ProductStorageQueryContainerInterface $queryContainer,
        $isSendingToQueue,
        array $productConcreteStorageCollectionExpanderPlugins,
        SynchronizationServiceInterface $synchronizationService,
        QueueClientInterface $queueClient,
        ProductStorageCteStrategyInterface $productConcreteStorageCte
    ) {
        parent::__construct($productFacade, $queryContainer, $isSendingToQueue, $productConcreteStorageCollectionExpanderPlugins);

        $this->synchronizationService = $synchronizationService;
        $this->queueClient = $queueClient;
        $this->productConcreteStorageCte = $productConcreteStorageCte;
    }

   ...
    /**
     * @param array $productConcreteLocalizedEntities
     * @param array<\Orm\Zed\ProductStorage\Persistence\SpyProductConcreteStorage> $productConcreteStorageEntities
     *
     * @return void
     */
    protected function storeData(array $productConcreteLocalizedEntities, array $productConcreteStorageEntities): void
    {
        $pairedEntities = $this->pairProductConcreteLocalizedEntitiesWithProductConcreteStorageEntities(
            $productConcreteLocalizedEntities,
            $productConcreteStorageEntities,
        );

        $productConcreteStorageTransfers = $this->getProductConcreteStorageTransfers($pairedEntities);

        $this->expandProductConcreteStorageCollection($productConcreteStorageTransfers);

        foreach ($pairedEntities as $index => $pair) {
            $productConcreteLocalizedEntity = $pair[static::PRODUCT_CONCRETE_LOCALIZED_ENTITY];
            $productConcreteStorageEntity = $pair[static::PRODUCT_CONCRETE_STORAGE_ENTITY];

            if ($productConcreteLocalizedEntity === null || !$this->isActive($productConcreteLocalizedEntity)) {
                $this->deletedProductConcreteSorageEntity($productConcreteStorageEntity);

                continue;
            }

            $this->storeProductConcreteStorageEntity(
                $productConcreteStorageTransfers[$index],
                $productConcreteStorageEntity,
                $pair[static::LOCALE_NAME],
            );
        }

        $this->write();

        if ($this->synchronizedMessageCollection !== []) {
            $this->queueClient->sendMessages('sync.storage.product', $this->synchronizedMessageCollection);
        }
    }

     /**
     * @param \Generated\Shared\Transfer\ProductConcreteStorageTransfer $productConcreteStorageTransfer
     * @param \Orm\Zed\ProductStorage\Persistence\SpyProductConcreteStorage $productConcreteStorageEntity
     * @param string $localeName
     *
     * @return void
     */
    protected function storeProductConcreteStorageEntity(
        ProductConcreteStorageTransfer $productConcreteStorageTransfer,
        SpyProductConcreteStorage $productConcreteStorageEntity,
        $localeName
    ): void {
        $productConcreteStorageData = [
            'fk_product' => $productConcreteStorageTransfer->getIdProductConcrete(),
            'data' => $productConcreteStorageTransfer->toArray(),
            'locale' => $localeName,
        ];

        $this->add($productConcreteStorageData);
    }
```

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
        ...
        $this->getMerchantProductOfferStoragePlugins(),
        );
    }    
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getMerchantProductOfferStoragePlugins(): array
    {
        return [
            new MerchantProductOfferWritePublisherPlugin(),
        ];
    }
}
```

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | -|
| Shop Guide - Shopping Lists |  |  [Shop Guide - Shopping Lists](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-shopping-lists.html)  |
| Marketplace Product and Product Offer Shopping List Api Integration |  |  [Marketplace Product and Product Offer Shopping List API integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-packaging-units-feature-integration.html)  |

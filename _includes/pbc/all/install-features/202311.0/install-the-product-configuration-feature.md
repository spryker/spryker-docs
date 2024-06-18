

This document describes how to install the [Product Configuration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) feature.


## Install feature core

Follow the steps below to install the Product Configuration feature core.

### Prerequisites

Install the required features:

| NAME                 | VERSION          | INSTALLATION GUIDE                                                                                                                                    |
|----------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core         | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                 |
| Product              | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                           |
| Cart                 | {{page.version}} | [Cart feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                 |
| Order Management     | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)         |
| Checkout             | {{page.version}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html)                         |
| Prices               | {{page.version}} | [Prices feature integration](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)                    |
| Inventory Management | {{page.version}} | [Inventory management feature integration](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) |
| Wishlist             | {{page.version}} ||
| ShoppingList         | {{page.version}} | [Shopping Lists feature integration](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shopping-lists-feature.html)             |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker-feature/configurable-product":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                                   |
|------------------------------------|------------------------------------------------------|
| ProductConfiguration               | vendor/spryker/product-configuration                 |
| ProductConfigurationCart           | vendor/spryker/product-configuration-cart            |
| ProductConfigurationDataImport     | vendor/spryker/product-configuration-data-import     |
| ProductConfigurationGui            | vendor/spryker/product-configuration-gui             |
| ProductConfigurationPersistentCart | vendor/spryker/product-configuration-persistent-cart |
| ProductConfigurationStorage        | vendor/spryker/product-configuration-storage         |
| ProductConfigurationWishlist       | vendor/spryker/product-configuration-wishlist        |
| ProductConfigurationShoppingList   | vendor/spryker/product-configuration-shopping-list   |
| SalesProductConfiguration          | vendor/spryker/sales-product-configuration           |
| SalesProductConfigurationGui       | vendor/spryker/sales-product-configuration-gui       |

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

| CONFIGURATION                                                                         | SPECIFICATION                                                                                                                                                         | NAMESPACE                                                         |
|---------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY            | Provides an encryption key for checksum validation. It is used for the checksum generation of the product configurator data based on the provided key.                | Spryker\Shared\ProductConfiguration\ProductConfigurationConstants |
| ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR | Provides a hex initialization vector for the checksum validation. It is used as a hex initialization vector for the checksum generation of product configurator data. | Spryker\Shared\ProductConfiguration\ProductConfigurationConstants |
| KernelConstants::DOMAIN_WHITELIST                                                     | Defines a set of whitelist domains that every external URL is checked against before redirecting.                                                                     | Spryker\Shared\Kernel\KernelConstants                             |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\ProductConfiguration\ProductConfigurationConstants;

// >>> Product Configuration
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY') ?: 'change123';
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR') ?: '0c1ffefeebdab4a3d839d0e52590c9a2';
$config[KernelConstants::DOMAIN_WHITELIST][] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_HOST');
```

{% info_block warningBox "Verification" %}

To make sure that the changes have been applied, check that the exemplary product configurator opens at `http://date-time-configurator-example.mysprykershop.com`.

{% endinfo_block %}

{% info_block infoBox %}

You can control whether particular fields must be filtered out and not used for Product Configuration instance hash generation. You can do it through the `ProductConfigurationConfig::getConfigurationFieldsNotAllowedForEncoding()` config setting.

{% endinfo_block %}

**src/Pyz/Service/ProductConfiguration/ProductConfigurationConfig.php**

```php
<?php

namespace Pyz\Service\ProductConfiguration;

use Generated\Shared\Transfer\ProductConfigurationInstanceTransfer;
use Spryker\Service\ProductConfiguration\ProductConfigurationConfig as SprykerProductConfigurationConfig;

class ProductConfigurationConfig extends SprykerProductConfigurationConfig
{
    /**
     * @return list<string>
     */
    public function getConfigurationFieldsNotAllowedForEncoding(): array
    {
        return [
            ProductConfigurationInstanceTransfer::QUANTITY,
        ];
    }
}
```

{% info_block warningBox "Warning" %}

Specify only fields that are defined in the transfer definition. Otherwise, you must define them on the project level.

{% endinfo_block %}

**src/Pyz/Shared/ProductConfiguration/Transfer/product_configuration.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="ProductConfigurationInstance">
        <property name="quantity" type="int"/>
    </transfer>
</transfers>
```

### 3) Set up database schema and transfer objects

1. For entity changes to trigger events, adjust the schema definition:

**src/Pyz/Zed/ProductConfiguration/Persistence/Propel/Schema/spy_product_configuration.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductConfiguration\Persistence" package="src.Orm.Zed.ProductConfiguration.Persistence">
   <table name="spy_product_configuration">
      <behavior name="event">
         <parameter name="spy_product_configuration_all" column="*"/>
      </behavior>
   </table>
</database>

```

| AFFECTED ENTITY           | TRIGGERED EVENTS                                                                                                                    |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| spy_product_configuration | Entity.spy_product_configuration.create  <br> Entity.spy_product_configuration.update  <br> Entity.spy_product_configuration.delete |

**src/Pyz/Zed/ProductConfigurationStorage/Persistence/Propel/Schema/spy_product_configuration_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductConfigurationStorage\Persistence" package="src.Orm.Zed.ProductConfigurationStorage.Persistence">
   <table name="spy_product_configuration_storage">
      <behavior name="synchronization">
         <parameter name="queue_pool" value="synchronizationPool"/>
      </behavior>
   </table>
</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                                            | TYPE   | EVENT   |
|------------------------------------------------------------|--------|---------|
| spy_product_configuration                                  | table  | created |
| spy_product_configuration_storage                          | table  | created |
| spy_sales_order_item_configuration                         | table  | created |
| spy_wishlist_item.product_configuration_instance_data      | column | added   |
| spy_shopping_list_item.product_configuration_instance_data | column | added   |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                                             | TYPE  | EVENT   | PATH                                                                               |
|------------------------------------------------------|-------|---------|------------------------------------------------------------------------------------|
| CartChangeTransfer                                   | class | created | src/Generated/Shared/Transfer/CartChangeTransfer                                   |
| CartItemQuantityTransfer                             | class | created | src/Generated/Shared/Transfer/CartItemQuantityTransfer                             |
| CheckoutErrorTransfer                                | class | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer                                |
| CheckoutResponseTransfer                             | class | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer                             |
| CompanyUserTransfer                                  | class | created | src/Generated/Shared/Transfer/CompanyUserTransfer                                  |
| CurrencyTransfer                                     | class | created | src/Generated/Shared/Transfer/CurrencyTransfer                                     |
| CustomerTransfer                                     | class | created | src/Generated/Shared/Transfer/CustomerTransfer                                     |
| DataImporterConfigurationTransfer                    | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer                    |
| DataImporterReportTransfer                           | class | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                           |
| ErrorTransfer                                        | class | created | src/Generated/Shared/Transfer/ErrorTransfer                                        |
| FilterTransfer                                       | class | created | src/Generated/Shared/Transfer/FilterTransfer                                       |
| ItemTransfer                                         | class | created | src/Generated/Shared/Transfer/ItemTransfer                                         |
| ItemReplaceTransfer                                  | class | created | src/Generated/Shared/Transfer/ItemReplaceTransfer                                  |
| MessageTransfer                                      | class | created | src/Generated/Shared/Transfer/MessageTransfer                                      |
| MoneyValueTransfer                                   | class | created | src/Generated/Shared/Transfer/MoneyValueTransfer                                   |
| OrderTransfer                                        | class | created | src/Generated/Shared/Transfer/OrderTransfer                                        |
| PaginationTransfer                                   | class | created | src/Generated/Shared/Transfer/PaginationTransfer                                   |
| PersistentCartChangeTransfer                         | class | created | src/Generated/Shared/Transfer/PersistentCartChangeTransfer                         |
| PriceProductTransfer                                 | class | created | src/Generated/Shared/Transfer/PriceProductTransfer                                 |
| PriceProductDimensionTransfer                        | class | created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer                        |
| PriceProductFilterTransfer                           | class | created | src/Generated/Shared/Transfer/PriceProductFilterTransfer                           |
| ProductConcreteTransfer                              | class | created | src/Generated/Shared/Transfer/ProductConcreteTransfer                              |
| ProductConfigurationTransfer                         | class | created | src/Generated/Shared/Transfer/ProductConfigurationTransfer                         |
| ProductConfigurationAggregationTransfer              | class | created | src/Generated/Shared/Transfer/ProductConfigurationAggregationTransfer              |
| ProductConfigurationCollectionTransfer               | class | created | src/Generated/Shared/Transfer/ProductConfigurationCollectionTransfer               |
| ProductConfigurationConditionsTransfer               | class | created | src/Generated/Shared/Transfer/ProductConfigurationConditionsTransfer               |
| ProductConfigurationCriteriaTransfer                 | class | created | src/Generated/Shared/Transfer/ProductConfigurationCriteriaTransfer                 |
| ProductConfigurationFilterTransfer                   | class | created | src/Generated/Shared/Transfer/ProductConfigurationFilterTransfer                   |
| ProductConfigurationInstanceTransfer                 | class | created | src/Generated/Shared/Transfer/ProductConfigurationInstanceTransfer                 |
| ProductConfigurationInstanceCollectionTransfer       | class | created | src/Generated/Shared/Transfer/ProductConfigurationInstanceCollectionTransfer       |
| ProductConfigurationInstanceConditionsTransfer       | class | created | src/Generated/Shared/Transfer/ProductConfigurationInstanceConditionsTransfer       |
| ProductConfigurationInstanceCriteriaTransfer         | class | created | src/Generated/Shared/Transfer/ProductConfigurationInstanceCriteriaTransfer         |
| ProductConfigurationStorageTransfer                  | class | created | src/Generated/Shared/Transfer/ProductConfigurationStorageTransfer                  |
| ProductConfiguratorPageResponseTransfer              | class | created | src/Generated/Shared/Transfer/ProductConfiguratorPageResponseTransfer              |
| ProductConfiguratorRedirectTransfer                  | class | created | src/Generated/Shared/Transfer/ProductConfiguratorRedirectTransfer                  |
| ProductConfiguratorRequestTransfer                   | class | created | src/Generated/Shared/Transfer/ProductConfiguratorRequestTransfer                   |
| ProductConfiguratorRequestDataTransfer               | class | created | src/Generated/Shared/Transfer/ProductConfiguratorRequestDataTransfer               |
| ProductConfiguratorResponseTransfer                  | class | created | src/Generated/Shared/Transfer/ProductConfiguratorResponseTransfer                  |
| ProductConfiguratorResponseProcessorResponseTransfer | class | created | src/Generated/Shared/Transfer/ProductConfiguratorResponseProcessorResponseTransfer |
| ProductStorageCriteriaTransfer                       | class | created | src/Generated/Shared/Transfer/ProductStorageCriteriaTransfer                       |
| ProductViewTransfer                                  | class | created | src/Generated/Shared/Transfer/ProductViewTransfer                                  |
| QuoteTransfer                                        | class | created | src/Generated/Shared/Transfer/QuoteTransfer                                        |
| QuoteErrorTransfer                                   | class | created | src/Generated/Shared/Transfer/QuoteErrorTransfer                                   |
| QuoteRequestTransfer                                 | class | created | src/Generated/Shared/Transfer/QuoteRequestTransfer                                 |
| QuoteRequestResponseTransfer                         | class | created | src/Generated/Shared/Transfer/QuoteRequestResponseTransfer                         |
| QuoteRequestVersionTransfer                          | class | created | src/Generated/Shared/Transfer/QuoteRequestVersionTransfer                          |
| QuoteResponseTransfer                                | class | created | src/Generated/Shared/Transfer/QuoteResponseTransfer                                |
| SalesOrderItemConfigurationTransfer                  | class | created | src/Generated/Shared/Transfer/SalesOrderItemConfigurationTransfer                  |
| SalesOrderItemConfigurationFilterTransfer            | class | created | src/Generated/Shared/Transfer/SalesOrderItemConfigurationFilterTransfer            |
| SalesProductConfigurationTemplateTransfer            | class | created | src/Generated/Shared/Transfer/SalesProductConfigurationTemplateTransfer            |
| SaveOrderTransfer                                    | class | created | src/Generated/Shared/Transfer/SaveOrderTransfer                                    |
| ShoppingListTransfer                                 | class | created | src/Generated/Shared/Transfer/ShoppingListTransfer                                 |
| ShoppingListItemTransfer                             | class | created | src/Generated/Shared/Transfer/ShoppingListItemTransfer                             |
| ShoppingListItemCollectionTransfer                   | class | created | src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer                   |
| ShoppingListItemResponseTransfer                     | class | created | src/Generated/Shared/Transfer/ShoppingListItemResponseTransfer                     |
| ShoppingListPreAddItemCheckResponseTransfer          | class | created | src/Generated/Shared/Transfer/ShoppingListPreAddItemCheckResponseTransfer          |
| SortTransfer                                         | class | created | src/Generated/Shared/Transfer/SortTransfer                                         |
| StoreTransfer                                        | class | created | src/Generated/Shared/Transfer/StoreTransfer                                        |
| SynchronizationDataTransfer                          | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer                          |
| WishlistTransfer                                     | class | created | src/Generated/Shared/Transfer/WishlistTransfer                                     |
| WishlistItemTransfer                                 | class | created | src/Generated/Shared/Transfer/WishlistItemTransfer                                 |
| WishlistItemCollectionTransfer                       | class | created | src/Generated/Shared/Transfer/WishlistItemCollectionTransfer                       |
| WishlistItemCriteriaTransfer                         | class | created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer                         |
| WishlistItemMetaTransfer                             | class | created | src/Generated/Shared/Transfer/WishlistItemMetaTransfer                             |
| WishlistItemResponseTransfer                         | class | created | src/Generated/Shared/Transfer/WishlistItemResponseTransfer                         |
| WishlistMoveToCartRequestTransfer                    | class | created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer                    |
| WishlistMoveToCartRequestCollectionTransfer          | class | created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestCollectionTransfer          |
| WishlistPreAddItemCheckResponseTransfer              | class | created | src/Generated/Shared/Transfer/WishlistPreAddItemCheckResponseTransfer              |
| WishlistPreUpdateItemCheckResponseTransfer           | class | created | src/Generated/Shared/Transfer/WishlistPreUpdateItemCheckResponseTransfer           |

{% endinfo_block %}

### 4) Set up behavior

Set up the following behaviors:

1. Set up Publishers and a Queue processor:

| PLUGIN                                            | SPECIFICATION                                                                                                    | PREREQUISITES  | NAMESPACE                                                                                   |
|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------|----------------|---------------------------------------------------------------------------------------------|
| ProductConfigurationWritePublisherPlugin          | Updates product configuration when triggered by provided product configuration events.                           | None           | Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration |
| ProductConfigurationDeletePublisherPlugin         | Removes all data from the product configuration storage when triggered by provided product configuration events. | None           | Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration |
| SynchronizationStorageQueueMessageProcessorPlugin | Reads messages from the synchronization queue and saves them to the storage.                                     | None           | \Spryker\Zed\Synchronization\Communication\Plugin\Queue                                     |


**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration\ProductConfigurationDeletePublisherPlugin;
use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration\ProductConfigurationWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
             $this->getProductConfigurationStoragePlugins()
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductConfigurationStoragePlugins(): array
    {
        return [
            new ProductConfigurationWritePublisherPlugin(),
            new ProductConfigurationDeletePublisherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ProductConfigurationStorage\ProductConfigurationStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ProductConfigurationStorageConfig::PRODUCT_CONFIGURATION_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Shared\ProductConfigurationStorage\ProductConfigurationStorageConfig;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array<mixed>
     */
    protected function getQueueConfiguration(): array
    {
        return [
            ProductConfigurationStorageConfig::PRODUCT_CONFIGURATION_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, after creating a product configuration, you can find the corresponding record in the `spy_product_configuration_storage` table.

{% endinfo_block %}

2. Set up, regenerate, and resync features by setting up the following plugins:

| PLUGIN                                                  | SPECIFICATION                                                                                              | PREREQUISITES  | NAMESPACE                                                                    |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------------------|
| ProductConfigurationPublisherTriggerPlugin              | Triggers publish events for product configuration data.                                                    | None           | Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher       |
| ProductConfigurationSynchronizationDataRepositoryPlugin | Allows synchronizing the content of the entire `spy_product_configuration_storage` table into the storage. | None           | Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfigurationPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductConfigurationPublisherTriggerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductConfigurationStorage/ProductConfigurationStorageConfig.php**

```php
<?PHP

namespace Pyz\Zed\ProductConfigurationStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductConfigurationStorage\ProductConfigurationStorageConfig as SprykerProductConfigurationStorageConfig;

class ProductConfigurationStorageConfig extends SprykerProductConfigurationStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductConfigurationSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Synchronization\ProductConfigurationSynchronizationDataRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductConfigurationSynchronizationDataRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product configuration trigger plugin works correctly:
1.  Fill the `spy_product_configuration` table with some data.
2.  Run the `console publish:trigger-events -r product_configuration` command.
3.  Make sure that the `spy_product_configuration_storage` table has been filled with respective data.
4.  In your system, make sure that storage entries are displayed with the `kv:product_configuration:sku` mask.

Make sure that the product configuration synchronization plugin works correctly:
1.  Fill the `spy_product_configuration_storage` table with some data.
2.  Run the `console sync:data product_configuration` command.
3.  In your system, make sure that the storage entries are displayed with the `kv:product_configuration:sku` mask.

{% endinfo_block %}

3. Set up quantity counter plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                                                                                | PREREQUISITES  | NAMESPACE                                                                           |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------------------------------------|
| ProductConfigurationCartItemQuantityCounterStrategyPlugin | Finds a provided item in a provided cart. Counts the item quantity by the item SKU and the product configuration instance. Returns the item quantity.                                        | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Availability              |
| ProductConfigurationCartItemQuantityCounterStrategyPlugin | Finds a provided item in a provided cart. Counts the item quantity by the item SKU and the product configuration instance. Returns the item quantity.                                        | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\AvailabilityCartConnector |
| ProductConfigurationCartItemQuantityCounterStrategyPlugin | Finds a provided item in a provided changed cart. Counts the item quantity by the item SKU and the product configuration instance in add and subtract directions. Returns the item quantity. | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector        |

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Availability\ProductConfigurationCartItemQuantityCounterStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface>
     */
    protected function getCartItemQuantityCounterStrategyPlugins(): array
    {
        return [
            new ProductConfigurationCartItemQuantityCounterStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AvailabilityCartConnector/AvailabilityCartConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AvailabilityCartConnector;

use Spryker\Zed\AvailabilityCartConnector\AvailabilityCartConnectorDependencyProvider as SprykerAbstractBundleDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\AvailabilityCartConnector\ProductConfigurationCartItemQuantityCounterStrategyPlugin;

class AvailabilityCartConnectorDependencyProvider extends SprykerAbstractBundleDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface>
     */
    public function getCartItemQuantityCounterStrategyPlugins(): array
    {
        return [
            new ProductConfigurationCartItemQuantityCounterStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider as SprykerPriceCartConnectorDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector\ProductConfigurationCartItemQuantityCounterStrategyPlugin;

class PriceCartConnectorDependencyProvider extends SprykerPriceCartConnectorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PriceCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface>
     */
    protected function getCartItemQuantityCounterStrategyPlugins(): array
    {
        return [
            new ProductConfigurationCartItemQuantityCounterStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product configuration item quantity counter plugins work correctly:
1. Configure a configurable product.
2. Add the product to the cart.
3. Make sure that the product has been successfully added to the cart.

{% endinfo_block %}

4. Set up cart plugins:

| PLUGIN                                                  | SPECIFICATION                                                                           | PREREQUISITES  | NAMESPACE                                                               |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------|----------------|-------------------------------------------------------------------------|
| ProductConfigurationGroupKeyItemExpanderPlugin          | Expands the items that have a product configuration instance property with a group key. | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Cart          |
| ProductConfigurationCartChangeRequestExpanderPlugin     | Expands provided changed cart items with product configuration instances.               | None           | Spryker\Client\ProductConfigurationCart\Plugin\Cart                     |
| ProductConfigurationPersistentCartRequestExpanderPlugin | Expands provided changed persistent cart items with product configuration instances.    | None           | Spryker\Client\ProductConfigurationPersistentCart\Plugin\PersistentCart |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Cart\ProductConfigurationGroupKeyItemExpanderPlugin;

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
            new ProductConfigurationGroupKeyItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Cart;

use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductConfigurationCart\Plugin\Cart\ProductConfigurationCartChangeRequestExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return array<\Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface>
     */
    protected function getAddItemsRequestExpanderPlugins()
    {
        return [
            new ProductConfigurationCartChangeRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Client\ProductConfigurationPersistentCart\Plugin\PersistentCart\ProductConfigurationPersistentCartRequestExpanderPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @return array<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface>
     */
    protected function getChangeRequestExtendPlugins(): array
    {
        return [
            new ProductConfigurationPersistentCartRequestExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the cart plugins work correctly:
1. Configure a configurable product.
2. Add the configured product to the cart.
3. Make sure that the product has been successfully added to the cart.

{% endinfo_block %}

5. Set up checkout plugins:

| PLUGIN                                         | SPECIFICATION                                                                                          | PREREQUISITES  | NAMESPACE                                                          |
|------------------------------------------------|--------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------------|
| ProductConfigurationCheckoutPreConditionPlugin | Returns `true` if all product configuration items in a quote are complete. Otherwise, returns `false`. | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Checkout |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Checkout\ProductConfigurationCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            new ProductConfigurationCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that checkout plugins work correctly:
1. Add a configurable product to the cart without completing its configuration.
2. Try to place an order with the product.
3. Make sure that the order is not placed and you get an error message about incomplete configuration.

{% endinfo_block %}

6. Set up product management plugins:

| PLUGIN                                                 | SPECIFICATION                                                                        | PREREQUISITES  | NAMESPACE                                                                  |
|--------------------------------------------------------|--------------------------------------------------------------------------------------|----------------|----------------------------------------------------------------------------|
| ProductConfigurationProductTableDataBulkExpanderPlugin | Expands product items with a configurable product type if they have a configuration. | None           | Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement |

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement\ProductConfigurationProductTableDataBulkExpanderPlugin
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataBulkExpanderPluginInterface>
     */
    protected function getProductTableDataBulkExpanderPlugins(): array
    {
        return [
            new ProductConfigurationProductTableDataBulkExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Check that product management plugins work correctly:
1. Add the configuration to the product using data import.
2. In the Back Office, go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.
3. Find a product with a configuration that you created before.
4. Check that product is marked as configurable.

{% endinfo_block %}

7. Set up sales plugins:

| PLUGIN                                      | SPECIFICATION                                                                                                | PREREQUISITES  | NAMESPACE                                                        |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------|
| ProductConfigurationOrderItemExpanderPlugin | Expands items with product configuration.                                                                    | None           | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderItemExpanderPlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderItemsPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ProductConfigurationOrderItemsPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that sales plugins work correctly:
1. Configure a configurable product.
2. Place an order with the product.
3. Check that the `spy_sales_order_item_configuration` database table contains a record with the configurable order item.

{% endinfo_block %}

8. Set up price product plugins:

| PLUGIN                                                     | SPECIFICATION                                                                                                             | PREREQUISITES  | NAMESPACE                                                                    |
|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------------------|
| ProductConfigurationPriceProductExpanderPlugin             | Expands the list of price product transfers with product configuration prices.                                            | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector |
| ProductConfigurationPriceProductFilterPlugin               | Filters out all but product configuration prices.                                                                         | None           | Spryker\Service\ProductConfiguration\Plugin\PriceProduct                     |
| ProductConfigurationVolumePriceProductFilterPlugin         | Finds a corresponding volume price for a provided quantity.                                                               | None           | Spryker\Service\ProductConfiguration\Plugin\PriceProduct                     |
| ProductConfigurationStoragePriceDimensionPlugin            | Returns product configuration prices. If a product configuration instance or prices weren't set, returns an empty array . | None           | Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage        |
| ProductConfigurationPriceProductFilterExpanderPlugin       | Expands `PriceProductFilterTransfer` with a product configuration instance.                                               | None           | Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage        |
| PriceProductVolumeProductConfigurationPriceExtractorPlugin | Extracts volume prices from price product data.                                                                           | None           | Spryker\Client\ProductConfiguration\Plugin                                   |

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider as SprykerPriceCartConnectorDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector\ProductConfigurationPriceProductExpanderPlugin;

class PriceCartConnectorDependencyProvider extends SprykerPriceCartConnectorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PriceCartConnectorExtension\Dependency\Plugin\PriceProductExpanderPluginInterface>
     */
    protected function getPriceProductExpanderPlugins(): array
    {
        return [
            new ProductConfigurationPriceProductExpanderPlugin(),
        ];
    }
}
```


**src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationPriceProductFilterPlugin;
use Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationVolumePriceProductFilterPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * @return array<\Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface>
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
            new ProductConfigurationPriceProductFilterPlugin(),
            new ProductConfigurationVolumePriceProductFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;
use Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage\ProductConfigurationPriceProductFilterExpanderPlugin;
use Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage\ProductConfigurationStoragePriceDimensionPlugin;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface>
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new ProductConfigurationStoragePriceDimensionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductFilterExpanderPluginInterface>
     */
    protected function getPriceProductFilterExpanderPlugins(): array
    {
        return [
            new ProductConfigurationPriceProductFilterExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/ProductConfiguration/ProductConfigurationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductConfiguration;

use Spryker\Client\ProductConfiguration\Plugin\PriceProductVolumeProductConfigurationPriceExtractorPlugin;
use Spryker\Client\ProductConfiguration\ProductConfigurationDependencyProvider as SprykerProductConfigurationDependencyProvider;

class ProductConfigurationDependencyProvider extends SprykerProductConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductConfigurationExtension\Dependency\Plugin\ProductConfigurationPriceExtractorPluginInterface>
     */
    protected function getProductConfigurationPriceExtractorPlugins(): array
    {
        return [
            new PriceProductVolumeProductConfigurationPriceExtractorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product configuration price overrides the default product price:
1. Configure a configurable product with a regular price and volume price.
2. Add the product to the cart with the amount required for the volume prices to apply.
3. Make sure that the volume price applies.

{% endinfo_block %}

9. Set up availability plugins:

| PLUGIN                                                | SPECIFICATION                                                                  | PREREQUISITES  | NAMESPACE                                                             |
|-------------------------------------------------------|--------------------------------------------------------------------------------|----------------|-----------------------------------------------------------------------|
| ProductConfigurationAvailabilityStorageStrategyPlugin | Checks whether a product configuration provides an availability for a product. | None           | Spryker\Client\ProductConfigurationStorage\Plugin\AvailabilityStorage |

**src/Pyz/Client/AvailabilityStorage/AvailabilityStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AvailabilityStorage;

use Spryker\Client\AvailabilityStorage\AvailabilityStorageDependencyProvider as SprykerAvailabilityStorageDependencyProvider;
use Spryker\Client\ProductConfigurationStorage\Plugin\AvailabilityStorage\ProductConfigurationAvailabilityStorageStrategyPlugin;

class AvailabilityStorageDependencyProvider extends SprykerAvailabilityStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AvailabilityStorageExtension\Dependency\Plugin\AvailabilityStorageStrategyPluginInterface>
     */
    public function getAvailabilityStorageStrategyPlugins(): array
    {
        return [
            new ProductConfigurationAvailabilityStorageStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that availability plugins work correctly:
1. Configure a configurable product that has regular availability.
2. Make sure that you cannot add to the cart more items than are available for the configuration.


{% endinfo_block %}

10. Set up product plugins:

| PLUGIN                                        | SPECIFICATION                           | PREREQUISITES  | NAMESPACE                                                        |
|-----------------------------------------------|-----------------------------------------|----------------|------------------------------------------------------------------|
| ProductViewProductConfigurationExpanderPlugin | Expands a product with a configuration. | None           | Spryker\Client\ProductConfigurationStorage\Plugin\ProductStorage |

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\ProductConfigurationStorage\Plugin\ProductStorage\ProductViewProductConfigurationExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface>
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductViewProductConfigurationExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the **Product Details** page of a configurable product, make sure that you can see product configuration information.

{% endinfo_block %}

11. Set up product configuration check plugins for the quote request module:

| PLUGIN                                           | SPECIFICATION                                                      | PREREQUISITES  | NAMESPACE                                                   |
|--------------------------------------------------|--------------------------------------------------------------------|----------------|-------------------------------------------------------------|
| ProductConfigurationQuoteRequestQuoteCheckPlugin | Validates product configuration before the quote request creation. | None           | Spryker\Client\ProductConfigurationCart\Plugin\QuoteRequest |

**src/Pyz/Client/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuoteRequest;

use Spryker\Client\ProductConfigurationCart\Plugin\QuoteRequest\ProductConfigurationQuoteRequestQuoteCheckPlugin;
use Spryker\Client\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Client\QuoteRequestExtension\Dependency\Plugin\QuoteRequestQuoteCheckPluginInterface>
     */
    protected function getQuoteRequestQuoteCheckPlugins(): array
    {
        return [
            new ProductConfigurationQuoteRequestQuoteCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the plugins work correctly:
1. Add a configurable product with an incomplete configuration to the cart.
2. Check that the Checkout and Request for quote buttons are not available.

{% endinfo_block %}

12. Set up product configuration validation plugins for the quote request module:

| PLUGIN                                              | SPECIFICATION                                                       | PREREQUISITES  | NAMESPACE                                                              |
|-----------------------------------------------------|---------------------------------------------------------------------|----------------|------------------------------------------------------------------------|
| ProductConfigurationQuoteRequestValidatorPlugin     | Validates customers' quote requests with the validators stack.      | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest |
| ProductConfigurationQuoteRequestUserValidatorPlugin | Validates agents assists' quote requests with the validators stack. | None           | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest |

**src/Pyz/Zed/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\QuoteRequest;

use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest\ProductConfigurationQuoteRequestUserValidatorPlugin;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest\ProductConfigurationQuoteRequestValidatorPlugin;
use Spryker\Zed\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestValidatorPluginInterface>
     */
    protected function getQuoteRequestValidatorPlugins(): array
    {
        return [
            new ProductConfigurationQuoteRequestValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestUserValidatorPluginInterface>
     */
    protected function getQuoteRequestUserValidatorPlugins(): array
    {
        return [
            new ProductConfigurationQuoteRequestUserValidatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the plugins work correctly:

1. Log in as an agent assist.
2. Add a configurable product with an incomplete configuration to the cart.
3. Select **Save** or **Save and Back to Edit**.
4. Make sure that the validation error message appears.

{% endinfo_block %}

13. Set up wishlist plugins:

| PLUGIN                                                             | SPECIFICATION                                                                                                         | PREREQUISITES  | NAMESPACE                                                              |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------------|
| ProductConfigurationItemExpanderPlugin                             | Expands the `WishlistItem` transfer object with product configuration data.                                           | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistAddItemPreCheckPlugin                  | Checks whether product configuration exists by provided `WishlistItem.sku` transfer property.                         | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistReloadItemsPlugin                      | Expands the `WishlistItem` transfers collection in `Wishlist` transfer object with product configuration data.        | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistPreAddItemPlugin                       | Prepares product configuration attached to a wishlist item to be saved.                                               | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistItemExpanderPlugin                     | Expands the `WishlistItem` transfer object with product configuration data.                                           | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistPreUpdateItemPlugin                    | Prepares product configuration attached to a wishlist item to be saved.                                               | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistUpdateItemPreCheckPlugin               | Checks whether product configuration exists by the provided `WishlistItem.sku` transfer property.                     | None           | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
| ProductConfigurationWishlistCollectionToRemoveExpanderPlugin       | Expands `WishlistItemCollectionTransfer` with successfully added wishlist items to a cart.                            | None           | Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist            |
| ProductConfigurationWishlistPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollectionTransfer` with not valid product configuration items.                     | None           | Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist            |
| ProductConfigurationWishlistItemPriceProductExpanderPlugin         | Expands the collection of product price transfers with product configuration prices taken from `ProductViewTransfer`. | None           | Spryker\Client\ProductConfigurationWishlist\Plugin\PriceProductStorage |


<details><summary markdown='span'>src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Wishlist;

use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationItemExpanderPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistAddItemPreCheckPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistItemExpanderPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistPreAddItemPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistPreUpdateItemPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistReloadItemsPlugin;
use Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist\ProductConfigurationWishlistUpdateItemPreCheckPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Wishlist\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getItemExpanderPlugins()
    {
        return [
            new ProductConfigurationItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new ProductConfigurationWishlistAddItemPreCheckPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistReloadItemsPluginInterface>
     */
    protected function getWishlistReloadItemsPlugins(): array
    {
        return [
            new ProductConfigurationWishlistReloadItemsPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistPreAddItemPluginInterface>
     */
    protected function getWishlistPreAddItemPlugins(): array
    {
        return [
            new ProductConfigurationWishlistPreAddItemPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface>
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationWishlistItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistPreUpdateItemPluginInterface>
     */
    protected function getWishlistPreUpdateItemPlugins(): array
    {
        return [
            new ProductConfigurationWishlistPreUpdateItemPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\UpdateItemPreCheckPluginInterface>
     */
    protected function getUpdateItemPreCheckPlugins(): array
    {
        return [
            new ProductConfigurationWishlistUpdateItemPreCheckPlugin(),
        ];
    }
}

```

</details>

**src/Pyz/Client/Wishlist/WishlistDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Wishlist;

use Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist\ProductConfigurationWishlistCollectionToRemoveExpanderPlugin;
use Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist\ProductConfigurationWishlistPostMoveToCartCollectionExpanderPlugin;
use Spryker\Client\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistPostMoveToCartCollectionExpanderPluginInterface>
     */
    protected function getWishlistPostMoveToCartCollectionExpanderPlugins(): array
    {
        return [
            new ProductConfigurationWishlistPostMoveToCartCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistCollectionToRemoveExpanderPluginInterface>
     */
    protected function getWishlistCollectionToRemoveExpanderPlugins(): array
    {
        return [
            new ProductConfigurationWishlistCollectionToRemoveExpanderPlugin(),
        ];
    }
}

```

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;
use Spryker\Client\ProductConfigurationWishlist\Plugin\PriceProductStorage\ProductConfigurationWishlistItemPriceProductExpanderPlugin;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductExpanderPluginInterface>
     */
    protected function getPriceProductExpanderPlugins(): array
    {
        return [
            new ProductConfigurationWishlistItemPriceProductExpanderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that the wishlist plugins work correctly:
1. Configure a configurable product.
2. Add the configured product to a wishlist.
3. Make sure that the product has been successfully added to the wishlist.

{% endinfo_block %}

14. Set up shopping list plugins:

| PLUGIN                                                       | SPECIFICATION                                                                                         | PREREQUISITES  | NAMESPACE                                                                      |
|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------------------------|
| ProductConfigurationShoppingListItemMapperPlugin             | Adds product configuration to a shopping list item if product configuration found.                    | None           | Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList            |
| ProductConfigurationShoppingListItemToItemMapperPlugin       | Copies product configuration from the shopping list item to a cart item.                              | None           | Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList            |
| ProductConfigurationShoppingListExpanderPlugin               | Expands shopping list items with product configuration.                                               | None           | Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList            |
| ProductConfigurationShoppingListAddItemPreCheckPlugin        | Checks whether product configuration exists by the provided `ShoppingListItem.sku` transfer property. | None           | Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList |
| ProductConfigurationShoppingListItemBulkPostSavePlugin       | Removes configuration if a product configuration instance is not set at a shopping list item.         | None           | Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList |
| ProductConfigurationShoppingListItemCollectionExpanderPlugin | Expands `ShoppingListItemTransfer` transfer object with product configuration data.                   | None           | Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList |
| ItemProductConfigurationItemToShoppingListItemMapperPlugin   | Copies product configuration from a cart item to a shopping list item.                                | None           | Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList |

<details><summary markdown='span'>src/Pyz/Client/ShoppingList/ShoppingListDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\ShoppingList;

use Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList\ProductConfigurationShoppingListExpanderPlugin;
use Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList\ProductConfigurationShoppingListItemMapperPlugin;
use Spryker\Client\ProductConfigurationShoppingList\Plugin\ShoppingList\ProductConfigurationShoppingListItemToItemMapperPlugin;
use Spryker\Client\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemMapperPluginInterface>
     */
    protected function getAddItemShoppingListItemMapperPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListItemMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemToItemMapperPluginInterface>
     */
    protected function getShoppingListItemToItemMapperPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListItemToItemMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListExpanderPluginInterface>
     */
    protected function getShoppingListExpanderPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListExpanderPlugin(),
        ];
    }
}

```

</details>

<details><summary markdown='span'>src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ShoppingList;

use Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList\ItemProductConfigurationItemToShoppingListItemMapperPlugin;
use Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList\ProductConfigurationShoppingListAddItemPreCheckPlugin;
use Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList\ProductConfigurationShoppingListItemBulkPostSavePlugin;
use Spryker\Zed\ProductConfigurationShoppingList\Communication\Plugin\ShoppingList\ProductConfigurationShoppingListItemCollectionExpanderPlugin;
use Spryker\Zed\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListAddItemPreCheckPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemBulkPostSavePluginInterface>
     */
    protected function getShoppingListItemBulkPostSavePlugins(): array
    {
        return [
            new ProductConfigurationShoppingListItemBulkPostSavePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemCollectionExpanderPluginInterface>
     */
    protected function getItemCollectionExpanderPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListItemCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ItemToShoppingListItemMapperPluginInterface>
     */
    protected function getItemToShoppingListItemMapperPlugins(): array
    {
        return [
            new ItemProductConfigurationItemToShoppingListItemMapperPlugin(),
        ];
    }
}

```

</details>

{% info_block warningBox "Verification" %}

Make sure that the shopping list plugins work correctly:
1. Configure a configurable product.
2. Add the configured product to a shopping list.
3. Make sure that the product has been added successfully to the shopping list.

{% endinfo_block %}


### 5) Import data

The following imported entities are used as product configurations in Spryker. To import product configuration data, follow these steps:

1. Prepare data according to your requirements using the following demo data:

**data/import/product_configuration.csv**

```csv
concrete_sku,configurator_key,is_complete,default_configuration,default_display_data
093_24495843,DATE_TIME_CONFIGURATOR,0,"{""time_of_day"": ""2""}","{""Preferred time of the day"": ""Afternoon"", ""Date"": ""9.09.2020""}"
```

| COLUMN                | Required  | DATA TYPE  | DATA EXAMPLE                                                                | DATA EXPLANATION                                                         |
|-----------------------|-----------|------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------|
| concrete_sku          | &check;   | string     | 093_24495843                                                                | Unique product identifier.                                               |
| configurator_key      | &check;   | string     | DATE_TIME_CONFIGURATOR                                                      | Unique identifier of a product configurator to be used for this product. |
| is_complete           |           | boolean    | 0                                                                           | Defines if product configuration complete by default.                    |
| default_configuration |           | text       | `"{""time_of_day"": ""2""}"`                                                | Defines default configuration.                                           |
| default_display_data  |           | text       | `"{""Preferred time of the day"": ""Afternoon"", ""Date"": ""9.09.2020""}"` | Defines default display data for the configuration.                      |

2. Register the following data import plugins:

| PLUGIN                               | SPECIFICATION                       | PREREQUISITES  | NAMESPACE                                                        |
|--------------------------------------|-------------------------------------|----------------|------------------------------------------------------------------|
| ProductConfigurationDataImportPlugin | Imports product configuration data. | None           | \Spryker\Zed\ProductConfigurationDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductConfigurationDataImport\Communication\Plugin\ProductConfigurationDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
          new ProductConfigurationDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import product-configuration
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_product_cofiguration` table.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product      | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)           |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker-feature/configurable-product":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                 | EXPECTED DIRECTORY                                             |
|----------------------------------------|----------------------------------------------------------------|
| ProductConfigurationCartWidget         | vendor/spryker-shop/product-configuration-cart-widget          |
| ProductConfigurationWidget             | vendor/spryker-shop/product-configuration-widget               |
| ProductConfigurationWishlistWidget     | vendor/spryker-shop/product-configuration-wishlist-widget      |
| ProductConfigurationShoppingListWidget | vendor/spryker-shop/product-configuration-shopping-list-widget |
| ProductConfiguratorGatewayPage         | vendor/spryker-shop/product-configurator-gateway-page          |
| SalesProductConfigurationWidget        | vendor/spryker-shop/sales-product-configuration-widget         |

{% endinfo_block %}

### 2) Add translations

Add translations as follows:

1.  Append glossary according to your configuration:

```php
product_configuration.checkout.validation.error.is_not_complete,"Product configuration is not completed.",en_US
product_configuration.checkout.validation.error.is_not_complete,"Die Produktkonfiguration ist nicht abgeschlossen.",de_DE
product_configuration_widget.configure,Configure,en_US
product_configuration_widget.configure,Konfigurieren,de_DE
product_configuration_widget.complete,"Configuration complete!",en_US
product_configuration_widget.complete,"Konfiguration abgeschlossen!",de_DE
product_configuration_widget.not_complete,"Configuration is not complete.",en_US
product_configuration_widget.not_complete,"Die Konfiguration ist nicht abgeschlossen.",de_DE
product_configuration_widget.quote_not_valid,"This cart can't be processed. Please configure items inside the cart.",en_US
product_configuration_widget.quote_not_valid,"Dieser Warenkorb kann nicht bearbeitet werden. Bitte konfigurieren Sie Artikel im Warenkorb.",de_DE
product_configurator_gateway_page.configurator_key_not_blank,"Configurator key is required parameter",en_US
product_configurator_gateway_page.configurator_key_not_blank,"Konfiguratorschlüssel ist ein erforderlicher Parameter",de_DE
product_configurator_gateway_page.item_group_key_required,"Group Key is required parameter",en_US
product_configurator_gateway_page.item_group_key_required,"Gruppenschlüssel ist erforderlicher Parameter",de_DE
product_configurator_gateway_page.source_type_not_blank,"Source is required parameter",en_US
product_configurator_gateway_page.source_type_not_blank,"Source ist erforderlicher Parameter",de_DE
product_configurator_gateway_page.sku_not_blank,"Product SKU is required parameter",en_US
product_configurator_gateway_page.sku_not_blank,"Produkt-SKU ist ein erforderlicher Parameter",de_DE
product_configurator_gateway_page.quantity_required,"Quantity is required parameter",en_US
product_configurator_gateway_page.quantity_required,"Menge ist Parameter erforderlich",de_DE
product_configuration.validation.error.not_valid_response_checksum,"Not valid response checksum provided",en_US
product_configuration.validation.error.not_valid_response_checksum,"Keine gültige Antwortprüfsumme angegeben",de_DE
product_configuration.validation.error.expired_timestamp,"Expired timestamp was provided",en_US
product_configuration.validation.error.expired_timestamp,"Der abgelaufene Zeitstempel wurde bereitgestellt",de_DE
product_configuration_storage.validation.error.group_key_is_not_provided,"Group key must be provided",en_US
product_configuration_storage.validation.error.group_key_is_not_provided,"Gruppenschlüssel muss angegeben werden",de_DE
product_configuration.access_token.request.error.can_not_obtain_access_token,"Can not obtain access token",en_US
product_configuration.access_token.request.error.can_not_obtain_access_token,"Zugriffstoken kann nicht abgerufen werden",de_DE
product_configuration.error.configured_item_not_found_in_cart,Configured product '%sku%' was not found.,en_US
product_configuration.error.configured_item_not_found_in_cart,'%sku%' des kofigurierbaren Produkts wurde nicht gefunden.,de_DE
product_configuration.error.availability.failed,The product has an availability of %availability%.,en_US
product_configuration.error.availability.failed,Das Produkt hat eine Verfügbarkeit von %availability%.,de_DE
product_configuration.quote_request.validation.error.incomplete,You must finish the configuration of the products to validate the quote.,en_US
product_configuration.quote_request.validation.error.incomplete,"Sie müssen die Konfiguration der Produkte abschließen, um das Angebot zu validieren.",de_DE
product_configuration.response.validation.error,Failed to validate product configurator response.,en_US
product_configuration.response.validation.error,Die Antwort vom Produktkonfigurator konnte nicht validiret werden.,de_DE
product_configuration.error.configuration_not_found,Product configuration was not found for product '%sku%'.,en_US
product_configuration.error.configuration_not_found,Produktkonfiguration wurde nicht für Produkt '%sku%' gefunden.,de_DE
wishlist.validation.error.wishlist_item_not_found,Wishlist item not found.,en_US
wishlist.validation.error.wishlist_item_not_found,Wunschliste Artikel nicht gefunden.,de_DE
wishlist.validation.error.wishlist_item_cannot_be_updated,Wishlist item cannot be updated.,en_US
wishlist.validation.error.wishlist_item_cannot_be_updated,Wunschliste kann nicht aktualisiert werden.,de_DE
product_configuration_wishlist.error.configuration_not_found,"Product configuration was not found for wishlist item '%id%'.",en_US
product_configuration_wishlist.error.configuration_not_found,"Für den Wunschlistenartikel '%id%' wurde keine Produktkonfiguration gefunden.",de_DE
product_configuration_shopping_list.error.configuration_not_found,"Product configuration was not found for shopping list item '%uuid%'.",en_US
product_configuration_shopping_list.error.configuration_not_found,"Für den Einkaufslistenartikel '%uuid%' wurde keine Produktkonfiguration gefunden.",de_DE
product_configuration_shopping_list.error.item_not_found,"Shopping list item not found.",en_US
product_configuration_shopping_list.error.item_not_found,"Artikel auf der Einkaufsliste nicht gefunden.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

1. On the Storefront, register the following route provider:

| PROVIDER                                          | NAMESPACE                                                     |
|---------------------------------------------------|---------------------------------------------------------------|
| ProductConfiguratorGatewayPageRouteProviderPlugin | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\Router\ProductConfiguratorGatewayPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new ProductConfiguratorGatewayPageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `yves.mysprykershop.com/product-configurator-gateway/request` and `yves.mysprykershop.com/product-configurator-gateway/response` routes are available for `POST` requests.

{% endinfo_block %}

2. Register the following reorder item expander plugin:

| PLUGIN                                        | SPECIFICATION                                                            | PREREQUISITES  | NAMESPACE                                                                     |
|-----------------------------------------------|--------------------------------------------------------------------------|----------------|-------------------------------------------------------------------------------|
| ProductConfigurationReorderItemExpanderPlugin | Expands items with product configuration based on data from order items. | None           | SprykerShop\Yves\SalesProductConfigurationWidget\Plugin\CustomerReorderWidget |

**src/Pyz/Yves/CustomerReorderWidget/CustomerReorderWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerReorderWidget;

use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetDependencyProvider as SprykerCustomerReorderWidgetDependencyProvider;
use SprykerShop\Yves\SalesProductConfigurationWidget\Plugin\CustomerReorderWidget\ProductConfigurationReorderItemExpanderPlugin;

class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerReorderWidgetExtension\Dependency\Plugin\ReorderItemExpanderPluginInterface>
     */
    protected function getReorderItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationReorderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the reorder expander plugin works:
1. Order with a configurable product.
2. On the Storefront, go to the **Order history** page.
3. Next to the order with the configurable product, select **Reorder**.
4. In the cart, check that the configurable product has the configuration from the previous order.

{% endinfo_block %}

3. Register the following gateway plugins:

| PLUGIN                                                                    | SPECIFICATION                                                                                                                                                                                             | PREREQUISITES | NAMESPACE |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------| --- |
| ProductDetailPageProductConfiguratorRequestStrategyPlugin                 | Finds the product configuration instance for a given product, maps it to `ProductConfiguratorRequestTransfer`, and sends the product configurator access token request.                                     | None          | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| ProductDetailPageProductConfiguratorResponseStrategyPlugin                | Maps the product configurator check sum response, validates it and replaces configuration for a given product in the session.                                                                             | None          | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin | Extends the product configurator request form with the SKU field to support configuration for a product on the PDP page.                                                                                  | None          | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| CartPageProductConfiguratorRequestStartegyPlugin                          | Finds configuration instance in quote, maps it to `ProductConfiguratorRequestTransfer` and sends product configurator access token request.                                                               | None          | SprykerShop\Yves\ProductConfigurationCartWidget\Plugin|
| CartPageProductConfiguratorResponseStrategyPlugin                         | Maps the raw product configurator checksum response, validates it, and replaces the corresponding item in a quote.                                                                                         | None          | SprykerShop\Yves\ProductConfigurationCartWidget\Plugin |
| CartPageProductConfiguratorRequestDataFormExpanderStrategyPlugin          | Extends the product configurator request form with SKU, quantity, and key group fields to support configuration for a cart item on a cart page.                                                           | None          | SprykerShop\Yves\ProductConfigurationCartWidget\Plugin|
| WishlistPageProductConfiguratorRequestStrategyPlugin                      | Finds product configuration instance for given wishlist item, maps product configuration instance data to `ProductConfiguratorRequestTransfer`, and sends product configurator access token request.      | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |
| WishlistPageProductConfiguratorResponseStrategyPlugin                     | Maps the product configurator check sum response, validates it, and replaces configuration for a given product in the wishlist item.                                                                       | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |
| WishlistPageProductConfiguratorRequestDataFormExpanderStrategyPlugin      | Extends the product configurator request form with the `idWishlistItem` and `sku` fields to support configuration for a wishlist item on the wishlist page.                                                  | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |
| ShoppingListPageProductConfiguratorRequestStrategyPlugin                  | Finds product configuration instance for given shopping list item, maps product configuration instance data to `ProductConfiguratorRequestTransfer`, and sends product configurator access token request. | None          | SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage |
| ShoppingListPageProductConfiguratorResponseStrategyPlugin                 | Maps the product configurator check sum response, validates it and replaces configuration for a given product in the shopping list item.                                                                  | None          | SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage |
| ShoppingListPageProductConfiguratorRequestDataFormExpanderStrategyPlugin  | Extends the product configurator request form with the `shoppingListItemUuid` and `quantity` fields to support configuration for a shopping list item on the Shopping List page.                          | None          | SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage |

<details><summary markdown='span'>src/Pyz/Yves/ProductConfiguratorGatewayPage/ProductConfiguratorGatewayPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ProductConfiguratorGatewayPage;

use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorRequestStartegyPlugin;
use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorResponseStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage\ShoppingListPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage\ShoppingListPageProductConfiguratorRequestStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\Plugin\ProductConfiguratorGatewayPage\ShoppingListPageProductConfiguratorResponseStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage\WishlistPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage\WishlistPageProductConfiguratorRequestStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage\WishlistPageProductConfiguratorResponseStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorRequestStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\ProductConfiguratorGatewayPage\ProductDetailPageProductConfiguratorResponseStrategyPlugin;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageDependencyProvider as SprykerProductConfiguratorGatewayPageDependencyProvider;

class ProductConfiguratorGatewayPageDependencyProvider extends SprykerProductConfiguratorGatewayPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorRequestStrategyPluginInterface>
     */
    protected function getProductConfiguratorRequestPlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorRequestStrategyPlugin(),
            new CartPageProductConfiguratorRequestStartegyPlugin(),
            new WishlistPageProductConfiguratorRequestStrategyPlugin(),
            new ShoppingListPageProductConfiguratorRequestStrategyPlugin(),
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorResponseStrategyPluginInterface>
     */
    protected function getProductConfiguratorResponsePlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorResponseStrategyPlugin(),
            new CartPageProductConfiguratorResponseStrategyPlugin(),
            new WishlistPageProductConfiguratorResponseStrategyPlugin(),
            new ShoppingListPageProductConfiguratorResponseStrategyPlugin(),
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\ProductConfiguratorGatewayPageExtension\Dependency\Plugin\ProductConfiguratorRequestDataFormExpanderStrategyPluginInterface>
     */
    protected function getProductConfiguratorRequestDataFormExpanderStrategyPlugins(): array
    {
        return [
            new ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin(),
            new CartPageProductConfiguratorRequestDataFormExpanderStrategyPlugin(),
            new WishlistPageProductConfiguratorRequestDataFormExpanderStrategyPlugin(),
            new ShoppingListPageProductConfiguratorRequestDataFormExpanderStrategyPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that the plugins are set up correctly:
1. Go to the PDP of a configurable product, make sure that you can open the configurator page, and return to the PDP with the configuration saved.
2. Add a configurable product to the wishlist. Then, go to the wishlist page and make sure that you can open the configurator page and return to the wishlist page with the configuration saved.
3. Add a configurable product to the shopping list. Then, go to the shopping list page and make sure that you can open the configurator page and return to the shopping list page with the configuration saved.

{% endinfo_block %}

4. To set up widgets, register the following plugins:

| PLUGIN                                            | SPECIFICATION                                                                                  | PREREQUISITES | NAMESPACE                                                       |
|---------------------------------------------------|------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------|
| ProductConfigurationCartItemDisplayWidget         | Displays the product configuration of cart items.                                              | None          | SprykerShop\Yves\ProductConfigurationWidget\Widget              |
| ProductConfigurationCartPageButtonWidget          | Displays the product configuration button for configurable cart items.                         | None          | SprykerShop\Yves\ProductConfigurationCartWidget\Widget          |
| ProductConfigurationProductDetailPageButtonWidget | Displays the product configuration button for configurable products.                           | None          | SprykerShop\Yves\ProductConfigurationWidget\Widget              |
| ProductConfigurationProductViewDisplayWidget      | Displays the product configuration of configurable products.                                   | None          | SprykerShop\Yves\ProductConfigurationCartWidget\Widget          |
| ProductConfigurationQuoteValidatorWidget          | Displays if the configuration of configurable cart items is valid.                             | None          | SprykerShop\Yves\ProductConfigurationWidget\Widget              |
| ProductConfigurationOrderItemDisplayWidget        | Displays the product configuration of order items.                                             | None          | SprykerShop\Yves\SalesProductConfigurationWidget\Widget         |
| ProductConfigurationWishlistFormWidget            | Adds `has_product_configuration_attached` form hidden field to enable wishlist item expansion. | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget      |
| ProductConfigurationWishlistItemDisplayWidget     | Displays the product configuration of wishlist items.                                          | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget      |
| ProductConfigurationWishlistPageButtonWidget      | Displays the product configuration button for configurable wishlist items.                     | None          | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget      |
| ProductConfigurationShoppingListItemDisplayWidget | Displays the product configuration of shopping list items.                                     | None          | SprykerShop\Yves\ProductConfigurationShoppingListWidget\Widget  |
| ProductConfigurationShoppingListPageButtonWidget  | Displays the product configuration button for configurable shopping list items.                | None          | SprykerShop\Yves\ProductConfigurationShoppingListWidget\Widget  |


<details><summary markdown='span'>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationCartItemDisplayWidget;
use SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationCartPageButtonWidget;
use SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationQuoteValidatorWidget;
use SprykerShop\Yves\ProductConfigurationWidget\Widget\ProductConfigurationProductDetailPageButtonWidget;
use SprykerShop\Yves\ProductConfigurationWidget\Widget\ProductConfigurationProductViewDisplayWidget;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget\ProductConfigurationWishlistFormWidget;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget\ProductConfigurationWishlistItemDisplayWidget;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget\ProductConfigurationWishlistPageButtonWidget;
use SprykerShop\Yves\SalesProductConfigurationWidget\Widget\ProductConfigurationOrderItemDisplayWidget;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\Widget\ProductConfigurationShoppingListItemDisplayWidget;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\Widget\ProductConfigurationShoppingListPageButtonWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductConfigurationCartPageButtonWidget::class,
            ProductConfigurationCartItemDisplayWidget::class,
            ProductConfigurationProductDetailPageButtonWidget::class,
            ProductConfigurationProductViewDisplayWidget::class,
            ProductConfigurationOrderItemDisplayWidget::class,
            ProductConfigurationQuoteValidatorWidget::class,
            ProductConfigurationWishlistFormWidget::class,
            ProductConfigurationWishlistItemDisplayWidget::class,
            ProductConfigurationWishlistPageButtonWidget::class,
            ProductConfigurationShoppingListItemDisplayWidget::class,
            ProductConfigurationShoppingListPageButtonWidget::class,
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                                            | VERIFICATION                                                                                                                                                                          |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ProductConfigurationCartItemDisplayWidget         | `{% raw %}{%{% endraw %} widget 'ProductConfigurationCartItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`         |
| ProductConfigurationCartPageButtonWidget          | `{% raw %}{%{% endraw %} widget 'ProductConfigurationCartPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`          |
| ProductConfigurationProductDetailPageButtonWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationProductDetailPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| ProductConfigurationProductViewDisplayWidget      | `{% raw %}{%{% endraw %} widget 'ProductConfigurationProductViewDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`      |
| ProductConfigurationQuoteValidatorWidget          | `{% raw %}{%{% endraw %} widget 'ProductConfigurationQuoteValidatorWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`          |
| ProductConfigurationOrderItemDisplayWidget        | `{% raw %}{%{% endraw %} widget 'ProductConfigurationOrderItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`        |
| ProductConfigurationWishlistFormWidget            | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistFormWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`            |
| ProductConfigurationWishlistItemDisplayWidget     | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`     |
| ProductConfigurationWishlistPageButtonWidget      | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`      |
| ProductConfigurationShoppingListItemDisplayWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationShoppingListItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| ProductConfigurationShoppingListPageButtonWidget  | `{% raw %}{%{% endraw %} widget 'ProductConfigurationShoppingListPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`  |

{% endinfo_block %}

5. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that product configuration data is displayed on the *Product Details*, *Cart*, *Wishlist*, and *Shopping list* pages.

{% endinfo_block %}

## Install an example date-time product configurator

Follow the steps below to install an exemplary date-time product configurator.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product      | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)           |

### 1) Install the required modules

```bash
composer require "spryker-shop/date-time-configurator-page-example":"^0.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                          | EXPECTED DIRECTORY                                      |
|---------------------------------|---------------------------------------------------------|
| DateTimeConfiguratorPageExample | vendor/spryker-shop/date-time-configurator-page-example |

{% endinfo_block %}

### 2) Configure an endpoint

1. Define a new front controller for the date-time configurator:

**public/Configurator/index.php**

```php
<?php

use SprykerShop\Configurator\DateTimeConfiguratorPageExample\ConfiguratorPage;
use Symfony\Component\HttpFoundation\Response;

define('APPLICATION', 'CONFIGURATOR');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

$configuratorPage = new ConfiguratorPage();

$response = $configuratorPage->render();

if ($response instanceof Response) {
    $response->send();
}

echo $response;
```

1. To enable the new endpoint, adjust a Deploy file:

**deploy.*.yml**

```yaml
version: "0.1"

namespace: spryker_demo
tag: '1.0'

environment: docker.dev
image:
    environment:
        SPRYKER_PRODUCT_CONFIGURATOR_HOST: date-time-configurator-example.spryker.local
        SPRYKER_PRODUCT_CONFIGURATOR_PORT: 80
        SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY: 'change123'
        SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR: '0c1ffefeebdab4a3d839d0e52590c9a2'

...

groups:
    EU:
        region: EU
        applications:
            yves_eu:
                application: yves
                endpoints:
                    date-time-configurator-example.spryker.local:
                        entry-point: Configurator
...
```

3. Fetch the changes and restart the application with the endpoint enabled:

```bash
docker/sdk boot deploy.yml
docker/sdk up
```

4. Add the endpoint to your `hosts` file:

**/etc/hosts**

```text
127.0.0.1 date-time-configurator-example.spryker.local
```

{% info_block warningBox "Verification" %}

Make sure that the `http://date-time-configurator-example.spryker.local/` endpoint is accessible.

{% endinfo_block %}

### 3) Add translations

1. Append glossary according to your configuration:

```yaml
demo_date_time_configurator_page.checkout.validation.error.price_is_not_valid,"Product configuration price is not valid",en_US
demo_date_time_configurator_page.checkout.validation.error.price_is_not_valid,"Der Produktkonfigurationspreis ist ungültig",de_DE
product_configurator_gateway_page.wishlist_item_id_required,"Wishlist item ID is required parameter.",en_US
product_configurator_gateway_page.wishlist_item_id_required,"Die ID des Wunschartikels ist ein erforderlicher Parameter.",de_DE
product_configurator_gateway_page.configurator_key_is_not_supported,"Configurator key is not supported.",en_US
product_configurator_gateway_page.configurator_key_is_not_supported,"Konfiguratorschlüssel wird nicht unterstützt.",de_DE
product_configurator_gateway_page.shopping_list_item_uuid_required,"Shopping List item ID is required parameter.",en_US
product_configurator_gateway_page.shopping_list_item_uuid_required,"Die Artikel-ID der Einkaufsliste ist ein erforderlicher Parameter.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up behavior

1. Set up the following plugins:

| PLUGIN                                                                  | SPECIFICATION                                                                                      | PREREQUISITES  | NAMESPACE                                                                                         |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|----------------|---------------------------------------------------------------------------------------------------|
| ExampleDateTimeConfiguratorAvailabilityStrategyPlugin                   | Returns `true` if a product configuration instance exists and has an appropriate configurator key. | None           | SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\Availability                 |
| ExampleDateTimeProductConfigurationRenderStrategyPlugin                 | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationWidget                |
| ExampleDateTimeProductConfigurationRenderStrategyPlugin                 | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\SalesProductConfigurationGui |
| ExampleDateTimeSalesProductConfigurationRenderStrategyPlugin            | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\SalesProductConfigurationWidget           |
| ExampleDateTimeCartProductConfigurationRenderStrategyPlugin             | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationCartWidget            |
| ExampleDateTimeProductConfiguratorRequestExpanderPlugin                 | Expands request to the configurator with the date-time configurator host.                          | None           | SprykerShop\Client\DateTimeConfiguratorPageExample\Plugin\ProductConfiguration                    |
| ExampleDateTimeWishlistItemProductConfigurationRenderStrategyPlugin     | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationWishlistWidget        |
| ProductConfigurationWishlistItemRequestExpanderPlugin                   | Expands `WishlistItem` with product configuration.                                                 | None           | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\WishlistPage                           |
| ExampleDateTimeShoppingListItemProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data.                                                                   | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationShoppingListWidget    |
| ConfiguratorSecurityHeaderExpanderPlugin                                | Adds configurator url to `Content-Security-Policy` header.                                         | None           | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\Application                               |

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\Availability\ExampleDateTimeConfiguratorAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\AvailabilityStrategyPluginInterface>
     */
    protected function getAvailabilityStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeConfiguratorAvailabilityStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesProductConfigurationGui/SalesProductConfigurationGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesProductConfigurationGui;

use Spryker\Zed\SalesProductConfigurationGui\SalesProductConfigurationGuiDependencyProvider as SprykerSalesProductConfigurationGuiDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\SalesProductConfigurationGui\ExampleDateTimeProductConfigurationRenderStrategyPlugin;

class SalesProductConfigurationGuiDependencyProvider extends SprykerSalesProductConfigurationGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesProductConfigurationGuiExtension\Dependency\Plugin\ProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ProductConfigurationWishlistWidget/ProductConfigurationWishlistWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ProductConfigurationWishlistWidget;

use SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationWishlistWidget\ExampleDateTimeWishlistItemProductConfigurationRenderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationWishlistWidget\ProductConfigurationWishlistWidgetDependencyProvider as SprykerProductConfigurationWishlistWidgetDependencyProvider;

class ProductConfigurationWishlistWidgetDependencyProvider extends SprykerProductConfigurationWishlistWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductConfigurationWishlistWidgetExtension\Dependency\Plugin\WishlistItemProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getWishlistItemProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeWishlistItemProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/WishlistPage/WishlistPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\WishlistPage;

use SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\WishlistPage\ProductConfigurationWishlistItemRequestExpanderPlugin;
use SprykerShop\Yves\WishlistPage\WishlistPageDependencyProvider as SprykerWishlistPageDependencyProvider;

class WishlistPageDependencyProvider extends SprykerWishlistPageDependencyProvider
{

    /**
     * @return array<\SprykerShop\Yves\WishlistPageExtension\Dependency\Plugin\WishlistItemRequestExpanderPluginInterface>
     */
    protected function getWishlistItemRequestExpanderPlugins(): array
    {
        return [
            new ProductConfigurationWishlistItemRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ProductConfigurationShoppingListWidget/ProductConfigurationShoppingListWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ProductConfigurationShoppingListWidget;

use SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationShoppingListWidget\ExampleDateTimeShoppingListItemProductConfigurationRenderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationShoppingListWidget\ProductConfigurationShoppingListWidgetDependencyProvider as SprykerProductConfigurationShoppingListWidgetDependencyProvider;

class ProductConfigurationShoppingListWidgetDependencyProvider extends SprykerProductConfigurationShoppingListWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductConfigurationShoppingListWidgetExtension\Dependency\Plugin\ShoppingListItemProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getShoppingListItemProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeShoppingListItemProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Application/ApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Application;

use Spryker\Yves\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\Application\ConfiguratorSecurityHeaderExpanderPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\ApplicationExtension\Dependency\Plugin\SecurityHeaderExpanderPluginInterface>
     */
    protected function getSecurityHeaderExpanderPlugins(): array
    {
        return [
            new ConfiguratorSecurityHeaderExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesProductConfigurationGui/SalesProductConfigurationGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesProductConfigurationGui;

use Spryker\Zed\SalesProductConfigurationGui\SalesProductConfigurationGuiDependencyProvider as SprykerSalesProductConfigurationGuiDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\SalesProductConfigurationGui\ExampleDateTimeProductConfigurationRenderStrategyPlugin;

class SalesProductConfigurationGuiDependencyProvider extends SprykerSalesProductConfigurationGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesProductConfigurationGuiExtension\Dependency\Plugin\ProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/SalesProductConfigurationWidget/SalesProductConfigurationWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\SalesProductConfigurationWidget;

use SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\SalesProductConfigurationWidget\ExampleDateTimeSalesProductConfigurationRenderStrategyPlugin;
use SprykerShop\Yves\SalesProductConfigurationWidget\SalesProductConfigurationWidgetDependencyProvider as SprykerSalesProductConfigurationWidgetDependencyProvider;

class SalesProductConfigurationWidgetDependencyProvider extends SprykerSalesProductConfigurationWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\SalesProductConfigurationWidgetExtension\Dependency\Plugin\SalesProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getSalesProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeSalesProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Client/ProductConfiguration/ProductConfigurationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductConfiguration;

use Spryker\Client\ProductConfiguration\ProductConfigurationDependencyProvider as SprykerProductConfigurationDependencyProvider;
use SprykerShop\Client\DateTimeConfiguratorPageExample\Plugin\ProductConfiguration\ExampleDateTimeProductConfiguratorRequestExpanderPlugin;

class ProductConfigurationDependencyProvider extends SprykerProductConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductConfigurationExtension\Dependency\Plugin\ProductConfiguratorRequestExpanderPluginInterface>
     */
    protected function getProductConfigurationRequestExpanderPlugins(): array
    {
        return [
            new ExampleDateTimeProductConfiguratorRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ProductConfigurationCartWidget/ProductConfigurationCartWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ProductConfigurationCartWidget;

use SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationCartWidget\ExampleDateTimeCartProductConfigurationRenderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationCartWidget\ProductConfigurationCartWidgetDependencyProvider as SprykerProductConfigurationCartWidgetDependencyProvider;

class ProductConfigurationCartWidgetDependencyProvider extends SprykerProductConfigurationCartWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductConfigurationCartWidgetExtension\Dependency\Plugin\CartProductConfigurationRenderStrategyPluginInterface>
     */
    protected function getCartProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeCartProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

2. To build the frontend assets for the configurator application, in `ConsoleDependencyProvider`, set up the `DateTimeProductConfiguratorBuildFrontendConsole` console command.

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Console\DateTimeProductConfiguratorBuildFrontendConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DateTimeProductConfiguratorBuildFrontendConsole(),
        ];
    }
}
```

3. Build the frontend application of the date-time configurator:

```bash
console frontend:date-time-product-configurator:build
```

{% info_block warningBox "Verification" %}

Make sure that the frontend part has been built:
1. Check that the folder `public/Configurator/dist` exists, and it’s not empty.
2. Check that you can access the configurator at `https://date-time-configurator-example.mysprykershop.com/`.

{% endinfo_block %}

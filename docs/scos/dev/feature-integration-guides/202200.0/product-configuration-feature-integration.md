---
title: Product Configuration feature integration
description: Learn how to integrate the Product Configuration feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the [Product Configuration](/docs/scos/user/features/{{page.version}}/configurable-product-feature-overview.html) feature into a Spryker project.


## Install feature core

Follow the steps below to install the Product Configuration feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Product |{{page.version}} |[Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html)|
| Cart| {{page.version}}| [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html)|
| Order Management| {{page.version}} |[Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html)|
| Checkout |{{page.version}} |[Checkout feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html)|
| Prices |{{page.version}} |[Prices feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/prices-feature-integration.html)|
| Inventory Management |{{page.version}} |[Inventory management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/inventory-management-feature-integration.html)|
| Wishlist |{{page.version}} ||

### 1) Install the required modules using Сomposer

Install the required modules:

```bash
composer require spryker-feature/configurable-product:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}


Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|ProductConfiguration|vendor/spryker/product-configuration|
|ProductConfigurationCart|vendor/spryker/product-configuration-cart|
|ProductConfigurationDataImport|vendor/spryker/product-configuration-data-import|
|ProductConfigurationGui|vendor/spryker/product-configuration-gui|
|ProductConfigurationPersistentCart|vendor/spryker/product-configuration-persistent-cart|
|ProductConfigurationStorage|vendor/spryker/product-configuration-storage|
|ProductConfigurationWishlist|vendor/spryker/product-configuration-wishlist|
|SalesProductConfiguration|vendor/spryker/sales-product-configuration|
|SalesProductConfigurationGui|vendor/spryker/sales-product-configuration-gui|

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
|ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY| Provides an encryption key for checksum validation. It is used for the checksum generation of the product configurator data based on the provided key. |Spryker\Shared\ProductConfiguration\ProductConfigurationConstants |
|ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR| Provides a hex initialization vector for checksum validation. It is used as a hex initialization vector for the checksum generation of product configurator data. |Spryker\Shared\ProductConfiguration\ProductConfigurationConstants|
|KernelConstants::DOMAIN_WHITELIST| Defines a set of whitelist domains that every external URL is checked against before redirecting. |Spryker\Shared\Kernel\KernelConstants|

<details open>
    <summary markdown='span'>config/Shared/config_default.php</summary>

```php
<?php

use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\ProductConfiguration\ProductConfigurationConstants;

// >>> Product Configuration
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY') ?: 'change123';
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR') ?: '0c1ffefeebdab4a3d839d0e52590c9a2';
$config[KernelConstants::DOMAIN_WHITELIST][] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_HOST');
```

</details>

{% info_block warningBox "Verification" %}

To make sure that the changes have been applied, check that the exemplary product configurator opens at `http://date-time-configurator-example.mysprykershop.com`.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Set up database schema and transfer objects as follows:

1. For entity changes to trigger events, adjust the schema definition:

<details open>
    <summary markdown='span'>src/Pyz/Zed/ProductConfiguration/Persistence/Propel/Schema/spy\_product\_configuration.schema.xml</summary>

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductConfiguration\Persistence"
          package="src.Orm.Zed.ProductConfiguration.Persistence">

    <table name="spy_product_configuration">
        <behavior name="event">
            <parameter name="spy_product_configuration_all" column="*"/>
        </behavior>
    </table>
</database>
```

</details>

| AFFECTED ENTITY | TRIGGERED EVENTS |
| --- | --- |
| spy_product_configuration | Entity.spy_product_configuration.create  <br> Entity.spy_product_configuration.update  <br> Entity.spy_product_configuration.delete |


<details open> 
    <summary markdown='span'>src/Pyz/Zed/ProductConfigurationStorage/Persistence/Propel/Schema/spy_product_configuration_storage.schema.xml</summary>

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductConfigurationStorage\Persistence"
          package="src.Orm.Zed.ProductConfigurationStorage.Persistence">

    <table name="spy_product_configuration_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>

</database>
```

</details>

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}


Make sure that the following changes have been applied by checking your database:



| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
|spy_product_configuration |table| created|
|spy_product_configuration_storage| table | created|
|spy_sales_order_item_configuration |table| created|
|spy_wishlist_item.product_configuration_instance_data |column| added|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:


| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductConfigurationTransfer | class | created | src/Generated/Shared/Transfer/ProductConfigurationTransfer |
| ProductConfigurationInstanceTransfer| class| created |src/Generated/Shared/Transfer/ProductConfigurationInstanceTransfer|
|ItemTransfer |class |created |src/Generated/Shared/Transfer/ItemTransfer|
|ProductConfigurationFilterTransfer| class| created| src/Generated/Shared/Transfer/ProductConfigurationFilterTransfer|
|FilterTransfer |class| created |src/Generated/Shared/Transfer/FilterTransfer|
|ProductConfigurationCollectionTransfer| class |created |src/Generated/Shared/Transfer/ProductConfigurationCollectionTransfer|
|CartChangeTransfer |class |created |src/Generated/Shared/Transfer/CartChangeTransfer|
|QuoteTransfer| class| created |src/Generated/Shared/Transfer/QuoteTransfer|
|CheckoutErrorTransfer| class| created |src/Generated/Shared/Transfer/CheckoutErrorTransfer|
|CheckoutResponseTransfer |class| created| src/Generated/Shared/Transfer/CheckoutResponseTransfer|
|ProductConfiguratorResponseProcessorResponseTransfer |class| created |src/Generated/Shared/Transfer/ProductConfiguratorResponseProcessorResponseTransfer|
|MessageTransfer| class |created| src/Generated/Shared/Transfer/MessageTransfer|
|ProductConfiguratorResponseTransfer| class| created |src/Generated/Shared/Transfer/ProductConfiguratorResponseTransfer|
|ProductConfiguratorRequestTransfer |class| created |src/Generated/Shared/Transfer/ProductConfiguratorRequestTransfer|
|ProductConfiguratorRedirectTransfer |class| created |src/Generated/Shared/Transfer/ProductConfiguratorRedirectTransfer|
|ProductConfiguratorRequestDataTransfer |class| created |src/Generated/Shared/Transfer/ProductConfiguratorRequestDataTransfer|
|CustomerTransfer| class| created| src/Generated/Shared/Transfer/CustomerTransfer|
|StoreTransfer |class |created |src/Generated/Shared/Transfer/StoreTransfer|
|CurrencyTransfer| class |created| src/Generated/Shared/Transfer/CurrencyTransfer|
|PriceProductTransfer| class |created| src/Generated/Shared/Transfer/PriceProductTransfer|
|CartItemQuantityTransfer |class |created |src/Generated/Shared/Transfer/CartItemQuantityTransfer|
|ProductConfigurationAggregationTransfer| class| created |src/Generated/Shared/Transfer/ProductConfigurationAggregationTransfer|
|PriceProductFilterTransfer |class |created |src/Generated/Shared/Transfer/PriceProductFilterTransfer|
|PriceProductDimensionTransfer| class |created| src/Generated/Shared/Transfer/PriceProductDimensionTransfer|
|PriceProductTransfer |class |created |src/Generated/Shared/Transfer/PriceProductTransfer|
|ProductConcreteTransfer| class| created |src/Generated/Shared/Transfer/ProductConcreteTransfer|
|MoneyValueTransfer| class| created |src/Generated/Shared/Transfer/MoneyValueTransfer|
|ItemReplaceTransfer |class| created| src/Generated/Shared/Transfer/ItemReplaceTransfer|
|QuoteResponseTransfer| class| created| src/Generated/Shared/Transfer/QuoteResponseTransfer|
|QuoteErrorTransfer |class |created| src/Generated/Shared/Transfer/QuoteErrorTransfer|
|SalesProductConfigurationTemplateTransfer |class| created |src/Generated/Shared/Transfer/SalesProductConfigurationTemplateTransfer|
|SalesOrderItemConfigurationTransfer |class| created |src/Generated/Shared/Transfer/SalesOrderItemConfigurationTransfer|
|WishlistPreUpdateItemCheckResponseTransfer |class| created |src/Generated/Shared/Transfer/WishlistPreUpdateItemCheckResponseTransfer|
|WishlistItemTransfer |class| created |src/Generated/Shared/Transfer/WishlistItemTransfer|
|WishlistItemMetaTransfer |class| created |src/Generated/Shared/Transfer/WishlistItemMetaTransfer|
|WishlistMoveToCartRequestTransfer |class| created |src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer|
|WishlistItemCriteriaTransfer |class| created |src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer|
|WishlistItemResponseTransfer |class| created |src/Generated/Shared/Transfer/WishlistItemResponseTransfer|
|WishlistPreAddItemCheckResponseTransfer |class| created |src/Generated/Shared/Transfer/WishlistPreAddItemCheckResponseTransfer|
|WishlistMoveToCartRequestCollectionTransfer |class| created |src/Generated/Shared/Transfer/WishlistMoveToCartRequestCollectionTransfer|
|WishlistItemCollectionTransfer |class| created |src/Generated/Shared/Transfer/WishlistItemCollectionTransfer|
|WishlistTransfer |class| created |src/Generated/Shared/Transfer/WishlistTransfer|
|ProductConfigurationFilterTransfer.skus |property| added |src/Generated/Shared/Transfer/ProductConfigurationFilterTransfer|

{% endinfo_block %}

### 4) Set up behavior

Set up the following behaviors:

1. Set up Publishers and a Queue processor:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationWritePublisherPlugin | Updates product configuration when triggered by provided product configuration events. | None | Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration |
| ProductConfigurationDeletePublisherPlugin|Removes all data from the product configuration storage when triggered by provided product configuration events.|None|Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration|
| SynchronizationStorageQueueMessageProcessorPlugin |Reads messages from the synchronization queue and saves them to the storage.|None|\Spryker\Zed\Synchronization\Communication\Plugin\Queue| 


<details open>
    <summary markdown='span'>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration\ProductConfigurationDeletePublisherPlugin;
use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfiguration\ProductConfigurationWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
             $this->getProductConfigurationStoragePlugins()
        );
    }
    
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductConfigurationStoragePlugins()
    {
        return [
            new ProductConfigurationWritePublisherPlugin(),
            new ProductConfigurationDeletePublisherPlugin(),
        ];
    }
}
```

</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Queue/QueueDependencyProvider.php</summary>

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
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ProductConfigurationStorageConfig::PRODUCT_CONFIGURATION_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

</details>

<details open>
<summary markdown='span'>src/Pyz/Client/RabbitMq/RabbitMqConfig.php</summary>

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
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
         ProductConfigurationStorageConfig::PRODUCT_CONFIGURATION_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}


Make sure that, after creating a product configuration, you can find the corresponding record in the `spy_product_configuration_storage` table.


{% endinfo_block %}

1. Setup re-generate and re-sync features by setting up the following plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductConfigurationPublisherTriggerPlugin |Triggers publish events for product configuration data. |None |Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher |
|ProductConfigurationSynchronizationDataRepositoryPlugin |Allows synchronizing the content of the entire `spy_product_configuration_storage` table into the storage. |None |Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Publisher\ProductConfigurationPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
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
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
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
    
4.  Make sure that, in your system, storage entries are displayed with the `kv:product_configuration:sku` mask.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the product configuration synchronization plugin works correctly:

1.  Fill the `spy_product_configuration_storage` table with some data.
    
2.  Run the `console sync:data product_configuration` command.
    
3.  Make sure that, in your system, the storage entries are displayed with the `kv:product_configuration:sku` mask.

{% endinfo_block %}

3. Set up quantity counter plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationCartItemQuantityCounterStrategyPlugin | Finds a provided item in a provided cart. Counts the item quantity by the item SKU and the product configuration instance. Returns the item quantity. | None | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Availability |
| ProductConfigurationCartItemQuantityCounterStrategyPlugin| Finds a provided item in a provided cart. Counts the item quantity by the item SKU and the product configuration instance. Returns the item quantity.| None| Spryker\Zed\ProductConfigurationCart\Communication\Plugin\AvailabilityCartConnector | 
| ProductConfigurationCartItemQuantityCounterStrategyPlugin| Finds a provided item in a provided changed cart. Counts the item quantity by the item SKU and the product configuration instance in add and subtract directions. Returns the item quantity.| None| Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector | 

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Availability\ProductConfigurationCartItemQuantityCounterStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
   /**
     * @return \Spryker\Zed\AvailabilityExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface[]
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
     * @return \Spryker\Zed\AvailabilityCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface[]
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
     * @return \Spryker\Zed\PriceCartConnectorExtension\Dependency\Plugin\CartItemQuantityCounterStrategyPluginInterface[]
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

1.  Configure a configurable product.
    
2.  Add the product to the cart.
    
3.  Make sure that the product has been successfully added to the cart.
    

{% endinfo_block %}

4. Set up cart plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductConfigurationGroupKeyItemExpanderPlugin | Expands the items that have a product configuration instance property with a group key. | None | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Cart | 
|ProductConfigurationCartChangeRequestExpanderPlugin | Expands provided changed cart items with product configuration instances. | None | Spryker\Client\ProductConfigurationCart\Plugin\Cart | 
|ProductConfigurationPersistentCartRequestExpanderPlugin | Expands provided changed persistent cart items with product configuration instances. | None | Spryker\Client\ProductConfigurationPersistentCart\Plugin\PersistentCart |

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
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
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
     * @return \Spryker\Client\CartExtension\Dependency\Plugin\CartChangeRequestExpanderPluginInterface[]
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
     * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
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

1.  Configure a configurable product.
    
2.  Add the configured product to cart.
    
3.  Make sure that the product has been successfully added to cart.

{% endinfo_block %}

5. Set up checkout plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationCheckoutPreConditionPlugin | Returns `true` if all product configuration items in a quote are complete. Otherwise, returns `false`. | None | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Checkout | 

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
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new ProductConfigurationCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that checkout plugins work correctly:

1.  Add a configurable product to cart without completing its configuration.
    
2.  Try to place an order with the product.
    
3.  Make sure that the order is not placed and you get an error message about incomplete configuration.

{% endinfo_block %}

6. Set up product management plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationTableDataExpanderPlugin | Expands product items with a configurable product type if they have a configuration. | None | Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement | 

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement\ProductConfigurationTableDataExpanderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataExpanderPluginInterface[]
     */
    protected function getProductTableDataExpanderPlugins(): array
    {
        return [
            new ProductConfigurationTableDataExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Check that product management plugins work correctly:

1.  Add the configuration to the product via data import.
    
2.  In the Back Office, go to **Catalog** > **Products**.
    
3.  Find a product with a configuration that you created before.
    
4.  Check that product is marked as configurable.

{% endinfo_block %}

7. Set up sales plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationOrderItemExpanderPlugin | Expands items with product configuration. | None | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales | 
| ProductConfigurationOrderPostSavePlugin | Persists product configuration from `ItemTransfer` in `Quote` to the `sales_order_item_configuration` table. | None | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales |


**src/Pyz/Zed/Sales/SalesDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderItemExpanderPlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\ProductConfigurationOrderPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationOrderItemExpanderPlugin(),
        ];
    }
    
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
     */
    protected function getOrderPostSavePlugins(): array
    {
        return [
            new ProductConfigurationOrderPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that sales plugins work correctly:

1.  Configure a configurable product.
    
2.  Place an order with the product.
    
3.  Check that that the `spy_sales_order_item_configuration` database table contains a record with the configurable order item.

{% endinfo_block %}

8. Set up price product plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationPriceProductExpanderPlugin | Expands the list of price product transfers with product configuration prices. | None | Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector|
| ProductConfigurationPriceProductFilterPlugin | Filters out all but product configuration prices. | None |Spryker\Service\ProductConfiguration\Plugin\PriceProduct | 
| ProductConfigurationVolumePriceProductFilterPlugin | Finds a corresponding volume price for a provided quantity. | None | Spryker\Service\ProductConfiguration\Plugin\PriceProduct| 
| ProductConfigurationStoragePriceDimensionPlugin | Returns product configuration prices. If a product configuration instance or prices weren't set, returns an empty array . | None | Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage | 
| ProductConfigurationPriceProductFilterExpanderPlugin | Expands `PriceProductFilterTransfer` with a product configuration instance. | None | Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage | 
| PriceProductVolumeProductConfigurationPriceExtractorPlugin | Extracts volume prices from price product data. | None | Spryker\Client\ProductConfiguration\Plugin | 

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\PriceCartConnector\PriceCartConnectorDependencyProvider as SprykerPriceCartConnectorDependencyProvider;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\PriceCartConnector\ProductConfigurationPriceProductExpanderPlugin;

class PriceCartConnectorDependencyProvider extends SprykerPriceCartConnectorDependencyProvider
{
    /**
     * @return \Spryker\Zed\PriceCartConnectorExtension\Dependency\Plugin\PriceProductExpanderPluginInterface[]
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
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
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
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface[]
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new ProductConfigurationStoragePriceDimensionPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductFilterExpanderPluginInterface[]
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
     * @return \Spryker\Client\ProductConfigurationExtension\Dependency\Plugin\ProductConfigurationPriceExtractorPluginInterface[]
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

1.  Configure a configurable product with a regular price and a volume price.
    
2.  Add the product to the cart with the amount required for the volume prices to apply.
    
3.  Make sure that the volume price applies.

{% endinfo_block %}

9. Set up availability plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationAvailabilityStorageStrategyPlugin | Checks if a product configuration provides an availability for a product. | None | Spryker\Client\ProductConfigurationStorage\Plugin\AvailabilityStorage |

**src/Pyz/Client/AvailabilityStorage/AvailabilityStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AvailabilityStorage;

use Spryker\Client\AvailabilityStorage\AvailabilityStorageDependencyProvider as SprykerAvailabilityStorageDependencyProvider;
use Spryker\Client\ProductConfigurationStorage\Plugin\AvailabilityStorage\ProductConfigurationAvailabilityStorageStrategyPlugin;

class AvailabilityStorageDependencyProvider extends SprykerAvailabilityStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\AvailabilityStorageExtension\Dependency\Plugin\AvailabilityStorageStrategyPluginInterface[]
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

1.  Configure a configurable product that has a regular availability.
    
2.  Make sure that you cannot add to cart more items than available for the configuration.
    

{% endinfo_block %}

10. Set up product plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductViewProductConfigurationExpanderPlugin | Expands a product with a configuration. | None | Spryker\Client\ProductConfigurationStorage\Plugin\ProductStorage |

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**
```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\ProductConfigurationStorage\Plugin\ProductStorage\ProductViewProductConfigurationExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins()
    {
        return [
            new ProductViewProductConfigurationExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, on the *Product Details* page of a configurable product, you can see product configuration information.

{% endinfo_block %} 

11. Set up product configuration check plugins for the quote request module::

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationQuoteRequestQuoteCheckPlugin | Validates product configuration before the quote request creation. | None |Spryker\Client\ProductConfigurationCart\Plugin\QuoteRequest | 

<details open>
    <summary markdown='span'>Pyz\Client\QuoteRequest\QuoteRequestDependencyProvider</summary>
    
```php
<?php

namespace Pyz\Client\QuoteRequest;

use Spryker\Client\ProductConfigurationCart\Plugin\QuoteRequest\ProductConfigurationQuoteRequestQuoteCheckPlugin;
use Spryker\Client\QuoteApproval\Plugin\QuoteRequest\QuoteApprovalQuoteRequestQuoteCheckPlugin;
use Spryker\Client\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return \Spryker\Client\QuoteRequestExtension\Dependency\Plugin\QuoteRequestQuoteCheckPluginInterface[]
     */
    protected function getQuoteRequestQuoteCheckPlugins(): array
    {
        return [
            new ProductConfigurationQuoteRequestQuoteCheckPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the plugins work correctly:

1.  Add a configurable product with incomplete configuration to cart.
    
2.  Check that the Checkout and Request for quote buttons are not available.

{% endinfo_block %}


12. Set up product configuration validation plugins for the quote request module:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationQuoteRequestValidatorPlugin  |Validates customers' quote requests with the validators stack.  |None |  Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest|
| ProductConfigurationQuoteRequestUserValidatorPlugin | Validates agents assists' quote requests with the validators stack. | None |Spryker\Zed\ProductConfigurationCart\Communication\Plugin\QuoteRequest |

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
     * @return \Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestValidatorPluginInterface[]
     */
    protected function getQuoteRequestValidatorPlugins(): array
    {
        return [
            new ProductConfigurationQuoteRequestValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestUserValidatorPluginInterface[]
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
2. Add a configurable product with incomplete configuration to a cart.
3. Select **Save** or **Save and Back to Edit**.
4. Make sure that the validation error message appears.

{% endinfo_block %}

13. Set up wishlist plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductConfigurationItemExpanderPlugin | Expands `WishlistItem` transfer object with product configuration data. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist | 
|ProductConfigurationWishlistAddItemPreCheckPlugin | Checks if product configuration exists by provided `WishlistItem.sku` transfer property. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist | 
|ProductConfigurationWishlistReloadItemsPlugin | Expands `WishlistItem` transfers collection in `Wishlist` transfer object with product configuration data. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
|ProductConfigurationWishlistPreAddItemPlugin | Prepares product configuration attached to a wishlist item to be saved. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
|ProductConfigurationWishlistItemExpanderPlugin | Expands `WishlistItem` transfer object with product configuration data. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
|ProductConfigurationWishlistPreUpdateItemPlugin | Prepares product configuration attached to a wishlist item to be saved. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
|ProductConfigurationWishlistUpdateItemPreCheckPlugin | Checks if product configuration exists by provided `WishlistItem.sku` transfer property. | None | Spryker\Zed\ProductConfigurationWishlist\Communication\Plugin\Wishlist |
|ProductConfigurationWishlistCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollectionTransfer` with successfully added wishlist items to a cart. | None | Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist |
|ProductConfigurationWishlistPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollectionTransfer` with not valid product configuration items. | None | Spryker\Client\ProductConfigurationWishlist\Plugin\Wishlist |
|ProductConfigurationWishlistItemPriceProductExpanderPlugin | Expands collection of product price transfers with product configuration prices taken from `ProductViewTransfer`. | None | Spryker\Client\ProductConfigurationWishlist\Plugin\PriceProductStorage |

**src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php**

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

1.  Configure a configurable product.

2.  Add the configured product to wishlist.

3.  Make sure that the product has been successfully added to wishlist.

{% endinfo_block %}


### 5) Import data

The following imported entities will be used as product configurations in Spryker. Follow the steps to import product configuration data:  

1. Prepare data according to your requirements using the following demo data:

**data/import/product_configuration.csv**
```csv
concrete_sku,configurator_key,is_complete,default_configuration,default_display_data
093_24495843,DATE_TIME_CONFIGURATOR,0,"{""time_of_day"": ""2""}","{""Preferred time of the day"": ""Afternoon"", ""Date"": ""9.09.2020""}"
```


| COLUMN | Required | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| concrete_sku | ✓ | string | 093_24495843 | Unique product identifier. |
| configurator_key | ✓ | string | DATE_TIME_CONFIGURATOR | Unique identifier of a product configurator to be used for this product. | 
| is_complete |   | boolean | 0 | Defines if product configuration complete by default. | 
| default_configuration |  | text | `"{""time_of_day"": ""2""}"` | Defines default configuration. | 
| default_display_data |  | text | `"{""Preferred time of the day"": ""Afternoon"", ""Date"": ""9.09.2020""}"` | Defines default display data for the configuration. |

2. Register the following data import plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationDataImportPlugin | Imports product configuration data. | None | \Spryker\Zed\ProductConfigurationDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductConfigurationDataImport\Communication\Plugin\ProductConfigurationDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
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

Make sure that the configured data has been added to the `spy_product_cofiguration` table.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the feature front end.

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Product |{{page.version}} |[Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html)|

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require "spryker-feature/product-labels:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:


| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|DateTimeConfiguratorPageExample|vendor/spryker-shop/date-time-configurator-page-example|
|ProductConfigurationCartWidget|vendor/spryker-shop/product-configuration-cart-widget|
|ProductConfigurationWidget|vendor/spryker-shop/product-configuration-widget|
|ProductConfigurationWishlistWidget|vendor/spryker-shop/product-configuration-wishlist-widget|
|ProductConfiguratorGatewayPage|vendor/spryker-shop/product-configurator-gateway-page|
|SalesProductConfigurationWidget|vendor/spryker-shop/sales-product-configuration-widget|

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
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

Enable controllers as follows:

1.  Register the following route provider on the Storefront:
    

| PROVIDER | NAMESPACE |
| --- | --- |
|  ProductConfiguratorGatewayPageRouteProviderPlugin  | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\Router |


**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin\Router\ProductConfiguratorGatewayPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            new ProductConfiguratorGatewayPageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `yves.mysprykershop.com/product-configurator-gateway/request` and `yves.mysprykershop.com/product-configurator-gateway/response` routes are available for `POST` requests.

{% endinfo_block %}

2. Register the following reorder item expander plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationReorderItemExpanderPlugin | Expands items with product configuration based on data from order items. | None | SprykerShop\Yves\SalesProductConfigurationWidget\Plugin\CustomerReorderWidget |

**src/Pyz/Yves/CustomerReorderWidget/CustomerReorderWidgetDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\CustomerReorderWidget;

use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetDependencyProvider as SprykerCustomerReorderWidgetDependencyProvider;
use SprykerShop\Yves\SalesProductConfigurationWidget\Plugin\CustomerReorderWidget\ProductConfigurationReorderItemExpanderPlugin;

class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerReorderWidgetExtension\Dependency\Plugin\ReorderItemExpanderPluginInterface[]
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

1.  Order with a configurable product.
    
2.  Go to the *Order history* page on the Storefront.
    
3.  Select **Reorder** next to the order with the configurable product.
    
4.  Check that, in the cart, the configurable product has the configuration from the previous order.
    

{% endinfo_block %} 

3. Register the following gateway plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductDetailPageProductConfiguratorRequestStrategyPlugin | Finds the product configuration instance for a given product, maps it to ProductConfiguratorRequestTransfer, and sends the product configurator access token request. | None| SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| ProductDetailPageProductConfiguratorResponseStrategyPlugin | Maps the product configurator check sum response, validates it and replaces configuration for a given product in the session. | None | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| ProductDetailPageProductConfiguratorRequestDataFormExpanderStrategyPlugin | Extends the product configurator request form with the SKU field to support configuration for a product on the PDP page.| None | SprykerShop\Yves\ProductConfiguratorGatewayPage\Plugin|
| CartPageProductConfiguratorRequestStartegyPlugin | Finds configuration instance in quote, maps it to `ProductConfiguratorRequestTransfer` and sends product configurator access token request.| None | SprykerShop\Yves\ProductConfigurationCartWidget\Plugin|
| CartPageProductConfiguratorResponseStrategyPlugin | Maps the raw product configurator checksum response, validates it and replaces the corresponding item in a quote.| None | SprykerShop\Yves\ProductConfigurationCartWidget\Plugin |
| CartPageProductConfiguratorRequestDataFormExpanderStrategyPlugin | Extends the product configurator request form with SKU, quantity, and key group fields to support configuration for a cart item on a cart page.| None| SprykerShop\Yves\ProductConfigurationCartWidget\Plugin|
| WishlistPageProductConfiguratorRequestStrategyPlugin | Finds product configuration instance for given wishlist item, maps product configuration instance data to `ProductConfiguratorRequestTransfer`, and sends product configurator access token request. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |
| WishlistPageProductConfiguratorResponseStrategyPlugin | Maps the product configurator check sum response, validates it and replaces configuration for a given product in the wishlist item. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |
| WishlistPageProductConfiguratorRequestDataFormExpanderStrategyPlugin | Extends the product configurator request form with the `idWishlistItem`, 'sku' fields to support configuration for a wishlist item on the Wishlist page. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\ProductConfiguratorGatewayPage |

<details>
<summary markdown='span'>src/Pyz/Yves/ProductConfiguratorGatewayPage/ProductConfiguratorGatewayPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ProductConfiguratorGatewayPage;

use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorRequestDataFormExpanderStrategyPlugin;
use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorRequestStartegyPlugin;
use SprykerShop\Yves\ProductConfigurationCartWidget\Plugin\ProductConfiguratorGatewayPage\CartPageProductConfiguratorResponseStrategyPlugin;
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
        ];
    }
}

```
</details>

{% info_block warningBox "Verification" %}

Make sure that the plugins are set up correctly:

1. Go to the PDP of a configurable product, make sure that you are able to open the configurator page and return to the PDP with the configuration saved.
    
2. Add a configurable product to cart, go to the Cart page, make sure that you are able to open the configurator page and return to the Cart page with the configuration saved.

3. Add a configurable product to the wishlist, go to the wishlist page and make sure that you are able to open the configurator page and return to the wishlist page with the configuration saved.

{% endinfo_block %} 

1. Set up widgets as follows:

    1.  Register the following plugins to enable widgets:   

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationCartItemDisplayWidget | Displays the product configuration of cart items. | None | SprykerShop\Yves\ProductConfigurationWidget\Widget |
| ProductConfigurationCartPageButtonWidget | Displays the product configuration button for configurable cart items. | None | SprykerShop\Yves\ProductConfigurationCartWidget\Widget | 
| ProductConfigurationProductDetailPageButtonWidget | Displays the product configuration button for configurable products. | None | SprykerShop\Yves\ProductConfigurationWidget\Widget |
| ProductConfigurationProductViewDisplayWidget | Displays the product configuration of configurable products. | None | SprykerShop\Yves\ProductConfigurationCartWidget\Widget | 
| ProductConfigurationQuoteValidatorWidget | Displays if the configuration of configurable cart items is valid. | None | SprykerShop\Yves\ProductConfigurationWidget\Widget | 
| ProductConfigurationOrderItemDisplayWidget | Displays the product configuration of order items. | None | SprykerShop\Yves\SalesProductConfigurationWidget\Widget |
| ProductConfigurationWishlistFormWidget | Adds `has_product_configuration_attached` form hidden field to enable wishlist item expansion. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget |
| ProductConfigurationWishlistItemDisplayWidget | Displays the product configuration of wishlist items. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget |
| ProductConfigurationWishlistPageButtonWidget | Displays the product configuration button for configurable wishlist items. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**
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
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
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
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

{% endinfo_block %}


| WIDGET | VERIFICATION |
| --- | --- |
| ProductConfigurationCartItemDisplayWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationCartItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` | 
| ProductConfigurationCartPageButtonWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationCartPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| ProductConfigurationProductDetailPageButtonWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationProductDetailPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` | 
| ProductConfigurationProductViewDisplayWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationProductViewDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| ProductConfigurationQuoteValidatorWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationQuoteValidatorWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| ProductConfigurationOrderItemDisplayWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationOrderItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`|
| ProductConfigurationWishlistFormWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistFormWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`|
| ProductConfigurationWishlistItemDisplayWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistItemDisplayWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`|
| ProductConfigurationWishlistPageButtonWidget | `{% raw %}{%{% endraw %} widget 'ProductConfigurationWishlistPageButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`|

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that product configuration data is displayed on the *Product Details*, *Cart* and Wishlist pages.

{% endinfo_block %}

## Install an example date-time product configurator

Follow the steps below to install an exemplary date-time product configurator.

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Product |{{page.version}} |[Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html)| 

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:
```bash
composer require "spryker-shop/date-time-configurator-page-example:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:


| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| DateTimeConfiguratorPageExample | vendor/spryker-shop/date-time-configurator-page-example |


{% endinfo_block %}


### 2) Configure an endpoint
Configure an endpoint:

1.  Define a new front controller for the date-time configurator:
    

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

2. Adjust a Deploy file to enable the new endpoint:

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

Add translations as follows:

1.  Append glossary according to your configuration:
    
```yaml
demo_date_time_configurator_page.checkout.validation.error.price_is_not_valid,"Product configuration price is not valid",en_US
demo_date_time_configurator_page.checkout.validation.error.price_is_not_valid,"Der Produktkonfigurationspreis ist ungültig",de_DE
product_configurator_gateway_page.wishlist_item_id_required,"Wishlist item ID is required parameter.",en_US
product_configurator_gateway_page.wishlist_item_id_required,"Die ID des Wunschartikels ist ein erforderlicher Parameter.",de_DE
product_configurator_gateway_page.configurator_key_is_not_supported,"Configurator key is not supported.",en_US
product_configurator_gateway_page.configurator_key_is_not_supported,"Konfiguratorschlüssel wird nicht unterstützt.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up behavior
Set up behavior as follows:
1.  Set up the following plugins:
    
| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ExampleDateTimeConfiguratorAvailabilityStrategyPlugin | Returns `true` if a product configuration instance exists and has an appropriate configurator key. | None | SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\Availability |
| ExampleDateTimeProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data. | None | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationWidget | 
| ExampleDateTimeProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data. | None | SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\SalesProductConfigurationGui | 
|ExampleDateTimeSalesProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data. | None | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\SalesProductConfigurationWidget | 
| ExampleDateTimeCartProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data.| None | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationCartWidget|
|ExampleDateTimeProductConfiguratorRequestExpanderPlugin | Expands request to the configurator with the date-time configurator host. | None | SprykerShop\Client\DateTimeConfiguratorPageExample\Plugin\ProductConfiguration |
|ExampleDateTimeWishlistItemProductConfigurationRenderStrategyPlugin | Decodes JSON configuration data. | None | SprykerShop\Yves\DateTimeConfiguratorPageExample\Plugin\ProductConfigurationWishlistWidget |
|ProductConfigurationWishlistItemRequestExpanderPlugin | Expands `WishlistItem` with product configuration. | None | SprykerShop\Yves\ProductConfigurationWishlistWidget\Plugin\WishlistPage |

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\Availability\ExampleDateTimeConfiguratorAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return \Spryker\Zed\AvailabilityExtension\Dependency\Plugin\AvailabilityStrategyPluginInterface[]
     */
    protected function getAvailabilityStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeConfiguratorAvailabilityStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\Availability\ExampleDateTimeConfiguratorAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return \Spryker\Zed\AvailabilityExtension\Dependency\Plugin\AvailabilityStrategyPluginInterface[]
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
     * @return \Spryker\Zed\SalesProductConfigurationGuiExtension\Dependency\Plugin\ProductConfigurationRenderStrategyPluginInterface[]
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

{% info_block warningBox "Verification" %}

Make sure that the Twig configuration method `getZedDirectoryPathPatterns` has been expanded with additional paths for `ExampleDateTimeProductConfigurationRenderStrategyPlugin`.

{% endinfo_block %}

**src/Pyz/Zed/Twig/TwigConfig.php**
```php
<?php

<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigConfig as SprykerTwigConfig;

class TwigConfig extends SprykerTwigConfig
{
  public function getZedDirectoryPathPatterns(): array
  {
      $directories = array_merge(
          glob('vendor/spryker/spryker/Bundles/*/src/*/Zed/*/Presentation', GLOB_NOSORT | GLOB_ONLYDIR),
          glob('vendor/spryker/spryker-shop/Bundles/*/src/*/Zed/*/Presentation', GLOB_NOSORT | GLOB_ONLYDIR)
      );

      $directories = array_merge(
          $directories,
          parent::getZedDirectoryPathPatterns()
      );
      sort($directories);
      return $directories;
  }
}
```

**src/Pyz/Zed/SalesProductConfigurationGui/SalesProductConfigurationGuiDependencyProvider.php**
```php
<<?php

namespace Pyz\Zed\SalesProductConfigurationGui;

use Spryker\Zed\SalesProductConfigurationGui\SalesProductConfigurationGuiDependencyProvider as SprykerSalesProductConfigurationGuiDependencyProvider;
use SprykerShop\Zed\DateTimeConfiguratorPageExample\Communication\Plugin\SalesProductConfigurationGui\ExampleDateTimeProductConfigurationRenderStrategyPlugin;

class SalesProductConfigurationGuiDependencyProvider extends SprykerSalesProductConfigurationGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesProductConfigurationGuiExtension\Dependency\Plugin\ProductConfigurationRenderStrategyPluginInterface[]
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
     * @return \SprykerShop\Yves\SalesProductConfigurationWidgetExtension\Dependency\Plugin\SalesProductConfigurationRenderStrategyPluginInterface[]
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
     * @return \Spryker\Client\ProductConfigurationExtension\Dependency\Plugin\ProductConfiguratorRequestExpanderPluginInterface[]
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
     * @return \SprykerShop\Yves\ProductConfigurationCartWidgetExtension\Dependency\Plugin\CartProductConfigurationRenderStrategyPluginInterface[]
     */
    protected function getCartProductConfigurationRenderStrategyPlugins(): array
    {
        return [
            new ExampleDateTimeCartProductConfigurationRenderStrategyPlugin(),
        ];
    }
}
```

2. Set up the `DateTimeProductConfiguratorBuildFrontendConsole` console command in `ConsoleDependencyProvider` to be able to build the frontend assets for the configurator application.

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
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DateTimeProductConfiguratorBuildFrontendConsole(),
        ];
    }
}
```

3. Build the front-end application of the date-time configurator:
```bash
console frontend:date-time-product-configurator:build
```

{% info_block warningBox "Verification" %}

Make sure that the front-end part has been built:  
1. Check that the folder `public/Configurator/dist` exists, and it’s not empty.

2. Check that you can access the configurator at `https://date-time-configurator-example.mysprykershop.com/`.

{% endinfo_block %}


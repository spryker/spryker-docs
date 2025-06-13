

## Install feature core

Take the following steps to install the feature core.

### Prerequisites

Install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core                | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                            |
| Cart | {{site.version}} |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|
| Product | {{site.version}} |[Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)|
| Product Lists	 | {{site.version}} | [Install the Product Lists feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-lists-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/configurable-bundle:"^{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ConfigurableBundle | spryker/configurable-bundle |
| ConfigurableBundleGui | spryker/configurable-bundle-gui |
| ConfigurableBundleGuiExtension | spryker/configurable-bundle-gui-extension |
| ConfigurableBundleDataImport | spryker/configurable-bundle-data-import |
| ConfigurableBundleStorage | spryker/configurable-bundle-storage |
| ConfigurableBundlePageSearch | spryker/configurable-bundle-page-search |
| SalesConfigurableBundle | spryker/sales-configurable-bundle |
| ConfigurableBundleCart | spryker/configurable-bundle-cart |
| ConfigurableBundlePage | spryker-shop/configurable-bundle-page |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so that entity changes trigger the events:

**src/Pyz/Zed/ConfigurableBundle/Persistence/Propel/Schema/spy_configurable_bundle.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ConfigurableBundle\Persistence"
          package="src.Orm.Zed.ConfigurableBundle.Persistence">

    <table name="spy_configurable_bundle_template">
        <behavior name="event">
            <parameter name="spy_configurable_bundle_template_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_configurable_bundle_template_slot">
        <behavior name="event">
            <parameter name="spy_configurable_bundle_template_slot_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/ConfigurableBundleStorage/Persistence/Propel/Schema/spy_configurable_bundle_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ConfigurableBundleStorage\Persistence"
          package="src.Orm.Zed.ConfigurableBundleStorage.Persistence">

    <table name="spy_configurable_bundle_template_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool" />
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/ConfigurableBundlePageSearch/Persistence/Propel/Schema/spy_configurable_bundle_template_page_search.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ConfigurableBundlePageSearch\Persistence"
          package="src.Orm.Zed.ConfigurableBundlePageSearch.Persistence">

    <table name="spy_configurable_bundle_template_page_search">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_configurable_bundle_template | table | created |
| spy_configurable_bundle_template_slot | table | created |
| spy_sales_order_configured_bundle | table | created |
| spy_sales_order_configured_bundle_item | table | created |
| spy_configurable_bundle_template_storage | table | created |
| spy_configurable_bundle_template_page_search | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| SpyConfigurableBundleTemplateEntity | class | created | src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateEntityTransfer |
| SpyConfigurableBundleTemplateSlotEntity | class | created | src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateSlotEntityTransfer |
| SpySalesOrderConfiguredBundleEntity | class | created | src/Generated/Shared/Transfer/SpySalesOrderConfiguredBundleEntityTransfer |
| SpySalesOrderConfiguredBundleItemEntity | class | created | src/Generated/Shared/Transfer/SpySalesOrderConfiguredBundleItemEntityTransfer |
| SpyConfigurableBundleTemplateStorageEntity | class | created | src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateStorageEntityTransfer |
| UpdateConfiguredBundleRequest` | class | created | src/Generated/Shared/Transfer/UpdateConfiguredBundleRequestTransfer |
| SalesOrderConfiguredBundleTranslation | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTranslationTransfer |
| ConfiguredBundle | class | created | src/Generated/Shared/Transfer/ConfiguredBundleTransfer |
| ConfiguredBundleItem | class | created | src/Generated/Shared/Transfer/ConfiguredBundleItemTransfer |
| ConfigurableBundleTemplate | class | created |src/Generated/Shared/Transfer/ConfigurableBundleTemplateTransfer |
| ConfigurableBundleTemplateSlot | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotTransfer |
| ConfigurableBundleTemplateTranslation | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateTranslationTransfer |
| ConfigurableBundleTemplateSlotTranslation | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotTranslationTransfer |
| ConfigurableBundleTemplateFilter | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateFilterTransfer |
| ConfigurableBundleTemplateSlotFilter | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotFilterTransfer |
| ConfigurableBundleTemplateCollection | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateCollectionTransfer |
| ConfigurableBundleTemplateSlotCollection | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotCollectionTransfer |
| ConfigurableBundleTemplateResponse | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateResponseTransfer |
| ConfigurableBundleTemplateSlotResponse | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotResponseTransfer |
| ConfigurableBundleTemplateSlotEditForm | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotEditFormTransfer |
| ConfigurableBundleTemplateStorage | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateStorageTransfer |
| ConfigurableBundleTemplateSlotStorage | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotStorageTransfer |
| ConfigurableBundleTemplatePageSearch | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchTransfer |
| ConfigurableBundleTemplatePageSearchCollection | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchCollectionTransfer |
| ConfigurableBundleTemplatePageSearchFilter | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchFilterTransfer |
| ConfigurableBundleTemplatePageSearchRequest | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchRequestTransfer |
| ProductListUsedByTable` | class | created | src/Generated/Shared/Transfer/ProductListUsedByTableTransfer |
| ProductListUsedByTableRow | class | created | src/Generated/Shared/Transfer/ProductListUsedByTableRowTransfer |
| ButtonCollection | class | created | src/Generated/Shared/Transfer/ButtonCollectionTransfer |
| SalesOrderConfiguredBundleFilter | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleFilterTransfer |
| SalesOrderConfiguredBundleCollection | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleCollectionTransfer |
| SalesOrderConfiguredBundle | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTransfer` |
| SalesOrderConfiguredBundleItem|class|created| src/Generated/Shared/Transfer/SalesOrderConfiguredBundleItemTransfer |

{% endinfo_block %}

### 3) Add translations

Add the following translations.

#### Yves translations

{% info_block infoBox %}

Each configurable bundle template name needs to have Yves translations. Names are translated directly from `spy_configurable_bundle_template.name` field, for example—`configurable_bundle.templates.my-bundle.name`.

The same applies to configurable bundle template slots: `spy_configurable_bundle_template_slot.name` is translated as `spy_configurable_bundle.template_slots.my-slot.name`.

Name is represented by a slugified version of a name for the default locale. For example, the configurable bundle "All In" looks like `configurable-bundle-all-in`.

{% endinfo_block %}

1. Append the glossary according to your configuration:

<details>
<summary>src/data/import/glossary.csv</summary>

```yaml
configured_bundle.quantity,Quantity:,en_US
configured_bundle.quantity,Anzahl:,de_DE
configured_bundle.price,Item price:,en_US
configured_bundle.price,Stückpreis:,de_DE
configured_bundle.bundle_total,Bundle total:,en_US
configured_bundle.bundle_total,Bündel Gesamt:,de_DE
configured_bundle.total,Item total:,en_US
configured_bundle.total,Artikel Gesamt:,de_DE
configured_bundle.remove,"× remove",en_US
configured_bundle.remove,"× entfernen",de_DE
configured_bundle.order.items,Items in the bundle:,en_US
configured_bundle.order.items,Produkte in diesem Bündel:,de_DE
configured_bundle.item_sku,SKU:,en_US
configured_bundle.item_sku,SKU:,de_DE
configurable_bundle.template.validation.error.not_exists,Configurable bundle template does not exist.,en_US
configurable_bundle.template.validation.error.not_exists,Vorlage des konfigurierbaren Bündels existiert nicht.,de_DE
configurable_bundle.slot.validation.error.not_exists,Configurable bundle template slot does not exist.,en_US
configurable_bundle.slot.validation.error.not_exists,Vorlagenslot des konfigurierbaren Bündels existiert nicht.,de_DE
configurable_bundle.template.validation.error.already_activated,Configurable bundle template is already activated.,en_US
configurable_bundle.template.validation.error.already_activated,Vorlage des konfigurierbaren Bündels wurde schon aktiviert.,de_DE
configurable_bundle.template.validation.error.already_deactivated,Configurable bundle template is already deactivated.,en_US
configurable_bundle.template.validation.error.already_deactivated,Vorlage des konfigurierbaren Bündels wurde schon deaktiviert.,de_DE
configured_bundle_cart.error.configured_bundle_cannot_be_added,Configured bundle cannot be added to cart.,en_US
configured_bundle_cart.error.configured_bundle_cannot_be_added,Configured bundle cannot be added to cart.,de_DE
configured_bundle_cart.error.configured_bundle_not_found,Configured bundle with provided sku not found in cart.,en_US
configured_bundle_cart.error.configured_bundle_not_found,Konfiguriertes Bundle mit mitgelieferter SKU nicht im Warenkorb gefunden.,de_DE
configured_bundle_cart.error.configured_bundle_cannot_be_removed,Configured bundle cannot be removed from cart.,en_US
configured_bundle_cart.error.configured_bundle_cannot_be_removed,Das konfigurierte Bundle kann nicht aus dem Warenkorb entfernt werden.,de_DE
configured_bundle_cart.error.configured_bundle_cannot_be_updated,Configured bundle cannot be updated.,en_US
configured_bundle_cart.error.configured_bundle_cannot_be_updated,Konfiguriertes Bundle kann nicht aktualisiert werden.,de_DE
configured_bundle_widget.configured_bundle.removed,Configured bundle removed successfully.,en_US
configured_bundle_widget.configured_bundle.removed,Konfiguriertes Bundle erfolgreich entfernt.,de_DE
configured_bundle_widget.configured_bundle.updated,Configured bundle updated successfully.,en_US
configured_bundle_widget.configured_bundle.updated,Konfiguriertes Bundle wurde erfolgreich aktualisiert.,de_DE
configurable_bundle_page.select,Select,en_US
configurable_bundle_page.select,Auswählen,de_DE
configurable_bundle_page.unselect,Unselect,en_US
configurable_bundle_page.unselect,Unselect,de_DE
configurable_bundle_page.edit,Edit,en_US
configurable_bundle_page.edit,Edit,de_DE
configurable_bundle_page.configurator,Configurator,en_US
configurable_bundle_page.configurator,Konfigurator,de_DE
configurable_bundle_page.configurable_bundle_list,Configurable Bundle List,en_US
configurable_bundle_page.configurable_bundle_list,Configurable Bundle List,de_DE
configurable_bundle_page.choose_bundle_to_configure,Choose Bundle to configure,en_US
configurable_bundle_page.choose_bundle_to_configure,Choose Bundle to configure,de_DE
configurable_bundle_page.configurator.templates_not_found,There are no templates available.,en_US
configurable_bundle_page.configurator.templates_not_found,There are no templates available.,de_DE
configurable_bundle_page.template_not_found,Configurable bundle template not found.,en_US
configurable_bundle_page.template_not_found,Configurable bundle template not found.,de_DE
configurable_bundle_page.invalid_template_slot_combination,Invalid template/slot combination.,en_US
configurable_bundle_page.invalid_template_slot_combination,Invalid template/slot combination.,de_DE
configurable_bundle_page.configurator.tip.header,Create your own bundle.,en_US
configurable_bundle_page.configurator.tip.header,Create your own bundle.,de_DE
configurable_bundle_page.configurator.tip.text,"To create the bundle,  select the slot from the left side, and choose the product from the list.",en_US
configurable_bundle_page.configurator.tip.text,"To create the bundle,  select the slot from the left side, and choose the product from the list.",de_DE
configurable_bundle_page.configurator.selected_product,Selected product,en_US
configurable_bundle_page.configurator.selected_product,Selected product,de_DE
configurable_bundle_page.configurator.summary,Summary,en_US
configurable_bundle_page.configurator.summary,Summary,de_DE
configurable_bundle_page.configurator.add_to_cart,Add to Cart,en_US
configurable_bundle_page.configurator.add_to_cart,Add to Cart,de_DE
configurable_bundle_page.configurator.summary_page_locked,Product for at least one slot should be configured to visit Summary page.,en_US
configurable_bundle_page.configurator.summary_page_locked,Product for at least one slot should be configured to visit Summary page.,de_DE
configurable_bundle_page.configurator.summary_page_total,Total,en_US
configurable_bundle_page.configurator.summary_page_total,Gesamt,de_DE
configurable_bundle_page.configurator.added_to_cart,Configured bundle successfully added to cart.,en_US
configurable_bundle_page.configurator.added_to_cart,Configured bundle successfully added to cart.,de_DE
configurable_bundle_page.configurator.slot_became_unavailable,Configured slot with ID '%id%' became unavailable.,en_US
configurable_bundle_page.configurator.slot_became_unavailable,Configured slot with ID '%id%' became unavailable.,de_DE
configurable_bundle_page.configurator.product_became_unavailable,Product with SKU '%sku%' configured for slot with ID '%id%' became unavailable.,en_US
configurable_bundle_page.configurator.product_became_unavailable,Product with SKU '%sku%' configured for slot with ID '%id%' became unavailable.,de_DE
```

</details>

2. Optional: If you have existing or imported configurable bundle entities, provide translations for templates and slots following the example:

**src/data/import/glossary.csv**

```yaml
configurable_bundle.templates.configurable-bundle-all-in.name,"Configurable Bundle ""All in""",en_US
configurable_bundle.templates.configurable-bundle-all-in.name,"Konfigurierbares Bündel ""All in""",de_DE
configurable_bundle.templates.smartstation.name,Smartstation Kit,en_US
configurable_bundle.templates.smartstation.name,Smartstation-Kit,de_DE
configurable_bundle.template_slots.slot-1.name,Slot 1,en_US
configurable_bundle.template_slots.slot-1.name,Slot 1,de_DE
configurable_bundle.template_slots.slot-2.name,Slot 2,en_US
configurable_bundle.template_slots.slot-2.name,Slot 2,de_DE
configurable_bundle.template_slots.slot-3.name,Slot 3,en_US
configurable_bundle.template_slots.slot-3.name,Slot 3,de_DE
configurable_bundle.template_slots.slot-4.name,Slot 4,en_US
configurable_bundle.template_slots.slot-4.name,Slot 4,de_DE
configurable_bundle.template_slots.slot-5.name,Slot 5,en_US
configurable_bundle.template_slots.slot-5.name,Slot 5,de_DE
configurable_bundle.template_slots.slot-6.name,Slot 6,en_US
configurable_bundle.template_slots.slot-6.name,Slot 6,de_DE
```

3. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

#### Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that, when you make an order from a cart with a configured bundles, the bundle name is translated on the order page in Zed.

{% endinfo_block %}

### 4) Set up search

1. Add the page map plugin for the `configurable bundle template` entity.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplatePageMapPlugin | Builds the page map for the configurable bundle template entity. |  | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Search |

**src/Pyz/Zed/Search/SearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Search;

use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Search\ConfigurableBundleTemplatePageMapPlugin;
use Spryker\Zed\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\Search\Dependency\Plugin\PageMapInterface[]
     */
    protected function getSearchPageMapPlugins()
    {
        return [
            new ConfigurableBundleTemplatePageMapPlugin(),
        ];
    }
}
```

2. Add query expander and result formatter plugins for the `configurable bundle template` entity.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplatePageSearchResultFormatterPlugin | Maps raw search results from Elasticsearch to a transfer and returns the formatted result. |  | Spryker\Client\ConfigurableBundlePageSearch\Plugin\Elasticsearch\ResultFormatter |
|LocalizedQueryExpanderPlugin| Adds filtering by locale to search query.|  |Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander|

**src/Pyz/Client/ConfigurableBundlePageSearch/ConfigurableBundlePageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ConfigurableBundlePageSearch;

use Spryker\Client\ConfigurableBundlePageSearch\ConfigurableBundlePageSearchDependencyProvider as SprykerConfigurableBundlePageSearchDependencyProvider;
use Spryker\Client\ConfigurableBundlePageSearch\Plugin\Elasticsearch\ResultFormatter\ConfigurableBundleTemplatePageSearchResultFormatterPlugin;
use Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\LocalizedQueryExpanderPlugin;

class ConfigurableBundlePageSearchDependencyProvider extends SprykerConfigurableBundlePageSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getConfigurableBundleTemplatePageSearchResultFormatterPlugins(): array
    {
        return [
            new ConfigurableBundleTemplatePageSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getConfigurableBundleTemplatePageSearchQueryExpanderPlugins(): array
    {
        return [
            new LocalizedQueryExpanderPlugin(),
        ];
    }
}
```

### 5) Configure export to Redis and Elasticsearch

This step publishes tables on change (create, edit) to `spy_configurable_bundle_template_storage` and synchronizes the data to Storage.

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleStorageEventSubscriber | Registers listeners that are responsible for publishing configurable bundle storage template entity changes when a related entity change event occurs. |  | Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\Subscriber |
| ConfigurableBundleTemplatePageSearchEventSubscriber | Registers listeners that are responsible for publishing configurable bundle storage template entity changes to search when a related entity change event occurs. |  | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber\ConfigurableBundleTemplatePageSearchEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\Subscriber\ConfigurableBundleStorageEventSubscriber;

<details>
<summary></summary>
Your text
<br>
</details>

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ConfigurableBundleStorageEventSubscriber());
        $eventSubscriberCollection->add(new ConfigurableBundleTemplatePageSearchEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

#### Register the synchronization and synchronization error queues

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ConfigurableBundlePageSearch\ConfigurableBundlePageSearchConfig;
use Spryker\Shared\ConfigurableBundleStorage\ConfigurableBundleStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
        $queueOptionCollection->append($this->createQueueOption(ConfigurableBundleStorageConfig::CONFIGURABLE_BUNDLE_SYNC_STORAGE_QUEUE, ConfigurableBundleStorageConfig::CONFIGURABLE_BUNDLE_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ConfigurableBundlePageSearchConfig::CONFIGURABLE_BUNDLE_SEARCH_QUEUE, ConfigurableBundlePageSearchConfig::CONFIGURABLE_BUNDLE_SEARCH_ERROR_QUEUE));

        return $queueOptionCollection;
    }
}
```

#### Configure message processors

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ConfigurableBundlePageSearch\ConfigurableBundlePageSearchConfig;
use Spryker\Shared\ConfigurableBundleStorage\ConfigurableBundleStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ConfigurableBundleStorageConfig::CONFIGURABLE_BUNDLE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            ConfigurableBundlePageSearchConfig::CONFIGURABLE_BUNDLE_SEARCH_QUEUE => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

#### Set up regenerate and resync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateEventResourceBulkRepositoryPlugin | Allows populating empty storage tables with data. |  | Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event |
| ConfigurableBundleTemplatePageSearchEventResourceBulkRepositoryPlugin | Allows populating empty search tables with data. |  | Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event |
| ConfigurableBundleTemplateSynchronizationDataBulkPlugin | Allows synchronizing the entire storage table content into Storage. |  | Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Synchronization |
| ConfigurableBundleTemplatePageSynchronizationDataBulkPlugin | Allows synchronizing all of the content into Search. |  | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Synchronization |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\ConfigurableBundleTemplatePageSearchEventResourceBulkRepositoryPlugin;
use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\ConfigurableBundleTemplateEventResourceBulkRepositoryPlugin;
use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new ConfigurableBundleTemplateEventResourceBulkRepositoryPlugin(),
            new ConfigurableBundleTemplatePageSearchEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Synchronization\ConfigurableBundleTemplateSynchronizationDataBulkPlugin;
use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Synchronization\ConfigurableBundleTemplatePageSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateSynchronizationDataBulkPlugin(),
            new ConfigurableBundleTemplatePageSynchronizationDataBulkPlugin(),
        ];
    }
}
```

#### Configure synchronization pool name

**src/Pyz/Zed/ConfigurableBundleStorage/ConfigurableBundleStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ConfigurableBundleStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ConfigurableBundleStorage\ConfigurableBundleStorageConfig as SprykerConfigurableBundleStorageConfig;

class ConfigurableBundleStorageConfig extends SprykerConfigurableBundleStorageConfig
{
    /**
     * @return string|null
     */
    public function getConfigurableBundleTemplateSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/ConfigurableBundlePageSearch/ConfigurableBundlePageSearchConfig.php**

```php
<?php

namespace Pyz\Zed\ConfigurableBundlePageSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ConfigurableBundlePageSearch\ConfigurableBundlePageSearchConfig as SprykerConfigurableBundlePageSearch;
class ConfigurableBundlePageSearchConfig extends SprykerConfigurableBundlePageSearch
{
    /**
     * @return string|null
     */
    public function getConfigurableBundlePageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

{% info_block warningBox "Verification" %}

1. Add some data to the `spy_configurable_bundle_template` or `spy_configurable_bundle_template_slot` table.
2. Run the `console trigger:event -r configurable_bundle_template` command.
  Make sure the changes are reflected in `spy_configurable_bundle_template_storage` and `spy_configurable_bundle_template_page_search` tables.

3. Run the `console sync:data configurable_bundle_template` command.
    Make sure the data has been exported as follows:
    - from `spy_configurable_bundle_template_storage` table to Redis
    - from `spy_configurable_bundle_template_page_search` table to Elasticsearch

4. Create or edit a configurable bundle template or template slot through ORM.
  Make sure it's exported to Redis or Elasticsearch accordingly.

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| --- | --- | --- |
| Redis | ConfigurableBundleTemplate | kv:configurable_bundle_template:1 |
| Elasticsearch | ConfigurableBundleTemplate | configurable_bundle_template:en_us:1 |

**Example expected data fragment for Redis**

```xml
{
     "id_configurable_bundle_template": 2,
     "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
     "name": "configurable_bundle_templates.my-bundle.name",
     "slots": [
        [
            "id_configurable_bundle_template_slot": 6,
            "uuid": 9626de80-6caa-57a9-a683-2846ec5b6914,
            "name": "configurable_bundle.template_slots.slot-6.name",
            "id_product_list": 13
        ],
        [
            "id_configurable_bundle_template_slot": 7,
            "uuid": 2a5e55b1-993a-5510-864c-a4a18558aa75,
            "name": "configurable_bundle.template_slots.slot-7.name",
            "id_product_list": 14
        ]
    ]
}
```

**Example expected data fragment for Elasticsearch**

```xml
{
   "locale":"en_US",
   "type":"configurable_bundle_template",
   "search-result-data":{
      "idConfigurableBundleTemplate":1,
      "uuid":"8d8510d8-59fe-5289-8a65-19f0c35a0089",
      "name":"configurable_bundle.templates.configurable-bundle-all-in.nam"
   }
}
```

{% endinfo_block %}

### 6) Import data

Import the folowing data.

#### Import configurable bundles data

1. Prepare data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ConfigurableBundleDataImport/data/import/configurable_bundle_template.csv**

```yaml
configurable_bundle_template_key,configurable_bundle_template_uuid,configurable_bundle_template_name,configurable_bundle_template_is_active
t000001,8d8510d8-59fe-5289-8a65-19f0c35a0089,configurable_bundle.templates.configurable-bundle-all-in.name,1
t000002,c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de,configurable_bundle.templates.smartstation.name,1
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| configurable_bundle_template_key | ✓ | string | t000001 | Internal data import identifier for the configurable bundle template. |
| configurable_bundle_template_uuid |  | string | 8d8510d8-59fe-5289-8a65-19f0c35a0089 | Unique identifier for the configurable bundle. |
| configurable_bundle_template_name | ✓ | string | configurable_bundle.templates.smartstation.name | Glossary key for the configurable bundle name. |
| configurable_bundle_template_is_active | ✓ | bool | 1 | Defines if the bundle is active. |

**vendor/spryker/spryker/Bundles/ConfigurableBundleDataImport/data/import/configurable_bundle_template_slot.csv**

```yaml
configurable_bundle_template_slot_key,configurable_bundle_template_slot_name,configurable_bundle_template_slot_uuid,configurable_bundle_template_key,product_list_key
s000001,configurable_bundle.template_slots.slot-1.name,332b40ac-a789-57ce-bec0-23d8dddd71eb,t000001,pl-009
s000002,configurable_bundle.template_slots.slot-2.name,a7599d6b-9453-54b9-81d3-60a81effa883,t000001,pl-010
s000003,configurable_bundle.template_slots.slot-3.name,81cd2899-00aa-5da8-92df-374df8fcc72a,t000001,pl-011
s000004,configurable_bundle.template_slots.slot-4.name,c5f76e16-401e-56ba-9126-ac228d16f055,t000001,pl-012
s000005,configurable_bundle.template_slots.slot-5.name,9626de80-6caa-57a9-a683-2846ec5b6914,t000002,pl-013
s000006,configurable_bundle.template_slots.slot-6.name,2a5e55b1-993a-5510-864c-a4a18558aa75,t000002,pl-014
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| configurable_bundle_template_slot_key | ✓ | string | s000001 | Internal data import identifier for the configurable bundle template slot. |
| configurable_bundle_template_slot_name | ✓ | string | configurable_bundle.template_slots.slot-1.name | Name (glossary key) for the configurable bundle template slot.  |
| configurable_bundle_template_slot_uuid |  | string | 332b40ac-a789-57ce-bec0-23d8dddd71eb | Unique identifier for the configurable bundle template slot.  |
| configurable_bundle_template_key | ✓ | string | t000001 | Internal data import identifier for the configurable bundle template. |
| product_list_key | ✓ | string | pl-009 | ID of a product list that is allowed to be used in this slot. |

2. Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateDataImportPlugin | Imports configurable bundle template data into the database. |  | Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin |
| ConfigurableBundleTemplateSlotDataImportPlugin | Imports configurable bundle template slot data into the database. |  | Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin\ConfigurableBundleTemplateDataImportPlugin;
use Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin\ConfigurableBundleTemplateSlotDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateDataImportPlugin(),
            new ConfigurableBundleTemplateSlotDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import configurable-bundle-template
console data:import configurable-bundle-template-slot
```

{% info_block warningBox "Verification" %}

Make sure that the configurable bundle data has been added to the `spy_configurable_bundle_template` and `spy_configurable_bundle_template_slot` database tables.

{% endinfo_block %}

4. To add a navigation item, adjust the import data:

**data/import/navigation_node.csv**

```yaml
navigation_key,node_key,parent_node_key,node_type,title.en_US,url.en_US,css_class.en_US,title.de_DE,url.de_DE,css_class.de_DE,valid_from,valid_to
MAIN_NAVIGATION,node_key_48,node_key_18,link,Configurable Bundle List,/en/configurable-bundle/configurator/template-selection,,Configurable Bundle List,/de/configurable-bundle/configurator/template-selection,,,
```

{% info_block infoBox "" %}

Make sure to replace the sample node keys with your project specific ones.

{% endinfo_block %}

5. Import the updated navigation:

```bash
console data:import navigation-node
```

{% info_block warningBox "Verification" %}

Make sure the new navigation menu item is displayed on the Storefront.

{% endinfo_block %}

### 7) Set up behavior

Set up the following behaviors.

#### Set up the configurable bundles workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfiguredBundleOrderExpanderPlugin | Expands a sales order with configured bundles. Expands `ItemTransfer` with a configured bundle item. |  |Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales|
|ConfiguredBundlesOrderPostSavePlugin| Persists configured bundles from `ItemTransfer` in Quote to `sales_order` configured bundle tables. || Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales\ConfiguredBundleOrderExpanderPlugin;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales\ConfiguredBundlesOrderPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationPlugins()
    {
        return [
            new ConfiguredBundleOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
     */
    protected function getOrderPostSavePlugins()
    {
        return [
            new ConfiguredBundlesOrderPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Place an order with a configured bundle and make sure the following applies:

- Data has been saved to `spy_sales_order_configured_bundle_item` and `spy_sales_order_configured_bundle`.
- On the Storefront order details page, you can see items grouped by configured bundle details.

{% endinfo_block %}

#### Register preload, precheck and expander plugins for the Cart module

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartConfigurableBundlePreReloadPlugin | Removes items from a `QuoteTransfer` if its configurable bundle template was removed or became inactive. |  |Spryker\Zed\ConfigurableBundle\Communication\Plugin\Cart |
| ConfiguredBundleQuantityPostSavePlugin | Updates configured bundle quantity. Applies to items that have configurable properties. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |
| ConfiguredBundleQuantityPerSlotPreReloadItemsPlugin | Updates configured bundle quantity per slot. Applies to items that have configurable properties. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |
| ConfiguredBundleQuantityCartTerminationPlugin | Terminates add and remove product to the cart processes if configured bundle quantity isn't proportional to product quantity. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |
| ConfiguredBundleTemplateSlotCombinationPreCheckPlugin | Checks configurable bundle template with slot combinations. Adds an error message if wrong combinations are found. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |
| ConfiguredBundleQuantityPerSlotItemExpanderPlugin | Expands configured bundle items with quantity per slot. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |
| ConfiguredBundleGroupKeyItemExpanderPlugin | Expands items with configured bundle property with a group key. |  | Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart |

<details>
  <summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ConfigurableBundle\Communication\Plugin\Cart\CartConfigurableBundlePreReloadPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleGroupKeyItemExpanderPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleQuantityPerSlotItemExpanderPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleTemplateSlotCombinationPreCheckPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleQuantityCartTerminationPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleQuantityPerSlotPreReloadItemsPlugin;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleQuantityPostSavePlugin;

use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface[]
     */
    protected function getPreReloadPlugins(Container $container)
    {
        return [
            new CartConfigurableBundlePreReloadPlugin(),
            new ConfiguredBundleQuantityPerSlotPreReloadItemsPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new ConfiguredBundleQuantityPerSlotItemExpanderPlugin(),
            new ConfiguredBundleGroupKeyItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container)
    {
        return [
            new ConfiguredBundleTemplateSlotCombinationPreCheckPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container)
    {
        return [
            new ConfiguredBundleQuantityPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartTerminationPluginInterface[]
     */
    protected function getTerminationPlugins(Container $container)
    {
        return [
            new ConfiguredBundleQuantityCartTerminationPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Add a configurable bundle to cart. Delete or deactivate it. Make sure it's been removed from the cart.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Update configured bundle quantity on the cart page. Make sure the following applies:

- The quantity of each item in the bundle has changed.
- The quantity of bundle has changed.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. Add a configurable item to cart.
2. Make clean up for a configured bundle item in `session/database` storage: `$itemTransfer->getConfiguredBundleItem()->setQuantityPerSlot(null)`.
- Reload the cart page.
- Make sure that `ConfiguredBundleItem::quantityPerSlot` isn't `null`.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Set a wrong quantity to `ConfiguredBundle::quantity` for a configured bundle item. Make sure that, after updating the configured bundle quantity on cart page, an error flash message is displayed.

{% endinfo_block %}

#### Register delete precheck plugins for the ProductList module

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin | Finds configurable bundle template slots that use a given product list. If any slots that use the list are found, disallows deleting the list. |  | Spryker\Zed\ConfigurableBundle\Communication\Plugin\ProductList |

**src/Pyz/Zed/ProductList/ProductListDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductList;

use Spryker\Zed\ConfigurableBundle\Communication\Plugin\ProductList\ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin;
use Spryker\Zed\ProductList\ProductListDependencyProvider as SprykerProductListDependencyProvider;

class ProductListDependencyProvider extends SprykerProductListDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductListExtension\Dependency\Plugin\ProductListDeletePreCheckPluginInterface[]
     */
    protected function getProductListDeletePreCheckPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Assign a product list to a configurable bundle slot.
2. Try to delete the product list.
  Make sure an error is displayed.

{% endinfo_block %}

### 8) Configure Zed UI

Take the steps in the following sections to configure Zed UI.

#### Register plugins for the ConfigurableBundleGui module

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductListManagementConfigurableBundleTemplateSlotEditTabsExpanderPlugin | Expands the **Slot Edit** page tabs with additional product list management tabs. |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |
| ProductListManagementConfigurableBundleTemplateSlotEditFormExpanderPlugin | Expands the **Slot Edit** form with product list assignment subforms.  |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |
| ProductListManagementConfigurableBundleTemplateSlotEditFormDataProviderExpanderPlugin | Expands options for the **Slot Edit** form with product list management data. |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |
| ProductConcreteRelationCsvConfigurableBundleTemplateSlotEditFormFileUploadHandlerPlugin | Handles product concrete relation CSV file upload. |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |
| ProductConcreteRelationConfigurableBundleTemplateSlotEditSubTabsProviderPlugin | Provides subtabs for the **Assign Products** tab. |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |
| ProductConcreteRelationConfigurableBundleTemplateSlotEditTablesProviderPlugin | Provides tables for the **Assign Products** tab. |  | Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui |


<details>
<summary>src/Pyz/Zed/ConfigurableBundleGui/ConfigurableBundleGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ConfigurableBundleGui;

use Spryker\Zed\ConfigurableBundleGui\ConfigurableBundleGuiDependencyProvider as SprykerConfigurableBundleGuiDependencyProvider;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductConcreteRelationConfigurableBundleTemplateSlotEditSubTabsProviderPlugin;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductConcreteRelationConfigurableBundleTemplateSlotEditTablesProviderPlugin;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductConcreteRelationCsvConfigurableBundleTemplateSlotEditFormFileUploadHandlerPlugin;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductListManagementConfigurableBundleTemplateSlotEditFormDataProviderExpanderPlugin;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductListManagementConfigurableBundleTemplateSlotEditFormExpanderPlugin;
use Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui\ProductListManagementConfigurableBundleTemplateSlotEditTabsExpanderPlugin;

class ConfigurableBundleGuiDependencyProvider extends SprykerConfigurableBundleGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditTabsExpanderPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditTabsExpanderPlugins(): array
    {
        return [
            new ProductListManagementConfigurableBundleTemplateSlotEditTabsExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditFormExpanderPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditFormExpanderPlugins(): array
    {
        return [
            new ProductListManagementConfigurableBundleTemplateSlotEditFormExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditFormDataProviderExpanderPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditFormDataProviderExpanderPlugins(): array
    {
        return [
            new ProductListManagementConfigurableBundleTemplateSlotEditFormDataProviderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditFormFileUploadHandlerPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditFormFileUploadHandlerPlugins(): array
    {
        return [
            new ProductConcreteRelationCsvConfigurableBundleTemplateSlotEditFormFileUploadHandlerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditSubTabsProviderPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditSubTabsProviderPlugins(): array
    {
        return [
            new ProductConcreteRelationConfigurableBundleTemplateSlotEditSubTabsProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ConfigurableBundleGuiExtension\Dependency\Plugin\ConfigurableBundleTemplateSlotEditTablesProviderPluginInterface[]
     */
    protected function getConfigurableBundleTemplateSlotEditTablesProviderPlugins(): array
    {
        return [
            new ProductConcreteRelationConfigurableBundleTemplateSlotEditTablesProviderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the following tabs exist on the **Configurable Bundle Template Slot Edit** page:

- **Assign Categories**.
- **Assign Products**.

{% endinfo_block %}

#### Register plugins for the ProductListGui module

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateListProductListTopButtonsExpanderPlugin | Adds a button that opens the **Configurable Bundle Template list** page. |  | Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui |
| ConfigurableBundleTemplateProductListUsedByTableExpanderPlugin | Expands table data with configurable bundle templates and slots which use product listeners. |  | Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui |

**src/Pyz/Zed/ProductListGui/ProductListGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductListGui;

use Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui\ConfigurableBundleTemplateListProductListTopButtonsExpanderPlugin;
use Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui\ConfigurableBundleTemplateProductListUsedByTableExpanderPlugin;
use Spryker\Zed\ProductListGui\ProductListGuiDependencyProvider as SprykerProductListGuiDependencyProvider;

class ProductListGuiDependencyProvider extends SprykerProductListGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListTopButtonsExpanderPluginInterface[]
     */
    protected function getProductListTopButtonsExpanderPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateListProductListTopButtonsExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListUsedByTableExpanderPluginInterface[]
     */
    protected function getProductListUsedByTableExpanderPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateProductListUsedByTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following applies:
- On the **Overview of Product lists** page, the **Configurable Bundle Templates** button is displayed.
- On the **Edit Product List** page, the **Used by** table is populated by configurable bundle template slots.

{% endinfo_block %}

### 9) Build Zed UI frontend

Enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```

## Install feature frontend

Take the following steps to install the feature frontend.

### Prerequisites

Install the required features.

| Feature | Version | Installation guide |
| --- | --- | --- |
| -------------- | ----------------- | ----------------- |
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Cart | {{site.version}} |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|
| Product | {{site.version}} |[Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)|
| Prices | {{site.version}} | [Install the Prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/configurable-bundle: "^{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                            |
|-------------------------------|-----------------------------------------------|
| ConfigurableBundlePage        | spryker-shop/configurable-bundle-page         |
| ConfigurableBundleWidget      | spryker-shop/configurable-bundle-widget       |
| ConfigurableBundleNoteWidget  | spryker-shop/configurable-bundle-note-widget  |
| SalesConfigurableBundleWidget | spryker-shop/sales-configurable-bundle-widget |

{% endinfo_block %}

### 2) Enable controllers

Enable the controllers in the following sections.

#### Router List

Register router plugins:

| PROVIDER                                             | NAMESPACE                                                   |
|------------------------------------------------------|-------------------------------------------------------------|
| ConfigurableBundleWidgetRouteProviderPlugin          | SprykerShop\Yves\ConfigurableBundleWidget\Plugin\Router     |
| ConfigurableBundleWidgetAsyncRouteProviderPlugin     | SprykerShop\Yves\ConfigurableBundlePage\Plugin\Router       |
| ConfigurableBundlePageRouteProviderPlugin            | SprykerShop\Yves\ConfigurableBundlePage\Plugin\Router       |
| ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin | SprykerShop\Yves\ConfigurableBundleNoteWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ConfigurableBundleNoteWidget\Plugin\Router\ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin;
use SprykerShop\Yves\ConfigurableBundlePage\Plugin\Router\ConfigurableBundlePageRouteProviderPlugin;
use SprykerShop\Yves\ConfigurableBundleWidget\Plugin\Router\ConfigurableBundleWidgetAsyncRouteProviderPlugin;
use SprykerShop\Yves\ConfigurableBundleWidget\Plugin\Router\ConfigurableBundleWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new ConfigurableBundleWidgetRouteProviderPlugin(),
            new ConfigurableBundleWidgetAsyncRouteProviderPlugin(),
            new ConfigurableBundlePageRouteProviderPlugin(),
            new ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}


| PLUGIN | VERIFICATION |
| - | - |
| ConfigurableBundleWidgetRouteProviderPlugin | You can change the quantity and remove a configurable bundle from cart. |
| ConfigurableBundleWidgetAsyncRouteProviderPlugin | You can change the quantity and remove a configurable bundle from cart with the cart actions AJAX mode enabled. |
| ConfigurableBundlePageRouteProviderPlugin | You can go to the `/configurator/template-selection` page. |
| ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin | You can add a configurable item note with the cart actions AJAX mode enabled. |

{% endinfo_block %}

### 3) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteConfiguredBundleWidget | Displays configured bundles on the **Cart** page. |  | SprykerShop\Yves\ConfigurableBundleWidget\Widget |
| OrderConfiguredBundleWidget | Displays configured bundles on the **Order Details** page. |  | SprykerShop\Yves\SalesConfigurableBundleWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ConfigurableBundleWidget\Widget\QuoteConfiguredBundleWidget;
use SprykerShop\Yves\SalesConfigurableBundleWidget\Widget\OrderConfiguredBundleWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            QuoteConfiguredBundleWidget::class,
            OrderConfiguredBundleWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| WIDGET | VERIFICATION |
| --- | --- |
| QuoteConfiguredBundleWidget | Add a configurable bundle to cart. Make sure that, on the **Cart** page, items are grouped by the configurable bundle. |
| OrderConfiguredBundleWidget | Place an order with a configurable bundle. On the Storefront, go to the order's details page. Make sure the items are grouped by the configurable bundle.  |

{% endinfo_block %}

### 4) Set up configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ConfigurableBundleWidgetConfig::isQuantityChangeable() | Displays the block with the quantity input form. | Pyz\Yves\ConfigurableBundleWidget |

**src/Pyz/Yves/ConfigurableBundleWidget/ConfigurableBundleWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\ConfigurableBundleWidget;

use SprykerShop\Yves\ConfigurableBundleWidget\ConfigurableBundleWidgetConfig as SprykerShopConfigurableBundleWidgetConfig;

class ConfigurableBundleWidgetConfig extends SprykerShopConfigurableBundleWidgetConfig
{
    /**
     * @return bool
     */
    public function isQuantityChangeable(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

On the **Cart** page, make sure that, for each configured bundle, a field for entering quantity is displayed.

{% endinfo_block %}

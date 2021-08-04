---
title: Configurable Bundle Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/configurable-bundle-feature-integration
redirect_from:
  - /v5/docs/configurable-bundle-feature-integration
  - /v5/docs/en/configurable-bundle-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview, and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core	 | master |
| Cart | master |
| Product | master |
| Product Lists	 | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/configurable-bundle:"^202001.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `ConfigurableBundle` | `spryker/configurable-bundle` |
| `ConfigurableBundleGui` | `spryker/configurable-bundle-gui` |
| `ConfigurableBundleGuiExtension` | `spryker/configurable-bundle-gui-extension` |
| `ConfigurableBundleDataImport` | `spryker/configurable-bundle-data-import` |
| `ConfigurableBundleStorage` | `spryker/configurable-bundle-storage` |
| `ConfigurableBundlePageSearch` | `spryker/configurable-bundle-page-search` |
| `SalesConfigurableBundle` | `spryker/sales-configurable-bundle` |
| `ConfigurableBundleCart` | `spryker/configurable-bundle-cart` |
| `ConfigurableBundlePage` | `spryker-shop/configurable-bundle-page` |

{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Adjust the schema definition so that entity changes will trigger the events:

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

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_configurable_bundle_template` | table | created |
| `spy_configurable_bundle_template_slot` | table | created |
| `spy_sales_order_configured_bundle` | table | created |
| `spy_sales_order_configured_bundle_item` | table | created |
| `spy_configurable_bundle_template_storage` | table | created |
| `spy_configurable_bundle_template_page_search` | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `SpyConfigurableBundleTemplateEntity` | class | created | `src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateEntityTransfer` |
| `SpyConfigurableBundleTemplateSlotEntity` | class | created | `src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateSlotEntityTransfer` |
| `SpySalesOrderConfiguredBundleEntity` | class | created | `src/Generated/Shared/Transfer/SpySalesOrderConfiguredBundleEntityTransfer` |
| `SpySalesOrderConfiguredBundleItemEntity` | class | created | `src/Generated/Shared/Transfer/SpySalesOrderConfiguredBundleItemEntityTransfer` |
| `SpyConfigurableBundleTemplateStorageEntity` | class | created | `src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateStorageEntityTransfer` |
| `UpdateConfiguredBundleRequest` | class | created | `src/Generated/Shared/Transfer/UpdateConfiguredBundleRequestTransfer` |
| `SalesOrderConfiguredBundleTranslation` | class | created | `src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTranslationTransfer` |
| `ConfiguredBundle` | class | created | `src/Generated/Shared/Transfer/ConfiguredBundleTransfer` |
| `ConfiguredBundleItem` | class | created | `src/Generated/Shared/Transfer/ConfiguredBundleItemTransfer` |
| `ConfigurableBundleTemplate` | class | created |`src/Generated/Shared/Transfer/ConfigurableBundleTemplateTransfer` |
| `ConfigurableBundleTemplateSlot` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotTransfer` |
| `ConfigurableBundleTemplateTranslation` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateTranslationTransfer` |
| `ConfigurableBundleTemplateSlotTranslation` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotTranslationTransfer` |
| `ConfigurableBundleTemplateFilter` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateFilterTransfer` |
| `ConfigurableBundleTemplateSlotFilter` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotFilterTransfer` |
| `ConfigurableBundleTemplateCollection` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateCollectionTransfer` |
| `ConfigurableBundleTemplateSlotCollection` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotCollectionTransfer` |
| `ConfigurableBundleTemplateResponse` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateResponseTransfer` |
| `ConfigurableBundleTemplateSlotResponse` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotResponseTransfer` |
| `ConfigurableBundleTemplateSlotEditForm` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotEditFormTransfer` |
| `ConfigurableBundleTemplateStorage` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateStorageTransfer` |
| `ConfigurableBundleTemplateSlotStorage` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotStorageTransfer` |
| `ConfigurableBundleTemplatePageSearch` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchTransfer` |
| `ConfigurableBundleTemplatePageSearchCollection` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchCollectionTransfer` |
| `ConfigurableBundleTemplatePageSearchFilter` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchFilterTransfer` |
| `ConfigurableBundleTemplatePageSearchRequest` | class | created | `src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchRequestTransfer` |
| `ProductListUsedByTable` | class | created | `src/Generated/Shared/Transfer/ProductListUsedByTableTransfer` |
| `ProductListUsedByTableRow` | class | created | `src/Generated/Shared/Transfer/ProductListUsedByTableRowTransfer` |
| `ButtonCollection` | class | created | `src/Generated/Shared/Transfer/ButtonCollectionTransfer` |
| `SalesOrderConfiguredBundleFilter` | class | created | `src/Generated/Shared/Transfer/SalesOrderConfiguredBundleFilterTransfer` |
| `SalesOrderConfiguredBundleCollection` | class | created | `src/Generated/Shared/Transfer/SalesOrderConfiguredBundleCollectionTransfer` |
| `SalesOrderConfiguredBundle` | class | created | `src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTransfer` |
| `SalesOrderConfiguredBundleItem`|class|created| `src/Generated/Shared/Transfer/SalesOrderConfiguredBundleItemTransfer` |

{% endinfo_block %}

### 3) Add Translations

#### Yves Translations

{% info_block infoBox %}

Each configurable bundle template name needs to have Yves translations. Names are translated directly from `spy_configurable_bundle_template.name` field, e.g.: `configurable_bundle.templates.my-bundle.name`. 

Same rule is applied for configurable bundle template slots: `spy_configurable_bundle_template_slot.name` → `spy_configurable_bundle.template_slots.my-slot.name`

Name is represented by a slugified version of a name for default locale, e.g.: Configurable Bundle "All In" → `configurable-bundle-all-in`.

{% endinfo_block %}
Append glossary according to your configuration:

<details open>
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
configurable_bundle_page.configurator.tip.text,"To create the bundle, please select the slot from the left side, and choose the product from the list.",en_US
configurable_bundle_page.configurator.tip.text,"To create the bundle, please select the slot from the left side, and choose the product from the list.",de_DE
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
<br>
</details>

Please note, that if you have any configurable bundle entities already present or coming from data import, then you'll also need to provide translations for templates and slots as given in example below.

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

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

#### Zed Translations
Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that when you make an order from a cart with a configured bundles, bundle name is translated on the order page in Zed.

{% endinfo_block %}

### 4) Set up Search
Add the page map plugin for the *configurable bundle template* entity.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplatePageMapPlugin` | Builds page map for configurable bundle template entity | None | `Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Search` |

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

Add query expander and result-formatter plugins for the *configurable bundle template* entity.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplatePageSearchResultFormatterPlugin` | Maps raw search results from Elasticsearch to a transfer and returns the formatted result. | None | `Spryker\Client\ConfigurableBundlePageSearch\Plugin\Elasticsearch\ResultFormatter` |
|`LocalizedQueryExpanderPlugin`|Adds filtering by locale to search query.|None|`Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander`|

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

### 5) Configure Export to Redis and Elasticsearch
This step will publish tables on change (create, edit) to the spy_configurable_bundle_template_storage and synchronize the data to Storage.

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleStorageEventSubscriber` | Registers listeners that are responsible for publishing configurable bundle storage template entity changes when a related entity change event occurs. | None | `Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\Subscriber` |
| `ConfigurableBundleTemplatePageSearchEventSubscriber` | Registers listeners that are responsible for publishing configurable bundle storage template entity changes to search when a related entity change event occurs. | None | `Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber` |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Event;
 
use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber\ConfigurableBundleTemplatePageSearchEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\Subscriber\ConfigurableBundleStorageEventSubscriber;

<details open>
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

#### Register the Synchronization Queue and Synchronization Error Queue
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

#### Configure Message Processors

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

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplateEventResourceBulkRepositoryPlugin` | Allows populating empty storage table with data. | None | `Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event` |
| `ConfigurableBundleTemplatePageSearchEventResourceBulkRepositoryPlugin` | Allows populating empty search table with data. | None | `Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event` |
| `ConfigurableBundleTemplateSynchronizationDataBulkPlugin` | Allows synchronizing the entire storage table content into Storage. | None | `Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Synchronization` |
| `ConfigurableBundleTemplatePageSynchronizationDataBulkPlugin` | Allows synchronizing all of the content into Search. | None | `Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Synchronization` |

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

#### Configure Synchronization Pool Name 

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

1. Make sure that when you added some data to tables `spy_configurable_bundle_template` or `spy_configurable_bundle_template_slot` and run `console trigger:event -r configurable_bundle_template` command, the changes reflect in `spy_configurable_bundle_template_storage`  and  `spy_configurable_bundle_template_page_search` tables. 

2. Make sure that after step #1 or after command `console sync:data configurable_bundle_template` execution data is exported:

* from `spy_configurable_bundle_template_storage` table to Redis
* from `spy_configurable_bundle_template_page_search` table to Elasticsearch

3. Make sure that when a configurable bundle template (or template slot) created or edited through ORM, it is exported to Redis or Elasticsearch accordingly.

| header | header | header |
| --- | --- | --- |
| Redis | `ConfigurableBundleTemplate` | `kv:configurable_bundle_template:1` |
| Elasticsearch | `ConfigurableBundleTemplate` | `configurable_bundle_template:en_us:1` |

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

### 6) Import Data
#### Import Configurable Bundles Data
Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ConfigurableBundleDataImport/data/import/configurable_bundle_template.csv**

```yaml
configurable_bundle_template_key,configurable_bundle_template_uuid,configurable_bundle_template_name,configurable_bundle_template_is_active
t000001,8d8510d8-59fe-5289-8a65-19f0c35a0089,configurable_bundle.templates.configurable-bundle-all-in.name,1
t000002,c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de,configurable_bundle.templates.smartstation.name,1
```

| Column | Is Obligatory? | Data Type | Daa Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `configurable_bundle_template_key` | mandatory | string | `t000001` | Internal data import identifier for the configurable bundle template. |
| `configurable_bundle_template_uuid` | optional | string | `8d8510d8-59fe-5289-8a65-19f0c35a0089` | Unique identifier for the configurable bundle. |
| `configurable_bundle_template_name` | mandatory | string | `configurable_bundle.templates.smartstation.name` | Glossary key for the configurable bundle name. |
| `configurable_bundle_template_is_active` | mandatory | bool | `1` | `IsActive` flag for the configurable bundle name. |

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

| Column | Is Obligatory? | Data Type | Daa Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `configurable_bundle_template_slot_key` | mandatory | string | `s000001` | Internal data import identifier for the configurable bundle template slot. |
| `configurable_bundle_template_slot_name` | mandatory | string | `configurable_bundle.template_slots.slot-1.name` |Name (glossary key) for the configurable bundle template slot.  |
| `configurable_bundle_template_slot_uuid` | optional | string | `332b40ac-a789-57ce-bec0-23d8dddd71eb` |Unique identifier for the configurable bundle template slot.  |
| `configurable_bundle_template_key` | mandatory | string | `t000001` | Internal data import identifier for the configurable bundle template. |
| `product_list_key` | mandatory | string | `pl-009` | The ID of the product list for allowed products of the slot. |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplateDataImportPlugin` | Imports configurable bundle template data into the database. | None | `Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin` |
| `ConfigurableBundleTemplateSlotDataImportPlugin` | Imports configurable bundle template slot data into the database. | None | `Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin` |

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

Run the following console command to import data:

```bash
console data:import configurable-bundle-template
console data:import configurable-bundle-template-slot
```

{% info_block warningBox "Verification" %}

Make sure that the configurable bundle data is added to the `spy_configurable_bundle_template`, `spy_configurable_bundle_template_slot`  tables in the database.

{% endinfo_block %}

To add a new point into navigation, adjust import data:

**data/import/navigation_node.csv**

```yaml
navigation_key,node_key,parent_node_key,node_type,title.en_US,url.en_US,css_class.en_US,title.de_DE,url.de_DE,css_class.de_DE,valid_from,valid_to
MAIN_NAVIGATION,node_key_48,node_key_18,link,Configurable Bundle List,/en/configurable-bundle/configurator/template-selection,,Configurable Bundle List,/de/configurable-bundle/configurator/template-selection,,,
```

{% info_block infoBox "Info" %}

Don't forget to replace sample node keys with ones relevant for your project.

{% endinfo_block %}

Run the following command to import data:

```bash
console data:import navigation-node
```

{% info_block warningBox "Verification" %}

Navigate to your shop and make sure you can see a new item in the navigation menu.

{% endinfo_block %}

### 7) Set up Behavior
#### Set up Configurable Bundles Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfiguredBundleOrderExpanderPlugin` | Expands sales order by configured bundles. Expands ItemTransfer by configured bundle item. | None |`Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales`|
|`ConfiguredBundlesOrderPostSavePlugin`| Persists configured bundles from `ItemTransfer` in Quote to `sales_order` configured bundle tables. |None|`Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales` |

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

Make sure that when you place an order with a configured bundle:

* New data saved to `spy_sales_order_configured_bundle_item` and `spy_sales_order_configured_bundle`.
* You can see items grouped by configured bundle details on the order details page in Yves. (You can access it by clicking **View Order** here `http://mysprykershop.com/customer/overview`)

{% endinfo_block %}

#### Register Pre-load, Pre-check and Expander Plugins for the Cart Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CartConfigurableBundlePreReloadPlugin` | Removes items from the QuoteTransfer if its configurable bundle template was removed or became inactive. | None |`Spryker\Zed\ConfigurableBundle\Communication\Plugin\Cart` |
| `ConfiguredBundleQuantityPostSavePlugin` | Applies to items that have configurable properties. Updates configured bundle quantity. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |
| `ConfiguredBundleQuantityPerSlotPreReloadItemsPlugin` | Applies to items that have configurable properties. Updates configured bundle quantity per slot. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |
| `ConfiguredBundleQuantityCartTerminationPlugin` | Terminates add/remove product to the cart process if configured bundle quantity is not proportional to product quantity. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |
| `ConfiguredBundleTemplateSlotCombinationPreCheckPlugin` | Checks configurable bundle template/slot combinations. Adds error message if wrong combinations found. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |
| `ConfiguredBundleQuantityPerSlotItemExpanderPlugin` | Expands configured bundle items with the quantity per slot. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |
| `ConfiguredBundleGroupKeyItemExpanderPlugin` | Expands items with configured bundle property with the group key. | None | `Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart` |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure that deleted or deactivated configured bundles are removed from the cart.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure after updating the configured bundle quantity on cart page:

* The quantity of each item in the bundle has changed.
* The quantity of bundle has changed.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

* Make clean up for the configured bundle item (in `session/database` storage): `$itemTransfer->getConfiguredBundleItem()->setQuantityPerSlot(null)`;
* Reload cart page;
* Make sure that `ConfiguredBundleItem::quantityPerSlot` is not null.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

* Set the wrong quantity to `ConfiguredBundle::quantity` for the configured bundle item.
* Make sure that after updating the configured bundle quantity on cart page error flash message shown.

{% endinfo_block %}

#### Register Delete Pre-Check Plugins for the ProductList Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin` | Finds configurable bundle template slots that use a given Product List. Disallows Product List deleting if any usage cases found. | None | `Spryker\Zed\ConfigurableBundle\Communication\Plugin\ProductList` |

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

Make sure an error occurs while deleting a product list that was assigned to a slot.

{% endinfo_block %}

### 8) Configure Zed UI
#### Register Plugins for the ConfigurableBundleGui Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListManagementConfigurableBundleTemplateSlotEditTabsExpanderPlugin` | Expands **Slot Edit** page tabs with additional product list management tabs. | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |
| `ProductListManagementConfigurableBundleTemplateSlotEditFormExpanderPlugin` | Expands **Slot Edit** form with Product List assignment subforms.  | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |
| `ProductListManagementConfigurableBundleTemplateSlotEditFormDataProviderExpanderPlugin` | Expands options for **Slot Edit** form with Product List management data. | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |
| `ProductConcreteRelationCsvConfigurableBundleTemplateSlotEditFormFileUploadHandlerPlugin` | Handles Product Concrete Relation CSV file upload. | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |
| `ProductConcreteRelationConfigurableBundleTemplateSlotEditSubTabsProviderPlugin` | Provides subtabs for the Assign Products tab. | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |
| `ProductConcreteRelationConfigurableBundleTemplateSlotEditTablesProviderPlugin` | Provides tables for the Assign Products tab. | None | `Spryker\Zed\ProductListGui\Communication\Plugin\ConfigurableBundleGui` |


<details open>
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
<br>
</details>

{% info_block warningBox "Verification" %}

Make sure that on configurable bundle template slot edit page (`http://zed.mysprykershop.com/configurable-bundle-gui/slot/edit?id-configurable-bundle-template-slot=1`):

* **Assign Categories** tab exists.
* **Assign Products** tab exists.

{% endinfo_block %}

#### Register Plugins for the ProductListGui Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ConfigurableBundleTemplateListProductListTopButtonsExpanderPlugin` | Expands buttons list with button leads to a Configurable Bundle Template list page. | None | `Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui` |
| `ConfigurableBundleTemplateProductListUsedByTableExpanderPlugin` | Expands table data with Configurable Bundle Templates and Slots which use Product List. | None | `Spryker\Zed\ConfigurableBundleGui\Communication\Plugin\ProductListGui` |

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

Make sure that  **Configurable Bundle Templates** button exists on **Overview of Product lists** (`http://zed.mysprykershop.com/product-list-gui`) page.

Make sure that **Used by** table is populated by configurable bundle template slots on **Edit Product List** page  (in cases of relationship).

{% endinfo_block %}

### 9) Build Zed UI Frontend
Run the following command to enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Feature | Version |
| --- | --- |
| Spryker Core | 202001.0 |
| Cart | 202001.0 |
| Product | 202001.0 |
| Prices | 202001.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/configurable-bundle: "^202001.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Feature | Expected Directory |
| --- | --- |
| `ConfigurableBundleWidget` | `spryker-shop/configurable-bundle-widget` |
| `SalesConfigurableBundleWidget` | `spryker-shop/sales-configurable-bundle-widget` |

{% endinfo_block %}

### 2) Enable Controllers
#### Router List
Register router plugins:

| Provider | Namespace |
| --- | --- |
| `ConfigurableBundleWidgetRouteProviderPlugin` | `SprykerShop\Yves\ConfigurableBundleWidget\Plugin\Router` |
| `ConfigurableBundlePageRouteProviderPlugin` | `SprykerShop\Yves\ConfigurableBundlePage\Plugin\Router` |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\Router;
 
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ConfigurableBundlePage\Plugin\Router\ConfigurableBundlePageRouteProviderPlugin;
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
            new ConfigurableBundlePageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the `ConfigurableBundleWidgetRouteProviderPlugin`, make sure that you can change the quantity and remove the configurable bundle from the cart.

Verify the `ConfigurableBundlePageRouteProviderPlugin`, make sure that you can navigate to `/configurator/template-selection` page.

{% endinfo_block %}

### 3) Set up Widgets
Register the following plugins to enable widgets:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteConfiguredBundleWidget` | Displays configured bundles on a cart page. | None | `SprykerShop\Yves\ConfigurableBundleWidget\Widget` |
| `OrderConfiguredBundleWidget` | Displays configured bundles on the order details page. | None | `SprykerShop\Yves\SalesConfigurableBundleWidget\Widget` |

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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| Module | Test |
| --- | --- |
| `QuoteConfiguredBundleWidget` | Go to the cart (`http://mysprykershop.com/cart`) with a configured bundle, make sure that you see items grouped by the configured bundle. |
| `OrderConfiguredBundleWidget` | Go to the order that was made from a cart with a configured bundle, make sure that you see items grouped by the configured bundle. |

{% endinfo_block %}

### 4) Set up Configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `ConfigurableBundleWidgetConfig::isQuantityChangeable()` | Used to display block with quantity input form. | `Pyz\Yves\ConfigurableBundleWidget` |

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

Make sure that each configured bundle on the cart (`http://mysprykershop.com/cart`) contains a block with quantity input.

{% endinfo_block %}

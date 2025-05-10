

This document describes how to install the [CMS](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)|

### 1) Install the required modules

```bash
composer require spryker-feature/cms:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Cms | vendor/spryker/cms |
| CmsBlock | vendor/spryker/cms-block |
| CmsBlockCategoryStorage | vendor/spryker/cms-block-category-storage |
| CmsBlockGui | vendor/spryker/cms-block-gui |
| CmsBlockProductStorage | vendor/spryker/cms-block-product-storage |
| CmsBlockStorage | vendor/spryker/cms-block-storage |
| CmsContentWidget | vendor/spryker/cms-content-widget |
| CmsGui | vendor/spryker/cms-gui |
| CmsPageDataImport | vendor/spryker/cms-page-data-import |
| CmsPageSearch | vendor/spryker/cms-page-search |
| CmsSlot | vendor/spryker/cms-slot |
| CmsSlotBlock | vendor/spryker/cms-slot-block |
| CmsSlotBlockDataImport | vendor/spryker/cms-slot-block-data-import |
| CmsSlotBlockExtension | vendor/spryker/cms-slot-block-extension |
| CmsSlotBlockGui | vendor/spryker/cms-slot-block-gui |
| CmsSlotBlockGuiExtension | vendor/spryker/cms-slot-block-gui-extension |
| CmsSlotDataImport | vendor/spryker/cms-slot-data-import |
| CmsSlotGui | vendor/spryker/cms-slot-gui |
| CmsSlotStorage | vendor/spryker/cms-slot-storage |
| CmsStorage | vendor/spryker/cms-storage |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/Cms/Persistence/Propel/Schema/spy_cms.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Cms\Persistence" package="src.Orm.Zed.Cms.Persistence">

    <table name="spy_cms_page">
        <behavior name="event">
            <parameter name="spy_cms_page_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_cms_version">
        <behavior name="event">
            <parameter name="spy_cms_version_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/CmsBlock/Persistence/Propel/Schema/spy_cms_block.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CmsBlock\Persistence" package="src.Orm.Zed.CmsBlock.Persistence">

    <table name="spy_cms_block_glossary_key_mapping">
        <behavior name="event">
            <parameter name="spy_cms_block_glossary_key_mapping_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_cms_block" phpName="SpyCmsBlock">
        <behavior name="event">
            <parameter name="spy_cms_block_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_cms_block_store">
        <behavior name="event">
            <parameter name="spy_cms_block_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/CmsSlot/Persistence/Propel/Schema/spy_cms_slot.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CmsSlot\Persistence" package="src.Orm.Zed.CmsSlot.Persistence">

    <table name="spy_cms_slot">
        <behavior name="event">
            <parameter name="spy_cms_slot_all" column="*"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database.

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_cms_block | table | created |
| spy_cms_block_glossary_key_mapping | table | created |
| spy_cms_block_storage | table | created |
| spy_cms_block_store | table | created |
| spy_cms_block_template | table | created |
| spy_cms_glossary_key_mapping | table | created |
| spy_cms_page | table | created |
| spy_cms_page_localized_attributes | table | created |
| spy_cms_page_search | table | created |
| spy_cms_page_storage | table | created |
| spy_cms_page_store | table | created |
| spy_cms_slot | table | created |
| spy_cms_slot_block | table | created |
| spy_cms_slot_bloc_storage | table | created |
| spy_cms_slot_storage | table | created |
| spy_cms_slot_template | table | created |
| spy_cms_slot_to_cms_slot_template | table | created |
| spy_cms_template | table | created |
| spy_cms_version | table | created |

Make sure that the following changes have been applied in transfer objects.

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| SpyCmsTemplateEntity | class | created | src/Generated/Shared/Transfer/SpyCmsTemplateEntityTransfer |
| SpyCmsPageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsPageEntityTransfer |
| SpyCmsPageStoreEntity | class | created | src/Generated/Shared/Transfer/SpyCmsPageStoreEntityTransfer |
| SpyCmsGlossaryKeyMappingEntity | class | created | src/Generated/Shared/Transfer/SpyCmsGlossaryKeyMappingEntityTransfer |
| SpyCmsVersionEntity | class | created | src/Generated/Shared/Transfer/SpyCmsVersionEntityTransfer |
| SpyCmsBlockTemplateEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockTemplateEntityTransfer |
| SpyCmsBlockGlossaryKeyMappingEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockGlossaryKeyMappingEntityTransfer |
| SpyCmsBlockEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockEntityTransfer |
| SpyCmsBlockStorageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockStorageEntityTransfer |
| SpyCmsBlockStoreEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockStoreEntityTransfer |
| SpyCmsPageStorageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsPageStorageEntityTransfer |
| SpyCmsBlockProductStorageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockProductStorageEntityTransfer |
| SpyCmsBlockCategoryStorageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsBlockCategoryStorageEntityTransfer |
| SpyCmsSlotEntity | class | created | src/Generated/Shared/Transfer/SpyCmsSlotEntityTransfer |
| SpyCmsSlotBlockEntity | class | created | src/Generated/Shared/Transfer/SpyCmsSlotBlockEntityTransfer |
| SpyCmsSlotStorageEntity | class | created | src/Generated/Shared/Transfer/SpyCmsSlotStorageEntityTransfer |
| SpyCmsSlotTemplateEntity | class | created | src/Generated/Shared/Transfer/SpyCmsSlotTemplateEntity |
| SpyCmsSlotToCmsSlotTemplateEntity | class | created | src/Generated/Shared/Transfer/SpyCmsSlotToCmsSlotTemplateEntity |
| CmsTemplate | class | created | src/Generated/Shared/Transfer/CmsTemplateTransfer |
| Page | class | created | src/Generated/Shared/Transfer/PageTransfer |
| CmsPageLocalizedAttributes | class | created | src/Generated/Shared/Transfer/CmsPageLocalizedAttributesTransfer |
| PageKeyMapping | class | created | src/Generated/Shared/Transfer/PageKeyMappingTransfer |
| CmsBlock | class | created | src/Generated/Shared/Transfer/CmsBlockTransfer |
| CmsPage | class | created | src/Generated/Shared/Transfer/CmsPageTransfer |
| CmsPageAttributes | class | created | src/Generated/Shared/Transfer/CmsPageAttributesTransfer |
| CmsGlossary | class | created | src/Generated/Shared/Transfer/CmsGlossaryTransfer |
| CmsGlossaryAttributes | class | created | src/Generated/Shared/Transfer/CmsGlossaryAttributesTransfer |
| CmsPlaceholderTranslation | class | created | src/Generated/Shared/Transfer/CmsPlaceholderTranslationTransfer |
| CmsVersion | class | created | src/Generated/Shared/Transfer/CmsVersionTransfer |
| CmsVersionData | class | created | src/Generated/Shared/Transfer/CmsVersionDataTransfer |
| LocaleCmsPageData | class | created | src/Generated/Shared/Transfer/LocaleCmsPageDataTransfer |
| FlattenedLocaleCmsPageDataRequest | class | created | src/Generated/Shared/Transfer/FlattenedLocaleCmsPageDataRequestTransfer |
| StoreRelation | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer |
| Store | class | created | src/Generated/Shared/Transfer/StoreTransfer |
| CmsBlockGlossary | class | created | src/Generated/Shared/Transfer/CmsBlockGlossaryTransfer |
| CmsBlockGlossaryPlaceholder | class | created | src/Generated/Shared/Transfer/CmsBlockGlossaryPlaceholderTransfer |
| CmsBlockGlossaryPlaceholderTranslation | class | created | src/Generated/Shared/Transfer/CmsBlockGlossaryPlaceholderTranslationTransfer |
| CmsBlockTemplate | class | created | src/Generated/Shared/Transfer/CmsBlockTemplateTransfer |
| Category | class | created | src/Generated/Shared/Transfer/CategoryTransfer |
| CmsBlockCategoryPosition | class | created | src/Generated/Shared/Transfer/CmsBlockCategoryPositionTransfer |
| CmsBlockProduct | class | created | src/Generated/Shared/Transfer/CmsBlockProductTransfer |
| CmsContentWidgetConfigurationList | class | created | src/Generated/Shared/Transfer/CmsContentWidgetConfigurationListTransfer |
| CmsContentWidgetConfiguration | class | created | src/Generated/Shared/Transfer/CmsContentWidgetConfigurationTransfer |
| CmsContentWidgetFunctions | class | created | src/Generated/Shared/Transfer/CmsContentWidgetFunctionsTransfer |
| CmsContentWidgetFunction | class | created | src/Generated/Shared/Transfer/CmsContentWidgetFunctionTransfer |
| CmsPageMetaAttributes | class | created | src/Generated/Shared/Transfer/CmsPageMetaAttributesTransfer |
| CmsSlot | class | created | src/Generated/Shared/Transfer/CmsSlotTransfer |
| CmsSlotBlock | class | created | src/Generated/Shared/Transfer/CmsSlotBlockTransfer |
| CmsSlotBlockCollection | class | created | src/Generated/Shared/Transfer/CmsSlotBlockCollectionTransfer |
| CmsSlotBlockCondition | class | created | src/Generated/Shared/Transfer/CmsSlotBlockConditionTransfer |
| CmsSlotBlockCriteria | class | created | src/Generated/Shared/Transfer/CmsSlotBlockCriteriaTransfer |
| CmsSlotBlockStorage | class | created | src/Generated/Shared/Transfer/CmsSlotBlockStorageTransfer |
| CmsSlotCriteria | class | created | src/Generated/Shared/Transfer/CmsSlotCriteriaTransfer |
| CmsSlotExternalData | class | created | src/Generated/Shared/Transfer/CmsSlotExternalDataTransfer |
| CmsSlotParams | class | created | src/Generated/Shared/Transfer/CmsSlotParamsTransfer |
| CmsSlotStorage | class | created | src/Generated/Shared/Transfer/CmsSlotStorageTransfer |
| CmsSlotTemplate | class | created | src/Generated/Shared/Transfer/CmsSlotTemplateTransfer |
| CmsSlotTemplateConfiguration | class | created | src/Generated/Shared/Transfer/CmsSlotTemplateConfigurationTransfer |
| ConstraintViolation | class | created | src/Generated/Shared/Transfer/ConstraintViolationTransfer |
| Filter | class | created | src/Generated/Shared/Transfer/FilterTransfer |
| Message | class | created | src/Generated/Shared/Transfer/MessageTransfer |
| ValidationResponse | class | created | src/Generated/Shared/Transfer/ValidationResponseTransfer |

{% endinfo_block %}

### 3) Add translations

Update translations:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

You can switch the language in the **Back Office > User Control > User section > Edit > Interface language**. Make sure that the **Content Management** section is translatable.

{% endinfo_block %}

### 4) Configure export to Redis and Elasticsearch

1. Set up event listeners. By doing this step, you enable tables to be published upon a change—create, edit, or delete.

| PLUGIN | SPECIFICATION | REQUIRED | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- | --- |
| CmsStorageEventSubscriber | Registers listeners that are responsible for publishing CMS pages to storage when a related entity changes. | v |  | Spryker\Zed\CmsStorage\Communication\Plugin\Event\Subscriber |
| CmsBlockStorageEventSubscriber | Registers listeners that are responsible for publishing CMS blocks to storage when a related entity changes. | v |  | Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event\Subscriber |
| CmsPageSearchEventSubscriber | Registers listeners that are responsible for publishing CMS pages to Elasticsearch when a related entity changes. | v  |   | Spryker\Zed\CmsPageSearch\Communication\Plugin\Event\Subscriber |
| CmsSlotStorageEventSubscriber | Registers listeners that are responsible for publishing slots to storage when a related entity changes. | v  |  | Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event\Subscriber |
| CmsSlotBlockStorageEventSubscriber | Registers listeners that are responsible for publishing slots to CMS block relations to storage when a related entity changes. | v |  | Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Event\Subscriber | ContentStorageEventSubscriber | Registers listeners that are responsible for publishing content items to storage when a related entity changes. | v  |   | Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber
| CmsBlockCategoryStorageEventSubscriber | Registers listeners that are responsible for publishing category to CMS block relations to storage when a related entity changes |     |   | Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event\Subscriber |
| CmsBlockProductStorageEventSubscriber | Registers listeners that are responsible for publishing product to CMS block relations to storage when a related entity changes |   v  |   | Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event\Subscriber |

<details>
<summary>Pyz\Zed\Event\EventDependencyProvider</summary>

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event\Subscriber\CmsBlockCategoryStorageEventSubscriber;
use Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event\Subscriber\CmsBlockProductStorageEventSubscriber;
use Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event\Subscriber\CmsBlockStorageEventSubscriber;
use Spryker\Zed\CmsPageSearch\Communication\Plugin\Event\Subscriber\CmsPageSearchEventSubscriber;
use Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Event\Subscriber\CmsSlotBlockStorageEventSubscriber;
use Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event\Subscriber\CmsSlotStorageEventSubscriber;
use Spryker\Zed\CmsStorage\Communication\Plugin\Event\Subscriber\CmsStorageEventSubscriber;
use Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber\ContentStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        /**
         * Storage Events
         */
        $eventSubscriberCollection->add(new CmsStorageEventSubscriber());
        $eventSubscriberCollection->add(new CmsBlockStorageEventSubscriber());
        $eventSubscriberCollection->add(new CmsSlotBlockStorageEventSubscriber());
        $eventSubscriberCollection->add(new CmsSlotStorageEventSubscriber());
		$eventSubscriberCollection->add(new ContentStorageEventSubscriber());

		// Optional subscribers, use only if you need CMS Block relationship with categories or products.
        $eventSubscriberCollection->add(new CmsBlockCategoryStorageEventSubscriber());
        $eventSubscriberCollection->add(new CmsBlockProductStorageEventSubscriber());


        /**
         * Search Events
         */
        $eventSubscriberCollection->add(new CmsPageSearchEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```
</details>

1. Add Queue configuration.

**Pyz\Zed\Queue\QueueDependencyProvider**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\CmsPageSearch\CmsPageSearchConstants;
use Spryker\Shared\CmsStorage\CmsStorageConstants;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

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
            CmsStorageConstants::CMS_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            CmsPageSearchConstants::CMS_SYNC_SEARCH_QUEUE => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

**Pyz\Client\RabbitMq\RabbitMqConfig**

```php
<?php

namespace Pyz\Client\RabbitMq;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection->append($this->createQueueOption(CmsStorageConstants::CMS_SYNC_STORAGE_QUEUE, CmsStorageConstants::CMS_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CmsPageSearchConstants::CMS_SYNC_SEARCH_QUEUE, CmsPageSearchConstants::CMS_SYNC_SEARCH_ERROR_QUEUE));

        return $queueOptionCollection;
    }
}
```

3. Set up re-generate and re-sync features.

**src/Pyz/Zed/CmsSlotStorage/CmsSlotStorageConfig.php**

```php
<?php

namespace Pyz\Zed\CmsSlotStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\CmsSlotStorage\CmsSlotStorageConfig as SprykerCmsSlotStorageConfig;

class CmsSlotStorageConfig extends SprykerCmsSlotStorageConfig
{
    /**
     * @return string|null
     */
    public function getCmsSlotStorageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/CmsSlotBlockStorage/CmsSlotBlockStorageConfig.php**

```php
<?php

namespace Pyz\Zed\CmsSlotBlockStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\CmsSlotBlockStorage\CmsSlotBlockStorageConfig as SprykerCmsSlotBlockStorageConfig;

class CmsSlotBlockStorageConfig extends SprykerCmsSlotBlockStorageConfig
{
    /**
     * @return string|null
     */
    public function getCmsSlotBlockSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

4. Enable synchronization plugins to be re-synchronize data manually (sending data from `*_storage` and `*_search` tables to Storage and Search).

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CmsPageSynchronizationDataPlugin | Synchronizes the `spy_cms_page_search` table content into Elasticsearch. | None | Spryker\Zed\CmsPageSearch\Communication\Plugin\Synchronization |
| CmsSynchronizationDataPlugin | Synchronizes the `spy_cms_page_storage` table content into Storage. | None | Spryker\Zed\CmsStorage\Communication\Plugin\Synchronization |
| CmsBlockSynchronizationDataPlugin | Synchronizes the `spy_cms_block_storage` table content into Storage. | None | Spryker\Zed\CmsBlockStorage\Communication\Plugin\Synchronization |
| CmsSlotBlockSynchronizationDataBulkPlugin | Synchronizes the `spy_cms_slot_block_storage` table content into Storage. | None | Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Synchronization |
| CmsSlotSynchronizationDataBulkPlugin | Synchronizes the `spy_cms_slot_storage` table content into Storage. | None | Spryker\Zed\CmsSlotStorage\Communication\Plugin\Synchronization |
| ContentStorageSynchronizationDataPlugin | Synchronizes the `spy_content_storage` table content into Storage. | None | Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization |
| CmsBlockCategorySynchronizationDataPlugin | Synchronizes the `spy_cms_block_categoty_storage` table content into Storage. (*optional*) | None | Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Synchronization |
| CmsBlockProductSynchronizationDataPlugin | Synchronizes the `spy_cms_block_product_storage` table content into Storage. (*optional*) | None | Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Synchronization\CmsBlockCategorySynchronizationDataPlugin;
use Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Synchronization\CmsBlockProductSynchronizationDataPlugin;
use Spryker\Zed\CmsBlockStorage\Communication\Plugin\Synchronization\CmsBlockSynchronizationDataPlugin;
use Spryker\Zed\CmsPageSearch\Communication\Plugin\Synchronization\CmsPageSynchronizationDataPlugin;
use Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Synchronization\CmsSlotBlockSynchronizationDataBulkPlugin;
use Spryker\Zed\CmsSlotStorage\Communication\Plugin\Synchronization\CmsSlotSynchronizationDataBulkPlugin;
use Spryker\Zed\CmsStorage\Communication\Plugin\Synchronization\CmsSynchronizationDataPlugin;
use Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization\ContentStorageSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CmsPageSynchronizationDataPlugin(),
			new CmsBlockSynchronizationDataPlugin(),
            new CmsSynchronizationDataPlugin(),
            new CmsSlotBlockSynchronizationDataBulkPlugin(),
            new CmsSlotSynchronizationDataBulkPlugin(),
			new ContentStorageSynchronizationDataPlugin(),

			// Optional subscribers, use only if you need CMS Block relationship with categories or products.
			new CmsBlockCategorySynchronizationDataPlugin(),
            new CmsBlockProductSynchronizationDataPlugin(),
        ];
    }
}
```

5. Enable event trigger plugins to be able to retrigger publish events.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CmsPageEventResourceQueryContainerPlugin | Triggers publish events for all or particular CMS pages (using the ID identifier) which sends them to the `spy_cms_page_search` table. | None | Spryker\Zed\CmsPageSearch\Communication\Plugin\Event |
| CmsEventResourceQueryContainerPlugin | Triggers publish events for all or particular CMS pages (using the ID identifier) which sends them to the `spy_cms_page_storage` table. | None | Spryker\Zed\CmsStorage\Communication\Plugin\Event |
| CmsBlockEventResourceQueryContainerPlugin | Triggers publish events for all or particular CMS blocks (using the ID identifier) which sends them to the `spy_cms_block_storage` table. | None | Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event |
| CmsSlotEventResourceBulkRepositoryPlugin | Triggers publish events for all or particular slots (using the ID identifier) which sends them to the `spy_cms_slot_storage` table. | None | Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event |
| CmsSlotBlockEventResourceBulkRepositoryPlugin | Triggers publish events for all or particular CMS block to slot assignments (using the ID identifier) which sends them to the `spy_cms_slot_block_storage` table. | None | Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\EventBehavior |
| ContentStorageEventResourceBulkRepositoryPlugin | Triggers publish events for all or particular content items (using the ID identifier) which sends them to `spy_content_storage` table. | None | Spryker\Zed\ContentStorage\Communication\Plugin\Event |
| CmsBlockCategoryEventResourceQueryContainerPlugin | Triggers publish events for all or particular CMS block to category relationships (using the ID identifier) which sends them to the `spy_cms_block_category_storage` table. (*optional*) | None | Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event |
| CmsBlockProductEventResourceQueryContainerPlugin| Triggers publish events for all or particular CMS block to product relationships (using the ID identifier) which sends them to the `spy_cms_block_category_storage` table. (*optional*) | None | Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event\CmsBlockCategoryEventResourceQueryContainerPlugin;
use Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event\CmsBlockProductEventResourceQueryContainerPlugin;
use Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event\CmsBlockEventResourceQueryContainerPlugin;
use Spryker\Zed\CmsPageSearch\Communication\Plugin\Event\CmsPageEventResourceQueryContainerPlugin;
use Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\EventBehavior\CmsSlotBlockEventResourceBulkRepositoryPlugin;
use Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event\CmsSlotEventResourceBulkRepositoryPlugin;
use Spryker\Zed\CmsStorage\Communication\Plugin\Event\CmsEventResourceQueryContainerPlugin;
use Spryker\Zed\ContentStorage\Communication\Plugin\Event\ContentStorageEventResourceBulkRepositoryPlugin;
use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new CmsPageEventResourceQueryContainerPluginCmsBlockEventResourceQueryContainerPlugin(),
            new CmsBlockEventResourceQueryContainerPluginCmsEventResourceQueryContainerPlugin(),
            new CmsEventResourceQueryContainerPluginCmsSlotBlockEventResourceBulkRepositoryPlugin(),
            new CmsSlotBlockEventResourceBulkRepositoryPluginCmsSlotEventResourceBulkRepositoryPlugin(),
            			new CmsSlotEventResourceBulkRepositoryPluginContentStorageEventResourceBulkRepositoryPlugin(),

			// Optional subscribers, use only if you need CMS Block relationship with categories or products.
            new CmsBlockCategoryEventResourceQueryContainerPlugin(),
            new CmsBlockProductEventResourceQueryContainerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that all the CMS entity changes performed manually in the Back Office are exported or removed from Redis and Elasticsearch accordingly.

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| --- | --- | --- |
| Redis | CmsBlock | cms\_block:de:de\_de:blck-1 |
| Redis | CmsBlockCategory | cms\_block\_category:5 |
| Redis | CmsBlockProduct | cms\_block\_product:93 |
| Redis | CmsPage | cms\_page:de:de\_de:1 |
| Redis | CmsSlot | cms_slot:slt-1 |
| Redis | CmsSlotBlock | cms\_slot\_block:@productdetailpage/views/pdp/pdp.twig:slt-5 |
| Elasticsearch | CmsPage | cms\_page:de:de\_de:6 |

{% endinfo_block %}

<details>
<summary>Example Expected Data Fragment: Redis, CmsBlock</summary>

```json
{
  "id_cms_block": 1,
  "fk_template": 1,
  "is_active": true,
  "key": "blck-1",
  "name": "Teaser for home page",
  "valid_from": null,
  "valid_to": null,
  "CmsBlockTemplate": {
    "id_cms_block_template": 1,
    "template_name": "Title and description block",
    "template_path": "@CmsBlock\/template\/title_and_description_block.twig"
  },
  "SpyCmsBlockGlossaryKeyMappings": [
    {
      "id_cms_block_glossary_key_mapping": 1,
      "fk_cms_block": 1,
      "fk_glossary_key": 1594,
      "placeholder": "title",
      "GlossaryKey": {
        "id_glossary_key": 1594,
        "is_active": true,
        "key": "generated.cms.cms-block.Title-and-description-block.title.idCmsBlock.1.uniqueId.1"
      }
    },
    {
      "id_cms_block_glossary_key_mapping": 2,
      "fk_cms_block": 1,
      "fk_glossary_key": 1595,
      "placeholder": "description",
      "GlossaryKey": {
        "id_glossary_key": 1595,
        "is_active": true,
        "key": "generated.cms.cms-block.Title-and-description-block.description.idCmsBlock.1.uniqueId.1"
      }
    }
  ],
  "SpyCmsBlockStores": [
    {
      "id_cms_block_store": 6,
      "fk_cms_block": 1,
      "fk_store": 3,
      "SpyStore": {
        "id_store": 3,
        "name": "US"
      }
    },
    {
      "id_cms_block_store": 5,
      "fk_cms_block": 1,
      "fk_store": 2,
      "SpyStore": {
        "id_store": 2,
        "name": "AT"
      }
    },
    {
      "id_cms_block_store": 4,
      "fk_cms_block": 1,
      "fk_store": 1,
      "SpyStore": {
        "id_store": 1,
        "name": "DE"
      }
    }
  ],
  "content_widget_parameter_map": [],
  "_timestamp": 1574922736.1419849
}
```
</details>

**Example Expected Data Fragment: Redis, CmsBlockCategory**

```json
{
  "id_category": 5,
  "cms_block_categories": [
    {
      "position": "top",
      "block_names": [
        "CMS block for category Computers"
      ],
      "block_keys": [
        "blck-7"
      ]
    }
  ],
  "_timestamp": 1574922738.1811531
}
```

**Example Expected Data Fragment: Redis, CmsBlockProduct**

```json
{
  "id_product_abstract": 93,
  "block_names":
  [
    "Product SEO content"
  ],
  "block_keys":
  [
    "blck-3"
  ]
}
```

**Example Expected Data Fragment: Redis, CmsPage**

```json
{
  "id_cms_page": 1,
  "name": "Impressum",
  "template_path": "@Cms\/templates\/placeholders-title-content\/placeholders-title-content.twig",
  "placeholders": {
    "title": "<h2>Impressum<\/h2>",
    "content": "content page"
  },
  "meta_title": "Impressum",
  "meta_keywords": "Impressum",
  "meta_description": "Impressum",
  "url": "\/de\/impressum",
  "valid_from": null,
  "valid_to": null,
  "is_active": true,
  "is_searchable": null,
  "store_name": null,
  "content_widget_parameter_map": [],
  "_timestamp": 1574922739.2661631
}
```

**Example Expected Data Fragment: Redis, CmsSlot**

```json
{
  "key": "slt-1",
  "content_provider_type": "SprykerCmsSlotBlock",
  "name": "Main",
  "description": "As homepage is all content so it has one slot.",
  "is_active": true,
  "_timestamp": 1574922740.299572
}
```

**Example Expected Data Fragment: Redis, CmsSlotBlock**

```json
{
  "cmsSlotBlocks": [
    {
      "cmsBlockKey": "blck-3",
      "conditions": {
        "productCategory": {
          "all": false,
          "productIds": [
            35,
            66,
            78,
            86,
            93,
            139
          ],
          "categoryIds": []
        }
      }
    }
  ],
  "_timestamp": 1574937317.705245
}
```

**Example Expected Data Fragment: Elasticsearch, CmsPage**

```json
{
  "store":"DE",
  "locale":"de_DE",
  "type":"cms_page",
  "is-active":true,
  "search-result-data": {
    "id_cms_page":6,
    "name":"Demo Landing Page",
    "type":"cms_page",
    "url":"/de/demo-landing-page",
  },
  "full-text-boosted": [
    "Demo Landing Page",
  ],
  "full-text": [
    "Demo Landing Page",
    "demo,cms page, landing page",
    "This is a demo landing page with different content widgets.",
    "<p style='text-align: center; '><b><span style='font-size: 24px;'>DAS IST EINE GROßARTIGE LANDING PAGE</span></b></p>,<p></p>{% raw %}{{{% endraw %} content_banner(\'a396f4cb-2318-5b33-8d85-413354ca5673\', \'top-title\'} {% raw %}}}{% endraw %}<p> </p><br><p></p>"
  ],
  "suggestion-terms": [
    "Demo Landing Page"
  ],
  "completion-terms": [
    "Demo Landing Page"
  ],
  "string-sort": {
    "name":"Demo Landing Page"
  }
}
```

### 5) Register XSS Protection Form plugin

1. Enable the form plugin to add XSS protection options in Backoffice.

| PLUGIN                             | SPECIFICATION                                                                                       | PREREQUISITES | NAMESPACE                                 |
|------------------------------------|-----------------------------------------------------------------------------------------------------|---------------|-------------------------------------------|
| SanitizeXssTypeExtensionFormPlugin | Registers options `allowed_attributes`, `allowed_html_tags`, `sanitize_xss` in Backoffice CMS forms | None          | Spryker\Zed\Gui\Communication\Plugin\Form |

**src/Pyz/Zed/Form/FormDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Form;

use Spryker\Zed\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Zed\Gui\Communication\Plugin\Form\SanitizeXssTypeExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface>
     */
    protected function getFormPlugins(): array
    {
        $plugins = [
            new SanitizeXssTypeExtensionFormPlugin(),
        ];

        return $plugins;
    }
}
```

### 6) Import CMS pages

1. Prepare your pages data according to your requirements using our demo data:

<details>
<summary>vendor/spryker/cms-page-data-import/data/import/cms_page.csv</summary>

```yaml
page_key,template_name,is_searchable,is_active,publish,url.de_DE,url.en_US,name.de_DE,name.en_US,meta_title.de_DE,meta_title.en_US,meta_keywords.de_DE,meta_keywords.en_US,meta_description.de_DE,meta_description.en_US,placeholder.title.de_DE,placeholder.title.en_US,placeholder.content.de_DE,placeholder.content.en_US
cms-page--1,Placeholders Title & Content,1,1,1,/de/impressum,/en/imprint,Impressum,Imprint,Impressum,Imprint,Impressum,Imprint,Impressum,Imprint,<h2>Impressum</h2>,<h2>About</h2>,"<p>Demoshop<br/> Julie-Wolfthornstraße 1<br/>10555 Berlin</p><p>Telefon: 030 5678909<br/> E-Mail: <a href=""mailto:info@spryker.com"">info@spryker.com</a><br/></p><p><strong>Vertreten durch:</strong><br/>Spryker<br/>Geschäftsführer: Max Mustermann<br/>Registergericht: Hamburg<br/>Registernummer: 56789</p><p><strong>Registereintrag:</strong><br/>Eingetragen im Handelsregister.<br/>Registergericht: Hamburg<br/>Registernummer: 34567888456789</p><p><strong>Umsatzsteuer-ID: </strong><br/>Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz:<br/>34567</p><p>Quelle: <a href=""http://www.experten-branchenbuch.de/""&gt;www.experten-branchenbuch.de&lt;/a&gt;&lt;/p&gt;&lt;br/&gt;&lt;br/&gt;&lt;h2&gt;Datenschutzerklärung:&lt;/h2&gt;&lt;p&gt;&lt;strong&gt;Datenschutz&lt;/strong&gt;&lt;br/>Nachfolgend möchten wir Sie über unsere Datenschutzerklärung informieren. Sie finden hier Informationen über die Erhebung und Verwendung persönlicher Daten bei der Nutzung unserer Webseite. Wir beachten dabei das für Deutschland geltende Datenschutzrecht. Sie können diese Erklärung jederzeit auf unserer Webseite abrufen. <br/><br/> Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann. <br/><br/> Die Verwendung der Kontaktdaten unseres Impressums zur gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei denn wir hatten zuvor unsere schriftliche Einwilligung erteilt oder es besteht bereits eine Geschäftsbeziehung. Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe ihrer Daten. <br/><br/> <strong>Personenbezogene Daten</strong> <br/> Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Soweit auf unseren Seiten personenbezogene Daten (wie Name, Anschrift oder E-Mail Adresse) erhoben werden, erfolgt dies, soweit möglich, auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Sofern zwischen Ihnen und uns ein Vertragsverhältnis begründet, inhaltlich ausgestaltet oder geändert werden soll oder Sie an uns eine Anfrage stellen, erheben und verwenden wir personenbezogene Daten von Ihnen, soweit dies zu diesen Zwecken erforderlich ist (Bestandsdaten). Wir erheben, verarbeiten und nutzen personenbezogene Daten soweit dies erforderlich ist, um Ihnen die Inanspruchnahme des Webangebots zu ermöglichen (Nutzungsdaten). Sämtliche personenbezogenen Daten werden nur solange gespeichert wie dies für den geannten Zweck (Bearbeitung Ihrer Anfrage oder Abwicklung eines Vertrags) erforderlich ist. Hierbei werden steuer- und handelsrechtliche Aufbewahrungsfristen berücksichtigt. Auf Anordnung der zuständigen Stellen dürfen wir im Einzelfall Auskunft über diese Daten (Bestandsdaten) erteilen, soweit dies für Zwecke der Strafverfolgung, zur Gefahrenabwehr, zur Erfüllung der gesetzlichen Aufgaben der Verfassungsschutzbehörden oder des Militärischen Abschirmdienstes oder zur Durchsetzung der Rechte am geistigen Eigentum erforderlich ist.</p><p><strong>Auskunftsrecht</strong><br/>Sie haben das jederzeitige Recht, sich unentgeltlich und unverzüglich über die zu Ihrer Person erhobenen Daten zu erkundigen. Sie haben das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer angegeben persönlichen Daten mit Wirkung für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte an den Anbieter unter den Kontaktdaten im Impressum.</p>","<p>Demoshop<br/> Julie-Wolfthornstraße 1<br/>10555 Berlin</p><p>Telephone: 030 5678909<br/> E-Mail: <a href=""mailto:info@spryker.com"">info@spryker.com</a><br/></p><p><strong>Represented by</strong><br/>Spryker<br/>Managing Director: Max Mustermann<br/>Register Court: Hamburg<br/>Register Number: 56789</p><p><strong>Register Entry:</strong><br/>Entry in Handelsregister.<br/>Register Court: Hamburg<br/>Register number: 34567888456789</p><p>Source: <a href=""http://www.muster-vorlagen.net"" target=""_blank"">Muster-Vorlagen.net – Impressum Generator</a></p><br/><br/><h2>Disclaimer:</h2><p><strong>Accountability for content</strong><br/> The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this context,  note that we are accordingly not obliged to monitor merely the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG). <br/><br/><strong>Accountability for links</strong><br/> Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.</p><p><strong>Copyright</strong><br/> Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§ 44a et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are allowed only for private use, so must not serve either directly or indirectly for earnings. Unauthorized utilization of copyrighted works is punishable (§ 106 of the copyright law).</p>"
cms-page--2,Placeholders Title & Content,1,1,1,/de/agb,/en/gtc,AGB,GTC,AGB,GTC,AGB,GTC,AGB,GTC,<h2>Allgemeine Geschäftsbedingungen (AGB)</h2>,<h2>General Terms and Conditions (GTC)</h2>,"<h2>Allgemeine Geschäftsbedingungen (AGB)</h2> ]]></translation> </placeholder> <placeholder> <name>content</name> <translation><![CDATA[<br/><br/><br/><b>§ 1 Geltungsbereich & Abwehrklausel</b><br/><br/><div align=""justify"">(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br/><br/> (2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.</div><br/><br/><b>§ 2 Zustandekommen des Vertrages</b><br/><br/><div align=""justify"">(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br/><br/> (2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br/><br/> (3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.</div><br/><br/><b>§ 3 Eigentumsvorbehalt</b><br/><br/><div align=""justify"">Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.</div><br/><br/><b>§ 4 Fälligkeit</b><br/><br/><div align=""justify"">Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</div><br/><br/><b>§ 5 Gewährleistung</b><br/><br/><div align=""justify"">(1) Die Gewährleistungsrechte des Kunden richten sich nach den allgemeinen gesetzlichen Vorschriften, soweit nachfolgend nichts anderes bestimmt ist. Für Schadensersatzansprüche des Kunden gegenüber dem Anbieter gilt die Regelung in § 6 dieser AGB. <br/><br/> (2) Die Verjährungsfrist für Gewährleistungsansprüche des Kunden beträgt bei Verbrauchern bei neu hergestellten Sachen 2 Jahre, bei gebrauchten Sachen 1 Jahr. Gegenüber Unternehmern beträgt die Verjährungsfrist bei neu hergestellten Sachen und bei gebrauchten Sachen 1 Jahr. Die vorstehende Verkürzung der Verjährungsfristen gilt nicht für Schadensersatzansprüche des Kunden aufgrund einer Verletzung des Lebens, des Körpers, der Gesundheit sowie für Schadensersatzansprüche aufgrund einer Verletzung wesentlicher Vertragspflichten. Wesentliche Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Ziels des Vertrags notwendig ist, z.B. hat der Anbieter dem Kunden die Sache frei von Sach- und Rechtsmängeln zu übergeben und das Eigentum an ihr zu verschaffen. Die vorstehende Verkürzung der Verjährungsfristen gilt ebenfalls nicht für Schadensersatzansprüche, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen. Gegenüber Unternehmern ebenfalls ausgenommen von der Verkürzung der Verjährungsfristen ist der Rückgriffsanspruch nach § 478 BGB.<br/><br/> (3) Eine Garantie wird von dem Anbieter nicht erklärt.</div><br/><br/><b>§ 6 Haftungsausschluss</b><br/><br/><div align=""justify"">(1) Schadensersatzansprüche des Kunden sind ausgeschlossen, soweit nachfolgend nichts anderes bestimmt ist. Der vorstehende Haftungsausschluss gilt auch zugunsten der gesetzlichen Vertreter und Erfüllungsgehilfen des Anbieters, sofern der Kunde Ansprüche gegen diese geltend macht. <br/><br/> (2) Von dem unter Ziffer 1 bestimmten Haftungsausschluss ausgenommen sind Schadensersatzansprüche aufgrund einer Verletzung des Lebens, des Körpers, der Gesundheit und Schadensersatzansprüche aus der Verletzung wesentlicher Vertragspflichten. Wesentliche Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Ziels des Vertrags notwendig ist, z.B. hat der Anbieter dem Kunden die Sache frei von Sach- und Rechtsmängeln zu übergeben und das Eigentum an ihr zu verschaffen. Von dem Haftungsausschluss ebenfalls ausgenommen ist die Haftung für Schäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen. <br/><br/> (3) Vorschriften des Produkthaftungsgesetzes (ProdHaftG) bleiben unberührt.</div><br/><br/><b>§ 7 Abtretungs- und Verpfändungsverbot</b><br/><br/><div align=""justify"">Die Abtretung oder Verpfändung von dem Kunden gegenüber dem Anbieter zustehenden Ansprüchen oder Rechten ist ohne Zustimmung des Anbieters ausgeschlossen, sofern der Kunde nicht ein berechtigtes Interesse an der Abtretung oder Verpfändung nachweist.</div><br/><br/><b>§ 8 Aufrechnung</b><br/><br/><div align=""justify"">Ein Aufrechnungsrecht des Kunden besteht nur, wenn seine zur Aufrechnung gestellte Forderung rechtskräftig festgestellt wurde oder unbestritten ist.</div><br/><br/><b>§ 9 Rechtswahl & Gerichtsstand</b><br/><br/><div align=""justify"">(1) Auf die vertraglichen Beziehungen zwischen dem Anbieter und dem Kunden findet das Recht der Bundesrepublik Deutschland Anwendung. Von dieser Rechtswahl ausgenommen sind die zwingenden Verbraucherschutzvorschriften des Landes, in dem der Kunde seinen gewöhnlichen Aufenthalt hat. Die Anwendung des UN-Kaufrechts ist ausgeschlossen. <br/><br/> (2) Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis zwischen dem Kunden und dem Anbieter ist der Sitz des Anbieters, sofern es sich bei dem Kunden um einen Kaufmann, eine juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen handelt.</div><br/><br/><b>§ 10 Salvatorische Klausel</b><div align=""justify"">Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen unwirksam sein, wird davon die Wirksamkeit der übrigen Bestimmungen nicht berührt.</div><br/><br/><div style=""font-size:11px;""> <br/> <i>Quelle: <a href=""http://www.kluge-recht.de""&gt;kluge-recht.de&lt;/a&gt;&lt;/i&gt;&lt;/div&gt;","&lt;br/&gt;&lt;br/&gt;&lt;br/&gt;&lt;b>General Terms</b><br/><br/><div align=""justify"">(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.<br/><br/>(2) We do not collect information from visitors of our site or other details to help you with your experience.</div><br/><br/><b>Using your Information</b><br/><br/><div align=""justify""> We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:<br/><br/>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.</div><br/><br/><b>Protecting visitor information</b><br/><br/><div align=""justify"">Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</div><br/><br/><b>Cookies</b><br/><br/><div align=""justify"">We do not use cookies for tracking purposes. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies. If you disable cookies off, some features will be disabled that make your site experience more efficient and some of our services will not function properly.</div><br/><br/><b>Google</b><br/><br/><div align=""justify"">Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en We use Google AdSense Advertising on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.</div><br/><br/><b>Implementation</b><br/><br/><div align=""justify"">We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website. Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising initiative opt out page or permanently using the Google Analytics Opt Out Browser add on.</div><br/><br/><div style=""font-size:11px;""><br/></div>"
cms-page--3,Placeholders Title & Content,1,1,1,/de/datenschutz,/en/privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,<h2>Datenschutzerklärung</h2>,<h2>Data Privacy Policy</h2>,"<p>Die Nutzung unserer Seite ist ohne eine Angabe von personenbezogenen Daten möglich. Für die Nutzung einzelner Services unserer Seite können sich hierfür abweichende Regelungen ergeben, die in diesem Falle nachstehend gesondert erläutert werden. Ihre personenbezogenen Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.ä.) werden von uns nur gemäß den Bestimmungen des deutschen Datenschutzrechts verarbeitet. Daten sind dann personenbezogen, wenn sie eindeutig einer bestimmten natürlichen Person zugeordnet werden können. Die rechtlichen Grundlagen des Datenschutzes finden Sie im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG). Nachstehende Regelungen informieren Sie insoweit über die Art, den Umfang und Zweck der Erhebung, die Nutzung und die Verarbeitung von personenbezogenen Daten durch den Anbieter</p><p>Wir weisen darauf hin, dass die internetbasierte Datenübertragung Sicherheitslücken aufweist, ein lückenloser Schutz vor Zugriffen durch Dritte somit unmöglich ist.</p><h3>Auskunft/Widerruf/Löschung</h3><p>Sie können sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten und deren Berichtigung, Sperrung, Löschung oder einem Widerruf einer erteilten Einwilligung unentgeltlich an uns wenden. Wir weisen darauf hin, dass Ihnen ein Recht auf Berichtigung falscher Daten oder Löschung personenbezogener Daten zusteht, sollte diesem Anspruch keine gesetzliche Aufbewahrungspflicht entgegenstehen.</p><p><a target=""_blank"" href=""https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html""&gt;Muster-Datenschutzerklärung&lt;/a> der Anwaltskanzlei Weiß & Partner</p>","<p>Our website may be used without entering personal information. Different rules may apply to certain services on our site, however, and are explained separately below. We collect personal information from you (e.g. name, address, email address, telephone number, etc.) in accordance with the provisions of German data protection statutes. Information is considered personal if it can be associated exclusively to a specific natural person. The legal framework for data protection may be found in the German Federal Data Protection Act (BDSG) and the Telemedia Act (TMG). The provisions below serve to provide information as to the manner, extent and purpose for collecting, using and processing personal information by the provider.</p><p>Please be aware that data transfer via the internet is subject to security risks and, therefore, complete protection against third-party access to transferred data cannot be ensured.</p><h3>Information/Cancellation/Deletion</h3><p>On the basis of the Federal Data Protection Act, you may contact us at no cost if you have questions relating to the collection, processing or use of your personal information, if you wish to request the correction, blocking or deletion of the same, or if you wish to cancel explicitly granted consent. Please note that you have the right to have incorrect data corrected or to have personal data deleted, where such claim is not barred by any legal obligation to retain this data.</p><p><a target=""_blank"" href=""https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html"">Sample Data Privacy Policy Statement</a> provided by the Law Offices of Weiß & Partner</p>"
cms-page--4,Placeholders Title & Content,1,0,1,/de/loremde,/en/lorem,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,"{% raw %}{{{% endraw %} chart('testChart', 'testChart') {% raw %}}}{% endraw %} <br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.","{% raw %}{{{% endraw %} chart('testChart', 'testChart') {% raw %}}}{% endraw %} <br>  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
cms-page--5,Placeholders Title & Content,1,1,0,/de/dolorde,/en/dolor,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Lorem ipsum,Lorem ipsum,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
cms-page--6,Placeholders Title & Content,1,1,1,/de/demo-landing-page,/en/demo-landing-page,Demo Landing Page,Demo Landing Page,Demo Landing Page,Demo Landing Page,"demo,cms page, landing page","demo,cms page, landing page",This is a demo landing page with different content widgets.,This is a demo landing page with different content widgets.,"<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">DAS IST EINE GROßARTIGE LANDING PAGE</span></b></p>","<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">THIS IS A GREAT LANDING PAGE</span></b></p>","<p><span style=""font-size: 12px;""></span><span style=""font-size: 12px;""></span><span style=""font-size: 14px;""></span><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non erat felis. Suspendisse nulla quam, dictum vitae malesuada a, ullamcorper eu urna. Sed diam tellus, feugiat iaculis consequat eu, commodo in dui. Integer ac ipsum urna. Aliquam rhoncus varius felis at dignissim. Nulla id justo id nunc lacinia efficitur. Etiam nec vehicula lorem. Phasellus ut lacus eu lorem luctus luctus. Quisque id vestibulum lectus, vel aliquam erat. Praesent ut erat quis magna varius tempor et sed sapien. Cras ac turpis id ligula gravida dignissim in sed nisl. Suspendisse scelerisque eros vel risus sagittis, in ultricies odio commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span><b><span style=""font-size: 18px;""><br></span></b></p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""="""">Duis nunc dolor, vestibulum eu cursus ut, facilisis eget justo. Ut quis placerat mauris. In cursus enim purus, a mollis felis cursus non. Mauris rutrum a ante a rutrum. Aliquam gravida tortor et cursus pharetra. Ut id sagittis arcu, eu convallis felis. Integer fermentum convallis lorem, eu posuere ex ultricies scelerisque. Suspendisse et consectetur mauris, vel rhoncus elit. Sed ultrices eget lacus quis rutrum. Aliquam erat volutpat. Aliquam varius mauris purus, non imperdiet turpis tempor vel. Donec vitae scelerisque mi.</p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""=""""><br></p><b>Dies ist eine Liste von Produkten auf einer CMS Seite:</b><p></p><p>{% raw %}{{{% endraw %} product(['093', '066', '035', '083', '021','055']) {% raw %}}}{% endraw %}</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>Dies ist eine Liste von Produkt-Gruppen auf einer CMS Seite:</b><br></p>{% raw %}{{{% endraw %} product_group(['095', '009', '052', '005', '188', '090', '084', '195']) {% raw %}}}{% endraw %}<p></p><p><br></p><p><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Curabitur ipsum nulla, mollis vel tellus a, tristique tempor sapien. Mauris ut urna molestie, cursus nunc eget, lacinia erat. Donec efficitur, nisl a porta dapibus, nisi ipsum efficitur ipsum, eu auctor turpis ipsum vel sapien. Maecenas molestie risus odio. Suspendisse lobortis dapibus nisi non accumsan. Ut mattis tincidunt odio eu convallis. Nulla leo neque, scelerisque eu sagittis vitae, consectetur vel lacus. Aliquam erat volutpat. Nam euismod aliquet urna eget congue.</span></p><p><br></p><p><b>Dies ist ein Produkt-Set auf einer CMS Seite:</b></p>{% raw %}{{{% endraw %} product_set(['2_sony_set']) {% raw %}}}{% endraw %}","<p><span style=""font-size: 12px;""></span><span style=""font-size: 12px;""></span><span style=""font-size: 14px;""></span><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non erat felis. Suspendisse nulla quam, dictum vitae malesuada a, ullamcorper eu urna. Sed diam tellus, feugiat iaculis consequat eu, commodo in dui. Integer ac ipsum urna. Aliquam rhoncus varius felis at dignissim. Nulla id justo id nunc lacinia efficitur. Etiam nec vehicula lorem. Phasellus ut lacus eu lorem luctus luctus. Quisque id vestibulum lectus, vel aliquam erat. Praesent ut erat quis magna varius tempor et sed sapien. Cras ac turpis id ligula gravida dignissim in sed nisl. Suspendisse scelerisque eros vel risus sagittis, in ultricies odio commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span><b><span style=""font-size: 18px;""><br></span></b></p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""="""">Duis nunc dolor, vestibulum eu cursus ut, facilisis eget justo. Ut quis placerat mauris. In cursus enim purus, a mollis felis cursus non. Mauris rutrum a ante a rutrum. Aliquam gravida tortor et cursus pharetra. Ut id sagittis arcu, eu convallis felis. Integer fermentum convallis lorem, eu posuere ex ultricies scelerisque. Suspendisse et consectetur mauris, vel rhoncus elit. Sed ultrices eget lacus quis rutrum. Aliquam erat volutpat. Aliquam varius mauris purus, non imperdiet turpis tempor vel. Donec vitae scelerisque mi.</p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""=""""><br></p><b>This is a list </b><b>of products in a CMS page:</b><p></p><p>{% raw %}{{{% endraw %} product(['093', '066', '035', '083', '021','055']) {% raw %}}}{% endraw %}</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>This is a list of product groups in a CMS page:</b><br></p>{% raw %}{{{% endraw %} product_group(['095', '009', '052', '005', '188', '090', '084', '195']) {% raw %}}}{% endraw %}<p></p><p><br></p><p><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Curabitur ipsum nulla, mollis vel tellus a, tristique tempor sapien. Mauris ut urna molestie, cursus nunc eget, lacinia erat. Donec efficitur, nisl a porta dapibus, nisi ipsum efficitur ipsum, eu auctor turpis ipsum vel sapien. Maecenas molestie risus odio. Suspendisse lobortis dapibus nisi non accumsan. Ut mattis tincidunt odio eu convallis. Nulla leo neque, scelerisque eu sagittis vitae, consectetur vel lacus. Aliquam erat volutpat. Nam euismod aliquet urna eget congue.</span></p><p><br></p><p><b>This a product set in a CMS page:</b></p>{% raw %}{{{% endraw %} product_set(['2_sony_set']) {% raw %}}}{% endraw %}"
cms-page--7,Placeholders Title & Content,1,1,1,/de/ruecknahmegarantie,/en/return-policy,Rücknahmegarantie,Return policy,Rücknahmegarantie,Return policy,,,,,"<p><b><span style=""font-size: 24px;"">Rücknahmegarantie</span></b><br></p>","<p><b><span style=""font-size: 24px;"">Return policy</span></b><br></p>","<p>Option zur Rücksendung von Waren bis 30 Tage nach Erhalt<br><br>Unbeschadet Ihres gesetzlichen Widerrufsrechts bieten wir Ihnen die Möglichkeit, die Ware innerhalb von 30 Tagen nach Erhalt zurückzusenden. Mit dieser Rücksendeoption können Sie den Vertrag auch nach Ablauf der 14-tägigen Widerrufsfrist innerhalb von 30 Tagen nach Erhalt kündigen, indem Sie die Ware an uns zurücksenden (diese Frist beginnt mit dem Erhalt der Ware).<br><br>Wenn Sie unsere Waren zurücksenden, können Sie das Ihrer Bestellung beigefügte Rücksendeetikett verwenden oder das Etikett selbst von Ihrer Kundenkontoseite ausdrucken. Bitte wenden Sie sich an den Kundendienst, wenn Sie Probleme beim Herunterladen des Rücksendeetiketts haben oder keinen Zugang zu einem Drucker haben.<br><br>Ihre Ware gilt innerhalb von 30 Tagen als zurückgesandt, wenn Sie sie innerhalb dieser Zeit versenden. Ihre Ausübung dieser Rückgabeoption setzt jedoch voraus, dass die Ware vollständig im Originalzustand, intakt und unbeschädigt sowie in der Originalverpackung zurückgesandt wird. Bis zum Ablauf der Frist zur Ausübung des gesetzlichen Widerrufsrechts gelten ausschließlich die gesetzlichen Bestimmungen dieses Rechts. Die Möglichkeit, Waren zurückzusenden, schränkt Ihre gesetzlichen Gewährleistungsrechte, auf die Sie ohne Einschränkung Anspruch haben, nicht ein. Die Option zur Rücksendung von Waren gilt nicht für Geschenkgutscheine.<br><br>Das freiwillige Rückgaberecht von 30 Tagen besteht nicht für Verträge mit versiegelten Waren, die nach Lieferung entsiegelt wurden und aus hygienischen Gründen nicht für die Rücksendung geeignet sind.<br><br>Die gesetzlichen Gewährleistungsrechte bleiben vom freiwilligen 30-tägigen Rückgaberecht unberührt. Das freiwillige 30-tägige Rückgaberecht gilt nicht für den Kauf von Geschenkgutscheinen.<br></p>","<p>Option to return merchandise up to 30 days after receipt<br><br>Without prejudice to your statutory right of revocation, we offer you the option of returning the merchandise within 30 days of you receiving them. This return option allows you, even after the 14-day revocation period has expired, to cancel the contract by returning the merchandise to us, within 30 days of receiving them (this period commences upon your receipt of the merchandise).<br><br>If you are returning our merchandise, you can use the return shipping label enclosed with your order, or you can print the label out yourself from your customer account page. Please contact Customer Care if you have any problems downloading the return shipping label or you do not have access to a printer.<br><br>Your merchandise will be deemed returned within 30 days if you send it within such time. However, your exercise of this return option is preconditioned upon the merchandise being returned in full in its original condition, intact and undamaged, and in its original packaging. Until the period for exercising the statutory right of revocation expires, the statutory provisions governing this right shall apply exclusively. The option to return merchandise does not limit your statutory warranty rights, to which you remain entitled without qualification. The option to return merchandise does not apply to gift vouchers.<br><br>The voluntary 30 days return right does not exist for contracts subject to sealed goods which have been unsealed after delivery and which are not suitable for return because of hygienic reasons.<br><br>The statutory warranty rights remain unaffected from the voluntary 30 days return right. The voluntary 30 days right of return is not applicable to the purchase of gift vouchers.<br></p>"
```
</details>

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
|template_name |yes |string |static full |Template name. |
|is_searchable |yes |bool |1 |Flag that defines if entity is searchable. |
|is_active |yes |bool | 0|Flag that defines if entity is active. |
|publish |yes | bool|1 | Flag that defines if entity is published.|
|page_key |yes |string |page_5 |Unique page identifier. |
|url.*(de_DE,en_US) |yes |string |/de/lorem |Page URL. |
|name.*(de_DE,en_US) |yes |string |Lorem ipsum |Page name. |
|meta_title.*(de_DE,en_US) |yes |string |Lorem ipsum | Meta title.|
| meta_keywords.*(de_DE,en_US)|yes |string |Lorem ipsum |Meta keywords. |
|meta_description.*(de_DE,en_US) | yes|string |Lorem ipsum |Meta description. |
| placeholder.title.*(de_DE,en_US)|yes |string |Lorem ipsum |Title content. |
| placeholder.content.*(de_DE,en_US)|yes |string | Lorem ipsum| Page content.|


**vendor/spryker/cms-page-data-import/data/import/cms_page_store.csv**

```yaml
page_key,store_name
cms-page--1,DE
cms-page--1,AT
cms-page--1,US
cms-page--2,DE
cms-page--2,AT
cms-page--2,US
cms-page--3,DE
cms-page--3,AT
cms-page--3,US
cms-page--4,DE
cms-page--4,AT
cms-page--4,US
cms-page--5,DE
cms-page--5,AT
cms-page--5,US
cms-page--6,DE
cms-page--6,AT
cms-page--6,US
cms-page--7,DE
cms-page--7,AT
cms-page--7,US
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| page_key | ✓ | string | page_5 | Unique page identifier. |
| store_name | ✓ | string | DE | Unique store identifier. |

<details>
<summary>vendor/spryker/cms-slot-data-import/data/import/cms_block.csv</summary>

```yaml
block_key,block_name,template_name,template_path,active,placeholder.title.de_DE,placeholder.title.en_US,placeholder.description.de_DE,placeholder.description.en_US,placeholder.link.de_DE,placeholder.link.en_US,placeholder.content.de_DE,placeholder.content.en_US
blck-1,Teaser for home page,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Static CMS Block,Static CMS Block,"<p class='columns'>Sed imperdiet non quam nec molestie. Integer eu ipsum non odio dignissim rutrum. Proin malesuada metus ac tempor convallis. Pellentesque finibus, urna et vestibulum egestas, metus purus porta ligula, sit amet tincidunt dui justo vel nulla. Nam sodales nisi vel augue consectetur malesuada. Nulla semper neque a nunc tristique ullamcorper. Mauris at nisi non elit fringilla commodo. Curabitur at libero sed nisl condimentum cursus eget nec ligula. Aenean nec elit ut lacus feugiat fermentum. Phasellus quis quam mi. Duis id arcu quis ipsum viverra egestas at at diam. Cras vel dui maximus, scelerisque dui ut, suscipit lectus.</p>","<p class='columns'>Ut cursus, ligula vel pretium porta, justo nulla consectetur mauris, in aliquet nisl sapien feugiat lectus. Pellentesque sit amet sagittis justo, congue fringilla lacus. Sed vel dui et nunc sodales feugiat non in erat. Aliquam nunc mi, dignissim id tempor bibendum, sodales a tellus. Aliquam vitae efficitur turpis, quis consequat neque. Suspendisse interdum semper mi. Cras tortor justo, pretium at convallis a, lobortis non lorem. Duis ullamcorper sagittis efficitur. In erat libero, suscipit ac metus in, varius laoreet neque. Morbi ligula arcu, rutrum facilisis varius non, viverra id dui. Curabitur accumsan ultricies mauris eget vestibulum. Mauris pellentesque molestie nibh eu finibus. Fusce ut gravida massa, et vehicula arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis erat ut mi pretium dapibus. Ut orci leo, scelerisque vitae velit a, ultricies porta ligula.</p>",,,,
blck-2,Home Page,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Empfohlene Produkte,Featured Products,"<p>{% raw %}{{{% endraw %} product_group(['035', '066', '078', '086', '093','139']) {% raw %}}}{% endraw %}</p>","<p>{% raw %}{{{% endraw %} product_group(['035', '066', '078', '086', '093','139']) {% raw %}}}{% endraw %}</p>",,,,
blck-3,Product SEO content,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Product CMS Block,Product CMS Block,"<p class='columns'>Sed imperdiet non quam nec molestie. Integer eu ipsum non odio dignissim rutrum. Proin malesuada metus ac tempor convallis. Pellentesque finibus, urna et vestibulum egestas, metus purus porta ligula, sit amet tincidunt dui justo vel nulla. Nam sodales nisi vel augue consectetur malesuada. Nulla semper neque a nunc tristique ullamcorper. Mauris at nisi non elit fringilla commodo. Curabitur at libero sed nisl condimentum cursus eget nec ligula. Aenean nec elit ut lacus feugiat fermentum. Phasellus quis quam mi. Duis id arcu quis ipsum viverra egestas at at diam. Cras vel dui maximus, scelerisque dui ut, suscipit lectus.</p>","<p class='columns'>Ut cursus, ligula vel pretium porta, justo nulla consectetur mauris, in aliquet nisl sapien feugiat lectus. Pellentesque sit amet sagittis justo, congue fringilla lacus. Sed vel dui et nunc sodales feugiat non in erat. Aliquam nunc mi, dignissim id tempor bibendum, sodales a tellus. Aliquam vitae efficitur turpis, quis consequat neque. Suspendisse interdum semper mi. Cras tortor justo, pretium at convallis a, lobortis non lorem. Duis ullamcorper sagittis efficitur. In erat libero, suscipit ac metus in, varius laoreet neque. Morbi ligula arcu, rutrum facilisis varius non, viverra id dui. Curabitur accumsan ultricies mauris eget vestibulum. Mauris pellentesque molestie nibh eu finibus. Fusce ut gravida massa, et vehicula arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis erat ut mi pretium dapibus. Ut orci leo, scelerisque vitae velit a, ultricies porta ligula.</p>",,,,
blck-4,Category CMS page showcase for Top position,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Category CMS page showcase for Top position,Category CMS page showcase for Top position,"<p class='columns'>Sed imperdiet non quam nec molestie. Integer eu ipsum non odio dignissim rutrum. Proin malesuada metus ac tempor convallis. Pellentesque finibus, urna et vestibulum egestas, metus purus porta ligula, sit amet tincidunt dui justo vel nulla. Nam sodales nisi vel augue consectetur malesuada. Nulla semper neque a nunc tristique ullamcorper. Mauris at nisi non elit fringilla commodo. Curabitur at libero sed nisl condimentum cursus eget nec ligula. Aenean nec elit ut lacus feugiat fermentum. Phasellus quis quam mi. Duis id arcu quis ipsum viverra egestas at at diam. Cras vel dui maximus, scelerisque dui ut, suscipit lectus.</p>","<p class='columns'>Ut cursus, ligula vel pretium porta, justo nulla consectetur mauris, in aliquet nisl sapien feugiat lectus. Pellentesque sit amet sagittis justo, congue fringilla lacus. Sed vel dui et nunc sodales feugiat non in erat. Aliquam nunc mi, dignissim id tempor bibendum, sodales a tellus. Aliquam vitae efficitur turpis, quis consequat neque. Suspendisse interdum semper mi. Cras tortor justo, pretium at convallis a, lobortis non lorem. Duis ullamcorper sagittis efficitur. In erat libero, suscipit ac metus in, varius laoreet neque. Morbi ligula arcu, rutrum facilisis varius non, viverra id dui. Curabitur accumsan ultricies mauris eget vestibulum. Mauris pellentesque molestie nibh eu finibus. Fusce ut gravida massa, et vehicula arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis erat ut mi pretium dapibus. Ut orci leo, scelerisque vitae velit a, ultricies porta ligula.</p>",,,,
blck-5,Category CMS page showcase for Middle position,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Category CMS page showcase for Middle position,Category CMS page showcase for Middle position,<p class='columns'>Sed imperdiet non quam nec molestie. Integer eu ipsum non odio dignissim rutrum.</p>,"<p class='columns'>Ut cursus, ligula vel pretium porta, justo nulla consectetur mauris, in aliquet nisl sapien feugiat lectus.</p>",,,,
blck-6,Category CMS page showcase for Bottom position,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,Category CMS page showcase for Bottom position,Category CMS page showcase for Bottom position,"<p class='columns'>Sed imperdiet non quam nec molestie. Integer eu ipsum non odio dignissim rutrum. Proin malesuada metus ac tempor convallis. Pellentesque finibus, urna et vestibulum egestas, metus purus porta ligula, sit amet tincidunt dui justo vel nulla. Nam sodales nisi vel augue consectetur malesuada. Nulla semper neque a nunc tristique ullamcorper. Mauris at nisi non elit fringilla commodo. Curabitur at libero sed nisl condimentum cursus eget nec ligula. Aenean nec elit ut lacus feugiat fermentum. Phasellus quis quam mi. Duis id arcu quis ipsum viverra egestas at at diam. Cras vel dui maximus, scelerisque dui ut, suscipit lectus.</p>","<p class='columns'>Ut cursus, ligula vel pretium porta, justo nulla consectetur mauris, in aliquet nisl sapien feugiat lectus. Pellentesque sit amet sagittis justo, congue fringilla lacus. Sed vel dui et nunc sodales feugiat non in erat. Aliquam nunc mi, dignissim id tempor bibendum, sodales a tellus. Aliquam vitae efficitur turpis, quis consequat neque. Suspendisse interdum semper mi. Cras tortor justo, pretium at convallis a, lobortis non lorem. Duis ullamcorper sagittis efficitur. In erat libero, suscipit ac metus in, varius laoreet neque. Morbi ligula arcu, rutrum facilisis varius non, viverra id dui. Curabitur accumsan ultricies mauris eget vestibulum. Mauris pellentesque molestie nibh eu finibus. Fusce ut gravida massa, et vehicula arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis erat ut mi pretium dapibus. Ut orci leo, scelerisque vitae velit a, ultricies porta ligula.</p>",,,,
blck-7,CMS block for category Computers,Title and description block,@CmsBlock/template/title_and_description_block.twig,1,"<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">DAS IST EINE LANDING PAGE FÜR COMPUTERS</span></b></p>","<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">THIS IS A LANDING PAGE FOR COMPUTERS</span></b></p>","</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>This is a list of product groups in a CMS page:</b><br></p>{% raw %}{{{% endraw %} product_group(['139', '141', '152', '140', '143', '150', '132', '151']) {% raw %}}}{% endraw %}","</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>This is a list of product groups in a CMS page:</b><br></p>{% raw %}{{{% endraw %} product_group(['139', '141', '152', '140', '143', '150', '132', '151']) {% raw %}}}{% endraw %}",,,,
blck-8,CMS block for the main navigation desktop,Navigation block,@CmsBlock/template/navigation_block.twig,1,,,"{% raw %}{{{% endraw %} content_navigation('navigation-main-desktop', 'tree-inline') {% raw %}}}{% endraw %}","{% raw %}{{{% endraw %} content_navigation('navigation-main-desktop', 'tree-inline') {% raw %}}}{% endraw %}",,,,
blck-9,CMS block for the main navigation mobile,Navigation block,@CmsBlock/template/navigation_block.twig,1,,,"{% raw %}{{{% endraw %} content_navigation('navigation-main-mobile', 'tree') {% raw %}}}{% endraw %}","{% raw %}{{{% endraw %} content_navigation('navigation-main-mobile', 'tree') {% raw %}}}{% endraw %}",,,,
blck-10,CMS block for the footer navigation,Navigation block,@CmsBlock/template/navigation_block.twig,1,,,"<div class=""grid""><div class=""col col--sm-12 col--md-6 col--lg-6 spacing-bottom"">{% raw %}{{{% endraw %} content_navigation('navigation-footer', 'list') {% raw %}}}{% endraw %}</div><ul class=""col col--sm-12 col--md-6 col--lg-3""><li><h5>{% raw %}{{{% endraw %} 'global.get_in_touch' | trans {% raw %}}}{% endraw %}</h5></li><li>+49 (0)30 2084983 50</li><li><a href=""mailto:info@spryker.com"">info@spryker.com</a></li></ul><div class=""col col--lg-3 is-hidden-sm-md""><h5>{% raw %}{{{% endraw %} 'global.social' | trans {% raw %}}}{% endraw %}</h5>{% raw %}{{{% endraw %} content_navigation('navigation-social-links', 'list-inline') {% raw %}}}{% endraw %}</div><div class=""is-hidden-lg-xl""><h5>{% raw %}{{{% endraw %} 'global.social' | trans {% raw %}}}{% endraw %}</h5>{% raw %}{{{% endraw %} content_navigation('navigation-social-links', 'list-inline') {% raw %}}}{% endraw %}</div></div>","<div class=""grid""><div class=""col col--sm-12 col--md-6 col--lg-6 spacing-bottom"">{% raw %}{{{% endraw %} content_navigation('navigation-footer', 'list') {% raw %}}}{% endraw %}</div><ul class=""col col--sm-12 col--md-6 col--lg-3""><li><h5>{% raw %}{{{% endraw %} 'global.get_in_touch' | trans {% raw %}}}{% endraw %}</h5></li><li>+49 (0)30 2084983 50</li><li><a href=""mailto:info@spryker.com"">info@spryker.com</a></li></ul><div class=""col col--lg-3 is-hidden-sm-md""><h5>{% raw %}{{{% endraw %} 'global.social' | trans {% raw %}}}{% endraw %}</h5>{% raw %}{{{% endraw %} content_navigation('navigation-social-links', 'list-inline') {% raw %}}}{% endraw %}</div><div class=""is-hidden-lg-xl""><h5>{% raw %}{{{% endraw %} 'global.social' | trans {% raw %}}}{% endraw %}</h5>{% raw %}{{{% endraw %} content_navigation('navigation-social-links', 'list-inline') {% raw %}}}{% endraw %}</div></div>",,,,
```
</details>

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
|block_key |yes |string |blck-31 |Block key. |
| block_name| yes|string |10% Discount |Block name. |
|template_name | yes| string|static full |Template name. |
|template_path |no |string |@ShopUi/templates/page-layout-main/page-layout-main.twig |Path to the Twig template to which this CMS block to slot assignment belongs. |
|active |no |bool |1 |Flag that defines if block is active. |
|placeholder.title.*(de_DE,en_US) |no |string | Lorem ipsum| Title content.|
|placeholder.description.*(de_DE,en_US) | no| string|Lorem ipsum | Description content.|
|placeholder.link.*(de_DE,en_US) |no | string| Lorem ipsum|Link. |
| placeholder.content.*(de_DE,en_US)|no |string |Lorem ipsum |Page content. |

**vendor/spryker/cms-slot-data-import/data/import/cms_block_store.csv**

```yaml
block_key,store_name
blck-2,DE
blck-2,AT
blck-2,US
blck-1,DE
blck-1,AT
blck-1,US
blck-3,DE
blck-3,AT
blck-3,US
blck-4,DE
blck-4,AT
blck-4,US
blck-5,DE
blck-5,AT
blck-5,US
blck-6,DE
blck-6,AT
blck-6,US
blck-7,DE
blck-7,AT
blck-7,US
blck-8,DE
blck-8,AT
blck-8,US
blck-9,DE
blck-9,AT
blck-9,US
blck-10,DE
blck-10,AT
blck-10,US
blck-11,DE
blck-11,AT
blck-11,US
blck-12,DE
blck-12,AT
blck-12,US
blck-31,DE
blck-31,AT
blck-31,US
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
|block_key|yes|string|blck-31|Block key.|
|store_name|yes|string|DE|Store name.|


**vendor/spryker/cms-slot-data-import/data/import/cms_slot_template.csv**

```yaml
name,description,template_path
Main Layout,The Slots layout in sections that are repeatable across the Store.,@ShopUi/templates/page-layout-main/page-layout-main.twig
Home Page,"The layout of Slots in the Home Page, always below Store Header including Navigation, and above Store Footer.",@HomePage/views/home/home.twig
Category + Slots,"The layout of Slots in Category Pages, always below Header including Navigation, and above Store Footer. This Templates is used for all Category Pages.",@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig
Product,"The layout of Slots in the Product Pages, always below Header including Navigation, and above Store Footer. This Templates is used for all Products Pages. And, Block Bottom Position.",@ProductDetailPage/views/pdp/pdp.twig
CMS Page: Placeholders Title and Content + Slot,A CMS Page that includes a Slot as well.,@Cms/templates/placeholders-title-content-slot/placeholders-title-content-slot.twig
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| template_path | yes | string | @HomePage/views/home/home.twig | Unique path to the corresponding Twig file. |
| name | yes | string | Home Page | Template name used in the Back Office. |
| description | no | string | text | Template description used in the Back Office. |

**vendor/spryker/cms-slot-data-import/data/import/cms_slot.csv**

```yaml
slot_key,name,description,content_provider,template_path,is_active
slt-1,Main,As homepage is all content so it has one slot.,SprykerCmsSlotBlock,@HomePage/views/home/home.twig,1
slt-2,Top,"On Desktop it's below the Category Image above the Products Grid/List, right side to the Grid/List selector and width is same as the Products Grid/List. On Mobile it's below the Filters/Sorting, above Grid/List selector and width is same as the Products Grid/List.",SprykerCmsSlotBlock,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,1
slt-3,Middle,On Desktop it's below the Filters/Sorting and width is same as the the Filters/Sorting. No Mobile.,SprykerCmsSlotBlock,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,1
slt-4,Bottom,"On Desktop and on Mobile it's below the Pagination above the Store Footer, width is same as the Products Grid/List.",SprykerCmsSlotBlock,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,1
slt-5,Bottom,Exists both on Desktop and Mobile below the Product Details and above Store Footer. Width is as the Product Details.,SprykerCmsSlotBlock,@ProductDetailPage/views/pdp/pdp.twig,1
slt-6,Bottom,Exists both on Desktop and Mobile below the CMS Page Placeholders and above Store Footer.,SprykerCmsSlotBlock,@Cms/templates/placeholders-title-content-slot/placeholders-title-content-slot.twig,1
slt-desktop-header,Header desktop view,"In the store Header section, On desktop, below the logo.",SprykerCmsSlotBlock,@ShopUi/templates/page-layout-main/page-layout-main.twig,1
slt-footer,Footer,"In the store Footer section, On desktop, bottom of the page. On mobile, bottom of the page.",SprykerCmsSlotBlock,@ShopUi/templates/page-layout-main/page-layout-main.twig,1
slt-mobile-header,Header mobile view,"In the store Header section. On mobile, under the hamburger menu.",SprykerCmsSlotBlock,@ShopUi/templates/page-layout-main/page-layout-main.twig,1
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| template_path | ✓ | string | @HomePage/views/home/home.twig | Path to the Twig template to which slot is assigned. |
| slot_key | ✓ | string | slt-4 |Unique slot identifier. |
| content_provider | ✓ | string | SprykerCmsSlotBlock | Unique content provider identifier. |
| name | ✓ | string | Home Page Main | Slot name used in the Back Office. |
| description | no | string | text | Slot description used in the Back Office. |
| is_active | ✓ | bool | 1 | Flag that defines if slot is active. |

**vendor/spryker/cms-slot-block-data-import/data/import/cms_slot_block.csv**

```yaml
slot_key,block_key,position,template_path,conditions.productCategory.all,conditions.productCategory.skus,conditions.productCategory.category_key,conditions.category.all,conditions.category.category_key,conditions.cms_page.all,conditions.cms_page.page_key
slt-1,blck-2,1,@HomePage/views/home/home.twig,,,,,,,
slt-1,blck-1,2,@HomePage/views/home/home.twig,,,,,,,
slt-2,blck-4,1,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,,,,0,"smartphones,smartwatches,tablets,notebooks",,
slt-3,blck-5,1,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,,,,0,"smartphones,smartwatches,tablets,notebooks",,
slt-4,blck-6,1,@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig,,,,0,"smartphones,smartwatches,tablets,notebooks",,
slt-5,blck-3,1,@ProductDetailPage/views/pdp/pdp.twig,0,"035,066,078,086,093,139",,,,,
slt-desktop-header,blck-8,1,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
slt-footer,blck-31,1,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
slt-footer,blck-10,4,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
slt-footer,blck-11,2,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
slt-footer,blck-12,3,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
slt-mobile-header,blck-9,1,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| template_path | ✓ | string | @HomePage/views/home/home.twig | Path to the Twig template to which this CMS block to slot assignment belongs. |
| slot_key | ✓ | string | slt-4 | Unique slot identifier. |
| block_key | ✓ | string | blck-2 | Unique CMS block identifier. |
| position | ✓ | integer | 1 | CMS Block position in the slot. |
| conditions | no | mixed |  | Slot-CMS block conditions data. |

2. Register the following plugin to enable data import:

**Pyz\Zed\DataImport\DataImportDependencyProvider**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\CmsPageDataImport\Communication\Plugin\CmsPageDataImportPlugin;
use Spryker\Zed\CmsPageDataImport\Communication\Plugin\CmsPageStoreDataImportPlugin;
use Spryker\Zed\CmsSlotBlockDataImport\Communication\Plugin\CmsSlotBlockDataImportPlugin;
use Spryker\Zed\CmsSlotDataImport\Communication\Plugin\CmsSlotDataImportPlugin;
use Spryker\Zed\CmsSlotDataImport\Communication\Plugin\CmsSlotTemplateDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new CmsPageDataImportPlugin(),
            new CmsPageStoreDataImportPlugin(),
            new CmsSlotTemplateDataImportPlugin(),
            new CmsSlotDataImportPlugin(),
            new CmsSlotBlockDataImportPlugin(),
        ];
    }
}
```

1. Import data:

```bash
console data:import:cms-template
console data:import:cms-block
console data:import:cms-block-store
console data:import cms-page
console data:import cms-page-store
console data:import cms-slot-template
console data:import cms-slot
console data:import cms-slot-block
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the following tables:

*`spy_cms_page`
*`spy_cms_page_localized_attributes`
*`spy_cms_page_store`
*`spy_cms_block`
*`spy_cms_block_store`
*`spy_cms_slot`
*`spy_cms_slot_block`

{% endinfo_block %}

### 7) Set up additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CmsPageParameterMapExpanderPlugin | Expands collector data with the parameter map of CMS content page. | None | Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageDataExpander |
| CmsBlockStorageStorageParameterMapExpanderPlugin | Expands storage data with the parameter map of CMS content widget. | None | Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsBlockStorage |
| CmsPageTableExpanderPlugin | **Preview** button in the **List of CMS pages**. | None | Spryker\Zed\CmsGui\Communication\Plugin |
| CreateGlossaryExpanderPlugin | Adds a **Preview** button to the *create a glossary* page. | None | Spryker\Zed\CmsGui\Communication\Plugin |
|CmsBlockTemplateTwigLoaderPlugin|Loads the CMS block templates for being rendered using the CMS block template paths on Zed level.|None|Spryker\Zed\CmsBlock\Communication\Plugin\Twig|
|CmsBlockTwigExtensionPlugin|Imports the Twig extension provided in the CMS block module.|None|Spryker\Zed\CmsBlock\Communication\Plugin\Twig|

**Pyz\Zed\Cms\CmsDependencyProvider**

```php
<?php

namespace Pyz\Zed\Cms;

use Spryker\Zed\Cms\CmsDependencyProvider as SprykerCmsDependencyProvider;
use Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageDataExpander\CmsPageParameterMapExpanderPlugin;

class CmsDependencyProvider extends SprykerCmsDependencyProvider
{


    /**
     * @return \Spryker\Zed\CmsExtension\Dependency\Plugin\CmsPageDataExpanderPluginInterface[]
     */
    protected function getCmsPageDataExpanderPlugins(): array
    {
        return [
            new CmsPageParameterMapExpanderPlugin(),
        ];
    }
}
```

**Pyz\Zed\CmsBlockStorage\CmsBlockStorageDependencyProvider**

```php
<?php

namespace Pyz\Zed\CmsBlockStorage;

use Spryker\Zed\CmsBlockStorage\CmsBlockStorageDependencyProvider as SprykerCmsBlockStorageDependencyProvider;
use Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsBlockStorage\CmsBlockStorageStorageParameterMapExpanderPlugin;

class CmsBlockStorageDependencyProvider extends SprykerCmsBlockStorageDependencyProvider
{
    /**
     * @return \Spryker\Zed\CmsBlockStorage\Dependency\Plugin\CmsBlockStorageDataExpanderPluginInterface[]
     */
    protected function getContentWidgetDataExpanderPlugins()
    {
        return [
            new CmsBlockStorageStorageParameterMapExpanderPlugin(),
        ];
    }
}
```

**Pyz\Zed\CmsBlockStorage\CmsBlockStorageDependencyProvider**

```php
<?php

namespace Pyz\Zed\CmsGui;

use Spryker\Zed\CmsGui\CmsGuiDependencyProvider as SprykerCmsGuiDependencyProvider;
use Spryker\Zed\CmsGui\Communication\Plugin\CmsPageTableExpanderPlugin;
use Spryker\Zed\CmsGui\Communication\Plugin\CreateGlossaryExpanderPlugin;


class CmsGuiDependencyProvider extends SprykerCmsGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CmsGui\Dependency\Plugin\CmsPageTableExpanderPluginInterface[]
     */
    protected function getCmsPageTableExpanderPlugins()
    {
        return [
            new CmsPageTableExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CmsGui\Dependency\Plugin\CreateGlossaryExpanderPluginInterface[]
     */
    protected function getCreateGlossaryExpanderPlugins()
    {
        return [
            new CreateGlossaryExpanderPlugin(),
        ];
    }
}
```

**Pyz\Zed\Twig\TwigDependencyProvider**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\CmsBlock\Communication\Plugin\Twig\CmsBlockTemplateTwigLoaderPlugin;
use Spryker\Zed\CmsBlock\Communication\Plugin\Twig\CmsBlockTwigExtensionPlugin;
...
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new CmsBlockTwigExtensionPlugin(),
            ...
        ];
    }

    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            ...
            new CmsBlockTemplateTwigLoaderPlugin(),
            ...
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following:

* The expanded data for CMS Page and CMS Block content is present in storage.
* You have the **Preview** button in the following sections:
    * In the Back Office, in **Content Management > Pages > List of CMS pages**.
    * In the Back Office, in **Content Management > Pages/Blocks** > *create* or *edit placeholder* pages.
 * You can use the twig function `renderCmsBlockAsTwig` in the Back Office templates—for example, in email templates.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the CMS feature frontend.

### 1) Install the required modules

```bash
composer require spryker-feature/cms:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CmsBlockWidget | vendor/spryker-shop/cms-block-widget |
| CmsPage | vendor/spryker-shop/cms-page |
| CmsSearchPage | vendor/spryker-shop/cms-search-page |
| CmsSlotBlockWidget | vendor/spryker-shop/cms-slot-block-widget |
| ShopCmsSlot | vendor/spryker-shop/shop-cms-slot |
| ShopCmsSlotExtension | vendor/spryker-shop/shop-cms-slot-extension |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
cms.preview.access_denied,You are not logged in or you do not have permission to access this page.,en_US
cms.preview.access_denied,Du bist nicht eingeloggt oder hast keine Berechtigung diese Seite zu betreten.,de_DE
cms.page.sort.relevance,Nach Relevanz sortieren,de_DE
cms.page.sort.relevance,Sort by relevance,en_US
cms.page.sort.name_asc,Nach Name aufsteigend sortieren,de_DE
cms.page.sort.name_asc,Sort by name ascending,en_US
cms.page.sort.name_desc,Nach Name absteigend sortieren,de_DE
cms.page.sort.name_desc,Sort by name descending,en_US
cms.page.itemsFound,Artikel gefunden,de_DE
cms.page.itemsFound,Items found,en_US
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

Register route providers in the Yves application:

**Pyz\Yves\Router\RouterDependencyProvider**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\CmsPage\Plugin\Router\CmsPageRouteProviderPlugin;
use SprykerShop\Yves\CmsSearchPage\Plugin\Router\CmsSearchPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
             new CmsPageRouteProviderPlugin(),
             new CmsSearchPageRouteProviderPlugin(),
        ];
    }
}
```

| PROVIDER PLUGIN | NAMESPACE | ENABLED CONTROLLER | CONTROLLER SPECIFICATION | PREREQUISITES |
| --- | --- | --- | --- | --- |
| CmsSearchPageRouteProviderPlugin | SprykerShop\Yves\CmsSearchPage\Plugin\Router | CmsSearchController | Allows searching for CMS pages by content and CMS page name. |  |
| CmsPageRouteProviderPlugin | SprykerShop\Yves\CmsPage\Plugin\Router | PreviewController | Allows previewing unpublished CMS pages in the Back Office. | <ol><li>Config file contains `$config[CmsGuiConstants::CMS_PAGE_PREVIEW_URI] = '/en/cms/preview/%d'; .`</li><li>The `spryker/customer-user-connector` package is installed.</li><li>The `spryker/customer-user-connector-gui` package is installed.</li><li>The `\Spryker\Zed\CustomerUserConnectorGui\Communication\Plugin\UserTableActionExpanderPlugin` plugin is enabled in `\Pyz\Zed\User\UserDependencyProvider::getUserTableActionExpanderPlugins()`.</li><li>You assigned a customer to your Back Office user.</li></ol> |

{% info_block warningBox "Verification" %}

1. Open the *search* page in `http://mysprykershop.com/search/cms?q=`.
2. Log in as the customer assigned to your Back Office user in Yves and open the *preview* page in `http://mysprykershop.com/en/cms/preview/{unpublished CMS page ID}`.

{% endinfo_block %}

### 4) Set up widgets

Enable Twig plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| CmsBlockTwigPlugin | Provides the list of plugins for CMS block widget. See the [table](#plugin-table). | SprykerShop\Yves\CmsBlockWidget\Plugin |
| CmsTwigPlugin | Provides the `spyCms` function. | SprykerShop\Yves\CmsPage\Plugin\Twig |
| CmsContentWidgetTwigPlugin | Provides the list of plugins for enabling content widgets. You can use them inside CMS blocks and page content. However, we recommend using the [Content Items Widgets feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) instead. | Spryker\Yves\CmsContentWidget\Plugin\Twig |
| ShopCmsSlotTwigPlugin | Provides the `cms_slot` Twig tag. | SprykerShop\Yves\ShopCmsSlot\Plugin\Twig |

**Pyz\Yves\Twig\TwigDependencyProvider**

```php
<?php  

namespace Pyz\Yves\Twig;

use Spryker\Yves\CmsContentWidget\Plugin\Twig\CmsContentWidgetTwigPlugin;
use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\CmsBlockWidget\Plugin\Twig\CmsBlockTwigPlugin;
use SprykerShop\Yves\CmsPage\Plugin\Twig\CmsTwigPlugin;
use SprykerShop\Yves\ShopCmsSlot\Plugin\Twig\ShopCmsSlotTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new CmsBlockTwigPlugin(),
            new CmsTwigPlugin(),
            new CmsContentWidgetTwigPlugin(),
            new ShopCmsSlotTwigPlugin(),
        ];
    }
}
```

<a name="plugin-table"></a>

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| CmsBlockWidgetTwigPlugin | Provides the `spyCmsBlock` twig function for rendering block. |SprykerShop\Yves\CmsBlockWidget\Plugin\Twig |
| CmsBlockPlaceholderTwigPlugin | Provides the `spyCmsBlockPlaceholder` Twig function for placeholder. | Spryker\Yves\CmsBlock\Plugin\Twig |

**Pyz\Yves\CmsBlockWidget\CmsBlockWidgetDependencyProvider**

```php
<?php  

namespace Pyz\Yves\CmsBlockWidget;

use Spryker\Yves\CmsBlock\Plugin\Twig\CmsBlockPlaceholderTwigPlugin;
use SprykerShop\Yves\CmsBlockWidget\CmsBlockWidgetDependencyProvider as SprykerCmsBlockWidgetDependencyProvider;
use SprykerShop\Yves\CmsBlockWidget\Plugin\Twig\CmsBlockWidgetTwigPlugin;

class CmsBlockWidgetDependencyProvider extends SprykerCmsBlockWidgetDependencyProvider
{
    /**
     * @return \Spryker\Shared\Twig\TwigExtensionInterface[]
     */
    protected function getTwigExtensionPlugins(): array
    {
        return [
            new CmsBlockWidgetTwigPlugin(),
            new CmsBlockPlaceholderTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Insert `{% raw %}{{{% endraw %} spyCmsBlock({ keys: ['blck-1']} ) {% raw %}}}{% endraw %}` into a Twig file applied to a published page.
2. Open the page to check if the CMS block content is rendered there.

{% endinfo_block %}

### 5) Set up behavior

Set up Search and Storage clients:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| PaginatedCmsPageQueryExpanderPlugin | Allows fetching paginated search results of CMS pages. | None | Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander |
| SortedCmsPageQueryExpanderPlugin | Allows sorting CMS pages in search results. Search suggestion options are provided by the sort config builder of CMS pages. | None | Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander |
| PaginatedCmsPageResultFormatterPlugin | Adds pagination information to search results. | None | Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter |
| RawCmsPageSearchResultFormatterPlugin | Raw search result formatter. | None | Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter |
| SortedCmsPageSearchResultFormatterPlugin | Allows sorting results.  | None | Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter |
| UrlStorageCmsPageMapperPlugin | Allows getting a page resource from Redis. | None | Spryker\Client\CmsStorage\Plugin |

**Pyz\Client\CmsPageSearch\CmsPageSearchDependencyProvider**

```php
<?php

namespace Pyz\Client\CmsPageSearch;

use Spryker\Client\CmsPageSearch\CmsPageSearchDependencyProvider as SprykerCmsPageSearchDependencyProvider;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander\PaginatedCmsPageQueryExpanderPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander\SortedCmsPageQueryExpanderPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter\PaginatedCmsPageResultFormatterPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter\RawCmsPageSearchResultFormatterPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter\SortedCmsPageSearchResultFormatterPlugin;


class CmsPageSearchDependencyProvider extends SprykerCmsPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCmsPageSearchQueryExpanderPlugins(): array
    {
        return [
            new SortedCmsPageQueryExpanderPlugin(),
            new PaginatedCmsPageQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createCmsPageSearchResultFormatterPlugins(): array
    {
        return [
            new SortedCmsPageSearchResultFormatterPlugin(),
            new PaginatedCmsPageResultFormatterPlugin(),
            new RawCmsPageSearchResultFormatterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the changes by searching for a CMS page. On the **Search** page, you can see CMS pages in the search results, sort the CMS pages and use pagination.

{% endinfo_block %}

| ROUTER | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| PageResourceCreatorPlugin | When a CMS page is opened in Storefront, fetches its data from Storage and inserts it into the controller. | SprykerShop\Yves\CmsPage\Plugin\StorageRouter |

**Pyz\Yves\ShopRouter\ShopRouterDependencyProvider**

```php
<?php

namespace Pyz\Yves\ShopRouter;

use SprykerShop\Yves\CmsPage\Plugin\PageResourceCreatorPlugin;
use SprykerShop\Yves\ShopRouter\ShopRouterDependencyProvider as SprykerShopRouterDependencyProvider;

class ShopRouterDependencyProvider extends SprykerShopRouterDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ShopRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface[]
     */
    protected function getResourceCreatorPlugins()
    {
        return [
            new PageResourceCreatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the changes by opening an existing CMS page.

{% endinfo_block %}

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| FullTextSearchCmsPageTabPlugin | Shows the **Page** tab in the search page. | SprykerShop\Yves\CmsSearchPage\Plugin |

**Pyz\Yves\TabsWidget\TabsWidgetDependencyProvider**

```php
<?php

namespace Pyz\Yves\TabsWidget;

use SprykerShop\Yves\CmsSearchPage\Plugin\FullTextSearchCmsPageTabPlugin;
use SprykerShop\Yves\TabsWidget\TabsWidgetDependencyProvider as SprykerTabsWidgetDependencyProvider;

class TabsWidgetDependencyProvider extends SprykerTabsWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\TabsWidgetExtension\Plugin\FullTextSearchTabPluginInterface[]
     */
    protected function createFullTextSearchPlugins(): array
    {
        return [
            new FullTextSearchCmsPageTabPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the changes by searching for an existing page. You should see the **Page** tab in the search results.

{% endinfo_block %}

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| CmsSlotBlockWidgetCmsSlotContentPlugin | Provides content for slot widgets. | SprykerShop\Yves\CmsSlotBlockWidget\Plugin\ShopCmsSlot |

**Pyz\Yves\ShopCmsSlot\ShopCmsSlotDependencyProvider**

```php
<?php

namespace Pyz\Yves\ShopCmsSlot;

use Spryker\Shared\CmsSlotBlock\CmsSlotBlockConfig;
use SprykerShop\Yves\CmsSlotBlockWidget\Plugin\ShopCmsSlot\CmsSlotBlockWidgetCmsSlotContentPlugin;
use SprykerShop\Yves\ShopCmsSlot\ShopCmsSlotDependencyProvider as SprykerShopShopCmsSlotDependencyProvider;

class ShopCmsSlotDependencyProvider extends SprykerShopShopCmsSlotDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ShopCmsSlotExtension\Dependency\Plugin\CmsSlotContentPluginInterface[]
     */
    protected function getCmsSlotContentPlugins(): array
    {
        return [
            CmsSlotBlockConfig::CMS_SLOT_CONTENT_PROVIDER_TYPE => new CmsSlotBlockWidgetCmsSlotContentPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the changes by adding a slot widget to a page. See [Templates & Slots Feature Overview](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html) for references.

{% endinfo_block %}

### Set up SprykerCmsBlocks content provider behavior

{% info_block infoBox %}
Follow the further steps only if you are going to use the [visibility conidtions](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#visibility-conditions) functionality with `SprykerCmsBlocks` content provider for slots.
{% endinfo_block %}

#### 1) Install the required modules

```bash
composer require spryker/cms-slot-block-product-category-connector:"^1.0.0" sspryker/cms-slot-block-product-category-gui:"^1.0.0" spryker/cms-slot-block-category-connector:"^1.0.0" sspryker/cms-slot-block-category-gui:"^1.0.0" spryker/cms-slot-block-cms-connector:"^1.0.0" spryker/cms-slot-block-cms-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CmsSlotBlock | vendor/spryker/cms-slot-block |
| CmsSlotBlockProductCategoryConnector | vendor/spryker/cms-slot-block-product-category-connector |
| CmsSlotBlockProductCategoryGui | vendor/spryker/cms-slot-block-product-category-gui |
| CmsSlotBlockCategoryConnector | vendor/spryker/cms-slot-block-category-connector |
| CmsSlotBlockCategoryGui | vendor/spryker/cms-slot-block-category-gui |
| CmsSlotBlockCmsConnector | vendor/spryker/cms-slot-block-cms-connector |
| CmsSlotBlockCmsGui | vendor/spryker/cms-slot-block-cms-gui |

{% endinfo_block %}

#### 2) Set up configuration

Add the relation of CMS slot template to condition key:

**Pyz\Zed\CmsSlotBlock\CmsSlotBlockConfig**

```php
<?php

namespace Pyz\Zed\CmsSlotBlock;

use Spryker\Shared\CmsSlotBlockCategoryConnector\CmsSlotBlockCategoryConnectorConfig;
use Spryker\Shared\CmsSlotBlockCmsConnector\CmsSlotBlockCmsConnectorConfig;
use Spryker\Shared\CmsSlotBlockProductCategoryConnector\CmsSlotBlockProductCategoryConnectorConfig;
use Spryker\Zed\CmsSlotBlock\CmsSlotBlockConfig as SprykerCmsSlotBlockConfig;

class CmsSlotBlockConfig extends SprykerCmsSlotBlockConfig
{
    /**
     * @return string[][]
     */
    public function getTemplateConditionsAssignment(): array
    {
        return [
            '@ProductDetailPage/views/pdp/pdp.twig' => [
                CmsSlotBlockProductCategoryConnectorConfig::CONDITION_KEY,
            ],
            '@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig' => [
                CmsSlotBlockCategoryConnectorConfig::CONDITION_KEY,
            ],
            '@Cms/templates/placeholders-title-content-slot/placeholders-title-content-slot.twig' => [
                CmsSlotBlockCmsConnectorConfig::CONDITION_KEY,
            ],
        ];
    }
}
```

#### 3) Enable plugins

1. Prepare the Back Office form plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ProductCategorySlotBlockConditionFormPlugin | Extends `CmsSlotBlockForm` with a product category condition form. | Spryker\Zed\CmsSlotBlockProductCategoryGui\Communication\Plugin |
| CategorySlotBlockConditionFormPlugin | Extends `CmsSlotBlockForm` with a category condition form. | Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin |
| CmsSlotBlockConditionFormPlugin | Extends `CmsSlotBlockForm` by with a CMS condition form. | Spryker\Zed\CmsSlotBlockCmsGui\Communication\Plugin |

**Pyz\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider**

```php
<?php

namespace Pyz\Zed\CmsSlotBlockGui;

use Spryker\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider as SprykerCmsSlotBlockGuiDependencyProvider;
use Spryker\Zed\CmsSlotBlockProductCategoryGui\Communication\Plugin\ProductCategorySlotBlockConditionFormPlugin;
use Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin\CategorySlotBlockConditionFormPlugin;
use Spryker\Zed\CmsSlotBlockCmsGui\Communication\Plugin\CmsPageSlotBlockConditionFormPlugin;

class CmsSlotBlockGuiDependencyProvider extends SprykerCmsSlotBlockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CmsSlotBlockGuiExtension\Communication\Plugin\CmsSlotBlockGuiConditionFormPluginInterface[]
     */
    protected function getCmsSlotBlockFormPlugins(): array
    {
        return [
            new ProductCategorySlotBlockConditionFormPlugin(),
			new CategorySlotBlockConditionFormPlugin(),
			new CmsPageSlotBlockConditionFormPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}


1. In the Back Office, go to **Content Management > Slots**.
2. In **List of Templates**, choose the template for which you've created the visibility condition.
3. Choose a slot in the **List of Slots for [NAME] Template**.
4. Select or [assign](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html#assigning-cms-blocks-to-slots) a CMS block to a slot in the **List of Blocks for [NAME] Slot**.
5. Make sure that for each CMS block, there is an additional form allowing you to define the visibility condition you have created.

{% endinfo_block %}

2. Add a visibility resolver plugin to the `CmsSlotBlock` client:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ProductCategoryCmsSlotBlockConditionResolverPlugin | Provides visibility resolver for products and product categories. | Spryker\Client\CmsSlotBlockProductCategoryConnector\Plugin\CmsSlotBlock |
| CategoryCmsSlotBlockConditionResolverPlugin | Provides a visibility resolver for categories. | Spryker\Client\CmsSlotBlockCategoryConnector\Plugin\CmsSlotBlock |
| CmsPageCmsSlotBlockConditionResolverPlugin | Provides a visibility resolver for CMS pages. | Spryker\Client\CmsSlotBlockCmsConnector\Plugin\CmsSlotBlock |

**Pyz\Client\CmsSlotBlock\CmsSlotBlockDependencyProvider**

```php
<?php

namespace Pyz\Client\CmsSlotBlock;

use Spryker\Client\CmsSlotBlock\CmsSlotBlockDependencyProvider as SprykerCmsSlotBlockDependencyProvider;
use Spryker\Client\CmsSlotBlockCategoryConnector\Plugin\CmsSlotBlock\CategoryCmsSlotBlockConditionResolverPlugin;
use Spryker\Client\CmsSlotBlockCmsConnector\Plugin\CmsSlotBlock\CmsPageCmsSlotBlockConditionResolverPlugin;
use Spryker\Client\CmsSlotBlockProductCategoryConnector\Plugin\CmsSlotBlock\ProductCategoryCmsSlotBlockConditionResolverPlugin;

class CmsSlotBlockDependencyProvider extends SprykerCmsSlotBlockDependencyProvider
{
    /**
     * @return \Spryker\Client\CmsSlotBlockExtension\Dependency\Plugin\CmsSlotBlockVisibilityResolverPluginInterface[]
     */
    protected function getCmsSlotBlockVisibilityResolverPlugins(): array
    {
        return [
            new CategoryCmsSlotBlockConditionResolverPlugin(),
            new CmsPageCmsSlotBlockConditionResolverPlugin(),
            new ProductCategoryCmsSlotBlockConditionResolverPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Storefront, open a product details page that contains a CMS block for which you have selected the visibility conditions.

Make sure the following:
* You fulfill the visibility conditions and see the CMS block content.
* You do not fulfill the visibility conditions and do not see the CMS block content.


{% endinfo_block %}

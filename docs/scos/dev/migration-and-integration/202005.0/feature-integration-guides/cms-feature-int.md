---
title: CMS Feature Integration Guide
originalLink: https://documentation.spryker.com/v5/docs/cms-feature-integration-guide
redirect_from:
  - /v5/docs/cms-feature-integration-guide
  - /v5/docs/en/cms-feature-integration-guide
---

## Install Feature Core
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| SprykerCore | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/cms:"^master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`Cms`</td><td>`vendor/spryker/cms`</td></tr><tr><td>`CmsBlock`</td><td>`vendor/spryker/cms-block`</td></tr><tr><td>`CmsBlockCategoryStorage`</td><td>`vendor/spryker/cms-block-category-storage`</td></tr><tr><td>`CmsBlockGui`</td><td>`vendor/spryker/cms-block-gui`</td></tr><tr><td>`CmsBlockProductStorage`</td><td>`vendor/spryker/cms-block-product-storage`</td></tr><tr><td>`CmsBlockStorage`</td><td>`vendor/spryker/cms-block-storage`</td></tr><tr><td>`CmsContentWidget`</td><td>`vendor/spryker/cms-content-widget`</td></tr><tr><td>`CmsGui`</td><td>`vendor/spryker/cms-gui`</td></tr><tr><td>`CmsPageDataImport`</td><td>`vendor/spryker/cms-page-data-import`</td></tr><tr><td>`CmsPageSearch`</td><td>`vendor/spryker/cms-page-search`</td></tr><tr><td>`CmsSlot`</td><td>`vendor/spryker/cms-slot`</td></tr><tr><td>`CmsSlotBlock`</td><td>`vendor/spryker/cms-slot-block`</td></tr><tr><td>`CmsSlotBlockDataImport`</td><td>`vendor/spryker/cms-slot-block-data-import`</td></tr><tr><td>`CmsSlotBlockExtension`</td><td>`vendor/spryker/cms-slot-block-extension`</td></tr><tr><td>`CmsSlotBlockGui`</td><td>`vendor/spryker/cms-slot-block-gui`</td></tr><tr><td>`CmsSlotBlockGuiExtension`</td><td>`vendor/spryker/cms-slot-block-gui-extension`</td></tr><tr><td>`CmsSlotDataImport`</td><td>`vendor/spryker/cms-slot-data-import`</td></tr><tr><td>`CmsSlotGui`</td><td>`vendor/spryker/cms-slot-gui`</td></tr><tr><td>`CmsSlotStorage`</td><td>`vendor/spryker/cms-slot-storage`</td></tr><tr><td>`CmsStorage`</td><td>`vendor/spryker/cms-storage`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects 
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

2. Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database.<table><thead><tr><td>Database entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_cms_block`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_block_glossary_key_mapping`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_block_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_block_store`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_block_template`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_glossary_key_mapping`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_page`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_page_localized_attributes`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_page_search`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_page_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_page_store`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot_block`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot_block_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot_storage`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot_template`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_slot_to_cms_slot_template`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_template`</td><td>table</td><td>created</td></tr><tr><td>`spy_cms_version`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`SpyCmsTemplateEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsTemplateEntityTransfer`</td></tr><tr><td>`SpyCmsPageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsPageEntityTransfer`</td></tr><tr><td>`SpyCmsPageStoreEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsPageStoreEntityTransfer`</td></tr><tr><td>`SpyCmsGlossaryKeyMappingEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsGlossaryKeyMappingEntityTransfer`</td></tr><tr><td>`SpyCmsVersionEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsVersionEntityTransfer`</td></tr><tr><td>`SpyCmsBlockTemplateEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockTemplateEntityTransfer`</td></tr><tr><td>`SpyCmsBlockGlossaryKeyMappingEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockGlossaryKeyMappingEntityTransfer`</td></tr><tr><td>`SpyCmsBlockEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockEntityTransfer`</td></tr><tr><td>`SpyCmsBlockStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockStorageEntityTransfer`</td></tr><tr><td>`SpyCmsBlockStoreEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockStoreEntityTransfer`</td></tr><tr><td>`SpyCmsPageStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsPageStorageEntityTransfer`</td></tr><tr><td>`SpyCmsBlockProductStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockProductStorageEntityTransfer`</td></tr><tr><td>`SpyCmsBlockCategoryStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsBlockCategoryStorageEntityTransfer`</td></tr><tr><td>`SpyCmsSlotEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsSlotEntityTransfer`</td></tr><tr><td>`SpyCmsSlotBlockEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsSlotBlockEntityTransfer`</td></tr><tr><td>`SpyCmsSlotStorageEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsSlotStorageEntityTransfer`</td></tr><tr><td>`SpyCmsSlotTemplateEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsSlotTemplateEntity`</td></tr><tr><td>`SpyCmsSlotToCmsSlotTemplateEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCmsSlotToCmsSlotTemplateEntity`</td></tr><tr><td>`CmsTemplate`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsTemplateTransfer`</td></tr><tr><td>`Page`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PageTransfer`</td></tr><tr><td>`CmsPageLocalizedAttributes`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsPageLocalizedAttributesTransfer`</td></tr><tr><td>`PageKeyMapping`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PageKeyMappingTransfer`</td></tr><tr><td>`CmsBlock`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockTransfer`</td></tr><tr><td>`CmsPage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsPageTransfer`</td></tr><tr><td>`CmsPageAttributes`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsPageAttributesTransfer`</td></tr><tr><td>`CmsGlossary`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsGlossaryTransfer`</td></tr><tr><td>`CmsGlossaryAttributes`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsGlossaryAttributesTransfer`</td></tr><tr><td>`CmsPlaceholderTranslation`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsPlaceholderTranslationTransfer`</td></tr><tr><td>`CmsVersion`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsVersionTransfer`</td></tr><tr><td>`CmsVersionData`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsVersionDataTransfer`</td></tr><tr><td>`LocaleCmsPageData`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/LocaleCmsPageDataTransfer`</td></tr><tr><td>`FlattenedLocaleCmsPageDataRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/FlattenedLocaleCmsPageDataRequestTransfer`</td></tr><tr><td>`StoreRelation`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreRelationTransfer`</td></tr><tr><td>`Store`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreTransfer`</td></tr><tr><td>`CmsBlockGlossary`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockGlossaryTransfer`</td></tr><tr><td>`CmsBlockGlossaryPlaceholder`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockGlossaryPlaceholderTransfer`</td></tr><tr><td>`CmsBlockGlossaryPlaceholderTranslation`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockGlossaryPlaceholderTranslationTransfer`</td></tr><tr><td>`CmsBlockTemplate`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockTemplateTransfer`</td></tr><tr><td>`Category`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CategoryTransfer`</td></tr><tr><td>`CmsBlockCategoryPosition`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockCategoryPositionTransfer`</td></tr><tr><td>`CmsBlockProduct`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsBlockProductTransfer`</td></tr><tr><td>`CmsContentWidgetConfigurationList`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsContentWidgetConfigurationListTransfer`</td></tr><tr><td>`CmsContentWidgetConfiguration`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsContentWidgetConfigurationTransfer`</td></tr><tr><td>`CmsContentWidgetFunctions`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsContentWidgetFunctionsTransfer`</td></tr><tr><td>`CmsContentWidgetFunction`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsContentWidgetFunctionTransfer`</td></tr><tr><td>`CmsPageMetaAttributes`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsPageMetaAttributesTransfer`</td></tr><tr><td>`CmsSlot`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotTransfer`</td></tr><tr><td>`CmsSlotBlock`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotBlockTransfer`</td></tr><tr><td>`CmsSlotBlockCollection`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotBlockCollectionTransfer`</td></tr><tr><td>`CmsSlotBlockCondition`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotBlockConditionTransfer`</td></tr><tr><td>`CmsSlotBlockCriteria`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotBlockCriteriaTransfer`</td></tr><tr><td>`CmsSlotBlockStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotBlockStorageTransfer`</td></tr><tr><td>`CmsSlotCriteria`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotCriteriaTransfer`</td></tr><tr><td>`CmsSlotExternalData`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotExternalDataTransfer`</td></tr><tr><td>`CmsSlotParams`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotParamsTransfer`</td></tr><tr><td>`CmsSlotStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotStorageTransfer`</td></tr><tr><td>`CmsSlotTemplate`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotTemplateTransfer`</td></tr><tr><td>`CmsSlotTemplateConfiguration`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CmsSlotTemplateConfigurationTransfer`</td></tr><tr><td>`ConstraintViolation`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ConstraintViolationTransfer`</td></tr><tr><td>`Filter`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/FilterTransfer`</td></tr><tr><td>`Message`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/MessageTransfer`</td></tr><tr><td>`ValidationResponse`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ValidationResponseTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Add Translations
Run the following command to update translations:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

You can switch the language in the **Back Office > User Control > User section > Edit > Interface language**. Make sure that the **Content Management** section is translatable. 

{% endinfo_block %}

### 4) Configure Export to Redis and Elasticsearch
1. Set up event listeners. By doing this step, you enable tables to be published upon a change - create, edit or delete.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CmsStorageEventSubscriber` | Registers listeners that are responsible for publishing CMS pages to storage when a related entity changes. | None | `Spryker\Zed\CmsStorage\Communication\Plugin\Event\Subscriber` |
| `CmsBlockStorageEventSubscriber` | Registers listeners that are responsible for publishing CMS blocks to storage when a related entity changes. | None | `Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event\Subscriber` |
| `CmsPageSearchEventSubscriber` | Registers listeners that are responsible for publishing CMS pages to Elasticsearch when a related entity changes. | None | `Spryker\Zed\CmsPageSearch\Communication\Plugin\Event\Subscriber` |
| `CmsSlotStorageEventSubscriber` | Registers listeners that are responsible for publishing slots to storage when a related entity changes. | None | `Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event\Subscriber` |
| `CmsSlotBlockStorageEventSubscriber` | Registers listeners that are responsible for publishing slots to CMS block relations to storage when a related entity changes. | None | `Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Event\Subscriber` | `ContentStorageEventSubscriber` | Registers listeners that are responsible for publishing content items to storage when a related entity changes. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber`
| `CmsBlockCategoryStorageEventSubscriber` | Registers listeners that are responsible for publishing category to CMS block relations to storage when a related entity changes (optional) | None | `Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event\Subscriber` |
| `CmsBlockProductStorageEventSubscriber` | Registers listeners that are responsible for publishing product to CMS block relations to storage when a related entity changes (optional) | None | `Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event\Subscriber` |

**Pyz\Zed\Event\EventDependencyProvider**
    
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

2. Add Queue configuration.

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

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CmsPageSynchronizationDataPlugin` | Synchronizes the `spy_cms_page_search` table content into Elasticsearch. | None | `Spryker\Zed\CmsPageSearch\Communication\Plugin\Synchronization` |
| `CmsSynchronizationDataPlugin` | Synchronizes the `spy_cms_page_storage` table content into Storage. | None | `Spryker\Zed\CmsStorage\Communication\Plugin\Synchronization` |
| `CmsBlockSynchronizationDataPlugin` | Synchronizes the `spy_cms_block_storage` table content into Storage. | None | `Spryker\Zed\CmsBlockStorage\Communication\Plugin\Synchronization` |
| `CmsSlotBlockSynchronizationDataBulkPlugin` | Synchronizes the `spy_cms_slot_block_storage` table content into Storage. | None | `Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Synchronization` |
| `CmsSlotSynchronizationDataBulkPlugin` | Synchronizes the `spy_cms_slot_storage` table content into Storage. | None | `Spryker\Zed\CmsSlotStorage\Communication\Plugin\Synchronization` |
| `ContentStorageSynchronizationDataPlugin` | Synchronizes the `spy_content_storage` table content into Storage. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization` |
| `CmsBlockCategorySynchronizationDataPlugin` | Synchronizes the `spy_cms_block_categoty_storage` table content into Storage. (*optional*) | None | `Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Synchronization` |
| `CmsBlockProductSynchronizationDataPlugin` | Synchronizes the `spy_cms_block_product_storage` table content into Storage. (*optional*) | None | `Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Synchronization` |

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

5. Enable event trigger plugins to be able to re-trigger publish events.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CmsPageEventResourceQueryContainerPlugin` | Triggers publish events for all or particular CMS pages (using the ID identifier) which sends them to the `spy_cms_page_search` table. | None | `Spryker\Zed\CmsPageSearch\Communication\Plugin\Event` |
| `CmsEventResourceQueryContainerPlugin` | Triggers publish events for all or particular CMS pages (using the ID identifier) which sends them to the `spy_cms_page_storage` table. | None | `Spryker\Zed\CmsStorage\Communication\Plugin\Event` |
| `CmsBlockEventResourceQueryContainerPlugin` | Triggers publish events for all or particular CMS blocks (using the ID identifier) which sends them to the `spy_cms_block_storage` table. | None | `Spryker\Zed\CmsBlockStorage\Communication\Plugin\Event` |
| `CmsSlotEventResourceBulkRepositoryPlugin` | Triggers publish events for all or particular slots (using the ID identifier) which sends them to the `spy_cms_slot_storage` table. | None | `Spryker\Zed\CmsSlotStorage\Communication\Plugin\Event` |
| `CmsSlotBlockEventResourceBulkRepositoryPlugin` | Triggers publish events for all or particular CMS block to slot assignments (using the ID identifier) which sends them to the `spy_cms_slot_block_storage` table. | None | `Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\EventBehavior` |
| `ContentStorageEventResourceBulkRepositoryPlugin` | Triggers publish events for all or particular content items (using the ID identifier) which sends them to `spy_content_storage` table. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Event` |
| `CmsBlockCategoryEventResourceQueryContainerPlugin` | Triggers publish events for all or particular CMS block to category relationships (using the ID identifier) which sends them to the `spy_cms_block_category_storage` table. (*optional*) | None | `Spryker\Zed\CmsBlockCategoryStorage\Communication\Plugin\Event` |
| `CmsBlockProductEventResourceQueryContainerPlugin`| Triggers publish events for all or particular CMS block to product relationships (using the ID identifier) which sends them to the `spy_cms_block_category_storage` table. (*optional*) | None | `Spryker\Zed\CmsBlockProductStorage\Communication\Plugin\Event`|

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
Make sure that all the CMS entity changes performed manually in the Back Office are exported or removed from Redis and Elasticsearch accordingly.<table><thead><tr><td>Storage Type</td><td>Target Entity</td><td>Example Expected Data Identifier</td></tr></thead><tbody><tr><td>Redis</td><td>`CmsBlock`</td><td>`cms_block:de:de_de:blck-1`</td></tr><tr><td>Redis</td><td>`CmsBlockCategory`</td><td>`cms_block_category:5`</td></tr><tr><td>Redis</td><td>`CmsBlockProduct`</td><td>`cms_block_product:93`</td></tr><tr><td>Redis</td><td>`CmsPage`</td><td>`cms_page:de:de_de:1`</td></tr><tr><td>Redis</td><td>`CmsSlot`</td><td>`cms_slot:slt-1`</td></tr><tr><td>Redis</td><td>`CmsSlotBlock`</td><td>`cms_slot_block:@productdetailpage/views/pdp/pdp.twig:slt-5`</td></tr><tr><td>Elasticsearch</td><td>`CmsPage`</td><td>`cms_page:de:de_de:6`</td></tr></tbody></table>
{% endinfo_block %}

**Example Expected Data Fragment: Redis, CmsBlock**

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

### 6) Import Data
#### Import Cms Pages
1. Prepare your pages data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/cms-page-data-import/data/import/cms_page.csv</summary>

```yaml
template_name,is_searchable,is_active,publish,page_key,url.de_DE,url.en_US,name.de_DE,name.en_US,meta_title.de_DE,meta_title.en_US,meta_keywords.de_DE,meta_keywords.en_US,meta_description.de_DE,meta_description.en_US,placeholder.title.de_DE,placeholder.title.en_US,placeholder.content.de_DE,placeholder.content.en_US
static full page,1,1,1,page_1,/de/impressum,/en/imprint,Impressum,Imprint,Impressum,Imprint,Impressum,Imprint,Impressum,Imprint,<h2>Impressum</h2>,<h2>About</h2>,"<p>Demoshop<br/>
    Julie-Wolfthornstraße 1<br/>10555 Berlin</p>
 
<p>Telefon: 030 5678909<br/>
    E-Mail: <a href=""mailto:info@spryker.com"">info@spryker.com</a><br/>
</p>
 
<p><strong>Vertreten durch:</strong><br/>Spryker<br/>Geschäftsführer: Max Mustermann<br/>Registergericht: Hamburg<br/>Registernummer:
    56789</p>
 
<p><strong>Registereintrag:</strong><br/>Eingetragen im Handelsregister.<br/>Registergericht: Hamburg<br/>Registernummer:
    34567888456789</p>
 
<p><strong>Umsatzsteuer-ID: </strong><br/>Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz:<br/>34567</p>
 
<p>Quelle: <a href=""http://www.experten-branchenbuch.de/"">www.experten-branchenbuch.de</a></p><br/><br/>
 
<h2>Datenschutzerklärung:</h2>
 
<p><strong>Datenschutz</strong><br/>Nachfolgend möchten wir Sie über unsere Datenschutzerklärung informieren. Sie finden
    hier Informationen über die Erhebung und Verwendung persönlicher Daten bei der Nutzung unserer Webseite. Wir
    beachten dabei das für Deutschland geltende Datenschutzrecht. Sie können diese Erklärung jederzeit auf unserer
    Webseite abrufen.
    <br/><br/>
    Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
    Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann.
    <br/><br/>
    Die Verwendung der Kontaktdaten unseres Impressums zur gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei
    denn wir hatten zuvor unsere schriftliche Einwilligung erteilt oder es besteht bereits eine Geschäftsbeziehung. Der
    Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und
    Weitergabe ihrer Daten.
    <br/><br/>
    <strong>Personenbezogene Daten</strong>
    <br/>
    Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Soweit auf unseren Seiten personenbezogene
    Daten (wie Name, Anschrift oder E-Mail Adresse) erhoben werden, erfolgt dies, soweit möglich, auf freiwilliger
    Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Sofern zwischen Ihnen
    und uns ein Vertragsverhältnis begründet, inhaltlich ausgestaltet oder geändert werden soll oder Sie an uns eine
    Anfrage stellen, erheben und verwenden wir personenbezogene Daten von Ihnen, soweit dies zu diesen Zwecken
    erforderlich ist (Bestandsdaten). Wir erheben, verarbeiten und nutzen personenbezogene Daten soweit dies
    erforderlich ist, um Ihnen die Inanspruchnahme des Webangebots zu ermöglichen (Nutzungsdaten). Sämtliche
    personenbezogenen Daten werden nur solange gespeichert wie dies für den geannten Zweck (Bearbeitung Ihrer Anfrage
    oder Abwicklung eines Vertrags) erforderlich ist. Hierbei werden steuer- und handelsrechtliche Aufbewahrungsfristen
    berücksichtigt. Auf Anordnung der zuständigen Stellen dürfen wir im Einzelfall Auskunft über diese Daten
    (Bestandsdaten) erteilen, soweit dies für Zwecke der Strafverfolgung, zur Gefahrenabwehr, zur Erfüllung der
    gesetzlichen Aufgaben der Verfassungsschutzbehörden oder des Militärischen Abschirmdienstes oder zur Durchsetzung
    der Rechte am geistigen Eigentum erforderlich ist.</p>
 
<p><strong>Auskunftsrecht</strong><br/>Sie haben das jederzeitige Recht, sich unentgeltlich und unverzüglich über die zu
    Ihrer Person erhobenen Daten zu erkundigen. Sie haben das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer
    angegeben persönlichen Daten mit Wirkung für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte
    an den Anbieter unter den Kontaktdaten im Impressum.</p>","<p>Demoshop<br/>
    Julie-Wolfthornstraße 1<br/>10555 Berlin</p>
 
<p>Telephone: 030 5678909<br/>
    E-Mail: <a href=""mailto:info@spryker.com"">info@spryker.com</a><br/>
</p>
 
<p><strong>Represented by</strong><br/>Spryker<br/>Managing Director: Max Mustermann<br/>Register Court: Hamburg<br/>Register Number:
    56789</p>
 
<p><strong>Register Entry:</strong><br/>Entry in Handelsregister.<br/>Register Court: Hamburg<br/>Register number:
    34567888456789</p>
 
<p>Source: <a href=""http://www.muster-vorlagen.net"" target=""_blank"">Muster-Vorlagen.net – Impressum Generator</a></p><br/><br/>
 
<h2>Disclaimer:</h2>
 
<p><strong>Accountability for content</strong><br/>
   The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy,
   completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these
   web pages. In this context, please note that we are accordingly not obliged to monitor merely the transmitted or saved information
   of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of
   information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
   <br/><br/>
 
    <strong>Accountability for links</strong><br/>
   Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the
   linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we
   will remove the respective link immediately.</p>
 
<p><strong>Copyright</strong><br/>
   Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§ 44a et seq.
   of the copyright law), every form of utilizing, reproducing or processing works subject to copyright protection on our web
   pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are allowed only
   for private use, so must not serve either directly or indirectly for earnings. Unauthorized utilization of copyrighted works
   is punishable (§ 106 of the copyright law).</p>"
static full page,1,1,1,page_2,/de/agb,/en/gtc,AGB,GTC,AGB,GTC,AGB,GTC,AGB,GTC,<h2>Allgemeine Geschäftsbedingungen (AGB)</h2>,<h2>General Terms and Conditions (GTC)</h2>,"<h2>Allgemeine Geschäftsbedingungen (AGB)</h2>
     ]]></translation>
        </placeholder>
        <placeholder>
            <name>content</name>
            <translation><![CDATA[
<br/>
<br/><br/>
<b>§ 1 Geltungsbereich & Abwehrklausel</b>
<br/><br/>
 
<div align=""justify"">(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des
    Shops (nachfolgend „Anbieter“) und seinen Kunden gelten ausschließlich die folgenden Allgemeinen
    Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung.
    <br/><br/>
    (2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.
</div>
<br/><br/>
<b>§ 2 Zustandekommen des Vertrages</b>
<br/><br/>
 
<div align=""justify"">(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf
    Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein
    Angebot abzugeben.
    <br/><br/>
    (2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den
    Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt
    der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an.
    <br/><br/>
    (3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese
    Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich
    der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des
    Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.
</div>
<br/><br/>
 
<b>§ 3 Eigentumsvorbehalt</b>
<br/><br/>
 
<div align=""justify"">Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.
 
</div>
<br/><br/>
<b>§ 4 Fälligkeit</b>
<br/><br/>
 
<div align=""justify"">Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</div>
 
<br/><br/>
<b>§ 5 Gewährleistung</b>
<br/><br/>
 
<div align=""justify"">(1) Die Gewährleistungsrechte des Kunden richten sich nach den allgemeinen gesetzlichen
    Vorschriften, soweit nachfolgend nichts anderes bestimmt ist. Für Schadensersatzansprüche des Kunden gegenüber dem
    Anbieter gilt die Regelung in § 6 dieser AGB.
    <br/><br/>
    (2) Die Verjährungsfrist für Gewährleistungsansprüche des Kunden beträgt bei Verbrauchern bei neu hergestellten
    Sachen 2 Jahre, bei gebrauchten Sachen 1 Jahr. Gegenüber Unternehmern beträgt die Verjährungsfrist bei neu
    hergestellten Sachen und bei gebrauchten Sachen 1 Jahr.
    Die vorstehende Verkürzung der Verjährungsfristen gilt nicht für Schadensersatzansprüche des Kunden aufgrund einer
    Verletzung des Lebens, des Körpers, der Gesundheit sowie für Schadensersatzansprüche aufgrund einer Verletzung
    wesentlicher Vertragspflichten. Wesentliche Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Ziels
    des Vertrags notwendig ist, z.B. hat der Anbieter dem Kunden die Sache frei von Sach- und Rechtsmängeln zu übergeben
    und
    das Eigentum an ihr zu verschaffen.
    Die vorstehende Verkürzung der Verjährungsfristen gilt ebenfalls nicht für Schadensersatzansprüche, die auf einer
    vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder
    Erfüllungsgehilfen beruhen.
    Gegenüber Unternehmern ebenfalls ausgenommen von der Verkürzung der Verjährungsfristen ist
    der Rückgriffsanspruch nach § 478 BGB.
 
    <br/><br/>
    (3) Eine Garantie wird von dem Anbieter nicht erklärt.
 
</div>
<br/><br/>
<b>§ 6 Haftungsausschluss</b>
<br/><br/>
 
<div align=""justify"">(1) Schadensersatzansprüche des Kunden sind ausgeschlossen, soweit nachfolgend nichts anderes
    bestimmt ist. Der vorstehende Haftungsausschluss gilt auch zugunsten der gesetzlichen Vertreter und
    Erfüllungsgehilfen des Anbieters, sofern der Kunde Ansprüche gegen diese geltend macht.
    <br/><br/>
    (2) Von dem unter Ziffer 1 bestimmten Haftungsausschluss ausgenommen sind Schadensersatzansprüche aufgrund einer
    Verletzung des Lebens, des Körpers, der Gesundheit und Schadensersatzansprüche aus der Verletzung wesentlicher
    Vertragspflichten. Wesentliche Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Ziels des Vertrags
    notwendig ist, z.B. hat der Anbieter dem Kunden die Sache frei von Sach- und Rechtsmängeln zu übergeben und
    das Eigentum an ihr zu verschaffen. Von dem Haftungsausschluss ebenfalls ausgenommen ist die Haftung für Schäden,
    die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter
    oder Erfüllungsgehilfen beruhen.
    <br/><br/>
    (3) Vorschriften des Produkthaftungsgesetzes (ProdHaftG) bleiben unberührt.
 
</div>
<br/><br/>
<b>§ 7 Abtretungs- und Verpfändungsverbot</b>
<br/><br/>
 
<div align=""justify"">Die Abtretung oder Verpfändung von dem Kunden gegenüber dem Anbieter zustehenden
    Ansprüchen oder Rechten ist ohne Zustimmung des Anbieters ausgeschlossen, sofern der Kunde
    nicht ein berechtigtes Interesse an der Abtretung oder Verpfändung nachweist.
 
</div>
<br/><br/>
<b>§ 8 Aufrechnung</b>
<br/><br/>
 
<div align=""justify"">Ein Aufrechnungsrecht des Kunden besteht nur, wenn seine zur Aufrechnung gestellte Forderung
    rechtskräftig festgestellt wurde oder unbestritten ist.
 
</div>
<br/><br/>
<b>§ 9 Rechtswahl & Gerichtsstand</b>
<br/><br/>
 
<div align=""justify"">(1) Auf die vertraglichen Beziehungen zwischen dem Anbieter und dem Kunden findet das Recht der
    Bundesrepublik Deutschland Anwendung. Von dieser Rechtswahl ausgenommen sind die
    zwingenden Verbraucherschutzvorschriften des Landes, in dem der Kunde seinen gewöhnlichen
    Aufenthalt hat. Die Anwendung des UN-Kaufrechts ist ausgeschlossen.
    <br/><br/>
    (2) Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis zwischen dem Kunden und dem Anbieter ist der
    Sitz des Anbieters, sofern es sich bei dem Kunden um einen Kaufmann, eine juristische Person des öffentlichen Rechts
    oder ein öffentlich-rechtliches Sondervermögen handelt.
 
</div>
<br/><br/>
<b>§ 10 Salvatorische Klausel</b>
 
<div align=""justify"">Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen unwirksam sein, wird davon die
    Wirksamkeit der übrigen Bestimmungen nicht berührt.
</div>
<br/><br/>
 
<div style=""font-size:11px;"">
    <br/>
<i>Quelle: <a href=""http://www.kluge-recht.de"">kluge-recht.de</a></i>
</div>","<br/>
<br/><br/>
<b>General Terms</b>
<br/><br/>
 
<div align=""justify"">(1) This privacy policy has been compiled to better serve those who are concerned with how their
'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security,
is information that can be used on its own or with other information to identify, contact, or locate a single person, or
to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect,
use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
    <br/><br/>
    (2) We do not collect information from visitors of our site or other details to help you with your experience.
</div>
<br/><br/>
<b>Using your Information</b>
<br/><br/>
 
<div align=""justify""> We may use the information we collect from you when you register, make a purchase, sign up
for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features
in the following ways:
    <br/><br/>
    To personalize user's experience and to allow us to deliver the type of content and product offerings in which you
    are most interested.
</div>
<br/><br/>
 
<b>Protecting visitor information</b>
<br/><br/>
 
<div align=""justify"">Our website is scanned on a regular basis for security holes and known vulnerabilities in
order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks
and is only accessible by a limited number of persons who have special access rights to such systems, and are required to
 keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket
  Layer (SSL) technology.
</div>
<br/><br/>
<b>Cookies</b>
<br/><br/>
 
<div align=""justify"">We do not use cookies for tracking purposes. You can choose to have your computer warn you each time a
cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer)
settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.
If you disable cookies off, some features will be disabled that make your site experience more efficient and some of our services will
not function properly.
</div>
 
<br/><br/>
<b>Google</b>
<br/><br/>
 
<div align=""justify"">Google's advertising requirements can be summed up by Google's Advertising Principles. They are put
in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en
We use Google AdSense Advertising on our website. Google, as a third-party vendor, uses cookies to serve ads on our site.
Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on
the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
</div>
<br/><br/>
<b>Implementation</b>
<br/><br/>
 
<div align=""justify"">We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics
cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data
regarding user interactions with ad impressions and other ad service functions as they relate to our website.
 Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt
  out by visiting the Network Advertising initiative opt out page or permanently using the Google Analytics Opt Out Browser add on.
</div>
<br/><br/>
 
 
<div style=""font-size:11px;"">
    <br/>
</div>"
static full page,1,1,1,page_3,/de/datenschutz,/en/privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,Datenschutzerklärung,Data Privacy,<h2>Datenschutzerklärung</h2>,<h2>Data Privacy Policy</h2>,"<p>Die Nutzung unserer Seite ist ohne eine Angabe von personenbezogenen Daten möglich. Für die Nutzung einzelner
    Services unserer Seite können sich hierfür abweichende Regelungen ergeben, die in diesem Falle nachstehend gesondert
    erläutert werden. Ihre personenbezogenen Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.ä.) werden von uns
    nur gemäß den Bestimmungen des deutschen Datenschutzrechts verarbeitet. Daten sind dann personenbezogen, wenn sie
    eindeutig einer bestimmten natürlichen Person zugeordnet werden können. Die rechtlichen Grundlagen des Datenschutzes
    finden Sie im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG). Nachstehende Regelungen informieren Sie
    insoweit über die Art, den Umfang und Zweck der Erhebung, die Nutzung und die Verarbeitung von personenbezogenen
    Daten durch den Anbieter</p>
 
<p>Wir weisen darauf hin, dass die internetbasierte Datenübertragung Sicherheitslücken aufweist, ein lückenloser Schutz
    vor Zugriffen durch Dritte somit unmöglich ist.</p>
 
<h3>Auskunft/Widerruf/Löschung</h3>
 
<p>Sie können sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
    personenbezogenen Daten und deren Berichtigung, Sperrung, Löschung oder einem Widerruf einer erteilten Einwilligung
    unentgeltlich an uns wenden. Wir weisen darauf hin, dass Ihnen ein Recht auf Berichtigung falscher Daten oder
    Löschung personenbezogener Daten zusteht, sollte diesem Anspruch keine gesetzliche Aufbewahrungspflicht
    entgegenstehen.</p>
 
<p>
    <a target=""_blank"" href=""https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html"">Muster-Datenschutzerklärung</a>
    der Anwaltskanzlei Weiß & Partner</p>","<p>Our website may be used without entering personal information. Different rules may apply to certain services on our site,
 however, and are explained separately below. We collect personal information from you (e.g. name, address, email address,
 telephone number, etc.) in accordance with the provisions of German data protection statutes. Information is considered
 personal if it can be associated exclusively to a specific natural person. The legal framework for data protection may be found
 in the German Federal Data Protection Act (BDSG) and the Telemedia Act (TMG). The provisions below serve to provide information
 as to the manner, extent and purpose for collecting, using and processing personal information by the provider.</p>
 
<p>Please be aware that data transfer via the internet is subject to security risks and, therefore, complete protection
against third-party access to transferred data cannot be ensured.</p>
 
<h3>Information/Cancellation/Deletion</h3>
 
<p>On the basis of the Federal Data Protection Act, you may contact us at no cost if you have questions relating to the
collection, processing or use of your personal information, if you wish to request the correction, blocking or deletion of the
same, or if you wish to cancel explicitly granted consent. Please note that you have the right to have incorrect data corrected or
to have personal data deleted, where such claim is not barred by any legal obligation to retain this data.</p>
 
<p>
    <a target=""_blank"" href=""https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html"">Sample Data Privacy Policy Statement</a>
    provided by the Law Offices of Weiß & Partner</p>"
static full page,1,0,1,page_4,/de/loremde,/en/lorem,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,Lorem ipsum,"{% raw %}{{{% endraw %} chart('testChart', 'testChart') {% raw %}}}{% endraw %} <br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.","{% raw %}{{{% endraw %} chart('testChart', 'testChart') {% raw %}}}{% endraw %} <br>  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
static full page,1,1,0,page_5,/de/dolorde,/en/dolor,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Dolor sit amet,Lorem ipsum,Lorem ipsum,"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
static full page,1,1,1,page_6,/de/demo-landing-page,/en/demo-landing-page,Demo Landing Page,Demo Landing Page,Demo Landing Page,Demo Landing Page,"demo,cms page, landing page","demo,cms page, landing page",This is a demo landing page with different content widgets.,This is a demo landing page with different content widgets.,"<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">DAS IST EINE GROßARTIGE LANDING PAGE</span></b></p>","<p style=""text-align: center; ""><b><span style=""font-size: 24px;"">THIS IS A GREAT LANDING PAGE</span></b></p>","<p><span style=""font-size: 12px;""></span><span style=""font-size: 12px;""></span><span style=""font-size: 14px;""></span><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non erat felis. Suspendisse nulla quam, dictum vitae malesuada a, ullamcorper eu urna. Sed diam tellus, feugiat iaculis consequat eu, commodo in dui. Integer ac ipsum urna. Aliquam rhoncus varius felis at dignissim. Nulla id justo id nunc lacinia efficitur. Etiam nec vehicula lorem. Phasellus ut lacus eu lorem luctus luctus. Quisque id vestibulum lectus, vel aliquam erat. Praesent ut erat quis magna varius tempor et sed sapien. Cras ac turpis id ligula gravida dignissim in sed nisl. Suspendisse scelerisque eros vel risus sagittis, in ultricies odio commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span><b><span style=""font-size: 18px;""><br></span></b></p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""="""">Duis nunc dolor, vestibulum eu cursus ut, facilisis eget justo. Ut quis placerat mauris. In cursus enim purus, a mollis felis cursus non. Mauris rutrum a ante a rutrum. Aliquam gravida tortor et cursus pharetra. Ut id sagittis arcu, eu convallis felis. Integer fermentum convallis lorem, eu posuere ex ultricies scelerisque. Suspendisse et consectetur mauris, vel rhoncus elit. Sed ultrices eget lacus quis rutrum. Aliquam erat volutpat. Aliquam varius mauris purus, non imperdiet turpis tempor vel. Donec vitae scelerisque mi.</p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""=""""><br></p><b>Dies ist eine Liste von Produkten auf einer CMS Seite:</b><p></p><p>
 
{% raw %}{{{% endraw %} product(['093', '066', '035', '083', '021','055']) {% raw %}}}{% endraw %}
 
</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>Dies ist eine Liste von Produkt-Gruppen auf einer CMS Seite:</b><br></p>
 
{% raw %}{{{% endraw %} product_group(['095', '009', '052', '005', '188', '090', '084', '195']) {% raw %}}}{% endraw %}
 
<p></p><p><br></p><p><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Curabitur ipsum nulla, mollis vel tellus a, tristique tempor sapien. Mauris ut urna molestie, cursus nunc eget, lacinia erat. Donec efficitur, nisl a porta dapibus, nisi ipsum efficitur ipsum, eu auctor turpis ipsum vel sapien. Maecenas molestie risus odio. Suspendisse lobortis dapibus nisi non accumsan. Ut mattis tincidunt odio eu convallis. Nulla leo neque, scelerisque eu sagittis vitae, consectetur vel lacus. Aliquam erat volutpat. Nam euismod aliquet urna eget congue.</span></p><p><br></p><p><b>Dies ist ein Produkt-Set auf einer CMS Seite:</b></p>
{% raw %}{{{% endraw %} product_set(['2_sony_set']) {% raw %}}}{% endraw %}","<p><span style=""font-size: 12px;""></span><span style=""font-size: 12px;""></span><span style=""font-size: 14px;""></span><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non erat felis. Suspendisse nulla quam, dictum vitae malesuada a, ullamcorper eu urna. Sed diam tellus, feugiat iaculis consequat eu, commodo in dui. Integer ac ipsum urna. Aliquam rhoncus varius felis at dignissim. Nulla id justo id nunc lacinia efficitur. Etiam nec vehicula lorem. Phasellus ut lacus eu lorem luctus luctus. Quisque id vestibulum lectus, vel aliquam erat. Praesent ut erat quis magna varius tempor et sed sapien. Cras ac turpis id ligula gravida dignissim in sed nisl. Suspendisse scelerisque eros vel risus sagittis, in ultricies odio commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span><b><span style=""font-size: 18px;""><br></span></b></p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""="""">Duis nunc dolor, vestibulum eu cursus ut, facilisis eget justo. Ut quis placerat mauris. In cursus enim purus, a mollis felis cursus non. Mauris rutrum a ante a rutrum. Aliquam gravida tortor et cursus pharetra. Ut id sagittis arcu, eu convallis felis. Integer fermentum convallis lorem, eu posuere ex ultricies scelerisque. Suspendisse et consectetur mauris, vel rhoncus elit. Sed ultrices eget lacus quis rutrum. Aliquam erat volutpat. Aliquam varius mauris purus, non imperdiet turpis tempor vel. Donec vitae scelerisque mi.</p><p style=""margin-bottom: 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;""=""""><br></p><b>This is a list </b><b>of products in a CMS page:</b><p></p><p>
 
{% raw %}{{{% endraw %} product(['093', '066', '035', '083', '021','055']) {% raw %}}}{% endraw %}
 
</p><p></p><p><br></p><p>Sed volutpat felis non elit elementum fermentum. Sed sit amet nunc lacinia ligula malesuada pretium. Duis imperdiet sem id nibh tristique, non convallis nunc luctus. Fusce congue vestibulum purus in rhoncus. Suspendisse eu nisl non diam ornare convallis. Nullam cursus, magna vitae porttitor consectetur, leo justo volutpat augue, vitae gravida eros metus ac diam. Donec iaculis diam at massa posuere posuere. Ut molestie, mauris nec tempus aliquam, massa mauris pellentesque ligula, eu mattis quam diam nec magna. Nunc ante odio, pulvinar ac nisl quis, efficitur eleifend enim. Nam consectetur placerat ligula, nec aliquet eros feugiat quis.</p><p>Sed eget imperdiet dolor. Nullam fringilla facilisis odio eu mattis. Morbi nibh erat, ornare et malesuada vel, commodo vel ligula. Donec maximus odio dolor, in aliquam mi tempus eu. Vivamus imperdiet imperdiet hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis dapibus libero, id sagittis dolor. Sed efficitur malesuada turpis sit amet efficitur. Etiam mattis ex elit, sit amet cursus sapien maximus id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p><br></p><p><b>This is a list of product groups in a CMS page:</b><br></p>
 
{% raw %}{{{% endraw %} product_group(['095', '009', '052', '005', '188', '090', '084', '195']) {% raw %}}}{% endraw %}
 
<p></p><p><br></p><p><span style=""color: rgb(0, 0, 0); font-family: "" open="""" sans"",="""" arial,="""" sans-serif;="""" font-size:="""" 14px;="""" text-align:="""" justify;""="""">Curabitur ipsum nulla, mollis vel tellus a, tristique tempor sapien. Mauris ut urna molestie, cursus nunc eget, lacinia erat. Donec efficitur, nisl a porta dapibus, nisi ipsum efficitur ipsum, eu auctor turpis ipsum vel sapien. Maecenas molestie risus odio. Suspendisse lobortis dapibus nisi non accumsan. Ut mattis tincidunt odio eu convallis. Nulla leo neque, scelerisque eu sagittis vitae, consectetur vel lacus. Aliquam erat volutpat. Nam euismod aliquet urna eget congue.</span></p><p><br></p><p><b>This a product set in a CMS page:</b></p>
{% raw %}{{{% endraw %} product_set(['2_sony_set']) {% raw %}}}{% endraw %}"
```
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `template_name` | mandatory | string | `static full` | Template name. |
| `is_searchable` | mandatory | bool | 1 | Flag that defines if entity is searchable. |
| `is_active` | mandatory | bool | 0 | Flag that defines if entity is active. |
| `publish` | mandatory | bool | 1 | Flag that defines if entity is published. |
| `page_key` | mandatory | string | `page_5` | Unique page identifier. |
| `url.*(de_DE,en_US)` | mandatory | string | `/de/lorem` | Page URL. |
| `name.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Page name. |
| `meta_title.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Meta title. |
| `meta_keywords.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Meta keywords. |
| `meta_description.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Meta description. |
| `placeholder.title.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Title сontent. |
| `placeholder.content.*(de_DE,en_US)` | mandatory | string | `Lorem ipsum` | Page content. |

**vendor/spryker/cms-page-data-import/data/import/cms_page_store.csv**

```yaml
page_key,store_name
page_1,DE
page_1,AT
page_1,US
page_2,DE
page_2,AT
page_2,US
page_3,DE
page_3,AT
page_3,US
page_4,DE
page_4,AT
page_4,US
page_5,DE
page_5,AT
page_5,US
page_6,DE
page_6,AT
page_6,US
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `page_key` | mandatory | string | `page_5` | Unique page identifier. |
| `store_name` | mandatory | string | `DE` | Unique store identifier. |

**vendor/spryker/cms-slot-data-import/data/import/cms_slot_template.csv**

```yaml
template_path,name,description
@ShopUI/templates/page-layout-main/page-layout-main.twig,"Main Layout","Defines the main layout of the Store of areas that are repeatable sections across the Store."
@HomePage/views/home/home.twig,"Home Page","Defines the main layout of the Home Page everything below Header and above Footer."
@CatalogPage/views/catalog/catalog.twig,Category,"Defines the main layout of the Categories Page, everything below Header and above Footer. Same template is used for all the Categories."
@ProductDetailPage/views/pdp/pdp.twig,"Product","Defines the main layout of the Product Page, everything below Header and above Footer. Same template is used for all the Products."
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `template_path` | mandatory | string | `@HomePage/views/home/home.twig` | Unique path to the corresponding Twig file. |
| `name` | mandatory | string | Home Page | Template name used in the Back Office. |
| `description` | no | string | text | Template description used in the Back Office. |

**vendor/spryker/cms-slot-data-import/data/import/cms_slot.csv**

```yaml
template_path,slot_key,content_provider,name,description,is_active
@ShopUI/templates/page-layout-main/page-layout-main.twig,slt-1,SprykerCmsSlotBlock,"Header Top","A content area in the Header section, that is below the logo and search section and above main navigation. ",1
@ShopUI/templates/page-layout-main/page-layout-main.twig,slt-2,SprykerCmsSlotBlock,"Header Bottom","A content area in the Header section, that is at the bottom of the Header, below the main navigation.",1
@ShopUI/templates/page-layout-main/page-layout-main.twig,slt-3,SprykerCmsSlotBlock,Footer,"A content area in the Footer section, that is above the all the fixed content in the Footer.",1
@HomePage/views/home/home.twig,slt-4,SprykerCmsSlotBlock,"Home Page Main","Homepage is fully a content page so it has one slot to have as many blocks as needed.",1
@CatalogPage/views/catalog/catalog.twig,slt-5,SprykerCmsSlotBlock,Top,"A content area in the Header section.",1
@CatalogPage/views/catalog/catalog.twig,slt-6,SprykerCmsSlotBlock,Middle,"A content area in the Body section.",1
@CatalogPage/views/catalog/catalog.twig,slt-7,SprykerCmsSlotBlock,Bottom,"A content area in the Footer section.",1
@ProductDetailPage/views/pdp/pdp.twig,slt-8,SprykerCmsSlotBlock,Bottom,"A content area in the Footer section.",1
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `template_path` | mandatory | string | `@HomePage/views/home/home.twig` | Path to the Twig template to which slot is assigned. |
| `slot_key` | mandatory | string | `slt-4` |Unique slot identifier. |
| `content_provider` | mandatory | string | `SprykerCmsSlotBlock` | Unique content provider identifier. |
| `name` | mandatory | string | `Home Page Main` | Slot name used in the Back Office. |
| `description` | no | string | `text` | Slot description used in the Back Office. |
| `is_active` | mandatory | bool | 1 | Flag that defines if slot is active. |

**vendor/spryker/cms-slot-block-data-import/data/import/cms_slot_block.csv**

```yaml
template_path,slot_key,block_key,position,conditions.productCategory.all,conditions.productCategory.skus,conditions.productCategory.category_key,conditions.category.all,conditions.category.category_key,conditions.cms_page.all,conditions.cms_page.page_key
"@HomePage/views/home/home.twig",slt-1,blck-2,1,,,,,,1,
"@HomePage/views/home/home.twig",slt-1,blck-1,2,,,,,,0,"page_1,page_2"
"@CatalogPage/views/catalog/catalog.twig",slt-2,blck-4,1,,,,0,"smartphones,smartwatches,tablets,notebooks",,
"@CatalogPage/views/catalog/catalog.twig",slt-3,blck-5,1,,,,0,"smartphones,smartwatches,tablets,notebooks",,
"@CatalogPage/views/catalog/catalog.twig",slt-4,blck-6,1,,,,0,"smartphones,smartwatches,tablets,notebooks",,
"@ProductDetailPage/views/pdp/pdp.twig",slt-5,blck-3,1,0,"035,066,078,086,093,139",,,,,
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `template_path` | mandatory | string | `@HomePage/views/home/home.twig` | Path to the Twig template to which this CMS block to slot assignment belongs. |
| `slot_key` | mandatory | string | `slt-4` | Unique slot identifier. |
| `block_key` | mandatory | string | `blck-2` | Unique CMS block identifier. |
| `position` | mandatory | integer | 1 | CMS Block position in the slot. |
| `conditions` | no | mixed |  | Slot-CMS block conditions data. |

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

3. Run the following console commands to import data:

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

* `spy_cms_page`
* `spy_cms_page_localized_attributes`
 * `spy_cms_page_store`
* `spy_cms_block`
* `spy_cms_block_store`
* `spy_cms_slot`
* `spy_cms_slot_block`

{% endinfo_block %}

### 7) Set up Behavior
#### Set up Additional Functionality

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CmsPageParameterMapExpanderPlugin` | Expands collector data with the parameter map of CMS content page. | None | `Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageDataExpander` |
| `CmsBlockStorageStorageParameterMapExpanderPlugin` | Expands storage data with the parameter map of CMS content widget. | None | `Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsBlockStorage` |
| `CmsPageTableExpanderPlugin` | **Preview** button in the **List of CMS pages**. | None | `Spryker\Zed\CmsGui\Communication\Plugin` |
| `CreateGlossaryExpanderPlugin` | Adds a **Preview** button to the *create a glossary* page. | None | `Spryker\Zed\CmsGui\Communication\Plugin` |

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

{% info_block warningBox "Verification" %}

Make sure that:

* the expanded data for CMS Page and CMS Block content is present in storage;
* you have a **Preview** button:
    * in the Back Office > **Content Management** > **Pages** > **List of CMS pages**;
    * in the Back Office > **Content Management** > **Pages**/**Blocks** > *create/edit placeholder* pages.

{% endinfo_block %}

## Install Feature Frontend
### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/cms:"^202001.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`CmsBlockWidget`</td><td>`vendor/spryker-shop/cms-block-widget`</td></tr><tr><td>`CmsPage`</td><td>`vendor/spryker-shop/cms-page`</td></tr><tr><td>`CmsSearchPage`</td><td>`vendor/spryker-shop/cms-search-page`</td></tr><tr><td>`CmsSlotBlockWidget`</td><td>`vendor/spryker-shop/cms-slot-block-widget`</td></tr><tr><td>`ShopCmsSlot`</td><td>`vendor/spryker-shop/shop-cms-slot`</td></tr><tr><td>`ShopCmsSlotExtension`</td><td>`vendor/spryker-shop/shop-cms-slot-extension`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
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

2. Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable Controllers
Register route provider(s) in the Yves application:

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

| Provider Plugin | Namespace | Enabled Controller | Controller specification | Prerequisites |
| --- | --- | --- | --- | --- |
| `CmsSearchPageRouteProviderPlugin` | `SprykerShop\Yves\CmsSearchPage\Plugin\Router` | `CmsSearchController` | Allows searching for CMS pages by content and CMS page name. |  |
| `CmsPageRouteProviderPlugin` | `SprykerShop\Yves\CmsPage\Plugin\Router` | `PreviewController` | Allows previewing unpublished CMS pages in the Back Office. | <ol><li>Config file contains `$config[CmsGuiConstants::CMS_PAGE_PREVIEW_URI] = '/en/cms/preview/%d'; .`</li><li>The `spryker/customer-user-connector` package is installed.</li><li>The `spryker/customer-user-connector-gui` package is installed.</li><li>The `\Spryker\Zed\CustomerUserConnectorGui\Communication\Plugin\UserTableActionExpanderPlugin` plugin is enabled in `\Pyz\Zed\User\UserDependencyProvider::getUserTableActionExpanderPlugins()`.</li><li>You assigned a customer to your Back Office user.</li></ol> |

{% info_block warningBox "Verification" %}

1. Open the *search* page in `http://mysprykershop.com/search/cms?q=`.
2. Log in as the customer assigned to your Back Office user in Yves and open the *preview* page in `http://mysprykershop.com/en/cms/preview/{unpublished CMS page ID}`.

{% endinfo_block %}

### 4) Set up Widgets
Enable Twig plugins:

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `CmsBlockTwigPlugin` | Provides the list of plugins for CMS block widget. See the [table](#plugin-table). | `SprykerShop\Yves\CmsBlockWidget\Plugin` |
| `CmsTwigPlugin` | Provides the spyCms function. | `SprykerShop\Yves\CmsPage\Plugin\Twig` |
| `CmsContentWidgetTwigPlugin` | Provides the list of plugins for enabling content widgets. You can use them inside CMS blocks and page content. However, we recommend using the [Content Items Widgets feature](https://documentation.spryker.com/docs/en/content-item-widgets-201907) instead. | `Spryker\Yves\CmsContentWidget\Plugin\Twig` |
| `ShopCmsSlotTwigPlugin` | Provides the `cms_slot` Twig tag. | `SprykerShop\Yves\ShopCmsSlot\Plugin\Twig` |

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

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `CmsBlockWidgetTwigPlugin` | Provides the `spyCmsBlock` twig function for rendering block. |`SprykerShop\Yves\CmsBlockWidget\Plugin\Twig` |
| `CmsBlockPlaceholderTwigPlugin` | Provides the `spyCmsBlockPlaceholder` Twig function for placeholder. | `Spryker\Yves\CmsBlock\Plugin\Twig` |

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

### 5) Set up Behavior
Set up Search and Storage clients:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PaginatedCmsPageQueryExpanderPlugin` | Allows fetching paginated search results of CMS pages. | None | `Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander` |
| `SortedCmsPageQueryExpanderPlugin` | Allows sorting CMS pages in search results. Search suggestion options are provided by the sort config builder of CMS pages. | None | `Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\QueryExpander` |
| `PaginatedCmsPageResultFormatterPlugin` | Adds pagination information to search results. | None | `Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter` |
| `RawCmsPageSearchResultFormatterPlugin` | Raw search result formatter. | None | `Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter` |
| `SortedCmsPageSearchResultFormatterPlugin` | Allows sorting results.  | None | `Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\ResultFormatter` |
| `UrlStorageCmsPageMapperPlugin` | Allows getting a page resource from Redis. | None | `Spryker\Client\CmsStorage\Plugin` |

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

Verify the changes by searching for a CMS page. On the *Search* page you should be able to see CMS pages in the search results, sort the CMS pages and use pagination.

{% endinfo_block %}

| Router | Specification | Namespace |
| --- | --- | --- |
| `PageResourceCreatorPlugin` | When a CMS page is opened in Storefront, fetches its data from Storage and inserts it into the controller. | `SprykerShop\Yves\CmsPage\Plugin\StorageRouter` |

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

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `FullTextSearchCmsPageTabPlugin` | Shows the **Page** tab in the search page. | `SprykerShop\Yves\CmsSearchPage\Plugin` |

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

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `CmsSlotBlockWidgetCmsSlotContentPlugin` | Provides content for slot widgets. | `SprykerShop\Yves\CmsSlotBlockWidget\Plugin\ShopCmsSlot` |

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

Verify the changes by adding a slot widget to a page. See [Templates & Slots Feature Overview](https://documentation.spryker.com/docs/en/templates-slots-feature-overview ) for references.

{% endinfo_block %}

### Set up SprykerCmsBlocks Content Provider Behavior

:::(Info)
Follow the further steps only if you are going to use the [visibility conidtions](https://documentation.spryker.com/docs/en/templates-slots-feature-overview#visibility-conditions) functionality with `SprykerCmsBlocks` content provider for slots.
:::

#### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/cms-slot-block-product-category-connector:"^1.0.0" sspryker/cms-slot-block-product-category-gui:"^1.0.0" spryker/cms-slot-block-category-connector:"^1.0.0" sspryker/cms-slot-block-category-gui:"^1.0.0" spryker/cms-slot-block-cms-connector:"^1.0.0" spryker/cms-slot-block-cms-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`CmsSlotBlock`</td><td>`vendor/spryker/cms-slot-block`</td></tr><tr><td>`CmsSlotBlockProductCategoryConnector`</td><td>`vendor/spryker/cms-slot-block-product-category-connector`</td></tr><tr><td>`CmsSlotBlockProductCategoryGui`</td><td>`vendor/spryker/cms-slot-block-product-category-gui`</td></tr><tr><td>`CmsSlotBlockCategoryConnector`</td><td>`vendor/spryker/cms-slot-block-category-connector`</td></tr><tr><td>`CmsSlotBlockCategoryGui`</td><td>`vendor/spryker/cms-slot-block-category-gui`</td></tr><tr><td>`CmsSlotBlockCmsConnector`</td><td>`vendor/spryker/cms-slot-block-cms-connector`</td></tr><tr><td>`CmsSlotBlockCmsGui`</td><td>`vendor/spryker/cms-slot-block-cms-gui`</td></tr></tbody></table>
{% endinfo_block %}

#### 2) Set up Configuration
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

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `ProductCategorySlotBlockConditionFormPlugin` | Extends `CmsSlotBlockForm` with a product category condition form. | `Spryker\Zed\CmsSlotBlockProductCategoryGui\Communication\Plugin` |
| `CategorySlotBlockConditionFormPlugin` | Extends `CmsSlotBlockForm` with a category condition form. | `Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin` |
| `CmsSlotBlockConditionFormPlugin` | Extends `CmsSlotBlockForm` by with a CMS condition form. | `Spryker\Zed\CmsSlotBlockCmsGui\Communication\Plugin` |

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


1. Go to the Back Office > **Content Management** > **Slots** section.
1. In the **List of Templates**, choose the template for which you've created the visibility condition.
1. Choose a slot in the **List of Slots for {name} Template**.
1. Select or [assign](https://documentation.spryker.com/docs/en/managing-slots#assigning-cms-blocks-to-slots) a CMS block to a slot in the **List of Blocks for {name} Slot**.
1. Make sure that for each CMS block, there is an additional form allowing you to define the visibility condition you have created.


{% endinfo_block %}

2. Add a visibility resolver plugin to the `CmsSlotBlock` client:

| Plugin | Specification | Namespace |
| --- | --- | --- |
| `ProductCategoryCmsSlotBlockConditionResolverPlugin` | Provides visibility resolver for products and product categories. | `Spryker\Client\CmsSlotBlockProductCategoryConnector\Plugin\CmsSlotBlock` |
| `CategoryCmsSlotBlockConditionResolverPlugin` | Provides a visibility resolver for categories. | `Spryker\Client\CmsSlotBlockCategoryConnector\Plugin\CmsSlotBlock` |
| `CmsPageCmsSlotBlockConditionResolverPlugin` | Provides a visibility resolver for CMS pages. | `Spryker\Client\CmsSlotBlockCmsConnector\Plugin\CmsSlotBlock` |

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

* Make sure that you fulfill the visibility conditions and see the CMS block content.
* Make sure that you do not fulfill the visibility conditions and do not see the CMS block content.


{% endinfo_block %}

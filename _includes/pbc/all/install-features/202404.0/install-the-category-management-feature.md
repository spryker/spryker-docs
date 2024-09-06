

This document describes how to install the [Category Management](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Category Management feature core.

### Prerequisites

Install the required feature:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                   |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/category-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE               | EXPECTED DIRECTORY                    |
|----------------------|---------------------------------------|
| Category             | vendor/spryker/category               |
| CategoryDataFeed     | vendor/spryker/category-data-feed     |
| CategoryDataImport   | vendor/spryker/category-data-import   |
| CategoryExporter     | vendor/spryker/category-exporter      |
| CategoryGui          | vendor/spryker/category-gui           |
| CategoryPageSearch   | vendor/spryker/category-page-search   |
| CategoryStorage      | vendor/spryker/category-storage       |
| CategoryGuiExtension | vendor/spryker/category-gui-extension |
| CategoryImage        | vendor/spryker/category-image         |
| CategoryImageGui     | vendor/spryker/category-image-gui     |
| CategoryImageStorage | vendor/spryker/category-image-storage |
| CategoryExtension    | vendor/spryker/category-extension     |

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration:

**src/Pyz/Zed/CategoryImageStorage/CategoryImageStorageConfig.php**

```php
<?php

namespace Pyz\Zed\CategoryImageStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\CategoryImageStorage\CategoryImageStorageConfig as SprykerCategoryImageStorageConfig;

class CategoryImageStorageConfig extends SprykerCategoryImageStorageConfig
{
    /**
     * @return string|null
     */
    public function getCategoryImageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Zed/CategoryPageSearch/CategoryPageSearchConfig.php**

```php
<?php

namespace Pyz\Zed\CategoryPageSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\CategoryPageSearch\CategoryPageSearchConfig as SprykerCategoryPageSearchConfig;

class CategoryPageSearchConfig extends SprykerCategoryPageSearchConfig
{
    /**
     * @return string
     */
    public function getCategoryPageSynchronizationPoolName(): string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Zed/CategoryStorage/CategoryStorageConfig.php**

```php
<?php

namespace Pyz\Zed\CategoryStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\CategoryStorage\CategoryStorageConfig as SprykerCategoryStorageConfig;

class CategoryStorageConfig extends SprykerCategoryStorageConfig
{
    /**
     * @return string|null
     */
    public function getCategoryTreeSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getCategoryNodeSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getCategoryNodeEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }

    /**
     * @return string|null
     */
    public function getCategoryTreeEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\CategoryPageSearch\CategoryPageSearchConstants;
use Spryker\Shared\CategoryStorage\CategoryStorageConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            CategoryStorageConstants::CATEGORY_SYNC_STORAGE_QUEUE,
            CategoryPageSearchConstants::CATEGORY_SYNC_SEARCH_QUEUE,
        ];
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\CategoryPageSearch\CategoryPageSearchConstants;
use Spryker\Shared\CategoryStorage\CategoryStorageConstants;
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
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            CategoryStorageConstants::CATEGORY_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            CategoryPageSearchConstants::CATEGORY_SYNC_SEARCH_QUEUE => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

### 3) Set up database schema and transfer objects

1. Adjust the schema definition so that entity changes trigger the events:

**src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Category\Persistence" package="src.Orm.Zed.Category.Persistence">

    <table name="spy_category">
        <behavior name="event">
            <parameter name="spy_category_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_category_attribute">
        <behavior name="event">
            <parameter name="spy_category_attribute_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_category_node">
        <behavior name="event">
            <parameter name="spy_category_node_all" column="*"/>
            <parameter name="spy_category_node_fk_parent_category_node" column="fk_parent_category_node" keep-original="true"/>
        </behavior>
    </table>

    <table name="spy_category_template">
        <behavior name="event">
            <parameter name="spy_category_template_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_category_store">
        <behavior name="event">
            <parameter name="spy_category_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/CategoryImage/Persistence/Propel/Schema/spy_category_image.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CategoryImage\Persistence" package="src.Orm.Zed.CategoryImage.Persistence">

    <table name="spy_category_image_set">
        <behavior name="event">
            <parameter name="spy_category_image_set_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_category_image">
        <behavior name="event">
            <parameter name="spy_category_image_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_category_image_set_to_category_image">
        <behavior name="event">
            <parameter name="spy_category_image_set_to_category_image_all" column="*"/>
        </behavior>
    </table>
</database>
```

2. Set up synchronization queue pools, so entities without store relations are synchronized among stores:

**src/Pyz/Zed/CategoryImageStorage/Persistence/Propel/Schema/spy_category_image_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\CategoryImageStorage\Persistence"
          package="src.Orm.Zed.CategoryImageStorage.Persistence">

    <table name="spy_category_image_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool" />
        </behavior>
    </table>
</database>
```

3. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

* Make sure the following changes have been applied in the database:

| DATABASE ENTITY                          | TYPE  | EVENT   |
|------------------------------------------|-------|---------|
| spy_category                             | table | created |
| spy_category_attribute                   | table | created |
| spy_category_closure_table               | table | created |
| spy_category_node                        | table | created |
| spy_category_store                       | table | created |
| spy_category_template                    | table | created |
| spy_category_node_storage                | table | created |
| spy_category_node_page_search            | table | created |
| spy_category_tree_storage                | table | created |
| spy_category_image_set                   | table | created |
| spy_category_image                       | table | created |
| spy_category_image_set_to_category_image | table | created |
| spy_category_image_storage               | table | created |

* Make sure propel entities have been generated successfully by checking their existence.

{% endinfo_block %}

4. Change the generated entity classes to extend from the core classes.

| CLASS PATH                                                                             | EXTENDS                                                                                      |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| src/Orm/Zed/Category/Persistence/Base/SpyCategory.php                                  | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategory                                  |
| src/Orm/Zed/Category/Persistence/Base/SpyCategoryAttribute.php                         | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategoryAttribute                         |
| src/Orm/Zed/Category/Persistence/Base/SpyCategoryClosureTable.php                      | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategoryClosureTable                      |
| src/Orm/Zed/Category/Persistence/Base/SpyCategoryNode.php                              | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategoryNode                              |
| src/Orm/Zed/Category/Persistence/Base/SpyCategoryStore.php                             | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategoryStore                             |
| src/Orm/Zed/Category/Persistence/Base/SpyCategoryTemplate.php                          | Spryker\Zed\Category\Persistence\Propel\AbstractSpyCategoryTemplate                          |
| src/Orm/Zed/CategoryPageSearch/Persistence/Base/SpyCategoryNodePageSearch.php          | Spryker\Zed\CategoryPageSearch\Persistence\Propel\AbstractSpyCategoryNodePageSearch          |
| src/Orm/Zed/CategoryStorage/Persistence/Base/SpyCategoryNodeStorage.php                | Spryker\Zed\CategoryStorage\Persistence\Propel\AbstractSpyCategoryNodeStorage                |
| src/Orm/Zed/CategoryStorage/Persistence/Base/SpyCategoryTreeStorage.php                | Spryker\Zed\CategoryStorage\Persistence\Propel\AbstractSpyCategoryTreeStorage                |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImage.php                        | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImage                        |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImageQuery.php                   | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImageQuery                   |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImageSet.php                     | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImageSet                     |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImageSetQuery.php                | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImageSetQuery                |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImageSetToCategoryImage.php      | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImageSetToCategoryImage      |
| src/Orm/Zed/CategoryImage/Persistence/Base/SpyCategoryImageSetToCategoryImageQuery.php | Spryker\Zed\CategoryImage\Persistence\Propel\AbstractSpyCategoryImageSetToCategoryImageQuery |
| src/Orm/Zed/CategoryImageStorage/Persistence/Base/SpyCategoryImageStorage.php          | Spryker\Zed\CategoryImageStorage\Persistence\Propel\AbstractSpyCategoryImageStorage          |
| src/Orm/Zed/CategoryImageStorage/Persistence/Base/SpyCategoryImageStorageQuery.php     | Spryker\Zed\CategoryImageStorage\Persistence\Propel\AbstractSpyCategoryImageStorageQuery     |

{% info_block warningBox "Verification" %}

Make sure that the following changes have been implemented in transfer objects:

| TRANSFER                                  | TYPE  | EVENT   | PATH                                                                         |
|-------------------------------------------|-------|---------|------------------------------------------------------------------------------|
| CategoryCollectionTransfer                | class | created | src/Generated/Shared/Transfer/CategoryCollectionTransfer.php                 |
| CategoryCriteriaTransfer                  | class | created | src/Generated/Shared/Transfer/CategoryCriteriaTransfer.php                   |
| CategoryDataFeedTransfer                  | class | created | src/Generated/Shared/Transfer/CategoryDataFeedTransfer.php                   |
| CategoryImageSetCollectionStorageTransfer | class | created | src/Generated/Shared/Transfer/CategoryImageSetCollectionStorageTransfer.php  |
| CategoryImageSetStorageTransfer           | class | created | src/Generated/Shared/Transfer/CategoryImageSetStorageTransfer.php            |
| CategoryImageSetTransfer                  | class | created | src/Generated/Shared/Transfer/CategoryImageSetTransfer.php                   |
| CategoryImageStorageTransfer              | class | created | src/Generated/Shared/Transfer/CategoryImageStorageTransfer.php               |
| CategoryImageTransfer                     | class | created | src/Generated/Shared/Transfer/CategoryImageTransfer.php                      |
| CategoryLocalizedAttributesTransfer       | class | created | src/Generated/Shared/Transfer/CategoryLocalizedAttributesTransfer.php        |
| CategoryMapTransfer                       | class | created | src/Generated/Shared/Transfer/CategoryMapTransfer.php                        |
| CategoryNodeAggregationTransfer           | class | created | src/Generated/Shared/Transfer/CategoryNodeAggregationTransfer.php            |
| CategoryNodeCriteriaTransfer              | class | created | src/Generated/Shared/Transfer/CategoryNodeCriteriaTransfer.php               |
| CategoryNodeFilterTransfer                | class | created | src/Generated/Shared/Transfer/CategoryNodeFilterTransfer.php                 |
| CategoryNodePageSearchTransfer            | class | created | src/Generated/Shared/Transfer/CategoryNodePageSearchTransfer.php             |
| CategoryNodeSearchResultTransfer          | class | created | src/Generated/Shared/Transfer/CategoryNodeSearchResultTransfer.php           |
| CategoryNodeStorageTransfer               | class | created | src/Generated/Shared/Transfer/CategoryNodeStorageTransfer.php                |
| CategoryNodeUrlCriteriaTransfer           | class | created | src/Generated/Shared/Transfer/CategoryNodeUrlCriteriaTransfer.php            |
| CategoryNodeUrlPathCriteriaTransfer       | class | created | src/Generated/Shared/Transfer/CategoryNodeUrlPathCriteriaTransfer.php        |
| CategoryResponseTransfer                  | class | created | src/Generated/Shared/Transfer/CategoryResponseTransfer.php                   |
| CategoryTemplateTransfer                  | class | created | src/Generated/Shared/Transfer/CategoryTemplateTransfer.php                   |
| CategoryTransfer                          | class | created | src/Generated/Shared/Transfer/CategoryTransfer.php                           |
| CategoryTreeStorageTransfer               | class | created | src/Generated/Shared/Transfer/CategoryTreeStorageTransfer.php                |
| NodeCollectionTransfer                    | class | created | src/Generated/Shared/Transfer/NodeCollectionTransfer.php                     |
| NodeTransfer                              | class | created | src/Generated/Shared/Transfer/NodeTransfer.php                               |
| UpdateCategoryStoreRelationRequest        | class | created | src/Generated/Shared/Transfer/UpdateCategoryStoreRelationRequestTransfer.php |
| CategoryNodeCollectionRequest             | class | created | src/Generated/Shared/Transfer/CategoryNodeCollectionRequestTransfer.php      |
| CategoryNodeCollectionResponse            | class | created | src/Generated/Shared/Transfer/CategoryNodeCollectionResponseTransfer.php     |
| ErrorCollection                           | class | created | src/Generated/Shared/Transfer/ErrorCollectionTransfer.php                    |
| Error                                     | class | created | src/Generated/Shared/Transfer/ErrorTransfer.php                              |

{% endinfo_block %}

### 4) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**
```csv
category.validation.category_node_entity_not_found,The category node ID '%category_node_id%' cannot be relocated because this category node no longer exists.,en_US
category.validation.category_node_entity_not_found,"Die Kategorieknoten-ID '%category_node_id%' kann nicht verschoben werden, da dieser Kategorieknoten nicht mehr existiert.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

3. Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that the Back Office navigation related to categories has been translated.

{% endinfo_block %}

### 5) Set up search

Add the page map plugin for the *category node* entity.

| PLUGIN                         | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------|---------------------------------------------------|---------------|------------------------------------------------------------|
| CategoryNodeDataPageMapBuilder | Builds the page map for the category node entity. |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Search |


**src/Pyz/Zed/Search/SearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Search;

use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Search\CategoryNodeDataPageMapBuilder;
use Spryker\Zed\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\Search\Dependency\Plugin\PageMapInterface[]
     */
    protected function getSearchPageMapPlugins()
    {
        return [
            new CategoryNodeDataPageMapBuilder(),
        ];
    }
}
```

### 6) Configure export to Redis and Elasticsearch

Configure tables to be published to `spy_category_image_storage`, `spy_category_node_storage`, `spy_category_tree_storage`, and `spy_category_node_page_search` and synchronized to the Storage on create, edit, and delete changes:

1. Set up publisher plugins:

| PLUGIN                                         | SPECIFICATION                                                                                                                                                            | PREREQUISITES | NAMESPACE                                                                       |
|------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| CategoryDeletePublisherPlugin                  | Unpublishes category node data by the `SpyCategory` entity events.                                                                                                       |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category             |
| CategoryWritePublisherPlugin                   | Publishes category node data by the `SpyCategory` entity events.                                                                                                         |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category             |
| CategoryAttributeDeletePublisherPlugin         | Unpublishes category node data by the`SpyCategoryAttribute` entity events.                                                                                               |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute    |
| CategoryAttributeWritePublisherPlugin          | Publishes category node data by the `SpyCategoryAttribute` entity events.                                                                                                |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute    |
| CategoryNodeDeletePublisherPlugin              | Unpublishes category node data by the `SpyCategoryNode` entity events and `CategoryNode` events.                                                                         |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode         |
| CategoryNodeWritePublisherPlugin               | Publishes category node data by the `SpyCategoryNode` entity events and `CategoryNode` events.                                                                           |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode         |
| CategoryStoreWriteForPublishingPublisherPlugin | Publishes category node data by the `CategoryStore` publish and unpublish events.                                                                                        |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore        |
| CategoryStoreWritePublisherPlugin              | Publishes category node data by the `SpyCategoryStore` entity events.                                                                                                    |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore        |
| CategoryTemplateDeletePublisherPlugin          | Unpublishes category node data by the `SpyCategoryTemplate` entity events.                                                                                               |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate     |
| CategoryTemplateWritePublisherPlugin           | Publishes category node data by the `SpyCategoryTemplate` entity events.                                                                                                 |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate     |
| CategoryTreeDeletePublisherPlugin              | Unpublishes category tree data by the `CategoryTree` unpublish event.                                                                                                    |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree         |
| CategoryTreeWriteForPublishingPublisherPlugin  | Publishes category tree data by the `CategoryStore` and `CategoryTree` publish events. Publishes category tree data after the create, update, and delete publish events. |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree         |
| ParentWritePublisherPlugin                     | Publishes parent category node data by the `CategoryNode` events.                                                                                                        |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher                      |
| CategoryDeletePublisherPlugin                  | Unpublishes category node page search data by the`SpyCategory` entity events.                                                                                            |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category          |
| CategoryWritePublisherPlugin                   | Publishes category node page search data by the `SpyCategory` entity events.                                                                                             |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category          |
| CategoryAttributeDeletePublisherPlugin         | Unpublishes category node page search data by the`SpyCategoryAttribute` entity events.                                                                                   |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute |
| CategoryAttributeWritePublisherPlugin          | Publishes category node page search data by the`SpyCategoryAttribute` entity events.                                                                                     |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute |
| CategoryNodeDeletePublisherPlugin              | Unpublishes category node page search data by the`CategoryNode` events and the`SpyCategoryNode` entity events.                                                           |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode      |
| CategoryNodeWritePublisherPlugin               | Publishes category node page search data by the `CategoryNode` events and the `SpyCategoryNode` entity events.                                                           |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode      |
| CategoryStoreWriteForPublishingPublisherPlugin | Publishes category node page search data by the`CategoryStore` publish and unpublish events.                                                                             |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore     |
| CategoryStoreWritePublisherPlugin              | Publishes category node page search data by the`SpyCategoryStore` entity events.                                                                                         |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore     |
| CategoryTemplateDeletePublisherPlugin          | Unpublishes category node page search data by the`SpyCategoryTemplate` entity events.                                                                                    |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate  |
| CategoryTemplateWritePublisherPlugin           | Publishes category node page search data by the`SpyCategoryTemplate` entity events.                                                                                      |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate  |

<details>
<summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category\CategoryDeletePublisherPlugin as CategoryPageSearchCategoryDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin as CategoryPageSearchCategoryWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeDeletePublisherPlugin as CategoryPageSearchCategoryAttributeDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeWritePublisherPlugin as CategoryPageSearchCategoryAttributeWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode\CategoryNodeDeletePublisherPlugin as CategoryPageSearchCategoryNodeDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryNode\CategoryNodeWritePublisherPlugin as CategoryPageSearchCategoryNodeWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryPagePublisherTriggerPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWriteForPublishingPublisherPlugin as CategoryStoreSearchWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWritePublisherPlugin as CategoryStoreSearchWritePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateDeletePublisherPlugin as CategoryPageSearchCategoryTemplateDeletePublisherPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateWritePublisherPlugin as CategoryPageSearchCategoryTemplateWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category\CategoryDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin as CategoryStoreCategoryWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryAttribute\CategoryAttributeWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode\CategoryNodeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNode\CategoryNodeWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWriteForPublishingPublisherPlugin as CategoryStoreStorageWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryStore\CategoryStoreWritePublisherPlugin as CategoryStoreStorageWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTemplate\CategoryTemplateWritePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree\CategoryTreeDeletePublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTree\CategoryTreeWriteForPublishingPublisherPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\ParentWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getCategoryStoragePlugins(),
            $this->getCategoryPageSearchPlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getCategoryStoragePlugins(): array
    {
        return [
            new CategoryStoreStorageWritePublisherPlugin(),
            new CategoryStoreStorageWriteForPublishingPublisherPlugin(),
            new CategoryTreeWriteForPublishingPublisherPlugin(),
            new CategoryDeletePublisherPlugin(),
            new CategoryStoreCategoryWritePublisherPlugin(),
            new CategoryAttributeDeletePublisherPlugin(),
            new CategoryAttributeWritePublisherPlugin(),
            new CategoryNodeDeletePublisherPlugin(),
            new CategoryNodeWritePublisherPlugin(),
            new CategoryTemplateDeletePublisherPlugin(),
            new CategoryTemplateWritePublisherPlugin(),
            new CategoryTreeDeletePublisherPlugin(),
            new ParentWritePublisherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getCategoryPageSearchPlugins(): array
    {
        return [
            new CategoryStoreSearchWritePublisherPlugin(),
            new CategoryStoreSearchWriteForPublishingPublisherPlugin(),
            new CategoryPageSearchCategoryDeletePublisherPlugin(),
            new CategoryPageSearchCategoryWritePublisherPlugin(),
            new CategoryPageSearchCategoryAttributeDeletePublisherPlugin(),
            new CategoryPageSearchCategoryAttributeWritePublisherPlugin(),
            new CategoryPageSearchCategoryNodeDeletePublisherPlugin(),
            new CategoryPageSearchCategoryNodeWritePublisherPlugin(),
            new CategoryPageSearchCategoryTemplateDeletePublisherPlugin(),
            new CategoryPageSearchCategoryTemplateWritePublisherPlugin(),
        ];
    }
}
```
</details>

2. Set up event listeners:

| PLUGIN                              | SPECIFICATION                                                                                                                | PREREQUISITES | NAMESPACE                                                              |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| CategoryImageStorageEventSubscriber | Registers listeners that are responsible for publishing category image information to storage when a related entity changes. |               | Spryker\Zed\CategoryImageStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\CategoryImageStorage\Communication\Plugin\Event\Subscriber\CategoryImageStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new CategoryImageStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

3. Set up trigger plugins:

| PLUGIN                             | SPECIFICATION                                                    | PREREQUISITES | NAMESPACE                                                     |
|------------------------------------|------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| CategoryNodePublisherTriggerPlugin | Retrieves category nodes based on the provided limit and offset. |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher    |
| CategoryTreePublisherTriggerPlugin | Retrieves category trees based on the provided limit and offset. |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher    |
| CategoryPagePublisherTriggerPlugin | Retrieves category nodes based on the provided limit and offset. |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Publisher\CategoryPagePublisherTriggerPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryNodePublisherTriggerPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Publisher\CategoryTreePublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getPublisherTriggerPlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new CategoryNodePublisherTriggerPlugin(),
            new CategoryTreePublisherTriggerPlugin(),
            new CategoryPagePublisherTriggerPlugin(),
        ];
    }
}
```

4. Set up synchronization plugins:

| PLUGIN                                              | SPECIFICATION                                                                                                         | PREREQUISITES | NAMESPACE                                                             |
|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| CategoryNodeSynchronizationDataBulkRepositoryPlugin | Retrieves a category node storage collection based on the provided offset, limit, and IDs.                            |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization      |
| CategoryTreeSynchronizationDataBulkRepositoryPlugin | Retrieves a category tree storage collection based on the provided offset, limit, and `categoryTreeStorageId` values. |               | Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization      |
| CategoryPageSynchronizationDataBulkRepositoryPlugin | Retrieves a collection of synchronization data based on the provided offset, limit, and IDs.                          |               | Spryker\Zed\CategoryPageSearch\Communication\Plugin\Synchronization   |
| CategoryImageSynchronizationDataBulkPlugin          | Synchronizes all category image entries from the database to Redis.                                                   |               | Spryker\Zed\CategoryImageStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CategoryImageStorage\Communication\Plugin\Synchronization\CategoryImageSynchronizationDataBulkPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Synchronization\CategoryPageSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryNodeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryTreeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CategoryPageSynchronizationDataBulkRepositoryPlugin(),
            new CategoryTreeSynchronizationDataBulkRepositoryPlugin(),
            new CategoryNodeSynchronizationDataBulkRepositoryPlugin(),
            new CategoryImageSynchronizationDataBulkPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `category-node` and `category-tree` trigger plugins work correctly:

1.  Fill the `spy_category` table with some data.
2.  Run the `console publish:trigger-events -r category_node` command.
3.  Run the `console publish:trigger-events -r category_tree` command.
4.  Make sure that the `spy_category_node_storage` and `spy_category_tree_storage` tables have been filled with respective data.
5.  Make sure that, in your system, storage entries are displayed with `kv:category_node:{store}:{locale}:{id}` and `kv:category_tree:{store}:{locale}:{id}` masks.

Make sure that *category-node* and *category-tree* synchronization plugins works correctly:

1.  Fill the `spy_category_node_storage` and `spy_category_tree_storage` tables with some data.
2.  Run the `console sync:data -r category_node` command.
3.  Run the `console sync:data -r category_tree` command.
4.  Check that, in your system, the storage entries are displayed with the `kv:category_node:{store}:{locale}:{id}` and `kv:category_tree:{store}:{locale}:{id}` masks.

Make sure that, when a category is created or edited through ORM, it is exported to Redis and Elasticsearch accordingly.

| STORAGE TYPE  | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
|---------------|---------------|----------------------------------|
| Elasticsearch | CategoryNode  | category_node:at:en_us:2         |
| Redis         | CategoryNode  | category_node:de:de_de:5         |
| Redis         | CategoryTree  | category_tree:de:en_us           |
| Redis         | CategoryImage | category_image:de_de:15          |

**EXAMPLE EXPECTED DATA FRAGMENT: category_node:at:en_us:2**

```yaml
{
   "_index": "spryker_at_page",
   "_type": "_doc",
   "_id": "category_node:at:en_us:2",
   "_version": 2,
   "_score": null,
   "_source": {
      "is-active": true"
      "store": "AT",
      "locale": "en_US",
      "type": "category",
      "search-result-data":{
         "id_category": 2,
         "type": "category",
         "name": "Cameras & Camcorders",
         "url": "/en/cameras-&-camcorders"
      },
      "full-text-boosted": [
         "Cameras & Camcorders"
      ],
      "full-text": [
         "Cameras & Camcorders",
         "Cameras & Camcorders",
         "Cameras & Camcorders"
      ],
      "suggestion-terms": [
         "Cameras & Camcorders"
      ],
      "completion-terms": [
         "Cameras & Camcorders"
      ]
   },
   "sort": [
      "category"
   ]
}
```

<details><summary>EXAMPLE EXPECTED DATA FRAGMENT: category_node:de:de_de:5</summary>

```yaml
{
    "id_category": 5,
    "node_id": 5,
    "name": "Computer",
    "url": "/de/computer",
    "is_active": true,
    "template_path": "@CatalogPage/views/simple-cms-block/simple-cms-block.twig",
    "order": 100,
    "meta_title": "Computer",
    "meta_description": "Computer",
    "meta_keywords": "Computer",
    "parents": [
        {
            "id_category": 1,
            "node_id": 1,
            "name": "Demoshop",
            "url": "/de",
            "is_active": true,
            "template_path": "@CatalogPage/views/catalog/catalog.twig",
            "meta_title": "Demoshop",
            "meta_description": "Deutsche Version des Demoshop",
            "meta_keywords": "Deutsche Version des Demoshop"
        }
    ],
    "children": [
        {
            "id_category": 6,
            "node_id": 6,
            "name": "Notebooks",
            "url": "/de/computer/notebooks",
            "is_active": true,
            "template_path": "@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig",
            "order": 100,
            "meta_title": "Notebooks",
            "meta_description": "Notebooks",
            "meta_keywords": "Notebooks"
        },
        {
            "id_category": 7,
            "node_id": 7,
            "name": "Pc's/Workstations",
            "url": "/de/computer/pc's/workstations",
            "is_active": true,
            "template_path": "@CatalogPage/views/catalog/catalog.twig",
            "order": 90,
            "meta_title": "Pc's/Workstations",
            "meta_description": "Pc's/Workstations",
            "meta_keywords": "Pc's/Workstations"
        },
        {
            "id_category": 8,
            "node_id": 8,
            "name": "Tablets",
            "url": "/de/computer/tablets",
            "is_active": true,
            "template_path": "@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig",
            "order": 80,
            "meta_title": "Tablets",
            "meta_description": "Tablets",
            "meta_keywords": "Tablets"
        }
    ],
    "_timestamp": 1621934332.368688
}
```
</details>

<details>
  <summary>EXAMPLE EXPECTED DATA FRAGMENT: category_tree:de:en_us**</summary>

```yaml
{
    "category_nodes_storage": [
        {
            "id_category": 5,
            "node_id": 5,
            "name": "Computer",
            "url": "/en/computer",
            "is_active": true,
            "template_path": "@CatalogPage/views/simple-cms-block/simple-cms-block.twig",
            "order": 100,
            "meta_title": "Computer",
            "meta_description": "Computer",
            "meta_keywords": "Computer",
            "children": [
                {
                    "id_category": 6,
                    "node_id": 6,
                    "name": "Notebooks",
                    "url": "/en/computer/notebooks",
                    "is_active": true,
                    "template_path": "@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig",
                    "order": 100,
                    "meta_title": "Notebooks",
                    "meta_description": "Notebooks",
                    "meta_keywords": "Notebooks"
                },
            ]
        },
        {
            "id_category": 2,
            "node_id": 2,
            "name": "Cameras & Camcorders",
            "url": "/en/cameras-&-camcorders",
            "is_active": true,
            "template_path": "@CatalogPage/views/catalog/catalog.twig",
            "order": 90,
            "meta_title": "Cameras & Camcorders",
            "meta_description": "Cameras & Camcorders",
            "meta_keywords": "Cameras & Camcorders",
            "children": []
        }
    ],
    "_timestamp": 1621934347.540677
}
```

</details>

<details>
  <summary>EXAMPLE EXPECTED DATA FRAGMENT: category_image:de_de:15</summary>

```yaml
{
    "id_category": 15,
    "image_sets": [
        {
            "name": "default",
            "images": [
                {
                    "id_category_image": 2,
                    "external_url_large": "https://images.icecat.biz/img/norm/high/1113777-8051.jpg",
                    "external_url_small": "https://images.icecat.biz/img/gallery_mediums/img_1113777_medium_1480988786_4473_5647.jpg"
                }
            ]
        }
    ],
    "_timestamp": 1622025094.247298
}
```

</details>

{% endinfo_block %}

### 7) Import data

1.  Prepare your data according to your requirements using our demo data:

**data/import/common/common/category.csv**

```csv
category_key,parent_category_key,name.de_DE,name.en_US,meta_title.de_DE,meta_title.en_US,meta_description.de_DE,meta_description.en_US,meta_keywords.de_DE,meta_keywords.en_US,is_active,is_in_menu,is_searchable,is_root,is_main,node_order,template_name
cameras-and-camcorder,demoshop,Kameras & Camcorders,Cameras & Camcorders,Kameras & Camcorders,Cameras & Camcorders,Kameras & Camcorders,Cameras & Camcorders,Kameras & Camcorders,Cameras & Camcorders,1,1,1,0,1,90,Catalog (default)
```

| COLUMN                 | REQUIRED | DATA TYPE | DATA EXAMPLE          | DESCRIPTION                                                                                                                  |
|------------------------|----------|-----------|-----------------------|------------------------------------------------------------------------------------------------------------------------------|
| category_key           | &check;  | string    | cameras-and-camcorder | Sluggable name of the category.                                                                                              |
| parent_category_key    |          | string    | demoshop              | Sluggable name of the parent category.                                                                                       |
| name.de_DE             | &check;  | string    | Kameras & Camcorders  | Human-readable name of the category (de).                                                                                    |
| name.en_US             | &check;  | string    | Cameras & Camcorders  | Human-readable name of the category (en).                                                                                    |
| meta_title.de_DE       | &check;  | string    | Kameras & Camcorders  | Human-readable title for category (de).                                                                                      |
| meta_title.en_US       | &check;  | string    | Cameras & Camcorders  | A Human-readable title for category (en).                                                                                    |
| meta_description.de_DE | &check;  | string    | Kameras & Camcorders  | A Human-readable description for category (de).                                                                              |
| meta_description.en_US | &check;  | string    | Cameras & Camcorders  | A Human-readable description for category (en).                                                                              |
| meta_keywords.de_DE    | &check;  | string    | Kameras & Camcorders  | A Human-readable keywords for category (de).                                                                                 |
| meta_keywords.en_US    | &check;  | string    | Cameras & Camcorders  | A Human-readable keywords for category (en).                                                                                 |
| is_active              |          | bool      | 1                     | Defines if the category is active.                                                                                           |
| is_in_menu             |          | bool      | 1                     | Defines if the category is displayed in the menu on the Storefront.                                                          |
| is_searchable          |          | bool      | 1                     | Defines if the category is displayed in the search. If the value is `0`, the category cannot be found in the catalog search. |
| is_root                |          | bool      | 0                     | Defines if the category. is a root category: `0` – non-root category, `1` – root category.                                   |
| is_main                |          | bool      | 1                     | Defines if the category is main.                                                                                             |
| node_order             |          | int       | 90                    | When displayed with other categories, defines their order based on the comparison of this parameter's values.                |
| template_name          |          | string    | Catalog (default)     | Human-readable name of the category template.                                                                                |

**data/import/common/DE/category_store.csv**

```csv
category_key,included_store_names,excluded_store_names
demoshop,DE,
```

| COLUMN               | REQUIRED | DATA TYPE | DATA EXAMPLE | DESCRIPTION                                          |
|----------------------|----------|-----------|--------------|------------------------------------------------------|
| category_key         | &check;  | string    | demoshop     | Sluggable name of the category.                      |
| included_store_names |          | string    | DE           | List of the store names to link to the category.     |
| excluded_store_names |          | string    | "US,AT"      | List of the store names to unlink from the category. |

**data/import/category_template.csv**

```csv
template_name,template_path
"Sub Categories grid","@CatalogPage/views/sub-categories-grid/sub-categories-grid.twig"
```

| COLUMN        | REQUIRED | DATA TYPE | DATA EXAMPLE                               | DESCRIPTION                                                     |
|---------------|----------|-----------|--------------------------------------------|-----------------------------------------------------------------|
| template_name | &check;  | string    | My category template                       | A human-readable name of the category template.                 |
| template_path | &check;  | string    | @ModuleName/path/to/category/template.twig | Category template path that is used to display a category page. |

2. Register the following data import plugins:

| PLUGIN                        | SPECIFICATION                    | PREREQUISITES | NAMESPACE                                                      |
|-------------------------------|----------------------------------|---------------|----------------------------------------------------------------|
| CategoryDataImportPlugin      | Imports the category data.       |               | Spryker\Zed\CategoryDataImport\Communication\Plugin            |
| CategoryStoreDataImportPlugin | Imports the category store data. |               | Spryker\Zed\CategoryDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\CategoryDataImport\Communication\Plugin\CategoryDataImportPlugin;
use Spryker\Zed\CategoryDataImport\Communication\Plugin\DataImport\CategoryStoreDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new CategoryDataImportPlugin(),
            new CategoryStoreDataImportPlugin(),
        ];
    }
}
```

3. Register the following plugins:

| PLUGIN                                             | SPECIFICATION                                                                                                                                                         | PREREQUISITES | NAMESPACE                                          |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------|
| MainChildrenPropagationCategoryStoreAssignerPlugin | Updates the category store relation for a passed category. Updates the category store relation for the children category nodes where `category_node.is_main` is true. |               | Spryker\Zed\Category\Communication\Plugin\Category |

**src/Pyz/Zed/Category/CategoryDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Category\Communication\Plugin\Category\MainChildrenPropagationCategoryStoreAssignerPlugin;

class CategoryDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryStoreAssignerPluginInterface
     */
    protected function getCategoryStoreAssignerPlugin(): CategoryStoreAssignerPluginInterface
    {
        return new MainChildrenPropagationCategoryStoreAssignerPlugin();
    }
}
```

4. Add the following import recipe to `data/import/local/full_EU.yml`:

```yaml
   actions:
#2. Catalog Setup data import
    - data_entity: category-template
      source: data/import/common/common/category_template.csv
    - data_entity: category
      source: data/import/common/common/category.csv
    - data_entity: category-store
      source: data/import/common/DE/category_store.csv
```

5. Import data:

```bash
console data:import category
console data:import category-store
console data:import category-template
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_category_*` database tables.

{% endinfo_block %}

### 8) Set up behavior

Add the following plugins:

| PLUGIN                                | SPECIFICATION                                                                                                                       | PREREQUISITES | NAMESPACE                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| CategoryUrlPathPrefixUpdaterPlugin    | Adds a language identifier to category URL paths.                                                                                   |               | Spryker\Zed\Category\Communication\Plugin                     |
| CategoryImageSetCreatorPlugin         | After a category is created, persists new category image sets into the database.                                                    |               | Spryker\Zed\CategoryImage\Communication\Plugin                |
| CategoryImageSetExpanderPlugin        | Expands `CategoryTransfer` with the category's image sets from the database.                                                        |               | Spryker\Zed\CategoryImage\Communication\Plugin                |
| CategoryImageSetUpdaterPlugin         | After a category is updated, persists category image set changes into the database.                                                 |               | Spryker\Zed\CategoryImage\Communication\Plugin                |
| RemoveCategoryImageSetRelationPlugin  | When a category is deleted, deletes the category image sets.                                                                        |               | Spryker\Zed\CategoryImage\Communication\Plugin                |
| ImageSetSubformCategoryFormPlugin     | Extends the create and edit category forms with the fields related to category image sets.                                          |               | Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui |
| ImageSetCategoryFormTabExpanderPlugin | Extends create and edit category tabs with a category image set.                                                                      |               | Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui |
| UrlStorageCategoryNodeMapperPlugin    | If `UrlStorageTransfer.fkResourceCategorynode` is provided, maps the category node storage data to `UrlStorageResourceMapTransfer`. |               | Spryker\Client\CategoryStorage\Plugin                         |

<details open ><summary>src/Pyz/Zed/Category/CategoryDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Category\Communication\Plugin\Category\MainChildrenPropagationCategoryStoreAssignerPlugin;
use Spryker\Zed\Category\Communication\Plugin\CategoryUrlPathPrefixUpdaterPlugin;
use Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryStoreAssignerPluginInterface;
use Spryker\Zed\CategoryImage\Communication\Plugin\CategoryImageSetCreatorPlugin;
use Spryker\Zed\CategoryImage\Communication\Plugin\CategoryImageSetExpanderPlugin;
use Spryker\Zed\CategoryImage\Communication\Plugin\CategoryImageSetUpdaterPlugin;
use Spryker\Zed\CategoryImage\Communication\Plugin\RemoveCategoryImageSetRelationPlugin;

class CategoryDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryRelationDeletePluginInterface[]
     */
    protected function getRelationDeletePluginStack(): array
    {
        $deletePlugins = array_merge(
            [
                new RemoveCategoryImageSetRelationPlugin(),
            ],
            parent::getRelationDeletePluginStack()
        );

        return $deletePlugins;
    }

    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryTransferExpanderPluginInterface[]
     */
    protected function getCategoryPostReadPlugins(): array
    {
        return [
            new CategoryImageSetExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryUrlPathPluginInterface[]
     */
    protected function getCategoryUrlPathPlugins(): array
    {
        return [
            new CategoryUrlPathPrefixUpdaterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryUpdateAfterPluginInterface[]
     */
    protected function getCategoryPostUpdatePlugins(): array
    {
        return [
            new CategoryImageSetUpdaterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryCreateAfterPluginInterface[]
     */
    protected function getCategoryPostCreatePlugins(): array
    {
        return [
            new CategoryImageSetCreatorPlugin(),
        ];
    }
}
```
</details>

**src/Pyz/Zed/CategoryGui/CategoryGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CategoryGui;

use Spryker\Zed\CategoryGui\CategoryGuiDependencyProvider as SpykerCategoryGuiDependencyProvider;
use Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui\ImageSetCategoryFormTabExpanderPlugin;
use Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui\ImageSetSubformCategoryFormPlugin;

/**
 * @method \Spryker\Zed\CategoryGui\CategoryGuiConfig getConfig()
 */
class CategoryGuiDependencyProvider extends SpykerCategoryGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryFormTabExpanderPluginInterface[]
     */
    protected function getCategoryFormTabExpanderPlugins(): array
    {
        return [
            new ImageSetCategoryFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryFormPluginInterface[]
     */
    protected function getCategoryFormPlugins(): array
    {
        return [
            new ImageSetSubformCategoryFormPlugin(),
        ];
    }
}
```

**src/Pyz/Client/UrlStorage/UrlStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\UrlStorage;

use Spryker\Client\CategoryStorage\Plugin\UrlStorageCategoryNodeMapperPlugin;
use Spryker\Client\UrlStorage\UrlStorageDependencyProvider as SprykerUrlDependencyProvider;

class UrlStorageDependencyProvider extends SprykerUrlDependencyProvider
{
    /**
     * @return \Spryker\Client\UrlStorage\Dependency\Plugin\UrlStorageResourceMapperPluginInterface[]
     */
    protected function getUrlStorageResourceMapperPlugins()
    {
        return [
            new UrlStorageCategoryNodeMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

* To verify you've integrated category image handling successfully, check that you can manage category images when creating and editing categories in the Back Office.

* To verify you've integrated category store assignments successfully, check that you can manage store relations when creating and editing categories in the Back Office.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Category Management feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                   |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/category-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                                |
|----------------------------|---------------------------------------------------|
| CategoryWidget             | vendor/spryker-shop/category-widget               |
| CategoryImageStorageWidget | vendor/spryker-shop/category-image-storage-widget |

{% endinfo_block %}

### 2) Set up widgets

Register the following global widgets:

| WIDGET                     | DESCRIPTION                                                                                        | NAMESPACE                                          |
|----------------------------|----------------------------------------------------------------------------------------------------|----------------------------------------------------|
| CategoryImageStorageWidget | Finds the given category image set in Storage and displays its first image in a given size format. | SprykerShop\Yves\CategoryImageStorageWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**
```php
<?php   

namespace Pyz\Yves\ShopApplication;   

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\CategoryImageStorageWidget\Widget\CategoryImageStorageWidget;   

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{     
	/**      
	* @return string[]      
	*/     
	protected function getGlobalWidgets(): array     
	{         
		return [             
			CategoryImageStorageWidget::class,         
		];     
	}
}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                     | TEST                                                                                                                              |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| CategoryImageStorageWidget | Make sure you have category image data in your storage. Then, render the widget for all the categories that have images assigned. |

{% endinfo_block %}

### 3) Set up behavior

Add the following plugins to your project:

| PLUGIN             | SPECIFICATION                                                       | PREREQUISITES | NAMESPACE                                   |
|--------------------|---------------------------------------------------------------------|---------------|---------------------------------------------|
| CategoryTwigPlugin | Defines the `categories` variable for a global usage in twig files. |               | SprykerShop\Yves\CategoryWidget\Plugin\Twig |

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\CategoryWidget\Plugin\Twig\CategoryTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new CategoryTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the `categories` variable is available in twig files.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE                       | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                                     |
|-------------------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GLUE: Category Management     |                                  | [Install the Category Management Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-category-management-glue-api.html)                 |
| Catalog + Category Management |                                  | [Install the Catalog + Category Management feature](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-category-management-feature.html) |
| CMS + Category Management     |                                  | [Install the CMS + Category Management feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-category-management-feature.html)              |

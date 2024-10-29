


This document describes how to install the [Product Labels feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html).

## Install feature core

Follow the steps below to install the Alternative Products feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION           | INSTALLATION GUIDE                                                                                                                                                  |
|--------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                               |
| Product      | {{site.version}}  | [Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/product-labels:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductLabel | vendor/spryker/product-label |
| ProductLabelDataImport | vendor/spryker/product-label-data-import |
| ProductLabelGui | vendor/spryker/product-label-gui |
| ProductLabelSearch | vendor/spryker/product-label-search |
| ProductLabelStorage | vendor/spryker/product-label-storage |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. For entity changes to trigger events, adjust the schema definition:

**src/Pyz/Zed/ProductLabel/Persistence/Propel/Schema/spy_product_label.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\ProductLabel\Persistence"
    package="src.Orm.Zed.ProductLabel.Persistence"
>
    <table name="spy_product_label">
        <behavior name="event">
            <parameter name="spy_product_label_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_product_label_store">
        <behavior name="event">
            <parameter name="spy_product_label_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/ProductLabel/Persistence/Propel/Schema/spy_product_label_localized_attributes.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
        namespace="Orm\Zed\ProductLabel\Persistence"
        package="src.Orm.Zed.ProductLabel.Persistence"
>
    <table name="spy_product_label_localized_attributes">
        <behavior name="event">
            <parameter name="spy_product_label_localized_attributes_all" column="*"/>
        </behavior>
    </table>
</database>
```

**src/Pyz/Zed/ProductLabel/Persistence/Propel/Schema/spy_product_label_product_abstract.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
        namespace="Orm\Zed\ProductLabel\Persistence"
        package="src.Orm.Zed.ProductLabel.Persistence"
>
    <table name="spy_product_label_product_abstract">
        <behavior name="event">
            <parameter name="spy_product_label_product_abstract_all" column="*"/>
        </behavior>
    </table>
</database>
```


| AFFECTED ENTITY | TRIGGERED EVENTS |
| --- | --- |
| spy_product_label | <ul><li>Entity.spy_product_label.create</li><li>Entity.spy_product_label.update</li><li>Entity.spy_product_label.delete</li></ul> |
| spy_product_label_store | <ul><li>Entity.spy_product_label_store.create</li><li>Entity.spy_product_label_store.update</li><li>Entity.spy_product_label_store.delete</li></ul>|
| spy_product_label_localized_attributes | <ul><li>Entity.spy_product_label_localized_attributes.create</li><li>Entity.spy_product_label_localized_attributes.update</li><li>Entity.spy_product_label_localized_attributes.delete</li></ul> |
| spy_product_label_product_abstract | <ul><li>Entity.spy_product_label_product_abstract.create</li><li>Entity.spy_product_label_product_abstract.update</li><li>Entity.spy_product_label_product_abstract.delete</li></ul> |

2. To synchronize the entities without store relations among stores, set up synchronization queue pools:

**src/Pyz/Zed/ProductLabelStorage/Persistence/Propel/Schema/spy_product_label_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductLabelStorage\Persistence"
          package="src.Orm.Zed.ProductLabelStorage.Persistence">

    <table name="spy_product_abstract_label_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
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

Ensure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_label | table | created |
| spy_product_label_store | table | created |
| spy_product_label_localized_attributes | table | created |
| spy_product_label_product_abstract | table | created |
| spy_product_label_dictionary_storage | table | created |
| spy_product_abstract_label_storage | table | created |

Ensure that the following changes have been triggered in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductLabel | class | created | src/Generated/Shared/Transfer/ProductLabelTransfer |
| ProductLabelCriteria | class | created | src/Generated/Shared/Transfer/ProductLabelCriteriaTransfer |
| ProductLabelLocalizedAttributes | class | created | src/Generated/Shared/Transfer/ProductLabelLocalizedAttributesTransfer |
| ProductLabelProductAbstract | class | created | src/Generated/Shared/Transfer/ProductLabelProductAbstractTransfer |
| ProductLabelProductAbstractRelations | class | created | src/Generated/Shared/Transfer/ProductLabelProductAbstractRelationsTransfer |
| ProductLabelResponse | class | created | src/Generated/Shared/Transfer/ProductLabelResponseTransfer |
| ProductLabelCollection | class | created | src/Generated/Shared/Transfer/ProductLabelCollectionTransfer |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer |
| StorageProductLabel | class | created | src/Generated/Shared/Transfer/StorageProductLabelTransfer |
| Message | class | created | src/Generated/Shared/Transfer/MessageTransfer |
| FacetConfig | class | created | src/Generated/Shared/Transfer/FacetConfigTransfer |
| StoreRelation | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer |
| Store | class | created | src/Generated/Shared/Transfer/StoreTransfer |
| ProductLabelAggregateForm | class | created | src/Generated/Shared/Transfer/ProductLabelAggregateFormTransfer |
| Money | class | created | src/Generated/Shared/Transfer/MoneyTransfer |
| PageMap | class | created | src/Generated/Shared/Transfer/PageMapTransfer |
| ProductPageLoad | class | created | src/Generated/Shared/Transfer/ProductPageLoadTransfer |
| ProductPageSearch | class | created | src/Generated/Shared/Transfer/ProductPageSearchTransfer |
| ProductPayload | class | created | src/Generated/Shared/Transfer/ProductPayloadTransfer |
| ProductAbstractLabelStorage | class | created | src/Generated/Shared/Transfer/ProductAbstractLabelStorageTransfer |
| ProductLabelDictionaryStorage | class | created | src/Generated/Shared/Transfer/ProductLabelDictionaryStorageTransfer |
| ProductLabelDictionaryItem | class | created | src/Generated/Shared/Transfer/ProductLabelDictionaryItemTransfer |
| ProductView | class | created | src/Generated/Shared/Transfer/ProductViewTransfer |
| SynchronizationData | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer |
| Locale | class | created | src/Generated/Shared/Transfer/LocaleTransfer |
| TabItem | class | created | src/Generated/Shared/Transfer/TabItemTransfer |
| TabsView | class | created | src/Generated/Shared/Transfer/TabsViewTransfer |
| Filter | class | created | src/Generated/Shared/Transfer/FilterTransfer |

{% endinfo_block %}

### 3) Set up behavior

1. Set up publishers:

| PLUGIN                                              | SPECIFICATION                                                                                                                                                          | PREREQUISITES | NAMESPACE |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
| ProductLabelLocalizedAttributesWritePublisherPlugin | Updates the localized attributes of the product label in the storage when triggered by the provided product label storage events.                                      | None | Spryker\Zed\ProductLabel\Communication\Plugin\Publisher |
| ProductLabelWritePublisherPlugin                    | Updates the label data of the product page search when triggered by the provided product label events.                                                                 | None | Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabel |
| ProductLabelProductAbstractWritePublisherPlugin     | Updates the label data of the product page search when triggered by the provided product label product abstract relation events.                                       | None | Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabelProductAbstract |
| ProductLabelStoreWritePublisherPlugin               | Updates the product abstract data in the search engine when triggered by the provided publish and unpublish events of the product label and product abstract relation. | None | Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabelStore |
| ProductAbstractLabelWritePublisherPlugin            | Updates product abstract data in the storage when triggered by the provided publish and unpublish events of the product label and product abstract relation.           | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductAbstractLabel |
| ProductLabelDictionaryWritePublisherPlugin          | Updates the data of the product label dictionary in the storage when triggered by the provided product label storage events.                                           | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary |
| ProductLabelProductAbstractWritePublisherPlugin     | Updates the product abstract data in the storage when triggered by the provided events of product label and product abstract relation.                                 | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelProductAbstract |
| ProductLabelDictionaryDeletePublisherPlugin         | Removes all the data of the product label dictionary storage when triggered by the provided product label dictionary events.                                           | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary |
| ProductLabelSearchPublisherTriggerPlugin            | Allows publishing or re-publishing product label search data manually.                                                                                                 | None | Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher |

<details><summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductLabel\Communication\Plugin\Publisher\ProductLabelLocalizedAttributesWritePublisherPlugin;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabelSearchPublisherTriggerPlugin
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabel\ProductLabelWritePublisherPlugin as ProductLabelSearchWritePublisherPlugin;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabelProductAbstract\ProductLabelProductAbstractWritePublisherPlugin as ProductLabelProductAbstractSearchWritePublisherPlugin;
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\Publisher\ProductLabelStore\ProductLabelStoreWritePublisherPlugin as ProductLabelStoreSearchWritePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductAbstractLabel\ProductAbstractLabelWritePublisherPlugin as ProductAbstractLabelStorageWritePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary\ProductLabelDictionaryDeletePublisherPlugin as ProductLabelDictionaryStorageDeletePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionary\ProductLabelDictionaryWritePublisherPlugin as ProductLabelDictionaryStorageWritePublisherPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelProductAbstract\ProductLabelProductAbstractWritePublisherPlugin as ProductLabelProductAbstractStorageWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getProductLabelSearchPlugins(),
            $this->getProductLabelStoragePlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductLabelSearchPlugins(): array
    {
        return [
            new ProductLabelSearchWritePublisherPlugin(),
            new ProductLabelProductAbstractSearchWritePublisherPlugin(),
            new ProductLabelStoreSearchWritePublisherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductLabelStoragePlugins(): array
    {
        return [
            new ProductAbstractLabelStorageWritePublisherPlugin(),
            new ProductLabelProductAbstractStorageWritePublisherPlugin(),
            new ProductLabelDictionaryStorageWritePublisherPlugin(),
            new ProductLabelDictionaryStorageDeletePublisherPlugin(),
            new ProductLabelLocalizedAttributesWritePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductLabelSearchPublisherTriggerPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Ensure that following applies:
* After creating a product label, you can find the corresponding record in the `spy_product_label_dictionary_storage` table.
* After creating or updating a product label or assigning a new locale to a store, the corresponding localized attributes are stored in the `spy_product_label_localized_attributes` table.
* After assigning a product label to a product, the corresponding product record contains the assigned label in the `spy_product_abstract_label_storage` table.

{% endinfo_block %}

2. Set up, regenerate, and resync features by setting up the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAbstractLabelPublisherTriggerPlugin | Triggers publish events for the product label data. | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher |
| ProductLabelDictionaryPublisherTriggerPlugin | Triggers publish events for the product label dictionary data. | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher |
| ProductAbstractLabelSynchronizationDataRepositoryPlugin | Allows synchronizing the content of the entire `spy_product_abstract_label_storage` table into the storage. | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization |
| ProductLabelDictionarySynchronizationDataRepositoryPlugin | Allows synchronizing the content of the entire `spy_product_label_dictionary_storage` table content into the storage. | None | Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization |
| ProductNewLabelUpdaterPlugin | Returns the list of relations of product labels to abstract products to assign or deassign product labels for. The results are used to persist product label relation changes into the database. The plugin is called by the ProductLabelRelationUpdaterConsolecommand. | None | Spryker\Zed\ProductNew\Communication\Plugin |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductAbstractLabelPublisherTriggerPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Publisher\ProductLabelDictionaryPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductAbstractLabelPublisherTriggerPlugin(),
            new ProductLabelDictionaryPublisherTriggerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductLabelStorage/ProductLabelStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductLabelStorage;

use Spryker\Shared\Publisher\PublisherConfig;
use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductLabelStorage\ProductLabelStorageConfig as SprykerProductLabelStorageConfig;

class ProductLabelStorageConfig extends SprykerProductLabelStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductAbstractLabelSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getProductLabelDictionarySynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getProductAbstractLabelEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }

    /**
     * @return string|null
     */
    public function getProductLabelDictionaryEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Zed/ProductLabelSearch/ProductLabelSearchConfig.php**

```php
<?php

namespace Pyz\Zed\ProductLabelSearch;

use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductLabelSearch\ProductLabelSearchConfig as SprykerProductLabelSearchConfig;

class ProductLabelSearchConfig extends SprykerProductLabelSearchConfig
{
    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductAbstractLabelSynchronizationDataRepositoryPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductLabelDictionarySynchronizationDataRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductAbstractLabelSynchronizationDataRepositoryPlugin(),
            new ProductLabelDictionarySynchronizationDataRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the product label trigger plugin works correctly:

1. Fill the `spy_product_label` table with some data.
2. Run the `console publish:trigger-events -r product_label_dictionary` command.
3. Ensure that the `spy_product_label_dictionary_storage` table is filled with respective data.
4. Ensure that the storage entries appear in your system with the `kv:product_label_dictionary:store:locale` mask.

Ensure that the product label synchronization plugin works correctly:

1. Fill the `spy_product_label_product_abstract` table with some data.
2. Run the `console publish:trigger-events -r product_abstract_label` command.
3. Ensure that the `spy_product_abstract_label_storage` table is filled with respective data.
4. Ensure that storage entries appear in your system with the `kv:product_abstract_label:id_product_abstract` mask.

{% endinfo_block %}

**src/Pyz/Zed/ProductLabel/ProductLabelDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductLabel;

use Spryker\Zed\ProductLabel\ProductLabelDependencyProvider as SprykerProductLabelDependencyProvider;
use Spryker\Zed\ProductNew\Communication\Plugin\ProductNewLabelUpdaterPlugin;

class ProductLabelDependencyProvider extends SprykerProductLabelDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductLabel\Dependency\Plugin\ProductLabelRelationUpdaterPluginInterface[]
     */
    protected function getProductLabelRelationUpdaterPlugins()
    {
        return [
            new ProductNewLabelUpdaterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the product label new works:

1. In the Back Office, go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.
2. To create a product, click **Create a Product**.
3. In the **NEW FROM** and **NEW TO** fields, enter dates so that the current date is between the entered ones.
4. Clisk **Save**.
5. On the Storefront, check that the product is displayed with the new product label.

{% endinfo_block %}

### 4) Import data

{% info_block infoBox "Info" %}

The following imported entities are used as product labels in Spryker.

{% endinfo_block %}

1. Prepare data according to your requirements using the following demo data:

**data/import/product_label.csv**

```yaml
name,is_active,is_dynamic,is_exclusive,front_end_reference,valid_from,valid_to,name.en_US,product_abstract_skus,priority
Label 1,1,0,0,,,,Label 1,"001,002,003",1
Label 2,1,1,0,template,,,Label 2,,2
Label 3,1,1,0,highlight,,,Label 3,,3
NEW,1,1,0,template:tag,,,New,Neu,,2
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| name | Yes | string | Label 1 | Unique product label identifier. |
| is_active | Yes | integer | 1 | Defines if the product label is available. |
| is_dynamic | Yes | integer | 1 | Defines if the product label is dynamic. |
| is_exclusive | Yes | integer | 1 | Defines if the product label is exclusive. |
| front_end_reference | Yes |string | template:tag | When the label is rendered, this value is used as a part of the CSS selector on the page. |
| valid_from | Yes | string | 2020-01-01 |  Defines the date on which the product label starts to be displayed. |
| valid_to | Yes | string | 2020-02-02 |  Defines the date on which the product label stops to be displayed.  |
| name.en_US | Yes | string | name | Name of the product label for a specific locale. |
| product_abstract_skus | Yes | string | "001,002,003" | List of product SKUs to which the product label is added. |
| priority | Yes | integer | 3 |  Defines the product label position among other product labels on the product details page and the product abstract cart. |

**data/import/product_label_store.csv**

```yaml
name,store_name
Label 1,US
Label 1,DE
Label 2,US
Label 3,DE
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| name | Yes | string | Label 1 | Unique product label identifier. |
| store_name | Yes | string | US | Name of the store to assign the label to. |

2. Register the following data import plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductLabelDataImportPlugin | Imports product label data into the database. | None | Spryker\Zed\ProductLabelDataImport\Communication\Plugin |
| ProductLabelStoreDataImportPlugin | Imports product label store data into the database. | None | Spryker\Zed\ProductLabelDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductLabelDataImport\Communication\Plugin\ProductLabelDataImportPlugin;
use Spryker\Zed\ProductLabelDataImport\Communication\Plugin\ProductLabelStoreDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductLabelDataImportPlugin(),
            new ProductLabelStoreDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import product-label
console data:import product-label-store
```

{% info_block warningBox "Verification" %}

Ensure that the configured data has been added to the `spy_product_label` and  `spy_product_label_store` tables in the database.

{% endinfo_block %}


## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)|

### 1) Install the required modules

```bash
composer require "spryker-feature/product-labels:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductLabelWidget | vendor/spryker-shop/product-label-widget |
{% endinfo_block %}

### 2) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAbstractLabelWidget | Displays the product label assigned to a product. | None | SprykerShop\Yves\ProductLabelWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductLabelWidget\ProductAbstractLabelWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductAbstractLabelWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the following widget has been registered:

| MODULE | TEST |
| --- | --- |
| ProductLabelWidget | Add the following to a Twig template: `{% raw %}{%{% endraw %} widget 'ProductAbstractLabelWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |

{% endinfo_block %}

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Ensure that product labels are displayed on the product details and catalog pages.

{% endinfo_block %}

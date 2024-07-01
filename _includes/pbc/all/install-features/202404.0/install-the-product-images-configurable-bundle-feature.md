

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Configurable Bundle  | {{page.version}} |
| Product Images | {{page.version}} |

### 1) Set up database schema and transfer objects

Adjust the schema definition so that entity changes will trigger the events:

**src/Pyz/Zed/ConfigurableBundle/Persistence/Propel/Schema/spy_configurable_bundle_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ConfigurableBundleStorage\Persistence"
          package="src.Orm.Zed.ConfigurableBundleStorage.Persistence">

    <table name="spy_configurable_bundle_template_image_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool" />
        </behavior>
    </table>

</database>
```

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_configurable_bundle_template_image_storage | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| `SpyConfigurableBundleTemplateImageStorageEntity` | class | created | `src/Generated/Shared/Transfer/SpyConfigurableBundleTemplateImageStorageEntityTransfer` |

{% endinfo_block %}

### 2) Configure export to Redis and Elasticsearch

This step will publish tables on change (create, edit) to the `spy_configurable_bundle_template_image_storage` and synchronize the data to Storage.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateImagePageSearchEventSubscriber | Registers listeners that are responsible for publishing configurable bundle template image entity changes to search when a related entity change event occurs. | None | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber |
| ConfigurableBundleTemplateImagePageSearchEventSubscriber | Registers listeners that are responsible for publishing configurable bundle template image entity changes to search when a related entity change event occurs. | None | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\Subscriber\ConfigurableBundleTemplateImageStorageEventSubscriber;
use Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber\ConfigurableBundleTemplateImagePageSearchEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ConfigurableBundleTemplateImageStorageEventSubscriber());
        $eventSubscriberCollection->add(new ConfigurableBundleTemplateImagePageSearchEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateImageEventResourceBulkRepositoryPlugin | Allows populating empty storage table with data. | None | Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event |
| ConfigurableBundleTemplateImageSynchronizationDataBulkPlugin | Allows synchronizing the entire storage table content into Storage. | None | Spryker\Zed\ConfigurableBundlePageSearch\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Event\ConfigurableBundleTemplateImageEventResourceBulkRepositoryPlugin;
use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface[]
     */
    protected function getEventTriggerResourcePlugins()
    {
        return [
            new ConfigurableBundleTemplateImageEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ConfigurableBundleStorage\Communication\Plugin\Synchronization\ConfigurableBundleTemplateImageSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateImageSynchronizationDataBulkPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Make sure that when you added some data to tables `spy_product_image_set`, `spy_product_image_set_to_product_image`, `spy_product_image` with `fk_resource_configurable_bundle_template` and run `console trigger:event -r configurable_bundle_template_image` command, the changes are reflected in the `spy_configurable_bundle_template_image_storage` table.
2. Make sure that after step #4  or after `console sync:data configurable_bundle_template_image` command execution, the data s added to the `spy_configurable_bundle_template_image_storage` table and Redis.
3. Make sure that when a product image set with the `fk_resource_configurable_bundle_template` is created or edited through ORM, it is exported to Redis accordingly.
4. Ensure that Elasticsearch document has been expanded by images property.

{% endinfo_block %}

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| --- | --- | --- |
| Elasticsearch | `ConfigurableBundleTemplate` | `configurable_bundle_template:en_us:1` |
| Redis | `ConfigurableBundleTemplateImage` | `kv:configurable_bundle_template_image:1` |

**Example expected data fragment for Elasticsearch**

```xml
{
   "locale":"en_US",
   "type":"configurable_bundle_template",
   "search-result-data":{
      "idConfigurableBundleTemplate":1,
      "uuid":"8d8510d8-59fe-5289-8a65-19f0c35a0089",
      "name":"configurable_bundle.templates.configurable-bundle-all-in.nam",
      "images":[
         {
            "idmage":1084,
            "idProductImageSetToProductImage":1084,
            "sortOrder":0,
            "externalUrlSmall":"/images/configurable-bundle-templates/cbt-image-1.jpg",
            "externalUrlLarge":"/images/configurable-bundle-templates/cbt-image-1.jpg"
         }
      ]
   }
}
```

**Example expected data fragment for Redis**

```xml
{
     "id_configurable_bundle_template": 1,
      "image_sets": [
        {
          "name": "default",
          "images": [
             {
               "id_product_image": 1085,
               "external_url_large": "/images/configurable-bundle-templates/cbt-image-1.jpg",
               "external_url_small": "/images/configurable-bundle-templates/cbt-image-1.jpg"
             }
          ]
        }
      ],
}
```

### 3) Import Data

#### Import configurable bundle images data

Expand `spy_product_image_set` table:

**src/Pyz/Zed/DataImport/Persistence/Propel/Schema/spy_product_image.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductImage\Persistence" package="src.Orm.Zed.ProductImage.Persistence">

    <table name="spy_product_image_set">
        <column name="product_image_set_key" type="VARCHAR" size="32" required="false"/>

        <index>
            <index-column name="product_image_set_key"/>
        </index>
    </table>

</database>
```

Expand `ProductImageSetTransfer` transfer:

**src/Pyz/Shared/ProductImage/Transfer/product_image.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="ProductImageSet">
        <property name="productImageSetKey" type="string"/>
    </transfer>

</transfers>
```

Run the following commands to apply database changes and generate entity and transfer
changes:

```bash
console propel:install
console transfer:generate
```

Prepare your data according to your requirements using our demo data:

**data/import/configurable_bundle_template_image.csv**

```yaml
configurable_bundle_template_key,product_image_set_key
t000001,product_image_set_1
t000001,product_image_set_2
t000002,product_image_set_3
t000002,product_image_set_4
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| configurable_bundle_template_key | ✓ | string | t000001 | Internal data import identifier for the configurable bundle template. |
| product_image_set_key | ✓ | string | product_image_set_1 | Internal data import identifier for the product image set. |

{% info_block warningBox "Verification" %}

Make sure that the `product_image_set_key` column is added to the `spy_product_image_set`  table in the database.

{% endinfo_block %}

Expand your data import steps for product image sets:

**data/import/icecat_biz_data/product_image.csv**

```yaml
...,product_image_set_key
...,product_image_set_1
...,product_image_set_2
...,product_image_set_3
...,product_image_set_4
```

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateImageDataImportPlugin | Links configurable bundle templates with product image sets. | None | Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ConfigurableBundleDataImport\Communication\Plugin\ConfigurableBundleTemplateImageDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new ConfigurableBundleTemplateImageDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import configurable-bundle-template-image
```

{% info_block warningBox "Verification" %}

Make sure that `the spy_product_image`, `spy_product_image_set`, `spy_product_image_set_to_product_image` tables were updated with new data rows.

Make sure that data is synced to the `spy_configurable_bundle_template_image_storage` table.

Make sure that the latest data is present at Elasticsearch and Redis documents for configurable bundle templates.

{% endinfo_block %}

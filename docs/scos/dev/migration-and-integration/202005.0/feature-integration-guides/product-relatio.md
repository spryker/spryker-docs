---
title: Product Relations Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/product-relations-feature-integration
redirect_from:
  - /v5/docs/product-relations-feature-integration
  - /v5/docs/en/product-relations-feature-integration
---

## Install Feature Core
Follow the steps below to install feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name  | Version |
| --- | --- |
| Spryker Core | master |
| ProductRelations | master |

### 1) Install Required Modules Using Composer

Run the following command(s) to install the required modules:
```bash
composer require "spryker-feature/product-relations:^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| Module | Expected directory |
| --- | --- |
| `ProductRelation` | `vendor/spryker/product-relation` |
| `ProductRelationGui` | `vendor/spryker/product-relation-gui` |
| `ProductRelationDataImport` | `vendor/spryker/product-relation-data-import` |
| `ProductRelationStorage` | `vendor/spryker/product-relation-storage` |
| `ProductRelationWidget` | `vendor/spryker/product-relation-widget` |

{% endinfo_block %}
	
### 2) Set up Database Schema and Transfer Objects

1. Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

|	Database Entity |	Type	| Event |
    | --- | --- | --- |
|`spy_product_relation`|	table|	created|
|`spy_product_relation_product_abstract`	|table|	created|
|`spy_product_relation_store`	|table|	created|
|`spy_product_abstract_relation_storage`|	table|	created|


{% endinfo_block %}
	
2. Adjust the schema definition so entity changes trigger events.

**src/Pyz/Zed/ProductRelation/Persistence/Propel/Schema/spy_product_relation.schema.xml**
    
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductRelation\Persistence" package="src.Orm.Zed.ProductRelation.Persistence">

    <table name="spy_product_relation">
        <behavior name="event">
            <parameter name="spy_product_relation_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_product_relation_product_abstract">
        <behavior name="event">
            <parameter name="spy_product_relation_product_abstract_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_product_relation_store">
        <behavior name="event">
            <parameter name="spy_product_relation_store_all" column="*"/>
        </behavior>
    </table>

</database>
```
    

| Affected Entity | Triggered events |
| --- | --- |
| `spy_product_relation` | `Entity.spy_product_relation.create`<br>`Entity.spy_product_relation.update`<br>`Entity.spy_product_relation.delete` |
| `spy_product_relation_store` | `Entity.spy_product_relation_store.create`<br>`Entity.spy_product_relation_store.delete` |
| `spy_product_relation_product_abstract` | `Entity.spy_product_relation_product_abstract.create`<br>`Entity.spy_product_relation_product_abstract.delete` |

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects: 
	
| Transfer	| Type	| Event| 	Path| 
| ---| ---| ---| ---| 
| `ProductRelation`| 	class| 	created	| `src/Generated/Shared/Transfer/ProductRelationTransfer`| 
`ProductRelationCriteria`	| class| 	created| 	`src/Generated/Shared/Transfer/ProductRelationCriteriaTransfer`| 
| `StoreRelation`| 	class| 	created| 	`src/Generated/Shared/Transfer/StoreRelationTransfer`| 
| Store| 	class| 	created| 	`src/Generated/Shared/Transfer/StoreTransfer`| 
| ProductRelationType	| class| 	created| 	`src/Generated/Shared/Transfer/ProductRelationTypeTransfer`| 
| `ProductRelationRelatedProduct`	| class	| created| 	`src/Generated/Shared/Transfer/ProductRelationRelatedProductTransfer`| 
| `RuleQueryDataProvider`	| class	| created	| `src/Generated/Shared/Transfer/RuleQueryDataProviderTransfer`| 
| `PropelQueryBuilderRuleSet`| 	class	| created| 	`src/Generated/Shared/Transfer/PropelQueryBuilderRuleSetTransfer`| 
| `PropelQueryBuilderCriteria`	| class	| created	| `src/Generated/Shared/Transfer/PropelQueryBuilderCriteriaTransfer`| 
| `PropelQueryBuilderCriteriaMapping`| 	class| 	created| 	`src/Generated/Shared/Transfer/PropelQueryBuilderCriteriaMappingTransfer`| 
| `StorageProductRelations`	| class	| created	| `src/Generated/Shared/Transfer/StorageProductRelationsTransfer`| 
| `StorageProductAbstractRelation`	| class| 	created| 	`src/Generated/Shared/Transfer/StorageProductAbstractRelationTransfer`| 
| `Quote`	| class	| created	| `src/Generated/Shared/Transfer/QuoteTransfer`| 
| `Item`	| class| 	created	| `src/Generated/Shared/Transfer/ItemTransfer`| 
| `CurrentProductPrice`	| class| 	created| 	`src/Generated/Shared/Transfer/CurrentProductPriceTransfer`| 
| `Locale`	| class| 	created	| `src/Generated/Shared/Transfer/LocaleTransfer`| 
| `ProductUrl`| 	class| 	created| 	`src/Generated/Shared/Transfer/ProductUrlTransfer`| 
| `TabItem`	| class	| created	| `src/Generated/Shared/Transfer/TabItemTransfer`| 
| `TabsView`	| class| 	created| 	`src/Generated/Shared/Transfer/TabsViewTransfer`| 
| `LocalizedUrl`	| class	| created| 	`src/Generated/Shared/Transfer/LocalizedUrlTransfer`| 
| `ProductAbstract`| 	class	| created| 	`src/Generated/Shared/Transfer/ProductAbstractTransfer`| 
| `ProductRelationCriteriaFilter`	| class| 	created| 	`src/Generated/Shared/Transfer/ProductRelationCriteriaFilterTransfer`| 
| `ProductRelationResponse`	| class	| created	| `src/Generated/Shared/Transfer/ProductRelationResponseTransfer`| 
| `Filter`	| class	| created| 	`src/Generated/Shared/Transfer/FilterTransfer`| 

{% endinfo_block %}

### 3) Configure Export to Redis
  
Follow the procedure below to to publish tables on change (create, edit, delete) to the `spy_product_abstract_group_storage` table and synchronize the data to Storage.
	
#### Set up Publishers
| Plugin |	Specification |	Prerequisites |	Namespace |
|--- |--- |--- |--- |
|`ProductRelationWritePublisherPlugin` |	Publishes product relation data by create, update and delete events from the `spy_product_relation` table. |	none |	`Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWritePublisherPlugin` |
|`ProductRelationWriteForPublishingPublisherPlugin` |	Publishes product relation data by publish and unpublish events from the `spy_product_relation` table. |	none |	`Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWriteForPublishingPublisherPlugin` |
|`ProductRelationProductAbstractWritePublisherPlugin` |	Publishes product relation data by create and delete events from the `spy_product_relation_product_abstract` table. |	none |	`Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationProductAbstract\ProductRelationProductAbstractWritePublisherPlugin` |
|`ProductRelationStoreWritePublisherPlugin` |	Publishes product relation data by create and delete events from the `spy_product_relation_store` table. |	none |	`Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationStore\ProductRelationStoreWritePublisherPlugin` |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**
    
```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryPublisherTriggerPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWriteForPublishingPublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationProductAbstract\ProductRelationProductAbstractWritePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationPublisherTriggerPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelationStore\ProductRelationStoreWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            ...
            $this->getProductRelationStoragePlugins()
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            ...
            new ProductRelationPublisherTriggerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getProductRelationStoragePlugins(): array
    {
        return [
            new ProductRelationWritePublisherPlugin(),
            new ProductRelationWriteForPublishingPublisherPlugin(),
            new ProductRelationProductAbstractWritePublisherPlugin(),
            new ProductRelationStoreWritePublisherPlugin(),
        ];
    }
}

```


#### Set up Re-generate and Re-sync Features
Set up Re-generate and Re-sync features as follows:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductRelationSynchronizationDataRepositoryPlugin` | Allows the whole storage table content to be synchronizedinto Storage. | none | `Spryker\Zed\ProductRelationStorage\Communication\Plugin\Synchronization\ProductRelationSynchronizationDataRepositoryPlugin` |

**src/Pyz/Zed/ProductRelationStorage/ProductRelationStorageConfig.php**
			
```php
<?php

namespace Pyz\Zed\ProductRelationStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductRelationStorage\ProductRelationStorageConfig as SprykerProductRelationStorageConfig;

class ProductRelationStorageConfig extends SprykerProductRelationStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductAbstractRelationSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductGroupStorage\Communication\Plugin\Synchronization\ProductGroupSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductRelationSynchronizationDataRepositoryPlugin(),
        ];
    }
}
```

### 4) Import Product Relations Data

Follow the steps to import product relations data:
{% info_block infoBox "Imported entities" %}

The following imported entities will be used as product relations in Spryker OS.

{% endinfo_block %}
	
1. Prepare data according to your requirements using our demo data:

**data/import/product_relation.csv**
```csv
product,relation_type,rule,product_relation_key,is_active,is_rebuild_scheduled
001,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""004,005,006,007,008,009,010,011,012,013,014,015""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-1,1,0
004,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""007,008,009,010,011,012,013,014,015""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-2,1,0
007,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""010,011,012,013,014,015""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-3,1,0
010,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""012,013,014,015""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-4,1,0
016,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""018,019,020,021,022,023,024,025,026,027,028,029""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-5,1,0
018,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""022,023,024,025,026,027,028,029""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-6,1,0
022,up-selling,"{""condition"":""AND"",""rules"":[{""condition"":null,""rules"":{},""id"":""product_sku"",""field"":""product_sku"",""type"":""string"",""input"":""text"",""operator"":""in"",""value"":""024,025,026,027,028,029""}],""id"":null,""field"":null,""type"":null,""input"":null,""operator"":null,""value"":null}",Prk-7,1,0
```

|Column |	Required? |	Data Type |	Data Example |	Data Explanation |
|---|---|---|---|---|
|`product` |	Yes |	string |	001 |	SKU of the abstract product which owns the relation. |
|`relation_type` |	Yes |	string |	up-selling |	Type of the product relation. |
|`product_relation_key` |	Yes |	string |	prk-1 |	Product relation key. |
|`is_active` |	No |	boolean |	1 |	Indicates if product relation is available. |
|`is_rebuild_scheduled` |	No |	boolean |	1 |	Indicates if rebuild is scheduled for current relation. |

**data/import/product_relation_store.csv**
```csv
product_relation_key,store_name
Prk-1,AT
Prk-1,DE
Prk-1,US
```

|Column |	Required? |	Data Type |	Data Example |	Data Explanation |
|---|---|---|---|---|
|`product_relation_key` |	yes |	string |	prk-1 |	Product relation key. |
|`product_relation_key` |	yes |	string |	DE |	Name of the store. |

2. Register the following data import plugins:

|Plugin|	Specification |	Prerequisites|	Namespace|
|---|---|---|---|
| `ProductRelationDataImportPlugin` |	Imports product relation data into the database. |	None |	`\Spryker\Zed\ProductRelationtDataImport\Communication\Plugin` |
| `ProductRelationStoreDataImportPlugin` |	Imports product relation store data into the database |	None |	`\Spryker\Zed\ProductRelationtDataImport\Communication\Plugin` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductRelationDataImport\Communication\Plugin\ProductRelationDataImportPlugin;
use Spryker\Zed\ProductRelationDataImport\Communication\Plugin\ProductRelationStoreStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductRelationDataImportPlugin(),
            new ProductRelationStoreStoreDataImportPlugin(),
        ];
    }
}
```

3. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ProductRelationDataImport\ProductRelationDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
			new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ProductRelationDataImportConfig::IMPORT_TYPE_PRODUCT_RELATION),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ProductRelationDataImportConfig::IMPORT_TYPE_PRODUCT_RELATION_STORE),
		];

		return $commands;
    }
}
```

4. Run the following console commands to import data:
```bash
console data:import:product:relation
console data:import:product-relation-store
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_product_relation`, `spy_product_relation_product_abstract` and `spy_product_relation_store` tables in the database.

{% endinfo_block %}

### 4) Set up Behavior
Follow the steps to set up behavior:
1. Configure the data import to use your data on the project level.

**src/Pyz/Zed/ProductRelationDataImport/ProductRelationDataImportConfig.php**

```php
<?php

namespace Pyz\Zed\ProductRelationDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ProductRelationDataImport\ProductRelationDataImportConfig as SprykerProductRelationDataImportConfig;

class ProductRelationDataImportConfig extends SprykerProductRelationDataImportConfig
{
  	/**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductRelationDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('product_relation.csv', static::IMPORT_TYPE_PRODUCT_RELATION);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductRelationStoreDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = $this->getModuleDataImportDirectoryPath();

        return $this->buildImporterConfiguration($moduleDataImportDirectory . 'product_relation_store.csv', static::IMPORT_TYPE_PRODUCT_RELATION_STORE);
    }
}
```

2. Configure the Product relation GUI module with a store plugin.

|Plugin |	Specificaation |	Prerequisites |	Namespaace |
|---|---|---|---|
|`StoreRelationToggleFormTypePlugin` |	Represents a store relation toggle form based on the stores registered in the system. |	None |	`Spryker\Zed\Store\Communication\Plugin\Form` |

**src/Pyz/Zed/ProductRelationGui/ProductRelationGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductRelationGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\ProductRelationGui\ProductRelationGuiDependencyProvider as SprykerProductRelationGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class ProductRelationGuiDependencyProvider extends SprykerProductRelationGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* You can see the list of product relations in the Back Office > **Product** >  **Product Relations**.
* You can see the product relation information in the Back Office > **Product** >  **Product Relations** >  **View Product Relation**.
* You can edit the product relation in the Back Office > **Product** >  **Product Relations** > **Edit Product Relation**.
* You can create a product relation in the Back Office > **Product** >  **Product Relations** > **Create Product Relation**.
* You can delete the product relation in the Back Office > **Product** >  **Product Relations** > **Delete Product Relation**.

{% endinfo_block %}

3. Enable Widgets:

|Plugin |	Specification |	Prerequisites |	Namespace |
|--- |--- |--- |--- |
|`SimilarProductsWidget` |	Widget for relations with the cross-selling relation type. |	None |	`SprykerShop\Yves\ProductRelationWidget\Widget` |
|`UpSellingProductsWidget` |	Widget for relations with the up-selling relation type. |	None  | `SprykerShop\Yves\ProductRelationWidget\Widget;` |

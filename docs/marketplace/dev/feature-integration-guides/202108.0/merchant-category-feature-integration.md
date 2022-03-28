---
title: Merchant Category feature integration
last_updated: Mar 04, 2021
description: This document describes the process how to integrate the Merchant Category feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Category feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Category feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ----- | ---------- |
| Spryker Core         | {{page.version}}      | [Spryker Core Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Merchant | {{page.version}}      | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/merchant-category:"^0.2.0" spryker/merchant-category-data-import:"^0.2.0" spryker/merchant-category-search:"^0.1.0"  --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| ----------- | ------------ |
| MerchantCategory | vendor/spryker/merchant-category  |
| MerchantCategoryDataImport | vendor/spryker/merchant-category-data-import |

{% endinfo_block %}

## 2) Set up database schema

Adjust the schema definition so that entity changes trigger the events:

**src/Pyz/Zed/MerchantCategory/Persistence/Propel/Schema/spy_merchant_category.schema.xml**

```xml
<?xml version="1.0"?><database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"          namespace="Orm\Zed\MerchantCategory\Persistence"          package="src.Orm.Zed.MerchantCategory.Persistence">
    <table name="spy_merchant_category">       
        <behavior name="event">           
             <parameter name="spy_merchant_category_all" column="*"/>  
        </behavior>
    </table>
</database>
```

Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify the following changes by checking your database

| DATABASE ENTITY | TYPE | EVENT |
| --------------------- | ----- | ------- |
| spy_merchant_category | table | created |

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| - | - | - | - |
| MerchantCategoryCriteria  | object | Created | src/Generated/Shared/Transfer/MerchantCategoryCriteriaTransfer |
| MerchantCategory          | object | Created | src/Generated/Shared/Transfer/MerchantCategoryTransfer  |
| MerchantSearchCollection  | object | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer |
| MerchantSearch            | object | Created | src/Generated/Shared/Transfer/MerchantSearchTransfer |
| DataImporterConfiguration | object | Created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer |

{% endinfo_block %}

### 4) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| -------------- | ----------- | ------ | ------------- |
| MerchantCategoryMerchantExpanderPlugin | Expands MerchantTransfer with categories.  |   | Spryker\Zed\MerchantCategory\Communication\Plugin\Merchant |
| MerchantCategoryMerchantSearchDataExpanderPlugin | Expands merchant search data with merchant category keys. |  | Spryker\Zed\MerchantCategorySearch\Communication\Plugin\MerchantSearch |
| MerchantCategoryWritePublisherPlugin | Updates merchant categories in search based on category events. |  | Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\MerchantCategory |
| RemoveMerchantCategoryRelationPlugin | Removes merchant categories on category delete. |  | Spryker\Zed\MerchantCategory\Communication\Plugin |

 **src/Pyz/Zed/Category/CategoryDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\MerchantCategory\Communication\Plugin\RemoveMerchantCategoryRelationPlugin;

class CategoryDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Category\Dependency\Plugin\CategoryRelationDeletePluginInterface[]|\Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryRelationDeletePluginInterface[]
     */
    protected function getRelationDeletePluginStack(): array
    {
        $deletePlugins = array_merge(
            [
                new RemoveMerchantCategoryRelationPlugin(),
            ],
            parent::getRelationDeletePluginStack()
        );
        return $deletePlugins;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure when you delete category that has a relation to merchant in the Back Office, there is no exception and merchant category removed as well.

{% endinfo_block %}

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Zed\MerchantCategory\Communication\Plugin\Merchant\MerchantCategoryMerchantExpanderPlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface[]
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [
            new MerchantCategoryMerchantExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `MerchantFacade::get()` response contains merchant categories.

{% endinfo_block %}

**src/Pyz/Zed/MerchantSearch/MerchantSearchDependencyProvider.php**

```
<?php

namespace Pyz\Zed\MerchantSearch;

use Spryker\Zed\MerchantCategorySearch\Communication\Plugin\MerchantSearch\MerchantCategoryMerchantSearchDataExpanderPlugin;
use Spryker\Zed\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantSearchExtension\Dependency\Plugin\MerchantSearchDataExpanderPluginInterface[]
     */
    protected function getMerchantSearchDataExpanderPlugins(): array
    {
        return [
            new MerchantCategoryMerchantSearchDataExpanderPlugin(),
        ];
    }
```

{% info_block warningBox "Verification" %}

Make sure that the index data `http://zed.de.spryker.local/search-elasticsearch-gui/maintenance/list-indexes` contains merchant category keys for the merchants assigned to categories.

{% endinfo_block %}

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantCategory\Communication\Plugin\Publisher\Category\CategoryWritePublisherPlugin;
use Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\MerchantCategory\MerchantCategoryWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return [
            CategoryWritePublisherPlugin,
            MerchantCategoryWritePublisherPlugin,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that changing of category keys triggers those changes `http://zed.de.spryker.local/search-elasticsearch-gui/maintenance/list-indexes`.

{% endinfo_block %}

### 5) Import merchant categories data

Prepare your data according to your requirements using the following format:

**data/import/common/common/marketplace/merchant_category.csv**

```yaml
category_key,merchant_reference 2
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| -------- | ------- | ----- | -------- | -------------- |
| category_key  | &check; | string  | food  | Internal data import identifier for a merchant. |
| merchant_reference | &check; | string    | roan  | Merchant identifier.  |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------- | ------------------- | ----- | ------------ |
| MerchantCategoryDataImportPlugin | Imports merchant category data into the database. |  | Spryker\Zed\MerchantCategoryDataImport\Communication\Plugin\DataImport |

 **src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantCategoryDataImport\Communication\Plugin\DataImport;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantCategoryDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import merchant-category
```

{% info_block warningBox "Verification" %}

Make sure that the imported data is added to the `spy_merchant_category` table.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Merchant Category feature front end.

### Prerequisites

Integrate the required features before beginning the integration step.

| NAME | VERSION | INTEGRATION GUIDE |
| -------- | ------ | -------------- |
| Spryker Core | {{page.version}}  | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Merchant     | {{page.version}} | [[DEPRECATED\] Merchant Feature Integration](https://github.com/spryker-feature/merchant) |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ---------------- | -------------- | ----------- | ---------------------- |
| MerchantCategoryMerchantSearchQueryExpanderPlugin | Adds filter by category keys to elasticsearch query. |   | Spryker\Client\MerchantCategorySearch\Plugin\Elasticsearch\Query |

**src/Pyz/Client/MerchantSearch/MerchantSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\MerchantCategorySearch\Plugin\Elasticsearch\Query\MerchantCategoryMerchantSearchQueryExpanderPlugin;
use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getMerchantSearchQueryExpanderPlugins(): array
    {
        return [
            new MerchantCategoryMerchantSearchQueryExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `MerchantSearchClient::search()` allows filtering merchants by category keys, if an array of categoryKeys is provided as the request parameter.

{% endinfo_block %}

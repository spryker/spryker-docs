---
title: Install the Back Office Category CSV Import and Export feature
description: Learn how to install the Back Office Category CSV Import and Export feature into your Spryker project.
last_updated: Nov 19, 2026
template: feature-integration-guide-template
---

The Back Office Category CSV Import and Export feature is the category data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature. The engine that stores jobs and runs, processes files, and provides the Back Office **Import & Export** pages is installed separately; this document installs the category plugin on top of it.

## Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | Required |
| Data Exchange Jobs | {{page.release_tag}} | Required |
| Category Management | {{page.release_tag}} | Required |
| Category Image | {{page.release_tag}} | Required |

For the Data Exchange Jobs feature, see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html). The category plugin writes categories through the services of the Category Management feature, so the category store assigner plugin and the category image plugins of [Install the Category Management feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) and [Install the Category Image feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-image-feature.html) must be registered.

## Install feature core

### 1) Install the required modules

```bash
composer require spryker/category:"{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Category | vendor/spryker/category |

{% endinfo_block %}

### 2) Set up transfer objects

Generate the transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following transfer objects exist:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ImportStepRequest | class | created | src/Generated/Shared/Transfer/ImportStepRequestTransfer |
| ImportStepResponse | class | created | src/Generated/Shared/Transfer/ImportStepResponseTransfer |
| ImportStepError | class | created | src/Generated/Shared/Transfer/ImportStepErrorTransfer |
| ImportPublishEvent | class | created | src/Generated/Shared/Transfer/ImportPublishEventTransfer |

{% endinfo_block %}

### 3) Register the category schema plugin

The engine learns about the *category-csv-import* job type from the schema plugin registered in the `DataExchange` dependency provider. Without this registration, the type is not offered when creating an import job and the export page does not list its jobs.

<div class="width-100">

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CategoryCsvImportSchemaPlugin | Provides the *category-csv-import* job type: its column schema with one column per locale for the names and meta data and one column group per locale and image number for the images, the import steps, the export steps, and the placeholder values. One row per category. | None | Spryker\Zed\Category\Communication\Plugin\DataExchange |

</div>

**src/Pyz/Zed/DataExchange/DataExchangeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Spryker\Zed\Category\Communication\Plugin\DataExchange\CategoryCsvImportSchemaPlugin;
use Spryker\Zed\DataExchange\DataExchangeDependencyProvider as SprykerDataExchangeDependencyProvider;

class DataExchangeDependencyProvider extends SprykerDataExchangeDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface>
     */
    protected function getImportSchemaPlugins(): array
    {
        return [
            new CategoryCsvImportSchemaPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportSchemaPluginInterface>
     */
    protected function getExportSchemaPlugins(): array
    {
        return [
            new CategoryCsvImportSchemaPlugin(),
        ];
    }
}
```

If the Data Exchange Jobs feature is installed with its installer plugin, `console setup:init-db` creates an import job for the new type; see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html#5-register-the-installer-plugin). In a project that seeds its import jobs from `import_job.csv`, add a row with the `category-csv-import` type.

{% info_block warningBox "Verification" %}

Log in to the Back Office, go to **Import & Export&nbsp;> Import**, and click **Create Import Job**. Make sure that **category-csv-import** is offered in the **Type** field.

Create a job with the *category-csv-import* type, download its template, and make sure that the header row contains *Category Key*, *Parent Category Key*, *Additional Parent Category Keys*, *Stores*, *Template*, the flag columns, *Sort Order*, one *Name (…)* column per locale, and the *Image Small (…)* and *Image Large (…)* columns per locale and per image number, including the `Default` locale.

Import a CSV file with a parent row and a child row that names the parent, with the root category of the shop as the parent of the first row, and verify the following:

- Both categories appear under **Catalog&nbsp;> Category** with the stores, names, and images of the file.
- A second import of the file with a changed name and the other cells empty updates the name and keeps every other value.
- A row with an empty *Parent Category Key* is reported as an error that names the existing root category.

{% endinfo_block %}

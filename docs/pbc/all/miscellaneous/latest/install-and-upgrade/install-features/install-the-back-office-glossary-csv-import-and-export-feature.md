---
title: Install the Back Office Glossary CSV Import and Export feature
description: Learn how to install the Back Office Glossary CSV Import and Export feature into your Spryker project.
last_updated: Nov 19, 2026
template: feature-integration-guide-template
---

The Back Office Glossary CSV Import and Export feature is the glossary data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature. The engine that stores jobs and runs, processes files, and provides the Back Office **Import & Export** pages is installed separately; this document installs the glossary plugin on top of it.

## Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | Required |
| Data Exchange Jobs | {{page.release_tag}} | Required |

For the Data Exchange Jobs feature, see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html).

## Install feature core

### 1) Install the required modules

```bash
composer require spryker/glossary:"{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Glossary | vendor/spryker/glossary |

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

### 3) Register the glossary schema plugin

The engine learns about the *glossary-csv-import* job type from the schema plugin registered in the `DataExchange` dependency provider. Without this registration, the type is not offered when creating an import job and the export page does not list its jobs.

<div class="width-100">

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| GlossaryCsvImportSchemaPlugin | Provides the *glossary-csv-import* job type: its column schema with one translation column per locale, the import steps, the export step, and the placeholder values. One row per glossary key. | None | Spryker\Zed\Glossary\Communication\Plugin\DataExchange |

</div>

**src/Pyz/Zed/DataExchange/DataExchangeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Spryker\Zed\DataExchange\DataExchangeDependencyProvider as SprykerDataExchangeDependencyProvider;
use Spryker\Zed\Glossary\Communication\Plugin\DataExchange\GlossaryCsvImportSchemaPlugin;

class DataExchangeDependencyProvider extends SprykerDataExchangeDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface>
     */
    protected function getImportSchemaPlugins(): array
    {
        return [
            new GlossaryCsvImportSchemaPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportSchemaPluginInterface>
     */
    protected function getExportSchemaPlugins(): array
    {
        return [
            new GlossaryCsvImportSchemaPlugin(),
        ];
    }
}
```

If the Data Exchange Jobs feature is installed with its installer plugin, `console setup:init-db` creates an import job for the new type; see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html#5-register-the-installer-plugin). In a project that seeds its import jobs from `import_job.csv`, add a row with the `glossary-csv-import` type.

{% info_block warningBox "Verification" %}

Log in to the Back Office, go to **Import & Export&nbsp;> Import**, and click **Create Import Job**. Make sure that **glossary-csv-import** is offered in the **Type** field.

Create a job with the *glossary-csv-import* type, download its template, and make sure that the header row contains the *Key* column and one *Translation (…)* column per locale of the shop.

Import a CSV file with one row that has a new key and a translation in one locale, and verify the following:

- The key is created and the translation appears under **Administration&nbsp;> Glossary** and, after Publish and Synchronize, on the Storefront.
- A second import of the same file with a changed translation updates the translation and leaves the other locale unchanged.
- A row whose key is written in another case than the stored key is reported as an error that names the stored spelling.

{% endinfo_block %}

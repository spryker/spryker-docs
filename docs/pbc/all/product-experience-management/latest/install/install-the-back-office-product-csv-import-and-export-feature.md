---
title: Install the Back Office Product CSV Import and Export feature
description: Learn how to install the Back Office Product CSV Import and Export feature into your Spryker project.
last_updated: Oct 29, 2026
template: feature-integration-guide-template
redirect_from:
  - /docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html
  - /docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature
---

The Back Office Product CSV Import and Export feature is the product data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature. The engine that stores jobs and runs, processes files, and provides the Back Office **Import & Export** pages is installed separately; this document installs the product plugin on top of it.

## Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | Required |
| Data Exchange Jobs | {{page.release_tag}} | Required |
| Product | {{page.release_tag}} | Required |
| Product Image | {{page.release_tag}} | Required |
| Price Product | {{page.release_tag}} | Required |
| Stock | {{page.release_tag}} | Required |
| Tax | {{page.release_tag}} | Required |
| Store | {{page.release_tag}} | Required |
| Locale | {{page.release_tag}} | Required |
| Category | {{page.release_tag}} | Required |
| Merchant | {{page.release_tag}} | Required |
| Product Approval Process | {{page.release_tag}} | Required |
| Shipment Type | {{page.release_tag}} | Required |

For the Data Exchange Jobs feature, see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html).

## Install feature core

### 1) Install the required modules

```bash
composer require spryker-feature/product-experience-management:"{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductExperienceManagement | vendor/spryker-feature/product-experience-management |

{% endinfo_block %}

### 2) Set up configuration

The product plugin reads the *Product Status* column of the imported CSV file and relies on `spryker/product-approval` for the approval statuses of abstract products. The following settings are defined in `SprykerFeature\Zed\ProductExperienceManagement\ProductExperienceManagementConfig`:

| SETTING | DESCRIPTION |
| --- | --- |
| `getProductConcreteStatuses()` | Statuses accepted in the *Product Status* column of concrete product rows. Rows with any other value are skipped and reported as errors. |
| `getProductConcreteStatusActive()` | Status that activates a concrete product. Every other status from `getProductConcreteStatuses()` deactivates it. |

To change the defaults, extend the module configuration on the project level:

**src/Pyz/Zed/ProductExperienceManagement/ProductExperienceManagementConfig.php**

```php
<?php

namespace Pyz\Zed\ProductExperienceManagement;

use SprykerFeature\Zed\ProductExperienceManagement\ProductExperienceManagementConfig as SprykerProductExperienceManagementConfig;

class ProductExperienceManagementConfig extends SprykerProductExperienceManagementConfig
{
    /**
     * @return list<string>
     */
    public function getProductConcreteStatuses(): array
    {
        return ['active', 'inactive'];
    }

    public function getProductConcreteStatusActive(): string
    {
        return 'active';
    }
}
```

The engine settings, such as the batch size, the maximum upload size, and the number of errors shown inline, are defined in `DataExchangeConfig`; see [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html#2-set-up-configuration).

### 3) Set up transfer objects

Generate the transfer objects of the product plugin:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ImportRowValidationCollection | class | created | src/Generated/Shared/Transfer/ImportRowValidationCollectionTransfer |

{% endinfo_block %}

### 4) Register the product schema plugin

The engine learns about the *products-csv-import* job type from the schema plugin registered in the `DataExchange` dependency provider. Without this registration, the type is not offered when creating an import job.

<div class="width-100">

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductCsvImportSchemaPlugin | Provides the *products-csv-import* job type: its column schema, import steps, export steps, and placeholder values. | None | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin |

</div>

**src/Pyz/Zed/DataExchange/DataExchangeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Spryker\Zed\DataExchange\DataExchangeDependencyProvider as SprykerDataExchangeDependencyProvider;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductCsvImportSchemaPlugin;

class DataExchangeDependencyProvider extends SprykerDataExchangeDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface>
     */
    protected function getImportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportSchemaPluginInterface>
     */
    protected function getExportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in to the Back Office, go to **Import & Export&nbsp;> Import**, and click **Create Import Job**. Make sure that **products-csv-import** is offered in the **Type** field.

Create a job with this type, download its template, and make sure that the header row contains the product columns, for example *Abstract SKU*, *Concrete SKU*, and one *Name (…)* column per locale.

Import a CSV file with a concrete product row and verify the following:

- A row with the status returned by `getProductConcreteStatusActive()` activates the concrete product.
- A row with a status that is not in `getProductConcreteStatuses()` is skipped and reported as an error.

{% endinfo_block %}

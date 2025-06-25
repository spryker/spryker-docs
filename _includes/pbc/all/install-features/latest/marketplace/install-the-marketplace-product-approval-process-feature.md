

This document describes how to install the Marketplace Product Approval Process feature.

## Install feature core

Follow the steps below to install the Marketplace Product Approval Process feature core.

### Prerequisites

Install the required features:

| NAME                     | VERSION            | INSTALLATION GUIDE                                                                                                                                                   |
|--------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core             | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                         |
| Marketplace Product      | 202507.0 | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)           |
| Product Approval Process | 202507.0 | [Install the Product Approval Process feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-approval-process-feature.html) |


### 1) Install the required modules using Сomposer

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-product-approval-process:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                            | EXPECTED DIRECTORY                                   |
|-----------------------------------|------------------------------------------------------|
| MerchantProductApproval           | vendor/spryker/merchant-product-approval             |
| MerchantProductApprovalDataImport | vendor/spryker/merchant-product-approval-data-import |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                                       | TYPE   | EVENT   |
|-------------------------------------------------------|--------|---------|
| spy_merchant.default_product_abstract_approval_status | column | added   |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                                | TYPE     | EVENT    | PATH                                                                  |
|-----------------------------------------|----------|----------|-----------------------------------------------------------------------|
| ProductAbstractTransfer                 | class    | created  | src/Generated/Shared/Transfer/ProductAbstractTransfer                 |
| MerchantProductCriteriaTransfer         | class    | created  | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer         |
| MerchantProductTransfer                 | class    | created  | src/Generated/Shared/Transfer/MerchantProductTransfer                 |
| MerchantTransfer                        | class    | created  | src/Generated/Shared/Transfer/MerchantTransfer                        |
| DataImporterReaderConfigurationTransfer | class    | created  | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |
| DataImporterConfigurationTransfer       | class    | created  | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer       |
| DataImporterReportTransfer              | class    | created  | src/Generated/Shared/Transfer/DataImporterReportTransfer              |

{% endinfo_block %}

### 3) Add translations

Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                                           | PREREQUISITES | NAMESPACE                                                           |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| MerchantProductApprovalProductAbstractPreCreatePlugin | Expands product abstract transfer with default merchant product approval status when `ProductAbstractTransfer::approvalStatus` is null. | None          | Spryker\Zed\MerchantProductApproval\Communication\Plugin\Product    |


**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\MerchantProductApproval\Communication\Plugin\Product\MerchantProductApprovalProductAbstractPreCreatePlugin;
use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPreCreatePluginInterface>
     */
    protected function getProductAbstractPreCreatePlugins(): array
    {
        return [
            new MerchantProductApprovalProductAbstractPreCreatePlugin(),
        ];
    }
}
```

### 5) Import data

Follow the steps to import product approval data:

1. Prepare data according to your requirements using the following demo data:

**data/import/common/common/marketplace/merchant_product_approval_status_default.csv**

```yaml
merchant_reference,approval_status
MER000002,approved
```

| COLUMN             | Required | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                        |
|--------------------|----------|-----------|--------------|---------------------------------------------------------|
| merchant_reference | &check;        | string    | MER000002    | Unique merchant identifier.                             |
| approval_status    | &check;        | string    | approved     | Status (draft, waiting_for_approval, approved, denied). |

2. Register the following data import plugins:

| PLUGIN                                                | SPECIFICATION                                                                                          | PREREQUISITES | NAMESPACE                                                                      |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------|
| MerchantProductApprovalStatusDefaultDataImportPlugin  | Iterates over the data sets and imports merchant default product approval statuses into the database.  | None          | Spryker\Zed\MerchantProductApprovalDataImport\Communication\Plugin\DataImport  |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\MerchantProductApprovalDataImport\Communication\Plugin\DataImport\MerchantProductApprovalStatusDefaultDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
          new MerchantProductApprovalStatusDefaultDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import merchant-product-approval-status-default
```

{% info_block warningBox "Verification" %}

Make sure that statuses has been added to the `spy_merchant` table.

{% endinfo_block %}

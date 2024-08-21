

This document describes how to install the Merchant feature.

## Install feature core

Follow the steps below to install the Merchant feature.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| Merchant | spryker/merchant |
| MerchantDataImport | spryker/merchant-data-import |
| MerchantGui | spryker/merchant-gui |


{% endinfo_block %}

## 2) Set up the database schema

Apply database changes and generate entity and transfer changes:
```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE SECURITY | TYPE | EVENT |
|-|-|-|
| spy_merchant | table | created |
| spy_merchant_store | table | created |


{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantCriteria.status | attribute | created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer |
| MerchantCriteria.isActive | attribute | created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer |
| DataImporterReaderConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |


{% endinfo_block %}

## 3) Add Zed translations

Generate a new translation cache for Zed:
```bash
console translator:generate-cache
```

## 4) Import merchants data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/marketplace/merchant.csv**

```php
merchant_reference,merchant_name,registration_number,status,email,is_active,url.de_DE,url.en_US
MER000006,Sony Experts,HYY 134306,approved,michele@sony-experts.com,1,/de/merchant/sony-experts,/en/merchant/sony-experts
MER000005,Budget Cameras,HXX 134305,approved,jason.weidmann@budgetcamerasonline.com,1,/de/merchant/budget-cameras,/en/merchant/budget-cameras
MER000004,Impala Merchant,3,waiting-for-approval,impala.merchant@merchant.kudu,0,/en/merchant/impala-merchant-1,/de/merchant/impala-merchant-1
MER000003,Sugar Monster,4,waiting-for-approval,sugar.monster@merchant.kudu,0,/de/merchant/sugar-monster,/en/merchant/sugar-monster
MER000007,Restrictions Merchant,5,waiting-for-approval,restrictions.merchant@merchant.kudu,0,/de/merchant/restrictions-merchant,/en/merchant/restrictions-merchant
MER000001,Spryker,HRB 134310,approved,harald@spryker.com,1,/de/merchant/spryker,/en/merchant/spryker
MER000002,Video King,1234.4567,approved,martha@video-king.nl,1,/de/merchant/video-king,/en/merchant/video-king
```

| COLUMN | REQUIRED | DATA TYPE | DATA TYPE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | string | MER000006 | Non-database identifier for a merchant. |
| merchant_name | &check; | string | Sony Experts | Merchant profile page url for the de_DE locale. |
| registration_number |  | string | HYY 134306 | Official registration number as a legal entity of the merchant. |
| status | &check; | string | approved | Status of the merchant in the system, a status pseudo state machine can be configured to allow for transitions, but this is the initial status for a merchant while importing. |
| email | &check; | string | michele@sony-experts.com | Email to contact the merchant. |
| is_active |  | boolean | 1 | Sets if the merchant is active in the system (Value changeable in future, initial value for import.) |
| url | optional(per locale) | string | /de/merchant/sony-experts | Unique storefront identifier for a merchant's page. |

**data/import/common/common/marketplace/merchant_store.csv**

```php
merchant_reference,store_name
MER000001,DE
MER000002,DE
MER000006,DE
MER000005,DE
MER000004,DE
MER000003,DE
MER000007,DE
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | string | MER000006 | Merchant identifier. |
| store_name | &check; | string | DE | Store name to which the merchant will be assigned. |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantDataImportPlugin | Imports merchant data into the database. |  | Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin |
| MerchantStoreDataImportPlugin | Imports merchant store assignment into the database. | MerchantDataImportPlugin | Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantStoreDataImportPlugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin;
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantDataImportPlugin(),
			new MerchantStoreDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import merchant
console data:import merchant-store
```

{% info_block warningBox "Verification" %}

Make sure that the data has been added to the `spy_merchant` and `spy_merchant_store` tables in the database.

{% endinfo_block %}

## 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| StoreRelationToggleFormTypePlugin | Adds the store relation toggle form to the MerchantGui Merchant creation/editing form. |  | Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin |

**current/src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
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

Make sure that the merchant edit and create forms contain a *Store* toggle form that enables the ability to add a merchant to specific stores.

{% endinfo_block %}



## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
|---|---|
| Merchant | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant-contracts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| MerchantRelationship | vendor/spryker/merchant-relationship |
| MerchantRelationshipExtension | vendor/spryker/merchant-relationship-extension |
| MerchantRelationshipDataImport | vendor/spryker/merchant-relationship-data-import |
| MerchantRelationshipGui | vendor/spryker/merchant-relationship-gui |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE |
| --- | --- |
| spy_merchant_relationship | table |
| spy_merchant_relationship_to_company_business_unit | table |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| MerchantRelationship | class | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer |
| SpyMerchantRelationshipEntity | class | created | src/Generated/Shared/Transfer/SpyMerchantRelationshipEntityTransfer |
| CompanyBusinessUnit.merchantRelationships | column | added | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer |

{% endinfo_block %}

### 3) Import data

#### Import merchant relationships

The following imported entities will be used as merchant relationships in Spryker OS.

Prepare your data according to your requirements using our demo data:

**vendor/spryker/merchant-relationship-data-import/data/import/merchant_relationship.csv**

```yaml
merchant_relation_key,merchant_key,company_business_unit_owner_key,company_business_unit_assignee_keys
mr-001,kudu-merchant-1,test-business-unit-1,"test-business-unit-2"
mr-002,oryx-merchant-1,test-business-unit-1,"test-business-unit-1;test-business-unit-2"
mr-003,oryx-merchant-1,test-business-unit-2,"test-business-unit-1"
mr-004,oryx-merchant-1,trial-bus-unit-1,
mr-005,oryx-merchant-1,trial-bus-unit-2,"trial-bus-unit-3;trial-bus-unit-1"
mr-006,oryx-merchant-1,proof-bus-unit-2,"proof-bus-unit-2"
mr-007,kudu-merchant-1,proof-bus-unit-1,"proof-bus-unit-1;proof-bus-unit-2;proof-bus-unit-3"
sugar-monster-spryker-hq-1,sugar-monster,spryker_systems_HQ,spryker_systems_HQ
sugar-monster-spryker-hq-2,sugar-monster,spryker_systems_HQ,spryker_systems_Barcelona
sugar-monster-spryker-hq-3,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich
sugar-monster-spryker-hq-4,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich_Sales
sugar-monster-spryker-hq-5,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich_Support
sugar-monster-spryker-hq-6,sugar-monster,spryker_systems_HQ,spryker_systems_Berlin
sugar-monster-spryker-hq-7,sugar-monster,spryker_systems_HQ,spryker_systems_HR
sugar-monster-ottom-supplier-1,sugar-monster,Supplier_Department,Supplier_Department
sugar-monster-ottom-supplier-2,sugar-monster,Supplier_Department,Ottom_store_Berlin
sugar-monster-ottom-supplier-3,sugar-monster,Supplier_Department,Ottom_store_Oslo
sugar-monster-ottom-supplier-4,sugar-monster,Supplier_Department,Ottom_store_London
mr-008,restrictions-merchant,BU-IT-no-ASUS,BU-IT-no-tablets;BU-IT-no-ASUS
mr-009,restrictions-merchant,BU-IT-only-wearables,"BU-IT-only-wearables"
mr-010,restrictions-merchant,Sales-under-400,"Sales-under-400"
mr-011,restrictions-merchant,Sales,Sales;Sales-under-400
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|---|---|---|---|---|
|  merchant_relation_key | optional | string | mr-002 | A reference used for the merchant relationship data import. |
|  merchant_key | ✓ | string | kudu-merchant-1 | A reference used to define a Merchant of the contract (relationship) between him and the company business unit. |
|  company_business_unit_owner_key | ✓ | string | test-business-unit-1 | A reference used to define a Company Business Unit of the contract (relationship) between it and a Merchant. |
|  company_business_unit_assignee_keys | optional | string | test-business-unit-1;test-business-unit-2 | A reference to the assigned business units, on which this contract is applied. |

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|  MerchantRelationshipDataImportPlugin | Imports merchant relationship data into the database. | None |  Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin\MerchantRelationshipDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
 /**
 * @return array
 */
 protected function getDataImporterPlugins(): array
 {
 return [
 new MerchantRelationshipDataImportPlugin(),
 ];
 }
}
```

Import data:

```bash
console data:import merchant-relationship
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_merchant_relationship` table in the database.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|  MerchantRelationshipHydratePlugin | Expands company user transfers, which has a company business unit with the merchant relationship data. | Expects, that company users have an assigned company business unit, which will be expanded with the merchant relationship data. |  Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser |

**src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUser;

use Spryker\Zed\CompanyUser\CompanyUserDependencyProvider as SprykerCompanyUserDependencyProvider;
use Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser\MerchantRelationshipHydratePlugin;

class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
 /**
 * @return \Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserHydrationPluginInterface[]
 */
 protected function getCompanyUserHydrationPlugins(): array
 {
 return [
 new MerchantRelationshipHydratePlugin(),
 ];
 }
}
```

{% info_block warningBox "Verification" %}

Make sure that when a Merchant Relationship is being created, `CompanyBusinessUnit.merchantRelationships` property of assigned business units contains merchant relationship data, when logged in as a company user of the assigned business unit.

{% endinfo_block %}

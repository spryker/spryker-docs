---
title: Merchant Contracts Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/merchant-contracts-feature-integration
redirect_from:
  - /v4/docs/merchant-contracts-feature-integration
  - /v4/docs/en/merchant-contracts-feature-integration
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Merchant | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/merchant-contracts: "^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`MerchantRelationship`</td><td>`vendor/spryker/merchant-relationship`</td></tr><tr><td>`MerchantRelationshipExtension`</td><td>`vendor/spryker/merchant-relationship-extension`</td></tr><tr><td>`MerchantRelationshipDataImport`</td><td>`vendor/spryker/merchant-relationship-data-import`</td></tr><tr><td>`MerchantRelationshipGui`</td><td>`vendor/spryker/merchant-relationship-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td></tr></thead><tbody><tr><td>`spy_merchant_relationship`</td><td>table</td></tr><tr><td>`spy_merchant_relationship_to_company_business_unit`</td><td>table</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`MerchantRelationship`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/MerchantRelationshipTransfer`</td></tr><tr><td>`SpyMerchantRelationshipEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyMerchantRelationshipEntityTransfer`</td></tr><tr><td>`CompanyBusinessUnit.merchantRelationships`</td><td>column</td><td >added</td><td>`src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import Data

#### Import Merchant Relationships

The following imported entities will be used as merchant relationships in Spryker OS.

Prepare your data according to your requirements using our demo data:

vendor/spryker/merchant-relationship-data-import/data/import/merchant_relationship.csv

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

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
|---|---|---|---|---|
|  `merchant_relation_key` | optional | string | mr-002 | A reference used for the merchant relationship data import. |
|  `merchant_key` | mandatory | string | kudu-merchant-1 | A reference used to define a Merchant of the contract (relationship) between him and the company business unit. |
|  `company_business_unit_owner_key` | mandatory | string | test-business-unit-1 | A reference used to define a Company Business Unit of the contract (relationship) between it and a Merchant. |
|  `company_business_unit_assignee_keys` | optional | string | "test-business-unit-1;test-business-unit-2" | A reference to the assigned business units, on which this contract is applied. |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `MerchantRelationshipDataImportPlugin` | Imports merchant relationship data into the database. | None |  `Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin` |

src/Pyz/Zed/DataImport/DataImportDependencyProvider.php

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

Run the following console command to import data:
```bash
console data:import merchant-relationship 
```

{% info_block warningBox "Verification" %}
Make sure that the configured data is added to the `spy_merchant_relationship` table in the database.
{% endinfo_block %}

### 4) Set up Behavior

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `MerchantRelationshipHydratePlugin` | Expands company user transfers, which has a company business unit with the merchant relationship data. | Expects, that company users have an assigned company business unit, which will be expanded with the merchant relationship data. |  `Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser` |

src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php

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

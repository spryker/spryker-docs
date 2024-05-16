This document describes how to install the Marketplace Merchant Commission feature.

## Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Merchant     | {{site.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{site.version}}/base-shop/install-and-upgrade/install-the-merchant-feature.html)          |

## 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant-commission:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| MerchantCommission           | vendor/spryker/merchant-commission             |
| MerchantCommissionDataImport | vendor/spryker/merchant-commission-data-import |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Apply database changes, generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in the database:

| DATABASE ENTITY                  | TYPE  | EVENT   |
|----------------------------------|-------|---------|
| spy_merchant_commission_group    | table | created |
| spy_merchant_commission          | table | created |
| spy_merchant_commission_amount   | table | created |
| spy_merchant_commission_merchant | table | created |
| spy_merchant_commission_store    | table | created |

{% endinfo_block %}

2. Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                             | TYPE  | EVENT   | PATH                                                                       |
|--------------------------------------|-------|---------|----------------------------------------------------------------------------|
| MerchantCommission                   | class | Created | src/Generated/Shared/Transfer/MerchantCommissionTransfer                   |
| MerchantCommissionGroup              | class | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupTransfer              |
| MerchantCommissionAmount             | class | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountTransfer             |
| MerchantCommissionCollection         | class | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionTransfer         |
| MerchantCommissionCriteria           | class | Created | src/Generated/Shared/Transfer/MerchantCommissionCriteriaTransfer           |
| MerchantCommissionConditions         | class | Created | src/Generated/Shared/Transfer/MerchantCommissionConditionsTransfer         |
| MerchantCommissionCollectionRequest  | class | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionRequestTransfer  |
| MerchantCommissionCollectionResponse | class | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionResponseTransfer |
| MerchantCommissionAmountCollection   | class | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountCollectionTransfer   |
| MerchantCommissionAmountCriteria     | class | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountCriteriaTransfer     |
| MerchantCommissionAmountConditions   | class | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountConditionsTransfer   |
| MerchantCommissionGroupCollection    | class | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupCollectionTransfer    |
| MerchantCommissionGroupCriteria      | class | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupCriteriaTransfer      |
| MerchantCommissionGroupConditions    | class | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupConditionsTransfer    |

{% endinfo_block %}

## 3) Import data

1. Prepare merchant commission data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_commission.csv**

```csv
key,name,description,valid_from,valid_to,is_active,amount,calculator_type_plugin,merchant_commission_group_key,priority,item_condition,order_condition
mc1,Merchant Commission 1,,2024-01-01,2029-06-01,1,5,percentage,primary,1,item-price >= '500' AND category IS IN 'computer',"price-mode = ""GROSS_MODE"""
mc2,Merchant Commission 2,,2024-01-01,2029-06-01,1,10,percentage,primary,2,item-price >= '200' AND item-price < '500' AND category IS IN 'computer',"price-mode = ""GROSS_MODE"""
mc3,Merchant Commission 3,,2024-01-01,2029-06-01,1,15,percentage,primary,3,item-price >= '0' AND item-price < '200' AND category IS IN 'computer',"price-mode = ""GROSS_MODE"""
mc4,Merchant Commission 4,,2024-01-01,2029-06-01,1,10,percentage,primary,4,,"price-mode = ""GROSS_MODE"""
mc5,Merchant Commission 5,,2024-01-01,2029-06-01,1,,fixed,secondary,4,,"price-mode = ""GROSS_MODE"""
```

| COLUMN                        | REQUIRED | DATA TYPE | DATA EXAMPLE                                      | DATA EXPLANATION                                |
|-------------------------------|----------|-----------|---------------------------------------------------|-------------------------------------------------|
| key                           | ✓        | string    | mc1                                               | Unique key of the merchant commission.          |
| name                          | ✓        | string    | Merchant Commission 1                             | Name of the merchant commission.                |
| description                   |          | string    |                                                   | Description of the merchant commission.         |
| valid_from                    |          | date      | 2024-01-01                                        | Start date of the merchant commission validity. |
| valid_to                      |          | date      | 2029-06-01                                        | End date of the merchant commission validity.   |
| is_active                     | ✓        | bool      | 1                                                 | Defines if the merchant commission is active.   |
| amount                        |          | int       | 5                                                 | Amount of the merchant commission.              |
| calculator_type_plugin        | ✓        | string    | percentage                                        | Type of the calculator plugin used.             |
| merchant_commission_group_key | ✓        | string    | primary                                           | Key of the merchant commission group.           |
| priority                      | ✓        | int       | 1                                                 | Priority of the merchant commission.            |
| item_condition                |          | string    | item-price >= '500' AND category IS IN 'computer' | Condition for the item.                         |
| order_condition               |          | string    | "price-mode = ""GROSS_MODE"""                     | Condition for the order.                        |

2. Prepare the merchant commission group data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_commission_group.csv**

```csv
key,name
primary,Primary
secondary,Secondary
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                             |
|--------|----------|-----------|--------------|----------------------------------------------|
| key    | ✓        | string    | primary      | Unique key of the merchant commission group. |
| name   | ✓        | string    | Primary      | Name of the merchant commission group.       |

3. Prepare the merchant commission amount data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_commission_amount.csv**

```csv
merchant_commission_key,currency,value_net,value_gross
mc4,EUR,0,50
mc4,CHF,0,50
```

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                               |
|-------------------------|----------|-----------|--------------|------------------------------------------------|
| merchant_commission_key | ✓        | string    | mc4          | Unique key of the merchant commission.         |
| currency                | ✓        | string    | EUR          | Currency for the commission amount.            |
| value_net               | ✓        | int       | 0            | Net value of the merchant commission amount.   |
| value_gross             | ✓        | int       | 50           | Gross value of the merchant commission amount. |

4. Prepare the merchant commission merchant data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_commission_merchant.csv**

```csv
merchant_commission_key,merchant_reference
mc4,DE
mc4,AT
```

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                       |
|-------------------------|----------|-----------|--------------|----------------------------------------|
| merchant_commission_key | ✓        | string    | mc4          | Unique key of the merchant commission. |
| merchant_reference      | ✓        | string    | DE           | Reference to the merchant.             |

5. Prepare the merchant commission store data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_commission_store.csv**

```csv
merchant_commission_key,store_name
mc4,DE
mc4,AT
```

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                       |
|-------------------------|----------|-----------|--------------|----------------------------------------|
| merchant_commission_key | ✓        | string    | mc4          | Unique key of the merchant commission. |
| store_name              | ✓        | string    | DE           | Name of the store.                     |

6. Enable the data imports per your configuration. Example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: merchant-commission-group
      source: data/import/common/common/marketplace/merchant_commission_group.csv
    - data_entity: merchant-commission
      source: data/import/common/common/marketplace/merchant_commission.csv
    - data_entity: merchant-commission-merchant
      source: data/import/common/common/marketplace/merchant_commission_merchant.csv
    - data_entity: merchant-commission-amount
      source: data/import/common/DE/marketplace/merchant_commission_amount.csv
    - data_entity: merchant-commission-amount
      source: data/import/common/AT/marketplace/merchant_commission_amount.csv
    - data_entity: merchant-commission-store
      source: data/import/common/DE/marketplace/merchant_commission_store.csv
    - data_entity: merchant-commission-store
      source: data/import/common/AT/marketplace/merchant_commission_store.csv
```

7. Register the following data import plugins:

| PLUGIN                                     | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                                 |
|--------------------------------------------|--------------------------------------------------------------|---------------|---------------------------------------------------------------------------|
| MerchantCommissionGroupDataImportPlugin    | Imports merchant commission group data into the database.    |               | \Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionDataImportPlugin         | Imports merchant commission data into the database.          |               | \Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionAmountDataImportPlugin   | Imports merchant commission amount data into the database.   |               | \Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionStoreDataImportPlugin    | Imports merchant commission store data into the database.    |               | \Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionMerchantDataImportPlugin | Imports merchant commission merchant data into the database. |               | \Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport\MerchantCommissionAmountDataImportPlugin;
use Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport\MerchantCommissionDataImportPlugin;
use Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport\MerchantCommissionGroupDataImportPlugin;
use Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport\MerchantCommissionMerchantDataImportPlugin;
use Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport\MerchantCommissionStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantCommissionGroupDataImportPlugin(),
            new MerchantCommissionDataImportPlugin(),
            new MerchantCommissionAmountDataImportPlugin(),
            new MerchantCommissionStoreDataImportPlugin(),
            new MerchantCommissionMerchantDataImportPlugin(),
        ];
    }
}
```

8. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\MerchantCommissionDataImport\MerchantCommissionDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . MerchantCommissionDataImportConfig::IMPORT_TYPE_MERCHANT_COMMISSION_GROUP),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . MerchantCommissionDataImportConfig::IMPORT_TYPE_MERCHANT_COMMISSION),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . MerchantCommissionDataImportConfig::IMPORT_TYPE_MERCHANT_COMMISSION_AMOUNT),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . MerchantCommissionDataImportConfig::IMPORT_TYPE_MERCHANT_COMMISSION_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . MerchantCommissionDataImportConfig::IMPORT_TYPE_MERCHANT_COMMISSION_MERCHANT),
        ];

        return $commands;
    }
}
```

9. Import data:

```bash
console data:import:merchant-commission-group
console data:import:merchant-commission
console data:import:merchant-commission-amount
console data:import:merchant-commission-store
console data:import:merchant-commission-merchant
```

{% info_block warningBox "Verification" %}

Make sure the entities have been imported to the following database tables:

- `spy_merchant_commission_group`
- `spy_merchant_commission`
- `spy_merchant_commission_amount`
- `spy_merchant_commission_store`
- `spy_merchant_commission_merchant`

{% endinfo_block %}

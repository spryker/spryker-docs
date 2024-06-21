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

| MODULE                                    | EXPECTED DIRECTORY                                                      |
|-------------------------------------------|-------------------------------------------------------------------------|
| MerchantCommission                        | vendor/spryker/merchant-commission                                      |
| MerchantCommissionDataExport              | vendor/spryker/merchant-commission-data-export                          |
| MerchantCommissionDataImport              | vendor/spryker/merchant-commission-data-import                          |
| MerchantCommissionGui                     | vendor/spryker/merchant-commission-gui                                  |
| SalesMerchantCommission                   | vendor/spryker/sales-merchant-commission                                |
| SalesMerchantCommissionExtension          | vendor/spryker/sales-merchant-commission-extension                      |
| MerchantSalesOrderSalesMerchantCommission | vendor/spryker/merchant-sales-order-sales-merchant-commission           |
| MerchantSalesOrderSalesMerchantCommission | vendor/spryker/merchant-sales-order-sales-merchant-commission-extension |

{% endinfo_block %}

## 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                                      | SPECIFICATION                                                   | NAMESPACE                   |
|--------------------------------------------------------------------|-----------------------------------------------------------------|-----------------------------|
| MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE | Commission price mode configuration for a stores in the system. | \Pyz\Zed\MerchantCommission |
| MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION       | The list of merchants who are not subject to commissions.       | \Pyz\Zed\MerchantCommission |

**src/Pyz/Zed/MerchantCommission/MerchantCommissionConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\MerchantCommissionConfig as SprykerMerchantCommissionConfig;

class MerchantCommissionConfig extends SprykerMerchantCommissionConfig
{
    /**
     * @uses \Spryker\Shared\Calculation\CalculationPriceMode::PRICE_MODE_NET
     *
     * @var string
     */
    protected const PRICE_MODE_NET = 'NET_MODE';

    /**
     * @uses \Spryker\Shared\Calculation\CalculationPriceMode::PRICE_MODE_GROSS
     *
     * @var string
     */
    protected const PRICE_MODE_GROSS = 'GROSS_MODE';

    /**
     * @var array<string, string>
     */
    protected const MERCHANT_COMMISSION_PRICE_MODE_PER_STORE = [
        'DE' => self::PRICE_MODE_GROSS,
        'AT' => self::PRICE_MODE_GROSS,
        'US' => self::PRICE_MODE_GROSS,
    ];

    /**
     * @var list<string>
     */
    protected const EXCLUDED_MERCHANTS_FROM_COMMISSION = [
        'MER000001',
    ];
}

```

{% info_block warningBox "Verification" %}

Ensure that the price modes are properly defined for the stores that will be charging commission from the merchant in the marketplace.
This can be done by setting the `MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE` configuration.
(Important): The price mode must be set for the stores charging commission from the merchant!

Ensure that the merchants who are not subject to commissions are properly defined. 
This can be done by setting the `MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION` configuration. 
Usually this is used for the marketplace owner.

{% endinfo_block %}

## 3) Set up database schema and transfer objects

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

| TRANSFER                                     | TYPE     | EVENT   | PATH                                                                             |
|----------------------------------------------|----------|---------|----------------------------------------------------------------------------------|
| MerchantCommission                           | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionTransfer                         |
| MerchantCommissionGroup                      | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupTransfer                    |
| MerchantCommissionAmount                     | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountTransfer                   |
| MerchantCommissionCollection                 | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionTransfer               |
| MerchantCommissionCriteria                   | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCriteriaTransfer                 |
| MerchantCommissionConditions                 | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionConditionsTransfer               |
| MerchantCommissionCollectionRequest          | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionRequestTransfer        |
| MerchantCommissionCollectionResponse         | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCollectionResponseTransfer       |
| MerchantCommissionAmountCollection           | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountCollectionTransfer         |
| MerchantCommissionAmountCriteria             | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountCriteriaTransfer           |
| MerchantCommissionAmountConditions           | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountConditionsTransfer         |
| MerchantCommissionGroupCollection            | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupCollectionTransfer          |
| MerchantCommissionGroupCriteria              | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupCriteriaTransfer            |
| MerchantCommissionGroupConditions            | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionGroupConditionsTransfer          |
| MerchantCommissionCalculationRequest         | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCalculationRequestTransfer       |
| MerchantCommissionCalculationRequestItem     | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCalculationRequestItemTransfer   |
| MerchantCommissionCalculationResponse        | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCalculationResponseTransfer      |
| MerchantCommissionCalculationItem            | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCalculationItemTransfer          |
| MerchantCommissionCalculationTotals          | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionCalculationTotalsTransfer        |
| CollectedMerchantCommission                  | class    | Created | src/Generated/Shared/Transfer/CollectedMerchantCommissionTransfer                |
| MerchantCommissionAmountTransformerRequest   | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountTransformerRequestTransfer |
| MerchantCommissionAmountFormatRequest        | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountFormatRequestTransfer      |
| RuleEngineSpecificationProviderRequest       | class    | Created | src/Generated/Shared/Transfer/RuleEngineSpecificationProviderRequestTransfer     |
| RuleEngineSpecificationRequest               | class    | Created | src/Generated/Shared/Transfer/RuleEngineSpecificationRequestTransfer             |
| RuleEngineQueryStringValidationRequest       | class    | Created | src/Generated/Shared/Transfer/RuleEngineQueryStringValidationRequestTransfer     |
| RuleEngineQueryStringValidationResponse      | class    | Created | src/Generated/Shared/Transfer/RuleEngineQueryStringValidationResponseTransfer    |
| RuleEngineClause                             | class    | Created | src/Generated/Shared/Transfer/RuleEngineClauseTransfer                           |
| MerchantCommissionView                       | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionViewTransfer                     |
| MerchantCommissionAmountView                 | class    | Created | src/Generated/Shared/Transfer/MerchantCommissionAmountViewTransfer               |
| SalesMerchantCommission                      | class    | Created | src/Generated/Shared/Transfer/SalesMerchantCommissionTransfer                    |
| Item.merchantCommissionAmountAggregation     | property | created | src/Generated/Shared/Transfer/ItemTransfer                                       |
| Item.merchantCommissionAmountFullAggregation | property | created | src/Generated/Shared/Transfer/ItemTransfer                                       |
| Item.merchantCommissionRefundedAmount        | property | created | src/Generated/Shared/Transfer/ItemTransfer                                       |
| Totals.merchantCommissionTotal               | property | created | src/Generated/Shared/Transfer/TotalsTransfer                                     |
| Totals.merchantCommissionRefundedTotal       | property | created | src/Generated/Shared/Transfer/TotalsTransfer                                     |

{% endinfo_block %}

### 4) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_commission.validation.currency_does_not_exist,A currency with the code ‘%code%’ does not exist.,en_US
merchant_commission.validation.currency_does_not_exist,Eine Währung mit dem Code ‘%code%’ existiert nicht.,de_DE
merchant_commission.validation.merchant_commission_description_invalid_length,A merchant commission description must have a length from %min% to %max% characters.,en_US
merchant_commission.validation.merchant_commission_description_invalid_length,Die Beschreibung einer Händlerprovision muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
merchant_commission.validation.merchant_commission_key_exists,A merchant commission with the key ‘%key%’ already exists.,en_US
merchant_commission.validation.merchant_commission_key_exists,Es existiert bereits eine Händlerprovision mit dem Schlüssel ‘%key%’.,de_DE
merchant_commission.validation.merchant_commission_key_invalid_length,A merchant commission key must have a length from %min% to %max% characters.,en_US
merchant_commission.validation.merchant_commission_key_invalid_length,Ein Händlerprovisionsschlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
merchant_commission.validation.merchant_commission_key_is_not_unique,At least two merchant commissions in this request have the same key.,en_US
merchant_commission.validation.merchant_commission_key_is_not_unique,Mindestens zwei Händlerprovisionen in dieser Anfrage haben den gleichen Schlüssel.,de_DE
merchant_commission.validation.merchant_commission_does_not_exist,A merchant commission with the key ‘%key%’ was not found.,en_US
merchant_commission.validation.merchant_commission_does_not_exist,Die Händlerprovision mit dem Schlüssel ‘%key%’ wurde nicht gefunden.,de_DE
merchant_commission.validation.merchant_commission_group_does_not_exist,A merchant commission group was not found.,en_US
merchant_commission.validation.merchant_commission_group_does_not_exist,Es wurde keine Händlerprovisionsgruppe gefunden.,de_DE
merchant_commission.validation.merchant_commission_group_key_does_not_exist,A merchant commission group with the key "%key%" was not found.,en_US
merchant_commission.validation.merchant_commission_group_does_not_exist,Die Händlerprovisionsgruppe mit dem Schlüssel „%key%“ wurde nicht gefunden.,de_DE
merchant_commission.validation.merchant_does_not_exist,A merchant with the reference ‘%merchant_reference%’ does not exist.,en_US
merchant_commission.validation.merchant_does_not_exist,Ein Händler mit der Referenz ‘%merchant_reference%’ existiert nicht.,de_DE
merchant_commission.validation.merchant_commission_name_invalid_length,A merchant commission name must have a length from %min% to %max% characters.,en_US
merchant_commission.validation.merchant_commission_name_invalid_length,Der Händlerprovisionsname muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
merchant_commission.validation.merchant_commission_priority_not_in_range,A merchant commission priority must be within a range from %min% to %max%.,en_US
merchant_commission.validation.merchant_commission_priority_not_in_range,Die Priorität der Händlerprovision muss im Bereich von %min% bis %max% liegen.,de_DE
merchant_commission.validation.store_does_not_exist,A store with the name ‘%name%’ does not exist.,en_US
merchant_commission.validation.store_does_not_exist,Ein Shop mit dem Namen ‘%name%’ existiert nicht.,de_DE
merchant_commission.validation.merchant_commission_valid_from_invalid_datetime,A merchant commission ‘valid from’ date is not a valid format.,en_US
merchant_commission.validation.merchant_commission_valid_from_invalid_datetime,Das ‘Gültig von’-Datum ist nicht im gültigen Format.,de_DE
merchant_commission.validation.merchant_commission_valid_to_invalid_datetime,A merchant commission ‘valid to’ date is not a valid format.,en_US
merchant_commission.validation.merchant_commission_valid_to_invalid_datetime,Das ‘Gültig bis’-Datum ist nicht im gültigen Format.,de_DE
merchant_commission.validation.merchant_commission_validity_period_invalid,A merchant commission ‘valid to’ date must be later than the ‘valid from’ date.,en_US
merchant_commission.validation.merchant_commission_validity_period_invalid,Das ‘Gültig bis’-Datum muss nach dem ‘Gültig von’-Datum liegen.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 5) Import data

To import data follow the steps in the following sections.

#### Import merchant commission data

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

### 6) Configure navigation

1. Add the `MerchantCommissionGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant-commission-gui>
                <label>Merchant Commission</label>
                <title>Merchant Commission</title>
                <bundle>merchant_commission-gui</bundle>
                <controller>list</controller>
                <action>index</action>
            </merchant-commission-gui>
        </pages>
    </marketplace>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Back Office. Make sure there is the **Merchant Commissions** navigation menu item under the **Marketplace** menu item.

{% endinfo_block %}

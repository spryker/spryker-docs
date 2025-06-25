This document describes how to install the Marketplace Merchant Commission feature.

## Prerequisites

Install the required features:

| NAME                         | VERSION          | INSTALLATION GUIDE                                                                                                                                                                            |
|------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                 | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                   |
| Merchant                     | 202507.0 | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)                                            |
| Acl                          | 202507.0 | [Install the ACL feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-acl-feature.html)                                                          |
| Cart                         | 202507.0 | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                     |
| Order Management             | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)       |
| Marketplace Order Management | 202507.0 | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html) |
| Marketplace Merchant         | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

## 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant-commission:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                             | EXPECTED DIRECTORY                                                      |
|----------------------------------------------------|-------------------------------------------------------------------------|
| MerchantCommission                                 | vendor/spryker/merchant-commission                                      |
| MerchantCommissionDataExport                       | vendor/spryker/merchant-commission-data-export                          |
| MerchantCommissionDataImport                       | vendor/spryker/merchant-commission-data-import                          |
| MerchantCommissionGui                              | vendor/spryker/merchant-commission-gui                                  |
| SalesMerchantCommission                            | vendor/spryker/sales-merchant-commission                                |
| SalesMerchantCommissionExtension                   | vendor/spryker/sales-merchant-commission-extension                      |
| MerchantSalesOrderSalesMerchantCommission          | vendor/spryker/merchant-sales-order-sales-merchant-commission           |
| SalesPaymentMerchantSalesMerchantCommission        | vendor/spryker/sales-payment-merchant-sales-merchant-commission         |

{% endinfo_block %}

## 2) Set up configuration

1. Add the following configuration:

| CONFIGURATION                                                                       | SPECIFICATION                                                                                                                                                                                                                                                  | NAMESPACE                  |
|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| MerchantCommissionConfig::isMerchantCommissionPriceModeForStoreCalculationEnabled() | Specifies if `MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE` configuration should be used for merchant commission calculation. Using `MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE` for calculation is deprecated. | Pyz\Zed\MerchantCommission |
| MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION                        | The list of merchants who aren't subject to commissions.                                                                                                                                                                                                       | Pyz\Zed\MerchantCommission |
| RefundConfig::shouldCleanupRecalculationMessagesAfterRefund()                       | Sanitizes recalculation messages after refund if set to true.                                                                                                                                                                                                  | Pyz\Zed\Refund             |
| SalesConfig::shouldPersistModifiedOrderItemProperties()                             | Returns true if order items should be updated during order update.                                                                                                                                                                                             | Pyz\Zed\Sales              |

2. Configure the merchant commission price mode per store and the excluded merchants from the commission:

**src/Pyz/Zed/MerchantCommission/MerchantCommissionConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\MerchantCommissionConfig as SprykerMerchantCommissionConfig;

class MerchantCommissionConfig extends SprykerMerchantCommissionConfig
{
    /**
     * @var list<string>
     */
    protected const EXCLUDED_MERCHANTS_FROM_COMMISSION = [
        'MER000001',
    ];

    /**
     * @return bool
     */
    public function isMerchantCommissionPriceModeForStoreCalculationEnabled(): bool
    {
        return false;
    }
}
```

{% info_block warningBox "Verification" %}

To verify that the price modes per store configuration is disabled, place an order and trigger the merchant commission calculation step in OMS.
Merchant commission should be calculated according to the price mode of the order.

To verify that the merchants who aren't subject to commissions are properly defined, set
the `MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION` configuration.
Usually this is used for the marketplace owner.

{% endinfo_block %}

3. Configure the cleanup of recalculation messages after a refund:

**src/Pyz/Zed/Refund/RefundConfig.php**

```php
<?php

namespace Pyz\Zed\Refund;

use Spryker\Zed\Refund\RefundConfig as SprykerRefundConfig;

class RefundConfig extends SprykerRefundConfig
{
    /**
     * @return bool
     */
    public function shouldCleanupRecalculationMessagesAfterRefund(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Verify that the recalculation messages are properly cleaned up after a refund by setting
the `RefundConfig::shouldCleanupRecalculationMessagesAfterRefund()` configuration.

{% endinfo_block %}

4. Enable the persistence of the order item merchant commission data:

**src/Pyz/Zed/Sales/SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return bool
     */
    public function shouldPersistModifiedOrderItemProperties(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Verify that the order item merchant commission data is properly persisted by setting
the `SalesConfig::shouldPersistModifiedOrderItemProperties()` configuration.

{% endinfo_block %}

5. Configure the tax deduction for the store and price mode for the Merchant marketplace payment commission:

```php
<?php

namespace Pyz\Zed\SalesPaymentMerchantSalesMerchantCommission;

use Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\SalesPaymentMerchantSalesMerchantCommissionConfig as SprykerSalesPaymentMerchantSalesMerchantCommissionConfig;

class SalesPaymentMerchantSalesMerchantCommissionConfig extends SprykerSalesPaymentMerchantSalesMerchantCommissionConfig
{
    /**
     * @var array<string, array<string, bool>>
     */
    protected const TAX_DEDUCTION_ENABLED_FOR_STORE_AND_PRICE_MODE = [
        'DE' => [self::PRICE_MODE_GROSS => true, self::PRICE_MODE_NET => true],
        'AT' => [self::PRICE_MODE_GROSS => false, self::PRICE_MODE_NET => false],
        'US' => [self::PRICE_MODE_GROSS => true, self::PRICE_MODE_NET => true],
    ];
}
```

{% info_block warningBox "Verification" %}

- Make sure the tax deduction is properly configured for the store and price mode for the Merchant Payment Commission by
setting the `SalesPaymentMerchantSalesMerchantCommissionConfig::TAX_DEDUCTION_ENABLED_FOR_STORE_AND_PRICE_MODE`
configuration.
- Create an order with a marketplace payment and verify that the tax deduction is working as expected by checking the
details in the `spy_sales_payment_merchant_payout` and `spy_sales_payment_merchant_payout_reversal` tables.

{% endinfo_block %}

### Prepare order state machines for the Merchant Commission process

In this step, you can customize your order state machine to charge the Merchant Commission commissions.
This step prepares the `DummyPayment` and `MarketplacePayment01` state machines for the Merchant Commission process.

The `MerchantCommission/Calculate` command calculates the merchant commission for an order.

1. Define the `DummyMerchantCommission` sub process that executes the `MerchantCommission/Calculate` command:

**config/Zed/oms/DummySubprocess/DummyMerchantCommission01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyMerchantCommission">
        <states>
            <state name="commission calculated" display="oms.state.paid"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>paid</source>
                <target>commission calculated</target>
                <event>commission-calculate</event>
            </transition>

            <transition happy="true">
                <source>commission calculated</source>
                <target>tax pending</target>
                <target>commission-calculated</target>
            </transition>
        </transitions>

        <events>
            <event name="commission-calculate" onEnter="true" command="MerchantCommission/Calculate"/>
            <event name="commission-calculated" onEnter="true"/>
        </events>
    </process>

</statemachine>
```

The following is the `DummyPayment01` simplified state machine with the `DummyMerchantCommission` subprocess enabled:

**config/Zed/oms/DummyPayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyMerchantCommission</process>
        </subprocesses>
    </process>
    <process name="DummyMerchantCommission" file="DummySubprocess/DummyMerchantCommission01.xml"/>

</statemachine>
```

2. Define the `MarketplaceMerchantCommission` subprocess that executes the `MerchantCommission/Calculate` command:

**config/Zed/oms/DummySubprocess/DummyMarketplaceMerchantCommission01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplaceMerchantCommission">
        <states>
            <state name="commission calculated" display="oms.state.paid"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>paid</source>
                <target>commission calculated</target>
                <event>commission-calculate</event>
            </transition>

            <transition happy="true">
                <source>commission calculated</source>
                <target>merchant split pending</target>
                <target>commission-calculated</target>
            </transition>
        </transitions>

        <events>
            <event name="commission-calculate" onEnter="true" command="MerchantCommission/Calculate"/>
            <event name="commission-calculated" onEnter="true"/>
        </events>
    </process>

</statemachine>
```

The following is the `MarketplacePayment01` simplified state machine with the `MarketplaceMerchantCommission` subprocess enabled:

**config/Zed/oms/MarketplacePayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplacePayment01" main="true">

        <subprocesses>
            <process>DummyMarketplaceMerchantCommission</process>
        </subprocesses>
    </process>
    <process name="DummyMarketplaceMerchantCommission" file="DummySubprocess/DummyMarketplaceMerchantCommission01.xml"/>
</statemachine>
```

{% info_block warningBox "Verification" %}

Place an order to trigger the `DummyPayment01` and `MarketplacePayment01` state machines. Make sure the order goes through the steps and the merchant commissions are deducted correctly.

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

1. Append the glossary according to your configuration:

<details>
  <summary>src/data/import/glossary.csv</summary>

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
merchant_commission.validation.merchant_commission_group_does_not_exist,Die Händlerprovisionsgruppe mit dem Schlüssel „%key%" wurde nicht gefunden.,de_DE
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
merchant_commission.validation.invalid_query_string,The provided query string has an invalid format in %field%.,en_US
merchant_commission.validation.invalid_query_string,Die angegebene Abfragezeichenfolge hat ein ungültiges Format in %field%.,de_DE
merchant_commission.validation.invalid_compare_operator,The provided compare operator is invalid in %field%.,en_US
merchant_commission.validation.invalid_compare_operator,Der angegebene Vergleichsoperator ist ungültig in %field%.,de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## 5) Import data

To import data follow the steps in the following sections.

### Import merchant commission data

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
mc1,DE
mc1,AT
mc2,DE
mc2,AT
mc3,DE
mc3,AT
mc4,DE
mc4,AT
mc5,DE
mc5,AT
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

| PLUGIN                                     | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                                |
|--------------------------------------------|--------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| MerchantCommissionGroupDataImportPlugin    | Imports merchant commission group data into the database.    |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionDataImportPlugin         | Imports merchant commission data into the database.          |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionAmountDataImportPlugin   | Imports merchant commission amount data into the database.   |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionStoreDataImportPlugin    | Imports merchant commission store data into the database.    |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionMerchantDataImportPlugin | Imports merchant commission merchant data into the database. |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |

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
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
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

<details>
  <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

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
     * @return list<\Symfony\Component\Console\Command\Command>
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

</details>

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

## 6) Set up behavior

1. To enable the Marketplace ACL control, register the following plugins:

| PLUGIN                                                      | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                                                  |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------|
| SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin  | Expands a set of `AclEntityRule` transfer objects with sales merchant commission composite data.            |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal |
| SalesMerchantCommissionAclEntityConfigurationExpanderPlugin | Expands a provided `AclEntityMetadataConfig` transfer object with sales merchant commission composite data. |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal\SalesMerchantCommissionAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal\SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
     /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclEntityRuleExpanderPluginInterface>
     */
    protected function getMerchantAclEntityRuleExpanderPlugins(): array
    {
        return [
            new SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new SalesMerchantCommissionAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

2. To enable the Order Management related behavior, register the following plugins:

| PLUGIN                                                           | SPECIFICATION                                                                                                                                             | PREREQUISITES | NAMESPACE                                                                                           |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------|
| MerchantCommissionCalculatorPlugin                               | Recalculates merchant commissions for a given order, updating the `CalculableObjectTransfer` object with the new commission values for items and totals.  |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Calculation                                |
| SanitizeMerchantCommissionPreReloadPlugin                        | Sanitizes merchant commission related fields in quote for the reorder functionality.                                                                      |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal                          |
| UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin      | Calculates and persists the total merchant commission amounts for a newly created merchant order.                                                         |               | Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\MerchantSalesOrder       |
| SalesMerchantCommissionCalculationCommandByOrderPlugin           | Calculates and persists the merchant commissions for a given order, updating the order totals and order items with the calculated commission amounts.     |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Oms\Command                                |
| MerchantCommissionRefundPostSavePlugin                           | Processes the refund of merchant commissions after a refund has been saved, updating the relevant sales merchant commissions and recalculating the order. |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Refund                                     |
| MerchantCommissionOrderPostCancelPlugin                          | Handles the refund of merchant commissions when an order is cancelled, updating the relevant sales merchant commissions and recalculating the order.      |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Sales                                      |
| UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin | Updates the total and refunded merchant commission amounts in the order totals after a merchant commission refund.                                        |               | Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\SalesMerchantCommission; |

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Calculation\MerchantCommissionCalculatorPlugin;
use Spryker\Zed\Kernel\Container;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
   /**
     * This calculator plugin stack working with order object which happens to be created after order is placed
     *
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getOrderCalculatorPluginStack(Container $container): array
    {
        return [
            new MerchantCommissionCalculatorPlugin(),
        ];
    }

}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Cart\SanitizeMerchantCommissionPreReloadPlugin;
use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new SanitizeMerchantCommissionPreReloadPlugin(),
        ];
    }

}
```

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;
use Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\MerchantSalesOrder\UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderPostCreatePluginInterface>
     */
    protected function getMerchantOrderPostCreatePlugins(): array
    {
        return [
            new UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin(),
        ];
    }

}
```

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Oms\Command\SalesMerchantCommissionCalculationCommandByOrderPlugin;


class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new SalesMerchantCommissionCalculationCommandByOrderPlugin(), 'MerchantCommission/Calculate');

            return $commandCollection;
        });

        return $container;
    }
}
```

**src/Pyz/Zed/Refund/RefundDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Refund;

use Spryker\Zed\Refund\RefundDependencyProvider as SprykerRefundDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Refund\MerchantCommissionRefundPostSavePlugin;

class RefundDependencyProvider extends SprykerRefundDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RefundExtension\Dependency\Plugin\RefundPostSavePluginInterface>
     */
    protected function getRefundPostSavePlugins(): array
    {
        return [
            new MerchantCommissionRefundPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Sales\MerchantCommissionOrderPostCancelPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostCancelPluginInterface>
     */
    protected function getOrderPostCancelPlugins(): array
    {
        return [
            new MerchantCommissionOrderPostCancelPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesMerchantCommission/SalesMerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantCommission;

use Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\SalesMerchantCommission\UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin;
use Spryker\Zed\SalesMerchantCommission\SalesMerchantCommissionDependencyProvider as SprykerSalesMerchantCommissionDependencyProvider;

class SalesMerchantCommissionDependencyProvider extends SprykerSalesMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesMerchantCommissionExtension\Dependency\Plugin\PostRefundMerchantCommissionPluginInterface>
     */
    protected function getPostRefundMerchantCommissionPlugins(): array
    {
        return [
            new UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin(),
        ];
    }
}
```

3. To enable the merchant commission rule engine, register the following plugins:

| PLUGIN                                                         | SPECIFICATION                                                                                                                                                        | PREREQUISITES | NAMESPACE                                                              |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| MerchantCommissionItemCollectorRuleSpecificationProviderPlugin | Provides rule specifications for the collection of merchant commission items in the rule engine.                                                                     |               | Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine         |
| MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin | Provides rule specifications for decision-making regarding merchant commission orders in the rule engine.                                                            |               | Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine         |
| FixedMerchantCommissionCalculatorPlugin                        | Calculates merchant commissions based on a fixed amount, transforming and formatting the commission amount for persistence and display.                              |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| PercentageMerchantCommissionCalculatorPlugin                   | Calculates merchant commissions based on a percentage of the total amount, transforming, rounding, and formatting the commission amount for persistence and display. |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| ItemSkuMerchantCommissionItemCollectorRulePlugin               | Collects all items that match a given SKU in the rule engine.                                                                                                        |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| PriceModeMerchantCommissionOrderDecisionRulePlugin             | Checks if the price mode in the rule engine matches the one provided in the merchant commission calculation request.                                                 |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |

**src/Pyz/Zed/RuleEngine/RuleEngineDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\RuleEngine;

use Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine\MerchantCommissionItemCollectorRuleSpecificationProviderPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine\MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin;
use Spryker\Zed\RuleEngine\RuleEngineDependencyProvider as SprykerRuleEngineDependencyProvider;

class RuleEngineDependencyProvider extends SprykerRuleEngineDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\RuleSpecificationProviderPluginInterface>
     */
    protected function getRuleSpecificationProviderPlugins(): array
    {
        return [
            new MerchantCommissionItemCollectorRuleSpecificationProviderPlugin(),
            new MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\FixedMerchantCommissionCalculatorPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\PercentageMerchantCommissionCalculatorPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\ItemSkuMerchantCommissionItemCollectorRulePlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\PriceModeMerchantCommissionOrderDecisionRulePlugin;
use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantCommissionExtension\Communication\Dependency\Plugin\MerchantCommissionCalculatorPluginInterface>
     */
    protected function getMerchantCommissionCalculatorPlugins(): array
    {
        return [
            new FixedMerchantCommissionCalculatorPlugin(),
            new PercentageMerchantCommissionCalculatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new ItemSkuMerchantCommissionItemCollectorRulePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getRuleEngineDecisionRulePlugins(): array
    {
        return [
            new PriceModeMerchantCommissionOrderDecisionRulePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Place an order with products from different merchants.

2. In the `spy_sales_merchant_commission` database table, make sure merchants commissions have been applied to each
   merchant product in your order.
   The `spy_sales_merchant_commission` table should have entries similar to this:

| id_sales_merchant_commission | uuid | fk_sales_order | fk_sales_order_item | name  | amount | refunded_amount |
|------------------------------|------|----------------|---------------------|-------|--------|-----------------|
| 1                            | abcd | 123            | 1234                | Comm1 | 10     | 0               |
| 2                            | efgh | 124            | 1245                | Comm2 | 5      | 0               |

In this example, the `fk_sales_order` column corresponds to the sales order ID, `fk_sales_order_item` is the sales order
item ID, `name` is the name of the merchant commission, `amount` is the commission amount applied to that order item,
and `refunded_amount` is the amount of the commission that has been refunded.

3. To verify the commission calculation, make sure the commission amount for each order item matches the commission
   rules you've set up for each merchant.
   The commission amounts may vary depending on the commission rules you've set up for each merchant. If the commission
   amounts don't match your expectations, review the commission rules in the `spy_merchant_commission` table.

{% endinfo_block %}

4. To enable the merchant commission GUI, register the following plugins:

| PLUGIN                                   | SPECIFICATION                      | PREREQUISITES | NAMESPACE                                                                           |
|------------------------------------------|------------------------------------|---------------|-------------------------------------------------------------------------------------|
| DataExportMerchantCommissionExportPlugin | Exports merchant commissions data. |               | Spryker\Zed\MerchantCommissionDataExport\Communication\Plugin\MerchantCommissionGui |

**src/Pyz/Zed/MerchantCommissionGui/MerchantCommissionGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommissionGui;

use Spryker\Zed\MerchantCommissionDataExport\Communication\Plugin\MerchantCommissionGui\DataExportMerchantCommissionExportPlugin;
use Spryker\Zed\MerchantCommissionGui\MerchantCommissionGuiDependencyProvider as SprykerMerchantCommissionGuiDependencyProvider;
use Spryker\Zed\MerchantCommissionGuiExtension\Communication\Dependency\Plugin\MerchantCommissionExportPluginInterface;

class MerchantCommissionGuiDependencyProvider extends SprykerMerchantCommissionGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantCommissionGuiExtension\Communication\Dependency\Plugin\MerchantCommissionExportPluginInterface
     */
    protected function getMerchantCommissionExportPlugin(): MerchantCommissionExportPluginInterface
    {
        return new DataExportMerchantCommissionExportPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Marketplace** > **Merchant Commission**.
2. On the **Merchant Commission** page, click **Export**
   Make sure this exports merchant commissions correctly.

{% endinfo_block %}

5. To enable the sales merchant payment commission, register the following plugins:

| PLUGIN                                            | SPECIFICATION                                                           | PREREQUISITES                                                                       | NAMESPACE                                                      |
|---------------------------------------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------|
| PayoutAmountMerchantPayoutCalculatorPlugin        | Calculates the payout amount for the provided sales order item.         |                                                                                     | Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine |
| PayoutReverseAmountMerchantPayoutCalculatorPlugin | Calculates the payout reverse amount for the provided sales order item. |  | |

## Prerequisites

Install the required features:

| NAME                         | VERSION          | INSTALLATION GUIDE                                                                                                                                                                            |
|------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                 | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                   |
| Merchant                     | 202507.0 | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)                                            |
| Acl                          | 202507.0 | [Install the ACL feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-acl-feature.html)                                                          |
| Cart                         | 202507.0 | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                     |
| Order Management             | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)       |
| Marketplace Order Management | 202507.0 | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html) |
| Marketplace Merchant         | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

## 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant-commission:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                             | EXPECTED DIRECTORY                                                      |
|----------------------------------------------------|-------------------------------------------------------------------------|
| MerchantCommission                                 | vendor/spryker/merchant-commission                                      |
| MerchantCommissionDataExport                       | vendor/spryker/merchant-commission-data-export                          |
| MerchantCommissionDataImport                       | vendor/spryker/merchant-commission-data-import                          |
| MerchantCommissionGui                              | vendor/spryker/merchant-commission-gui                                  |
| SalesMerchantCommission                            | vendor/spryker/sales-merchant-commission                                |
| SalesMerchantCommissionExtension                   | vendor/spryker/sales-merchant-commission-extension                      |
| MerchantSalesOrderSalesMerchantCommission          | vendor/spryker/merchant-sales-order-sales-merchant-commission           |
| SalesPaymentMerchantSalesMerchantCommission        | vendor/spryker/sales-payment-merchant-sales-merchant-commission         |

{% endinfo_block %}

## 2) Set up configuration

1. Add the following configuration:

| CONFIGURATION                                                      | SPECIFICATION                                                      | NAMESPACE                  |
|--------------------------------------------------------------------|--------------------------------------------------------------------|----------------------------|
| MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE | Commission price mode configuration for stores in the system.      | Pyz\Zed\MerchantCommission |
| MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION       | The list of merchants who aren't subject to commissions.           | Pyz\Zed\MerchantCommission |
| RefundConfig::shouldCleanupRecalculationMessagesAfterRefund()      | Sanitizes recalculation messages after refund if set to true.      | Pyz\Zed\Refund             |
| SalesConfig::shouldPersistModifiedOrderItemProperties()            | Returns true if order items should be updated during order update. | Pyz\Zed\Sales              |

2. Configure the merchant commission price mode per store and the excluded merchants from the commission:

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
        'AT' => self::PRICE_MODE_NET,
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

To verify that the price modes are properly defined for the stores that will be charging commission from the merchant in
the marketplace, set the `MerchantCommissionConfig::MERCHANT_COMMISSION_PRICE_MODE_PER_STORE` configuration.
The price mode must be set for the stores charging commission from the merchant.

To verify that the merchants who aren't subject to commissions are properly defined, set
the `MerchantCommissionConfig::EXCLUDED_MERCHANTS_FROM_COMMISSION` configuration.
Usually this is used for the marketplace owner.

{% endinfo_block %}

3. Configure the cleanup of recalculation messages after a refund:

**src/Pyz/Zed/Refund/RefundConfig.php**

```php
<?php

namespace Pyz\Zed\Refund;

use Spryker\Zed\Refund\RefundConfig as SprykerRefundConfig;

class RefundConfig extends SprykerRefundConfig
{
    /**
     * @return bool
     */
    public function shouldCleanupRecalculationMessagesAfterRefund(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Verify that the recalculation messages are properly cleaned up after a refund by setting
the `RefundConfig::shouldCleanupRecalculationMessagesAfterRefund()` configuration.

{% endinfo_block %}

4. Enable the persistence of the order item merchant commission data:

**src/Pyz/Zed/Sales/SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return bool
     */
    public function shouldPersistModifiedOrderItemProperties(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Verify that the order item merchant commission data is properly persisted by setting
the `SalesConfig::shouldPersistModifiedOrderItemProperties()` configuration.

{% endinfo_block %}

5. Configure the tax deduction for the store and price mode for the Merchant Payment Commission:

```php
<?php

namespace Pyz\Zed\SalesPaymentMerchantSalesMerchantCommission;

use Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\SalesPaymentMerchantSalesMerchantCommissionConfig as SprykerSalesPaymentMerchantSalesMerchantCommissionConfig;

class SalesPaymentMerchantSalesMerchantCommissionConfig extends SprykerSalesPaymentMerchantSalesMerchantCommissionConfig
{
    /**
     * @var array<string, array<string, bool>>
     */
    protected const TAX_DEDUCTION_ENABLED_FOR_STORE_AND_PRICE_MODE = [
        'DE' => [self::PRICE_MODE_GROSS => true, self::PRICE_MODE_NET => true],
        'AT' => [self::PRICE_MODE_GROSS => false, self::PRICE_MODE_NET => false],
        'US' => [self::PRICE_MODE_GROSS => true, self::PRICE_MODE_NET => true],
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure the tax deduction is properly configured for the store and price mode for the Merchant Payment Commission by
setting the `SalesPaymentMerchantSalesMerchantCommissionConfig::TAX_DEDUCTION_ENABLED_FOR_STORE_AND_PRICE_MODE`
configuration.
Create an order with marketplace payment and verify that the tax deduction is working as expected by checking the
details in the `spy_sales_payment_merchant_payout` and `spy_sales_payment_merchant_payout_reversal` tables.

{% endinfo_block %}

### Prepare order state machines for the Merchant Commission process

In this step, you can customize your order state machine to charge the Merchant Commission commissions.
This step prepares the `DummyPayment` and `MarketplacePayment01` state machine for the Merchant Commission process.

The `MerchantCommission/Calculate` command calculates the merchant commission for an order.

1. Define the `DummyMerchantCommission` sub process that executes the `MerchantCommission/Calculate` command:

**config/Zed/oms/DummySubprocess/DummyMerchantCommission01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyMerchantCommission">
        <states>
            <state name="commission calculated" display="oms.state.paid"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>paid</source>
                <target>commission calculated</target>
                <event>commission-calculate</event>
            </transition>

            <transition happy="true">
                <source>commission calculated</source>
                <target>tax pending</target>
                <target>commission-calculated</target>
            </transition>
        </transitions>

        <events>
            <event name="commission-calculate" onEnter="true" command="MerchantCommission/Calculate"/>
            <event name="commission-calculated" onEnter="true"/>
        </events>
    </process>

</statemachine>
```

The following is the `DummyPayment01` simplified state machine with the `DummyMerchantCommission` sub process enabled:

**config/Zed/oms/DummyPayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyMerchantCommission</process>
        </subprocesses>
    </process>
    <process name="DummyMerchantCommission" file="DummySubprocess/DummyMerchantCommission01.xml"/>

</statemachine>
```

2. Define the `MarketplaceMerchantCommission` sub process that executes the `MerchantCommission/Calculate` command:

**config/Zed/oms/DummySubprocess/DummyMarketplaceMerchantCommission01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplaceMerchantCommission">
        <states>
            <state name="commission calculated" display="oms.state.paid"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>paid</source>
                <target>commission calculated</target>
                <event>commission-calculate</event>
            </transition>

            <transition happy="true">
                <source>commission calculated</source>
                <target>merchant split pending</target>
                <target>commission-calculated</target>
            </transition>
        </transitions>

        <events>
            <event name="commission-calculate" onEnter="true" command="MerchantCommission/Calculate"/>
            <event name="commission-calculated" onEnter="true"/>
        </events>
    </process>

</statemachine>
```

The following is the `MarketplacePayment01` simplified state machine with the `MarketplaceMerchantCommission` sub
process enabled:

**config/Zed/oms/MarketplacePayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplacePayment01" main="true">

        <subprocesses>
            <process>DummyMarketplaceMerchantCommission</process>
        </subprocesses>
    </process>
    <process name="DummyMarketplaceMerchantCommission" file="DummySubprocess/DummyMarketplaceMerchantCommission01.xml"/>
</statemachine>
```

{% info_block warningBox "Verification" %}

Place an order with the `DummyPayment01` and `MarketplacePayment01` state machines to verify that the Merchant
Commission process is working as expected.

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
merchant_commission.validation.merchant_commission_group_does_not_exist,Die Händlerprovisionsgruppe mit dem Schlüssel „%key%" wurde nicht gefunden.,de_DE
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
merchant_commission.validation.invalid_query_string,The provided query string has an invalid format in %field%.,en_US
merchant_commission.validation.invalid_query_string,Die angegebene Abfragezeichenfolge hat ein ungültiges Format in %field%.,de_DE
merchant_commission.validation.invalid_compare_operator,The provided compare operator is invalid in %field%.,en_US
merchant_commission.validation.invalid_compare_operator,Der angegebene Vergleichsoperator ist ungültig in %field%.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## 5) Import data

To import data follow the steps in the following sections.

### Import merchant commission data

{% info_block warningBox "" %}

Some of the commission rule expressions provided in the following examples are based on optional feature extensions. For commissions to work properly, these extensions need to be enabled:

- `item-price`: the condition for the order item from the [Install the Marketplace Merchant Commission + Prices feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-prices-feature.html).
- `category`: the condition for the order item from the [Install the Marketplace Merchant Commission + Category Management feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-category-management-feature.html).

All related extensions are listed in [Install related features](#install-related-features).

{% endinfo_block %}

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
| order_condition               |          | string    | price-mode = ""GROSS_MODE""                     | Condition for the order.                        |


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

| PLUGIN                                     | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                                |
|--------------------------------------------|--------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| MerchantCommissionGroupDataImportPlugin    | Imports merchant commission group data into the database.    |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionDataImportPlugin         | Imports merchant commission data into the database.          |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionAmountDataImportPlugin   | Imports merchant commission amount data into the database.   |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionStoreDataImportPlugin    | Imports merchant commission store data into the database.    |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |
| MerchantCommissionMerchantDataImportPlugin | Imports merchant commission merchant data into the database. |               | Spryker\Zed\MerchantCommissionDataImport\Communication\Plugin\DataImport |

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
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
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
     * @return list<\Symfony\Component\Console\Command\Command>
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

## 6) Set up behavior

1. To enable the Marketplace ACL control, register the following plugins:

| PLUGIN                                                      | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                                                  |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------|
| SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin  | Expands a set of `AclEntityRule` transfer objects with sales merchant commission composite data.            |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal |
| SalesMerchantCommissionAclEntityConfigurationExpanderPlugin | Expands a provided `AclEntityMetadataConfig` transfer object with sales merchant commission composite data. |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal\SalesMerchantCommissionAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal\SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
     /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclEntityRuleExpanderPluginInterface>
     */
    protected function getMerchantAclEntityRuleExpanderPlugins(): array
    {
        return [
            new SalesMerchantCommissionMerchantAclEntityRuleExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new SalesMerchantCommissionAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

2. To enable the Order Management related behavior, register the following plugins:

| PLUGIN                                                           | SPECIFICATION                                                                                                                                             | PREREQUISITES | NAMESPACE                                                                                           |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------|
| MerchantCommissionCalculatorPlugin                               | Recalculates merchant commissions for a given order, updating the `CalculableObjectTransfer` object with the new commission values for items and totals.  |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Calculation                                |
| SanitizeMerchantCommissionPreReloadPlugin                        | Sanitizes merchant commission related fields in quote for the reorder functionality.                                                                      |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\AclMerchantPortal                          |
| UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin      | Calculates and persists the total merchant commission amounts for a newly created merchant order.                                                         |               | Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\MerchantSalesOrder       |
| SalesMerchantCommissionCalculationCommandByOrderPlugin           | Calculates and persists the merchant commissions for a given order, updating the order totals and order items with the calculated commission amounts.     |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Oms\Command                                |
| MerchantCommissionRefundPostSavePlugin                           | Processes the refund of merchant commissions after a refund has been saved, updating the relevant sales merchant commissions and recalculating the order. |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Refund                                     |
| MerchantCommissionOrderPostCancelPlugin                          | Handles the refund of merchant commissions when an order is cancelled, updating the relevant sales merchant commissions and recalculating the order.      |               | Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Sales                                      |
| UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin | Updates the total and refunded merchant commission amounts in the order totals after a merchant commission refund.                                        |               | Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\SalesMerchantCommission; |

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Calculation\MerchantCommissionCalculatorPlugin;
use Spryker\Zed\Kernel\Container;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
   /**
     * This calculator plugin stack working with order object which happens to be created after order is placed
     *
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getOrderCalculatorPluginStack(Container $container): array
    {
        return [
            new MerchantCommissionCalculatorPlugin(),
        ];
    }

}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Cart\SanitizeMerchantCommissionPreReloadPlugin;
use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new SanitizeMerchantCommissionPreReloadPlugin(),
        ];
    }

}
```

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;
use Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\MerchantSalesOrder\UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderPostCreatePluginInterface>
     */
    protected function getMerchantOrderPostCreatePlugins(): array
    {
        return [
            new UpdateMerchantCommissionTotalsMerchantOrderPostCreatePlugin(),
        ];
    }

}
```

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Oms\Command\SalesMerchantCommissionCalculationCommandByOrderPlugin;


class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new SalesMerchantCommissionCalculationCommandByOrderPlugin(), 'MerchantCommission/Calculate');

            return $commandCollection;
        });

        return $container;
    }
}
```

**src/Pyz/Zed/Refund/RefundDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Refund;

use Spryker\Zed\Refund\RefundDependencyProvider as SprykerRefundDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Refund\MerchantCommissionRefundPostSavePlugin;

class RefundDependencyProvider extends SprykerRefundDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RefundExtension\Dependency\Plugin\RefundPostSavePluginInterface>
     */
    protected function getRefundPostSavePlugins(): array
    {
        return [
            new MerchantCommissionRefundPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesMerchantCommission\Communication\Plugin\Sales\MerchantCommissionOrderPostCancelPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostCancelPluginInterface>
     */
    protected function getOrderPostCancelPlugins(): array
    {
        return [
            new MerchantCommissionOrderPostCancelPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesMerchantCommission/SalesMerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantCommission;

use Spryker\Zed\MerchantSalesOrderSalesMerchantCommission\Communication\Plugin\SalesMerchantCommission\UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin;
use Spryker\Zed\SalesMerchantCommission\SalesMerchantCommissionDependencyProvider as SprykerSalesMerchantCommissionDependencyProvider;

class SalesMerchantCommissionDependencyProvider extends SprykerSalesMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesMerchantCommissionExtension\Dependency\Plugin\PostRefundMerchantCommissionPluginInterface>
     */
    protected function getPostRefundMerchantCommissionPlugins(): array
    {
        return [
            new UpdateMerchantCommissionTotalsPostRefundMerchantCommissionPlugin(),
        ];
    }
}
```

3. To enable the merchant commission rule engine, register the following plugins:

| PLUGIN                                                         | SPECIFICATION                                                                                                                                                        | PREREQUISITES | NAMESPACE                                                              |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| MerchantCommissionItemCollectorRuleSpecificationProviderPlugin | Provides rule specifications for the collection of merchant commission items in the rule engine.                                                                     |               | Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine         |
| MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin | Provides rule specifications for decision-making regarding merchant commission orders in the rule engine.                                                            |               | Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine         |
| FixedMerchantCommissionCalculatorPlugin                        | Calculates merchant commissions based on a fixed amount, transforming and formatting the commission amount for persistence and display.                              |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| PercentageMerchantCommissionCalculatorPlugin                   | Calculates merchant commissions based on a percentage of the total amount, transforming, rounding, and formatting the commission amount for persistence and display. |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| ItemSkuMerchantCommissionItemCollectorRulePlugin               | Collects all items that match a given SKU in the rule engine.                                                                                                        |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |
| PriceModeMerchantCommissionOrderDecisionRulePlugin             | Checks if the price mode in the rule engine matches the one provided in the merchant commission calculation request.                                                 |               | Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission |

**src/Pyz/Zed/RuleEngine/RuleEngineDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\RuleEngine;

use Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine\MerchantCommissionItemCollectorRuleSpecificationProviderPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\RuleEngine\MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin;
use Spryker\Zed\RuleEngine\RuleEngineDependencyProvider as SprykerRuleEngineDependencyProvider;

class RuleEngineDependencyProvider extends SprykerRuleEngineDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\RuleSpecificationProviderPluginInterface>
     */
    protected function getRuleSpecificationProviderPlugins(): array
    {
        return [
            new MerchantCommissionItemCollectorRuleSpecificationProviderPlugin(),
            new MerchantCommissionOrderDecisionRuleSpecificationProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\FixedMerchantCommissionCalculatorPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\PercentageMerchantCommissionCalculatorPlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\ItemSkuMerchantCommissionItemCollectorRulePlugin;
use Spryker\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\PriceModeMerchantCommissionOrderDecisionRulePlugin;
use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantCommissionExtension\Communication\Dependency\Plugin\MerchantCommissionCalculatorPluginInterface>
     */
    protected function getMerchantCommissionCalculatorPlugins(): array
    {
        return [
            new FixedMerchantCommissionCalculatorPlugin(),
            new PercentageMerchantCommissionCalculatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new ItemSkuMerchantCommissionItemCollectorRulePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getRuleEngineDecisionRulePlugins(): array
    {
        return [
            new PriceModeMerchantCommissionOrderDecisionRulePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the configured plugins have been registered and are working as expected.

Place an order with products from different merchants and make sure the following applies:

- In the `spy_sales_merchant_commission` database table, merchants commissions have been applied to each merchant product in the order.
- The commission amount for each order item matches the commission rules you've set up for each merchant.
   The commission amounts may vary depending on the commission rules you've set up for each merchant. If the commission
   amounts don't match your expectations, review the commission rules in the `spy_merchant_commission` table.
- The `spy_sales_merchant_commission` table has entries similar to the following:

| id_sales_merchant_commission | uuid | fk_sales_order | fk_sales_order_item | name  | amount | refunded_amount |
|------------------------------|------|----------------|---------------------|-------|--------|-----------------|
| 1                            | abcd | 123            | 1234                | Comm1 | 10     | 0               |
| 2                            | efgh | 124            | 1245                | Comm2 | 5      | 0               |

Column definitions in this example:
`fk_sales_order`
  Corresponds to the sales order ID.

`fk_sales_order_item`
  Sales order item ID.

`name`
  Name of the merchant commission.

`amount`
  Commission amount applied to that order item.

`refunded_amount`
  Amount of the commission that has been refunded.

{% endinfo_block %}

4. To enable the merchant commission GUI, register the following plugins:

| PLUGIN                                   | SPECIFICATION                      | PREREQUISITES | NAMESPACE                                                                           |
|------------------------------------------|------------------------------------|---------------|-------------------------------------------------------------------------------------|
| DataExportMerchantCommissionExportPlugin | Exports merchant commissions data. |               | Spryker\Zed\MerchantCommissionDataExport\Communication\Plugin\MerchantCommissionGui |

**src/Pyz/Zed/MerchantCommissionGui/MerchantCommissionGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommissionGui;

use Spryker\Zed\MerchantCommissionDataExport\Communication\Plugin\MerchantCommissionGui\DataExportMerchantCommissionExportPlugin;
use Spryker\Zed\MerchantCommissionGui\MerchantCommissionGuiDependencyProvider as SprykerMerchantCommissionGuiDependencyProvider;
use Spryker\Zed\MerchantCommissionGuiExtension\Communication\Dependency\Plugin\MerchantCommissionExportPluginInterface;

class MerchantCommissionGuiDependencyProvider extends SprykerMerchantCommissionGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantCommissionGuiExtension\Communication\Dependency\Plugin\MerchantCommissionExportPluginInterface
     */
    protected function getMerchantCommissionExportPlugin(): MerchantCommissionExportPluginInterface
    {
        return new DataExportMerchantCommissionExportPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Marketplace** > **Merchant Commission**.
2. On the **Merchant Commission** page, click **Export**
   Make sure this exports merchant commissions correctly.

{% endinfo_block %}

5. To enable the sales merchant payment commission, register the following plugins:

| PLUGIN                                            | SPECIFICATION                                                           | PREREQUISITES | NAMESPACE                                                                                         |
|---------------------------------------------------|-------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------|
| PayoutAmountMerchantPayoutCalculatorPlugin        | Calculates the payout amount for the provided sales order item.         |               | Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\Communication\Plugin\SalesPaymentMerchant |
| PayoutReverseAmountMerchantPayoutCalculatorPlugin | Calculates the payout reverse amount for the provided sales order item. |               | Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\Communication\Plugin\SalesPaymentMerchant |


**src/Pyz/Zed/SalesPaymentMerchant/SalesPaymentMerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesPaymentMerchant;

use Spryker\Zed\SalesPaymentMerchant\SalesPaymentMerchantDependencyProvider as SprykerSalesPaymentMerchantDependencyProvider;
use Spryker\Zed\SalesPaymentMerchantExtension\Communication\Dependency\Plugin\MerchantPayoutCalculatorPluginInterface;
use Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\Communication\Plugin\SalesPaymentMerchant\PayoutAmountMerchantPayoutCalculatorPlugin;
use Spryker\Zed\SalesPaymentMerchantSalesMerchantCommission\Communication\Plugin\SalesPaymentMerchant\PayoutReverseAmountMerchantPayoutCalculatorPlugin;

class SalesPaymentMerchantDependencyProvider extends SprykerSalesPaymentMerchantDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesPaymentMerchantExtension\Communication\Dependency\Plugin\MerchantPayoutCalculatorPluginInterface|null
     */
    protected function getMerchantPayoutAmountCalculatorPlugin(): ?MerchantPayoutCalculatorPluginInterface
    {
        return new PayoutAmountMerchantPayoutCalculatorPlugin();
    }

    /**
     * @return \Spryker\Zed\SalesPaymentMerchantExtension\Communication\Dependency\Plugin\MerchantPayoutCalculatorPluginInterface|null
     */
    protected function getMerchantPayoutReverseAmountCalculatorPlugin(): ?MerchantPayoutCalculatorPluginInterface
    {
        return new PayoutReverseAmountMerchantPayoutCalculatorPlugin();
    }
}
```

{% info_block warningBox "Verification" %}
Make sure the configured plugins have been registered and are working as expected:

1. Place an order with products from different merchants.
2. Pass the merchant payout stage for the order.
3. In the `spy_sales_payment_merchant_payout` database table, make sure the merchant payout amounts have been applied to each merchant product in your order.
4. Do the refund for the order.
5. In the `spy_sales_payment_merchant_payout_reversal` database table, make sure the refunded merchant payout amounts have been applied to each merchant product in your order.

{% endinfo_block %}

## 7) Configure navigation

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
                <bundle>merchant-commission-gui</bundle>
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

In the Back Office, make sure the **Marketplace** > **Merchant Commissions** navigation menu item is displayed.

{% endinfo_block %}


## Install related features

| FEATURE                                                                   | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                                                                    |
|---------------------------------------------------------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Install the Marketplace Merchant Commission + Category Management feature | 202507.0 | [Install the Marketplace Merchant Commission + Category Management feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-category-management-feature.html) |
| Install the Marketplace Merchant Commission + Prices feature              | 202507.0 | [Install the Marketplace Merchant Commission + Prices feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-prices-feature.html)                           |
| Install the Marketplace Merchant Commission + Product feature             | 202507.0 | [Install the Marketplace Merchant Commission + Product feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-product-feature.html)                         |

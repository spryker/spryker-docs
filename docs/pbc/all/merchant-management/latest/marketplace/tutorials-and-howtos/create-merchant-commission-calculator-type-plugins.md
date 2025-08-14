---
title: Create merchant commission calculator type plugins
description: Learn how to implement the Spryker merchant commission calculator type plugin to your Spryker Marketplace project.
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/merchant-management/latest/marketplace/tutorials-and-howtos/create-merchant-commission-calculator-type-plugins.html
last_updated: Jul 22, 2024
---

This document describes how to create and register a merchant commission calculator type plugin to provide custom calculation logic for merchant commissions.

Approximate time to complete: 1 hour.

## Prerequisites

[Install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html).


## 1) Adjust transfer definitions

1. To provide the required order item data, adjust the definition of the `MerchantCommissionCalculationRequestItem` transfer object. `MerchantCommissionCalculationRequestItemTransfer` is populated with data from the `spy_sales_order_item` database table. To provide the price to pay aggregation amount of the order item, add the `sumPriceToPayAggregation` property to the transfer object.

**src/Pyz/Shared/MerchantCommission/Transfer/merchant_commission.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="MerchantCommissionCalculationRequestItem" strict="true">
        <property name="sumPriceToPayAggregation" type="int"/>
    </transfer>

</transfers>
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

## 2) Implement the calculator business model

Implement a custom class to calculate merchant commission amount based on the order item's sum price to pay aggregation value; this class implements the `MerchantCommissionCalculatorTypeInterface` interface.


<details>
  <summary>src/Pyz/Zed/MerchantCommission/Business/Calculator/SumPriceToPayPercentageMerchantCommissionCalculatorType.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantCommission\Business\Calculator;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer;
use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\MerchantCommissionTransfer;
use Spryker\Zed\MerchantCommission\Business\Calculator\MerchantCommissionCalculatorTypeInterface;
use Spryker\Zed\MerchantCommission\MerchantCommissionConfig;

class SumPriceToPayPercentageMerchantCommissionCalculatorType implements MerchantCommissionCalculatorTypeInterface
{
    /**
     * @var \Spryker\Zed\MerchantCommission\MerchantCommissionConfig
     */
    protected MerchantCommissionConfig $merchantCommissionConfig;

    /**
     * @param \Spryker\Zed\MerchantCommission\MerchantCommissionConfig $merchantCommissionConfig
     */
    public function __construct(MerchantCommissionConfig $merchantCommissionConfig)
    {
        $this->merchantCommissionConfig = $merchantCommissionConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionTransfer $merchantCommissionTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     *
     * @return int
     */
    public function calculateMerchantCommissionAmount(
        MerchantCommissionTransfer $merchantCommissionTransfer,
        MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer,
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
    ): int {
        $merchantCommissionPercentAmount = $merchantCommissionTransfer->getAmountOrFail() / 100;
        if ($merchantCommissionPercentAmount <= 0) {
            return 0;
        }

        return $this->calculate(
            $merchantCommissionCalculationRequestItemTransfer->getSumPriceToPayAggregationOrFail(),
            $merchantCommissionPercentAmount,
        );
    }

    /**
     * @param int $sumPriceToPayAggregation
     * @param float $merchantCommissionPercentAmount
     *
     * @return int
     */
    protected function calculate(int $sumPriceToPayAggregation, float $merchantCommissionPercentAmount): int
    {
        $calculatedMerchantCommissionAmount = $sumPriceToPayAggregation * $merchantCommissionPercentAmount / 100;

        return (int)round(
            $calculatedMerchantCommissionAmount,
            0,
            $this->merchantCommissionConfig->getPercentageMerchantCommissionCalculationRoundMode(),
        );
    }
}
```

</details>

## 3) Introduce a facade method for the calculation logic

**src/Pyz/Zed/MerchantCommission/Business/MerchantCommissionBusinessFactory.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission\Business;

use Pyz\Zed\MerchantCommission\Business\Calculator\SumPriceToPayPercentageMerchantCommissionCalculatorType;
use Spryker\Zed\MerchantCommission\Business\Calculator\MerchantCommissionCalculatorTypeInterface;
use Spryker\Zed\MerchantCommission\Business\MerchantCommissionBusinessFactory as SprykerMerchantCommissionBusinessFactory;

/**
 * @method \Spryker\Zed\MerchantCommission\Persistence\MerchantCommissionEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MerchantCommission\MerchantCommissionConfig getConfig()
 * @method \Spryker\Zed\MerchantCommission\Persistence\MerchantCommissionRepositoryInterface getRepository()
 */
class MerchantCommissionBusinessFactory extends SprykerMerchantCommissionBusinessFactory
{
    /**
     * @return \Spryker\Zed\MerchantCommission\Business\Calculator\MerchantCommissionCalculatorTypeInterface
     */
    public function createSumPriceToPayPercentageMerchantCommissionCalculatorType(): MerchantCommissionCalculatorTypeInterface
    {
        return new SumPriceToPayPercentageMerchantCommissionCalculatorType($this->getConfig());
    }
}
```

**src/Pyz/Zed/MerchantCommission/Business/MerchantCommissionFacadeInterface.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission\Business;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer;
use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\MerchantCommissionTransfer;
use Spryker\Zed\MerchantCommission\Business\MerchantCommissionFacadeInterface as SprykerMerchantCommissionFacadeInterface;

interface MerchantCommissionFacadeInterface extends SprykerMerchantCommissionFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionTransfer $merchantCommissionTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     *
     * @return int
     */
    public function calculateSumPriceToPayPercentageMerchantCommissionAmount(
        MerchantCommissionTransfer $merchantCommissionTransfer,
        MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer,
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
    ): int;
}
```

**src/Pyz/Zed/MerchantCommission/Business/MerchantCommissionFacade.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission\Business;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer;
use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\MerchantCommissionTransfer;
use Spryker\Zed\MerchantCommission\Business\MerchantCommissionFacade as SprykerMerchantCommissionFacade;

/**
 * @method \Spryker\Zed\MerchantCommission\Persistence\MerchantCommissionEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\MerchantCommission\Persistence\MerchantCommissionRepositoryInterface getRepository()
 * @method \Pyz\Zed\MerchantCommission\Business\MerchantCommissionBusinessFactory getFactory()
 */
class MerchantCommissionFacade extends SprykerMerchantCommissionFacade implements MerchantCommissionFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionTransfer $merchantCommissionTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     *
     * @return int
     */
    public function calculateSumPriceToPayPercentageMerchantCommissionAmount(
        MerchantCommissionTransfer $merchantCommissionTransfer,
        MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer,
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
    ): int {
        return $this->getFactory()
            ->createSumPriceToPayPercentageMerchantCommissionCalculatorType()
            ->calculateMerchantCommissionAmount(
                $merchantCommissionTransfer,
                $merchantCommissionCalculationRequestItemTransfer,
                $merchantCommissionCalculationRequestTransfer,
            );
    }
}
```

## 4) Implement the calculator plugin

Implement the plugin that provides the logic to calculate the merchant commission amount and correct persisting and reading the merchant commission amount; the plugin implements the `MerchantCommissionCalculatorPluginInterface` interface and the following methods:

`getCalculatorType()`
  Returns the type of the calculator because it will be stored in the `spy_merchant_commission.calculator_plugin_type` database column.

`transformAmountForPersistence()`
  Transforms merchant commission amount before persisting. To avoid floating point precision issues, we recommend persisting the amount multiplied by 100.

`transformAmountFromPersistence()`
  Transforms the merchant commission amount after reading from the database.

`formatMerchantCommissionAmount()`
  Formats the merchant commission amount for displaying in the Back Office on the Merchant Commission Detail page.

<details>
  <summary>src/Pyz/Zed/MerchantCommission/Communication/Plugin/MerchantCommission/PriceToPayPercentageMerchantCommissionCalculatorPlugin.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantCommission\Communication\Plugin\MerchantCommission;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer;
use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\MerchantCommissionTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\MerchantCommissionExtension\Communication\Dependency\Plugin\MerchantCommissionCalculatorPluginInterface;

/**
 * @method \Pyz\Zed\MerchantCommission\MerchantCommissionConfig getConfig()
 * @method \Pyz\Zed\MerchantCommission\Business\MerchantCommissionFacadeInterface getFacade()
 * @method \Spryker\Zed\MerchantCommission\Communication\MerchantCommissionCommunicationFactory getFactory()
 */
class SumPriceToPayPercentageMerchantCommissionCalculatorPlugin extends AbstractPlugin implements MerchantCommissionCalculatorPluginInterface
{
    /**
     * @var string
     */
    protected const CALCULATOR_TYPE = 'sum-price-to-pay-percentage';

    /**
     * @return string
     */
    public function getCalculatorType(): string
    {
        return static::CALCULATOR_TYPE;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionTransfer $merchantCommissionTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     *
     * @return int
     */
    public function calculateMerchantCommission(
        MerchantCommissionTransfer $merchantCommissionTransfer,
        MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer,
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
    ): int {
        return $this->getFacade()->calculateSumPriceToPayPercentageMerchantCommissionAmount(
            $merchantCommissionTransfer,
            $merchantCommissionCalculationRequestItemTransfer,
            $merchantCommissionCalculationRequestTransfer,
        );
    }

    /**
     * @param float $merchantCommissionAmount
     *
     * @return int
     */
    public function transformAmountForPersistence(float $merchantCommissionAmount): int
    {
        return (int)round($merchantCommissionAmount * 100);
    }

    /**
     * @param int $merchantCommissionAmount
     *
     * @return float
     */
    public function transformAmountFromPersistence(int $merchantCommissionAmount): float
    {
        return round($merchantCommissionAmount / 100, 2);
    }

    /**
     * @param int $merchantCommissionAmount
     * @param string|null $currencyIsoCode
     *
     * @return string
     */
    public function formatMerchantCommissionAmount(int $merchantCommissionAmount, ?string $currencyIsoCode = null): string
    {
        return sprintf('%s %%', $this->transformAmountFromPersistence($merchantCommissionAmount));
    }
}
```

</details>

## 5) Register the calculator plugin

To register the plugin, add it to the `MerchantCommissionDependencyProvider::getMerchantCommissionCalculatorPlugins()` method.

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Pyz\Zed\MerchantCommission\Communication\Plugin\MerchantCommission\SumPriceToPayPercentageMerchantCommissionCalculatorPlugin;
use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantCommissionExtension\Communication\Dependency\Plugin\MerchantCommissionCalculatorPluginInterface>
     */
    protected function getMerchantCommissionCalculatorPlugins(): array
    {
        return [
            new SumPriceToPayPercentageMerchantCommissionCalculatorPlugin(),
        ];
    }
}
```

Now you can import merchant commissions with the calculator type plugin `sum-price-to-pay-percentage` and calculate commissions for items based on sum price to pay aggregation amount.

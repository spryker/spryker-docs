---
title: "Create Merchant Commission Collector Rule"
description: This articles provides details how to implement merchant commission collector rule
template: howto-guide-template
---

This document shows how to create and register a merchant commission collector rule you want to use.
Collector rules are used to collect items by specific criteria. Implementing and registering a `CollectorRulePlugin` allows you to build a particular query string used in the merchant commission's item condition and collect items that satisfy the condition.

## Prerequisites

To install the Spryker Core feature providing `RuleEngine` module, follow the [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)
To install the Marketplace Merchant Commission feature, follow the [Install the Marketplace Merchant Commission feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-merchant-commission-feature.html).

This guide will implement the merchant commission collector rule by order item discount amount. For this, we will introduce the `DiscountMerchantCommission` module and go step by step to implement the new collector rule.
Approximate time to complete: 2 hours.

## 1) Adjust transfer definitions

To provide the required order item data, we need to adjust the definition of the `MerchantCommissionCalculationRequestItem` transfer object.
`MerchantCommissionCalculationRequestItemTransfer` is populated with data taken from the `spy_sales_order_item` table, to provide the discount amount of the order item we only need to add a new property `discountAmountAggregation` to the transfer object.

**src/Pyz/Shared/DiscountMerchantCommission/Transfer/discount_merchant_commission.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="MerchantCommissionCalculationRequestItem" strict="true">
        <property name="discountAmountAggregation" type="int"/>
    </transfer>

</transfers>
```

Then run the command to generate the transfer objects:

```bash
console transfer:generate
```

## 2) Add RuleEngineFacade to the module's dependency provider

**src/Pyz/Zed/DiscountMerchantCommission/DiscountMerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class DiscountMerchantCommissionDependencyProvider extends AbstractBundleDependencyProvider
{
    /**
     * @var string
     */
    public const FACADE_RULE_ENGINE = 'FACADE_RULE_ENGINE';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = $this->addRuleEngineFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addRuleEngineFacade(Container $container): Container
    {
        $container->set(static::FACADE_RULE_ENGINE, function (Container $container) {
            return $container->getLocator()->ruleEngine()->facade();
        });

        return $container;
    }
}
```

## 3) Implement the collector rule

Implement a custom class that will be used to compare the order item discount amount against the provided clause.

**src/Pyz/Zed/DiscountMerchantCommission/Business/CollectorRule/DiscountAmountMerchantCommissionItemCollectorRuleInterface.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Business\CollectorRule;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\RuleEngineClauseTransfer;

interface DiscountAmountMerchantCommissionItemCollectorRuleInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return list<\Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer>
     */
    public function collect(
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer,
        RuleEngineClauseTransfer $ruleEngineClauseTransfer
    ): array;
}
```

**src/Pyz/Zed/DiscountMerchantCommission/Business/CollectorRule/DiscountAmountMerchantCommissionItemCollectorRule.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Business\CollectorRule;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer;
use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\RuleEngineClauseTransfer;
use Spryker\Zed\RuleEngine\Business\RuleEngineFacadeInterface;

class DiscountAmountMerchantCommissionItemCollectorRule implements DiscountAmountMerchantCommissionItemCollectorRuleInterface
{
    /**
     * @var \Spryker\Zed\RuleEngine\Business\RuleEngineFacadeInterface
     */
    protected RuleEngineFacadeInterface $ruleEngineFacade;

    /**
     * @param \Spryker\Zed\RuleEngine\Business\RuleEngineFacadeInterface $ruleEngineFacade
     */
    public function __construct(RuleEngineFacadeInterface $ruleEngineFacade)
    {
        $this->ruleEngineFacade = $ruleEngineFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return list<\Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer>
     */
    public function collect(
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer,
        RuleEngineClauseTransfer $ruleEngineClauseTransfer
    ): array {
        $clonedRuleEngineClauseTransfer = (new RuleEngineClauseTransfer())->fromArray($ruleEngineClauseTransfer->toArray());
        $clonedRuleEngineClauseTransfer = $this->convertDecimalToCent($clonedRuleEngineClauseTransfer);

        $collectedItems = [];
        foreach ($merchantCommissionCalculationRequestTransfer->getItems() as $merchantCommissionCalculationRequestItemTransfer) {
            if (
                $this->ruleEngineFacade->compare(
                    $clonedRuleEngineClauseTransfer,
                    $this->getUnitDiscountAmount($merchantCommissionCalculationRequestItemTransfer),
                )
            ) {
                $collectedItems[] = $merchantCommissionCalculationRequestItemTransfer;
            }
        }

        return $collectedItems;
    }

    /**
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return \Generated\Shared\Transfer\RuleEngineClauseTransfer
     */
    protected function convertDecimalToCent(RuleEngineClauseTransfer $ruleEngineClauseTransfer): RuleEngineClauseTransfer
    {
        return $ruleEngineClauseTransfer->setValue((int)($ruleEngineClauseTransfer->getValueOrFail() * 100));
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer
     *
     * @return int
     */
    protected function getUnitDiscountAmount(MerchantCommissionCalculationRequestItemTransfer $merchantCommissionCalculationRequestItemTransfer): int
    {
        return (int)($merchantCommissionCalculationRequestItemTransfer->getDiscountAmountFullAggregation() / $merchantCommissionCalculationRequestItemTransfer->getQuantityOrFail());
    }
}
```

## 4) Introduce a factory method to create the collector rule class

**src/Pyz/Zed/DiscountMerchantCommission/Business/DiscountMerchantCommissionBusinessFactory.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Business;

use Pyz\Zed\DiscountMerchantCommission\Business\CollectorRule\DiscountAmountMerchantCommissionItemCollectorRule;
use Pyz\Zed\DiscountMerchantCommission\Business\CollectorRule\DiscountAmountMerchantCommissionItemCollectorRuleInterface;
use Pyz\Zed\DiscountMerchantCommission\DiscountMerchantCommissionDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\RuleEngine\Business\RuleEngineFacadeInterface;

class DiscountMerchantCommissionBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\DiscountMerchantCommission\Business\CollectorRule\DiscountAmountMerchantCommissionItemCollectorRuleInterface
     */
    public function createDiscountAmountMerchantCommissionItemCollectorRule(): DiscountAmountMerchantCommissionItemCollectorRuleInterface
    {
        return new DiscountAmountMerchantCommissionItemCollectorRule($this->getRuleEngineFacade());
    }

    /**
     * @return \Spryker\Zed\RuleEngine\Business\RuleEngineFacadeInterface
     */
    public function getRuleEngineFacade(): RuleEngineFacadeInterface
    {
        return $this->getProvidedDependency(DiscountMerchantCommissionDependencyProvider::FACADE_RULE_ENGINE);
    }
}
```

## 5) Introduce a facade method to collect commissionable items by discount amount

**src/Pyz/Zed/DiscountMerchantCommission/Business/DiscountMerchantCommissionFacadeInterface.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Business;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\RuleEngineClauseTransfer;

interface DiscountMerchantCommissionFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return list<\Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer>
     */
    public function collectByDiscountAmount(
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer,
        RuleEngineClauseTransfer $ruleEngineClauseTransfer
    ): array;
}
```

**src/Pyz/Zed/DiscountMerchantCommission/Business/DiscountMerchantCommissionFacade.php**

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Business;

use Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer;
use Generated\Shared\Transfer\RuleEngineClauseTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\DiscountMerchantCommission\Business\DiscountMerchantCommissionBusinessFactory getFactory()
 */
class DiscountMerchantCommissionFacade extends AbstractFacade implements DiscountMerchantCommissionFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return list<\Generated\Shared\Transfer\MerchantCommissionCalculationRequestItemTransfer>
     */
    public function collectByDiscountAmount(
        MerchantCommissionCalculationRequestTransfer $merchantCommissionCalculationRequestTransfer,
        RuleEngineClauseTransfer $ruleEngineClauseTransfer
    ): array {
        return $this->getFactory()
            ->createDiscountAmountMerchantCommissionItemCollectorRule()
            ->collect($merchantCommissionCalculationRequestTransfer, $ruleEngineClauseTransfer);
    }
}
```

## 6) Implement the collector rule plugin

The plugin will call our `DiscountAmountMerchantCommissionItemCollectorRule` class to collect order items. In our example, the plugin only accepts the `number` data type, but you can adjust it to accept other data types, like `list` or `string`.
The `getFieldName()` method returns the field name as it is used in the item collector query string, e.g. `discount-amount >= '100'`.

```php
<?php

namespace Pyz\Zed\DiscountMerchantCommission\Communication\Plugin\MerchantCommission;

use Generated\Shared\Transfer\RuleEngineClauseTransfer;
use Spryker\Shared\Kernel\Transfer\TransferInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface;

/**
 * @method \Pyz\Zed\DiscountMerchantCommission\Business\DiscountMerchantCommissionFacadeInterface getFacade()
 */
class DiscountAmountMerchantCommissionItemCollectorRulePlugin extends AbstractPlugin implements CollectorRulePluginInterface
{
    /**
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface $collectableTransfer
     * @param \Generated\Shared\Transfer\RuleEngineClauseTransfer $ruleEngineClauseTransfer
     *
     * @return list<\Spryker\Shared\Kernel\Transfer\TransferInterface>
     */
    public function collect(TransferInterface $collectableTransfer, RuleEngineClauseTransfer $ruleEngineClauseTransfer): array
    {
        return $this->getFacade()->collectByDiscountAmount($collectableTransfer, $ruleEngineClauseTransfer);
    }

    /**
     * @return string
     */
    public function getFieldName(): string
    {
        return 'discount-amount';
    }

    /**
     * @return list<string>
     */
    public function acceptedDataTypes(): array
    {
        return ['number'];
    }
}
```

## 6) Register a new collector rule plugin

To register the plugin, add it to the `MerchantCommissionDependencyProvider::getRuleEngineCollectorRulePlugins()` method.

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Pyz\Zed\DiscountMerchantCommission\Communication\Plugin\MerchantCommission\DiscountAmountMerchantCommissionItemCollectorRulePlugin;
use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new DiscountAmountMerchantCommissionItemCollectorRulePlugin(),
        ];
    }
}
```

Now you can import merchant commissions with item conditions based on order item discount amount value and calculate commissions for collected items. 

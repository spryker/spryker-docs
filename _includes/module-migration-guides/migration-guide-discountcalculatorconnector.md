---
title: Migration guide - DiscountCalculatorConnector
description: Use the guide to migrate to a newer version of the DiscountCalculatorConnector module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-discount-calculator-connector
originalArticleId: 10be2d18-ad61-401e-870a-66d03e85e636
redirect_from:
  - /2021080/docs/mg-discount-calculator-connector
  - /2021080/docs/en/mg-discount-calculator-connector
  - /docs/mg-discount-calculator-connector
  - /docs/en/mg-discount-calculator-connector
  - /v1/docs/mg-discount-calculator-connector
  - /v1/docs/en/mg-discount-calculator-connector
  - /v2/docs/mg-discount-calculator-connector
  - /v2/docs/en/mg-discount-calculator-connector
  - /v3/docs/mg-discount-calculator-connector
  - /v3/docs/en/mg-discount-calculator-connector
  - /v4/docs/mg-discount-calculator-connector
  - /v4/docs/en/mg-discount-calculator-connector
  - /v5/docs/mg-discount-calculator-connector
  - /v5/docs/en/mg-discount-calculator-connector
  - /v6/docs/mg-discount-calculator-connector
  - /v6/docs/en/mg-discount-calculator-connector
  - /dev/module-migration-guides/201811.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/201903.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/201907.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202001.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202005.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202009.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202108.0/migration-guide-discountcalculatorconnector.html
related:
  - title: Migration guide - Discount
    link: docs/scos/dev/module-migration-guides/migration-guide-discount.html
  - title: Creating Vouchers
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/creating-vouchers.html
  - title: Migration guide - Tax
    link: docs/scos/dev/module-migration-guides/migration-guide-tax.html
  - title: Migration guide - DiscountSalesAggregatorConnector
    link: docs/scos/dev/module-migration-guides/migration-guide-discountsalesaggregatorconnector.html
---

## Upgrading from Version 4.* to Version 5.*

This module no longer has any calculator plugins, except  `DiscountCalculatorPlugin`. All other plugins were moved to the separate repository in `spryker/calculation-migration`.

To learn how to migrate to the new structure see, the [Upgrading from version 3.* to version 4.*](/docs/scos/dev/module-migration-guides/migration-guide-calculation.html#upgrading-from-version-3-to-version-4) section in *Migration Guide - Calculation*.

## Upgrading from Version 2.* to Version 3.*

The tax plugins are using the version 3.* of the Tax module. See [Migration Guide - Tax](/docs/scos/dev/module-migration-guides/migration-guide-tax.html) for more details.

A new tax calculator must be registered in  `CalculationDependencyProvider::getCalculatorStack()`.

Add `ExpenseTaxWithDiscountsCalculatorPlugin` to the discount calculator block, after `DiscountCalculatorPlugin`.

```php
//..
use Spryker\Zed\DiscountCalculationConnector\Communication\Plugin;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     * @return \Spryker\Zed\Calculation\Dependency\Plugin\CalculatorPluginInterface[]
     */
    protected function getCalculatorStack(Container $container)
    {
        return [
            .... other existing plugins .....

            new ExpenseTaxWithDiscountsCalculatorPlugin(),

        ];
    }
```

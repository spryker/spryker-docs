---
title: Upgrade the DiscountCalculatorConnector module
description: Use the guide to migrate to a newer version of the DiscountCalculatorConnector module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-discount-calculator-connector
originalArticleId: 10be2d18-ad61-401e-870a-66d03e85e636
redirect_from:
  - /dev/module-migration-guides/201811.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/201903.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/201907.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202001.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202005.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202009.0/migration-guide-discountcalculatorconnector.html
  - /dev/module-migration-guides/202108.0/migration-guide-discountcalculatorconnector.html
  - /docs/scos/dev/module-migration-guides/202311.0/migration-guide-discountcalculatorconnector.html  
  - /docs/pbc/all/discount-management/202311.0/install-and-upgrade/upgrade-the-discountcalculatorconnector-module.html  
  - /docs/pbc/all/discount-management/202311.0/base-shop/install-and-upgrade/upgrade-the-discountcalculatorconnector-module.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/install-and-upgrade/upgrade-the-discountcalculatorconnector-module.html
related:
  - title: Upgrade the Discount
    link: docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discount-module.html
  - title: Creating Vouchers
    link: docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html
  - title: Upgrade the DiscountSalesAggregatorConnector
    link: docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountsalesaggregatorconnector-module.html
---

## Upgrading from version 4.* to version 5.*

This module no longer has any calculator plugins, except  `DiscountCalculatorPlugin`. All other plugins were moved to the separate repository in `spryker/calculation-migration`.

To learn how to migrate to the new structure see, the [Upgrading from version 3.* to version 4.*](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-calculation-module.html#upgrading-from-version-3-to-version-4) section in *Upgrade the Calculation module*.

## Upgrading from version 2.* to version 3.*

The tax plugins are using the version 3.* of the Tax module. See [Upgrade the Tax module](/docs/pbc/all/tax-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-the-tax-module.html) for more details.

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

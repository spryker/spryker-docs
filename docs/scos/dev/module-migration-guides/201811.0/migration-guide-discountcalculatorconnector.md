---
title: Migration Guide - DiscountCalculatorConnector
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/mg-discount-calculator-connector
originalArticleId: 03c4f4c7-8bf4-4964-965e-1c949751a45e
redirect_from:
  - /v1/docs/mg-discount-calculator-connector
  - /v1/docs/en/mg-discount-calculator-connector
related:
  - title: Migration Guide - Discount
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-discount.html
  - title: Creating Vouchers
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/discount/creating-vouchers.html
  - title: Migration Guide - Tax
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-tax.html
  - title: Migration Guide - DiscountSalesAggregatorConnector
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-discountsalesaggregatorconnector.html
---

## Upgrading from Version 4.* to Version 5.*
This module no longer has any calculator plugins, except  `DiscountCalculatorPlugin`. All other plugins were moved to the separate repository in `spryker/calculation-migration`.

To learn how to migrate to the new structure see, the [Upgrading from version 3.* to version 4.*](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-calculation.html#upgrading-from-version-3---to-version-4--) section in *Migration Guide - Calculation*.

## Upgrading from Version 2.* to Version 3.*

The tax plugins are using the version 3.* of the Tax module. See [Migration Guide - Tax](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-tax.html) for more details. 

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

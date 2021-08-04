---
title: Migration Guide - DiscountCalculatorConnector
originalLink: https://documentation.spryker.com/v6/docs/mg-discount-calculator-connector
redirect_from:
  - /v6/docs/mg-discount-calculator-connector
  - /v6/docs/en/mg-discount-calculator-connector
---

## Upgrading from Version 4.* to Version 5.*
This module no longer has any calculator plugins, except  `DiscountCalculatorPlugin`. All other plugins were moved to the separate repository in `spryker/calculation-migration`.

To learn how to migrate to the new structure see, the [Upgrading from version 3.* to version 4.*](https://documentation.spryker.com/v4/docs/mg-calculation#upgrading-from-version-3---to-version-4--) section in *Migration Guide - Calculation*.

## Upgrading from Version 2.* to Version 3.*

The tax plugins are using the version 3.* of the Tax module. See [Migration Guide - Tax](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-tax) for more details. 

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

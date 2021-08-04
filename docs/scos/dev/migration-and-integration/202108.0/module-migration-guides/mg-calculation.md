---
title: Migration Guide - Calculation
originalLink: https://documentation.spryker.com/2021080/docs/mg-calculation
redirect_from:
  - /2021080/docs/mg-calculation
  - /2021080/docs/en/mg-calculation
---

## Upgrading from Version 3.* to Version 4.*

To upgrade from 3* to 4*, composer update your calculator to version 4.

**Updating Calculator Stacks**
In the new version there are two new calculator stacks, `getQuoteCalculatorPluginStack` and `getOrderCalculatorPluginStack`. They are both defined in `\Pyz\Zed\Calculation\CalculationDependencyProvider`.

{% info_block errorBox %}
In the previous version (3*
{% endinfo_block %}, the calculator stack was called `getCalculatorStack`. You must rename this method to `getQuoteCalculatorPluginStack`.)

By default the demoshop ships with these plugins. If you have your custom plugins, please add them accordingly, old and new calculators plugins are backwards compatible.
If you want to keep having old calculated fields, add the plugins to `getQuoteCalculatorPluginStack`. Take into consideration, that we recommend you discard old plugins and use the new ones.

**Code sample:**

```php
<?php
new ProductOptionGrossSumCalculatorPlugin(),
new ProductOptionTaxRateCalculatorPlugin(),
new SumGrossCalculatedDiscountAmountCalculatorPlugin(),
new ItemsWithProductOptionsAndDiscountsGrossPriceCalculatorPlugin(),
new ItemsWithProductOptionsAndDiscountsTaxCalculatorPlugin(),
new ExpenseTaxCalculatorPlugin(),
```

{% info_block errorBox %}
The old Calculator plugins were moved to the following separate repository: `spryker/calculation-migration`. Please include into your `composer.json` like `"spryker/calculation-migration": "dev-master"` and run composer update. This should enable you to use old plugins.
{% endinfo_block %}

The `Caclulator` module also returns `back sales.fk_customer, sales.fk_shipment_method, sales.shipment_delivery_time` - these are deprecated methods. To safely migrate them, see [Migration Guide - Sales](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-sales).

After this you should see new values calculated + legacy ones.

<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\Communication\Plugin\Calculator\DiscountAmountAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\DiscountTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ExpenseTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\GrandTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\InitialGrandTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemDiscountAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceToPayAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemProductOptionPriceAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemSubtotalAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemTaxAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RefundableAmountCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RefundTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RemoveAllCalculatedDiscountsCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\SubtotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\TaxTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RemoveTotalsCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\CanceledTotalCalculationPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\OrderTaxTotalCalculationPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountAfterCancellationCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxRateAverageAggregatorPlugin;
use Spryker\Zed\DiscountCalculationConnector\Communication\Plugin\DiscountCalculatorPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Calculation\CalculateBundlePricePlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\ProductOptionTaxRateCalculatorPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\ShipmentTaxRateCalculatorPlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\ProductItemTaxRateCalculatorPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{

    protected function getQuoteCalculatorPluginStack(Container $container)
       {
           return [
               new RemoveTotalsCalculatorPlugin(),
               new RemoveAllCalculatedDiscountsCalculatorPlugin(),

               new PriceCalculatorPlugin(),
               new ItemProductOptionPriceAggregatorPlugin(),
               new ItemSubtotalAggregatorPlugin(),

               new SubtotalCalculatorPlugin(),

               new InitialGrandTotalCalculatorPlugin(),
               new DiscountCalculatorPlugin(),
               new DiscountAmountAggregatorPlugin(),
               new ItemDiscountAmountFullAggregatorPlugin(),

               new ProductItemTaxRateCalculatorPlugin(),
               new ProductOptionTaxRateCalculatorPlugin(),
               new ShipmentTaxRateCalculatorPlugin(),
               new TaxAmountCalculatorPlugin(),
               new ItemTaxAmountFullAggregatorPlugin(),

               new PriceToPayAggregatorPlugin(),

               new TaxRateAverageAggregatorPlugin(),

               new RefundableAmountCalculatorPlugin(),

               new CalculateBundlePricePlugin(),

               new ExpenseTotalCalculatorPlugin(),
               new DiscountTotalCalculatorPlugin(),
               new RefundTotalCalculatorPlugin(),
               new GrandTotalCalculatorPlugin(),

               new TaxTotalCalculatorPlugin(),
           ];
       }

       protected function getOrderCalculatorPluginStack(Container $container)
       {
           return [

                   new PriceCalculatorPlugin(),
                   new ItemProductOptionPriceAggregatorPlugin(),
                   new ItemSubtotalAggregatorPlugin(),

                   new SubtotalCalculatorPlugin(),

                   new DiscountAmountAggregatorPlugin(),
                   new ItemDiscountAmountFullAggregatorPlugin(),

                   new PriceToPayAggregatorPlugin(),

                   new TaxAmountCalculatorPlugin(),
                   new ItemTaxAmountFullAggregatorPlugin(),
                   new TaxAmountAfterCancellationCalculatorPlugin(),

                   new RefundableAmountCalculatorPlugin(),

                   new ExpenseTotalCalculatorPlugin(),
                   new DiscountTotalCalculatorPlugin(),
                   new RefundTotalCalculatorPlugin(),
                   new CanceledTotalCalculationPlugin(),
                   new GrandTotalCalculatorPlugin(),

                   new OrderTaxTotalCalculationPlugin(),
           ];
       }
}
```

</br>
</details>

**Changing Displayed Calculated Values**
You may also want to change displayed calculated values in your twig templates.

Instead of using specific calculated fields, there are more generic fields provided with the new calculator version.

If you were using `ItemTransfer::unitGrossPrice` or `ProductOptionTransfer::unitGrossPrice`, replace this with `ItemTransfer::unitPrice` or `ProductOptionTransfer::unitPrice` - these values are used mostly in cart details, checkout summary or customer order details pages.

You also need to update <code>Price\` >= 4.\*</code> and <code>PriceCartConnector\` >= 3.\*</code> as they provide additional data to the quote transfer when "adding to cart". (`QuoteTransfer::priceMode`).

It is necessary only if you extended the `\Spryker\Zed\PriceCartConnector\Business\Manager\PriceManager` class, because you will receive this change when you update the module.

### Update Cart Expander Plugin CartItemPricePlugin
If you extended the core `CartItemPricePlugin`, adapt the following code:

**Code sample:**

```php
<?php
use Spryker\Shared\Price\PricePriceMode;
...
public function addGrossPriceToItems(CartChangeTransfer $cartChangeTransfer)
{
    $cartChangeTransfer->setQuote($this->setQuotePriceMode($cartChangeTransfer->getQuote()));
    ....
}

protected function setQuotePriceMode(QuoteTransfer $quoteTransfer)
{
    $quoteTransfer->setPriceMode(PricePriceMode::PRICE_MODE_GROSS);

    return $quoteTransfer;
}

?>
```

### Migrating Sales to the New Calculator Logic
To migrate all your orders, do the following:
1. Update Yves to use the new version of the `Calculator` module with the new Calculator plugins.
2. Update your schema by running the following SQL inserts:

{% info_block errorBox %}
By default, all data is nullable so you can easily run inserts. We will provide a migration script to make those fields not nullable after migration is done.
{% endinfo_block %}

**Code sample:**

```SQL
BEGIN;

CREATE SEQUENCE "spy_sales_order_totals_pk_seq";

CREATE TABLE "spy_sales_order_totals"
(
  "id_sales_order_totals" INTEGER NOT NULL,
  "fk_sales_order" INTEGER DEFAULT 0 NOT NULL,
  "subtotal" INTEGER DEFAULT 0,
  "order_expense_total" INTEGER DEFAULT 0,
  "discount_total" INTEGER DEFAULT 0,
  "grand_total" INTEGER DEFAULT 0,
  "refund_total" INTEGER DEFAULT 0,
  "canceled_total" INTEGER DEFAULT 0,
  "tax_total" INTEGER DEFAULT 0,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id_sales_order_totals")
);

ALTER TABLE "spy_sales_expense"

  ADD "net_price" INTEGER DEFAULT 0,

  ADD "price" INTEGER DEFAULT 0,

  ADD "discount_amount_aggregation" INTEGER DEFAULT 0,

  ADD "tax_amount" INTEGER DEFAULT 0,

  ADD "refundable_amount" INTEGER DEFAULT 0,

  ADD "price_to_pay_aggregation" INTEGER DEFAULT 0,

  ADD "tax_amount_after_cancellation" INTEGER DEFAULT 0;

ALTER TABLE "spy_sales_order"

    ADD "price_mode" INT2;

ALTER TABLE "spy_sales_order_item"

  ADD "net_price" INTEGER DEFAULT 0,

  ADD "price" INTEGER DEFAULT 0,

  ADD "subtotal_aggregation" INTEGER,

  ADD "tax_amount" INTEGER DEFAULT 0,

  ADD "tax_amount_full_aggregation" INTEGER DEFAULT 0,

  ADD "tax_rate_average_aggregation" NUMERIC(8,2),

  ADD "tax_amount_after_cancellation" INTEGER DEFAULT 0,

  ADD "product_option_price_aggregation" INTEGER DEFAULT 0,

  ADD "expense_price_aggregation" INTEGER DEFAULT 0,

  ADD "discount_amount_aggregation" INTEGER DEFAULT 0,

  ADD "discount_amount_full_aggregation" INTEGER DEFAULT 0,

  ADD "price_to_pay_aggregation" INTEGER DEFAULT 0,

  ADD "refundable_amount" INTEGER DEFAULT 0;

ALTER TABLE "spy_sales_order_item_bundle"

  ADD "net_price" INTEGER DEFAULT 0,

  ADD "price" INTEGER DEFAULT 0;

ALTER TABLE "spy_sales_order_item_option"

  ADD "net_price" INTEGER DEFAULT 0,

  ADD "price" INTEGER DEFAULT 0,

  ADD "discount_amount_aggregation" INTEGER DEFAULT 0,

  ADD "tax_amount" INTEGER DEFAULT 0;

ALTER TABLE "spy_sales_order_totals" ADD CONSTRAINT "spy_sales_order_totals-fk_sales_order"
FOREIGN KEY ("fk_sales_order")
REFERENCES "spy_sales_order" ("id_sales_order");

COMMIT;
```

3. Run console commands:
* `vendor/bin/console transfer:generate`
* `vendor/bin/console propel:diff`
* `vendor/bin/console propel:model:build`

{% info_block infoBox %}
You should now be able to persist an order with the new calculated values.
{% endinfo_block %}

### Sales Aggregation
`SalesAggregation` is no longer needed as we persist all calculated values.
Because `SalesAggregator` is not used, we added a new extension point when the order is read. At this point, you can enrich `OrderTransfer` with your own data.
`\Spryker\Zed\Sales\Dependency\Plugin\HydrateOrderPluginInterface` provides a new plugin interface to inject more data for an order.

<!-- See  for more information about the hydration plugins.--> 
There is also a list of "required by default" plugins. For out-of-the-box projects the following plugins should be configured as described below.

Create a class `Pyz\Zed\Sales\SalesDependencyProvider`, if not already created. Add the new method `SalesDependencyProvider::getOrderHydrationPlugins`.
Include two new hydrator plugins:

**Code sample:**

```php
<?php
    namespace Pyz\Zed\Sales;

    use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
    use Spryker\Zed\Discount\Communication\Plugin\Sales\DiscountOrderHydratePlugin;
    use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionOrderHydratePlugin;

    class SalesDependencyProvider extends SprykerSalesDependencyProvider
    {
        /**
         * @return array|/Spryker/Zed/Sales/Dependency/Plugin/HydrateOrderPluginInterface[]
         */
        protected function getHydrateOrderPlugins()
        {
            return [
                new ProductOptionOrderHydratePlugin(),
                new DiscountOrderHydratePlugin(),
            ];
        }
    }
?>    
```

After this, when you read an order using `SalesFacade::getOrderByIdSalesOrder()`, the above mentioned plugins will be called to populate the order with additional data,  in this case `ProductOptions` and `Discounts`.

{% info_block errorBox %}
The Sales module does not depend on the `SalesAggregator` anymore. Therefore, you need to remove the `/sales-aggregator/sales/list` from `\Pyz\Zed\Sales\SalesConfig::getSalesDetailExternalBlocksUrls` as it is no longer in use. Totals were moved to Sales to the template `Spryker/Zed/Sales/Presentation/Detail/boxes/totals.twig` available in Sales version >= 6.\*.
{% endinfo_block %}

### Template Changes in SalesBundle >= 6.\*:
Item and Item option display have been split into three separate template files:

1. `Spryker/Zed/Sales/Presentation/Detail/boxes/order-item.twig`
2. `Spryker/Zed/Sales/Presentation/Detail/boxes/order-item-option.twig`
3. `Spryker/Zed/Sales/Presentation/Detail/boxes/items.twig`

If you have modified these files, take into consideration how data formatting has changed. You will need to adapt your templates accordingly.
Also, update your `CheckoutDependency` provider to include the new expander plugin, which is registered in the new checkout preSave plugin, see Checkout Process.
This plugin expands quote items so each item has a single quantity, then runs order recalculate to have correctly distributed amounts. This is needed because after split has been made, some items may have rounding errors and we need to make sure that the tax and price to pay values are correct.

**To add a new plugin to `\Pyz\Zed\Checkout\CheckoutDependencyProvider`**

**Code sample:**
 
```php
<?php

   /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface[]
     */
    protected function getCheckoutPreSaveHooks(Container $container)
    {
        return [
            new SalesOrderExpanderPlugin()
        ];
    }
```

## Old Order Migration

To migrate old orders, use the deprecated `SalesAggregator` to populate the new table columns.
`SalesAggregator` has been deprecated and will be removed in the future. Till then, we will still provide future patches for it.
All `SalesAggregator` plugins were moved to the `SalesAggregator` module.

**The final core plugins list is:**

```php
<?php
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\DiscountTotalAmountWithProductOptionsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemsWithProductOptionsAndDiscountsTaxAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderDiscountsWithProductOptionsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderTaxAmountWithProductOptionsAndDiscountsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductOptionDiscountsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ExpenseTotalAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\GrandTotalAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemGrossPriceAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemTaxAmountAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpenseTaxAmountAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\SubtotalOrderAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductOptionsGrossPriceAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\SubtotalWithProductOptionsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\DiscountTotalAmountAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemDiscountsOrderAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderDiscountsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpensesWithDiscountsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpenseTaxWithDiscountsAggregatorPlugin;
use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderGrandTotalWithDiscountsAggregatorPlugin;
?>
```

If you want to receive future patches for the related plugins, it's recommended that you update all your used statements to point to the `SalesAggregator` module.
The modules `ProductOption`, `DiscountSalesAggregatorConnector`, `DiscountSalesAggregatorConnector` no longer store Aggregator plugins.

## Old Order Migration Guide
Use this guide as a reference when preparing migration script.
{% info_block errorBox %}
Before beginning, make a backup of your sales order data!
{% endinfo_block %}

### Console Command
We prepared a migration console command which will  populate your old orders with the new calculated values.
To download this console command, go to Console Command.
Register the following console command: `\Pyz\Zed\SalesAggregator\Communication\Console\SalesAggregatorMigrationConsole` in the Spryker Console module dependency provider: `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands` method.

**Code sample:**

```php
<?php
/**
  * @param \Spryker\Zed\Kernel\Container $container
  *
  * @return \Symfony\Component\Console\Command\Command[]
  */
 public function getConsoleCommands(Container $container)
 {
    $commands = [
      ...
      new SalesAggregatorMigrationConsole(),
    ];
 }

?>
```

{% info_block errorBox %}
**Please back up your data now!**
{% endinfo_block %}
You can now execute the command via `vendor/bin/console sales-aggregator:migrate` - you will be prompted to confirm before executing the migration.
Console command accepts an argument to make "dry run" by verifying if all data is correct, it compares aggregated and new calculated values.
If any order fails verification, it will be skipped and you will have to manually investigate and fix it.
Verification checks if values are still the same before/after the migration.
After the migration is complete, you can drop all use of `SalesAggregator`, as all values are already persisted. You can get the same results by using `SalesFacade::getOrderByIdSalesOrder()`.

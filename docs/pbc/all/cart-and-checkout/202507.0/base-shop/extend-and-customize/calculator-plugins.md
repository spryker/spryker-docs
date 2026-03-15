---
title: Calculator plugins
last_updated: Aug 12, 2021
description: This document covers the available calculator plugins along with their examples.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/cart-feature-walkthrough/calculator-plugins.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/cart-feature-walkthrough/calculator-plugins.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/extend-and-customize/calculator-plugins.html

---

Calculator plugins are registered in the `CalculationDependencyProvider::getQuoteCalculatorPluginStack()` for `QuoteTransfer` and `CalculationDependencyProvider::getOrderCalculatorPluginStack()`. In later versions of the Calculation module 4.00 and above, plugins are registered in `CalculationDependencyProvider::getQuoteCalculatorPluginStack()` for OrderTransfer.

This method can be extended on the project level and the plugin stack can be updated with your own plugins.

Each calculator must implement `CalculatorPluginInterface`.

```php
<?php
interface CalculationPluginInterface
{
/**
* @api
*
* @param /Generated/Shared/Transfer/CalculableObjectTransfer $calculableObjectTransfer
*
* @return void
*/
public function recalculate(CalculableObjectTransfer $calculableObjectTransfer);
}
```

- `RemoveTotalsCalculatorPlugin`—resets quote totals, sets TotalsTransfer empty.
- `RemoveAllCalculatedDiscountsCalculatorPlugin`—resets every CalculatedDiscountTransfer.
- `ItemGrossAmountsCalculatorPlugin`—calculates sumGrossPrice for each ItemTransfer.

    `ItemTransfer::sumGrossPrice = ItemTransfer::unitGrossPrice * ItemTransfer::quantity`

- `ProductOptionGrossSumCalculatorPlugin`—calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`.

    `ProductOptionTransfer::sumGrossPrice` = `ProductOptionTransfer::unitGrossPrice` * `ProductOptionTransfer::quantity`
    `ItemTransfer::unitGrossPriceWithProductOptions` = `sum(ProductOptionTransfer::unitGrossPrice)` + `ItemTransfer::unitGrossPrice`
    `ItemTransfer::sumGrossPriceWithProductOptions` = `sum(ProductOptionTransfer::sumGrossPrice)` + `ItemTransfer:sumGrossPrice`


- `SubtotalTotalsCalculatorPlugin` sums each of the `sumGrossPriceWithProductOptions` items.
`TotalsTransfer::subtotal = sum(ItemTransfer::sumGrossPriceWithProductOptions)`.

- `ExpensesGrossSumAmountCalculatorPlugin`—calculates `sumGrossPrice` for each item.

    `ExpenseTransfer::sumGrossPrice = ExpenseTransfer::unitGrossPrice * ExpenseTransfer::quantity`

- `ExpenseTotalsCalculatorPlugin`—calculates expenseTotal in TotalsTransfer.

    `TotalsTransfer::expenseTotal = sum(ExpenseTransfer::sumGrossPrice)`

- `DiscountCalculatorPlugin`—applies discounts to current `QuoteTransfer` for each discountable item with property `calculatedDiscounts`; gets discounts filled. Also `voucherDiscounts` and `cartRuleDiscounts` are populated with additional used discount data for order level.

    {% info_block infoBox "Discount Calculation" %}

    Discount calculation is a separate topic and is explained here Discount.

    {% endinfo_block %}

- `SumGrossCalculatedDiscountAmountCalculatorPlugin`—calculates and sets `ItemTransfer` amounts after discounts to `sumGrossPriceWithProductOptionAndDiscountAmounts` and `unitGrossPriceWithProductOptionAndDiscountAmounts`; sets expense amounts after discounts to `unitGrossPriceWithDiscounts` and `sumGrossPriceWithDiscounts`.

    `ItemTransfer::unitGrossPriceWithProductOptionAndDiscountAmounts` = `ItemTransfer::unitGrossPriceWithProductOptions` -  `(sum(ItemTransfer:calculatedDiscounts::unitGrossPrice)` + `sum(ProductOptionTransfer::calculatedDiscounts::unitGrossPrice))`
    `ItemTransfer::sumGrossPriceWithProductOptionAndDiscountAmounts` = `ItemTransfer::sumGrossPriceWithProductOptions` - `(sum(ItemTransfer:calculatedDiscounts::sumGrossPrice)` + `sum(ProductOptionTransfer::calculatedDiscounts::sumGrossPrice))`


- `DiscountTotalsCalculatorPlugin`—сalculates total for discounts used and sets it to `totalDiscount` in `TotalsTransfer`. Sum all discountable item `CalculatedDiscountTransfer` gross amounts:

    `TotalsTransfer:discountTotal` += `sum(ItemTransfer::CalculateDiscountTransfer::sumGrossAmount` +
    `ItemTransfer::ProductOptionTransfer::CalculateDiscountTransfer::sumGrossAmount` + `ExpenseTransfer::sumGrossAmount)`
    `GrandTotalTotalsCalculatorPlugin` calculates `grandTotal` in `TotalsTransfer`.
    `TotalsTransfer:grandTotal` = `TotalsTransfer::subtotal` + `TotalsTransfer:expenseTotal`


- `GrandTotalWithDiscountsCalculatorPlugin`—calculates `GrandTotal` after discounts in `TotalsTransfer`.

    `TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal - TotalsTransfer::discountTotal`

- `TaxTotalsCalculatorPlugin`—calculates `taxTotal` and `taxRate` used from `TotalTransfer::grandTotal`, sets it in `TotalsTransfer::TaxTotalsTransfer`.

    `TaxableItems = ItemTransfer, ProductOptionTransfer, ExpenseTransfer. TaxTotalsTransfer::taxRate = sum(TaxableItems) / TaxableItems TaxTotalsTransfer::taxAmount = round((TotalsTransfer::grandTotal * TaxTotalsTransfer::taxRate) / TaxTotalsTransfer::taxRate / 100)`

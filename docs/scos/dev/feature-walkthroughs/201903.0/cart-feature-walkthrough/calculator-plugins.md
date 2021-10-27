---
title: Calculator Plugins
description: The information in this topic covers the available calculator plugins along with their examples.
last_updated: Nov 22, 2019
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/v2/docs/calculator-plugins
originalArticleId: 50eff4d7-e9d9-4d5d-b229-87aa93960757
redirect_from:
  - /v2/docs/calculator-plugins
  - /v2/docs/en/calculator-plugins
related:
  - title: Calculation 3.0
    link: docs/scos/dev/feature-walkthroughs/page.version/cart-feature-walkthrough/calculation-3.0.html
  - title: Calculation Data Structure
    link: docs/scos/dev/feature-walkthroughs/page.version/cart-feature-walkthrough/calculation-data-structure.html
---

Calculator plugins are registered in the `CalculationDependencyProvider::getQuoteCalculatorPluginStack()` for `QuoteTransfer` and `CalculationDependencyProvider::getOrderCalculatorPluginStack()` or in later versions of the Calculation module 4.00 and above `CalculationDependencyProvider::getQuoteCalculatorPluginStack()` for OrderTransfer.

This method can be extended on the project level and the plugin stack can be updated with your own plugins.

Each calculator must implement `CalculatorPluginInterface`.

```php
<?php
interface CalculationPluginInterface
{
/**
* @api
*
* @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
*
* @return void
*/
public function recalculate(CalculableObjectTransfer $calculableObjectTransfer);
}
```

* **RemoveTotalsCalculatorPlugin** - Resets quote totals, sets TotalsTransfer empty.
* **RemoveAllCalculatedDiscountsCalculatorPlugin** - Resets every CalculatedDiscountTransfer.
* **ItemGrossAmountsCalculatorPlugin** - Calculates sumGrossPrice for each ItemTransfer.
`ItemTransfer::sumGrossPrice = ItemTransfer::unitGrossPrice * ItemTransfer::quantity`

* **ProductOptionGrossSumCalculatorPlugin** - Calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`.
    ```ProductOptionTransfer::sumGrossPrice = ProductOptionTransfer::unitGrossPrice * ProductOptionTransfer::quantity
    ItemTransfer::unitGrossPriceWithProductOptions = sum(ProductOptionTransfer::unitGrossPrice) + ItemTransfer::unitGrossPrice
    ItemTransfer::sumGrossPriceWithProductOptions = sum(ProductOptionTransfer::sumGrossPrice) + ItemTransfer:sumGrossPrice
    ```

* **SubtotalTotalsCalculatorPlugin** - Sums each of the `sumGrossPriceWithProductOptions` items.
`TotalsTransfer::subtotal = sum(ItemTransfer::sumGrossPriceWithProductOptions)`

* **ExpensesGrossSumAmountCalculatorPlugin** - Calculates `sumGrossPrice` for each item.
`ExpenseTransfer::sumGrossPrice = ExpenseTransfer::unitGrossPrice * ExpenseTransfer::quantity`

* **ExpenseTotalsCalculatorPlugin** - Calculates expenseTotal in TotalsTransfer.
`TotalsTransfer::expenseTotal = sum(ExpenseTransfer::sumGrossPrice)`

* **DiscountCalculatorPlugin** - Applies discounts to current `QuoteTransfer` each discountable item with property `calculatedDiscounts`, gets discounts filled. Also `voucherDiscounts` and `cartRuleDiscounts` are populated with additional used discount data for order level.
{% info_block infoBox "Discount Calculation" %}
Discount calculation is a separate topic and is explained here Discount.
{% endinfo_block %}

* **SumGrossCalculatedDiscountAmountCalculatorPlugin** - Calculates and sets `ItemTransfer` amounts after discounts to `sumGrossPriceWithProductOptionAndDiscountAmounts` and `unitGrossPriceWithProductOptionAndDiscountAmounts`; sets expense amounts after discounts to `unitGrossPriceWithDiscounts` and `sumGrossPriceWithDiscounts`.
    ```
    ItemTransfer::unitGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::unitGrossPriceWithProductOptions -  (sum(ItemTransfer:calculatedDiscounts::unitGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::unitGrossPrice))
    ItemTransfer::sumGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::sumGrossPriceWithProductOptions -  (sum(ItemTransfer:calculatedDiscounts::sumGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::sumGrossPrice))
    ```

* **DiscountTotalsCalculatorPlugin** - Calculates total for discounts used and sets it to totalDiscount in TotalsTransfer. Sum all discountable item CalculatedDiscountTransfer gross amounts:
    ```
    TotalsTransfer:discountTotal += sum(ItemTransfer::CalculateDiscountTransfer::sumGrossAmount +
    ItemTransfer::ProductOptionTransfer::CalculateDiscountTransfer::sumGrossAmount + ExpenseTransfer::sumGrossAmount)
    GrandTotalTotalsCalculatorPlugin - Calculates grandTotal in TotalsTransfer.
    TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal
    ```

* **GrandTotalWithDiscountsCalculatorPlugin** - Calculates `GrandTotal` after discounts in `TotalsTransfer`.
`TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal - TotalsTransfer::discountTotal`

* **TaxTotalsCalculatorPlugin** - Calculates `taxTotal` and `taxRate` used from `TotalTransfer::grandTotal`, sets it in `TotalsTransfer::TaxTotalsTransfer`.
`TaxableItems = ItemTransfer, ProductOptionTransfer, ExpenseTransfer. TaxTotalsTransfer::taxRate = sum(TaxableItems) / TaxableItems TaxTotalsTransfer::taxAmount = round((TotalsTransfer::grandTotal * TaxTotalsTransfer::taxRate) / TaxTotalsTransfer::taxRate / 100)`

<!--**See also:**

* Calculation
* Calculation Data Structure-->

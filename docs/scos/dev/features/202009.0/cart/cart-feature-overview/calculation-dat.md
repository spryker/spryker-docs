---
title: Calculation data structure
originalLink: https://documentation.spryker.com/v6/docs/calculation-data-structure
redirect_from:
  - /v6/docs/calculation-data-structure
  - /v6/docs/en/calculation-data-structure
---

The following diagram illustrates the Calculation data structure.

![Calculation Data Structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Calculation/Calculation+Data+Structure/calculation.png){height="" width=""}

## Quote Transfer
QuoteTransfer is the main data transfer object used in Cart, Calculation, Checkout and when order is placed. This object is created when first item is added to the cart.

The entire data object is stored into the session and it consists of:

| Field | Description |
| --- | --- |
| totals ([TotalsTransfer](https://documentation.spryker.com/docs/calculation-data-structure#totals-transfer))|Order totals.|
|items ([ItemTransfer](https://documentation.spryker.com/docs/calculation-data-structure#item-transfer)[])|CartItem collection.|
|voucherDiscounts ([DiscountTransfer](https://documentation.spryker.com/docs/calculation-data-structure#discount-transfer)[])||
|cartRuleDiscounts ([DiscountTransfer](https://documentation.spryker.com/docs/calculation-data-structure#discount-transfer)[])||
|expenses ([ExpenseTransfer](https://documentation.spryker.com/docs/calculation-data-structure#expensetransfer))||
|priceMode (int) | Quote object's price mode. |

### Totals Transfer

TotalsTransfer is a data object holding cart totals, subtotal, expenses (shipping), discount total and grand total. Here should the amounts for order level be stored.

| Field | Description |
| --- | --- |
| subtotal (int)|Calculated total amount before taxes and discounts. Is set by `SubtotalCalculatorPlugin`.|
|expenseTotal (int)|Total expenses amount (shipping). It is set by `ExpenseTotalCalculatorPlugin`.|
|discountTotal (int)|Total discount amount. It is set by `DiscountTotalCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](https://documentation.spryker.com/docs/calculation-data-structure#tax-total-transfer))|Tax totals for current cart. Is set by `TaxTotalCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It is set by `GrandTotalCalculatorPlugin` calculator plugin.|
|refundTotal (int)|Total refundable amount. It is set by `RefundTotalCalculatorPlugin` calculator plugin.|
|canceledTotal (int)|Total canceled amount. It is set by `CanceledTotalCalculationPlugin` calculator plugin.|
|hash (string)|Hash from total values to identify amount changes. It is set by `GrandTotalCalculatorPlugin`. |

### Tax Total Transfer

**TaxTotalsTransfer** holds the taxRate and taxAmount used for the grandTotal.

| Field | Description |
| --- | --- |
| amount (int)|Current tax amount from grandTotal. |

### Item Transfer

**ItemTransfer** is a cart item transfer, holds single product information.

| Field | Description |
| --- | --- |
| quantity (int)|Number of items selected|
|unitGrossPrice (int)|Single item gross price set with `CartItemPricePlugin` (cart expander).|
|sumGrossPrice (int)|Sum of item's gross price, calculated with `PriceCalculatorPlugin`.|
|unitNetPrice (int) | Single item net price, set with `CartItemPricePlugin` (cart expander). |
| sumNetPrice (int) | Sum of items net price, calculated with `PriceCalculatorPlugin`. |
| unitPrice (int) | Single item price without assuming is it new or gross, this value should be used everywhere the price is displayed, it allows switching tax mode without side effects. It's set with `CartItemPricePlugin` (cart expander). |
| sumPrice (int) | Sum of item's price calculated with `PriceCalculatorPlugin`. |
| taxRate (float) | Current tax rate, set by `ProductItemTaxRateCalculatorPlugin`. |
| refundableAmount (int) | Item available refundable amount (order only), set by `RefundableAmountCalculatorPlugin`. |
| unitTaxAmount (int) | Tax amount for single item after discounts, set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | Tax amount for sum of items (order only), set by `TaxAmountCalculatorPlugin`. |
| [Calculated Discount Transfer](https://documentation.spryker.com/docs/calculation-data-structure#calculated-discount-transfer) [] | Item calculated discount collection, set by `DiscountCalculatorPlugin`. |
| canceledAmount (int) | Canceled amount for this item (order only), set by refund, when refund occurs. |
| unitTaxAmountFullAggregation (int) | Total tax amount for given item with additions, set by `ItemTaxAmountFullAggregatorPlugin`. |
| sumTaxAmountFullAggregation (int) | Total tax amount for given sum of items with additions, set by `ItemTaxAmountFullAggregatorPlugin`. |
| unitProductOptionAggregation (int) | Item price with product options, set by `ItemProductOptionPriceAggregatorPlugin`. |
| sumProductOptionAggregation (int) | Sum Item price with product options, set by `ItemProductOptionPriceAggregatorPlugin`. |
| unitDiscountAmountAggregation (int) | Item total discount amount, set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int)|Sum Item total discount amount, set by `DiscountAmountAggregatorPlugin`.|
|unitDiscountAmountFullAggregation (int)|Item total discount amount with additions, set by `ItemDiscountAmountFullAggregatorPlugin`.|
|sumDiscountAmountFullAggregation (int)|Sum Item total discount amount with additions, set by `ItemDiscountAmountFullAggregatorPlugin`.|
|unitPriceToPayAggregation (int)|Item total price to pay after discounts with additions, set by `PriceToPayAggregatorPlugin`.|
|sumPriceToPayAggregation (int)|Sum Item total price to pay after discounts with additions, set by `PriceToPayAggregatorPlugin`.|
|taxRateAverageAggregation (float)|Item tax rate average, with additions used when recalculating tax amount after cancellation, set by `TaxRateAverageAggregatorPlugin`.|
|taxAmountAfterCancellation (int)|Tax amount after cancellation, recalculated using tax average, set by `TaxAmountAfterCancellationCalculatorPlugin`. |

## Calculated Discount Transfer
Each item which can have discounts applied has a `calculatedDiscounts` property which holds collection of discounts for each discount type.

| Field | Description |
| --- | --- |
| displayName (string)|Applied discount name|
|description (string)|Applied discount description|
|voucherCode (string)|Used voucher code|
|quantity(int)|Number of discounted items|
|unitGrossAmount (int)|Discount gross amount for single items, set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int)|Discount gross amount for sum of items, set by `DiscountCalculatorPlugin`. |

## Product Option Transfer
ProductOptionTransfer, some items may have product option collection attached which also have amounts calculated.

| Field | Description |
| --- | --- |
| idSalesOrderItemOption (int)|Sales order item ID option stored after the order is placed.|
|unitGrossPrice (int)|single item gross price. It’s set by `CartItemProductOptionPlugin` (cart expander).|
|sumGrossPrice (int)|sum of items gross price. It’s set by `PriceCalculatorPlugin` (cart expander).|
|unitNetPrice (int)|Single item net price. It's set by CartItemProductOptionPlugin (cart expander)|
|sumNetPrice (int)|sum of items net price. It's set by `PriceCalculatorPlugin` (cart expander).|
|unitPrice (int)|single item price without assuming is it new or gross, this value should be used everywhere where price is displayed, it allows switching tax mode without side effects. It's set by `PriceCalculatorPlugin` cart expander|
|taxRate (float)|Tax rate in percentage. It’s set by `ProductOptionTaxRateCalculatorPlugin` (cart expander).|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](https://documentation.spryker.com/docs/calculation-data-structure#calculated-discount-transfer))|Product Option calculated discount collection. It’s set by `DiscountCalculatorPlugin`.|
|refundableAmount (int)|Item available refundable amount (order only), set by `RefundableAmountCalculatorPlugin`.|
|unitTaxAmount (int)|Tax amount for single product option (order only), set by `TaxAmountCalculatorPlugin`.|
|sumTaxAmount (int)|Tax amount for sum of product options (order only), set by `TaxAmountCalculatorPlugin`.|
|unitDiscountAmountAggregation (int)|Product option total discount amount, set by `DiscountAmountAggregatorPlugin`.|
|sumDiscountAmountAggregation (int)|Sum of product option total discount amount, set by `DiscountAmountAggregatorPlugin`. |

## Discount Transfer
DiscountTransfer, is a collection of discounts used in all QuoteTransfer discountable items such as `voucherDiscounts` and `cartRuleDiscounts`.

| Field | Description |
| --- | --- |
| amount (int)|total discount amount used for this discount type. It’s set by `DiscountCalculatorPlugin`. |

## ExpenseTransfer

| Field | Description |
| --- | --- |
| sumGrossPrice (int) | Sum of item gross price, set by `PriceCalculatorPlugin`. |
| unitGrossPrice (string) | Single expense price. e.g.: shipment expenses are set in the `Checkout ShipmentStep`. |
| sumNetPrice (int) | Sum of item net price, set by `PriceCalculatorPlugin`. |
| unitNetPrice (string) | Single net price. e.g.: shipment expenses are set in the `Checkout ShipmentStep`. |
| taxRate (float) | Tax in percents, set by `ShipmentTaxRateCalculatorPlugin`. |
| unitPrice (int) | Single item price without assuming is it new or gross, this value should be used everywhere where price is displayed, it allows switching tax mode without side effects, set by `PriceCalculatorPlugin` (cart expander). |
| sumPrice (int) | Sum of items price, set by `PriceCalculatorPlugin` (cart expander). |
| [Calculated Discount Transfer](https://documentation.spryker.com/docs/calculation-data-structure#calculated-discount-transfer) | List of applied discounts for this item.|
|quantity (int) | Number of items. |
| refundableAmount (int) | Total refundable amount for this item (order only), set by `RefundableAmountCalculatorPlugin`. |
| canceledAmount (int) | Total canceled amount for this item (order only), set by refund. |
| unitTaxAmount (int) | Tax amount for single item after discounts, set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | Tax amount for sum of items after discounts, set by `TaxAmountCalculatorPlugin`. |
| unitDiscountAmountAggregation (int) | Expense total discount amount, set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int) | Sum of expense total discount amount, set by `DiscountAmountAggregatorPlugin`. |

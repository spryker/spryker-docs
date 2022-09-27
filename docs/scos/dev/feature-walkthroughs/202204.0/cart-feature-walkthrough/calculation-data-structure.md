---
title:  Calculation data structure
last_updated: Aug 12, 2021
description: This document describes calculation data structure
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/cart-feature-walkthrough/calculation-data-structure.html
---

The following diagram illustrates the calculation data structure.
![calculation-data-structure-diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Calculation/Calculation+Data+Structure/calculation.png)

## Quote transfer

`QuoteTransfer` is the main data transfer object used in Cart, Calculation, and Checkout, as well as when an order is placed. This object is created when the first item is added to the cart.

The entire data object is stored into the session, and it consists of the following fields:

| FIELD | DESCRIPTION |
| --- | --- |
| totals ([TotalsTransfer](#totals-transfer))|Order totals.|
|items ([ItemTransfer](#item-transfer)[])|CartItem collection.|
|voucherDiscounts ([DiscountTransfer](#discount-transfer)[])||
|cartRuleDiscounts ([DiscountTransfer](#discount-transfer)[])||
|expenses ([ExpenseTransfer](#expense-transfer))||
|priceMode (int) | Quote object's price mode. |

### Totals transfer

`TotalsTransfer` is a data object holding cart totals, subtotal, expenses (shipping), discount total, and grand total. Amounts for the order level are stored here.

| FIELD | DESCRIPTION |
| --- | --- |
| subtotal (int)|Calculated total amount before taxes and discounts. It's set by `SubtotalCalculatorPlugin`.|
|expenseTotal (int)|Total expenses amount (shipping). It's set by `ExpenseTotalCalculatorPlugin`.|
|discountTotal (int)|Total discount amount. It's set by `DiscountTotalCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](#tax-total-transfer))|Tax totals for current cart. It's set by `TaxTotalCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It's set by `GrandTotalCalculatorPlugin` calculator plugin.|
|refundTotal (int)|Total refundable amount. It's set by `RefundTotalCalculatorPlugin` calculator plugin.|
|canceledTotal (int)|Total canceled amount. It's set by `CanceledTotalCalculationPlugin` calculator plugin.|
|hash (string)|Hash from total values to identify amount changes. It's set by `GrandTotalCalculatorPlugin`. |

### Tax total transfer

`TaxTotalsTransfer` holds `taxRate` and `taxAmount` used for the `grandTotal`.

| FIELD | DESCRIPTION |
| --- | --- |
| amount (int)|Current tax amount from `grandTotal`. |

### Item transfer

`ItemTransfer` is a cart item transfer, which holds single product information.

| FIELD | DESCRIPTION |
| --- | --- |
| quantity (int)|Number of items selected.|
|unitGrossPrice (int)|Single item gross price set with `CartItemPricePlugin` (cart expander).|
|sumGrossPrice (int)|Sum of item's gross price, calculated with `PriceCalculatorPlugin`.|
|unitNetPrice (int) | Single item net price, set with `CartItemPricePlugin` (cart expander). |
| sumNetPrice (int) | Sum of items net price, calculated with `PriceCalculatorPlugin`. |
| unitPrice (int) | Single item price without assuming whether it is new or gross. This value must be used everywhere the price is displayed. It lets you switch tax mode without side effects. It's set with `CartItemPricePlugin` (cart expander). |
| sumPrice (int) | Sum of item's price calculated with `PriceCalculatorPlugin`. |
| taxRate (float) | Current tax rate set by `ProductItemTaxRateCalculatorPlugin`. |
| refundableAmount (int) | Item available refundable amount (order only). It's set by `RefundableAmountCalculatorPlugin`. |
| unitTaxAmount (int) | Tax amount for a single item after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | Tax amount for a sum of items (order only). It's set by `TaxAmountCalculatorPlugin`. |
| [Calculated Discount Transfer](#calculated-discount-transfer) [] | Item calculated discount collection. It's set by `DiscountCalculatorPlugin`. |
| canceledAmount (int) | Canceled amount for this item (order only). It's set by the refund when the refund occurs. |
| unitTaxAmountFullAggregation (int) | Total tax amount for a given item with additions. It's set by `ItemTaxAmountFullAggregatorPlugin`. |
| sumTaxAmountFullAggregation (int) | Total tax amount for a given sum of items with additions. It's set by `ItemTaxAmountFullAggregatorPlugin`. |
| unitProductOptionAggregation (int) | Item price with product options. It's set by `ItemProductOptionPriceAggregatorPlugin`. |
| sumProductOptionAggregation (int) | Sum Item price with product options. It's set by `ItemProductOptionPriceAggregatorPlugin`. |
| unitDiscountAmountAggregation (int) | Item total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int)|Sum Item total discount amount. It's set by `DiscountAmountAggregatorPlugin`.|
|unitDiscountAmountFullAggregation (int)|Item total discount amount with additions. It's set by `ItemDiscountAmountFullAggregatorPlugin`.|
|sumDiscountAmountFullAggregation (int)|Sum Item total discount amount with additions. It's set by `ItemDiscountAmountFullAggregatorPlugin`.|
|unitPriceToPayAggregation (int)|Item total price to pay after discounts with additions. It's set by `PriceToPayAggregatorPlugin`.|
|sumPriceToPayAggregation (int)|Sum Item total price to pay after discounts with additions. It's set by `PriceToPayAggregatorPlugin`.|
|taxRateAverageAggregation (float)|Item tax rate average, with additions used when recalculating tax amount after cancellation. It's set by `TaxRateAverageAggregatorPlugin`.|
|taxAmountAfterCancellation (int)|Tax amount after cancellation, recalculated using tax average and set by `TaxAmountAfterCancellationCalculatorPlugin`. |

## Calculated discount transfer

Each item that can have discounts applied has the `calculatedDiscounts` property, which holds the collection of discounts for each discount type.

| FIELD | DESCRIPTION |
| --- | --- |
|displayName (string)|Applied discount name.|
|description (string)|Applied discount description.|
|voucherCode (string)|Used voucher code.|
|quantity(int)|Number of discounted items.|
|unitGrossAmount (int)|Discount gross amount for single items. It's set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int)|Discount gross amount for a sum of items. It's set by `DiscountCalculatorPlugin`. |

## Product option transfer

`ProductOptionTransfer`: some items may have product option collection attached to them, which also have amounts calculated.

| FIELD | DESCRIPTION |
| --- | --- |
| idSalesOrderItemOption (int)|Sales order item ID option stored after the order is placed.|
|unitGrossPrice (int)|Single item gross price. It's set by `CartItemProductOptionPlugin` (cart expander).|
|sumGrossPrice (int)|Sum of items gross price. It's set by `PriceCalculatorPlugin` (cart expander).|
|unitNetPrice (int)|Single item net price. It's set by CartItemProductOptionPlugin (cart expander)|
|sumNetPrice (int)|Sum of items net price. It's set by `PriceCalculatorPlugin` (cart expander).|
|unitPrice (int)|Single item price without assuming whether it's new or gross. This value must be used everywhere where the price is displayed. It lets you switch tax mode without side effects. It's set by `PriceCalculatorPlugin` (cart expander).|
|taxRate (float)|Tax rate in percent. It's set by `ProductOptionTaxRateCalculatorPlugin` (cart expander).|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Product Option calculated discount collection. It's set by `DiscountCalculatorPlugin`.|
|refundableAmount (int)|Item available refundable amount (order only). It's set by `RefundableAmountCalculatorPlugin`.|
|unitTaxAmount (int)|Tax amount for single product option (order only). It's set by `TaxAmountCalculatorPlugin`.|
|sumTaxAmount (int)|Tax amount for a sum of product options (order only). It's set by `TaxAmountCalculatorPlugin`.|
|unitDiscountAmountAggregation (int)|Product option total discount amount. It's set by `DiscountAmountAggregatorPlugin`.|
|sumDiscountAmountAggregation (int)|Sum of product option total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |

## Discount transfer

`DiscountTransfer` is a collection of discounts used in all `QuoteTransfer` discountable items such as `voucherDiscounts` and `cartRuleDiscounts`.

| FIELD | DESCRIPTION |
| --- | --- |
| amount (int)|Total discount amount used for this discount type. It's set by `DiscountCalculatorPlugin`. |

## Expense transfer

| FIELD | DESCRIPTION |
| --- | --- |
| sumGrossPrice (int) | Sum of item gross price. It's set by `PriceCalculatorPlugin`. |
| unitGrossPrice (string) | Single expense price—for example, shipment expenses are set in `Checkout ShipmentStep`. |
| sumNetPrice (int) | Sum of item net price. It's set by `PriceCalculatorPlugin`. |
| unitNetPrice (string) | Single net price—for example, shipment expenses are set in `Checkout ShipmentStep`. |
| taxRate (float) | Tax in percent. It's set by `ShipmentTaxRateCalculatorPlugin`. |
| unitPrice (int) | Single item price without assuming whether it's new or gross. This value must be used everywhere where the price is displayed. It lets you switch tax mode without side effects. It's set by `PriceCalculatorPlugin` (cart expander). |
| sumPrice (int) | Sum of items price. It's set by `PriceCalculatorPlugin` (cart expander). |
| [Calculated Discount Transfer](#calculated-discount-transfer) | List of applied discounts for this item.|
|quantity (int) | Number of items. |
| refundableAmount (int) | Total refundable amount for this item (order only). It's set by `RefundableAmountCalculatorPlugin`. |
| canceledAmount (int) | Total canceled amount for this item (order only). It's set by the refund. |
| unitTaxAmount (int) | Tax amount for a single item after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | Tax amount for a sum of items after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| unitDiscountAmountAggregation (int) | Expense total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int) | Sum of expense total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |

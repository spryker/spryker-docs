---
title: Calculation data structure
last_updated: Aug 12, 2021
description: This document describes calculation data structure
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/cart-feature-walkthrough/calculation-data-structure.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/cart-feature-walkthrough/calculation-data-structure.html
  - /docs/pbc/all/cart-and-checkout/202304.0/base-shop/extend-and-customize/calculation-data-structure.html
---

The following diagram illustrates the calculation data structure.
![calculation-data-structure-diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Calculation/Calculation+Data+Structure/calculation.png)

## Quote transfer

`QuoteTransfer` is the main data transfer object used in Cart, Calculation, and Checkout, as well as when an order is placed. This object is created when the first item is added to the cart.

The entire data object is stored in the session, and it consists of the following fields:

| FIELD | DESCRIPTION |
| --- | --- |
| totals ([TotalsTransfer](#totals-transfer))|The total of the order.|
|items ([ItemTransfer](#item-transfer)[])|The CartItem collection.|
|voucherDiscounts ([DiscountTransfer](#discount-transfer)[])||
|cartRuleDiscounts ([DiscountTransfer](#discount-transfer)[])||
|expenses ([ExpenseTransfer](#expense-transfer))||
|priceMode (int) |The quote object's price mode. |

### Totals transfer

`TotalsTransfer` is a data object holding cart totals, subtotal, expenses (shipping), discount total, and grand total. Amounts for the order level are stored here.

| FIELD | DESCRIPTION |
| --- | --- |
| subtotal (int)|The calculated total amount before taxes and discounts. It's set by `SubtotalCalculatorPlugin`.|
|expenseTotal (int)|The total expenses amount (shipping). It's set by `ExpenseTotalCalculatorPlugin`.|
|discountTotal (int)|The total discount amount. It's set by `DiscountTotalCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](#tax-total-transfer))|The tax totals for current cart. It's set by `TaxTotalCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It's set by `GrandTotalCalculatorPlugin` calculator plugin.|
|refundTotal (int)|The total refundable amount. It's set by `RefundTotalCalculatorPlugin` calculator plugin.|
|canceledTotal (int)|The total canceled amount. It's set by `CanceledTotalCalculationPlugin` calculator plugin.|
|hash (string)|The hash from total values to identify amount changes. It's set by `GrandTotalCalculatorPlugin`. |

### Tax total transfer

`TaxTotalsTransfer` holds `taxRate` and `taxAmount` used for the `grandTotal`.

| FIELD | DESCRIPTION |
| --- | --- |
| amount (int)|The current tax amount from `grandTotal`. |

### Item transfer

`ItemTransfer` is a cart item transfer, which holds single product information.

| FIELD | DESCRIPTION |
| --- | --- |
| quantity (int)|The number of items selected.|
|unitGrossPrice (int)|A single item gross price set with `CartItemPricePlugin` (cart expander).|
|sumGrossPrice (int)|The sum of item's gross price, calculated with `PriceCalculatorPlugin`.|
|unitNetPrice (int) | A single item net price, set with `CartItemPricePlugin` (cart expander). |
| sumNetPrice (int) | The sum of items net price, calculated with `PriceCalculatorPlugin`. |
| unitPrice (int) | A single item price without assuming whether it is new or gross. This value must be used everywhere the price is displayed. It lets you switch tax mode without side effects. It's set with `CartItemPricePlugin` (cart expander). |
| sumPrice (int) | The sum of item's price calculated with `PriceCalculatorPlugin`. |
| taxRate (float) | The current tax rate set by `ProductItemTaxRateCalculatorPlugin`. |
| refundableAmount (int) | The item's available refundable amount (order only). It's set by `RefundableAmountCalculatorPlugin`. |
| unitTaxAmount (int) | The tax amount for a single item after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | The tax amount for a sum of items (order only). It's set by `TaxAmountCalculatorPlugin`. |
| [Calculated Discount Transfer](#calculated-discount-transfer) [] | Item calculated discount collection. It's set by `DiscountCalculatorPlugin`. |
| canceledAmount (int) | The canceled amount for this item (order only). It's set by the refund when the refund occurs. |
| unitTaxAmountFullAggregation (int) | The total tax amount for a given item with additions. It's set by `ItemTaxAmountFullAggregatorPlugin`. |
| sumTaxAmountFullAggregation (int) | The total tax amount for a given sum of items with additions. It's set by `ItemTaxAmountFullAggregatorPlugin`. |
| unitProductOptionAggregation (int) | The item price with product options. It's set by `ItemProductOptionPriceAggregatorPlugin`. |
| sumProductOptionAggregation (int) | The sum item price with product options. It's set by `ItemProductOptionPriceAggregatorPlugin`. |
| unitDiscountAmountAggregation (int) | The item total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int)|Sum The item total discount amount. It's set by `DiscountAmountAggregatorPlugin`.|
|unitDiscountAmountFullAggregation (int)|The item total discount amount with additions. It's set by `ItemDiscountAmountFullAggregatorPlugin`.|
|sumDiscountAmountFullAggregation (int)|The sum item total discount amount with additions. It's set by `ItemDiscountAmountFullAggregatorPlugin`.|
|unitPriceToPayAggregation (int)|The item's total price to pay after discounts with additions. It's set by `PriceToPayAggregatorPlugin`.|
|sumPriceToPayAggregation (int)|The sum item total price to pay after discounts with additions. It's set by `PriceToPayAggregatorPlugin`.|
|taxRateAverageAggregation (float)|The item's tax rate average, with additions used when recalculating the tax amount after a cancellation. It's set by `TaxRateAverageAggregatorPlugin`.|
|taxAmountAfterCancellation (int)|The tax amount after a cancellation, recalculated using the tax average and set by `TaxAmountAfterCancellationCalculatorPlugin`. |

## Calculated discount transfer

Each item that can have discounts applied has the `calculatedDiscounts` property, which holds the collection of discounts for each discount type.

| FIELD | DESCRIPTION |
| --- | --- |
|displayName (string)|The applied discount name.|
|description (string)|The applied discount description.|
|voucherCode (string)|The used voucher code.|
|quantity(int)|The number of discounted items.|
|unitGrossAmount (int)|The discount gross amount for single items. It's set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int)|The discount gross amount for a sum of items. It's set by `DiscountCalculatorPlugin`. |

## Product option transfer

`ProductOptionTransfer`: some items may have product option collection attached to them, which also have amounts calculated.

| FIELD | DESCRIPTION |
| --- | --- |
| idSalesOrderItemOption (int)|The unique ID option of the sales order item stored after the order is placed.|
|unitGrossPrice (int)|The single item gross price. It's set by `CartItemProductOptionPlugin` (cart expander).|
|sumGrossPrice (int)|The sum of items gross price. It's set by `PriceCalculatorPlugin` (cart expander).|
|unitNetPrice (int)|A single item's net price. It's set by CartItemProductOptionPlugin (cart expander)|
|sumNetPrice (int)|The sum of items net price. It's set by `PriceCalculatorPlugin` (cart expander).|
|unitPrice (int)|A single item's price without assuming whether it's new or gross. This value must be used everywhere where the price is displayed. It lets you switch tax mode without side effects. It's set by `PriceCalculatorPlugin` (cart expander).|
|taxRate (float)|The tax rate in percent. It's set by `ProductOptionTaxRateCalculatorPlugin` (cart expander).|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Product Option calculated discount collection. It's set by `DiscountCalculatorPlugin`.|
|refundableAmount (int)|The item's available refundable amount (order only). It's set by `RefundableAmountCalculatorPlugin`.|
|unitTaxAmount (int)|The tax amount for single product option (order only). It's set by `TaxAmountCalculatorPlugin`.|
|sumTaxAmount (int)|The tax amount for a sum of product options (order only). It's set by `TaxAmountCalculatorPlugin`.|
|unitDiscountAmountAggregation (int)|The product option total discount amount. It's set by `DiscountAmountAggregatorPlugin`.|
|sumDiscountAmountAggregation (int)|The sum of product option total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |

## Discount transfer

`DiscountTransfer` is a collection of discounts used in all `QuoteTransfer` discountable items such as `voucherDiscounts` and `cartRuleDiscounts`.

| FIELD | DESCRIPTION |
| --- | --- |
| amount (int)|The total discount amount used for this discount type. It's set by `DiscountCalculatorPlugin`. |

## Expense transfer

| FIELD | DESCRIPTION |
| --- | --- |
| sumGrossPrice (int) | The sum of item gross price. It's set by `PriceCalculatorPlugin`. |
| unitGrossPrice (string) | A single expense price — for example, shipment expenses are set in `Checkout ShipmentStep`. |
| sumNetPrice (int) |The sum of item net price. It's set by `PriceCalculatorPlugin`. |
| unitNetPrice (string) | A single net price — for example, shipment expenses are set in `Checkout ShipmentStep`. |
| taxRate (float) | The tax rate in percentages. It's set by `ShipmentTaxRateCalculatorPlugin`. |
| unitPrice (int) |A single item price without assuming whether it's new or gross. This value must be used everywhere the price is displayed. It lets you switch the tax mode without side effects. It's set by `PriceCalculatorPlugin` (cart expander). |
| sumPrice (int) | The sum of items price. It's set by `PriceCalculatorPlugin` (cart expander). |
| [Calculated Discount Transfer](#calculated-discount-transfer) |The list of applied discounts for this item.|
|quantity (int) | The number of items. |
| refundableAmount (int) | The total refundable amount for this item (order only). It's set by `RefundableAmountCalculatorPlugin`. |
| canceledAmount (int) | The total canceled amount for this item (order only). It's set by the refund. |
| unitTaxAmount (int) | The tax amount for a single item after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| sumTaxAmount (int) | The tax amount for a sum of items after discounts. It's set by `TaxAmountCalculatorPlugin`. |
| unitDiscountAmountAggregation (int) | The expense total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |
| sumDiscountAmountAggregation (int) | The sum of expense total discount amount. It's set by `DiscountAmountAggregatorPlugin`. |

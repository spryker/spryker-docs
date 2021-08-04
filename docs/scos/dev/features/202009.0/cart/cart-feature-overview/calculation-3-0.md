---
title: Calculation 3.0
originalLink: https://documentation.spryker.com/v6/docs/calculation-3-0
redirect_from:
  - /v6/docs/calculation-3-0
  - /v6/docs/en/calculation-3-0
---

Spryker uses the Calculation module to calculate the cart totals that are displayed in the cart/checkout or when the order is placed.

The calculation module extensively uses plugins to inject calculation algorithms.

## How Calculation Works

{% info_block infoBox "Quote Transfer" %}
The quote transfer object is used to store data and plugins that calculate the amounts.
{% endinfo_block %}

There is already a list of plugins which populate quote transfer with corresponding data. Calculations are executed every time the content of the cart is updated.

{% info_block infoBox %}
For more details, check [Cart Data Flow](https://documentation.spryker.com/docs/cart-functionality#cart-data-flow
{% endinfo_block %} in the *Cart Functionality* section.)
If manual recalculation of cart is required, then `CalculationFacade::recalculate` can be called from Zed or `CalculationClient::recalculate` from Yves with prepared [Calculation Data Structure](https://documentation.spryker.com/docs/calculation-data-structure#quote-transfer). When the recalculation operation is called, the calculator runs the calculator plugin stack and each plugin modifies the `QuoteTransfer` (calculates discounts, adds sum gross prices, calculates taxes, etc.). Most plugins require the `unitGrossPrice` and the `quantity` to be provided.

{% info_block infoBox "Calculated amounts" %}
Each amount is being calculated and stored in cents.
{% endinfo_block %}

## Calculator Plugins

Calculator plugins are registered in the `CalculationDependencyProvider::getCalculatorStack()` method. This method can be extended on the project level and the plugin stack can be updated with your own plugins. Each calculator must implement `CalculatorPluginInterface`.

For more information see: 

```php
<?php
interface CalculatorPluginInterface
{
    /**
     * @param QuoteTransfer $quoteTransfer
     *
    public function recalculate(QuoteTransfer $quoteTransfer);
}
```

* **RemoveTotalsCalculatorPlugin** - Resets quote totals, sets `TotalsTransfer` empty.
* **RemoveAllCalculatedDiscountsCalculatorPlugin** - Resets every `CalculatedDiscountTransfer`.
* **ItemGrossAmountsCalculatorPlugin** - Calculates `sumGrossPrice` for each `ItemTransfer`.

`ItemTransfer::sumGrossPrice = ItemTransfer::unitGrossPrice * ItemTransfer::quantity`

* **ProductOptionGrossSumCalculatorPlugin** - Calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`. - Calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`.

```php
ProductOptionTransfer::sumGrossPrice = ProductOptionTransfer::unitGrossPrice * ProductOptionTransfer::quantity
ItemTransfer::unitGrossPriceWithProductOptions = sum(ProductOptionTransfer::unitGrossPrice) + ItemTransfer::unitGrossPrice
ItemTransfer::sumGrossPriceWithProductOptions = sum(ProductOptionTransfer::sumGrossPrice) + ItemTransfer:sumGrossPrice
```

* **SubtotalTotalsCalculatorPlugin** - Sums each of the `sumGrossPriceWithProductOptions` items.

`TotalsTransfer::subtotal = sum(ItemTransfer::sumGrossPriceWithProductOptions)`

* **ExpensesGrossSumAmountCalculatorPlugin** - Calculates `sumGrossPrice` for each item.

`ExpenseTransfer::sumGrossPrice = ExpenseTransfer::unitGrossPrice * ExpenseTransfer::quantity`

* **ExpenseTotalsCalculatorPlugin** - Calculates `expenseTotal` in `TotalsTransfer`.

`TotalsTransfer::expenseTotal = sum(ExpenseTransfer::sumGrossPrice)`

* **DiscountCalculatorPlugin** - Applies discounts to current `QuoteTransfer` each discountable item with property `calculatedDiscounts`, gets discounts filled. Also, `voucherDiscounts` and `cartRuleDiscounts` are populated with additional used discount data for order level.

{% info_block infoBox "Discount Calculation" %}
Discount calculation is a separate topic and is explained in the [Discount](https://documentation.spryker.com/docs/discount
{% endinfo_block %} article.)


* **SumGrossCalculatedDiscountAmountCalculatorPlugin** - Calculates and sets `ItemTransfer` amounts after discounts to `sumGrossPriceWithProductOptionAndDiscountAmounts` and `unitGrossPriceWithProductOptionAndDiscountAmounts`; sets expense amounts after discounts to `unitGrossPriceWithDiscounts` and `sumGrossPriceWithDiscounts`.

```php
ItemTransfer::unitGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::unitGrossPriceWithProductOptions -  (sum(ItemTransfer:calculatedDiscounts::unitGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::unitGrossPrice))
ItemTransfer::sumGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::sumGrossPriceWithProductOptions -  (sum(ItemTransfer:calculatedDiscounts::sumGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::sumGrossPrice))
```

* **DiscountTotalsCalculatorPlugin** - Calculates total for discounts used and sets it to `totalDiscount` in `TotalsTransfer`. Sum all discountable item `CalculatedDiscountTransfer` gross amounts:

```php
TotalsTransfer:discountTotal += sum(ItemTransfer::CalculateDiscountTransfer::sumGrossAmount +
ItemTransfer::ProductOptionTransfer::CalculateDiscountTransfer::sumGrossAmount + ExpenseTransfer::sumGrossAmount)
GrandTotalTotalsCalculatorPlugin - Calculates grandTotal in TotalsTransfer.
TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal
```

* **GrandTotalWithDiscountsCalculatorPlugin** - Calculates GrandTotal after discounts in `TotalsTransfer`.

`TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal - TotalsTransfer::discountTotal`

* **TaxTotalsCalculatorPlugin** - Calculates taxTotal and taxRate used from `TotalTransfer::grandTotal`, sets it in `TotalsTransfer::TaxTotalsTransfer`.


`TaxableItems = ItemTransfer, ProductOptionTransfer, ExpenseTransfer. TaxTotalsTransfer::taxRate = sum(TaxableItems) / TaxableItems TaxTotalsTransfer::taxAmount = round((TotalsTransfer::grandTotal * TaxTotalsTransfer::taxRate) / TaxTotalsTransfer::taxRate / 100)`

## Calculation Data Structure

### Quote Transfer
{% info_block warningBox %}
QuoteTransfer is the main data transfer object used in Cart, Calculation, Checkout and when order is placed. This object is created when first item is added to the cart. The entire data object is stored into the session. It consists of:
{% endinfo_block %}
| Field | Description |
| --- | --- |
| totals ([TotalsTransfer](https://documentation.spryker.com/docs/calculation-3-0#totals-transfer))|Order totals.|
|items ([ItemTransfer](https://documentation.spryker.com/docs/calculation-3-0#item-transfer)[])|CartItem collection.|
|voucherDiscounts ([DiscountTransfer](https://documentation.spryker.com/docs/calculation-3-0#discount-transfer)[])||
|cartRuleDiscounts ([DiscountTransfer](https://documentation.spryker.com/docs/calculation-3-0#discount-transfer)[])||
expenses ([ExpenseTransfer](https://documentation.spryker.com/docs/calculation-3-0#expensetransfer))||
|billingAddress (AddressTransfer)|Current checkout customer billing address.|
|shippingAddress (AddressTransfer)|Current checkout customer shipment address.|
|customer (CustomerTransfer)|Current checkout customer details.|
|orderReference (string)|Current checkout order reference, available after `PlaceOrderStep`.|
|payment (PaymentTransfer)|Information about currently selected payment, available after `PaymentStep`.|
|shipment (ShipmentTransfer)|Information about currently selected shipment, available after `ShipmentStep`. |

### Totals Transfer
TotalsTransfer is a data object holding cart totals, subtotal, expenses (shipping), discount total and grand total. Here should the amounts for order level be stored.

| Field | Description |
| --- | --- |
| subtotal (int)|Calculated total amount before taxes and discounts. Is set by `SubtotalTotalsCalculatorPlugin`.|
|expenseTotal  (int)|Total expenses amount (shipping). It is set by `ExpenseTotalsCalculatorPlugin`.|
|discountTotal (int)|Total discount amount. It is set by `DiscountTotalsCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](https://documentation.spryker.com/docs/calculation-3-0#tax-total-transfer))|Tax totals for current cart. Is set by `TaxTotalsCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It is set by `GrandTotalWithDiscountsCalculatorPlugin` calculator plugin.|
|hash (string)|Hash from total values to identify amount changes. It is set by `GrandTotalCalculatorPlugin`. |

### Tax Total Transfer
TaxTotalsTransfer holds taxRate and taxAmount used for grandTotal.
| Field | Description |
| --- | --- |
| taxRate (int)|Current tax rate in percentage.|
|amount (int)|Current tax amount from grandTotal. |


### Item Transfer
ItemTransfer is a cart item transfer, holds single product information.

| Field | Description |
| --- | --- |
| id (int)|id of the concrete product|
|sku (string)|concrete product sku|
|groupKey (string)|group key used for grouping items in cart|
|quantity (int)|number of items selected|
|idSalesOrderItem (int)|id of order item, stored when items is saved, after PlaceOrderStep|
|name (string)|concrete product name|
|idProductAbstract (int)|id of abstract product|
|abstractSku (string)|abstract product sku|
|variety (string)|used when item is in a module|
|status (string)|state machine state when item used as order item|
|addedAt (string)|used in wishlist to have date when item was added|
|productConcrete (ProductConcreteTransfer)|concrete product details added in the wishlist|
|unitGrossPrice (int)|single item gross price. It’s set with `CartItemPricePlugin` cart expander plugin|
|sumGrossPrice (int)|sum of items gross price. Calculated with `ExpensesGrossSumAmountCalculatorPlugin`.|
|unitGrossPriceWithDiscounts (int)|unit gross price after the discounts are applied. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithDiscounts (int)|sum of item gross price after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|taxRate (int)|current tax rate. It’s set by `ProductCartPlugin` cart expander plugin.|
|unitGrossPriceWithProductOptions (int)|single item with product options gross price. It’s set by `ProductOptionGrossSumCalculatorPlugin`.|
|sumGrossPriceWithProductOptions (int)|sum of item gross price with product options. It’s set by `ProductOptionGrossSumCalculatorPlugin`.|
|unitGrossPriceWithProductOptionAndDiscountAmounts (int)|single item with product options gross price and after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithProductOptionAndDiscountAmounts (int)|sum of item gross price with product options and after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|unitTaxAmountWithProductOptionAndDiscountAmounts (int)|single item tax amount with product options after discounts. (order only)|
|sumTaxAmountWithProductOptionAndDiscountAmounts (int)|sum of items gross price with product options after discounts. (order only)|
|refundableAmount (int)|item available refundable amount (order only)|
|unitTaxAmount (int)|tax amount for single item (order only)|
|sumTaxAmount (int)|tax amount for sum of items (order only)|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](https://documentation.spryker.com/docs/calculation-3-0#calculated-discount-transfer))|item calculated discount collection. It’s set by `DiscountCalculatorPlugin`.|
|canceledAmount (int)|canceled amount for this item (order only)|
|productOptions ([ProductOptionTransfer](https://documentation.spryker.com/docs/calculation-3-0#product-option-transfer)[])|assigned product options. It’s set by `CartItemProductOptionPlugin` cart expander plugin. |

### Calculated Discount Transfer

Each item which can have discounts applied have `calculatedDiscounts` property added which holds collection of discounts for each discount type.

| Field | Description |
| --- | --- |
| displayName (string|applied discount name|
|description (string|applied discount description|
|voucherCode (string|used voucher code|
|quantity(int|number of discounted items|
|unitGrossAmount (int|discount gross amount for single items; It’s set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int|discount gross amount for sum of items; It’s set by `DiscountCalculatorPlugin`. |


### Product Option Transfer

`ProductOptionTransfer`, some items may have product option collection attached which also have amounts calculated.


| Field | Description |
| --- | --- |
| idSalesOrderItemOption (int|id of sales order item option stored after the order is placed|
|unitGrossPrice (int|single item gross price. It’s set by `CartItemProductOptionPlugin` cart expander plugin.|
|sumGrossPrice (int|sum of items gross price. It’s set by `ProductOptionGrossSumCalculatorPlugin` cart expander plugin.|
|taxRate (int|tax rate in percentage. It’s set by `CartItemProductOptionPlugin` cart expander plugin.|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](https://documentation.spryker.com/docs/calculation-3-0#calculated-discount-transfer))|product Option calculated discount collection. It’s set by `DiscountCalculatorPlugin`. |
| refundableAmount (int) | item available refundable amount (order only) |
| unitTaxAmount (int) | 	
tax amount for single product option (order only) |
| sumTaxAmount (int) | tax amount for sum of product options (order only) |

### Discount Transfer

DiscountTransfer, is a collection of discounts used in all `QuoteTransfer` discountable items. It can be `voucherDiscounts` or `cartRuleDiscounts`.

| Field | Description |
| --- | --- |
| displayName (string|discount name|
|idDiscount (int|id of discount, as stored in the discount table|
|description (string|description of the applied discount|
|calculatorPlugin (string|discount calculator plugin used to calculate this discount (Fixed, Percentage) |
|isPrivileged (bool|is the discount privileged, can be combined with other discounts|
|isActive (bool|is the discount active|
|validFrom (string|starting date for discount validity|
|validTo (string|ending date for discount validity|
|collectorLogicalOperator (string|logical operator for collector (OR, AND) when combining multiple discounts|
|discountCollectors (DiscountCollectionTransfer[]|list of discount collectors used for this discount|
|amount (int|total discount amount used for this discount type. It’s set by `DiscountCalculatorPlugin`. |

### ExpenseTransfer

| Field | Description |
| --- | --- |
| idExpense (int|unique identifier of the expense|
|sumGrossPrice (int|sum of item gross price. It’s set by `ExpensesGrossSumAmountCalculatorPlugin`.|
|unitGrossPrice (string|single expense price. e.g.: shipment expenses are set in the ShipmentStep|
|type (string|type of expense (shipping) |
|taxRate (int|tax in percents|
|calculatedDiscounts (CalculatedDiscountTransfer[]|list of applied discounts for this item|
|quantity (int|number of items|
|idSalesExpense (int|id of expense as stored in the sales_expense|
|unitGrossPriceWithDiscounts (int|single item price after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator\ItemDiscounts`.|
|sumGrossPriceWithDiscounts (int|sum off all item prices after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator\ItemDiscounts`.|
|unitTaxAmountWithDiscounts (int|tax amount for single item after discounts(order only) |
|sumTaxAmountWithDiscounts (int|tax amount for sum of items after discounts(order only) |
|refundableAmount (int|total refundable amount for this item (order only) |
|canceledAmount (int|total cancelled amount for this item (order only) |
|unitTaxAmount (int|tax amount for single item (order only) sumTaxAmount (int) | tax amount for sum of items (order only) |

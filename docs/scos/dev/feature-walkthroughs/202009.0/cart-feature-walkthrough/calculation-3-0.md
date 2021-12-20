---
title:  Calculation 3.0
last_updated: Aug 12, 2021
description: The Calculation module is used to calculate the cart totals displayed in the cart/checkout or when the order is placed. The article describes its workflow.
template: concept-topic-template.
originalLink: https://documentation.spryker.com/v6/docs/calculation-3-0
originalArticleId: 68ad5f8f-31dc-49a1-b3da-d78a6d1f4d24
redirect_from:
  - /v6/docs/calculation-3-0
  - /v6/docs/en/calculation-3-0
related:
  - title: Calculation Data Structure
    link: docs/scos/dev/feature-walkthroughs/page.version/cart-feature-walkthrough/calculation-data-structure.html
---

Spryker uses the Calculation module to calculate the cart totals that are displayed in the cart/checkout or when the order is placed.

The Сalculation module extensively uses plugins to inject calculation algorithms.

## How calculation works

{% info_block infoBox "Quote Transfer" %}

The quote transfer object is used to store data and plugins that calculate the amounts.

{% endinfo_block %}

There is already a list of plugins which populate quote transfer with corresponding data. Calculations are executed every time the content of the cart is updated.

{% info_block infoBox "" %}

For more details, check [Cart Data Flow](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/cart-module-reference-information.html#cart-operations) in the *Cart Functionality* section.

{% endinfo_block %}

If manual recalculation of cart is required, then `CalculationFacade::recalculate` can be called from Zed or `CalculationClient::recalculate` from Yves with prepared [Calculation Data Structure](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/calculation-data-structure.html#quote-transfer). When the recalculation operation is called, the calculator runs the calculator plugin stack and each plugin modifies the `QuoteTransfer` (calculates discounts, adds sum gross prices, calculates taxes). Most plugins require the `unitGrossPrice` and the `quantity` to be provided.

{% info_block infoBox "Calculated amounts" %}

Each amount is being calculated and stored in cents.

{% endinfo_block %}

## Calculator plugins

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

* `RemoveTotalsCalculatorPlugin`—resets quote totals, sets `TotalsTransfer` empty.
* `RemoveAllCalculatedDiscountsCalculatorPlugin`—resets every `CalculatedDiscountTransfer`.
* `ItemGrossAmountsCalculatorPlugin`—calculates `sumGrossPrice` for each `ItemTransfer`.

`ItemTransfer::sumGrossPrice = ItemTransfer::unitGrossPrice * ItemTransfer::quantity`

* `ProductOptionGrossSumCalculatorPlugin`—calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`—calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`.

```php

ProductOptionTransfer::sumGrossPrice = ProductOptionTransfer::unitGrossPrice * ProductOptionTransfer::quantity
ItemTransfer::unitGrossPriceWithProductOptions = sum(ProductOptionTransfer::unitGrossPrice) + ItemTransfer::unitGrossPrice
ItemTransfer::sumGrossPriceWithProductOptions = sum(ProductOptionTransfer::sumGrossPrice) + ItemTransfer:sumGrossPrice
```

* `SubtotalTotalsCalculatorPlugin`—sums each of the `sumGrossPriceWithProductOptions` items.

`TotalsTransfer::subtotal = sum(ItemTransfer::sumGrossPriceWithProductOptions)`

* `ExpensesGrossSumAmountCalculatorPlugin`—calculates `sumGrossPrice` for each item.

`ExpenseTransfer::sumGrossPrice = ExpenseTransfer::unitGrossPrice * ExpenseTransfer::quantity`

* `ExpenseTotalsCalculatorPlugin`—calculates `expenseTotal` in `TotalsTransfer`.

`TotalsTransfer::expenseTotal = sum(ExpenseTransfer::sumGrossPrice)`

* `DiscountCalculatorPlugin`—applies discounts to current `QuoteTransfer` each discountable item with property `calculatedDiscounts`, gets discounts filled. Also, `voucherDiscounts` and `cartRuleDiscounts` are populated with additional used discount data for order level.

{% info_block infoBox "Discount Calculation" %}


Discount calculation is a separate topic and is explained in the [Discount](/docs/scos/user/back-office-user-guides/202005.0/merchandising/discount/references/discount-calculation-reference-information.html) article.

{% endinfo_block %}


* `SumGrossCalculatedDiscountAmountCalculatorPlugin`—calculates and sets `ItemTransfer` amounts after discounts to `sumGrossPriceWithProductOptionAndDiscountAmounts` and `unitGrossPriceWithProductOptionAndDiscountAmounts`; sets expense amounts after discounts to `unitGrossPriceWithDiscounts` and `sumGrossPriceWithDiscounts`.

```php
ItemTransfer::unitGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::unitGrossPriceWithProductOptions— (sum(ItemTransfer:calculatedDiscounts::unitGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::unitGrossPrice))
ItemTransfer::sumGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::sumGrossPriceWithProductOptions— (sum(ItemTransfer:calculatedDiscounts::sumGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::sumGrossPrice))
```

* `DiscountTotalsCalculatorPlugin`—calculates total for discounts used and sets it to `totalDiscount` in `TotalsTransfer`. Sum all discountable item `CalculatedDiscountTransfer` gross amounts:

```php
TotalsTransfer:discountTotal += sum(ItemTransfer::CalculateDiscountTransfer::sumGrossAmount +
ItemTransfer::ProductOptionTransfer::CalculateDiscountTransfer::sumGrossAmount + ExpenseTransfer::sumGrossAmount)
GrandTotalTotalsCalculatorPlugin—Calculates grandTotal in TotalsTransfer.
TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal
```

* `GrandTotalWithDiscountsCalculatorPlugin` —calculates `GrandTotal` after discounts in `TotalsTransfer`.

`TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal - TotalsTransfer::discountTotal`

* `TaxTotalsCalculatorPlugin`—calculates taxTotal and taxRate used from `TotalTransfer::grandTotal`, sets it in `TotalsTransfer::TaxTotalsTransfer`.


`TaxableItems = ItemTransfer, ProductOptionTransfer, ExpenseTransfer. TaxTotalsTransfer::taxRate = sum(TaxableItems) / TaxableItems TaxTotalsTransfer::taxAmount = round((TotalsTransfer::grandTotal * TaxTotalsTransfer::taxRate) / TaxTotalsTransfer::taxRate / 100)`

## Calculation data structure

This section describes calculation data structure.

### Quote Transfer

{% info_block warningBox "" %}

`QuoteTransfer` is the main data transfer object used in Cart, Calculation, Checkout and when order is placed. This object is created when first item is added to the cart. The entire data object is stored into the session. It consists of:

{% endinfo_block %}

| FIELD | DESCRIPTION |
| --- | --- |
| totals ([TotalsTransfer](#totals-transfer))|Order totals.|
|items ([ItemTransfer](#item-transfer)[])|CartItem collection.|
|voucherDiscounts ([DiscountTransfer](#discount-transfer)[])||
|cartRuleDiscounts ([DiscountTransfer](#discount-transfer)[])||
expenses ([ExpenseTransfer](#expense-transfer))||
|billingAddress (AddressTransfer)|Current checkout customer billing address.|
|shippingAddress (AddressTransfer)|Current checkout customer shipment address.|
|customer (CustomerTransfer)|Current checkout customer details.|
|orderReference (string)|Current checkout order reference, available after `PlaceOrderStep`.|
|payment (PaymentTransfer)|Information about currently selected payment, available after `PaymentStep`.|
|shipment (ShipmentTransfer)|Information about currently selected shipment, available after `ShipmentStep`. |

### Totals Transfer

`TotalsTransfer` is a data object holding cart totals, subtotal, expenses (shipping), discount total and grand total. Here should the amounts for order level be stored.

| FIELD | DESCRIPTION |
| --- | --- |
| subtotal (int)|Calculated total amount before taxes and discounts. Is set by `SubtotalTotalsCalculatorPlugin`.|
|expenseTotal  (int)|Total expenses amount (shipping). It is set by `ExpenseTotalsCalculatorPlugin`.|
|discountTotal (int)|Total discount amount. It is set by `DiscountTotalsCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](#tax-total-transfer))|Tax totals for current cart. Is set by `TaxTotalsCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It is set by `GrandTotalWithDiscountsCalculatorPlugin` calculator plugin.|
|hash (string)|Hash from total values to identify amount changes. It is set by `GrandTotalCalculatorPlugin`. |

### Tax Total Transfer

`TaxTotalsTransfer` holds taxRate and taxAmount used for grandTotal.

| FIELD | DESCRIPTION |
| --- | --- |
| taxRate (int)|Current tax rate in percentage.|
|amount (int)|Current tax amount from grandTotal. |


### Item Transfer

`ItemTransfer` is a cart item transfer, holds single product information.

| FIELD | DESCRIPTION |
| --- | --- |
| id (int)| ID of the concrete product|
|sku (string)|Concrete product sku|
|groupKey (string)|Group key used for grouping items in cart|
|quantity (int)|Number of items selected|
|IDSalesOrderItem (int)|ID of order item, stored when items is saved after `PlaceOrderStep`|
|name (string)|Concrete product name|
|IDProductAbstract (int)|ID of abstract product|
|abstractSku (string)|Abstract product sku|
|variety (string)|Used when an item is in a module|
|status (string)|State machine state when an item used as order item|
|addedAt (string)|Used in wishlist to have date when an item was added|
|productConcrete (ProductConcreteTransfer)|Concrete product details added to the wishlist|
|unitGrossPrice (int)|Single item gross price. It’s set with the `CartItemPricePlugin` cart expander plugin|
|sumGrossPrice (int)|Sum of items gross price. Calculated with `ExpensesGrossSumAmountCalculatorPlugin`.|
|unitGrossPriceWithDiscounts (int)|Unit gross price after the discounts are applied. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithDiscounts (int)|Sum of an item gross price after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|taxRate (int)|Current tax rate. It’s set by the `ProductCartPlugin` cart expander plugin.|
|unitGrossPriceWithProductOptions (int)|Single item with product options gross price. It’s set by `ProductOptionGrossSumCalculatorPlugin`.|
|sumGrossPriceWithProductOptions (int)|Sum of item gross price with product options. It’s set by `ProductOptionGrossSumCalculatorPlugin`.|
|unitGrossPriceWithProductOptionAndDiscountAmounts (int)|Single item with product options gross price and after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithProductOptionAndDiscountAmounts (int)|Sum of item gross price with product options and after discounts. It’s set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|unitTaxAmountWithProductOptionAndDiscountAmounts (int)|Single item tax amount with product options after discounts. (order only)|
|sumTaxAmountWithProductOptionAndDiscountAmounts (int)|Sum of items gross price with product options after discounts. (order only)|
|refundableAmount (int)|Item available refundable amount (order only)|
|unitTaxAmount (int)|Tax amount for single item (order only)|
|sumTaxAmount (int)|Tax amount for sum of items (order only)|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Item calculated discount collection. It’s set by `DiscountCalculatorPlugin`.|
|canceledAmount (int)|Canceled amount for this item (order only)|
|productOptions ([ProductOptionTransfer](#product-option-transfer)[])|Assigned product options. It’s set by `CartItemProductOptionPlugin` cart expander plugin. |

### Calculated Discount Transfer

Each item which can have discounts applied have `calculatedDiscounts` property added which holds the collection of discounts for each discount type.

| FIELD | DESCRIPTION |
| --- | --- |
| displayName (string)|Applied discount name|
|description (string)|Applied discount description|
|voucherCode (string)|Used voucher code|
|quantity(int)|Number of discounted items|
|unitGrossAmount (int)|Discount gross amount for single items; it’s set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int)|Discount gross amount for sum of items; it’s set by `DiscountCalculatorPlugin`. |


### Product Option Transfer

`ProductOptionTransfer`, some items may have product option collection attached which also have amounts calculated.


| FIELD | DESCRIPTION |
| --- | --- |
| idSalesOrderItemOption (int)|ID of sales order item option stored after the order is placed|
|unitGrossPrice (int)|Single item gross price. It’s set by `CartItemProductOptionPlugin` cart expander plugin.|
|sumGrossPrice (int)|Sum of items gross price. It’s set by `ProductOptionGrossSumCalculatorPlugin` cart expander plugin.|
|taxRate (int)|Tax rate in percentage. It’s set by `CartItemProductOptionPlugin` cart expander plugin.|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Product Option calculated discount collection. It’s set by `DiscountCalculatorPlugin`. |
| refundableAmount (int) | Item available refundable amount (order only) |
| unitTaxAmount (int) | 	
Tax amount for single product option (order only) |
| sumTaxAmount (int) | Tax amount for sum of product options (order only) |

### Discount Transfer

`DiscountTransfer` is a collection of discounts used in all `QuoteTransfer` discountable items. It can be `voucherDiscounts` or `cartRuleDiscounts`.

| FIELD | DESCRIPTION |
| --- | --- |
| displayName (string)|Discount name|
|IDDiscount (int)|ID of discount, as stored in the discount table|
|description (string)|description of the applied discount|
|calculatorPlugin (string)|discount calculator plugin used to calculate this discount (Fixed, Percentage) |
|IsPrivileged (bool)|Is the discount privileged, can be combined with other discounts|
|IsActive (bool)|Is the discount active|
|validFrom (string)|starting date for discount validity|
|validTo (string)|Ending date for discount validity|
|collectorLogicalOperator (string)|Logical operator for collector (OR, AND) when combining multiple discounts|
|discountCollectors (DiscountCollectionTransfer[]|List of discount collectors used for this discount|
|amount (int)|Total discount amount used for this discount type. It’s set by `DiscountCalculatorPlugin`. |

### Expense Transfer

| FIELD | DESCRIPTION |
| --- | --- |
| idExpense (int)|Unique identifier of the expense|
|sumGrossPrice (int)|Sum of item gross price. It’s set by `ExpensesGrossSumAmountCalculatorPlugin`.|
|unitGrossPrice (string)|Single expense price, e.g., shipment expenses are set in the ShipmentStep|
|type (string)|Type of expense (shipping) |
|taxRate (int)|Tax in percents|
|calculatedDiscounts (CalculatedDiscountTransfer[]|List of applied discounts for this item|
|quantity (int)|Number of items|
|IDSalesExpense (int)|ID of expense as stored in the sales_expense|
|unitGrossPriceWithDiscounts (int)|Single item price after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator/ItemDiscounts`.|
|sumGrossPriceWithDiscounts (int)|Sum off all item prices after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator/ItemDiscounts`.|
|unitTaxAmountWithDiscounts (int)|Tax amount for single item after discounts(order only) |
|sumTaxAmountWithDiscounts (int)|Tax amount for sum of items after discounts(order only) |
|refundableAmount (int)|Total refundable amount for this item (order only) |
|canceledAmount (int)|Total cancelled amount for this item (order only) |
|unitTaxAmount (int)|Tax amount for single item (order only) sumTaxAmount (int) | tax amount for sum of items (order only) |

---
title:  Calculation 3.0
last_updated: Aug 12, 2021
description: The Calculation module is used to calculate the cart totals displayed in the cart/checkout or when the order is placed. The document describes its workflow.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202311.0/cart-feature-walkthrough/calculation-3-0.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/extend-and-customize/calculation-3-0.html
  - /docs/pbc/all/cart-and-checkout/latest/base-shop/extend-and-customize/calculation-3-0.html

---

Spryker uses the `Calculation` module to calculate the cart totals that are displayed in the cart, during checkout, and when the order is placed.

The `Calculation` module extensively uses plugins to inject calculation algorithms.

## How Calculation works

{% info_block infoBox "Quote Transfer" %}

The quote transfer object is used to store data and plugins that calculate the amounts.

{% endinfo_block %}

There is already a list of plugins that populate quote transfer with corresponding data. Calculations are executed every time the content of the cart is updated.

{% info_block infoBox %}

For more details, check [Cart Data Flow](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/cart-module-reference-information.html#cart-data-flow) in the *Cart Functionality* section.

{% endinfo_block %}

If manual recalculation of cart is required, then `CalculationFacade::recalculate` can be called from Zed or `CalculationClient::recalculate` from Yves with prepared [Calculation Data Structure](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/calculation-data-structure.html). When the recalculation operation is called, the calculator runs the calculator plugin stack and each plugin modifies the `QuoteTransfer` (calculates discounts, adds sum gross prices, calculates taxes). Most plugins require the `unitGrossPrice` and the `quantity` to be provided.

{% info_block infoBox "Calculated amounts" %}

Each amount is calculated and stored in cents.

{% endinfo_block %}

## Calculator plugins

Calculator plugins are registered in the `CalculationDependencyProvider::getCalculatorStack()` method. This method can be extended on the project level, and the plugin stack can be updated with your own plugins. Each calculator must implement `CalculatorPluginInterface`.

For more information, see the following:

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

- `RemoveTotalsCalculatorPlugin` resets quote totals, sets `TotalsTransfer` empty.
- `RemoveAllCalculatedDiscountsCalculatorPlugin` resets every `CalculatedDiscountTransfer`.
- `ItemGrossAmountsCalculatorPlugin` calculates `sumGrossPrice` for each `ItemTransfer`.

**`ItemTransfer::sumGrossPrice`** `= ItemTransfer::unitGrossPrice * ItemTransfer::quantity`

- `ProductOptionGrossSumCalculatorPlugin` calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer` calculates `unitGrossPriceWithProductOptions`, `sumGrossPriceWithProductOptions` for `ItemTransfer` and `sumGrossPrice` for `ProductOptionTransfer`.

```php
ProductOptionTransfer::sumGrossPrice = ProductOptionTransfer::unitGrossPrice * ProductOptionTransfer::quantity
ItemTransfer::unitGrossPriceWithProductOptions = sum(ProductOptionTransfer::unitGrossPrice) + ItemTransfer::unitGrossPrice
ItemTransfer::sumGrossPriceWithProductOptions = sum(ProductOptionTransfer::sumGrossPrice) + ItemTransfer:sumGrossPrice
```

- `SubtotalTotalsCalculatorPlugin` sums each of the `sumGrossPriceWithProductOptions` items.
`TotalsTransfer::subtotal = sum(ItemTransfer::sumGrossPriceWithProductOptions)`
- `ExpensesGrossSumAmountCalculatorPlugin` calculates `sumGrossPrice` for each item.
`ExpenseTransfer::sumGrossPrice = ExpenseTransfer::unitGrossPrice * ExpenseTransfer::quantity`
- `ExpenseTotalsCalculatorPlugin` calculates `expenseTotal` in `TotalsTransfer`.
`TotalsTransfer::expenseTotal = sum(ExpenseTransfer::sumGrossPrice)`
- `DiscountCalculatorPlugin` applies discounts to current `QuoteTransfer`, and each discountable item with the property `calculatedDiscounts` gets discounts filled. Also, `voucherDiscounts` and `cartRuleDiscounts` are populated with additional used discount data for order level.

{% info_block infoBox "Discount Calculation" %}

Discount calculation is a separate topic and is explained in the [Discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/promotions-discounts-feature-overview.html) article.

{% endinfo_block %}


- `SumGrossCalculatedDiscountAmountCalculatorPlugin` calculates and sets `ItemTransfer` amounts after discounts to `sumGrossPriceWithProductOptionAndDiscountAmounts` and `unitGrossPriceWithProductOptionAndDiscountAmounts`; it also sets expense amounts after discounts to `unitGrossPriceWithDiscounts` and `sumGrossPriceWithDiscounts`.

```php
ItemTransfer::unitGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::unitGrossPriceWithProductOptions - (sum(ItemTransfer:calculatedDiscounts::unitGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::unitGrossPrice))
ItemTransfer::sumGrossPriceWithProductOptionAndDiscountAmounts = ItemTransfer::sumGrossPriceWithProductOptions - (sum(ItemTransfer:calculatedDiscounts::sumGrossPrice) + sum(ProductOptionTransfer::calculatedDiscounts::sumGrossPrice))
```

- `DiscountTotalsCalculatorPlugin` calculates the total for used discount and sets it to `totalDiscount` in `TotalsTransfer`. The sum of all discountable items `CalculatedDiscountTransfer` gross amounts is as follows:

```php
TotalsTransfer:discountTotal += sum(ItemTransfer::CalculateDiscountTransfer::sumGrossAmount +
ItemTransfer::ProductOptionTransfer::CalculateDiscountTransfer::sumGrossAmount + ExpenseTransfer::sumGrossAmount)
GrandTotalTotalsCalculatorPlugin—Calculates grandTotal in TotalsTransfer.
TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal
```

- `GrandTotalWithDiscountsCalculatorPlugin` calculates `GrandTotal` after discounts in `TotalsTransfer`.
`TotalsTransfer:grandTotal = TotalsTransfer::subtotal + TotalsTransfer:expenseTotal - TotalsTransfer::discountTotal`
- `TaxTotalsCalculatorPlugin`calculates `taxTotal` and `taxRate` used from `TotalTransfer::grandTotal` and sets it in `TotalsTransfer::TaxTotalsTransfer`.

`TaxableItems = ItemTransfer, ProductOptionTransfer, ExpenseTransfer. TaxTotalsTransfer::taxRate = sum(TaxableItems) / TaxableItems TaxTotalsTransfer::taxAmount = round((TotalsTransfer::grandTotal * TaxTotalsTransfer::taxRate) / TaxTotalsTransfer::taxRate / 100)`

## Calculation data structure

This section describes the calculation data structure.

### Quote transfer

{% info_block warningBox "" %}

`QuoteTransfer` is the main data transfer object used in Cart, Calculation, and Checkout as well as when an order is placed. This object is created when the first item is added to the cart. The entire data object is stored into the session. It consists of the following:

{% endinfo_block %}

| FIELD | DESCRIPTION |
| --- | --- |
| totals ([TotalsTransfer](#totals-transfer))|Order totals.|
|items ([ItemTransfer](#item-transfer)[])|CartItem collection.|
|voucherDiscounts ([DiscountTransfer](#discount-transfer)[])|   |
|cartRuleDiscounts ([DiscountTransfer](#discount-transfer)[])| |
| expenses ([ExpenseTransfer](#expense-transfer))| |
|billingAddress (AddressTransfer)|The current checkout customer's billing address.|
|shippingAddress (AddressTransfer)|The current checkout customer's shipment address.|
|customer (CustomerTransfer)|The current checkout customer's details.|
|orderReference (string)|The current checkout order reference, available after `PlaceOrderStep`.|
|payment (PaymentTransfer)|Information about the currently selected payment, available after `PaymentStep`.|
|shipment (ShipmentTransfer)|Information about the currently selected shipment, available after `ShipmentStep`. |

### Totals transfer

`TotalsTransfer` is a data object holding cart totals, subtotal, expenses (shipping), discount total, and grand total. The amounts for the order level are stored here.

| FIELD | DESCRIPTION |
| --- | --- |
|subtotal (int)|The calculated total amount before taxes and discounts. It is set by `SubtotalTotalsCalculatorPlugin`.|
|expenseTotal  (int)|The total expenses amount (shipping). It is set by `ExpenseTotalsCalculatorPlugin`.|
|discountTotal (int)|The total discount amount. It is set by `DiscountTotalsCalculatorPlugin`.|
|taxTotal ([TaxTotalsTransfer](#tax-total-transfer))|Tax totals for current cart. It is set by `TaxTotalsCalculatorPlugin`.|
|grandTotal (int)|The total amount the customer needs to pay after the discounts are applied. It is set by `GrandTotalWithDiscountsCalculatorPlugin` calculator plugin.|
|hash (string)|The hash from total values to identify amount changes. It is set by `GrandTotalCalculatorPlugin`.|

### Tax total transfer

{% info_block infoBox "Info" %}

`TaxTotalsTransfer` holds the `taxRate` and `taxAmount` used for `grandTotal`.

{% endinfo_block %}

| FIELD | DESCRIPTION |
| --- | --- |
| taxRate (int)|The current tax rate in percentage.|
|amount (int)|The current tax amount from grandTotal.|

### Item transfer

`ItemTransfer` is a cart item transfer. It holds single product information.

| FIELD | DESCRIPTION |
| --- | --- |
| id (int)|The unique ID of the concrete product.|
|sku (string)|The concrete product SKU.|
|groupKey (string)|The group key used for grouping items in the cart.|
|quantity (int)|The number of items selected.|
|IDSalesOrderItem (int)|The unique ID of an order item, stored when items are saved after `PlaceOrderStep`.|
|name (string)|The concrete product name.|
|IDProductAbstract (int)|The unique ID of an abstract product.|
|abstractSku (string)|The abstract product SKU.|
|variety (string)|Used when an item is in a module.|
|status (string)|State machine state when an item is used as anorder item.|
|addedAt (string)|Used in a wishlist to have a date when an item was added|
|productConcrete (ProductConcreteTransfer)| The concrete product details added to the wishlist.|
|unitGrossPrice (int)|A single item's gross price. It's set with the `CartItemPricePlugin` cart expander plugin.|
|sumGrossPrice (int)|The gross price of a sum of items. Calculated with `ExpensesGrossSumAmountCalculatorPlugin`.|
|unitGrossPriceWithDiscounts (int)|The unit gross price after all discounts are applied. It's set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithDiscounts (int)|The sum of an item's gross price after discounts. It's set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|taxRate (int)|The current tax rate. It's set by the `ProductCartPlugin` cart expander plugin.|
|unitGrossPriceWithProductOptions (int)|A single item with product options gross price. It's set by `ProductOptionGrossSumCalculatorPlugin`.|
|sumGrossPriceWithProductOptions (int)|The sum of item gross price with product options. It's set by `ProductOptionGrossSumCalculatorPlugin`.|
|unitGrossPriceWithProductOptionAndDiscountAmounts (int)|A single item's with product options gross price and after discounts. It's set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|sumGrossPriceWithProductOptionAndDiscountAmounts (int)|The sum of item gross price with product options and after discounts. It's set by `SumGrossCalculatedDiscountAmountCalculatorPlugin`.|
|unitTaxAmountWithProductOptionAndDiscountAmounts (int)|The single item's tax amount with product options after discounts (order only).|
|sumTaxAmountWithProductOptionAndDiscountAmounts (int)|The sum of items' gross price with product options after discounts (order only).|
|refundableAmount (int)|The item's available refundable amount (order only).|
|unitTaxAmount (int)|The tax amount for a single item (order only).|
|sumTaxAmount (int)|The tax amount for a sum of items (order only).|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Item calculated discount collection. It's set by `DiscountCalculatorPlugin`.|
|canceledAmount (int)|The canceled amount for this item (order only).|
|productOptions ([ProductOptionTransfer](#product-option-transfer)[])|Assigned product options. It's set by the `CartItemProductOptionPlugin` cart expander plugin. |

### Calculated discount transfer

Each item that can have discounts applied has the `calculatedDiscounts` property added, which holds the collection of discounts for each discount type.

| FIELD | DESCRIPTION |
| --- | --- |
| displayName (string)|The applied discount name.|
|description (string)|The applied discount description.|
|voucherCode (string)|A used voucher code.|
|quantity(int)|The number of discounted items.|
|unitGrossAmount (int)|The discount gross amount for single items. It's set by `DiscountCalculatorPlugin`.|
|sumGrossAmount (int)|The discount gross amount for the sum of items. It's set by `DiscountCalculatorPlugin`. |

### Product option transfer

{% info_block infoBox "Info" %}

`ProductOptionTransfer`: some items may have product option collection attached to them, which also have amounts calculated.

{% endinfo_block %}

| FIELD | DESCRIPTION |
| --- | --- |
| idSalesOrderItemOption (int)|The unique ID of sales order item option stored after the order is placed.|
|unitGrossPrice (int)|A single item's gross price. It's set by the `CartItemProductOptionPlugin` cart expander plugin.|
|sumGrossPrice (int)|The gross price of a sum of items. It's set by the `ProductOptionGrossSumCalculatorPlugin` cart expander plugin.|
|taxRate (int)|The tax rate in percentage. It's set by the `CartItemProductOptionPlugin` cart expander plugin.|
|calculatedDiscounts[] ([CalculatedDiscountTransfer](#calculated-discount-transfer))|Product option calculated discount collection. It's set by `DiscountCalculatorPlugin`. |
| refundableAmount (int) | The item's available refundable amount (order only).|
| unitTaxAmount (int) | The tax amount for single product option (order only). |
| sumTaxAmount (int) | The tax amount for sum of product options (order only). |

### Discount transfer

{% info_block warningBox "" %}

`DiscountTransfer` is a collection of discounts used in all `QuoteTransfer` discountable items such as `voucherDiscounts` or `cartRuleDiscounts`.

{% endinfo_block %}

| FIELD | DESCRIPTION |
| --- | --- |
| displayName (string)|The name of the discount.|
|IDDiscount (int)|The unique ID of discount, as stored in the discount table.|
|description (string)|A description of the applied discount.|
|calculatorPlugin (string)|The discount calculator plugin used to calculate this discount (Fixed, Percentage). |
|IsPrivileged (bool)|If true, the discount is privileged. This can be combined with other discounts.|
|IsActive (bool)|If true, the discount is active.|
|validFrom (string)|The starting date for discount validity.|
|validTo (string)|The ending date for discount validity.|
|collectorLogicalOperator (string)|The logical operator for collector (OR, AND) when combining multiple discounts.|
|discountCollectors (DiscountCollectionTransfer[]|A list of discount collectors used for this discount.|
|amount (int)|The total discount amount used for this discount type. It's set by `DiscountCalculatorPlugin`. |

### Expense transfer

| FIELD | DESCRIPTION |
| --- | --- |
| idExpense (int) | The unique ID of the expense. |
|sumGrossPrice (int) |The sum of the item's gross price. It's set by `ExpensesGrossSumAmountCalculatorPlugin`. |
| unitGrossPrice (string) | Single expense price — for example, shipment expenses are set in the `ShipmentStep`.|
| type (string) | The type of expense (shipping). |
| taxRate (int) | The tax rate in percentages. |
| calculatedDiscounts (CalculatedDiscountTransfer[] | A list of applied discounts for this item. |
| quantity (int) | The number of items. |
| IDSalesExpense (int) | The unique ID of the expense as stored in `sales_expense`. |
| unitGrossPriceWithDiscounts (int) | Single item price after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator/ItemDiscounts`. |
| sumGrossPriceWithDiscounts (int)  |The sum off all item prices after discounts. Set by `SumGrossCalculatedDiscountAmountCalculator` and `OrderAmountAggregator/ItemDiscounts`.|
| unitTaxAmountWithDiscounts (int) | The tax amount for a single item after discounts (order only). |
| sumTaxAmountWithDiscounts (int). | The tax amount for a sum of items after discounts (order only). |
| refundableAmount (int) | The total refundable amount for this item (order only). |
| canceledAmount (int) | The total cancelled amount for this item (order only). |
| unitTaxAmount (int) | The tax amount for a single item (order only). |
| sumTaxAmount (int) | The tax amount for a sum of items (order only). |

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| bundle-items, bundled-items | sku | String | SKU of the product. |
| bundle-items, bundled-items | quantity | Integer | Quantity of the given product in the cart. |
| bundle-items, bundled-items | groupKey | String | Unique item identifier. The value is generated based on product parameters. |
| bundle-items, bundled-items | abstractSku | String | Unique identifier of the abstract product that owns the concrete product. |
| bundle-items, bundled-items | amount | Integer | Amount of the products in the cart. |
| bundle-items, bundled-items | unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| bundle-items, bundled-items | sumPrice | Integer | Sum of all items prices calculated. |
| bundle-items, bundled-items | taxRate | Integer | Current tax rate in per cent. |
| bundle-items, bundled-items | unitNetPrice | Integer | Single item net price. |
| bundle-items, bundled-items | sumNetPrice | Integer | Sum of all items' net price. |
| bundle-items, bundled-items | unitGrossPrice | Integer | Single item gross price. |
| bundle-items, bundled-items | sumGrossPrice | Integer | Sum of items gross price. |
| bundle-items, bundled-items | unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| bundle-items, bundled-items | sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| bundle-items, bundled-items | sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| bundle-items, bundled-items | unitSubtotalAggregation | Integer | Subtotal for the given item. |
| bundle-items, bundled-items | unitProductOptionPriceAggregation | Integer | Item total product option price. |
| bundle-items, bundled-items | sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| bundle-items, bundled-items | unitDiscountAmountAggregation | Integer | Item total discount amount. |
| bundle-items, bundled-items | sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| bundle-items, bundled-items | unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| bundle-items, bundled-items | sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| bundle-items, bundled-items | unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| bundle-items, bundled-items | sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
| bundle-items, bundled-items | salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| bundle-items, bundled-items | salesUnit.id | Integer | Numeric value that defines the sales units to calculate the item amount in. |
| bundle-items, bundled-items | salesUnit.amount | Integer | Amount of product in the defined sales units. |
| bundle-items, bundled-items | selectedProductOptions | array | List of attributes describing the product options that were added to the cart with the product. |
| bundle-items, bundled-items | selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| bundle-items, bundled-items | selectedProductOptions.sku | String | SKU of the product option. |
| bundle-items, bundled-items | selectedProductOptions.optionName | String | Product option name. |
| bundle-items, bundled-items | selectedProductOptions.price | Integer | Product option price in cents. |
| bundle-items, bundled-items | selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| items | sku | String | Product SKU. |
| items | quantity | Integer | Quantity of the given product in the cart. |
| items | groupKey | String | Unique item identifier. The value is generated based on product properties. |
| items | abstractSku | String | Unique identifier of the abstract product owning this concrete product. |
| items | amount | Integer | Amount of the products in the cart. |
| items | unitPrice | Integer | Single item price without assuming if it is net or gross. This value should be used everywhere the price is displayed. It allows switching tax mode without side effects. |
| items | sumPrice | Integer | Sum of all items prices calculated. |
| items | taxRate | Integer | Current tax rate in per cent. |
| items | unitNetPrice | Integer | Single item net price. |
| items | sumNetPrice | Integer | Sum of prices of all items. |
| items | unitGrossPrice | Integer | Single item gross price. |
| items | sumGrossPrice | Integer | Sum of items gross price. |
| items | unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| items | sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| items | sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| items | unitSubtotalAggregation | Integer | Subtotal for the given item. |
| items | unitProductOptionPriceAggregation | Integer | Item total product option price. |
| items | sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| items | unitDiscountAmountAggregation | Integer | Item total discount amount. |
| items | sumDiscountAmountAggregation | Integer | Sum of Item total discount amount. |
| items | unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| items | sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| items | unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| items | sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts).|
| items | salesUnit |Object | List of attributes defining the sales unit to be used for item amount calculation. |
| items | salesUnit.id | Integer | Numeric value the defines the sales units to calculate the item amount in. |
| items | salesUnit.amount | Integer | Amount of product in the defined sales units. |
| items | selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |
| items | selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| items | selectedProductOptions.sku | String | SKU of the product option. |
| items | selectedProductOptions.optionName | String | Product option name. |
| items | selectedProductOptions.price | Integer | Product option price in cents. |
| items | selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |
| items | threshold | Array | Thresholds applied. |
| items | type | String | Threshold type. |
| items | threshold | Integer | Threshold monetary amount. |
| items | fee | Integer | Fee to be paid if the threshold is not reached.  |
| items | deltaWithSubtotal | Integer | Displays the remaining amount that needs to be added to pass the threshold. |
| items | message | String | Message shown to the customer if the threshold is not fulfilled. |

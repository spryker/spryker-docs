| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| sku | String | Product SKU. |
| quantity | Integer | Quantity of the given product in the cart. |
| groupKey | String | Unique item identifier. The value is generated based on product properties. |
| abstractSku | String | Unique identifier of the abstract product owning this concrete product. |
| amount | Integer | Amount of the products in the cart. |
| unitPrice | Integer | Single item price without assuming if it is net or gross. This value should be used everywhere the price is displayed. It allows switching tax mode without side effects. |
| sumPrice | Integer | Sum of all items prices calculated. |
| taxRate | Integer | Current tax rate in per cent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum of prices of all items. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum of Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts).|
| salesUnit |Object | List of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer | Numeric value the defines the sales units to calculate the item amount in. |
| salesUnit.amount | Integer | Amount of product in the defined sales units. |
| selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |
| selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| selectedProductOptions.sku | String | SKU of the product option. |
| selectedProductOptions.optionName | String | Product option name. |
| selectedProductOptions.price | Integer | Product option price in cents. |
| selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |

<a name="threshold-attributes">**Threshold attributes**</a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| type | String | Threshold type. |
| threshold | Integer | Threshold monetary amount. |
| fee | Integer | Fee to be paid if the threshold is not reached.  |
| deltaWithSubtotal | Integer | Displays the remaining amount that needs to be added to pass the threshold. |
| message | String | Message shown to the customer if the threshold is not fulfilled. |

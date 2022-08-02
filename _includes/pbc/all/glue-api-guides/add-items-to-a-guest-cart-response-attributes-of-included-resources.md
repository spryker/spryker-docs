| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| guest-cart-items, bundle-items, bundled-items | sku | String | SKU of the product. |
| guest-cart-items, bundle-items, bundled-items | quantity | Integer | Quantity of the given product in the cart. |
| guest-cart-items, bundle-items, bundled-items | groupKey | String | Unique item identifier. The value is generated based on product parameters. |
| guest-cart-items, bundle-items, bundled-items | abstractSku | String | Unique identifier of the abstract product that owns the concrete product. |
| guest-cart-items | amount | Integer | Amount of the products in the cart. |
| guest-cart-items | unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| guest-cart-items | sumPrice | Integer | Sum of all items prices calculated. |
| guest-cart-items | taxRate | Integer | Current tax rate in per cent. |
| guest-cart-items | unitNetPrice | Integer | Single item net price. |
| guest-cart-items | sumNetPrice | Integer | Sum of all items' net price. |
| guest-cart-items | unitGrossPrice | Integer | Single item gross price. |
| guest-cart-items | sumGrossPrice | Integer | Sum of items gross price. |
| guest-cart-items | unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| guest-cart-items | sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| guest-cart-items | sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| guest-cart-items | unitSubtotalAggregation | Integer | Subtotal for the given item. |
| guest-cart-items | unitProductOptionPriceAggregation | Integer | Item total product option price. |
| guest-cart-items | sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| guest-cart-items | unitDiscountAmountAggregation | Integer | Item total discount amount. |
| guest-cart-items | sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| guest-cart-items | unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| guest-cart-items | sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| guest-cart-items | unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| guest-cart-items | sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
| guest-cart-items | salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| guest-cart-items | salesUnit.id | Integer | Numeric value that defines the sales units to calculate the item amount in. |
| guest-cart-items | salesUnit.amount | Integer | Amount of product in the defined sales units. |
| guest-cart-items | selectedProductOptions | array | List of attributes describing the product options that were added to the cart with the product. |
| guest-cart-items | selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| guest-cart-items | selectedProductOptions.sku | String | SKU of the product option. |
| guest-cart-items | selectedProductOptions.optionName | String | Product option name. |
| guest-cart-items | selectedProductOptions.price | Integer | Product option price in cents. |
| guest-cart-items | selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |
| vouchers, cart-rules | displayName | String | Discount name displayed on the Storefront. |
| vouchers, cart-rules | amount | Integer | Amount of the provided discount. |
| vouchers, cart-rules | code | String | Discount code. |
| vouchers, cart-rules | discountType | String | Discount type. |
| vouchers, cart-rules  | isExclusive | Boolean | Discount exclusivity. |
| vouchers, cart-rules | expirationDateTime | DateTimeUtc | Date and time on which the discount expires. |
| vouchers, cart-rules | discountPromotionAbstractSku | String | SKU of the products to which the discount applies. If the discount can be applied to any product, the value is `null`. |
| vouchers, cart-rules | discountPromotionQuantity | Integer | Specifies the amount of the product required to be able to apply the discount. If the minimum number is `0`, the value is `null`. |

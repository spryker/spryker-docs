| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
|items, bundle-items, bundled-items| sku |String| Unique identifier of the product that was added to the cart.|
|items, bundle-items, bundled-items| quantity |Integer| Quantity of the product that was added to the cart.|
|items, bundle-items, bundled-items |groupKey| String| Unique identifier of product as a cart item. |The value is generated based on the product’s  properties.|
|items, bundle-items, bundled-items| abstractSku |String |Unique identifier of the abstract product that owns the concrete product.|
| product-options | optionGroupName | String | Name of the group to which the option belongs. |
| product-options | sku | String | SKU of the product option. |
| product-options | optionName | String | Product option name. |
| product-options | price | Integer | Product option price in cents. |
| product-options | currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |
| vouchers, cart-rules | displayName | String | Discount name displayed on the Storefront. |
| vouchers, cart-rules | amount | Integer | Amount of the provided discount. |
| vouchers, cart-rules | code | String | Discount code. |
| vouchers, cart-rules | discountType | String | Discount type. |
| vouchers, cart-rules  | isExclusive | Boolean | Discount exclusivity. |
| vouchers, cart-rules | expirationDateTime | DateTimeUtc | Date and time on which the discount expires. |
| vouchers, cart-rules | discountPromotionAbstractSku | String | SKU of the products to which the discount applies. If the discount can be applied to any product, the value is `null`. |
| vouchers, cart-rules | discountPromotionQuantity | Integer | Specifies the amount of the product required to be able to apply the discount. If the minimum number is `0`, the value is `null`. |

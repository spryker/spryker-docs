#### General cart information

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| carts | currency | String | Currency that was selected when the cart was created. |
| carts | isDefault | Boolean | Specifies whether the cart is the default one for the customer. The field is available in multi-cart environments only. |
| carts | name | String | Specifies a cart name. The field is available in multi-cart environments only. |
| carts | priceMode | String | Price mode that was active when the cart was created. |
| carts | store | String | Store for which the cart was created. |

#### Discount information

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| carts | displayName | String | Discount name. |
| carts | amount | Integer | Discount amount applied to the cart. |
| carts | code | String | Discount code applied to the cart. |

#### Totals

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| carts | expenseTotal | String | Total amount of expenses such as shipping costs. |
| carts | discountTotal | Integer | Total amount of discounts applied to the cart. |
| carts | taxTotal | Integer | Total amount of taxes to be paid. |
| carts | subTotal | Integer | Subtotal of the cart. |
| carts | grandTotal | Integer | Grand total of the cart. |
| carts | priceToPay | Integer | Total price of the cart to pay after discounts. |
| carts | selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |

#### Thresholds

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| carts | threshold | Array | Thresholds applied. |
| carts | type | String | Threshold type. |
| carts | threshold | Integer | Threshold monetary amount. |
| carts | fee | Integer | Fee to be paid if the threshold is not reached.  |
| carts | deltaWithSubtotal | Integer | Displays the remaining amount that needs to be added to pass the threshold. |
| carts | message | String | Message shown to the customer if the threshold is not fulfilled. |

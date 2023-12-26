#### General cart information

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| guest-carts | priceMode | String | Price mode that was active when the cart was created. |
| guest-carts | currency | String | Currency that was selected when the cart was created. |
| guest-carts | store | String | Store for which the cart was created. |
| guest-carts | name | String | Name of the shopping cart. |
| guest-carts | isDefault | Boolean | Defines whether the cart is default or not. |

#### Totals information

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| guest-carts | expenseTotal | Integer | Total amount of expenses (including e.g. shipping costs). |
| guest-carts | discountTotal | Integer | Total amount of discounts applied to the cart. |
| guest-carts | taxTotal | Integer | Total amount of taxes to be paid. |
| guest-carts | subTotal | Integer | Subtotal of the cart. |
| guest-carts | grandTotal | Integer | Grand total of the cart. |

#### Discount information

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| guest-carts | displayName | String | Discount name. |
| guest-carts | code | String | Discount code applied to the cart. |
| guest-carts | amount | Integer | Discount amount applied to the cart. |

#### Thresholds

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| carts | threshold | Array | Thresholds applied. |
| carts | type | String | Threshold type. |
| carts | threshold | Integer | Threshold monetary amount. |
| carts | fee | Integer | Fee to be paid if the threshold is not reached.  |
| carts | deltaWithSubtotal | Integer | Displays the remaining amount that needs to be added to pass the threshold. |
| carts | message | String | Message shown to the customer if the threshold is not fulfilled. |

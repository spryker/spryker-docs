**General Cart Information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Specifies a cart name.<br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.<br>The field is available in multi-cart environments only.  |

**Discount Information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | Integer | Total amount of expenses (including, e.g., shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | Integer | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |
| selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |

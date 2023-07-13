**General Cart Information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Name of the shopping cart. |
| isDefault | Boolean | Defines whether the cart is default or not. |

**Totals Information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | Integer | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart. |
| taxTotal | Integer | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart. |
| grandTotal | Integer | Grand total of the cart. |

**Discount Information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| code | String | Discount code applied to the cart. |
| amount | Integer | Discount amount applied to the cart. |

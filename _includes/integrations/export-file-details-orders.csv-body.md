These are the header fields included in the `order.csv` file:

| DEFAULT SEQUENCE | .CSV COLUMN HEADER NAME | ✓ | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| 1 | order_reference | Yes | String | Unique | Order reference identifier. |
| 2 | customer_reference | No | String |  | Customer reference identifier. |
| 3 | order_created_at | No | Date Time |  | Timestamp of this order creation. |
| 4 | order_updated_at | No | Date Time |  | Last update timestamp of this order. |
| 5 | order_store | No | String |  | The name of the store where the order was place. |
| 6 | email | No | String |  | E-mail of the customer. |
| 7 | salutation | No | String |  | Salutation used with the customer. |
| 8 | first_name | No | String |  | Customer's first name. |
| 9 | last_name | No | String |  | Customer's last name. |
| 10 | order_note | No | String |  | Note added to the order. |
| 11 | currency_iso_code | No | String |  | Indicates the currency used in the order. |
| 12 | price_mode | No | Enum (NET_MODE, GROSS_MODE) |  | Indicates if the order was calculated in a net or gross price mode. |
| 13 | 	locale_name | No | String |  | Sales order's locale used during the checkout. The Sales Order has a relation to the Locale which was used during the checkout so that the same locale can be used for communication. |
| 14 | billing_address_salutation | No | ENUM (Mr, Mrs, Dr, Ms) |  | Customer salutation used with the billing address. |
| 15 | billing_address_first_name | Yes | String |  | Customer's first name used in the billing address. |
| 16 | billing_address_last_name | Yes | String |  | Customer's last name used in the billing address. |
| 17 | billing_address_middle_name | No | String |  | Customer's middle name used in the billing address. |
| 18 | billing_address_email | No | String |  | E-mail used with the billing address. |
| 19 | billing_address_cell_phone | No | String |  | Cell phone used with the billing address. |
| 20 | billing_address_phone | No | String |  | Phone used with the billing address. |
| 21 | billing_address_address1 | No | String |  | Address first line of the billing address. Billing address is the address to which the invoice or bill is registered. |
| 22 | billing_address_address2 | No | String |  | Address second line of the billing address. |
| 23 | billing_address_address3 | No | String |  | Address third line of the billing address. |
| 24 | billing_address_city | Yes | String |  | City of the billing address. |
| 25 | billing_address_zip_code | Yes | String |  | Zip code of the billing address. |
| 26 | 	billing_address_po_box | No | String |  | P.O. Box of the billing address. |
| 27 | billing_address_company | No | String |  | Company used in the billing address. |
| 28 | billing_address_description | No | String |  | Description used with the billing address. |
| 29 | billing_address_comment | No | String |  | Comment used with the billing address. |
| 30 | 	billing_address_country | Yes | String |  | Country of the billing address. |
| 31 | billing_address_region | No | String |  | Region of the billing address. |
| 32 | 	order_totals_canceled_total | No | Number | The original value is multiplied by 100, before stored in this field. | Canceled total of the order totals. |
| 33 | order_totals_discount_total | No | Number | The original value is multiplied by 100, before stored in this field. | Discount total of the order totals. |
| 34 | order_totals_grand_total | No | Number | The original value is multiplied by 100, before stored in this field. | Grand total of the order totals. |
| 35 | order_totals_order_expense_total | No | Number | The original value is multiplied by 100, before stored in this field. | Order expense total of the order totals. |
| 36 | order_totals_refund_total | No | Number | The original value is multiplied by 100, before stored in this field. | Refund total of the order totals. |
| 37 | order_totals_subtotal | No | Number | The original value is multiplied by 100, before stored in this field. | Subtotal of the order totals. |
| 38 | order_totals_tax_total | No | Number | The original value is multiplied by 100, before stored in this field. | Tax total of the order totals. |
| 39 | order_comments | No | Object | The comments are presented in a  JSON array format:<br>*order_comments<br>{% raw %}{{{% endraw %}username, message, createdat, updated_at}, …}* | Comments added by the customer to the sales order.<br>Username may be a different name from the customer first, middle or last name, e. g. a nickname.
 |

 Check out the [orders.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/orders.csv).
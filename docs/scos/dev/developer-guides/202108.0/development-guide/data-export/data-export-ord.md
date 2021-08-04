---
title: Data Export Orders .csv Files Format
originalLink: https://documentation.spryker.com/2021080/docs/data-export-orders-csv-files-format
redirect_from:
  - /2021080/docs/data-export-orders-csv-files-format
  - /2021080/docs/en/data-export-orders-csv-files-format
---

This article contains content of the following files you get when [exporting data on orders](https://documentation.spryker.com/docs/exporting-data) generated in Spryker:

*     orders.csv
*     order-items.csv
*     order-expenses.csv

## Orders

These are the header fields included in the order.csv file:

| Default sequence | .csv column header name | Mandatory | Type | Other requirements / Comments | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | order_reference | Yes | String | Unique | Order reference identifier. |
| 2 | customer_reference | No | String |  | Customer reference identifier. |
| 3 | order_created_at | No | Date Time |  | Timestamp of this order creation. | 
| 4 | order_updated_at | No | Date Time |  | Last update timestamp of this order. |
| 5 | order_store | No | String |  | The name of the store where the order was place. | 
| 6 | email | No | String |  | E-mail of the customer. |
| 7 | salutation | No | String |  | Salutation used with the customer. |
| 8 | first_name | No | String |  | Customer’s first name. | 
| 9 | last_name | No | String |  | Customer’s last name. |
| 10 | order_note | No | String |  | Note added to the order. | 
| 11 | currency_iso_code | No | String |  | Indicates the currency used in the order. |
| 12 | price_mode | No | Enum (NET_MODE, GROSS_MODE) |  | Indicates if the order was calculated in a net or gross price mode. |
| 13 | 	locale_name | No | String |  | Sales order’s locale used during the checkout. The Sales Order has a relation to the Locale which was used during the checkout so that the same locale can be used for communication. | 
| 14 | billing_address_salutation | No | ENUM (Mr, Mrs, Dr, Ms) |  | Customer salutation used with the billing address. |
| 15 | billing_address_first_name | Yes | String |  | Customer’s first name used in the billing address. | 
| 16 | billing_address_last_name | Yes | String |  | Customer’s last name used in the billing address. |
| 17 | billing_address_middle_name | No | String |  | Customer’s middle name used in the billing address. |
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
 
##  Order Items

These are the header fields included in the order_items.csv file: 


| Default sequence | .csv column header name | Mandatory | Type | Other requirements / Comments | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | order_reference | Yes | String |  | Order reference identifier. |
| 2 | order_item_reference | No | String | Unique | Order item reference identifier. |
| 3 | product_name | No | String |  | Product name of the order item. |
| 4 | product_sku | Yes | String |  | SKU of the order item. |
| 5 | canceled_amount | No | Number | Default = 0 | Canceled amount of the order item. |
| 6 | order_item_note | No | String |  | Note of the order item. |
| 7 | discount_amount_aggregation | No | Number | Default = 0 | Discount amount aggregation of the order item. |
| 8 | discount_amount_full_aggregation | No | Number | Default = 0 | Discount amount full aggregation of the order item. |
| 9 | expense_price_aggregation | No | Number | Default = 0 | Expense price aggregation of the order item. |
| 10 | gross_price | No | Number | The original value is multiplied by 100, before stored in this field. | Gross price of the order item. |
| 11 | net_price | No | Number | The original value is multiplied by 100, before stored in this field. | Net price of the order item. |
| 12 | price | No | Number | The original value is multiplied by 100, before stored in this field. | Price of the order item. |
| 13 | price_to_pay_aggregation | No | Number | The original value is multiplied by 100, before stored in this field. | Price to pay aggregation of the order item. |
| 14 | 	product_option_price_aggregation | No | Number | The original value is multiplied by 100, before stored in this field. | Product option price aggregation of the order item. |
| 15 | quantity | Yes | Number | Default = 1 | Quantity of items in this order item. |
| 16 | refundable_amount | No | Number | The original value is multiplied by 100, before stored in this field. | Refundable amount of the order item. |
| 17 | subtotal_aggregation | No | Number | The original value is multiplied by 100, before stored in this field. | Subtotal aggregation of the order item. |
| 18 | tax_amount | No | Number | The original value is multiplied by 100, before stored in this field. | Tax amount of the order item. |
| 19 | tax_amount_after_cancellation | No | Number | The original value is multiplied by 100, before stored in this field. | Tax amount after cancellation of the order item. |
| 20 | tax_amount_full_aggregation | No | Number | The original value is multiplied by 100, before stored in this field. | Tax amount full aggregation of the order item. |
| 21 | tax_rate | No | Number |  | Tax rate of the order item. |
| 22 | tax_rate_average_aggregation | No | Number |  | Tax rate average aggregation of the order item. |
| 23 | order_item_created_at | No | Date Time |  | Timestamp of this order item creation. |
| 24 | order_item_update_at | No | Date Time |  | Last update timestamp of this order item. |
| 25 | order_item_state | Yes | String |  | State of this order item. Project specific states defined in Spryker project state-machine are: Pay, Ship, Stock-update, Close, Return, Refund. |
| 26 | order_item_state_description | No | String |  | State description of this order item. |
| 27 | order_item_process | No | String |  | Process of this order item. |
| 28 | order_item_bundle_id | No | Number |  | Bundle product information identifier of the order item. |
| 29 | order_item_bundle_note | No | String |  | Note of the ordered item bundle product. |
| 30 | 	order_item_bundle_gross_price | Yes | Number |  | Gross price of the ordered item bundle product. |
| 31 | order_item_bundle_image | No | String |  | Image of the order item bundle product. |
| 32 | 	order_item_bundle_product_name | Yes | String |  | Bundle product name of the order item. |
| 33 | order_item_bundle_net_price | No | Number | Default = 0 | Net price of the ordered item bundle. |
| 34 | order_item_bundle_price | No | Number | Default = 0 | Price of the ordered item bundle. |
| 35 | order_item_bundle_product_sku | Yes | String |  | SKU of the product bundle in the order item. |
| 36 | order_shipment_id | No | Number |  | Order shipment identifier. |
| 37 | shipment_carrier_name | No | String |  | Name of the shipment carrier. |
| 38 | shipment_delivery_time | No | String |  | Delivery time of the shipment. |
| 39 | shipment_method_name | No | String |  | Name of the shipment method. |
| 40 | shipment_requested_delivery_date | No | Date |  | Requested delivery date of the shipment. |
| 41 | 	shipping_address_salutation | No | String |  | Customer salutation used with shipping address. |
| 42 | 	shipping_address_first_name | No | String |  | Customer’s first name used in shipping address. |
| 43 | shipping_address_last_name | No | String |  | Customer’s last name used in shipping address. |
| 44 | shipping_address_middle_name | No | String |  | Customer’s middle name used in shipping address. |
| 45 | shipping_address_email | No | String |  | E-mail used with shipping address. |
| 46 | shipping_address_cell_phone | No | String |  | Cell phone used with shipping address. |
| 47 | shipping_address_phone | No | String |  | Phone used with shipping address. |
| 48 | shipping_address_address1 | No | String |  | Address first line of shipping address.<br>Shipping address is the address to where the order is shipped. |
| 49 | shipping_address_address2 | No | String |  | Address second line of shipping address. |
| 50 | shipping_address_address3 | No | String |  | Address third line of shipping address. |
| 51 | shipping_address_city | No | String |  | City of shipping address. |
| 52 | shipping_address_zip_code | Yes | String |  | Zip code of shipping address. |
| 53 | shipping_address_po_box | No | String |  | P.O. Box of shipping address. |
| 54 | shipping_address_company | No | String |  | Company used in shipping address. |
| 55 | shipping_address_description | No | String |  | Description used with shipping address. |
| 56 | 	shipping_address_comment | No | String |  | Comment used with shipping address. |
| 57 | shipping_address_country | Yes | String |  | Country of shipping address. |
| 58 | shipping_address_region | No | String |  | Region of shipping address. |

 Check out the [order-items.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/order-items.csv).
 
##  Order Expenses

| Default sequence | .csv column header name | Mandatory | Type | Other requirements / Comments | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | order_reference | Yes | String |  | Order reference identifier. |
| 2 | order_shipment_id | No | Number |  |Order shipment identification. |
| 3 | canceled_amount | No | Number | Default = 0 | Expense canceled amount. | 
| 4 | discount_amount_aggregation | No | Number | Default = 0 | Expense discount amount aggregation. |
| 5 | gross_price | Yes | Number | The original value is multiplied by 100, before stored in this field | Gross price of the expense. | 
| 6 | name | No | String |  | Name of the expense. |
| 7 | net_price | No | Number | The original value is multiplied by 100, before stored in this field. | Net price of the expense. |
| 8 | price | No | Number | The original value is multiplied by 100, before stored in this field. | Price of the expense. | 
| 9 |price_to_pay_aggregation  | No | Number |The original value is multiplied by 100, before stored in this field.  |Expense price to pay aggregation.  |
| 10 | refundable_amount | No | Number | The original value is multiplied by 100, before stored in this field. |Refundable amount of the expense. | 
| 11 | 	tax_amount | No | Number |The original value is multiplied by 100, before stored in this field.  | Tax amount of the expense. |
| 12 | 	tax_amount_after_cancellation | No | Number | The original value is multiplied by 100, before stored in this field. | Expense tax amount after cancellation. |
| 13 | tax_rate	 | No | Number |  | Tax rate of the expense. | 
| 14 | 	type | No | String |  | Type of expense. |
| 15 | expense_created_at | Yes | Date Time |  |Timestamp of this sales expense creation.  | 
| 16 |expense_updated_at | Yes | Date Time |  | Last update timestamp of this sales expense. |

 Check out the [order-expenses.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/order-expenses.csv).

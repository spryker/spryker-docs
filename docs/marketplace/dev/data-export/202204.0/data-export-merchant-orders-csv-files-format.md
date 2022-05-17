---
title: Data export Merchant Orders CSV files format
last_updated: May 27, 2021
description: This document contains content of merchant-orders, merchant order-items, and merchant-order-expenses.
template: import-file-template
---

This document contains content of the following files you get when [exporting data on orders](/docs/scos/dev/data-export/{{page.version}}/data-export.html) generated in Spryker:

* merchant-orders
* merchant-order-items
* merchant-order-expenses

## Merchant orders

These are the parameters included in the `merchant_orders.csv` file:

| DEFAULT SEQUENCE | PARAMETER | REQUIRED? | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| 1 | merchant_order_reference | &check; | String | Unique | Merchant order reference identifier. |
| 2 | marketplace_order_reference | &check; | String | Unique | Marketplace order reference identifier. |
| 3 | customer_reference |   | String |   | Customer reference identifier. |
| 4 | merchant_order_created_at |   | Date Time |   | Merchant order creation date. |
| 5 | merchant_order_updated_at |   | Date Time |   | Last update date of the merchant order. |
| 6 | merchant_order_store |   | String |   | Name of the store where the order to this merchant was placed. |
| 7 | email |   | String |   | Email of the customer. |
| 8 | salutation |   | String |   | Salutation used with the customer. |
| 9 | first_name |   | String |   | Customer’s first name. |
| 10 | last_name |   | String |   | Customer’s last name. |
| 11 | order_note |   | String |   | Note added to the order. |
| 12 | currency_iso_code |   | String |   | Indicates the currency used in the order. |
| 13 | price_mode |   | Enum (NET_MODE, GROSS_MODE) |   | Indicates if the order was calculated in a net or gross price mode. |
| 14 | locale_name |   | String |   | Sales order’s locale used during the checkout. The sales order has a relation to the locale used during the checkout so that the same locale can be used for communication. |
| 15 | billing_address_salutation |   |   |   | Customer salutation used with the billing address. |
| 16 | billing_address_first_name | &check; | String |   | Customer’s first name used in the billing address. |
| 17 | billing_address_last_name | &check; | String |   | Customer’s last name used in the billing address. |
| 18 | billing_address_middle_name |   | String |   | Customer’s middle name used in the billing address. |
| 19 | billing_address_email |   | String |   | Email used with the billing address. |
| 20 | billing_address_cell_phone |   | String |   | Cell phone used with the billing address. |
| 21 | billing_address_phone |   | String |   | Phone used with the billing address. |
| 22 | billing_address_address1 |   | String |   | First line of the billing address. The billing address is the address to which the invoice or bill is registered. |
| 23 | billing_address_address2 |   | String |   | Second line of the billing address. |
| 24 | billing_address_address3 |   | String |   | Third line of the billing address. |
| 25 | billing_address_city | &check; | String |   | City of the billing address. |
| 26 | billing_address_zip_code | &check; | String |   | Zip code of the billing address. |
| 27 | billing_address_po_box |   | String |   | P.O. Box of the billing address. |
| 28 | billing_address_company |   | String |   | Company used in the billing address. |
| 29 | billing_address_description |   | String |   | Description used with the billing address. |
| 30 | billing_address_comment |   | String |   | Comment used with the billing address. |
| 31 | billing_address_country | &check; | String |   | Country of the billing address. |
| 32 | billing_address_region |   | String |   | Region of the billing address. |
| 33 | merchant_order_totals_canceled_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Cancelled total of the order totals for this merchant. |
| 34 | merchant_order_totals_discount_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Discount total of the order totals for this merchant. |
| 35 | merchant_order_totals_grand_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Grand total of the order totals for this merchant. |
| 36 | merchant_order_totals_order_expense_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Order expense total of the order totals for this merchant. |
| 37 | merchant_order_totals_refund_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Refund total of the order totals for this merchant. |
| 38 | merchant_order_totals_subtotal |   | Number | Original value is multiplied by 100 before it is stored in this field. | Subtotal of the order totals for this merchant. |
| 39 | merchant_order_totals_tax_total |   | Number | Original value is multiplied by 100 before it is stored in this field. | Tax total of the order totals for this merchant. |
| 40 | merchant_order_comments |   | Object | Comments are presented in a JSON array format: order_comments {% raw %}{{username, message, created_at, updated_at},...}{% endraw %} | Comments added by the customer to the sales order for this merchant. Username may be a different name from the customer’s first, middle, or last name—for example, a nickname. |

Check out the [merchant-orders.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/merchant-orders.csv).

## Merchant order items

These are the header fields included in the `merchant_order_items.csv` file:

| DEFAULT SEQUENCE | CSV COLUMN HEADER NAME | REQUIRED? | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| 1 | merchant_order_reference | &check; | String | Unique | Merchant order reference identifier |
| 2 | marketplace_order_reference | &check; | String | Unique | Marketplace order reference identifier. |
| 3 | product_name |   | String |   | Product name of the merchant order item. |
| 4 | merchant_order_item_reference |   | String | Unique | Merchant order item reference |
| 5 | product_sku | &check; | String |   | Product SKU of the ordered item. |
| 6 | canceled_amount |   | Number | Default = 0 | Canceled amount of the ordered item. |
| 7 | order_item_note |   | String |   | Note to the ordered item. |
| 8 | discount_amount_aggregation |   | Number | Default = 0 | Discount amount aggregation of the merchant order item. |
| 9 | discount_amount_full_aggregation |   | Number | Default = 0 | Discount amount full aggregation of the merchant order item. |
| 10 | expense_price_aggregation |   | Number | Default = 0 | Expense price aggregation of the merchant order item. |
| 11 | gross_price |   | Number | Original value is multiplied by 100 before it is stored in this field. | Gross price of the ordered item. |
| 12 | net_price |   | Number | Original value is multiplied by 100 before it is stored in this field. | Net price of the ordered item. |
| 13 | price |   | Number | Original value is multiplied by 100 before it is stored in this field. | Price of the ordered item. |
| 14 | price_to_pay_aggregation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Price to pay aggregation of the ordered item. |
| 15 | product_option_price_aggregation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Product option price aggregation of the ordered item. |
| 16 | quantity | &check; | Number | Default = 1 | Quantity of items in this order item. |
| 17 | refundable_amount |   | Number | Original value is multiplied by 100 before it is stored in this field. | Refundable amount of the ordered item. |
| 18 | subtotal_aggregation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Subtotal aggregation of the ordered item. |
| 19 | tax_amount |   | Number | Original value is multiplied by 100 before it is stored in this field. | Tax amount of the ordered item. |
| 20 | tax_amount_after_cancellation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Tax amount after the cancellation of the ordered item. |
| 21 | tax_amount_full_aggregation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Tax amount full aggregation of the ordered item. |
| 22 | tax_rate |   | Number |   | Tax rate of the ordered item. |
| 23 | tax_rate_average_aggregation |   | Number |   | Tax rate average aggregation of the ordered item. |
| 24 | merchant_order_item_created_at |   | Date Time |   | Merchant order item creation date. |
| 25 | merchant_order_item_updated_at |   | Date Time |   | Merchant order item update date. |
| 26 | merchant_order_item_state | &check; | String |   | State of this merchant order item according to the merchant state machine. Project-specific states defined in Spryker project state-machine are XXX. |
| 27 | merchant_order_item_state_description |   | String |   | State description of this merchant order item. |
| 28 | merchant_order_item_process |   | String |   | Process of this merchant order item. |
| 29 | merchant_order_item_bundle_id |   | String |   | Bundle product information identifier of the merchant order item. |
| 30 | merchant_order_item_bundle_note |   | String |   | Note to the ordered item bundle product from this merchant. |
| 31 | merchant_order_item_bundle_gross_price | &check; | Number |   | Gross price of the ordered item bundle product from this merchant. |
| 32 | merchant_order_item_bundle_image |   | String |   | Image of the order item bundle product from this merchant. |
| 33 | merchant_order_item_bundle_product_name | &check; | String |   | Bundle product name of the merchant order item. |
| 34 | merchant_order_item_bundle_net_price |   | Number |   | Net price of the ordered item bundle from this merchant. |
| 35 | merchant_order_item_bundle_price |   | Number |   | Price of the ordered item bundle from this merchant. |
| 36 | merchant_order_item_bundle_product_sku | &check; | String |   | SKU of the product bundle in the merchant order item. |
| 37 | order_shipment_id |   | Number |   | Order shipment identifier. |
| 38 | shipment_carrier_name |   | String |   | Name of the shipment carrier. |
| 39 | shipment_delivery_time |   | String |   | Delivery time of the shipment. |
| 40 | shipment_method_name |   | String |   | Name of the shipment method. |
| 41 | shipment_requested_delivery_date |   | Date |   | Requested delivery date of the shipment. |
| 42 | shipping_address_salutation |   | String |   | Customer salutation used with shipping address. |
| 43 | shipping_address_first_name |   |   |   | Customer’s first name used in the shipping address. |
| 44 | shipping_address_last_name |   | String |   | Customer’s last name used in the shipping address. |
| 45 | shipping_address_middle_name |   | String |   | Customer’s middle name used in the shipping address. |
| 46 | shipping_address_email |   | String |   | Email used with shipping address. |
| 47 | shipping_address_cell_phone |   | String |   | Cell phone used with shipping address. |
| 48 | shipping_address_phone |   | String |   | Phone used with the shipping address. |
| 49 | shipping_address_address1 |   | String |   | Address first line of the shipping address. The shipping address is the address to where the order is shipped. |
| 50 | shipping_address_address2 |   | String |   | Address second line of the shipping address. |
| 51 | shipping_address_address3 |   | String |   | Address third line of the shipping address. |
| 52 | shipping_address_city |   | String |   | City of the shipping address. |
| 53 | shipping_address_zip_code | &check; | String |   | Zip code of the shipping address. |
| 54 | shipping_address_po_box |   | String |   | P.O. Box of the shipping address. |
| 55 | shipping_address_company |   | String |   | Company used in the shipping address. |
| 56 | shipping_address_description |   | String |   | Description used with the shipping address. |
| 57 | shipping_address_comment |   | String |   | Comment used with the shipping address. |
| 58 | shipping_address_country | &check; | String |   | Country of the shipping address. |
| 59 | shipping_address_region |   | String |   | Region of the shipping address. |

Check out the [merchant-order-items.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/merchant-order-items.csv).

## Merchant order expenses

These are the header fields included in the `merchant_order_expenses.csv` file.

| DEFAULT SEQUENCE | CSV COLUMN HEADER NAME | REQUIRED? | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| 1 | merchant_order_reference | &check; | String | Unique | Merchant order reference identification |
| 2 | marketplace_order_reference | &check; | String | Unique | Marketplace order reference identification. |
| 3 | shipment_id |   | Number |   | Merchant order shipment identification. |
| 4 | canceled_amount |   | Number | Default = 0 | Merchant order expense canceled amount. |
| 5 | discount_amount_aggregation |   | Number | Default = 0 | Merchant order expense discount amount aggregation. |
| 6 | gross_price | &check; | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order gross price of the expense. |
| 7 | name |   | String | Original value is multiplied by 100 before it is stored in this field. | Merchant order name of the expense. |
| 8 | net_price |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order net price of the expense. |
| 9 | price |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order price of the expense. |
| 10 | price_to_pay_aggregation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order expense price to pay aggregation. |
| 11 | refundable_amount |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order refundable amount of the expense. |
| 12 | tax_amount |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order tax amount of the expense. |
| 13 | tax_amount_after_cancellation |   | Number | Original value is multiplied by 100 before it is stored in this field. | Merchant order expense tax amount after cancellation. |
| 14 | tax_rate |   | Number |   | Merchant order tax rate of the expense. |
| 15 | type |   | String |   | Merchant order type of expense. |
| 16 | expense_created_at | &check; | Date Time |   | Merchant order timestamp of this sales expense creation. |
| 17 | expense_updated_at | &check; | Date Time |   | Last update date of the merchant order sales expense. |

Check out the [merchant-order-expenses.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/merchant-order-expenses.csv).

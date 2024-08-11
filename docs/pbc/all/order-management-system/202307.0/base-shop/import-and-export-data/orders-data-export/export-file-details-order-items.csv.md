---
title: "Export file details: order_items.csv"
description: The document explains the format of the orders.csv, order-items.csv, order-expenses.csv export files
last_updated: Jun 16, 2021
template: data-export-template
redirect_from:
  - /docs/pbc/all/order-management-system/202307.0/base-shop/import-and-export-data/export-file-details-order-items.csv.html
related:
  - title: Install the Sales Data Export feature
    link: docs/pbc/all/order-management-system/page.version/base-shop/install-and-upgrade/install-features/install-the-sales-data-export-feature.html
---



These are the header fields included in the `order_items.csv` file:


| DEFAULT SEQUENCE | .CSV COLUMN HEADER NAME | ✓ | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
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

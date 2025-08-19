---
title: "Export file details: merchant_order-items.csv"
last_updated: May 27, 2021
description: This document describes the content of the merchant-order-items export file.
template: import-file-template
redirect_from:
  - /docs/pbc/all/order-management-system/latest/marketplace/import-and-export-data/export-file-details-merchant-order-items.csv.html
related:
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
---


These are the header fields included in the `merchant_order_items.csv` file:

| DEFAULT SEQUENCE | CSV COLUMN HEADER NAME | REQUIRED | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
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
| 11 | gross_price |   | Number | Original value is multiplied by 100 before it's stored in this field. | Gross price of the ordered item. |
| 12 | net_price |   | Number | Original value is multiplied by 100 before it's stored in this field. | Net price of the ordered item. |
| 13 | price |   | Number | Original value is multiplied by 100 before it's stored in this field. | Price of the ordered item. |
| 14 | price_to_pay_aggregation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Price to pay aggregation of the ordered item. |
| 15 | product_option_price_aggregation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Product option price aggregation of the ordered item. |
| 16 | quantity | &check; | Number | Default = 1 | Quantity of items in this order item. |
| 17 | refundable_amount |   | Number | Original value is multiplied by 100 before it's stored in this field. | Refundable amount of the ordered item. |
| 18 | subtotal_aggregation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Subtotal aggregation of the ordered item. |
| 19 | tax_amount |   | Number | Original value is multiplied by 100 before it's stored in this field. | Tax amount of the ordered item. |
| 20 | tax_amount_after_cancellation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Tax amount after the cancellation of the ordered item. |
| 21 | tax_amount_full_aggregation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Tax amount full aggregation of the ordered item. |
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
| 43 | shipping_address_first_name |   |   |   | Customer's first name used in the shipping address. |
| 44 | shipping_address_last_name |   | String |   | Customer's last name used in the shipping address. |
| 45 | shipping_address_middle_name |   | String |   | Customer's middle name used in the shipping address. |
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

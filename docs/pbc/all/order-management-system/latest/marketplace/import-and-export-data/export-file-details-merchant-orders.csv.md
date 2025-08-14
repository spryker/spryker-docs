  - /docs/pbc/all/order-management-system/latest/marketplace/import-and-export-data/export-file-details-merchant-orders.csv.html
---
title: "Export file details: merchant_orders.csv"
last_updated: May 27, 2021
description: This document describes the content of the merchant-order csv export file for your Spryker Marketplace project.
template: import-file-template
redirect_from:
  - /docs/pbc/all/order-management-system/202311.0/marketplace/import-and-export-data/data-export-merchant-orders-csv-files-format.html
related:
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
---

These are the parameters included in the `merchant_orders.csv` file:

| DEFAULT SEQUENCE | PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| 1 | merchant_order_reference | &check; | String | Unique | Merchant order reference identifier. |
| 2 | marketplace_order_reference | &check; | String | Unique | Marketplace order reference identifier. |
| 3 | customer_reference |   | String |   | Customer reference identifier. |
| 4 | merchant_order_created_at |   | Date Time |   | Merchant order creation date. |
| 5 | merchant_order_updated_at |   | Date Time |   | Last update date of the merchant order. |
| 6 | merchant_order_store |   | String |   | Name of the store where the order to this merchant was placed. |
| 7 | email |   | String |   | Email of the customer. |
| 8 | salutation |   | String |   | Salutation used with the customer. |
| 9 | first_name |   | String |   | Customer's first name. |
| 10 | last_name |   | String |   | Customer's last name. |
| 11 | order_note |   | String |   | Note added to the order. |
| 12 | currency_iso_code |   | String |   | Indicates the currency used in the order. |
| 13 | price_mode |   | Enum (NET_MODE, GROSS_MODE) |   | Indicates if the order was calculated in a net or gross price mode. |
| 14 | locale_name |   | String |   | Sales order's locale used during the checkout. The sales order has a relation to the locale used during the checkout so that the same locale can be used for communication. |
| 15 | billing_address_salutation |   |   |   | Customer salutation used with the billing address. |
| 16 | billing_address_first_name | &check; | String |   | Customer's first name used in the billing address. |
| 17 | billing_address_last_name | &check; | String |   | Customer's last name used in the billing address. |
| 18 | billing_address_middle_name |   | String |   | Customer's middle name used in the billing address. |
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
| 33 | merchant_order_totals_canceled_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Cancelled total of the order totals for this merchant. |
| 34 | merchant_order_totals_discount_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Discount total of the order totals for this merchant. |
| 35 | merchant_order_totals_grand_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Grand total of the order totals for this merchant. |
| 36 | merchant_order_totals_order_expense_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Order expense total of the order totals for this merchant. |
| 37 | merchant_order_totals_refund_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Refund total of the order totals for this merchant. |
| 38 | merchant_order_totals_subtotal |   | Number | Original value is multiplied by 100 before it's stored in this field. | Subtotal of the order totals for this merchant. |
| 39 | merchant_order_totals_tax_total |   | Number | Original value is multiplied by 100 before it's stored in this field. | Tax total of the order totals for this merchant. |
| 40 | merchant_order_comments |   | Object | Comments are presented in a JSON array format: order_comments {% raw %}{{username, message, created_at, updated_at},...}{% endraw %} | Comments added by the customer to the sales order for this merchant. Username may be a different name from the customer's first, middle, or last name—for example, a nickname. |

Check out the [merchant-orders.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/merchant-orders.csv).

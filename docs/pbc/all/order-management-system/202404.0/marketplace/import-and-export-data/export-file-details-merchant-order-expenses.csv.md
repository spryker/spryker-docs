---
title: "Export file details: merchant_order-expenses.csv"
last_updated: May 27, 2021
description: This document describes the content of merchant-order-expenses.
template: import-file-template
redirect_from:
related:
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
---

These are the header fields included in the `merchant_order_expenses.csv` file.

| DEFAULT SEQUENCE | CSV COLUMN HEADER NAME | REQUIRED | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| 1 | merchant_order_reference | &check; | String | Unique | Merchant order reference identification |
| 2 | marketplace_order_reference | &check; | String | Unique | Marketplace order reference identification. |
| 3 | shipment_id |   | Number |   | Merchant order shipment identification. |
| 4 | canceled_amount |   | Number | Default = 0 | Merchant order expense canceled amount. |
| 5 | discount_amount_aggregation |   | Number | Default = 0 | Merchant order expense discount amount aggregation. |
| 6 | gross_price | &check; | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order gross price of the expense. |
| 7 | name |   | String | Original value is multiplied by 100 before it's stored in this field. | Merchant order name of the expense. |
| 8 | net_price |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order net price of the expense. |
| 9 | price |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order price of the expense. |
| 10 | price_to_pay_aggregation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order expense price to pay aggregation. |
| 11 | refundable_amount |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order refundable amount of the expense. |
| 12 | tax_amount |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order tax amount of the expense. |
| 13 | tax_amount_after_cancellation |   | Number | Original value is multiplied by 100 before it's stored in this field. | Merchant order expense tax amount after cancellation. |
| 14 | tax_rate |   | Number |   | Merchant order tax rate of the expense. |
| 15 | type |   | String |   | Merchant order type of expense. |
| 16 | expense_created_at | &check; | Date Time |   | Merchant order timestamp of this sales expense creation. |
| 17 | expense_updated_at | &check; | Date Time |   | Last update date of the merchant order sales expense. |

Check out the [merchant-order-expenses.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/merchant-order-expenses.csv).

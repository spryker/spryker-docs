---
title: "Import file details: merchant-order-status.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant-order-status.csv file to update merchant order states in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/pbc/all/order-management-system/202311.0/marketplace/import-and-export-data/file-details-merchant-order-status.csv.html
  - /docs/pbc/all/order-management-system/latest/marketplace/import-and-export-data/import-file-details-merchant-order-status.csv.html
related:
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---


This document describes the `merchant-order-status.csv` file to configure the update of the merchant order states in your Spryker Marketplace shop.

## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference |   | String |   | Unique | Identifier of the merchant in the system. |
| merchant_order_reference |   | String |   | Unique | Identifier of the merchant order in the system. |
| order_item_reference | &check; | String |   | Unique | Identifier of the  item in the order. |
| merchant_order_item_event_oms | &check; | String |   | OMS events depend on the  [merchant state machine](/docs/pbc/all/order-management-system/{{site.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html#merchant-state-machine) configured. | Desired order-item state. Only this parameter is updated in the database. |

## Additional Information

When the merchant order item status is updated by importing the CSV file, the corresponding events in a merchant state machine are triggered, and the state gets updated. As a merchant order may contain several order items, the CSV file can have several rows of items for the same order.
`Merchant_order_item_reference` can repeat and have different states in the file. For example, in one case, it's `packed` and then `shipped`. That lets you update the item through different merchant state machine statuses (for instance, `packed` and `shipped`) and avoid errors. If the merchant order item doesn't follow the existing sequence (the statuses flow in the merchant state machine), the state won't be updated, and you will get an error in the uploading process' report.

## Import template file and content example

| FILE | DESCRIPTION |
|-|-|
| [template_merchant-order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant-order-status.csv) | Import file template with headers only. |
| [merchant-order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant-order-status.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
order-oms:status-import merchant-order-status
```

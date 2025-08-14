---
title: "Import file details: order-status.csv"
description: Import the data to to configure the update of the regular order status information
last_updated: Jun 22, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-order-statuscsv
originalArticleId: 9dcde9fc-7757-4a62-997c-a53def8250d1
redirect_from:
  - /2021080/docs/file-details-order-statuscsv
  - /2021080/docs/en/file-details-order-statuscsv
  - /docs/file-details-order-statuscsv
  - /docs/en/file-details-order-statuscsv
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-order-status.csv.html
  - /docs/pbc/all/order-management-system/202311.0/base-shop/file-details-order-status.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/commerce-setup/file-details-order-status.csv.html
  - /docs/pbc/all/order-management-system/latest/base-shop/import-and-export-data/import-file-details-order-status.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `order-status.csv` file to configure the update of the regular order status information in your Spryker shop.

## Import file parameters


| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|
| Order_reference |   |  Must be unique. | Identifier of the order in the system. | |
| order_item_reference | &check; | String | Must be unique. | Identifier of the  item in the order. |
| order_item_event_oms | &check; | String |  OMS events depend on the  [state machine](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html) configured. | Desired order item state. Only this parameter is updated in the database |

## Additional information

When the order item status is updated by importing the CSV file, the corresponding events in a state machine are triggered, and the state gets updated. As an order may contain several order items, the CSV file can have several rows of items for the same order.

`Order_item_reference` can repeat and have different states in the file, for example, in one case, `packed` and then `shipped`. That allows you to update the item through different state machine statuses (for example, `packed` and `shipped`) and avoid errors. If the order item doesn't follow the existing sequence (the statuses flow in the state machine), the state won't be updated, and you will get an error.

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/template_order-status.csv) | Import file template with headers only. |
| [order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/order-status.csv)| Example of the import file with Demo Shop data. |

## Import command

```bash
order-oms:status-import order-status
```

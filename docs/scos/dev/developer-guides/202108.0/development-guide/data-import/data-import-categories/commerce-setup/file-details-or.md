---
title: File details- order-status.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-order-statuscsv
redirect_from:
  - /2021080/docs/file-details-order-statuscsv
  - /2021080/docs/en/file-details-order-statuscsv
---

This document describes the `order-status.csv` file to configure the update of the regular order status information in your Spryker shop.

To import the file, run
```bash
order-oms:status-import order-status
```

## Import file parameters

The file should have the following parameters:

| RAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| Order_reference |   |   |   | Unique | Identifier of the order in the system. |
| order_item_reference | &check; | String |   | Unique | Identifier of the  item in the order. |
| order_item_event_oms | &check; | String |   | OMS events depend on the  [state machine](https://documentation.spryker.com/docs/order-process-modelling-state-machines) configured. | Desired order item state. Only this parameter is updated in the database |

## Import file dependencies
The file has no dependencies.

## Additional Information
When the order item status is updated by importing the .csv file, the corresponding events in a state machine are triggered, and the state gets updated. As an order may contain several order items, the .csv file can have several rows of items for the same order.

`Order_item_reference` can repeat and have different states in the file, for example, in one case, `packed` and then `shipped`. That allows you to update the item through different state machine statuses (for example, `packed` and `shipped`) and avoid errors. If the order item doesn’t follow the existing sequence (the statuses flow in the state machine), the state won’t be updated, and you will get an error.

## Import template file and content example

Find the template and an example of the `order-status.csv` file below:

| FILE | DESCRIPTION |
|-|-|
| [template_order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/template_order-status.csv) | Import file template with headers only. |
| [order-status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/order-status.csv)| Example of the import file with Demo Shop data. |

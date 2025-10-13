---
title: "File details: shopping_list.csv"
description: Use the shopping_list.csv file to configure information about shopping lists in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `shopping_list.csv` file to configure information about [shopping lists](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

[File details: customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies the shopping list to be referred to in future imports. |
|name|&check;|string|Name of the shopping list.|
|owner_customer_reference|&check;|string |Customer reference of the shopping list owner.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list.csv.md/template_shopping_list.csv)| Import file template with headers only. |
| [`shopping_list.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list.csv.md/shopping_list.csv)| Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list
```

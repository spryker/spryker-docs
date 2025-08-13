---
title: "File details: product_list.csv"
description: Use the product_list.csv file to configure information about product lists in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_list.csv` file to configure information about [product lists](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-lists-feature-overview.html) in your Spryker shop.

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
|name|&check;|string|Custom product list name used to provide a readable title or sentence of what the list contains. Used only for internal representation.|
|type|&check;|string ("blacklist"/"whitelist")|Defines whether the list is a blacklist or a whitelist.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_product_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list.csv.md/template_product_list.csv)| Import file template with headers only. |
| [product_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list.csv.md/product_list.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:product-list
```

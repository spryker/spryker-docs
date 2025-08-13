---
title: "File details: shopping_list_item.csv"
description: Use the shopping_list_item.csv file to configure information about shopping list items in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `shopping_list_item.csv` file to configure information about [shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) items in your Spryker shop.

## Import file dependencies

- [shopping_list.csv](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/import-and-export-data/file-details-shopping-list.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies a shopping list to add data to. |
|product_sku|&check;|string| SKU of a concrete product variant added to a shopping list.|
|quantity|&check;|integer | Number of products added to the shopping list.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list_item.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-item.csv.md/template_shopping_list_item.csv) | Import file template with headers only. |
| [`shopping_list_item.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-item.csv.md/shopping_list_item.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list-item
```

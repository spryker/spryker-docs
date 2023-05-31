---
title: "File details: shopping_list_item.csv"
template: data-import-template
last_updated: 
---

This document describes the `shopping_list_item.csv` file to configure information about [shopping list](https://docs.spryker.com/docs/pbc/all/shopping-list-and-wishlist/202212.0/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) items in your Spryker shop.

## Import file dependencies

[shopping_list.csv](_drafts/data-import/base-shop/file-details-shopping-list.csv.md)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies a shopping list to add data to. |
|product_sku|&check;|string| SKU of a concrete product variant added to a shopping list.|
|quantity|&check;|integer | Number of products added to the shopping list.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list_item.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`shopping_list_item.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list-item
```
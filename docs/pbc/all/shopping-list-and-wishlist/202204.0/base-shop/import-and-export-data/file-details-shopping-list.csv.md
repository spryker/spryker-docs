---
title: "File details: shopping_list.csv"
template: data-import-template
last_updated: Jun 1, 2023
---

This document describes the `shopping_list.csv` file to configure information about [shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

[TODO: add dependencies; If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.]

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
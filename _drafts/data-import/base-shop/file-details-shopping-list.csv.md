---
title: "File details: shopping_list.csv"
template: data-import-template
last_updated: 
---

This document describes the `shopping_list.csv` file to configure information about [shopping lists](https://docs.spryker.com/docs/pbc/all/shopping-list-and-wishlist/202212.0/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that will identify the shopping list to be referred to in future imports. |
|name|&check;|string|Name of the shopping list.|
|owner_customer_reference|&check;|string |Customer reference of the shopping list owner.|



## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`shopping_list.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list
```
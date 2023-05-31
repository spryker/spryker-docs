---
title: "File details: product_list.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_list.csv` file to configure information about [product lists](https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/base-shop/feature-overviews/product-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
|name|&check;|string|Custom product list name used to provide a readable title or sentence of what the list contains. Used only for internal representation.|
|type|&check;|string ("blacklist"/"whitelist")|Defines whether the list is a blacklist or a whitelist.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_list.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_list.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:product-list
```
---
title: "File details: product_list_to_category.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_list_to_category.csv` file to configure information about [product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) lists and respective categories in your Spryker shop.

## Import file dependencies

<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
| category_key | &check; | string | Existing category identifier to be assigned to a product list. |


## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_list_to_category.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_list_to_category.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:product-list
```
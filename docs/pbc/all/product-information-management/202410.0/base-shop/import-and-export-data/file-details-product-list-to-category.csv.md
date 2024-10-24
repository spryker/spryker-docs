---
title: "File details: product_list_to_category.csv"
description: Use the product_list_to_category.csv file to configure information about product lists and respective categories in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_list_to_category.csv` file to configure information about [product lists](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-lists-feature-overview.html) and respective categories in your Spryker shop.

## Import file dependencies

* [File details - product_list.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-list.csv.html)
* [File details - category.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
| category_key | &check; | string | Existing category identifier to be assigned to a product list. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_product_list_to_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list-to-category.csv.md/template_product_list_to_category.csv) | Import file template with headers only. |
| [product_list_to_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list-to-category.csv.md/product_list_to_category.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:product-list-to-category
```
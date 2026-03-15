---
title: "File details: product_list_to_concrete_product.csv"
description: Use the product_list_to_concrete_product.csv file to configure configurable product assignments for product lists in your Spryker shop.
template: data-import-template
redirect_from:
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_list_to_concrete_product.csv` file to configure [configurable product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) assignments for [product lists](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

* [File details: product_list.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-list.csv.html)
* [File details: product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
| concrete_sku | &check; | string | An existing concrete product SKU to assign to the product list. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_product_list_to_concrete_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list-to-concrete-product.csv.md/template_product_list_to_concrete_product.csv)| Import file template with headers only. |
| [product_list_to_concrete_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-list-to-concrete-product.csv.md/product_list_to_concrete_product.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:product-list-to-concrete-product
```

---
title: "File details: product_list_to_concrete_product.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_list_to_concrete_product.csv` file to configure [configurable product](https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) assignments for [product lists](https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/base-shop/feature-overviews/product-lists-feature-overview.html) in your Spryker shop.

## Import file dependencies

* [File details - product_list.csv](_drafts/data-import/base-shop/file-details-product-list.csv.md)
* [File details - product_concrete.csv](https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/base-shop/import-and-export-data/products-data-import/file-details-product-concrete.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product_list_key | &check; | string (unique) | Unique identifier used to identify a product list. |
| concrete_sku | &check; | string | An existing concrete product SKU to assign to the product list. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_list_to_concrete_product.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_list_to_concrete_product.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:product-list-to-concrete-product
```
---
title: "Import file details: category_store.csv"
description: Learn the description of the category_store.csv file to configure assignments of categories in your Spryker shop | Spryker
last_updated: Jul 1, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-category-storecsv
originalArticleId: 65ea104d-3682-4f3c-999f-8abc8d45fb72
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html
  - /docs/scos/dev/data-import/202005.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/import-and-export-data/categories-data-import/file-details-category-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `category_store.csv` file to configure assignments of categories in your Spryker shop.

## Import file dependencies

The file has the following dependency: *stores.php* configuration file of the Demo Shop PHP project.

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|
| category_key | &check; | String |   | Category key of the category. |
| included_store_names |   | String |   | To accept all stores, use the asterisk (*) symbol. | Holds store names to include separated by a comma. |
| excluded_store_names |   | String |   | To remove all stores, use the asterisk (*) symbol. | Holds store names to exclude separated by a comma. |



## Import template file and content example

| FILE | DESCRIPTION |
|-|-|
| [template_category_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/template+category_store.csv) | Exemplary import file with headers only. |
| [category_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/category_store.csv) | Exemplary import file with Demo Shop data. |

## Import file command

```bash
data:import:category-store
```

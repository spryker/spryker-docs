---
title: "Import file details: category_template.csv"
description: Learn how to import category template data using the Category template csv file in your Spryker Cloud Commerce OS Project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-category-templatecsv
originalArticleId: fac13464-5ddc-4b2a-8dff-f257e196e222
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/categories-data-import/file-details-category-template.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `category_template.csv` file to configure category templates in your Spryker shop.

## Import file parameters

| PARAMETER     | REQUIRED | TYPE   | DESCRIPTION                                                                                     |
|---------------|----------|--------|-------------------------------------------------------------------------------------------------|
| template_name | ✓        | String | Name of the category template.                                                                  |
| template_path | ✓        | String | Path of the category template. Must be a valid, unique path to a Twig file.                     |



## Import template file and content example


| FILE | DESCRIPTION |
| --- | --- |
| [category_template.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/Template+category_template.csv) | Exemplary import file with headers only. |
| [category_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/category_template.csv) | Exemplary import file with Demo Shop data. |

## Import command


```bash
data:import:category-template
```

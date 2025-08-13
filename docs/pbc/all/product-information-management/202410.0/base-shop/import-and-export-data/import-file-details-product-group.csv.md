---
title: "Import file details: product_group.csv"
description: Learn how you can import data for product groups using the product group csv file within your Spryker Cloud Commerce OS project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-groupcsv
originalArticleId: dafbf02b-ad3c-4a49-b6f4-4f7448b61fca
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-group.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-group.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-group.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-group.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/file-details-product-group.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-file-details-product-group.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_group.csv` file to configure [Product Group](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-groups-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| group_key | &check; | String | Must be unique. | Product group identifier. |
| abstract_sku | &check; | String |  | SKU of the abstract product. |
| position |  | Integer |  | The position of the product within that group. |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_group.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_group.csv) | Exemplary import file with headers only. |
| [product_group.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_group.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-group
```

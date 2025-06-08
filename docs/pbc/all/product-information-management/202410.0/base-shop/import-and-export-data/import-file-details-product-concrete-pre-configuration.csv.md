---
title: "Import file details: product_concrete_pre_configuration.csv"
description: Learn how you can import data for configurable products using the product concrete pre configuration csv file within your Spryker Cloud Commerce OS project.
last_updated: Jun 25, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-concrete-pre-configurationcsv
originalArticleId: 81e75f7f-b1bd-4707-870a-dbea4a001273
redirect_from:
  - /docs/scos/dev/data-import/202200.0/data-import-categories/special-product-types/configurable-product-import-category/file-details-product-concrete-pre-configuration.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/special-product-types/configurable-product-import-category/file-details-product-concrete-pre-configuration.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/file-details-product-concrete-pre-configuration.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-file-details-product-concrete-pre-configuration.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_concrete_pre_configuration.csv` file to configure [configurable product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) information in your Spryker shop.

## Import file dependencies

[File details: product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html#import-file-parameters)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS AND COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| concrete_sku | ✓ | String | | Must be an SKU of an existing product. | Unique product identifier. |
| configurator_key | ✓ | String | | Multiple products can use the same `configurator_key`. | Unique identifier of a product configurator to be used for this product. |
| is_complete | ✓ | Boolean | 0 | True = `1` <br> False = `0` | Defines if product configuration is complete by default.
| default_configuration | | String |  | Accepts JSON. | Defines the configuration customers start configuring the product with. |
| default_display_data | | String |  | Accepts JSON. | Defines the configuration to be displayed to customers when they start configuring the product. The parameters are taken from `default_configuration`. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [Template product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_concrete_pre_configuration.csv) | Import file template with headers only. |
| [product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_concrete_pre_configuration.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-configuration
```

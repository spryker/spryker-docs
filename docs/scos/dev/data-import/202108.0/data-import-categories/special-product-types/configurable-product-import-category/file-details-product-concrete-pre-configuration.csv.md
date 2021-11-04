---
title: File details- product_concrete_pre_configuration.csv
description: Description of the `product_concrete_pre_configuration.csv` import file.
last_updated: Jun 25, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-concrete-pre-configurationcsv
originalArticleId: 81e75f7f-b1bd-4707-870a-dbea4a001273
redirect_from:
  - /2021080/docs/file-details-product-concrete-pre-configurationcsv
  - /2021080/docs/en/file-details-product-concrete-pre-configurationcsv
  - /docs/file-details-product-concrete-pre-configurationcsv
  - /docs/en/file-details-product-concrete-pre-configurationcsv
---

This document describes the `product_concrete_pre_configuration.csv` file to configure [configurable product](/docs/scos/user/features/{{page.version}}/configurable-product-feature-overview.html) information in your Spryker shop.

To import the file, run

```bash
data:import product-configuration
```

## Import file parameters

The file should have the following parameters:


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS AND COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| concrete_sku | ✓ | String | | Must be an SKU of an existing product. | Unique product identifier. |
| configurator_key | ✓ | String | | Multiple products can use the same `configurator_key`. | Unique identifier of a product configurator to be used for this product. |
| is_complete | ✓ | Boolean | | 0 | True = `1` <br> False = `0` | Defines if product configuration is complete by default.
| default_configuration | | String |  | Accepts JSON. | Defines the configuration customers start configuring the product with. |
| default_display_data | | String |  | Accepts JSON. | Defines the configuration to be displayed to customers when they start configuring the product. The parameters are taken from `default_configuration`. |

## Import file dependencies

The file has the following dependencies:

*   [File details: product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html#headers-amp-mandatory-fields)


## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [Template product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_concrete_pre_configuration.csv) | Import file template with headers only. |
| [product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_concrete_pre_configuration.csv) | Exemplary import file with Demo Shop data. |

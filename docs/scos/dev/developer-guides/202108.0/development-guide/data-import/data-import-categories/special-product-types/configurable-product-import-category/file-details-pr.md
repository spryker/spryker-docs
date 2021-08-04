---
title: File details- product_concrete_pre_configuration.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-concrete-pre-configurationcsv
redirect_from:
  - /2021080/docs/file-details-product-concrete-pre-configurationcsv
  - /2021080/docs/en/file-details-product-concrete-pre-configurationcsv
---

This document describes the `product_concrete_pre_configuration.csv` file to configure [configurable product](https://documentation.spryker.com/2021080/docs/configurable-product-feature-overview) information in your Spryker shop.

To import the file, run

```Bash
data:import product-configuration
```

## Import file parameters

The file should have the following parameters:


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS AND COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| concrete_sku | ✓ | String | | Must be an SKU of an existing product. | Unique product identifier. | 
| configurator_key | ✓ | String | | Multiple products can use the same `configurator_key`. | Unique identifier of a product configurator to be used for this product. | 
| is_complete | ✓ | Boolean | | 0 | True = `1` </br> False = `0` | Defines if product configuration is complete by default.
| default_configuration | | String |  | Accepts JSON. | Defines the configuration customers start configuring the product with. | 
| default_display_data | | String |  | Accepts JSON. | Defines the configuration to be displayed to customers when they start configuring the product. The parameters are taken from `default_configuration`. | 

## Import file dependencies

The file has the following dependencies:

*   [File details: product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv#headers---mandatory-fields)
    

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [Template product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_concrete_pre_configuration.csv) | Import file template with headers only. |
| [product_concrete_pre_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_concrete_pre_configuration.csv) | Exemplary import file with Demo Shop data. |

 

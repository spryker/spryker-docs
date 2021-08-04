---
title: File details- product_alternative.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-alternativecsv
redirect_from:
  - /v6/docs/file-details-product-alternativecsv
  - /v6/docs/en/file-details-product-alternativecsv
---

This article contains content of the **product_alternative.csv** file to configure [Alternative Product](https://documentation.spryker.com/docs/alternative-products) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **concrete_sku** | Yes | String |N/A* | SKU of the concrete product to which this alternative is applied. |
| **alternative_product_concrete_sku** | Yes (*if `alternative_product_abstract_sku `is empty*) | String |N/A | SKU of the alternative concrete product. |
| **alternative_product_abstract_sku** | Yes (*if `alternative_product_concrete_sku` is empty*) | String |N/A | SKU of the alternative abstract product. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:

* [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)
* [product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv)

## Recommendations & other information
It does not exist on by default on the project level. It can be created in order to override the CSV file from module: 

* `vendor/spryker/product-alternative-data-import/data/import/product_alternative.csv`

## Template File & Content Example
A template and an example of the *product_alternative.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_alternative.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_alternative.csv) | Product Alternative .csv template file (empty content, contains headers only). |
| [product_alternative.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_alternative.csv) | Product Alternative .csv file containing a Demo Shop data sample. |

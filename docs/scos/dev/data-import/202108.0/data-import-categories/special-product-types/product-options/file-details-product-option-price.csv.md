---
title: File details- product_option_price.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-option-pricecsv
originalArticleId: 7990de20-cb7f-467d-80e8-b3ca2cb5ff81
redirect_from:
  - /2021080/docs/file-details-product-option-pricecsv
  - /2021080/docs/en/file-details-product-option-pricecsv
  - /docs/file-details-product-option-pricecsv
  - /docs/en/file-details-product-option-pricecsv
---

This article contains content of the **product_option_price.csv** file to configure Product Option Price information on your Spryker Demo Shop. Importing the Product Option Price data sets the net and gross prices for each of the Product Options, per store and per currency.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **product_option_sku** | Yes | String |N/A* |  SKU identifier of the Product Option.|
| **store** | Yes | String |N/A | Name of the store that contains this product option. |
| **currency** | Yes | String |N/A | Currency used with this product option. |
| **value_net** | No | Integer |The original value is multiplied by 100, before stored in this field. | Net price value of the Product Option. |
| **value_gross** | No | Integer |The original value is multiplied by 100, before stored in this field. | Gross price value of the Product Option. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*     [product_option.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html)

## Template File & Content Example
A template and an example of the *product_option_price.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_option_price.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Product+Options/Template+product_option_price.csv) | Payment Method Store .csv template file (empty content, contains headers only). |
| [product_option_price.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Product+Options/product_option_price.csv) | Payment Method Store .csv file containing a Demo Shop data sample. |

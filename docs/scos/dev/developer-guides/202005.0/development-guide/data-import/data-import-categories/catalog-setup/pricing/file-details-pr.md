---
title: File details- product_price_schedule.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-price-schedulecsv
redirect_from:
  - /v5/docs/file-details-product-price-schedulecsv
  - /v5/docs/en/file-details-product-price-schedulecsv
---

This article contains content of the **product_price_schedule.csv** file to configure[ Product Price Schedule](https://documentation.spryker.com/docs/en/scheduled-prices-201907) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **abstract_sku** | Yes (if `concrete_sku` is empty) | String Either this field or `concrete_sku` needs to be filled, as the prices need to be assigned to a product. | SKU of the abstract product to which the price should apply. |
| **concrete_sku** | Yes (if `abstract_sku` is empty) | String |Either this field or `abstract_sku` needs to be filled, as the prices need to be assigned to a product. | SKU of the concrete product to which the price should apply. |
| **price_type** | Yes | String |N/A* | Defines the price type. |
| **store** | Yes | String |N/A | Store to which this price should apply. |
| **currency** | Yes | String |N/A* | Defines in which currency the price is. |
| **value_net** | Yes | Integer |N/A | Sets the net price. |
| **value_gross** | Yes | Integer |N/A | Sets the gross price. |
| **from_included** | Yes | Date |N/A | Sets the date from which these price conditions are valid. |
| **to_included** | Yes | Date |N/A | Sets the date to which these price conditions are valid. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
* [product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)
* [product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)
*     *stores.php* configuration file of the Demo Shop PHP project

## Template File & Content Example
A template and an example of the *product_price_schedule.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_price_schedule.csvtemplate](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/Template+product_price_schedule.csv) | Product Price Schedule .csv template file (empty content, contains headers only). |
| [product_price_schedule.csv.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/product_price_schedule.csv) | Product Price Schedule .csv file containing a Demo Shop data sample. |

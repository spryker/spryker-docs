---
title: File details- sales_order_threshold.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-sales-order-thresholdcsv
redirect_from:
  - /2021080/docs/file-details-sales-order-thresholdcsv
  - /2021080/docs/en/file-details-sales-order-thresholdcsv
---

This article contains content of the **sales_order_threshold.csv** file to configure [Sales Order Threshold](https://documentation.spryker.com/docs/minimum-order-value-201903) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **store** | Yes | String | N/A*| Name of the store. |
| **currency** | Yes | String | N/A | Currency ISO code. |
| **threshold_type_key** | Yes | String | N/A | Identifier of the threshold type. |
| **threshold** | Yes | Integer | N/A| Threshold value. |
| **fee** | No | Integer | N/A | Threshold fee. |
| **message_glossary_key** | Yes | String | N/A | Identifier of the glossary message. |
*N/A: Not applicable.

## Dependencies
This file has the following dependencies:

*  [currency.csv](https://documentation.spryker.com/docs/file-details-currencycsv)
*  [glossary.csv](https://documentation.spryker.com/docs/file-details-glossarycsv)
*  s*tores.php* configuration file of the demo shop PHP project

## Template File & Content Example
A template and an example of the *sales_order_threshold.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [sales_order_threshold.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+sales_order_threshold.csv) | Sales Order Threshold .csv template file (empty content, contains headers only). |
| [sales_order_threshold.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/sales_order_threshold.csv) | Sales Order Threshold .csv file containing a Demo Shop data sample. |

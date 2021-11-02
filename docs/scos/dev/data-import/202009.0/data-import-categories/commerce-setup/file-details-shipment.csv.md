---
title: File details- shipment.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-shipmentcsv
originalArticleId: b5a2c219-7b52-46f5-8711-1ca32770578c
redirect_from:
  - /v6/docs/file-details-shipmentcsv
  - /v6/docs/en/file-details-shipmentcsv
---

This article contains content of the **shipment.csv** file to configure [Shipment](/docs/scos/user/features/{{page.version}}/shipment-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **shipment_method_key** | Yes (*unique*) | String | N/A*| Identifier of the shipment method. |
| **name** | Yes | String | N/A | Name of the shipment method. |
| **carrier** | Yes | String | N/A | Name of the shipment carrier. |
| **taxSetName** | Yes | String | N/A| 	Name of the tax set. |

N/A: Not applicable.

## Dependencies
This file has no dependencies.

## Template File & Content Example
A template and an example of the *shipment.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [shipment.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+shipment.csv) | Shipment .csv template file (empty content, contains headers only). |
| [shipment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/shipment.csv) | Shipment .csv file containing a Demo Shop data sample. |

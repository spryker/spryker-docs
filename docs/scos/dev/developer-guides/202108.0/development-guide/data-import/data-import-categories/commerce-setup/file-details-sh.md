---
title: File details- shipment_method_store.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-shipment-method-storecsv
redirect_from:
  - /2021080/docs/file-details-shipment-method-storecsv
  - /2021080/docs/en/file-details-shipment-method-storecsv
---

This article contains information about the [Shipment Method](https://documentation.spryker.com/docs/shipment-carriers-methods) and Store relation to be added to your Spryker Demo Shop.

The *shipment_method_store.csv* file contains the links between each shipment method used by each existing store.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **shipment_method_key** | Yes | String | Can be imported from the content that was loaded using the [shipment.csv](https://documentation.spryker.com/docs/file-details-shipmentcsv) file.| Identifier of the shipment method. |
| **store** | Yes | String |Must be one of the existing store names. The store names are initially already defined in* stores.php* configuration file. | Name of the store. |

## Dependencies
This file has the following dependencies:

*     [shipment.csv](https://documentation.spryker.com/docs/file-details-shipmentcsv)
*     *stores.php* configuration file of demo shop PHP project

## Template File & Content Example
A template and an example *shipment_method_store.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [shipment_method_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+shipment_method_store.csv) | Shipment Method Store .csv template file (empty content, contains headers only). |
| [shipment_method_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/shipment_method_store.csv) | Shipment Method Store .csv file containing a Demo Shop data sample. |

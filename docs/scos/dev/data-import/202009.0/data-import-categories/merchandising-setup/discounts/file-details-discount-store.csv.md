---
title: File details- discount_store.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-discount-storecsv
originalArticleId: f52a35c7-d41b-4116-a62b-c12e6f99a1b2
redirect_from:
  - /v6/docs/file-details-discount-storecsv
  - /v6/docs/en/file-details-discount-storecsv
---

This article contains content of the **discount_store.csv** file to configure Discount Store information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **discount_key** | Yes | String |`discount_key` must be included in the *discount.csv* file. |  |
| **store_name** | Yes | String |N/A* | Name of the store to which the discount applies. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*     [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)
*     *stores.php* configuration file of the demo shop PHP project

## Template File & Content Example
A template and an example of the *discount_store.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [discount_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/Template+discount_store.csv) | Discount Store .csv template file (empty content, contains headers only). |
| [discount_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/discount_store.csv) | Discount Store .csv file containing a Demo Shop data sample. |

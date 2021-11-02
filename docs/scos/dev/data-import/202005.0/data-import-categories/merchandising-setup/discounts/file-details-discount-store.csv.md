---
title: File details- discount_store.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-discount-storecsv
originalArticleId: ce6578b2-67e0-44a6-a510-0d719c98cd5a
redirect_from:
  - /v5/docs/file-details-discount-storecsv
  - /v5/docs/en/file-details-discount-storecsv
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

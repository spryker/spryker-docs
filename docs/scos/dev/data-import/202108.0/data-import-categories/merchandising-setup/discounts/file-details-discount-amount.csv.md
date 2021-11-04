---
title: File details- discount_amount.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-discount-amountcsv
originalArticleId: a9cdd839-b5fc-45ae-8177-625bd94789df
redirect_from:
  - /2021080/docs/file-details-discount-amountcsv
  - /2021080/docs/en/file-details-discount-amountcsv
  - /docs/file-details-discount-amountcsv
  - /docs/en/file-details-discount-amountcsv
---

This article contains content of the **discount_amount.csv** file to configure Discount Amount information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **discount_key** | No | String |N/A* | Key identifier of the discount. |
| **store** | No | String |N/A | Name of the store to which the discount applies to. |
| **currency** | No | String |N/A | Currency ISO code of the discount. |
| **value_net** | No | Number |N/A | Net value of the discount. |
| **value_gross** | No | Number |N/A | Gross value of the discount. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*    [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)
*     [discount_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-store.csv.html)

## Template File & Content Example
A template and an example of the *discount_amount.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [discount_amount.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/Template+discount_amount.csv) | Discount Amount .csv template file (empty content, contains headers only). |
| [discount_amount.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/discount_amount.csv) | Discount Amount .csv file containing a Demo Shop data sample. |

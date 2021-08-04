---
title: File details- currency.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-currencycsv
redirect_from:
  - /v5/docs/file-details-currencycsv
  - /v5/docs/en/file-details-currencycsv
---

This article contains content of the **currency.csv** file to configure [Currency](https://documentation.spryker.com/docs/en/multiple-currencies-per-store) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

|  | Field Name | Mandatory | Type | Other Requirements/Comments | Description | 
| --- | --- | --- | --- | --- | --- |
| 1 | **iso_code** | Yes | String | N/A* | Currency ISO code. <br>For more details check [ISO 4217 CURRENCY CODES](https://www.iso.org/iso-4217-currency-codes.html).  |
| 2 | **currency_symbol** | Yes | String | N/A | Currency symbol. |
| 3 | **name** | Yes | String |N/A  | Currency name. |
*N/A: Not applicable. 

## Dependencies
This file has no dependencies.

## Recommendations

It is recommended to fill all three columns, when adding a new record, except if the “currency” being added is not an ISO standard currency (i.e. system of points, or product/service exchange, etc.). 

Default currency might be set up when setting up the store. Check [here](https://github.com/spryker-shop/b2c-demo-shop/blob/master/config/Shared/stores.php#L38). 

## Template File & Content Example
A template and an example of the *currency.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [currency.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+currency.csv) | Currency .csv template file (empty content, contains headers only). |
| [currency.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/currency.csv) | Currency .csv file containing a Demo Shop data sample. |


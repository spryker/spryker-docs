---
title: File details- tax.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-taxcsv
redirect_from:
  - /v5/docs/file-details-taxcsv
  - /v5/docs/en/file-details-taxcsv
---

This article contains content of the **tax.csv** file to configure [Tax](https://documentation.spryker.com/docs/en/tax) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:


| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **tax_set_name** | Yes | String | N/A* | Name of the tax set. Set of tax rates that can be applied to a specific product. |
| **country_name** | Yes | String | N/A | Country to which the tax refers to. |
| **tax_rate_name** | Yes | String | N/A| Name of the tax rate. <br>Tax rate is the ratio (usually expressed as a percentage) at which a business or person is taxed. |
| **tax_rate_percent** | Yes | Float | N/A| Tax rate, expressed  as a percentage. |
 *N/A: Not applicable.
 
 ## Dependencies
This file has no dependencies.

## Template File & Content Example
A template and an example of the *tax.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [tax.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+tax.csv) | Tax .csv template file (empty content, contains headers only). |
| [tax.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/tax.csv) | Tax .csv file containing a Demo Shop data sample. |
 

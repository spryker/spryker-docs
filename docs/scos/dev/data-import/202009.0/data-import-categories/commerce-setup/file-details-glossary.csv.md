---
title: File details- glossary.csv
last_updated: Feb 19, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-glossarycsv
originalArticleId: 66c62d8f-021e-4b64-a12a-2960a2b76152
redirect_from:
  - /v6/docs/file-details-glossarycsv
  - /v6/docs/en/file-details-glossarycsv
---

This article contains content of the **glossary.csv** file to configure [Customer](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| File Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| key | Yes | String | N/A* | Glossary key, which is used in the templates contained in the shop application. |
| translation | Yes | String | N/A | Translation value of the key for the specific locale. |
| locale | Yes | String | N/A | Locale of the translation. |
*N/A: Not applicable. 

## Dependencies
This file has no dependencies.

## Template File & Content Example 

A template and an example of the *glossary.csv*  file can be downloaded here:


| File | Description |
| --- | --- |
| [glossary.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+glossary.csv) | Glossary .csv template file (empty content, contains headers only). |
| [glossary.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/glossary.csv) | Glossary .csv file containing a Demo Shop data sample. |

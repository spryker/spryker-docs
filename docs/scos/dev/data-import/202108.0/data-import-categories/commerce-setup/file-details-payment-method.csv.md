---
title: File details- payment_method.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-payment-methodcsv
originalArticleId: 77b583a2-c11e-433a-8883-4fa5a4fb2815
redirect_from:
  - /2021080/docs/file-details-payment-methodcsv
  - /2021080/docs/en/file-details-payment-methodcsv
  - /docs/file-details-payment-methodcsv
  - /docs/en/file-details-payment-methodcsv
---

This article contains content of the **payment_method.csv** file to configure [Payment Method](/docs/scos/user/features/{{page.version}}/payments-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **payment_method_key** | Yes | String | N/A*| Identifier of the payment method. |
| **payment_method_name** | Yes | String | N/A | Name of the payment method. |
| **payment_provider_key** | Yes | String | N/A | Identifier of the payment provider. |
| **payment_provider_name** | Yes | String | N/A| Name of the payment provider. |
| **is_active** | No | Boolean | <ul><li>True = 1</li><li>False = 0</li><li>If empty, it will be set to 0 (false).</li></ul> | Status indicating whether the payment method is active or not. |
*N/A: Not applicable.

## Dependencies
This file has no dependencies.

## Template File & Content Example
A template and an example of the *payment_method.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [payment_method.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method.csv) | Payment Method .csv template file (empty content, contains headers only). |
| [payment_method.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method.csv) | Payment Method .csv file containing a Demo Shop data sample. |

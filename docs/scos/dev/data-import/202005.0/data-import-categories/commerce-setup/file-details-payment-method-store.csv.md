---
title: File details- payment_method_store.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-payment-method-storecsv
originalArticleId: b782df6e-3463-4233-bf6c-2b463c9f71c6
redirect_from:
  - /v5/docs/file-details-payment-method-storecsv
  - /v5/docs/en/file-details-payment-method-storecsv
---

This article contains content of the **payment_method_store.csv** file to configure Payment Method Store information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **payment_method_key** | Yes | String |Value should be imported from the [payment_method.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method.csv.html) file. | Identifier of the payment method. |
| **store** | Yes | String | Value must be within an existing store name, set in the *store.php* configuration file of the demo shop PHP project. | Name of the store. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*     [payment_method.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method.csv.html) 
*     *stores.php* configuration file of the demo shop PHP project

## Template File & Content Example
A template and an example of the *payment_method_store.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [payment_method_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method_store.csv) | Payment Method Store .csv template file (empty content, contains headers only). |
| [payment_method_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method_store.csv) | Payment Method Store .csv file containing a Demo Shop data sample. |

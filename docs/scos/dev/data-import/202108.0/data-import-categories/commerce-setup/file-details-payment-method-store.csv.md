---
title: File details - payment_method_store.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-payment-method-storecsv
originalArticleId: c862d612-e933-43dd-afce-27dbc5a0ba37
redirect_from:
  - /2021080/docs/file-details-payment-method-storecsv
  - /2021080/docs/en/file-details-payment-method-storecsv
  - /docs/file-details-payment-method-storecsv
  - /docs/en/file-details-payment-method-storecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `payment_method_store.csv` file to configure Payment Method Store information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:payment-method-store
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|
| payment_method_key | &check; | String | Value should be imported from the [payment_method.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method.csv.html) file. | Identifier of the payment method. |
| store | &check; | String | Value must be within an existing store name, set in the *store.php* configuration file of the demo shop PHP project. | Name of the store. |


## Import file dependencies

This file has the following dependencies:

* [payment_method.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method.csv.html) 
* *stores.php* configuration file of the demo shop PHP project

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [payment_method_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method_store.csv) | Exemplary import file with headers only. |
| [payment_method_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method_store.csv) | Exemplary import file with Demo Shop data. |

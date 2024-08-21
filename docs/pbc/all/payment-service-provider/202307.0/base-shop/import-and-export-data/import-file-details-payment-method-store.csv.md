---
title: "Import file details: payment_method_store.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-payment-method-storecsv
originalArticleId: c862d612-e933-43dd-afce-27dbc5a0ba37
redirect_from:
  - /2021080/docs/file-details-payment-method-storecsv
  - /2021080/docs/en/file-details-payment-method-storecsv
  - /docs/file-details-payment-method-storecsv
  - /docs/en/file-details-payment-method-storecsv
  - /docs/scos/dev/data-import/201811.0/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-data/file-details-payment-method-store.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-and-export-data/import-file-details-payment-method-store.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-and-export-data/file-details-payment-method-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `payment_method_store.csv` file to configure Payment Method Store information in your Spryker Demo Shop.


## Import file dependencies

* [payment_method.csv](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method.csv.html)
* *stores.php* configuration file of the demo shop PHP project

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|
| payment_method_key | &check; | String | Value should be imported from the [payment_method.csv](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method.csv.html) file. | Identifier of the payment method. |
| store | &check; | String | Value must be within an existing store name, set in the *store.php* configuration file of the demo shop PHP project. | Name of the store. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [payment_method_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method_store.csv) | Exemplary import file with headers only. |
| [payment_method_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method_store.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:payment-method-store
```

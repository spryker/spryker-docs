---
title: "Import file details: payment_method.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-payment-methodcsv
originalArticleId: 77b583a2-c11e-433a-8883-4fa5a4fb2815
redirect_from:
  - /2021080/docs/file-details-payment-methodcsv
  - /2021080/docs/en/file-details-payment-methodcsv
  - /docs/file-details-payment-methodcsv
  - /docs/en/file-details-payment-methodcsv
  - /docs/scos/dev/data-import/202307.0/data-import-categories/commerce-setup/file-details-payment-method.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-data/file-details-payment-method.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-and-export-data/import-file-details-payment-method.csv.html
  - /docs/pbc/all/payment-service-provider/202307.0/import-and-export-data/file-details-payment-method.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `payment_method.csv` file to configure the [Payment Method](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/payments-feature-overview.html) information in your Spryker Demo Shop.

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| payment_method_key | &check; | String |  | Identifier of the payment method. |
| payment_method_name | &check; | String |  | Name of the payment method. |
| payment_provider_key | &check; | String |  | Identifier of the payment provider. |
| payment_provider_name | &check; | String |  | Name of the payment provider. |
| is_active | No | Boolean | <ul><li>True = 1</li><li>False = 0</li><li>If the field is empty, it will be set to 0 (false).</li></ul> | Status indicating whether the payment method is active or not. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [payment_method.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method.csv) | Exemplary import file with headers only. |
| [payment_method.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:payment-method
```

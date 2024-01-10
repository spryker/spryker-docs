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
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `payment_method.csv` file to configure the [payment method](/docs/scos/user/features/{{page.version}}/payments-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:payment-method
```

## Import file parameters

The file must have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| payment_method_key | &check; | String |  | Identifier of the payment method. |
| payment_method_name | &check; | String |  | Name of the payment method. |
| payment_provider_key | &check; | String |  | Identifier of the payment provider. |
| payment_provider_name | &check; | String |  | Name of the payment provider. |
| is_active | No | Boolean | <ul><li>True = 1</li><li>False = 0</li><li>If the field is empty, it is set to 0 (false).</li></ul> | Status indicating whether the payment method is active or not. |

## Import file dependencies

This file has no dependencies.

## Import template file and content example

The following table contains the template and an example of the file:

| FILE | DESCRIPTION |
| --- | --- |
| [payment_method.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+payment_method.csv) | Exemplary import file with headers only. |
| [payment_method.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/payment_method.csv) | Exemplary import file with Demo Shop data. |

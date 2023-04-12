---
title: File details - discount_amount.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-discount-amountcsv
originalArticleId: a9cdd839-b5fc-45ae-8177-625bd94789df
redirect_from:
  - /2021080/docs/file-details-discount-amountcsv
  - /2021080/docs/en/file-details-discount-amountcsv
  - /docs/file-details-discount-amountcsv
  - /docs/en/file-details-discount-amountcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `discount_amount.csv` file to configure Discount Amount information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:discount-amount
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| discount_key |  | String |  | Key identifier of the discount. |
| store |  | String |  | Name of the store to which the discount applies to. |
| currency |  | String |  | Currency ISO code of the discount. |
| value_net |  | Number |  | Net value of the discount. |
| value_gross |  | Number |  | Gross value of the discount. |

## Import file dependencies

This file has the following dependencies:

* [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)
* [discount_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-store.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [discount_amount.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/Template+discount_amount.csv) | Exemplary import file with headers only. |
| [discount_amount.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/discount_amount.csv) | Exemplary import file with Demo Shop data. |

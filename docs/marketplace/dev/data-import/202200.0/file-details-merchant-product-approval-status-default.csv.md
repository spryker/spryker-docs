---
title: "File details: merchant_product_approval_status_default.csv"
description: This document describes the merchant_product_approval_status_default.csv file to configure the default approval status for the products owned by a certain merchant in your Spryker marketplace shop.
template: data-import-template
---

This document describes the `merchant_product_approval_status_default.csv` file to configure the default approval status for the products owned by a certain merchant in your Spryker marketplace shop.

To import the file, run the following command:
```bash
data: import merchant-product-approval-status-default
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|---|---|---|---|---|---|
| merchant_reference | &check; | String |  | Unique | Identifier of the merchant in the system. |
| approval_status | &check;  |  String |   | Default approval status of the products created by the merchant. Can be: <ul><li>draft</li><li>waiting for approval</li><li>approved</li><li>denied</li></ul> |  

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)

## Import file template and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
|---|---|
| [template_merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Data+import/File+details%3A+merchant_product_approval_status_default.csv/template_merchant_product_approval_status_default.csv) | Import file template with headers only. |
| [merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Data+import/File+details%3A+merchant_product_approval_status_default.csv/merchant_product_approval_status_default.csv) | Exemplary import file with the Demo Shop data. |

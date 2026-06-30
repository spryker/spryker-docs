---
title: "Import file details: merchant_product_approval_status_default.csv"
description: This document describes the merchant_product_approval_status_default.csv file to configure default merchant products approval statuses in your Spryker shop.
template: import-file-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/pbc/all/product-information-management/202311.0/marketplace/import-and-export-data/file-details-merchant-product-approval-status-default.csv.html
related:
  - title: Marketplace Product Approval Process feature walkthrough
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-approval-process-feature-overview.html
  - title: Marketplace Product Approval Process feature overview
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-approval-process-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `merchant_product_approval_status_default.csv` file to configure default merchant products approval statuses in your Spryker shop.

## Import file dependencies

[merchant.csv](/docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant.csv.html).


## Import file parameters

| PARAMETER      | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION                               |
| ------------- | ---------- | ------ | ----------- | ------------------- | ------------------------------------ |
| merchant_reference | &check;             | String   |                   | Unique                        | Identifier of the merchant in the system.     |
| approval_status               | &check;             | String     |                   |  | Default approval status for the merchant products.               |


## Import template file and content example

| FILE     | DESCRIPTION    |
| -------------------------- | -------------------------- |
| [template_merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_approval_status_default.csv) | Import file template with headers only.         |
| [merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_approval_status_default.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
console data:import merchant-product-approval-status-default
```

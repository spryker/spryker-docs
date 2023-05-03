---
title: "File details: merchant_product_approval_status_default.csv"
description: This document describes the merchant_product_approval_status_default.csv file to configure default merchant products approval statuses in your Spryker shop.
template: import-file-template
related:
  - title: Marketplace Product Approval Process feature walkthrough
    link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-product-approval-process-feature-walkthrough.html
  - title: Marketplace Product Approval Process feature overview
    link: docs/marketplace/user/features/page.version/marketplace-product-approval-process-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `merchant_product_approval_status_default.csv` file to configure default merchant products approval statuses in your Spryker shop.

To import the file, run the following:

```bash
console data:import merchant-product-approval-status-default
```

## Import file parameters

The file must have the following parameters:

| PARAMETER      | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION                               |
| ------------- | ---------- | ------ | ----------- | ------------------- | ------------------------------------ |
| merchant_reference | &check;             | String   |                   | Unique                        | Identifier of the merchant in the system.     |
| approval_status               | &check;             | String     |                   |  | Default approval status for the merchant products.               |

## Import file dependencies

The file has the following dependency: [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html).

## Import template file and content example

In the following table, you can find the template and example of the file:

| FILE     | DESCRIPTION    |
| -------------------------- | -------------------------- |
| [template_merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_approval_status_default.csv) | Import file template with headers only.         |
| [merchant_product_approval_status_default.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_approval_status_default.csv) | Example of the import file with Demo Shop data. |

---
title: "File details: merchant_product_option_group.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product_option_group file to create product options for merchants.
template: import-file-template
---

This document describes the `merchant_product_option_group` file to create [merchant product option groups](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html).

To import the file, run:

```bash
data:import merchant-product-option-group
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ---------- | ---------- | ------- | ------------- | ------------------ | ------------- |
| product_option_group_key | &check;  | String   | It should be either one word, or several words separated with underscore.    | Unique   | Glossary key for a product option group. |
| merchant_reference | &check;     | String |      |      | Unique identifier of the merchant the product option group belongs to. |
| approval_status  |     | String | waiting_for_approval     | Possible values: <ul><li>waiting_for_approval</li><li>approved</li><li>denied</li></ul>  | [Approval status](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html#marketplace-product-options-approval-statuses) of the product option group.   |
| merchant_sku  |     | String |      | External merchant SKU in the merchant's ERP.   |

## Import file dependencies

The file does not have any dependencies.

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION    |
| ------------------------------- | ----------------------- |
| [template_merchant_product_option_group.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Data+import/File+details%3A+merchant_product_option_group.csv/template_merchant_product_option_group.csv) | Import file template with headers only.         |
| [merchant_product_option_group.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Data+import/File+details%3A+merchant_product_option_group.csv/merchant_product_option_group.csv) | Example of the import file with Demo Shop data. |

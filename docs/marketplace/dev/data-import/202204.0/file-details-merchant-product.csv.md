---
title: "File details: merchant_product.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product.csv file to configure marketplace products in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_product.csv` file to configure [marketplace product](/docs/marketplace/user/features/{{page.version}}/marketplace-product-feature-overview.html) information in your Spryker shop.

To import the file, run:

```bash
data:import merchant-product
```

## Import file parameters

The file should have the following parameters:

| PARAMETER   | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION  |
| -------------- | ----------- | ------- | ------------- | ------------------- | ---------------------- |
| sku                | &check;             | String   |                   | Unique                           | SKU of the product.                                          |
| merchant_reference | &check;             | String   |                   | Unique                           | Unique identifier of the merchant in the system.             |
| is_shared          |               | Integer  |                   | 1—is shared<br>0—is not shared | Defines whether the product is shared between the merchants. |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)
- [product_concrete.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION  |
| ----------------------------- | ---------------------- |
| [template_merchant_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product.csv) | Import file template with headers only.         |
| [merchant_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product.csv) | Example of the import file with Demo Shop data. |

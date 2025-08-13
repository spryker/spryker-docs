---
title: "Import file details: merchant_product.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product.csv file to configure marketplace products in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/pbc/all/product-information-management/202311.0/marketplace/import-and-export-data/file-details-merchant-product.csv.html
related:
  - title: Marketplace Product feature walkthrough
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-feature-overview.html
---

This document describes the `merchant_product.csv` file to configure [marketplace product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/marketplace-product-feature-overview.html) information in your Spryker shop.

## Import file dependencies


- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)

## Import file parameters

| PARAMETER   | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION  |
| -------------- | ----------- | ------- | ------------- | ------------------- | ---------------------- |
| sku                | &check;             | String   |                   | Unique                           | SKU of the product.                                          |
| merchant_reference | &check;             | String   |                   | Unique                           | Unique identifier of the merchant in the system.             |
| is_shared          |               | Integer  |                   | 1—is shared<br>0—is not shared | Defines whether the product is shared between the merchants. |


## Import template file and content example

| FILE  | DESCRIPTION  |
| ----------------------------- | ---------------------- |
| [template_merchant_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product.csv) | Import file template with headers only.         |
| [merchant_product.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-product
```

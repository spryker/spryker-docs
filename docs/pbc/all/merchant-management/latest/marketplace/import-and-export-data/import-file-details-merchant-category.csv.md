---
title: "Import file details: merchant_category.csv"
last_updated: Jun 07, 2021
description: learn about the merchant profile address csv file to configure merchant profile addresses in your Spryker B2B shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-category.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-category.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant-category.csv.html
related:
  - title: Merchant Category feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/merchant-category-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_category.csv` file to configure [merchant categories](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/merchant-opening-hours-feature-overview.html) in your Spryker shop.

## Import file dependencies

- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)

## Import file parameters

| PARAMETER      | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION      |
| -------------- | ----------- | ------- | ------------- | -------------------- | ------------------------------- |
| category_key       | &check;             | String   |                   |                              | Category key to assign the merchant to.   |
| merchant_reference | &check;             | String   |                   | Unique                       | Identifier of the merchant in the system. |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_category.csv) | Import file template with headers only.         |
| [merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_category.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import merchant-category
```

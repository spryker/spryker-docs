---
title: "Import file details: merchant_store.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_store.csv file to configure merchant store information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-store.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-store.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant-store.csv.html
related:
  - title: Marketplace Merchant feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_store.csv` file to configure merchant's stores in your Spryker shop.

## Import file dependencies


- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
- `stores.php` configuration file of the demo shop PHP project, where stores are defined initially


## Import file parameters


| PARAMETER    | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION  |
| -------------- | ----------- | ----- | -------------- | ------------------------ | ----------------------- |
| merchant_reference | &check;             | String   |                   | Unique                                                       | Identifier of the merchant in the system.       |
| store_name         | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store where the merchant product offer belongs. |



## Import template file and content example

| FILE   | DESCRIPTION  |
| --------------------------- | ---------------------- |
| [template_merchant_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_store.csv) | Import file template with headers only.         |
| [merchant_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_store.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-store
```

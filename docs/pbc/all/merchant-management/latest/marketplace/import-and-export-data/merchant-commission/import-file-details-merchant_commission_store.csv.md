---
title: "Import file details: merchant_commission_store.csv"
description: Learn about the Spryker merchant commission store CSV file and how to configure commisions within your Spryker Marketplace project.
last_updated: Jul 07, 2024
description: Import store relations for comissions.
template: import-file-template
redirect_from:
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_store.csv.html
---

This document describes the `merchant_commission_store.csv` file to configure [merchant commission](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).

## Import file dependencies

[merchant_commission.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html)

## Import file parameters

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                       |
|-------------------------|----------|-----------|--------------|----------------------------------------|
| merchant_commission_key | ✓        | String    | mc4          | Merchant commission to assign to the store. |
| store_name              | ✓        | String    | DE           | Store to assign the commission to.                     |

## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_store.csv.md/template_merchant_commission_store.csv) | Import file template with headers only.         |
| [merchant_commission_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_store.csv.md/merchant_commission_store.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission-store
```

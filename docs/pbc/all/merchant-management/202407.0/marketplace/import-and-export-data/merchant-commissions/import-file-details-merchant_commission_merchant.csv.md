---
title: "Import file details: merchant_commission_merchant.csv"
last_updated: Jul 07, 2024
description: Import relations of merchant comissions to merchants.
template: import-file-template
---

This document describes the `merchant_commission_merchant.csv` file to assign [merchant commission](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html) to merchants.

## Import file dependencies

[merchant_commission.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html)

## Import file parameters

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                       |
|-------------------------|----------|-----------|--------------|----------------------------------------|
| merchant_commission_key | ✓        | String    | mc4          | Merchant commission to assign the merchant to. |
| merchant_reference      | ✓        | String    | MER000001           | Merchant to assign the commission to.             |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission_merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_merchant.csv.md/template_merchant_commission_merchant.csv) | Import file template with headers only.         |
| [merchant_commission_merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_merchant.csv.md/merchant_commission_merchant.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission-merchant
```

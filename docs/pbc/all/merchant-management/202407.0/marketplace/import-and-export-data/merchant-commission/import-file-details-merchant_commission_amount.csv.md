---
title: "Import file details: merchant_commission_amount.csv"
last_updated: Jul 07, 2024
description: Import merchant commission amounts
template: import-file-template
---

This document describes the `merchant_commission_amount.csv` file to configure [merchant commission amount](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).

## Import file dependencies

[merchant_commission.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html)

## Import file parameters

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                               |
|-------------------------|----------|-----------|--------------|------------------------------------------------|
| merchant_commission_key | ✓        | String    | mc4          | The merchant commission to import the amount for.         |
| currency                | ✓        | String    | EUR          | Commission amount currency.            |
| value_net               | ✓        | Integer       | 0            | Net value of the merchant commission amount.   |
| value_gross             | ✓        | Integer       | 50           | Gross value of the merchant commission amount. |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission_amount.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_amount.csv.md/template_merchant_commission_amount.csv) | Import file template with headers only.         |
| [merchant_commission_amount.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_amount.csv.md/merchant_commission_amount.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission-amount
```

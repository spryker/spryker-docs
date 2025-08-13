---
title: "Import file details: merchant_commission_group.csv"
description: Learn about the Spryker merchant commission group CSV file and how to configure the merchant commission groups within your Spryker Marketplace project.
last_updated: Jul 07, 2024
description: Import merchant comission groups.
template: import-file-template
redirect_from:

---

This document describes the `merchant_commission_group.csv` file to configure [merchant commission groups](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).



## Import file parameters

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                             |
|--------|----------|-----------|--------------|----------------------------------------------|
| key    | ✓        | String    | primary      | Unique identifier of the [merchant commission group](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html#merchant-commission-priority-and-groups). |
| name   | ✓        | String    | Primary      | Name of the merchant commission group.       |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission_group.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_group.csv.md/template_merchant_commission_group.csv) | Import file template with headers only.         |
| [merchant_commission_group.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_group.csv.md/merchant_commission_group.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission-group
```

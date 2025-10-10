---
title: "Import file details: merchant_commission.csv"
description: Learn about the Spryker merchant commission CSV file and how to configure commisions within your Spryker B2B Marketplace project.
last_updated: Jul 07, 2024
description: Import merchant comissions.
template: import-file-template
redirect_from:
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html
---

This document describes the `merchant_commission.csv` file to configure [merchant commission](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).


## Import file parameters

| COLUMN                        | REQUIRED | DATA TYPE | DATA EXAMPLE                                      | DATA EXPLANATION                                |
|-------------------------------|----------|-----------|---------------------------------------------------|-------------------------------------------------|
| key                           | ✓        | string    | mc1                                               | Unique key of the merchant commission.          |
| name                          | ✓        | string    | Merchant Commission 1                             | Name of the merchant commission.                |
| description                   |          | string    |                                                   | Description of the merchant commission.         |
| valid_from                    |          | date      | 2024-01-01                                        | Start date of the merchant commission validity. |
| valid_to                      |          | date      | 2029-06-01                                        | End date of the merchant commission validity.   |
| is_active                     | ✓        | bool      | 1                                                 | Defines if the merchant commission is active.   |
| amount                        |          | int       | 5                                                 | Amount of the merchant commission.              |
| calculator_type_plugin        | ✓        | string    | percentage                                        | Type of the calculator plugin used.             |
| merchant_commission_group_key | ✓        | string    | primary                                           | Key of the merchant commission group.           |
| priority                      | ✓        | int       | 1                                                 | Priority of the merchant commission.            |
| item_condition                |          | string    | item-price >= '500' AND category IS IN 'computer' | Condition for the item.                         |
| order_condition               |          | string    | price-mode = ""GROSS_MODE""                     | Condition for the order.                        |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.md/template_merchant_commission.csv) | Import file template with headers only.         |
| [merchant_commission.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.md/merchant_commission.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission
```

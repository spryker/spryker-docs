---
title: "Import file details: merchant_commission.csv"
last_upDated: Jun 07, 2021
description: This document describes the merchant_profile_address.csv file to configure merchant profile addresses in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-category.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-category.csv.html
related:
  - title: Merchant Category feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/merchant-category-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_commission.csv` file to configure [merchant commission](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).

## Import file dependencies



## Import file parameters

| COLUMN                        | REQUIRED | DATA TYPE | DATA EXAMPLE                                      | DATA EXPLANATION                                |
|-------------------------------|----------|-----------|---------------------------------------------------|-------------------------------------------------|
| key                           | ✓        | String    | mc1                                               | Unique identifier of the merchant commission.          |
| name                          | ✓        | String    | Merchant Commission 1                             | Name of the merchant commission.                |
| description                   |          | String    |                                                   | Description of the merchant commission.         |
| valid_from                    |          | Date      | 2024-01-01                                        | Starting from this date the commission is applied. |
| valid_to                      |          | Date      | 2029-06-01                                        | The last day of when the commission is applied.   |
| is_active                     | ✓        | Boolean      | 1                                                 | Defines if the merchant commission is active.   |
| amount                        |          | Integer       | 5                                                 | Amount of the merchant commission.              |
| calculator_type_plugin        | ✓        | String    | percentage                                        | Type of the calculator plugin used to calculate the commission.             |
| merchant_commission_group_key | ✓        | String    | primary                                           | Defines the merchant commission group. Can be primary or secondary.           |
| priority                      | ✓        | Integer       | 1                                                 | Priority of the merchant commission.            |
| item_condition                |          | String    | item-price >= '500' AND category IS IN 'computer' | Item conditions that must be fulfilled to apply the commission.                         |
| order_condition               |          | String    | "price-mode = ""GROSS_MODE"""                     | Condition for the order.                        |
| merchants_allow_list |       |  It contains a list of merchant references separated by commas, such as “MER000002,MER000006”
| fixed_amount_configuration |    |     |    EUR|0.5|0.5,CHF|0.5|0.5         |     Defines fixed amount commission configuration in case a fixed commission needs to be applied to each item in the order. Format: `CURRENCY|GROSS AMOUNT|NET AMOUNT` |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_category.csv) | Import file template with headers only.         |
| [merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_category.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import merchant-category
```

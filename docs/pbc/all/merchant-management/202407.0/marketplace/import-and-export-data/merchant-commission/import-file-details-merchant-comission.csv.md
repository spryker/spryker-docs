---
title: "Import file details: merchant_commission.csv"
last_updated: Jul 07, 2024
description: Import merchant comissions.
template: import-file-template
---

This document describes the `merchant_commission.csv` file to configure [merchant commission](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-commission-feature-overview.html).

## Import file dependencies



## Import file parameters

| COLUMN                        | REQUIRED | DATA TYPE | DATA EXAMPLE                                      | DATA EXPLANATION                                |
|-------------------------------|----------|-----------|---------------------------------------------------|-------------------------------------------------|
| key                           | ✓        | String    | mc1                                               | Unique identifier of the merchant commission.          |
| name                          | ✓        | String    | Merchant Commission 1                             | Name of the merchant commission; must be unique and in the range of 1 to 255 characters.                |
| description                   |          | String    |                                                   | Description of the merchant commission.         |
| valid_from                    |          | Date      | 2024-01-01                                        | Starting from this date the commission is applied. |
| valid_to                      |          | Date      | 2029-06-01                                        | The last day of when the commission is applied.   |
| is_active                     | ✓        | Boolean      | 1                                                 | Defines if the merchant commission is active.   |
| amount                        |          | Integer       | 10.99                                                 | Percentage of the merchant commission. The value must be a decimal. `10.99` in the example means `10.99%`. If `calculator_type_plugin` is `fixed`, the current value must be `0`.              |
| calculator_type_plugin        | ✓        | String    | percentage                                        | Type of the calculator plugin used to calculate the commission. By default, accepts `percentage` and `fixed`; you can add custom plugins. |
| merchant_commission_group_key | ✓        | String    | primary                                           | Defines the merchant commission group. Accepts `primary` and `secondary`; you can add custom groups.  |
| priority                      | ✓        | Integer       | 1                                                 | Priority of the merchant commission. Priority defines the commission to apply if multiple commissions are available within a group. Defined in an ascending order starting from `1`.           |
| item_condition                |          | String    | item-price >= '500' AND category IS IN 'computer' | Item conditions that must be fulfilled to apply the commission.                         |
| order_condition               |          | String    | "price-mode = ""GROSS_MODE"""                     | Condition for the order.                        |
| merchants_allow_list |       |  It contains a list of merchant references separated by commas, such as “MER000002,MER000006”
| fixed_amount_configuration |    |     |    EUR|0.5|0.5,CHF|0.5|0.5         |     Defines fixed amount commission configuration in case a fixed commission needs to be applied to each item in the order. Format: `CURRENCY|GROSS AMOUNT|NET AMOUNT` |


## Import template file and content example

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_commission.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.md/template_merchant_commission.csv) | Import file template with headers only.         |
| [merchant_commission.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.md/merchant_commission.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import:merchant-commission
```

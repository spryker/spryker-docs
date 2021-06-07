---
title: "File details: merchant_stock.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_stock.csv file to configure merchant stock information in your Spryker shop.
template: import-file-template
---

To import the file, run

```bash
data:import merchant-stock
```

## Import file parameters

The file should have the following parameters:

| PARAMETER    | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION      |
| ------------- | -------- | ------ | ------------- | --------------------------------- | ----------------- |
| merchant_reference | ✓             | String   |                   | Unique                                                       | Identifier of the merchant in the system. |
| stock_name         | ✓             | String   |                   | Stock name is defined as described in [Merchant Warehouse](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2217378238/File%2Bdetails%2Bmerchant%2Bstock.csv#). | Name of the stock.                        |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2207154250/File+details+merchant.csv)
- [File details: warehouse.csv - Commerce setup](https://documentation.spryker.com/docs/file-details-warehousecsv) 

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION    |
| --------------------- | --------------------- |
| [template_merchant_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_stock.csv) | Import file template with headers only.         |
| [merchant_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_stock.csv) | Example of the import file with Demo Shop data. |
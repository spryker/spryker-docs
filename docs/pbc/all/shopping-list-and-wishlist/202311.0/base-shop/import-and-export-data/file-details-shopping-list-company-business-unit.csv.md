---
title: "File details: shopping_list_company_business_unit.csv"
description: Use the shopping_list_company_business_unit.csv file to configure shopping list sharing with company business units in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `shopping_list_company_business_unit.csv` file to configure [shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) sharing with company [business units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) in your Spryker shop.

## Import file dependencies

* [file-details-company-business-unit.csv](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-and-export-data/file-details-company-business-unit.csv.html)
* [shopping_list.csv](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/import-and-export-data/file-details-shopping-list.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies the shopping list to add data to. |
|business_unit_key|&check;|string| Key that identifies the company business unit that the shopping list is shared with.|
|permission_group_name|&check;|integer | Permission group assigned to the shared company business unit.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list_company_business_unit.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-company_business-unit.csv.md/templaste_shopping_list_company_business_unit.csv)| Import file template with headers only. |
| [`shopping_list_company_business_unit.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-company_business-unit.csv.md/shopping_list_company_business_unit.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list-business-unit
```
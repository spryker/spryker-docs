---
title: "File details: shopping_list_company_user.csv"
description: Use the shopping_list_company_user.csv file to configure shopping list sharing with company users in your Spryker shop.
template: data-import-template
redirect_from:
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `shopping_list_company_user.csv` file to configure [shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) sharing with [company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html) in your Spryker shop.

## Import file dependencies

* [company_user.csv](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-and-export-data/file-details-company-user.csv.html)
* [shopping_list.csv](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/import-and-export-data/file-details-shopping-list.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies the shopping list to add data to. |
|company_user_key|&check;|string| Key that identifis the company user that the shopping list is shared with.|
|permission_group_name|&check;|integer |Permission group assigned to the shared company user.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list_company_user.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-company-user.csv.md/template_shopping_list_company_user.csv) | Import file template with headers only. |
| [`shopping_list_company_user.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/shopping-list-and-wishlist/base-shop/import-and-export-data/file-details-shopping-list-company-user.csv.md/shopping_list_company_user.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list-company-user
```

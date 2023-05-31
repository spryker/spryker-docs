---
title: "File details: shopping_list_company_user.csv"
template: data-import-template
last_updated: 
---

This document describes the `shopping_list_company_user.csv` file to configure [shopping list](https://docs.spryker.com/docs/pbc/all/shopping-list-and-wishlist/202212.0/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) sharing with [company users](https://docs.spryker.com/docs/pbc/all/customer-relationship-management/202212.0/company-account-feature-overview/company-user-roles-and-permissions-overview.html) in your Spryker shop.

## Import file dependencies

[shopping_list.csv](_drafts/data-import/base-shop/file-details-shopping-list.csv.md)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shopping_list_key | &check; | string | Key that identifies the shopping list to add data to. |
|company_user_key|&check;|string| Key that identifis the company user that the shopping list is shared with.|
|permission_group_name|&check;|integer |Permission group assigned to the shared company user.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_shopping_list_company_user.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`shopping_list_company_user.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:shopping-list-company-user
```
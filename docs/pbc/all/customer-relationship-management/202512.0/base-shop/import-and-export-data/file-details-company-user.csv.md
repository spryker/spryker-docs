---
title: "File details: company_user.csv"
description: Use the company_user.csv file to configure information about company accounts in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
redirect_from:
- /docs/pbc/all/customer-relationship-management/202311.0/import-and-export-data/file-details-company-user.csv.html
---

This document describes the `company_user.csv` file to configure information about [company accounts](/docs/pbc/all/customer-relationship-management/latest/base-shop/company-account-feature-overview/company-accounts-overview.html) in your Spryker shop.

## Import file dependencies

[File details: company.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-company.csv.html)
[File details: customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer.csv.html)

## Import file parameters

| PARAMETER          | REQUIRED  | TYPE    | REQUIREMENTS OR COMMENTS                              | DESCRIPTION                                          |
|--------------------|-----------|---------|-------------------------------------------------------|------------------------------------------------------|
| company_user_key   | &check;   | string  |                                                       | Internal data import identifier of the company user. |
| customer_reference | &check;   | string  |                                                       | Customer identifier.                                 |
| company_key        | &check;   | string  |                                                       | Internal data import identifier of the company.      |
| is_default         |           | bool    | `1`: default company user; `0` or no value otherwise. | Defines if a company user is default.                |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_company_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-user.csv.md/template_company_user.csv)| Import file template with headers only. |
| [company_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-user.csv.md/company_user.csv)| Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:company-user
```
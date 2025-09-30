---
title: "File details: company.csv"
description: Use the company.csv file to configure information about company accounts in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `company.csv` file to configure information about [company accounts](/docs/pbc/all/customer-relationship-management/latest/base-shop/company-account-feature-overview/company-accounts-overview.html) in your Spryker shop.

## Import file parameters

| PARAMETER | REQUIRED | TYPE   | REQUIREMENTS OR COMMENTS                                  | DESCRIPTION                     |
|-----------|----------|--------|-----------------------------------------------------------|---------------------------------|
| key       | &check;  | string |                                                           | Company key.                    |
| name      | &check;  | string |                                                           | Company name.                   |
| is_active |          | bool   | <ul><li>`1`: active</li><li>`0`: inactive</li></ul>       | Defines if a company is active. |
| status    |          | string | <ul><li>pending</li><li>approved</li><li>denied</li></ul> | Company status.                 |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_company.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company.csv.md/template_company.csv)| Import file template with headers only. |
| [company.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company.csv.md/company.csv)| Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:company
```
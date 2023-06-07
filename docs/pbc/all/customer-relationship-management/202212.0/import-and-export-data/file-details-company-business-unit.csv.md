---
title: "File details: company_business_unit.csv"
description: Use the company_business_unit.csv file to configure information about company accounts in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `company_business_unit.csv` file to configure information about [business units](docs/pbc/all/customer-relationship-management/{{page.version}}/company-account-feature-overview/business-units-overview.html) in your Spryker shop.

## 

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| company_key |&check;| string | Company user key.|
| business_unit_key |&check;| string | Company name.|
| name | is_default | &check; | string | Defines if a company user is default. |
| email | is_default | &check; | string | Defines if a company user is default. |
| phone | is_default | &check; | string | Defines if a company user is default. |
| external_url | is_default | &check; | string | Defines if a company user is default. |
| iban | is_default | &check; | string | Defines if a company user is default. |
| bic | is_default | &check; | string | Defines if a company user is default. |
| parent_business_unit_key | | &check; | string | Defines if a company user is default. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_company_business_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-business-unit.csv.md/template_company_business_unit.csv)| Import file template with headers only. |
| [company_business_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-business-unit.csv.md/company_business_unit.csv)| Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:company-user
```
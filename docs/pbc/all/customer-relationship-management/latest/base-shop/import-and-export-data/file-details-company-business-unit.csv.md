---
title: "File details: company_business_unit.csv"
description: Use the company_business_unit.csv file to configure information about company accounts in your Spryker shop.
template: data-import-template
redirect_from:
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-company-business-unit.csv.html
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `company_business_unit.csv` file to configure information about [business units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) in your Spryker shop.

## Import file dependencies

[File details: company.csv](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-and-export-data/file-details-company.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | - | --- | --- |
| company_key |&check;| string |  Internal data import identifier of the company.|
| business_unit_key |&check;| string |  Internal data import identifier of the company business unit. |
| name | &check; | string | Business unit name. |
| email | | string | Business unit email. |
| phone | | string | Business unit phone number. |
| external_url | | string | Link to internal or external resources related to the business unit. |
| iban | | string | IBAN of the business unit. |
| bic | | string | [TODO: Add description] |
| parent_business_unit_key | | string | Internal identifier of the parent business unit. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_company_business_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-business-unit.csv.md/template_company_business_unit.csv)| Import file template with headers only. |
| [company_business_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/import-and-export-data/file-details-company.csv.md/file-details-company-business-unit.csv.md/company_business_unit.csv)| Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:company-business-unit
```

---
title: "File details: company.csv"
template: data-import-template
last_updated: 
---

This document describes the `company.csv` file to configure information about [company accounts](/docs/pbc/all/customer-relationship-management/{{page.version}}/company-account-feature-overview/company-accounts-overview.html) in your Spryker shop.

## Import file dependencies

[TODO: add dependencies; If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.]

## Import file parameters
<!--| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |-->

| PARAMETER | REQUIRED |  TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key |&check;| string |  | Company key.|
| name |&check;| string | | Company name.|
| is_active | &check; | bool | <ul><li>`1`: active</li><li>`0`: inactive</li></ul> | Defines if a company is active. |
| status |&check;|string|  <!--TODO: add possible statuses--> |Company status.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_company.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`company.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:company
```
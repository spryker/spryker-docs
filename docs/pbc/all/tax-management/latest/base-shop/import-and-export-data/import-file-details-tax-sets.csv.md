---
title: "Import file details: tax_sets.csv"
description: Learn how to import tax sets information using the tax sets csv file within you Spryker based project for the tax management feature.
last_updated: Jun 23, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-taxcsv
originalArticleId: c9d15906-3b02-44fd-9bde-eb6883f5f320
redirect_from:
  - /docs/scos/dev/data-import/201907.0/data-import-categories/commerce-setup/file-details-tax.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-tax.csv.html
  - /docs/pbc/all/tax-management/202311.0/import-and-export-data/import-file-details-tax-sets.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-tax-sets.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/spryker-tax/import-and-export-data/import-file-details-tax-sets.csv.html
  - /docs/pbc/all/tax-management/202311.0/spryker-tax/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html
---

This document describes the `tax.csv` file to configure the [tax](/docs/pbc/all/tax-management/latest/base-shop/tax-feature-overview.html) information in your Spryker Demo Shop.


## Import file parameters

| PARAMETER | REQUIRED | TYPE |REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| tax_set_name | &check; | String |  | Name of the tax set. |
| country_name | &check; | String |  | Country to which the tax refers to. |
| tax_rate_name | &check; | String | | Name of the tax rate. <br>Tax rate is the ratio (usually expressed as a percentage) at which a business or person is taxed. |
| tax_rate_percent | &check; | Float | | Tax rate, expressed  as a percentage. |

## Import command

```bash
data:import:tax
```

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_tax.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+tax.csv) | Tax .csv template file (empty content, contains headers only). |
| [tax.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/tax.csv) | Exemplary import file with the Demo Shop data. |

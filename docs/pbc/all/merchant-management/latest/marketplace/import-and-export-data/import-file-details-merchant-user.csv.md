---
title: "Import file details: merchant_user.csv"
last_updated: Mar 01, 2021
description: This document describes the merchant_user.csv file to configure merchant information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-user.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-user.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant-user.csv.html
related:
  - title: Merchant users overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant-user.csv` file to configure [merchant user](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html) information in your Spryker shop.


## Import file dependencies

[merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html).

## Import file parameters


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| username | &check; | String |   |  Unique | Username of the merchant user. It is an email address that is used for logging into the Merchant Portal as a merchant user.  |



## Import template file and content example


|FILE|DESCRIPTION|
|-|-|
| [template_merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_user.csv) | Import file template with headers only. |
| [merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_user.csv) | Example of the import file with Demo Shop data content. |


## Import command

```bash
data:import merchant-user
```

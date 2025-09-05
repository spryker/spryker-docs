---
title: "Import file details: merchant.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant.csv file to configure merchant information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant.csv.html
related:
  - title: Marketplace Merchant feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
redirect_from:
  - /docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/howto-import-merchants-and-merchant-relations.html
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant.csv.html
---

This document describes the `merchant.csv` file to configure [merchant](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) information in your Spryker shop.

## Import file dependencies


- [merchant_profile.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html).


## Import file parameters



| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| merchant_name | &check; | String |   |   | The name of the merchant. |
| registration_number | &check; | Integer |   |   | Number assigned to the merchant at the point of registration. |
| status | &check; | String |   | Possible values: <ul><li>waiting-for-approval</li> <li>approved</li><li>denied</li></ul>  | The status of the merchant. |
| email | &check; | String |   |   | Email address of the merchant. |
| is_active | &check; | Integer |   | 1—is active<br> 0—is not active | Defines whether the merchant is active or not.  |
| url.de_DE | &check; | String |   | Defined per locale. | Merchant page URL in the storefront for DE store. |



## Import template file and content example

|FILE|DESCRIPTION|
|-|-|
| [template_merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant.csv) | Import file template with headers only. |
| [merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import merchant
```

---
title: "File details: merchant.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant.csv file to configure merchant information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant.csv` file to configure [merchant](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) information in your Spryker shop.

To import the file, run:

```bash
data:import merchant
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| merchant_name | &check; | String |   |   | The name of the merchant. |
| registration_number | &check; | Integer |   |   | Number assigned to the merchant at the point of registration. |
| status | &check; | String |   | Possible values: <ul><li>waiting-for-approval</li> <li>approved</li><li>denied</li></ul>  | The status of the merchant. |
| email | &check; | String |   |   | Email address of the merchant. |
| is_active | &check; | Integer |   | 1—is active<br> 0—is not active | Defines whether the merchant is active or not.  |
| url.de_DE | &check; | String |   | Defined per locale. | Merchant page URL in the storefront for DE store. |

## Import file dependencies
The file has the following dependencies:

- [merchant_profile.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant-profile.csv.html).

## Import template file and content example

Find the template and an example of the file below:

|FILE|DESCRIPTION|
|-|-|
| [template_merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant.csv) | Import file template with headers only. |
| [merchant.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant.csv) | Example of the import file with Demo Shop data. |

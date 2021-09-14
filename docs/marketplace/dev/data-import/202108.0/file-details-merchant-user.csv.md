---
title: "File details: merchant_user.csv"
last_updated: Mar 01, 2021
description: This document describes the merchant_user.csv file to configure merchant information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant-user.csv` file to configure [merchant user](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/merchant-users-overview.html) information in your Spryker shop.

To import the file, run:

```bash
data:import merchant-user
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| username | &check; | String |   |  Unique | Username of the merchant user. It is an email address that is used for logging into the Merchant Portal as a merchant user.  |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html).

## Import template file and content example

Find the template and an example of the file below:

|FILE|DESCRIPTION|
|-|-|
| [template_merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_user.csv) | Import file template with headers only. |
| [merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_user.csv) | Example of the import file with Demo Shop data content. |

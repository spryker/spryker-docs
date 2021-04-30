---
title: File details - merchant_user.csv
last_updated: Mar 01, 2021
description: This document describes the merchant_user.csv file to configure merchant information in your Spryker shop.
---

This document describes the `merchant-user.csv` file to configure [merchant user](/docs/marketplace/user/features/merchants/merchant-users-feature-overview.html) information in your Spryker shop.

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |   | Unique identifier of the merchant in the system. |
| username | &check; | String |   |   | Username of the merchant user. It is an email address that is used for logging in to the Merchant Portal as a merchant user.  |

## Import file dependencies

The file has the following dependencies: [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html).

## Import template file and content example

Find the template and an example of the file below:

|FILE|DESCRIPTION|
|-|-|
| [template_merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_user.csv) | Import file template with headers only. |
| [merchant_user.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_user.csv) | Exemplary import file with Demo Shop data. |

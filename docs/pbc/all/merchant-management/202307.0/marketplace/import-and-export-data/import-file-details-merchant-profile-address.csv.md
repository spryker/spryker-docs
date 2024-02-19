---
title: "Import file details: merchant_profile_address.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_profile_address.csv file to configure merchant profile addresses in your Spryker shop.
template: import-file-template
redirect_from:
- /docs/pbc/all/merchant-management/202307.0/marketplace/import-and-export-data/file-details-merchant-profile-address.csv.html
related:
  - title: Marketplace Merchant feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_profile_address.csv` file to configure [merchant profile addresses](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-profile) information in your Spryker shop.

To import the file, run:

```bash
data:import merchant-profile-address
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ---------- | ----- | ------------- | ----------- | ---- |
| merchant_reference | &check;             | String   |                   | Unique                       | Identifier of the merchant in the system.                    |
| country_iso2_code  |               | String   |                   |                              | Currency ISO code.  For more details check [ISO 4217 CURRENCY CODES](https://www.iso.org/iso-4217-currency-codes.html). |
| country_iso3_code  |               | String   |                   |                              | Currency [ISO 3 code](https://www.iban.com/country-codes).   |
| address1           |               | String   |                   |                              | Address information of the merchant.                         |
| address2           |               | String   |                   |                              |                                                              |
| address3           |               | String   |                   |                              |                                                              |
| city               |               | String   |                   |                              | City where the merchant is located.                          |
| zip_code           |               | String   |                   |                              | Zip code of the merchant.                                    |

## Import file dependencies

The file has the following dependencies:

- [merchant_profile.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE    | DESCRIPTION     |
| --------------------- | --------------------- |
| [template_merchant_profile_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_profile_address.csv) | Import file template with headers only.         |
| [merchant_profile_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_profile_address.csv) | Example of the import file with Demo Shop data. |

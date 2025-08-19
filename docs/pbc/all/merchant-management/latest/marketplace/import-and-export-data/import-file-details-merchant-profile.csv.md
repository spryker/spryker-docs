---
title: "Import file details: merchant_profile.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_profile.csv file to configure merchant information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-profile.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-profile.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html
related:
  - title: Marketplace Merchant feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_profile.csv` file to configure [merchant profile](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-profile) information in your Spryker shop.


## Import file dependencies

- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
- [glossary.csv](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| contact_person_role |   | String |   |   | Role the contact person performs. |
| contact_person_title |   | String |   |   | A formal salutation for your contact person (for example,Mr, Ms, Mrs, Dr). |
| contact_person_first_name |   | String |   |   | First name of the contact person. |
| contact_person_last_name |   | String |   |   | Last name of the contact person. |
| contact_person_phone |   | String |   |   | Phone number of the contact person. |
| banner_url |   | String |   |   | Link to the merchant's banner |
| logo_url |   | String |   |   | Logo URL for the merchant profile. |
| public_email |   | String |   |   | Business / public email address for the merchant.  |
| public_phone |   | String |   |   | Merchant's public phone number. |
| description_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `description_glossary_key.en_US` | Description for the merchant. |
| banner_url_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `banner_url_glossary_key.en_US` | Link to the merchant's banner. |
| delivery_time_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `delivery_time_glossary_key.en_US` | Average delivery time defined by the merchant. |
| terms_conditions_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `terms_conditions_glossary_key.en_US` | Terms and conditions for the merchant are defined here. |
| cancellation_policy_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `cancellation_policy_glossary_key.en_US` | Cancellation policy is defined per merchant here.  |
| imprint_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `imprint_glossary_key.en_US` | Imprint information per merchant is specified here. |
| data_privacy_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `data_privacy_glossary_key.en_US` | Data privacy statement is defined here. |
| fax_number |   | String |   |   | Merchant's fax number. |
| longitude |   | String |   |   | This field identifies merchant's location. |
| latitude |   | String |   |   | This field identifies merchant's location. |



## Import template file and content example

|FILE|DESCRIPTION|
|-|-|
| [template_merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_profile.csv) | Import file template with headers only. |
| [merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_profile.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import merchant-profile
```

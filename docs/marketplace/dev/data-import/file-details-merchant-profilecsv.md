---
title: "File details: merchant_profile.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_profile.csv file to configure merchant information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_profile.csv` file to configure [merchant profile](/docs/marketplace/user/features/{{ site.version }}/merchants/merchants-feature-overview.html#merchant-profile) information in your Spryker shop.

To import the file, run

```bash
data:import merchant-profile
```

## Import file parameters
The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |  Unique | Identifier of the merchant in the system. |
| contact_person_role |   | String |   |   | Role the contact person performs. |
| contact_person_title |   | String |   |   | A formal salutation for your contact person (e.g. Mr, Ms, Mrs, Dr). |
| contact_person_first_name |   | String |   |   | First name of the contact person. |
| contact_person_last_name |   | String |   |   | Last name of the contact person. |
| contact_person_phone |   | String |   |   | Phone number of the contact person. |
| banner_url |   | String |   |   | Link to the Merchant's banner |
| logo_url |   | String |   |   | Logo URL for the Merchant profile. |
| public_email |   | String |   |   | Business / public email address for the Merchant.  |
| public_phone |   | String |   |   | Merchant's public phone number. |
| description_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `description_glossary_key.en_US` | Description for the Merchant. |
| banner_url_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `banner_url_glossary_key.en_US` | Link to the Merchant's banner. |
| delivery_time_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `delivery_time_glossary_key.en_US` | Average delivery time defined by Merchant. |
| terms_conditions_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `terms_conditions_glossary_key.en_US` | Terms and conditions for the Merchant are defined here. |
| cancellation_policy_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `cancellation_policy_glossary_key.en_US` | Cancellation policy is defined per Merchant here.  |
| imprint_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `imprint_glossary_key.en_US` | Imprint information per Merchant is specified here. |
| data_privacy_glossary_key.{ANY_LOCALE_NAME} |   | String |   | Example value: `data_privacy_glossary_key.en_US` | Data privacy statement is defined here. |
| fax_number |   | String |   |   | Merchant's fax number. |
| longitude |   | String |   |   | This field identifies merchant’s location. |
| latitude |   | String |   |   | This field identifies merchant’s location. |

## Import file dependencies
The file has the following dependencies:
- [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)
- [glossary.csv]?(https://documentation.spryker.com/docs/file-details-glossarycsv)

## Import template file and content example
Find the template and an example of the file below:

|FILE|DESCRIPTION|
|-|-|
| [template_merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_profile.csv) | Import file template with headers only. |
| [merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_profile.csv) | Example of the import file with Demo Shop data. |

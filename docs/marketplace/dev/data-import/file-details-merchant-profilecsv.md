---
title: File details - merchant_profile.csv
last_updated: Feb 26, 2021
description: This document describes the merchant_profile.csv file to configure merchant information in your Spryker shop.
---

This document describes the `merchant_profile.csv` file to configure merchant profile information in your Spryker shop.

## Import file parameters
The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|-|
| merchant_reference | &check; | String |   |   | Unique identifier of the merchant in the system. |
| contact_person_role |   | String |   |   | Role the contact person performs. |
| contact_person_title |   | String |   |   | A formal salutation for your contact person (e.g. Mr, Ms, Mrs, Dr). |
| contact_person_first_name |   | String |   |   | First name of the contact person. |
| contact_person_last_name |   | String |   |   | Last name of the contact person. |
| contact_person_phone |   | String |   |   | Phone number of the contact person. |
| banner_url |   | String |   |   | Link to the Merchant's banner |
| logo_url |   | String |   |   | Logo URL for the Merchant profile. |
| public_email |   | String |   |   | Business / public email address for the Merchant.  |
| public_phone |   | String |   |   | Merchant's public phone number. |
| description_glossary_key.en_US |   | String |   | Defined per locale. | Description for the Merchant. |
| banner_url_glossary_key.en_US |   | String |   | Defined per locale. | Link to the Merchant's banner. |
| delivery_time_glossary_key.en_US |   | String |   | Defined per locale. | Average delivery time defined by Merchant. |
| terms_conditions_glossary_key.en_US |   | String |   | Defined per locale. | Terms and conditions for the Merchant are defined here. |
| cancellation_policy_glossary_key.en_US |   | String |   | Defined per locale. | Cancellation policy is defined per Merchant here.  |
| imprint_glossary_key.en_US |   | String |   | Defined per locale. | Imprint information per Merchant is specified here. |
| data_privacy_glossary_key.en_US |   | String |   | Defined per locale. | Data privacy statement is defined here. |
| fax_number |   | String |   |   | Merchant's fax number. |
| longitude |   | String |   |   | This field identifies merchant’s location. |
| latitude |   | String |   |   | This field identifies merchant’s location. |

## Import file dependencies
The file has the following dependencies:

The file has the following dependencies: [File details - merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html).

## Import template file and content example
Find the template and an example of the file below:

|FILE|DESCRIPTION|
|-|-|
| [template_merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_profile.csv) | Import file template with headers only. |
| [merchant_profile.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_profile.csv) | Exemplary import file with Demo Shop data. |

---
title: "Import file details: glossary.csv"
description: Learn how you can configure customer information using the Spryker glossary csv file in your Spryker Cloud Commerce OS projects.
last_updated: Jun 16, 2021
template: data-import-template
redirect_from:
  - /2021080/docs/file-details-glossarycsv
  - /2021080/docs/en/file-details-glossarycsv
  - /docs/file-details-glossarycsv
  - /docs/en/file-details-glossarycsv
  - /docs/scos/dev/data-import/202204.0/data-import-categories/commerce-setup/file-details-glossary.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


This document describes the `glossary.csv` file to configure [Customer](/docs/pbc/all/miscellaneous/latest/manage-in-the-back-office/add-translations.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:glossary
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String |   | Glossary key, which is used in the templates contained in the shop application. |
| translation | &check; | String |   | Translation value of the key for the specific locale. |
| locale | &check; | String |   | Locale of the translation. |

## Import file dependencies

This file has no dependencies.

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [glossary.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+glossary.csv) | Exemplary import file with headers only. |
| [glossary.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/glossary.csv) | Exemplary import file with Demo Shop data. |

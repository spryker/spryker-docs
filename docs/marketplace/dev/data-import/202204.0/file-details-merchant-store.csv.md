---
title: "File details: merchant_store.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_store.csv file to configure merchant store information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_store.csv` file to configure merchant's stores in your Spryker shop.

To import the file, run:

```bash
data:import merchant-store
```

## Import file parameters

The file should have the following parameters:

| PARAMETER    | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION  |
| -------------- | ----------- | ----- | -------------- | ------------------------ | ----------------------- |
| merchant_reference | &check;             | String   |                   | Unique                                                       | Identifier of the merchant in the system.       |
| store_name         | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store where the merchant product offer belongs. |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)
- `stores.php` configuration file of the demo shop PHP project, where stores are defined initially

## Import template file and content example

Find the template and an example of the file below:

| FILE   | DESCRIPTION  |
| --------------------------- | ---------------------- |
| [template_merchant_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_store.csv) | Import file template with headers only.         |
| [merchant_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_store.csv) | Example of the import file with Demo Shop data. |

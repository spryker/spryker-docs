---
title: "File details: merchant_category.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_profile_address.csv file to configure merchant profile addresses in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_category.csv` file to configure [merchant categories](/docs/marketplace/user/features/{{site.version}}/merchant-category-feature-overview.html) in your Spryker shop.

To import the file, run:

```bash
data:import merchant-category
```

## Import file parameters

The file should have the following parameters:

| PARAMETER      | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION      |
| -------------- | ----------- | ------- | ------------- | -------------------- | ------------------------------- |
| category_key       | &check;             | String   |                   |                              | Category key to assign the merchant to.   |
| merchant_reference | &check;             | String   |                   | Unique                       | Identifier of the merchant in the system. |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE       | DESCRIPTION     |
| ---------------------------------- | --------------------------- |
| [template_merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_category.csv) | Import file template with headers only.         |
| [merchant_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_category.csv) | Example of the import file with Demo Shop data. |

---
title: "File details: product_offer_validity.csv"
last_updated: Feb 26, 2021
description: This document describes the product_offer_validity.csv file to configure  product offer validity dates in your Spryker shop.
template: import-file-template
---

This document describes the `product_offer_validity.csv` file to configure product offer validity dates in your Spryker shop.

To import the file, run:

```bash
data:import product-offer-validity
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ---------- | ---------- | ------- | ------------- | ------------------ | ------------- |
| product_offer_reference | &check;             | String   |                   | Unique                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| valid_from              |               | Datetime |                   |                              | Date and time from which the offer is active.                |
| valid_to                |               | Datetime |                   |                              | Date and time till which the offer is active.                |

## Import file dependencies

The file has the following dependencies:

- [merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant-product-offer.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION    |
| ------------------------------- | ----------------------- |
| [template_product_offer_validity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_product_offer_validity.csv) | Import file template with headers only.         |
| [product_offer_validity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/product_offer_validity.csv) | Example of the import file with Demo Shop data. |

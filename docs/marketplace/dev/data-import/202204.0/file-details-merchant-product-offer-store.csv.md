---
title: "File details: merchant_product_offer_store.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product_offer_store.csv file to configure merchant product offer store information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_product_offer_store.csv` file to configure [merchant product offer stores](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html#product-offer-stores) in your Spryker shop.

To import the file, run:

```bash
data:import merchant-product-offer-store
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ----------- | ------- | ------------ | --------------------- | ------------ |
| product_offer_reference | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| store_name              | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store where the merchant product offer belongs.              |

## Import file dependencies

The file has the following dependencies:

- [merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant-product-offer.csv.html)
- `stores.php` configuration file of the demo shop PHP project

## Import template file and content example

Find the template and an example of the file below:

| FILE   | DESCRIPTION       |
| ------------------------------ | ---------------------- |
| [template_merchant_product_offer_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_offer_store.csv) | Import file template with headers only.         |
| [merchant_product_offer_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_offer_store.csv) | Exemple of the import file with Demo Shop data. |

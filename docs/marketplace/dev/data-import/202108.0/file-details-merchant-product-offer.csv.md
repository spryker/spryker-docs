---
title: "File details: merchant_product_offer.csv"
last_updated: Feb 26, 2021
description: This document describes the `merchant_product_offer.csv` file to configure merchant product offer information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_product_offer.csv` file to configure [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) information in your Spryker shop.

To import the file, run

```bash
data:import merchant-product-offer
```

## Import file parameters

The file should have the following parameters:

| PARAMETER    | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS     | DESCRIPTION |
| ------------------ | ------------ | ------- | -------------- | -------------------- | ----------------------- |
| product_offer_reference | &check;             | String   |                   | Unique                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| concrete_sku            | &check;             | String   |                   | Unique                                       | SKU of the concrete product the offer is being created for.  |
| merchant_reference      | &check;             | String   |                   | Unique                                       | Identifier of the [merchant](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) in the system. |
| merchant_sku            |               | String   |                   | Unique                                       | SKU of the merchant.                                         |
| is_active               | &check;             | Integer  |                   | 1—is active<br>0—is not active             | Defines whether the offer is active or not.                  |
| approval_status         | &check;             | String   |                   | Can be: <ul><li>waiting_for_approval</li><li>approved</li><li>declined</li></ul> | Defines the [status of the offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html#product-offer-status) in the system. |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)
- [product_concrete.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION |
| -------------------------- | ------------------ |
| [template_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_offer.csv) | Import file template with headers only.         |
| [merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_offer.csv) | Example of the import file with Demo Shop data. |

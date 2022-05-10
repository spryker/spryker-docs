---
title: "File details: price-product-offer.csv"
last_updated: Feb 26, 2021
description: This document describes the price-product-offer.csv file to configure merchant product offer price information in your Spryker shop.
template: import-file-template
---

This document describes the `price-product-offer.csv` file to configure [Merchant product offer price](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) information in your Spryker shop.

To import the file, run:

```bash
data:import price-product-offer
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ---------- | ------- | ------------- | ----------------- | ------------- |
| product_offer_reference  | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| price_type               | &check;             | String   |                   | Can be DEFAULT or ORIGINAL                                   | Price type.                                                  |
| store                    | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store the price is defined for.                              |
| currency                 | &check;             | String   |                   | Defined in the [ISO code](https://en.wikipedia.org/wiki/ISO_4217). | Currency of the price.                                       |
| value_net                |               | Integer  |                   | Empty price values are imported as zeros.                    | Net price in cents.                                          |
| value_gross              |               | Integer  |                   | Empty price values are imported as zeros.                    | Gross price in cents.                                        |
| price_data.volume_prices |               | Array    |                   |                                                              | Price data which can be used to define alternative prices, that is, volume prices, overwriting the given net or gross price values. |

## Import file dependencies

The file has the following dependencies:

- [merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant-product-offer.csv.html)
- [product_price.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE |DESCRIPTION |
| ------------------------- | ----------------------- |
| [template_price-product-offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_price_product_offer.csv) | Import file template with headers only.         |
| [price-product-offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/price_product_offer.csv) | Example of the import file with Demo Shop data. |

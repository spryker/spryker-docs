---
title: "Import file details: price-product-offer.csv"
last_updated: Feb 26, 2021
description: This document describes the price-product-offer.csv file to configure merchant product offer price information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-price-product-offer.csv.html
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `price-product-offer.csv` file to configure [Merchant product offer price](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) information in your Spryker shop.

## Import file dependencies

- [merchant_product_offer.csv](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)
- [product_price.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ---------- | ------- | ------------- | ----------------- | ------------- |
| product_offer_reference  | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| price_type               | &check;             | String   |                   | Can be DEFAULT or ORIGINAL                                   | Price type.                                                  |
| store                    | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store the price is defined for.                              |
| currency                 | &check;             | String   |                   | Defined in the [ISO code](https://en.wikipedia.org/wiki/ISO_4217). | Currency of the price.                                       |
| value_net                |               | Integer  |                   | Empty price values are imported as zeros.                    | Net price in cents.                                          |
| value_gross              |               | Integer  |                   | Empty price values are imported as zeros.                    | Gross price in cents.                                        |
| price_data.volume_prices |               | Array    |                   |                                                              | Price data which can be used to define alternative prices, that is, volume prices, overwriting the given net or gross price values. |



## Import template file and content example

| FILE |DESCRIPTION |
| ------------------------- | ----------------------- |
| [template_price-product-offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_price_product_offer.csv) | Import file template with headers only.         |
| [price-product-offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/price_product_offer.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import price-product-offer
```

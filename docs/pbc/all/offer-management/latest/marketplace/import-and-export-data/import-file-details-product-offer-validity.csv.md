---
title: "Import file details: product_offer_validity.csv"
last_updated: Feb 26, 2021
description: This document describes the product_offer_validity.csv file to configure  product offer validity dates in your Spryker shop.
template: import-file-template
redirect_from:
- /docs/pbc/all/offer-management/202311.0/marketplace/import-and-export-data/file-details-product-offer-validity.csv.html
- /docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-product-offer-validity.csv.html
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_offer_validity.csv` file to configure product offer validity dates in your Spryker shop.


## Import file dependencies

[merchant_product_offer.csv](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ---------- | ---------- | ------- | ------------- | ------------------ | ------------- |
| product_offer_reference | &check;             | String   |                   | Unique                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| valid_from              |               | Datetime |                   |                              | Date and time from which the offer is active.                |
| valid_to                |               | Datetime |                   |                              | Date and time till which the offer is active.                |


## Import template file and content example

| FILE  | DESCRIPTION    |
| ------------------------------- | ----------------------- |
| [template_product_offer_validity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_product_offer_validity.csv) | Import file template with headers only.         |
| [product_offer_validity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/product_offer_validity.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import product-offer-validity
```

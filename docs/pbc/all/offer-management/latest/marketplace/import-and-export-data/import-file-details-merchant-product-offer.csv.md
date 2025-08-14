---
title: "Import file details: merchant_product_offer.csv"
last_updated: Feb 26, 2021
description: This document describes the `merchant_product_offer.csv` file to configure merchant product offer information in your Spryker shop.
template: import-file-template
redirect_from:
- /docs/pbc/all/offer-management/202311.0/marketplace/import-and-export-data/file-details-merchant-product-offer.csv.html
- /docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_product_offer.csv` file to configure [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) information in your Spryker shop.


## Import file dependencies

- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)


## Import file parameters

| PARAMETER    | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS     | DESCRIPTION |
| ------------------ | ------------ | ------- | -------------- | -------------------- | ----------------------- |
| product_offer_reference | &check;             | String   |                   | Unique                                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| concrete_sku            | &check;             | String   |                   | Unique                                       | SKU of the concrete product the offer is being created for.  |
| merchant_reference      | &check;             | String   |                   | Unique                                       | Identifier of the [merchant](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) in the system. |
| merchant_sku            |               | String   |                   | Unique                                       | SKU of the merchant.                                         |
| is_active               | &check;             | Integer  |                   | 1—is active<br>0—is not active             | Defines whether the offer is active or not.                  |
| approval_status         | &check;             | String   |                   | Can be: <ul><li>waiting_for_approval</li><li>approved</li><li>declined</li></ul> | Defines the [status of the offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html#product-offer-status) in the system. |



## Import template file and content example

| FILE  | DESCRIPTION |
| -------------------------- | ------------------ |
| [template_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_offer.csv) | Import file template with headers only.         |
| [merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_offer.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-product-offer
```

---
title: "Import file details: merchant_product_offer_store.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product_offer_store.csv file to configure merchant product offer store information in your Spryker shop.
template: import-file-template
redirect_from:
- /docs/pbc/all/offer-management/202307.0/marketplace/import-and-export-data/file-details-merchant-product-offer-store.csv.html
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_product_offer_store.csv` file to configure [merchant product offer stores](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html#product-offer-stores) in your Spryker shop.



## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ----------- | ------- | ------------ | --------------------- | ------------ |
| product_offer_reference | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| store_name              | &check;             | String   |                   | Value previously defined in the *stores.php* project configuration. | Store where the merchant product offer belongs.              |



## Import template file and content example

| FILE   | DESCRIPTION       |
| ------------------------------ | ---------------------- |
| [template_merchant_product_offer_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_product_offer_store.csv) | Import file template with headers only.         |
| [merchant_product_offer_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_product_offer_store.csv) | Exemple of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-product-offer-store
```

---
title: "Import file details: merchant_product_offer_store.csv"
last_updated: Feb 26, 2021
description: This document describes the merchant_product_offer_store.csv file to configure merchant product offer store information in your Spryker shop.
template: import-file-template
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html
  - title: Marketplace Product Offer feature overview
    link: docs/marketplace/user/features/page.version/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `merchant_product_offer_store.csv` file to configure [merchant product offer stores](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html#product-offer-stores) in your Spryker shop.



## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ----------- | ----------- | ------- | ------------ | --------------------- | ------------ |
| product_offer_reference | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
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

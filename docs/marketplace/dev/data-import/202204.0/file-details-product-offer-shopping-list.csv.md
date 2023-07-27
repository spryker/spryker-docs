---
title: "File details: product_offer_shopping_list.csv"
last_updated: May 13, 2022
description: This document describes the product_offer_shopping_list.csv file to configure shopping lists with product offers in your Spryker shop.
template: import-file-template
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html
  - title: Marketplace Shopping Lists feature walkthrough
    link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-shopping-lists-feature-walkthrough.html
  - title: Marketplace Product Offer feature overview
    link: docs/marketplace/user/features/page.version/marketplace-product-offer-feature-overview.html
  - title: Marketplace Shopping List feature overview
    link: docs/marketplace/user/features/page.version/marketplace-shopping-list-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_offer_shopping_list.csv` file to configure [shopping lists with product offers](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-shopping-lists-feature-walkthrough.html) in your Spryker shop.

To import the file, run:

```bash
console data:import product-offer-shopping-list-item
```

## Import file parameters

The file should have the following parameters:

| PARAMETER   | REQUIRED | TYPE  | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|--------------|-----------|---------|---------------|------------|
| shopping_list_item_key  | &check;   | String  | Unique  | Identifier of the shopping list item in the system. |
| product_offer_reference | &check;   | String  |         | Identifier of the [product offer](/docs/marketplace/user/features/{{page.version}}/marketplace-product-offer-feature-overview.html) in the system. |

## Import file dependencies

The file has the following dependencies:

- [merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE  | DESCRIPTION  |
| ---------------------------- | ------------------- |
| [template_product_offer_shopping_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_product_offer_shopping_list.csv) | Import file template with headers only.         |
| [product_offer_shopping_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/product_offer_shopping_list.csv) | Example of the import file with Demo Shop data. |

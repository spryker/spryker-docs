---
title: "Import file details: product_offer_shopping_list.csv"
last_updated: May 13, 2022
description: This document describes the product_offer_shopping_list.csv file to configure shopping lists with product offers in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-product-offer-shopping-list.csv.html
related:
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-overview.html
  - title: Marketplace Shopping List feature overview
    link: docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/marketplace-shopping-lists-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_offer_shopping_list.csv` file to configure [shopping lists with product offers](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/marketplace-shopping-lists-feature-overview.html) in your Spryker shop.


## Import file dependencies

[merchant_product_offer.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)

## Import file parameters

| PARAMETER   | REQUIRED | TYPE  | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|--------------|-----------|---------|---------------|------------|
| shopping_list_item_key  | &check;   | String  | Unique  | Identifier of the shopping list item in the system. |
| product_offer_reference | &check;   | String  |         | Identifier of the [product offer](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-overview.html) in the system. |



## Import template file and content example

| FILE  | DESCRIPTION  |
| ---------------------------- | ------------------- |
| [template_product_offer_shopping_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_product_offer_shopping_list.csv) | Import file template with headers only.         |
| [product_offer_shopping_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/product_offer_shopping_list.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
console data:import product-offer-shopping-list-item
```

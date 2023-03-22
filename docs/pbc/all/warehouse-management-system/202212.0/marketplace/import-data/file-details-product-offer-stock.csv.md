---
title: "File details: product_offer_stock.csv"
last_updated: Feb 26, 2021
description: This document describes the product_offer_stock.csv file to configure merchant product offer stock in your Spryker shop.
template: import-file-template
related:
  - title: Marketplace Product Offer feature overview
    link: docs/marketplace/user/features/page.version/marketplace-product-offer-feature-overview.html
---

This document describes the `product_offer_stock.csv` file to configure [Merchant product offer stock](/docs/marketplace/user/features/{{page.version}}/marketplace-inventory-management-feature-overview.html#marketplace-stock-management) information in your Spryker shop.

## Import file dependencies

- [merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html)
- [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-data/file-details-warehouse.csv.html)


## Import file parameters

| PARAMETER     | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION        |
| ------------- | ---------- | ------- | ------------- | ---------------------------- | ----------------------- |
| product_offer_reference | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| stock_name              | &check;             | String   |                   | Stock name is defined as described in the [merchant warehouse](/docs/marketplace/user/features/{{site.version}}/marketplace-inventory-management-feature-overview.html#marketplace-warehouse-management). | Name of the stock.                                           |
| quantity                | &check;             | Integer  |                   |                                                              | The number of product offers that are in stock.              |
| is_never_out_of_stock   |               | Integer  |                   | 1—option is enabled<br>0—option is disabled.               | Allows the offer to be never out of stock. |


## Import template file and content example

| FILE  | DESCRIPTION  |
| ---------------------------- | ------------------- |
| [template_product_offer_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_product_offer_stock.csv) | Import file template with headers only.         |
| [product_offer_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/product_offer_stock.csv) | Exemple of the import file with Demo Shop data. |

## Import command

```bash
data:import product-offer-stock
```

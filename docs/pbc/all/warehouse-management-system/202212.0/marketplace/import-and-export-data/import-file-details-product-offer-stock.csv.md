---
title: "Import file details: product_offer_stock.csv"
last_updated: Feb 26, 2021
description: This document describes the product_offer_stock.csv file to configure merchant product offer stock in your Spryker shop.
template: import-file-template
related:
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_offer_stock.csv` file to configure [Merchant product offer stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) information in your Spryker shop.

## Import file dependencies

- [merchant_product_offer.csv](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)
- [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html)


## Import file parameters

The file should have the following parameters:

| PARAMETER     | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION        |
| ------------- | ---------- | ------- | ------------- | ---------------------------- | ----------------------- |
| product_offer_reference | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| stock_name              | &check;             | String   |                   | Stock name is defined as described in the [merchant warehouse](/docs/pbc/all/warehouse-management-system/{{site.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html). | Name of the stock.                                           |
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

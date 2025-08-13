---
title: "Import file details: product_price.csv"
last_updated: Sep 7, 2021
description: This document describes the product_price.csv file to configure  product prices in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-product-price.csv.html
related:
  - title: Marketplace Product feature walkthrough
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document contains content of the **product_price.csv** file to configure [prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/prices-feature-overview.html) of the products/services in your Spryker Demo Shop.

## Dependencies

- [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)
- `stores.php` configuration file of the Demo Shop PHP project

## Import file parameters

| FIELD NAME    | MANDATORY  | TYPE  | OTHER REQUIREMENTS/COMMENTS | DESCRIPTION  |
| ------------------ | ------------- | ----- | ------------- | ------------------- |
| abstract_sku    | Yes (if `concrete_sku`is empty) | String  | Either this field or `concrete_sku` needs to be filled. | SKU of the abstract product to which the price should apply. |
| concrete_sku   | Yes (if `abstract_sku`is empty) | String  | Either this field or `abstract_sku` needs to be filled. | SKU of the concrete product to which the price should apply. |
| price_type    | No     | String  | N/A*    | Defines the price type.    |
| store    | Yes    | String  | N/A     | Store to which this price should apply.   |
| currency  | No   | String  | N/A   | Defines in which currency the price is.  |
| value_net | No    | Integer | N/A   | Sets the net price.  |
| value_gross  | No  | Integer | N/A    | Sets the gross price.  |
| price_data.volume_prices | No    | String  | N/A  | Price data which can be used to define alternative prices, that is, volume prices, overwriting the given net or gross price values. |

*N/A: Not applicable.



## Import template file and content example


| FILE | DESCRIPTION |
| --- | --- |
| [product_price.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/Template+product_price.csv) | Product Price CSV template file (empty content, contains headers only). |
| [product_price.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/product_price.csv) | Product Price CSV file containing a Demo Shop data sample.  |

## Import command


```bash
data:import product-price
```

---
title: File details - product_price.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-pricecsv
originalArticleId: 8b15001c-2219-48ad-86cf-a60e6ad09d28
redirect_from:
  - /2021080/docs/file-details-product-pricecsv
  - /2021080/docs/en/file-details-product-pricecsv
  - /docs/file-details-product-pricecsv
  - /docs/en/file-details-product-pricecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This article contains content of the `product_price.csv` file to configure [prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html) of the products/services in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-price
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check; (if `concrete_sku` is empty) | String | Either this field or `concrete_sku` needs to be filled. | SKU of the abstract product to which the price should apply. |
| concrete_sku | &check; (if `abstract_sku` is empty) | String | Either this field or `abstract_sku` needs to be filled. | SKU of the concrete product to which the price should apply. |
| price_type |  | String |  | Defines the price type. |
| store | &check; | String |  | Store to which this price should apply. |
| currency |  | String |  | Defines in which currency the price is. |
| value_net |  | Integer |  | Sets the net price. |
| value_gross |  | Integer |   | Sets the gross price. |
| price_data.volume_prices |  | String |  | Price data which can be used to define alternative prices, i.e volume prices, overwriting  the given net or gross price values. |


## Import file dependencies

This file has the following dependencies:

* [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)
* [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)
* *stores.php* configuration file of the Demo Shop PHP project

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [product_price.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/Template+product_price.csv) | Exemplary import file with headers only. |
| [product_price.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/product_price.csv) | Exemplary import file with Demo Shop data. |

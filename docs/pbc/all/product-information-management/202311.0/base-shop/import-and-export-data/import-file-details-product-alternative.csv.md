---
title: "Import file details: product_alternative.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-alternativecsv
originalArticleId: cda20a75-66a5-4c07-a130-74725e5e5da0
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-alternative.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/file-details-product-alternative.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-file-details-product-alternative.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_alternative.csv` file to configure [Alternative Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

* [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)
* [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| concrete_sku | &check; | String |N/A* | SKU of the concrete product to which this alternative is applied. |
| alternative_product_concrete_sku | &check; (*if the `alternative_product_abstract_sku` is empty*) | String |  | SKU of the alternative concrete product. |
| alternative_product_abstract_sku | &check; (*if `alternative_product_concrete_sku` is empty*) | String |  | SKU of the alternative abstract product. |



## Additional information

It does not exist by default on the project level. You can create it to override the CSV file from module:

* `vendor/spryker/product-alternative-data-import/data/import/product_alternative.csv`

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_alternative.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_alternative.csv) | Exemplary import file with headers only. |
| [product_alternative.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_alternative.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-alternative
```

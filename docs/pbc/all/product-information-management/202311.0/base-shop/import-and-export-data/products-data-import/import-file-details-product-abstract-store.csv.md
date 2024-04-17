---
title: "Import file details: product_abstract_store.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-abstract-storecsv
originalArticleId: 289b16ad-bb98-40cb-80c6-cfdef692687f
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/file-details-product-abstract-store.csv.html
  - /docs/pbc/all/product-information-management/202311.0/import-and-export-data/products-data-import/file-details-product-abstract-store.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/products-data-import/file-details-product-abstract-store.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_abstract_store.csv` file to configure Product Abstract Store information in your Spryker Demo Shop.

## Import file dependencies

* [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
* *stores.php* configuration file of the demo shop PHP project


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check; | String | Must be unique. | SKU identifier of the abstract product. |
| store_name | &check; | String |  | Name of the store that has this product. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_abstract_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_abstract_store.csv) | Exemplary import file with headers only. |
| [product_abstract_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_abstract_store.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-abstract-store
```

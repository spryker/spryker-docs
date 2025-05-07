---
title: "Import file details: product_stock.csv"
description: learn how to configure product stock data in your Spryker based project using the product stock csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-stockcsv
originalArticleId: 3ee0b369-582a-42c5-a659-81fc4231281d
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/catalog-setup/stocks/file-details-product-stock.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/stocks/file-details-product-stock.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/stocks/stocks.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/stocks/file-details-product-stock.csv.html
  - /docs/pbc/all/warehouse-management-system/import-data/file-details-product-stock.csv.html
  - docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-data/file-details-product-stock.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-and-export-data/file-details-product-stock.csv.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/import-and-export-data/import-file-details-product-stock.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_stock.csv` file to configure [Product Stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

* [product_concrete.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)
* [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| concrete_sku | &check; | String |   | SKU reference that identifies the concrete product. |
| name | &check; | String |	  |The *name* value is imported from the `warehouse.csv` file. |
| quantity | &check; | Integer |   | Number of product items remaining in stock. The number of articles available in the warehouse. |
| is_never_out_of_stock |  | Boolean | True = 1<br>False = 0 | Used for non-tangible products that never run out-of-stock (for example, a software license, a service, etc.). The value must be 1 (*true*) if it's a non-tangible product. |
| is_bundle |  | Boolean | True = 1<br>False = 0 | Indicates if the product is a a bundle or not. The value will be equal to 1 (*true*) if the product is a bundle. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_stock.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Stocks/Template+product_stock.csv) | Exemplary import file with headers only. |
| [product_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Stocks/product_stock.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:product-stock
```

## Additional information

* The `product_stock.csv` file contains information about the amount of product articles stored in the warehouses.
* The product is identified by `concrete_sku` field (imported from `product_concrete.csv`), field name is a valid name of a warehouse (imported from `warehouse.csv`), field quantity is a number of product items/articles remaining in stock.
* When you update stock via the data import and some products do not have the records in the `product_stock.csv`  file, then stock of these products are not updated.

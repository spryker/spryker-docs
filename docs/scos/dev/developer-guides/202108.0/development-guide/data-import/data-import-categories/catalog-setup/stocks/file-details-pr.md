---
title: File details- product_stock.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-stockcsv
redirect_from:
  - /2021080/docs/file-details-product-stockcsv
  - /2021080/docs/en/file-details-product-stockcsv
---

This article contains content of the **product_stock.csv** file to configure [Product Stock](https://documentation.spryker.com/docs/multiple-warehouse-stock) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **concrete_sku** | Yes | String |N/A* | SKU reference that identifies the concrete product. |
| **name** | Yes | String |	The *name* value is imported from the `warehouse.csv` file. |  |
| **quantity** | Yes | Integer |N/A | Number of product items remaining in stock. The number of articles available in the warehouse. |
| **is_never_out_of_stock** | No | Boolean |True = 1<br>False = 0 | Used for non-tangible products that never run out-of-stock (i.e. a software licence, a service, etc.). The value must be 1 (*true*) if it is a non-tangible product. |
| **is_bundle** | No | Boolean |True = 1<br>False = 0 | Indicates if the product is a a bundle or not. The value will be equal to 1 (*true*) if the product is a bundle. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:

* [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)
* [warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv)

## Recommendation & Other Information

* The *product_stock.csv* file contains information about the amount of product articles stored on the warehouses. 
* The product is identified by `concrete_sku` field (imported from *product_concrete.csv*), field name is a valid name of a warehouse (imported from *warehouse.csv*), field quantity is a number of product items/articles remaining in stock. 
* When you update stock via the data import and some products do not have the records in the *product_stock.csv*  file, then stock of these products are not updated.

## Template File & Content Example
A template and an example of the *product_stock.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_stock.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Stocks/Template+product_stock.csv) | Payment Method Store .csv template file (empty content, contains headers only). |
| [product_stock.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Stocks/product_stock.csv) | Payment Method Store .csv file containing a Demo Shop data sample. |

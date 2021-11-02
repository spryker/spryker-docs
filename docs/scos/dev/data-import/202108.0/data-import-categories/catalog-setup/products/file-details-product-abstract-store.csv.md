---
title: File details- product_abstract_store.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-abstract-storecsv
originalArticleId: 289b16ad-bb98-40cb-80c6-cfdef692687f
redirect_from:
  - /2021080/docs/file-details-product-abstract-storecsv
  - /2021080/docs/en/file-details-product-abstract-storecsv
  - /docs/file-details-product-abstract-storecsv
  - /docs/en/file-details-product-abstract-storecsv
---

This article contains content of the **product_abstract_store.csv** file to configure Product Abstract Store information on your Spryker Demo Shop.

## Headers & Mandatory Fields

These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **abstract_sku** | Yes (unique) | String |N/A* | SKU identifier of the abstract product. |
| **store_name** | Yes | String |N/A | Name of the store that has this product. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
* [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)
* *stores.php* configuration file of the demo shop PHP project

## Template File & Content Example

A template and an example of the *product_abstract_store.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_abstract_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_abstract_store.csv) | Product Abstract Store .csv template file (empty content, contains headers only). |
| [product_abstract_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_abstract_store.csv) | Product Abstract Store .csv file containing a Demo Shop data sample. |

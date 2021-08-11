---
title: File details- product_image.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-imagecsv
redirect_from:
  - /v5/docs/file-details-product-imagecsv
  - /v5/docs/en/file-details-product-imagecsv
---

This article contains content of the **product_image.csv** file to configure [Product Image](https://documentation.spryker.com/docs/en/product-image-management-201907) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **image_set_name** | Yes | String |N/A* |	Name of the image set.  |
| **external_url_large** | Yes | String |N/A | External link to the image of the product. |
| **external_url_small** | Yes | String |N/A | Tiny link to the image of the product. |
| **locale** | Yes | String |N/A |Locale of the image.  |
| **abstract_sku** | Yes (if there is no product concrete SKU) | String |For each image there should be at least one value of an SKU from either `abstract_sku` or`concrete_sku`. | SKU of the abstract product. |
| **concrete_sku** | Yes (if there is no product abstract SKU) | String |For each image there should be at least one value of an SKU from either `abstract_sku` or `concrete_sku`. | SKU of the concrete product. |
| **sort_order** | No | Integer |N/A | Order of image presentation. |
| **product_image_set_key** | No | String |N/A | Key of the product image set. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:

* [product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)
* [product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)

## Template File & Content Example
A template and an example of the *product_image.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_image.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_image.csv) | Payment Method Store .csv template file (empty content, contains headers only). |
| [product_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_image.csv) | Payment Method Store .csv file containing a Demo Shop data sample. |


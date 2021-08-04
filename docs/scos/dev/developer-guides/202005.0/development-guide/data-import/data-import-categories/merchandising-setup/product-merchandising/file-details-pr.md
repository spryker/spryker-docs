---
title: File details- product_quantity.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-quantitycsv
redirect_from:
  - /v5/docs/file-details-product-quantitycsv
  - /v5/docs/en/file-details-product-quantitycsv
---

This article contains content of the **product_quantity.csv** file to configure [Product Quantity](https://documentation.spryker.com/docs/en/product-quantity-restrictions) Store information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **concrete_sku** | Yes | String |N/A* | SKU of the concrete product. |
| **quantity_min** | Number | String |N/A |Minimum quantity of the product in cart.  |
| **quantity_max** | Number | String |N/A | Maximum quantity of the product in cart. |
| **quantity_interval** | Number | String |N/A | Inreval restrictions. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*     [product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)

## Template File & Content Example
A template and an example of the *product_quantity.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_quantity.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_quantity.csv) | Product Quantity .csv template file (empty content, contains headers only). |
| [product_quantity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_quantity.csv) | Product Quantity .csv file containing a Demo Shop data sample. |

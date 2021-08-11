---
title: File details- product_quantity.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-quantitycsv
redirect_from:
  - /v6/docs/file-details-product-quantitycsv
  - /v6/docs/en/file-details-product-quantitycsv
---

This article contains content of the *product_quantity.csv* file to configure [Product Quantity](https://documentation.spryker.com/docs/product-quantity-restrictions) Store information on your Spryker Demo Shop.

## Headers & mandatory fields 
These are the header fields to be included in the .csv file:

| FIELD NAME | MANDATORY | TYPE | OTHER REQUIREMENTS/COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| **concrete_sku** | Yes | String |N/A* | SKU of the concrete product. |
| **quantity_min** | Number | String |N/A |Minimum quantity of the product in cart.  |
| **quantity_max** | Number | String |N/A | Maximum quantity of the product in cart. |
| **quantity_interval** | Number | String |N/A | Interval restrictions. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*     [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)

## Template file & content example
A template and an example of the *product_quantity.csv*  file can be downloaded here:

| FILE | DESCRIPTION |
| --- | --- |
| [product_quantity.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_quantity.csv) | Product Quantity .csv template file (empty content, contains headers only). |
| [product_quantity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_quantity.csv) | Product Quantity .csv file containing a Demo Shop data sample. |


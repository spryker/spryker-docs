---
title: File details- product_quantity.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-quantitycsv
originalArticleId: 9959fdc1-deed-48a2-9cea-46c272cb247f
redirect_from:
  - /2021080/docs/file-details-product-quantitycsv
  - /2021080/docs/en/file-details-product-quantitycsv
  - /docs/file-details-product-quantitycsv
  - /docs/en/file-details-product-quantitycsv
---

This article contains content of the *product_quantity.csv* file to configure [Product Quantity](/docs/scos/user/features/{{page.version}}/non-splittable-products-feature-overview.html) Store information on your Spryker Demo Shop.

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
*     [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Template file & content example
A template and an example of the *product_quantity.csv*  file can be downloaded here:

| FILE | DESCRIPTION |
| --- | --- |
| [product_quantity.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_quantity.csv) | Product Quantity .csv template file (empty content, contains headers only). |
| [product_quantity.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_quantity.csv) | Product Quantity .csv file containing a Demo Shop data sample. |

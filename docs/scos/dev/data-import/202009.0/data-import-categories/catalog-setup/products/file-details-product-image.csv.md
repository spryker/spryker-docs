---
title: File details- product_image.csv
last_updated: Apr 2, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-imagecsv
originalArticleId: 20772173-5295-46b2-a325-892e54b3a8b3
redirect_from:
  - /v6/docs/file-details-product-imagecsv
  - /v6/docs/en/file-details-product-imagecsv
---

This article contains content of the *product_image.csv* file to configure [Product Image](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-images-overview.html) information on your Spryker Demo Shop.

## Headers & mandatory fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **image_set_name** | Yes | String |N/A* |	Name of the image set.  |
| **external_url_large** | Yes | String |N/A | External link to the large image of the product. Used, for example, to display the image in the product detail page (PDP).  |
| **external_url_small** | Yes | String |N/A | External link to the small image of the product. Used, for example, to display the (thumbnail) images in the product listing page (PLP).  |
| **locale** | Yes | String |N/A |Locale of the image.  |
| **abstract_sku** | Yes (if there is no product concrete SKU) | String |For each image there should be at least one value of an SKU from either `abstract_sku` or`concrete_sku`. | SKU of the abstract product. |
| **concrete_sku** | Yes (if there is no product abstract SKU) | String |For each image there should be at least one value of an SKU from either `abstract_sku` or `concrete_sku`. | SKU of the concrete product. |
| **sort_order** | No | Integer |N/A | Order of image presentation. |
| **product_image_key**| Yes | String| N/A | Product image identifier. |
| **product_image_set_key** | No | String |N/A | Key of the product image set. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:

* [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)
* [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Template file & content example
A template and an example of the *product_image.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_image.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_image.csv) | Product image .csv template file (empty content, contains headers only). |
| [product_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_image.csv) | Product image .csv file containing a Demo Shop data sample. |


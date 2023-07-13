---
title: File details - product_image.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-imagecsv
originalArticleId: 7c155fe3-3def-4963-89fa-bf3b98b61fbb
redirect_from:
  - /2021080/docs/file-details-product-imagecsv
  - /2021080/docs/en/file-details-product-imagecsv
  - /docs/file-details-product-imagecsv
  - /docs/en/file-details-product-imagecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_image.csv` file to configure [Product Image](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-images-overview.html) information on your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-image
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| image_set_name | &check; | String |  | Name of the image set.  |
| external_url_large | &check; | String |  | External link to the large image of the product. Used, for example, to display the image in the product detail page (PDP).  |
| external_url_small | &check; | String |  |External link to the small image of the product. Used, for example, to display the (thumbnail) images in the product listing page (PLP).  |
| locale | &check; | String |  | Locale of the image.  |
| abstract_sku | &check; (if there is no product concrete SKU) | String |  | For each image there should be at least one value of an SKU from either `abstract_sku` or`concrete_sku`. | SKU of the abstract product. |
| concrete_sku | &check; (if there is no product abstract SKU) | String |  | For each image there should be at least one value of an SKU from either `abstract_sku` or `concrete_sku`. | SKU of the concrete product. |
| sort_order |  | Integer |   | Order of image presentation. |
| product_image_key | &check; | String |   | Product image identifier. |
| product_image_set_key |  | String |   | Key of the product image set. |
*N/A: Not applicable.

## Import file dependencies

This file has the following dependencies:

* [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)
* [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [product_image.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_image.csv) | Exemplary import file with headers only. |
| [product_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_image.csv) | Exemplary import file with Demo Shop data. |


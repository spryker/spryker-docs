---
title: "Import file details: product_image.csv"
description: Learn how to configure product image information using the product image csv file for your Spryker project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-imagecsv
originalArticleId: 7c155fe3-3def-4963-89fa-bf3b98b61fbb
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/file-details-product-image.csv.html
  - /docs/pbc/all/product-information-management/202311.0/import-and-export-data/products-data-import/file-details-product-image.csv.html  
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/products-data-import/file-details-product-image.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_image.csv` file to configure [Product Image](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-images-overview.html) information on your Spryker Demo Shop.

## Import file dependencies

- [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| image_set_name | &check; | String |  | Name of the image set.  |
| external_url_large | &check; | String |  | External link to the large image of the product. Used, for example, to display the image in the product detail page (PDP).  |
| external_url_small | &check; | String |  |External link to the small image of the product. Used, for example, to display the (thumbnail) images in the product listing page (PLP).  |
| locale | &check; | String |  | Locale of the image.  |
| abstract_sku | &check; (if there is no product concrete SKU) | String | For each image there should be at least one value of an SKU from either `abstract_sku` or`concrete_sku`. | SKU of the abstract product. |
| concrete_sku | &check; (if there is no product abstract SKU) | String | For each image there should be at least one value of an SKU from either `abstract_sku` or `concrete_sku`. | SKU of the concrete product. |
| sort_order |  | Integer |   | Order of image presentation. |
| product_image_key | &check; | String |   | Product image identifier. |
| product_image_set_key |  | String |   | Key of the product image set. |

*N/A: Not applicable.



## Import template file and content example


| FILE | DESCRIPTION |
| --- | --- |
| [product_image.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_image.csv) | Exemplary import file with headers only. |
| [product_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_image.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-image
```

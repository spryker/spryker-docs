---
title: "Import file details: product_review.csv"
description: Learn how to import product review data in to your Spryker project using the product review csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-reviewcsv
originalArticleId: f404c07b-fa94-4e85-97e1-7aac3f282de8
redirect_from:
  - /docs/scos/dev/data-import/201907.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-review.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-review.csv.html
  - /docs/pbc/all/ratings-reviews/202311.0/import-and-export-data/file-details-product-review.csv.html
  - /docs/pbc/all/ratings-reviews/202311.0/import-and-export-data/file-details-product-review.csv.html
  - /docs/pbc/all/ratings-reviews/202204.0/import-and-export-data/import-file-details-product-review.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_review.csv` file to configure [Product Review](/docs/pbc/all/ratings-reviews/{{page.version}}/ratings-and-reviews.html) information in your Spryker Demo Shop.

## Import file dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| customer_reference | &check; | String |  | Reference identifier of the customer. |
| abstract_product_sku | &check; | String |  | SKU of the abstract product. |
| locale_name |  | String |  | Identification of the locale of the review. |
| nickname |  | String |  | Nickname of the review owner. |
| summary |  | String |  | Summary of the review. |
| description |  | String |  | Description of the review. |
| rating | &check; | Number |  | Review rating. |
| status | &check; | String | Possible values: *pending*, *approved*,  *rejected*. | Review status. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_review.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_review.csv) | Exemplary import file with headers only. |
| [product_review.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_review.csv) | Exemplary import file with headers only. |

## Import command

```bash
data:import:product-review
```

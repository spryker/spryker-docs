---
title: File details- product_review.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-reviewcsv
originalArticleId: f404c07b-fa94-4e85-97e1-7aac3f282de8
redirect_from:
  - /2021080/docs/file-details-product-reviewcsv
  - /2021080/docs/en/file-details-product-reviewcsv
  - /docs/file-details-product-reviewcsv
  - /docs/en/file-details-product-reviewcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_review.csv` file to configure [Product Review](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-review
```

## Import file parameters

The file should have the following parameters:

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

## Import file dependencies

This file has the following dependency: [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html).

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [product_review.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_review.csv) | Exemplary import file with headers only. |
| [product_review.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_review.csv) | Exemplary import file with headers only. |

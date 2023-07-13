---
title: File details - product_discontinued.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-discontinuedcsv
originalArticleId: 3b2c40f5-ad6d-4ff5-9b65-b058e1ff9419
redirect_from:
  - /2021080/docs/file-details-product-discontinuedcsv
  - /2021080/docs/en/file-details-product-discontinuedcsv
  - /docs/file-details-product-discontinuedcsv
  - /docs/en/file-details-product-discontinuedcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_discontinued.csv` file to configure [Discontinued Product](/docs/scos/user/features/{{page.version}}/product-feature-overview/discontinued-products-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-discontinued
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| sku_concrete | &check; | String |N/A* | SKU of the concrete discontinued product. |
| note.{ANY_LOCALE_NAME}*<br>Example value: *note.en_US* |  | String |N/A | Note translated into the specified locale (US for our example).  |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.

## Import file dependencies

This file has the following dependency:

* [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [product_discontinued.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_discontinued.csv) | Exemplary import file with headers only. |
| [product_discontinued.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_discontinued.csv) | Exemplary import file with Demo Shop data. |

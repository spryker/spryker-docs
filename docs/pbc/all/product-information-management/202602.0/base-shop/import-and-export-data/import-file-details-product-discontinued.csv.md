---
title: "Import file details: product_discontinued.csv"
description:  Learn how you can import data for discountinued products using the product discontinued csv file within your Spryker Cloud Commerce OS project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-discontinuedcsv
originalArticleId: 3b2c40f5-ad6d-4ff5-9b65-b058e1ff9419
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-discontinued.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/file-details-product-discontinued.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-file-details-product-discontinued.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_discontinued.csv` file to configure [Discontinued Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/discontinued-products-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

[product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| sku_concrete | &check; | String |N/A* | SKU of the concrete discontinued product. |
| note.{ANY_LOCALE_NAME}*<br>Example value: *note.en_US* |  | String |N/A | Note translated into the specified locale (US for our example).  |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_discontinued.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_discontinued.csv) | Exemplary import file with headers only. |
| [product_discontinued.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_discontinued.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-discontinued
```

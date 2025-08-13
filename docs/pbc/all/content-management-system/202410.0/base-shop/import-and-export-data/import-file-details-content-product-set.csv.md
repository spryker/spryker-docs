---
title: "Import file details: content_product_set.csv"
description: Learn about the Spryker content product set csv file to configure content product set information in your Spryker shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-product-setcsv
originalArticleId: 170221d8-467a-4e8c-8449-07a454c5f684
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-content-product-set.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/content-management/file-details-content-product-set.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-content-product-set.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-content-product-set.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-content-product-set.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `content_product_set.csv` file to configure [Content Product Set](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/content-items-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

This file has the following dependency: [product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-set.csv.html).



## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String | Must be unique. | Unique identifier of the content. |
| name | &check; | String |	Human-readable name. | Name of the content. |
| description | &check; | String |  | Description of the content. |
| product_set_key.default | &check; | String |  | Default key identifier of the product set. |
| product_set_key.{ANY_LOCALE_NAME}*<br>Example value: *product_set_key.en_US* |  | String |  | Key identifier of the product set, translated |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.



## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [content_product_set.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_product_set.csv) | Exemplary import file with headers only. |
| [content_product_set.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_product_set.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:content-product-set
```

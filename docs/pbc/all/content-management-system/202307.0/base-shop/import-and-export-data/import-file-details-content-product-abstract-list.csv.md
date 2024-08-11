---
title: "Import file details: content_product_abstract_list.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-product-abstract-listcsv
originalArticleId: b165b205-174d-4f91-8b37-d15ce455285c
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html
  - /docs/pbc/all/content-management-system/202307.0/import-and-export-data/file-details-content-product-abstract-list.csv.html
  - /docs/pbc/all/content-management-system/202307.0/base-shop/import-and-export-data/file-details-content-product-abstract-list.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `content_product_abstract_list.csv` file to configure [Content Product Abstract List](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/content-items-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

This file has the following dependency: [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String | Must be unique. | 	Unique identifier of the content. |
| name | &check; | String |Human-readable name. | Name of the content. |
| description |  | String |N/A | Description of the content. |
| skus.default | &check; | String |N/A | Default list of product abstract SKUs. |
| skus.{ANY_LOCALE_NAME}*<br>Example value: *skus.en_US* |  | String | N/A |List of product abstract SKUs, translated into the specified locale (US for our example). |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.


## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [content_product_abstract_list.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_product_abstract_list.csv) | Exemplary import file with headers only. |
| [content_product_abstract_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_product_abstract_list.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:content-product-abstract-list
```

---
title: "Import file details: product_set.csv"
description: Learn about the Spryker product set csv file used to configure the product set information in to your Spryker Shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-setcsv
originalArticleId: 41c315c8-8d81-4a70-9318-45fea1ebf2c1
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-product-set.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-product-set.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-product-set.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_set.csv` file to configure [Product Set](/docs/pbc/all/content-management-system/latest/base-shop/product-sets-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| product_set_key | &check; (*unique*) | String |  | Key identifier of the product set. |
| weight |  | Number |  | Weight of the product set. |
| is_active |  | Boolean |True = 1<br>False = 0 | Indicates if the product set is active or not. |
| abstract_skus | &check; | String |  | String containing SKUs of the abstract products, separate by comas, which are part of the product set. |
| name.{ANY_LOCALE_NAME}*<br>Example value: *name.en_US* |  | String |  |Name of the product set, translated in the specified locale (US for our example).  |
| url.{ANY_LOCALE_NAME}*<br>Example value: *url.en_US* |  | String |  | URL of the product set, used in the specified locale (US for our example). |
| description.{ANY_LOCALE_NAME}*<br>Example value: *description.en_US* |  | String |  | Description of the product set, translated in the specified locale (US for our example). |
| meta_title.{ANY_LOCALE_NAME}*<br>Example value: *meta_title.en_US* |  | String |  |Meta data title of the product set, translated in the specified locale (US for our example).  |
| meta_keywords.{ANY_LOCALE_NAME}*<br>Example value: *meta_keywords.en_US*  |  | String |  | Meta data keywords of the product set, translated in the specified locale (US for our example).|
| image_set.1 |  | String |  | Image of the product set. |
| image_small.1.1 |  | String |  | Small image of the first product of the product set. |
| image_large.1.1 |  | String |  | Large image of the first product of the product set. |
| image_small.1.2 |  | String |  | Small image of the second product of the product set.  |
| image_large.1.2 |  | String |  | Large image of the second product of the product set. |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_set.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_set.csv) | Exemplary import file with headers only. |
| [product_set.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_set.csv) | Exemplary import file with headers only. |

## Import command

```bash
data:import:product-set
```
